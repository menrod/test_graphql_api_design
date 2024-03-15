import { SchemaDirectiveVisitor } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLField } from 'graphql';
import { AuthenticationError } from 'apollo-server-express';
import { verify } from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrivateDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const [, , context] = args;
      const authorizationHeader = context.req.headers.authorization;

      if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        throw new AuthenticationError('Unauthorized access');
      }

      const token = authorizationHeader.split(' ')[1];
      try {
        // Verify JWT token
        const decoded = verify(token, process.env.AUTH_SECRET);
        // Attach user object to context if token is valid
        context.user = decoded;
      } catch (error) {
        throw new AuthenticationError('Invalid token');
      }

      return resolve.apply(this, args);
    };
  }
}