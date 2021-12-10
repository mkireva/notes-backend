import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express-serve-static-core';
import { Response } from 'express';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('Logging Delete request IP', req.ip);
    console.log('Logging Delete request IP', req.path);
    console.log('Logging Delete request Headers', req.headers);
    next();
  }
}
