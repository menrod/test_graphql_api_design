import { Scalar, CustomScalar } from '@nestjs/graphql';
import { GraphQLScalarType, Kind, ValueNode } from 'graphql';

export const BinaryScalarResolver = new GraphQLScalarType({
  name: 'Binary',
  description: 'A simple Binary parser',
  serialize: (value: Buffer) => value.toString('base64'),
  parseValue: (value: string) => Buffer.from(value,'base64'),
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING) {
      return Buffer.from(ast.value,'base64');
    }
    return null;
  }
})
