import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from '../user/repository/user.repository';
import { CryptService } from '../crypt/crypt.service';
import { MailService } from '../mail/mail.service';
import { PrismaService } from '../database/service/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserRepository, CryptService, MailService, PrismaService],
})
export class AuthModule {}
