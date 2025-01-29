import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/repository/user.repository';
import { CryptService } from '../crypt/crypt.service';
import { MailService } from '../mail/mail.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly cryptService: CryptService,
        private readonly mailService: MailService,
    ) { }

    async handlePasswordRecovery(email: string): Promise<void> {
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) return; // Não expor se o usuário não existe.

        // Gerar nova senha temporária
        const newPassword = uuidv4();
        const hashedPassword = await this.cryptService.hashPassword(newPassword);

        // Atualizar a senha no banco de dados
        await this.userRepository.update(user.id, { password: hashedPassword });

        // Enviar email com a nova senha
        await this.mailService.sendMail({
            to: email,
            subject: 'Recuperação de Senha',
            template: 'password-recovery',
            context: { name: user.name, newPassword },
        });
    }
}
