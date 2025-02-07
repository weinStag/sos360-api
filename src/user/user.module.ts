import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'src/database/service/prisma.service';
import { UserRepository } from './repository/user.repository';
import { CryptService } from 'src/crypt/crypt.service';
import { CustomLogger } from 'src/logger/custom.logger';
import { ContactService } from 'src/user/contact.service';
import { ContactResolver } from 'src/user/contact.resolver';


@Module({
  providers: [
    UserResolver, 
    PrismaService, 
    UserRepository, 
    CryptService, 
    CustomLogger,
    ContactResolver,  
    ContactService,
  ],
})
export class UserModule {}
