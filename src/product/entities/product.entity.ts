import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Account } from 'src/account/entities/account.entity';
import {DateTimeResolver} from 'graphql-scalars';
import { BinaryScalarResolver } from 'src/app/scalars/binary-scalar-resolver';
import { Node } from 'src/interfaces/Node';
import { Document } from 'mongoose';
@ObjectType({ implements: Node })
@Schema()
export class Product implements Node{
  @Field((type) => BinaryScalarResolver)
  @Prop()
  id: Buffer;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  description: string;

  @Field()
  @Prop()
  owner: Account;

  @Field((type) => DateTimeResolver)
  @Prop()
  createdAt: Date;

  @Field((type) => DateTimeResolver)
  @Prop()
  updatedAt: Date;
}
export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);