import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, MaxLength } from 'class-validator';
import { IsString, IsInt } from 'class-validator';

export class ScoreDto {
  // @ApiProperty()
  // @IsAlphanumeric()
  // @MaxLength(10)
  @IsString()
  id: string;
  @IsString()
  title: string;
  @IsString()
  author: string;
  @IsString()
  text: string;
  @IsInt()
  year: number;
  @IsString()
  key: string;
  @IsString()
  color: string;
  @IsString()
  category: string;
  @IsString()
  description: string;
  @IsString()
  lyrics: string;
  @IsString()
  url: string;
}
