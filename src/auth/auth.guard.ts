import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    const authorization = ctx.req.headers['authorization'];
    if (!authorization) {
      return false;
    }

    try {
      const token = authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'your_jwt_secret');
      ctx.user = decoded;
      return true;
    } catch (err) {
      return false;
    }
  }
}
