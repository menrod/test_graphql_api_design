import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class Authentication {
  @Field()
  token: string;
}
export type AuthenticationDocument = Authentication & Document;
export const AuthenticationSchema = SchemaFactory.createForClass(Authentication);