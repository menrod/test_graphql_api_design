import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Document, Schema as MongooSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Node } from 'src/interfaces/Node';

@ObjectType({ implements: Node })
@Schema()
export class Account implements Node{
  @Field()
  id: BinaryType;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  emailAddress: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
export type AccountDocument = Account & Document;
 export const AccountSchema = SchemaFactory.createForClass(Account);

