import { Directive, ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Node } from 'src/interfaces/Node';
import {DateTimeResolver,EmailAddressResolver} from 'graphql-scalars';
import {BinaryScalarResolver} from '../../app/scalars/binary-scalar-resolver';

@ObjectType({ implements: Node })
@Schema()
@Directive('@private')
export class Account implements Node{
  @Field(() => BinaryScalarResolver)
  @Prop()
  id: Buffer;

  @Field()
  @Prop()
  firstname: string;

  @Field()
  @Prop()
  lastname: string;

  @Field(() => EmailAddressResolver)
  @Prop()
  emailAddress: string;

  @Field(() => DateTimeResolver)
  @Prop()
  createdAt: Date;

  @Field(() => DateTimeResolver)
  @Prop()
  updatedAt: Date;
}
export const AccountSchema = SchemaFactory.createForClass(Account);

