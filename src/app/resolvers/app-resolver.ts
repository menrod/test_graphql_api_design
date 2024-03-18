import { Directive,Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppService } from '../app-service';
import { SignUpInput } from '../dto/signup-input';
import { Authentication } from 'src/authentication/entities/authentication.entity';
import { AuthenticateInput } from '../dto/authenticate-input';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Directive('@private')
  @Query(() => String)
  getHello(): string {
    return this.appService.getHello();
  }

  @Mutation(() => Authentication)
  async signUp(@Args('input') input: SignUpInput){
    try {
      return await this.appService.signUp(input);
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => Authentication)
  async authenticate(@Args('input') input: AuthenticateInput){
    try {
      return await this.appService.authenticate(input);
    } catch (error) {
      throw error;
    }
  }
}
