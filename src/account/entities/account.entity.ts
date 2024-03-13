import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Document, Schema as MongooSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Node } from 'src/interfaces/Node';
import {DateTimeResolver,EmailAddressResolver} from 'graphql-scalars';
import {BinaryScalarResolver} from '../../app/scalars/binary-scalar-resolver';

@ObjectType({ implements: Node })
@Schema()
export class Account implements Node{
  @Field((type) => BinaryScalarResolver) // Decorate other fields as needed
  id: Buffer;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field((type) => EmailAddressResolver)
  emailAddress: string;

  @Field((type) => DateTimeResolver)
  createdAt: Date;

  @Field((type) => DateTimeResolver)
  updatedAt: Date;
}
export type AccountDocument = Account & Document;
 export const AccountSchema = SchemaFactory.createForClass(Account);

