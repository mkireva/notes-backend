import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'src/database/entry.repository';
import { Score, ScoreDocument } from './schema/score.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ScoresRepository extends EntityRepository<ScoreDocument> {
  constructor(@InjectModel(Score.name) scoreModel: Model<ScoreDocument>) {
    super(scoreModel);
  }
}
