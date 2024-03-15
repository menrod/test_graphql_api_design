import { Injectable } from '@nestjs/common';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './entities/account.entity';
import { Model } from 'mongoose';
@Injectable()
export class AccountService {
  constructor(@InjectModel(Account.name) private account: Model<Account>) { }

  create(createAccountInput: CreateAccountInput) {
    return 'This action adds a new account';
  }

  findAll() {
    return `This action returns all account`;
  }
  find(input: string){
    return this.account.find({input}).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountInput: UpdateAccountInput) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
