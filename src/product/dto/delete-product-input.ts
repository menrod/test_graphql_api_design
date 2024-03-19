import { InputType, Field } from '@nestjs/graphql';
import { BinaryScalarResolver } from 'src/app/scalars/binary-scalar-resolver';
@InputType()
export class DeleteProductInput {
    @Field(() => BinaryScalarResolver)
    id: Buffer;
}
