import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LogDeRequisicoesMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const inicio = Date.now();
    const { method, originalUrl } = req;

    res.on('finish', () => {
      const duracao = Date.now() - inicio;
      const { statusCode } = res;

      console.log(`${method} ${originalUrl} ${statusCode} - ${duracao}ms`);
    });

    next();
  }
}
