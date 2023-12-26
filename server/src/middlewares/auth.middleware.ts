import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = (req.headers as any).authorization;
    const [type, token] = authorizationHeader?.split(' ') ?? [];
    type === 'Bearer' ? token : undefined;

    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    } else {
      const payload = await this.jwtService.verifyAsync(token);
      console.log(payload);
      req.user = payload;
      next();
    }
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const authorizationHeader = (request.headers as any).authorization;
    const [type, token] = authorizationHeader?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
