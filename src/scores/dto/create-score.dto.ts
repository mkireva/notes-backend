import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, MaxLength } from 'class-validator';

export class CreateScoreDto {
  @ApiProperty()
  @IsAlphanumeric()
  @MaxLength(10)
  name: string;
}
