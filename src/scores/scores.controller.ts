import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateScoreDto } from './dto/create-score.dto';
import { Score } from './entities/score.entity';
import { ScoresService } from './scores.service';

@ApiTags('scores')
@Controller('scores')
export class ScoresController {
  constructor(private scoresService: ScoresService) {}
  @ApiOkResponse({ type: Score, isArray: true })
  @ApiQuery({ name: 'name,', required: false })
  @Get()
  getScores(@Query('name') name?: string): Score[] {
    return this.scoresService.findAll(name);
  }
  @ApiOkResponse({ type: Score, description: 'the score is there' })
  @ApiNotFoundResponse()
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): Score {
    const score = this.scoresService.findById(id);
    if (!score) {
      throw new NotFoundException();
    }
    return score;
  }
  @ApiCreatedResponse({ type: Score })
  @ApiBadRequestResponse()
  @Post()
  createScore(@Body() body: CreateScoreDto): Score {
    return this.scoresService.createScore(body);
  }
}
