import { BadRequestException, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserRepository } from '../user/repository/user.repository';
import { CryptService } from '../crypt/crypt.service';
import { MailService } from '../mail/mail.service';
import { v4 as uuidv4 } from 'uuid';
import { attendantInput } from 'src/user/input/attendant.input';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly cryptService: CryptService,
        private readonly mailService: MailService,
    ) {}

    private readonly jwtSecret = 'your_jwt_secret';

    async signUpRequester(
      name: string,
      email: string,
      password: string,
      cpf: string,
      phone: string,
      address: string,
    ): Promise<void> {
      try {
        // Verifica se o e-mail já está em uso
        const existingUser = await this.userRepository.findOneByEmail(email);
        if (existingUser) {
          throw new BadRequestException('Email already in use');
        }
  
        // Hash da senha
        const hashedPassword = await this.cryptService.encrypt(password);
  
        // Criação do usuário
        const requester = {
          name,
          email,
          password: hashedPassword,
          active: true,
          cpf,
          phone,
          address,
        };
  
        
        await this.userRepository.addRequester(requester);
      } catch (error) {
        throw new BadRequestException(error.message || 'Error signing up requester');
      }
    }

    async signUpAttendant(
      name: string,
      email: string,
      password: string,
      service: string,
      phone: string,
      address: string,
    ): Promise<void> {
      try {
        // Verifica se o e-mail já está em uso
        const existingUser = await this.userRepository.findOneByEmail(email);
        if (existingUser) {
          throw new BadRequestException('Email already in use');
        }
  
        // Hash da senha
        const hashedPassword = await this.cryptService.encrypt(password);
  
        // Criação do usuário
        const attendant = {
          name,
          email,
          password: hashedPassword,
          active: true,
          service,
          phone,
          address,
        };
  
        
        await this.userRepository.addAttendant(attendant);
      } catch (error) {
        throw new BadRequestException(error.message || 'Error signing up requester');
      }
    }

    generateToken(user: any): string {
      const payload = { userId: user.id };
      return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
    }
  
    validateToken(token: string) {
      try {
        return jwt.verify(token, this.jwtSecret);
      } catch (err) {
        throw new Error('Invalid token');
      }
    }
  

    /**
     * 🔹 Recuperação de Senha: Gera um token e envia um email com o link de redefinição.
     */
    async handlePasswordRecovery(email: string): Promise<void> {
        const user = await this.userRepository.findOneByEmail(email);

        if (!user) return; // Evita expor se o usuário não existe.

        // Gerar token único para redefinição de senha
        const resetToken = uuidv4();
        const resetLink = `https://yourfrontend.com/reset-password?token=${resetToken}`;

        // Salvar o token no banco (será usado na validação futura)
        await this.userRepository.updateResetToken(email, resetToken);

        console.log(`✉️ Enviando email para ${email} com link: ${resetLink}`);

        // Enviar email com o link de redefinição de senha
        await this.mailService.sendMail(
            email,
            'Recuperação de Senha',
            `<p>Olá, ${user.name},</p>
             <p>Para redefinir sua senha, clique no link abaixo:</p>
             <a href="${resetLink}">Redefinir Senha</a>
             <p>Se você não solicitou essa redefinição, ignore este email.</p>`
        );
    }

    /**
     * 🔑 Processa a redefinição de senha com base no token fornecido.
     */
    async handlePasswordReset(token: string, newPassword: string): Promise<void> {
        const user = await this.userRepository.findUserByResetToken(token);

        if (!user) {
            throw new Error('Token inválido ou expirado.');
        }

        // Criptografar a nova senha antes de salvar
        const hashedPassword = await this.cryptService.encrypt(newPassword);

        // Atualizar senha e remover o token do banco
        await this.userRepository.updatePassword(user.id, hashedPassword);
    }

   
  
}
