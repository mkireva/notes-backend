import { Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { Score } from './entities/score.entity';

@Injectable()
export class ScoresService {
  private scores: Score[] = [
    { id: 0, name: 'Maria' },
    { id: 1, name: 'Elena' },
    { id: 2, name: 'Pavel' },
  ];
  findAll(name?: string): Score[] {
    if (name) {
      return this.scores.filter((score) => score.name === name);
    }
    return this.scores;
  }
  findById(scoreId: number): Score {
    return this.scores.find((score) => score.id === scoreId);
  }
  createScore(createScoreDto: CreateScoreDto): Score {
    const newScore = { id: Date.now(), ...createScoreDto };
    this.scores.push(newScore);
    return newScore;
  }
}
