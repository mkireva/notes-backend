import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
import { Score } from './entities/scoreЕntity';
import { ScoresService } from './scores.service';

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
    return this.scoresService.findOne(id);
  }

  @ApiCreatedResponse({ type: Score })
  @ApiBadRequestResponse()
  //Post
  @Post()
  create(@Body() createItemDto: CreateScoreDto): Promise<Score> {
    return this.scoresService.create(createItemDto);
  }
  //Delete
  @Delete(':id')
  delete(@Param('id') id): Promise<Score> {
    return this.scoresService.delete(id);
  }
  //Update
  @Put(':id')
  update(
    @Body() updateScoreDto: CreateScoreDto,
    @Param('id') id,
  ): Promise<Score> {
    return this.scoresService.update(id, updateScoreDto);
  }
}
