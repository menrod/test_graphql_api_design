import { DateTimeResolver, EmailAddressResolver } from 'graphql-scalars';
import { CreateAccountInput } from './create-account.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAccountInput extends PartialType(CreateAccountInput) {
  @Field(() => Int)
  id: number;
  
  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field(() => EmailAddressResolver)
  emailAddress: string;

  @Field(() => DateTimeResolver)
  createdAt: Date;

  @Field(() => DateTimeResolver)
  updatedAt: Date;
}
