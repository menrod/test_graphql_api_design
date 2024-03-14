import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Account } from 'src/account/entities/account.entity';
import {DateTimeResolver} from 'graphql-scalars';
import { BinaryScalarResolver } from 'src/app/scalars/binary-scalar-resolver';
import { Node } from 'src/interfaces/Node';
@ObjectType({ implements: Node })
@Schema()
export class Product implements Node{
  @Field((type) => BinaryScalarResolver)
  id: Buffer;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  owner: Account;

  @Field((type) => DateTimeResolver)
  createdAt: Date;

  @Field((type) => DateTimeResolver)
  updatedAt: Date;
}
export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);