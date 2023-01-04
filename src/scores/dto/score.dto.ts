import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsDateString, IsDate, IsOptional } from 'class-validator';

export class ScoreDto {
  @ApiProperty({
    type: String,
    description: 'id of the score',
    default: '',
  })
  @IsString()
  readonly scoreId: string;
  @ApiProperty({
    type: String,
    description: 'Title of the score',
    default: 'Vehadi',
  })
  @IsString()
  readonly title: string;
  @ApiProperty({
    type: String,
    description: ' Subtitle of the score',
    default: 'Parvi bozhestven den',
  })
  @IsString()
  readonly subTitle: string;

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

  @ApiProperty({
    type: Date,
    format: 'date-time',
    description: 'Date of the score',
    default: '2022-05-30T08:29:55.094Z',
  })
  @IsDate()
  @Type(() => Date)
  readonly scoreDate: Date;

  @ApiProperty({
    type: String,
    description: 'createdAt of the the score',
    default: '17.06.1925',
  })
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

export class ScoreUpdateDto {
  @ApiProperty({
    type: String,
    description: 'id of the score',
    default: '',
  })
  @IsOptional()
  @IsString()
  readonly scoreId: string;
  @ApiProperty({
    type: String,
    description: 'Title of the score',
    default: 'Vehadi',
  })
  @IsOptional()
  @IsString()
  readonly title: string;
  @ApiProperty({
    type: String,
    description: ' Subtitle of the score',
    default: 'Parvi bozhestven den',
  })
  @IsOptional()
  @IsString()
  readonly subTitle: string;

  @ApiProperty({
    type: String,
    description: 'Music Author of the score',
    default: 'Beinsa Duno',
  })
  @IsOptional()
  @IsString()
  readonly author: string;
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Lyrics author of the score',
    default: 'Beinsa Duno',
  })
  readonly text: string;

  @ApiProperty({
    type: Date,
    format: 'date-time',
    description: 'Date of the score',
    default: '2022-05-30T08:29:55.094Z',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly scoreDate: Date;

  @ApiProperty({
    type: String,
    description: 'createdAt of the the score',
    default: '17.06.1925',
  })
  @IsOptional()
  @IsString()
  readonly createdAt: string;
  @IsOptional()
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
  @IsOptional()
  @IsString()
  readonly color: string;
  @ApiProperty({
    type: String,
    description: 'Category  of the score',
    default: 'Vatan Songs',
  })
  @IsOptional()
  @IsString()
  readonly category: string;
  @ApiProperty({
    type: String,
    description: 'Description of the score',
    default:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
  })
  @IsOptional()
  @IsString()
  readonly description: string;
  @ApiProperty({
    required: true,
    type: String,
    description: 'Lyrics  of the score',
    default: 'Vehadi, Vehadi, Vehadi,Vehadi, Vehadi, Vehadi.',
  })
  @IsOptional()
  @IsString()
  readonly lyrics: string;

  @ApiProperty({
    type: String,
    description: ' Url of the score',
    default: 'www.beinsa.de',
  })
  @IsOptional()
  @IsString()
  readonly url: string;
}
