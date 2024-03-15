import { InputType, Int, Field } from '@nestjs/graphql';
import { EmailAddressResolver } from 'graphql-scalars';

@InputType()
export class AuthenticateInput {
    @Field(() => EmailAddressResolver)
    emailAddress: string;

    @Field()
    password: string;
}