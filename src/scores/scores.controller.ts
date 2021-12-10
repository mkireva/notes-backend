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
  UsePipes,
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

@ApiTags('scores')
@Controller('scores')
@UseInterceptors(CacheInterceptor, BenchmarkInterceptor)
export class ScoresController {
  constructor(private scoresService: ScoresService) {}
  @ApiOkResponse({ type: Score, isArray: true })
  @ApiQuery({ name: 'name', required: false })
  //GetAll Request
  @Get()
  @CacheKey('allScores')
  @CacheTTL(15)
  findAll(@Query('name') name?: string): Promise<Score[]> {
    return this.scoresService.findAll();
  }
  @ApiOkResponse({
    type: Score,
    description: 'the rescore has been successfully returned',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse()

  // GetOne
  @Get(':id')
  @ApiOkResponse({
    type: Score,
    description: 'the rescore has been successfully returned',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @CacheTTL(15)
  findOne(@Param('id') id): Promise<Score> {
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

  @ApiCreatedResponse({ type: Score })
  @ApiBadRequestResponse()
  //Post
  @Post()
  @ApiCreatedResponse({
    type: Score,
    description: 'the rescore has been successfully created',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseFilters(ValidationExceptionFilter)
  async create(@ScoreData(ValidationPipe) ScoreDto: ScoreDto): Promise<Score> {
    return await this.scoresService.create(ScoreDto);
  }
  //Delete
  @Delete(':id')
  @ApiOkResponse({
    type: Score,
    description: 'the rescore has been successfully deleted',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  delete(@Param('id') id: string): Promise<Score> {
    return this.scoresService.delete(id);
  }
  //Update
  @Put(':id')
  @ApiOkResponse({
    type: Score,
    description: 'the rescore has been successfully updated',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  update(
    @Body() updateScoreDto: ScoreDto,
    @Param(':id') id: string,
  ): Promise<Score> {
    return this.scoresService.update(id, updateScoreDto);
  }
}
