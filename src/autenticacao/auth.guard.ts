import { CHAVE_ROTA_PUBLICA } from '@app/utils/rota-publica.decorator';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      CHAVE_ROTA_PUBLICA,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true;
    }

    const result = await super.canActivate(context);
    return result as boolean;
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw new UnauthorizedException(
        'Token inválido ou ausente. Acesse a rota /login para pegar o seu token',
      );
    }
    return user;
  }
}
