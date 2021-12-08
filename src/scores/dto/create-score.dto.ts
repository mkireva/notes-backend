import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, MaxLength } from 'class-validator';

export class CreateScoreDto {
  // @ApiProperty()
  // @IsAlphanumeric()
  // @MaxLength(10)
  id: string;
  title: string;
  author: string;
  text: string;
  year: number;
  key: string;
  color: string;
  category: string;
  description: string;
  url: string;
}
