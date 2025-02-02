import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

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
