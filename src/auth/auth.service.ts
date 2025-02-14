import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserRepository } from '../user/repository/user.repository';
import { CryptService } from '../crypt/crypt.service';
import { MailService } from '../mail/mail.service';
import { v4 as uuidv4 } from 'uuid';
import { attendantInput } from 'src/user/input/attendant.input';
import { async } from 'rxjs';

@Injectable()
export class AuthService {
  [x: string]: any;
    constructor(
        private readonly userRepository: UserRepository,
        private readonly cryptService: CryptService,
        private readonly mailService: MailService,
    ) {}

    private readonly jwtSecret = 'your_jwt_secret';


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
  

    async validateAttendant(email: string, password: string): Promise<any> {
      const user = await this.userRepository.findAttendantByEmail(email);
      if (user && await this.cryptService.compare(password, user.password)) {
          const { password, ...result } = user;
          return result;
      }
      return null;
  }

  async validateRequester(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findRequesterByEmail(email);
    if (user && await this.cryptService.compare(password, user.password)) {
        const { password, ...result } = user;
        return result;
    }
    return null;
  }

  async login(email: string, password: string) {
      let user = await this.validateAttendant(email, password);
      if (!user)
          user = await this.validateRequester(email, password);

      if (!user) {
          throw new UnauthorizedException("Invalid credentials");
      }

      const payload = {
          sub: user.id,
          email: user.email,
          role: user.role,
      };

      return {
          access_token: this.jwtService.sign(payload),
      };
  }

}