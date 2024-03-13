import { Field, InterfaceType } from '@nestjs/graphql';
import {BinaryScalarResolver} from '../app/scalars/binary-scalar-resolver';

@InterfaceType()
export abstract class Node {
    @Field((type) => BinaryScalarResolver) // Decorate other fields as needed
    id: Buffer;
}
