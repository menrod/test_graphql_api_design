import { Resolver, Query, Mutation, Args, Int, Directive, Context } from '@nestjs/graphql';
import { AccountService } from '../../account/account.service';
import { Account } from '../../account/entities/account.entity';
import { CreateAccountInput } from '../../account/dto/create-account.input';
import { UpdateAccountInput } from '../../account/dto/update-account.input';

@Resolver(() => Account)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  
  @Query(() => Account)
  @Directive('@private')
  async me(@Context() context) {
    const claims = context['claims'];
    console.log(claims)
    const acc = await this.accountService.findByEmail(claims.email);
    return acc
  }
}
