import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  HttpException,
  HttpStatus,
  UseFilters,
  CacheKey,
  CacheTTL,
  UseInterceptors,
  CacheInterceptor,
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
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ScoreDto } from './dto/score.dto';
import { Score } from './entities/scoreEntity';
import { ScoresService } from './scores.service';
import { ScoreData } from './decorators/scoredata.decorator';
import { ValidationExceptionFilter } from 'src/filters/validation-exception.filter';
import { BenchmarkInterceptor } from '../interceptors/benchmark.interceptor';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

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
  findAll(@Query('name') name: string): Promise<Score[]> {
    return this.scoresService.findAll(name);
  }

  // GETONE
  @Get(':id')
  @CacheTTL(30)
  @ApiOkResponse({
    type: Score,
    description: 'the rescore has been successfully returned',
  })
  @UseFilters(HttpExceptionFilter)
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse()
  @CacheTTL(15)
  findOne(@Param('id') id: string): Promise<Score> {
    return this.scoresService
      .findOne(id)
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
  async create(
    @Body(new ValidationPipe()) @ScoreData() ScoreDto: ScoreDto,
  ): Promise<Score> {
    console.log(ScoreDto);
    return await this.scoresService.create(ScoreDto);
  }
  //DELETE
  @Delete(':id')
  @ApiOkResponse({
    type: Score,
    description: 'the score has been successfully deleted',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  delete(@Param('id') id: string): Promise<Score> {
    return this.scoresService.delete(id);
  }

  //UPDATE
  @Put('/:id/status')
  @ApiOkResponse({
    type: Score,
    description: 'the score has been successfully updated',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  update(
    @Param('id') id: string,
    @Body() updateScoreDto: ScoreDto,
  ): Promise<Score> {
    return this.scoresService.update(id, updateScoreDto);
  }
}
