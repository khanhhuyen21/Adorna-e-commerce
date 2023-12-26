import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    try {
      const req = context.switchToHttp().getRequest();
      const roleNum = req.user.roleId;
      if (roleNum === 2) {
        return true;
      } else if (!roleNum) {
        return false;
      }
    } catch (error) {
      throw new UnauthorizedException('Access is not authorized');
    }
  }
}
