import { createParamDecorator } from '@nestjs/common';

export const ScoreData = createParamDecorator((data: string, req) => {
  return data ? req.body && req.body[data] : req.body;
});
