import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsDate, MaxLength } from 'class-validator';
import { IsString, IsInt } from 'class-validator';

export class ScoreDto {
  @ApiProperty({
    type: String,
    description: 'Title of the score',
    default: 'Vehadi',
  })
  @IsString()
  readonly title: string;
  @ApiProperty({
    type: String,
    description: 'Music Author of the score',
    default: 'Beinsa Duno',
  })
  @IsString()
  readonly author: string;
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Lyrics author of the score',
    default: 'Beinsa Duno',
  })
  readonly text: string;
  @IsInt()
  @ApiProperty({
    type: Number,
    description: 'Year author of the score',
    default: '1933',
  })
  readonly year: number;
  @ApiProperty({
    type: String,
    description: 'id of the the score',
    default: '17.06.1925',
  })
  // @IsAlphanumeric()
  // @MaxLength(10)
  @IsString()
  readonly createdAt: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Key of the score',
    default: 'd minor',
  })
  readonly key: string;
  @ApiProperty({
    type: String,
    description: 'Color of the score',
    default: 'orange',
  })
  @IsString()
  readonly color: string;
  @ApiProperty({
    type: String,
    description: 'Category  of the score',
    default: 'Vatan Songs',
  })
  @IsString()
  readonly category: string;
  @ApiProperty({
    type: String,
    description: 'Description of the score',
    default:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
  })
  @IsString()
  readonly description: string;
  @ApiProperty({
    required: true,
    type: String,
    description: 'Lyrics  of the score',
    default: 'Vehadi, Vehadi, Vehadi,Vehadi, Vehadi, Vehadi.',
  })
  @IsString()
  readonly lyrics: string;

  @ApiProperty({
    type: String,
    description: ' Url of the score',
    default: 'www.beinsa.de',
  })
  @IsString()
  readonly url: string;
}
