import { InputType, Int, Field } from '@nestjs/graphql';
import { DateTimeResolver, EmailAddressResolver } from 'graphql-scalars';
import { BinaryScalarResolver } from 'src/app/scalars/binary-scalar-resolver';

@InputType()
export class CreateAccountInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;

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
