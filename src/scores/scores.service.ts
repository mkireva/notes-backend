import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ScoreDto } from './dto/score.dto';
import { Score } from './entities/scoreEntity';
import { ScoresRepository } from './scores.repository';

@Injectable()
export class ScoresService {
  constructor(private readonly scoresRepository: ScoresRepository) {}

  async getScores(): Promise<Score[]> {
    return this.scoresRepository.find({});
  }

  async getScoreById(scoreId: string): Promise<Score> {
    return this.scoresRepository.findOne({ scoreId });
  }

  async createScore(
    scoreId: string,
    title: string,
    author: string,
    text: string,
    year: number,
    createdAt: string,
    key: string,
    color: string,
    category: string,
    description: string,
    lyrics: string,
    url: string,
  ): Promise<Score> {
    return this.scoresRepository.create({
      scoreId: uuidv4(),
      title,
      author,
      text,
      year,
      createdAt,
      key,
      color,
      category,
      description,
      lyrics,
      url,
    });
  }

  async updateScore(scoreId: string, scoreUpdates: ScoreDto): Promise<Score> {
    return this.scoresRepository.findOneAndUpdate({ scoreId }, scoreUpdates);
  }
}
