import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PaginationParameters } from './dto/pagination-parameters.dto';
import { UpdateScoreDto } from './dto/score.dto';
import { Score } from './entities/scoreEntity';
import { ScoresRepository } from './scores.repository';

@Injectable()
export class ScoresService {
  constructor(private readonly scoresRepository: ScoresRepository) {}

  async getScores(
    paginationParameters: PaginationParameters,
  ): Promise<Score[]> {
    return this.scoresRepository.find(paginationParameters, {});
  }

  async countScores(): Promise<number> {
    return this.scoresRepository.count();
  }

  async getScoreById(scoreId: string): Promise<Score> {
    return this.scoresRepository.findOne({ scoreId });
  }

  async createScore(
    title: string,
    subTitle: string,
    author: string,
    text: string,
    createdAt: string,
    scoreDate: Date,
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
      subTitle,
      author,
      text,
      scoreDate,
      createdAt,
      key,
      color,
      category,
      description,
      lyrics,
      url,
    });
  }

  async updateScore(
    scoreId: string,
    scoreUpdates: UpdateScoreDto,
  ): Promise<Score> {
    return this.scoresRepository.findOneAndUpdate({ scoreId }, scoreUpdates);
  }

  async deleteScore(scoreId: string): Promise<boolean> {
    return this.scoresRepository.deleteMany({ scoreId });
  }
}
