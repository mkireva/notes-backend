import { ApiProperty } from '@nestjs/swagger';

export class Score {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name?: string;
}
