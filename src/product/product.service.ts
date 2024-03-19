import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Account } from 'src/account/entities/account.entity';
import { Product } from './entities/product.entity';
import { DateTimeResolver } from 'graphql-scalars';
import { BinaryScalarResolver } from 'src/app/scalars/binary-scalar-resolver';
import { DeleteProductInput } from './dto/delete-product-input';


@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Account.name) private account: Model<Account>,
    @InjectModel(Product.name) private product: Model<Product>,
  ) { } 
  async create(createProductInput: CreateProductInput, email: String) {
    const userAccount = await this.account.findOne({'emailAddress':email}).exec();
    const newProduct = new this.product;
    newProduct.owner = userAccount;
    newProduct.description = createProductInput.description
    newProduct.name = createProductInput.name
    newProduct.id = BinaryScalarResolver.parseValue((new Date)+createProductInput.name+createProductInput.description)
    newProduct.createdAt = DateTimeResolver.parseValue(new Date);

    newProduct.updatedAt = DateTimeResolver.parseValue(new Date);
    await newProduct.save()
    return newProduct;
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: Buffer) {
    return `This action returns a #${id} product`;
  }

  async update(id: Buffer, updateProductInput: UpdateProductInput, email:String) {
    const owner = await this.account.findOne({'emailAddress':email}).exec();
    const product = await this.product.findOne({"id": id,"owner": owner }).exec();
    product.name = updateProductInput.body.name;
    product.description  = updateProductInput.body.description;
    product.updatedAt = DateTimeResolver.parseValue(new Date);
    product.save()
    return product;
  }

  async remove(input: DeleteProductInput,email:String) {
    try {
      const owner = await this.account.findOne({'emailAddress':email}).exec();
      const product = await this.product.findOne({"id": input.id,"owner": owner }).exec();
      return true;
    } catch (error) {
      throw InternalServerErrorException 
    }
  }
}
