import { Injectable } from '@nestjs/common';
import { Score } from './entities/scoreEntity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ScoreDto } from './dto/score.dto';

@Injectable()
export class ScoresService {
  constructor(
    @InjectModel('Score') private readonly scoreModel: Model<Score>,
  ) {}

  async findAll(title?: string): Promise<Score[]> {
    return await this.scoreModel.find();
  }

  async findOne(id: string): Promise<Score> {
    return await this.scoreModel.findOne({ _id: id });
  }
  async create(score: Score): Promise<Score> {
    const newScore = new this.scoreModel(score);
    return await newScore.save();
  }

  async delete(id: string): Promise<Score> {
    return await this.scoreModel.findByIdAndRemove(id);
  }
  async update(id: string, score: Score): Promise<Score> {
    return await this.scoreModel.findByIdAndUpdate(id, score, { new: true });
  }
}
