import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { CryptService } from 'src/crypt/crypt.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'chavereservadoprojeto',
      signOptions: { expiresIn: '6h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, AuthResolver, CryptService],
  exports: [AuthService, AuthResolver],
})
export class AuthModule { }
