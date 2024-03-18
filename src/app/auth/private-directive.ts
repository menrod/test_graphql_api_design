import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';
import { AuthenticationError } from 'apollo-server-express';
import { verify } from 'jsonwebtoken';

export function privateDirectiveTransformer(
  schema: GraphQLSchema,
  directiveName: string,
) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const privateDirective = getDirective(
        schema,
        fieldConfig,
        directiveName,
      )?.[0];

      if (privateDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        // Replace the original resolver with a function that *first* calls
        // the original resolver, then converts its result to upper case
        fieldConfig .resolve = async function (...args) {
          const [, , context] = args;
          const authorizationHeader = context.req.headers.authorization;
          
          if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            throw new AuthenticationError('Unauthorized access'); 
          }
          const token = authorizationHeader.split(' ')[1];
          try {
            // Verify JWT token
            const decoded = verify(token, process.env.AUTH_SECRET);
            return token;
            
          } catch (error) {
            throw new AuthenticationError('Invalid token');
          }
          return token;
        };
        return fieldConfig;
      }
    },
  });
}