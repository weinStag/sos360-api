import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
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
}
