import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { attendantSchema } from 'src/user/schema/attendant.schema';
import { BadRequestException } from '@nestjs/common';
import { requesterSchema } from 'src/user/schema/requester.schema';

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

  /**
   * 🔹 Mutation para recuperação de senha: Gera um token e envia um email com link de redefinição.
   */
  @Mutation(() => String)
  async recoverPassword(@Args('email') email: string): Promise<string> {
    await this.authService.handlePasswordRecovery(email);
    return 'Se o email existir, um link de recuperação foi enviado.';
  }

  /**
   * 🔑 Mutation para redefinir a senha do usuário usando um token de recuperação.
   */
  @Mutation(() => String)
  async resetPassword(
    @Args('token') token: string,
    @Args('newPassword') newPassword: string
  ): Promise<string> {
    await this.authService.handlePasswordReset(token, newPassword);
    return 'Senha redefinida com sucesso!';
  }
}
