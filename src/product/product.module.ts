import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from '../app/resolvers/product.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from 'src/account/entities/account.entity';
import { Product, ProductSchema } from './entities/product.entity';

@Module({
  providers: [ProductResolver, ProductService],
  imports: [
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ]
})
export class ProductModule {}
