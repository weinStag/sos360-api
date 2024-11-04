import { Module } from '@nestjs/common';
import { CryptService } from './crypt.service';

@Module({
  providers: [CryptService],
})
export class CryptModule {}
