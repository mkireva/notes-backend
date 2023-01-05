import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ScoresController } from './scores.controller';
import { ScoresService } from './scores.service';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { Score, ScoreSchema } from './schema/score.schema';
// import { AuditMiddleware } from 'src/common/middleware/audit.middleware';
import { ScoresRepository } from './scores.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Score.name, schema: SchemaFactory.createForClass(Score) },
    ]),
    CacheModule.register({
      ttl: 5, //seconds,
      max: 100, //max number of Items in cache})
      //Todo add redis with more parameter
    }),
  ],
  controllers: [ScoresController],
  providers: [ScoresService, ScoresRepository],
})
export class ScoresModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuditMiddleware);
    // consumer.apply(AuditMiddleware).forRoutes('*');
  }
}
