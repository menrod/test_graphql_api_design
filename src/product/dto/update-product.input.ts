import { BinaryScalarResolver } from 'src/app/scalars/binary-scalar-resolver';
import { CreateProductInput } from './create-product.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { UpdateProductBody } from './update-product-body';

@InputType()
export class UpdateProductInput {
  @Field(() => BinaryScalarResolver)
  id: Buffer;
  
  @Field(()=>UpdateProductBody)
  body: UpdateProductBody
}
