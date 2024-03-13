import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountResolver } from '../app/resolvers/account.resolver';

@Module({
  providers: [AccountResolver, AccountService],
})
export class AccountModule {}
