import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@ObjectType()
@Schema()
export class Authentication {
  @Field()
  @Prop()
  token: string;
}
export type AuthenticationDocument = Authentication & Document;
export const AuthenticationSchema = SchemaFactory.createForClass(Authentication);