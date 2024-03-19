import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';
import { AuthenticationError } from 'apollo-server-express';
import { verify } from 'jsonwebtoken';
import { Account } from 'src/account/entities/account.entity';
import { AccountService } from 'src/account/account.service';


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
          console.log(verify(token, process.env.AUTH_SECRET))
          try {
            // Verify JWT token
            const decoded = verify(token, process.env.AUTH_SECRET);
            context['claims'] = decoded
            
            
          } catch (error) {
            throw new AuthenticationError('Invalid token');
          }
          return resolve.apply(this,args);
        };
        return fieldConfig;
      }
    },
  });
}