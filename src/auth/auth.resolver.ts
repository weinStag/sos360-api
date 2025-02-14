import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { attendantSchema } from 'src/user/schema/attendant.schema';
import { BadRequestException } from '@nestjs/common';
import { requesterSchema } from 'src/user/schema/requester.schema';
import { attendantInput } from 'src/user/input/attendant.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}


  @Mutation(() => requesterSchema)
  async signUpRequester(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('cpf') cpf: string,
    @Args('phone') phone: string,
    @Args('address') address: string,
  ): Promise<requesterSchema> {
    try {
      await this.authService.signUpRequester(name, email, password, cpf, phone, address);
      return { name, password, email, active: true, cpf, phone, address }; // Retorna os dados do usuário criado
    } catch (error) {
      throw new BadRequestException(error.message || 'Error signing up requester');
    }
  }
  
  @Mutation(() => String)
  async login(@Args('email') email: string, @Args('password') password: string): Promise<string> {
    const token = await this.authService.login(email, password);
    return token.access_token;
}
