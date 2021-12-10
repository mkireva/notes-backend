import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, MaxLength } from 'class-validator';
import { IsString, IsInt } from 'class-validator';

export class ScoreDto {
  @ApiProperty({ type: String, description: 'Title of the score', default: '' })
  // @IsAlphanumeric()
  // @MaxLength(10)
  @IsString()
  id: string;
  @ApiProperty({ type: String, description: 'Title of the score', default: '' })
  @IsString()
  title: string;
  @ApiProperty({ type: String, description: 'Title of the score', default: '' })
  @IsString()
  author: string;
  @IsString()
  @ApiProperty({ type: String, description: 'Title of the score', default: '' })
  text: string;
  @IsInt()
  @ApiProperty({ type: Number, description: 'Title of the score', default: '' })
  year: number;
  @IsString()
  @ApiProperty({ type: String, description: 'Title of the score', default: '' })
  key: string;
  @ApiProperty({
    type: String,
    description: 'Title of the score',
    default: ' c dur',
  })
  @IsString()
  color: string;
  @ApiProperty({ type: String, description: 'Title of the score', default: '' })
  @IsString()
  category: string;
  @ApiProperty({ type: String, description: 'Title of the score', default: '' })
  @IsString()
  description: string;
  @ApiProperty({ type: String, description: 'Title of the score', default: '' })
  @IsString()
  lyrics: string;
  @ApiProperty({ type: String, description: 'Title of the score', default: '' })
  @IsString()
  url: string;
}
