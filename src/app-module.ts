import { Module } from '@nestjs/common';
import { AppResolver } from './app/resolvers/app-resolver';
import { AppService } from './app-service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
//import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule} from '@nestjs/mongoose';
import {DateTimeResolver,EmailAddressResolver} from 'graphql-scalars';
import {BinaryScalarResolver} from './app/scalars/binary-scalar-resolver';
import {AccountModule} from './account/account.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useFactory:() => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'), 
        playground: true,
        //plugins: [ApolloServerPluginLandingPageLocalDefault()],
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
    ConfigModule.forRoot({
      cache: true,
    }),
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
