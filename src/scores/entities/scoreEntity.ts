import { ApiProperty } from '@nestjs/swagger';

export class Score {
  @ApiProperty()
  scoreId: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  author: string;
  @ApiProperty()
  text: string;
  @ApiProperty()
  year: number;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  key: string;
  @ApiProperty()
  color: string;
  @ApiProperty()
  category: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  lyrics: string;
  @ApiProperty()
  url: string;
}
