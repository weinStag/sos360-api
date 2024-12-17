import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).send('Token is required');
    }

    try {
      const decoded = jwt.verify(token, 'your_jwt_secret');
      req['user'] = decoded;
      next();
    } catch (err) {
      return res.status(401).send('Invalid token');
    }
  }
}
