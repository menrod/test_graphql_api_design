import { Resolver, Query, Mutation, Args, Int, Directive, Context } from '@nestjs/graphql';
import { ProductService } from '../../product/product.service';
import { Product } from '../../product/entities/product.entity';
import { CreateProductInput } from '../../product/dto/create-product.input';
import { UpdateProductInput } from '../../product/dto/update-product.input';
import { BinaryScalarResolver } from '../scalars/binary-scalar-resolver';
import { DeleteProductInput } from 'src/product/dto/delete-product-input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  @Directive('@private')
  createProduct(@Context() context,@Args('createProductInput') createProductInput: CreateProductInput) {
    return this.productService.create(createProductInput,context['claims'].email);
  }

  @Query(() => [Product], { name: 'product' })
  findAll() {
    return this.productService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productService.findOne(BinaryScalarResolver.parseValue(id));
  }

  @Mutation(() => Product)
  @Directive('@private')
  updateProduct(@Context() context,@Args('updateProductInput') updateProductInput: UpdateProductInput) {
    return this.productService.update(updateProductInput.id, updateProductInput,context['claims'].email);
  }

  @Mutation(() => Product)
  @Directive('@private')
  deleteProduct(@Context() context,@Args('DeleteProductInput') input: DeleteProductInput) {
    return this.productService.remove(input,context['claims'].email);
  }
}
