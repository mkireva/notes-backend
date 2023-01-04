import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ScoreData = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const score = request.score;

    return data ? score?.[data] : score;
  },
);

//createParameterDecorator don't work
