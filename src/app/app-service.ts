import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from '../account/entities/account.entity';
import { Model } from 'mongoose';
import { Product } from '../product/entities/product.entity';
import { Authentication } from '../authentication/entities/authentication.entity';
import { SignUpInput } from './dto/signup-input';
import { AuthenticateInput } from './dto/authenticate-input';
import { DateTimeResolver, EmailAddressResolver } from 'graphql-scalars';
import { CreateAccountInput } from 'src/account/dto/create-account.input';
import { AuthService } from './auth/auth-service';
import { BinaryScalarResolver } from './scalars/binary-scalar-resolver';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Account.name) private account: Model<Account>,
    @InjectModel(Product.name) private product: Model<Product>,
    @InjectModel(Authentication.name) private authentication: Model<Authentication>,
    private readonly authService: AuthService
  ) { } 
  getHello(): string {
    return 'Hello World!';
  }

  async authenticate(input: AuthenticateInput){
    const record = await this.account.findOne({'emailAddress':EmailAddressResolver.parseValue(input.emailAddress)}).exec();
    if(record){
      const token = await this.authentication.findById(record._id).exec();
      if(input.password === this.authService.verifyToken(token.token).password){
        return token
      }else{
        throw new BadRequestException('Invalid credentials')
      }
    }else{
      throw new BadRequestException('Invalid credentials')
    }
  }

  async signUp(input: SignUpInput):Promise<Authentication> {
    const email = EmailAddressResolver.parseValue(input.emailAddress);
    const records = await this.account.findOne({'emailAddress':email}).exec();
    
    if(records){
      throw new ConflictException('Email address already used');
    }else{
      try {
        
        const newAccount = new this.account();
        newAccount.id = BinaryScalarResolver.parseValue(input.password);
        newAccount.emailAddress = EmailAddressResolver.parseValue(input.emailAddress);
        newAccount.firstname = input.firstname;
        newAccount.lastname = input.lastname;
        newAccount.createdAt = DateTimeResolver.parseValue(new Date);
        newAccount.updatedAt = DateTimeResolver.parseValue(new Date);
        await newAccount.save();

        const token = this.authService.generateToken({password:input.password,email:input.emailAddress});
        const authToken = new this.authentication();
        authToken.token = token;
        authToken._id = newAccount._id
        await authToken.save();
        return authToken
      } catch (error) {
        throw error;
      }
    }
  }
}
