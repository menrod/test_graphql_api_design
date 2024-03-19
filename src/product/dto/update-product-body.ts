import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateProductBody {
  @Field(() => String)
  name: string;
  
  @Field(() => String)
  description: string;
}
