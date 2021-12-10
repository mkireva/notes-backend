import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ScoresController } from './scores.controller';
import { ScoresService } from './scores.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Score, ScoreSchema } from './schema/score.schema';
import { AuditMiddleware } from 'src/common/middleware/audit.middleware';
import { max } from 'class-validator';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Score.name, schema: ScoreSchema }]),
    CacheModule.register({
      ttl: 5, //seconds,
      max: 100, //max number of Items in cache})
      //Todo add redis with more parameter
    }),
  ],
  controllers: [ScoresController],
  providers: [ScoresService],
})
export class ScoresModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuditMiddleware)
      .forRoutes({ path: 'scores/*', method: RequestMethod.DELETE });
  }
}
