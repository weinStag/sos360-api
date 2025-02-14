import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver'; 
import { UserRepository } from '../user/repository/user.repository';
import { CryptService } from '../crypt/crypt.service';
import { MailService } from '../mail/mail.service';
import { PrismaService } from '../database/service/prisma.service';

@Module({
  providers: [
    AuthService,
    AuthResolver, 
    UserRepository,
    CryptService,
    MailService,
    PrismaService,
  ],
  exports: [AuthService, AuthResolver],
})
export class AuthModule {}
