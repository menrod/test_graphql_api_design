import { Module } from '@nestjs/common';
import { AppResolver } from './resolvers/app-resolver';
import { AppService } from './app-service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule} from '@nestjs/mongoose';

import {DateTimeResolver,EmailAddressResolver} from 'graphql-scalars';
import {BinaryScalarResolver} from './scalars/binary-scalar-resolver';

import {AccountModule} from '../account/account.module';
import {ProductModule} from '../product/product.module';
import {AuthenticationModule} from '../authentication/authentication.module';

import { Account, AccountSchema } from '../account/entities/account.entity';
import { Product, ProductSchema } from '../product/entities/product.entity';
import { Authentication, AuthenticationSchema } from '../authentication/entities/authentication.entity';

import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth-service';
import { privateDirectiveTransformer } from './auth/private-directive';
import { DirectiveLocation, GraphQLDirective } from 'graphql';


@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('AUTH_SECRET')
        };
      }
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useFactory:() => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        transformSchema: (schema) => privateDirectiveTransformer(schema, 'private'),
        buildSchemaOptions: {
          directives: [
            new GraphQLDirective({
              name: 'private',
              locations: [DirectiveLocation.FIELD_DEFINITION],
            }),
          ],
        },
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        resolvers: [
          {DateTime:DateTimeResolver},
          {EmailAddress:EmailAddressResolver},
          {Binary:BinaryScalarResolver}
        ]
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get<string>('MONGODB_URI'),
        }
      },
    }),
    AccountModule,
    ProductModule,
    AuthenticationModule,
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Authentication.name, schema: AuthenticationSchema },
    ]),
    ConfigModule.forRoot({
      cache: true,
    }),
  ],
  providers: [AppService, AppResolver,AuthService],
  exports: [AuthService],
})
export class AppModule {}
