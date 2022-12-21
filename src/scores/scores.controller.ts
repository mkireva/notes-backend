import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpException,
  HttpStatus,
  UseFilters,
  CacheKey,
  CacheTTL,
  UseInterceptors,
  CacheInterceptor,
  Patch,
  Query,
  Delete,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ScoreDto } from './dto/score.dto';
import { Score } from './entities/scoreEntity';
import { ScoresService } from './scores.service';
import { ScoreData } from './decorators/scoredata.decorator';
import { ValidationExceptionFilter } from 'src/filters/validation-exception.filter';
import { BenchmarkInterceptor } from '../interceptors/benchmark.interceptor';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { PaginationParameters } from './dto/pagination-parameters.dto';

@ApiTags('scores')
@Controller('scores')
@UseInterceptors(CacheInterceptor, BenchmarkInterceptor)
export class ScoresController {
  constructor(private scoresService: ScoresService) {}

  //GetAll Request
  @Get()
  @ApiOkResponse({
    type: Score,
    isArray: true,
    description: 'The score list has been successfully returned',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse()
  @ApiQuery({ name: 'name', required: false })
  @CacheKey('allScores')
  @CacheTTL(15)
  async getScores(
    @Query() getScoresParameters: PaginationParameters,
  ): Promise<Score[]> {
    console.log(getScoresParameters);
    return this.scoresService.getScores(getScoresParameters);
  }
  //Count
  @Get('count')
  async countScores(): Promise<number> {
    return this.scoresService.countScores();
  }

  // GETONE
  @Get(':scoreId')
  @CacheTTL(30)
  @ApiOkResponse({
    type: Score,
    description: 'the rescore has been successfully returned',
  })
  @UseFilters(HttpExceptionFilter)
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse()
  @CacheTTL(15)
  async getScore(@Param('scoreId') scoreId: string): Promise<Score> {
    return this.scoresService
      .getScoreById(scoreId)
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw new HttpException('Score not found', HttpStatus.NOT_FOUND);
        }
      })
      .catch(() => {
        throw new HttpException('Score not found', HttpStatus.NOT_FOUND);
      });
  }
  @ApiCreatedResponse({
    type: Score,
    description: 'The score list has been successfully returned',
  })
  @ApiBadRequestResponse()

  //POST
  @Post()
  @ApiCreatedResponse({
    type: Score,
    description: 'the score has been successfully created',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseFilters(HttpExceptionFilter)
  @UseFilters(new ValidationExceptionFilter())
  async create(@Body() @ScoreData() ScoreDto: ScoreDto): Promise<Score> {
    return await this.scoresService.createScore(
      ScoreDto.scoreId,
      ScoreDto.title,
      ScoreDto.subTitle,
      ScoreDto.author,
      ScoreDto.text,
      ScoreDto.createdAt,
      ScoreDto.scoreDate,
      ScoreDto.key,
      ScoreDto.color,
      ScoreDto.category,
      ScoreDto.description,
      ScoreDto.lyrics,
      ScoreDto.url,
    );
  }
  //UPDATE
  @Patch(':scoreId')
  @ApiCreatedResponse({
    type: Score,
    description: 'the score has been successfully updated',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async updateScore(
    @Param('scoreId') scoreId: string,
    @Body() scoreDto: ScoreDto,
  ): Promise<Score> {
    return this.scoresService.updateScore(scoreId, scoreDto);
  }

  @Delete(':scoreId')
  @ApiCreatedResponse({
    type: Score,
    description: 'the score has been successfully deleted',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async deleteMany(@Param('scoreId') scoreId: string): Promise<boolean> {
    return this.scoresService.deleteScore(scoreId);
  }
}
