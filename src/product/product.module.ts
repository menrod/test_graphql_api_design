import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from '../app/resolvers/product.resolver';

@Module({
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
