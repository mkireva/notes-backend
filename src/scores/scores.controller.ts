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
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
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

@ApiTags('scores')
@Controller('scores')
export class ScoresController {
  constructor(private scoresService: ScoresService) {}
  @ApiOkResponse({ type: Score, isArray: true })
  @ApiQuery({ name: 'name', required: false })
  //GetAll Request
  @Get()
  findAll(@Query('name') name?: string): Promise<Score[]> {
    return this.scoresService.findAll();
  }
  @ApiOkResponse({ type: Score, description: 'the score is there' })
  @ApiNotFoundResponse()
  // GetOne
  @Get(':id')
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
  @UseFilters(ValidationExceptionFilter)
  create(@ScoreData(ValidationPipe) ScoreDto: ScoreDto): Promise<Score> {
    return this.scoresService.create(ScoreDto);
  }
  //Delete
  @Delete(':id')
  delete(@Param('id') id): Promise<Score> {
    return this.scoresService.delete(id);
  }
  //Update
  @Put(':id')
  update(@Body() updateScoreDto: ScoreDto, @Param(':id') id): Promise<Score> {
    return this.scoresService.update(id, updateScoreDto);
  }
}
