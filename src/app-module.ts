import { Module } from '@nestjs/common';
import { AppResolver } from './app-resolver';
import { AppService } from './app-service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

import {AccountModule} from './account/account.module'


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/testGraphqlApiDb'),
    //MongooseModule.forRootAsync({
    //  imports: [ConfigModule],
    //  inject: [ConfigService],
    //  useFactory: (configService: ConfigService) => {
    //    // CHECK IF YOU GET WHAT IS EXPECTED
    //    console.log('ENV VAR', configService.get('mongodb://localhost:27017/testGraphqlApiDb'));
    //    const options: MongooseModuleOptions = {
    //      uri: configService.get<string>('mongodb://localhost:27017/testGraphqlApiDb'),
    //    };
    //    return options;
    //  },
    //}),
    AccountModule,
    ConfigModule.forRoot({
      cache: true,
    }),
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
