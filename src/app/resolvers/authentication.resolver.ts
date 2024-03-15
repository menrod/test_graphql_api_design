import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Authentication } from '../../authentication/entities/authentication.entity';
import { CreateAuthenticationInput } from '../../authentication/dto/create-authentication.input';
import { UpdateAuthenticationInput } from '../../authentication/dto/update-authentication.input';
import { SignUpInput } from '../dto/signup-input';
import { error } from 'console';
import { AppService } from '../app-service';

@Resolver(() => Authentication)
export class AuthenticationResolver {
  constructor(
    private readonly authenticationService: AuthenticationService
  ) {}

  @Mutation(() => Authentication)
  createAuthentication(@Args('createAuthenticationInput') createAuthenticationInput: CreateAuthenticationInput) {
    return this.authenticationService.create(createAuthenticationInput);
  }

  @Query(() => [Authentication], { name: 'authentication' })
  findAll() {
    return this.authenticationService.findAll();
  }

  @Query(() => Authentication, { name: 'authentication' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.authenticationService.findOne(id);
  }

  @Mutation(() => Authentication)
  updateAuthentication(@Args('updateAuthenticationInput') updateAuthenticationInput: UpdateAuthenticationInput) {
    return this.authenticationService.update(updateAuthenticationInput.id, updateAuthenticationInput);
  }

  @Mutation(() => Authentication)
  removeAuthentication(@Args('id', { type: () => Int }) id: number) {
    return this.authenticationService.remove(id);
  }
  /*
  @Query('signUp')
  signUp(@Args('input') input: SignUpInput){
    try {
      return this.appService.signUp(input);
    } catch (error) {
      throw error;
    }
  }
  */
}
