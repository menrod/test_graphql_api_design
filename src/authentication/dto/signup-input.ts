import { InputType, Int, Field } from '@nestjs/graphql';
import { EmailAddressResolver } from 'graphql-scalars';

@InputType()
export class SignUpInput {
    @Field(type => EmailAddressResolver)
    emailAddress: string;

    @Field()
    firstname: string;

    @Field()
    lastname: string;

    @Field()
    password: string;
}