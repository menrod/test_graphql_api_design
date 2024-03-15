import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountResolver } from '../app/resolvers/account.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './entities/account.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }])],
  providers: [AccountResolver, AccountService],
})
export class AccountModule {}
