import { ApiProperty } from '@nestjs/swagger';

export class Score {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  author: string;
  @ApiProperty()
  text: string;
  @ApiProperty()
  year: number;
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
