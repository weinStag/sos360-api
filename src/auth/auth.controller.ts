import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('recover-password')
    async recoverPassword(@Body('email') email: string) {
        await this.authService.handlePasswordRecovery(email);
        return { message: 'If the email exists, a recovery email has been sent.' };
    }
}