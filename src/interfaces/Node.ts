import { Field, InterfaceType } from '@nestjs/graphql';
import { Scalar } from '@nestjs/graphql';


@InterfaceType()
export abstract class Node {
    @Field()
    id: BinaryType;
}
