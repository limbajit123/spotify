import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSongDto {
  @ApiProperty({
    example: 'My Song',
    description: 'Provide title of the song',
  })
  @IsString()
  @IsNotEmpty()
  readonly title;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'List of artist ids',
  })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly artists;

  @ApiProperty({
    example: '2020-01-01',
    description: 'Provide released date of the song',
  })
  @IsDateString()
  @IsNotEmpty()
  readonly releasedDate: Date;

  @ApiProperty({
    example: '04:00',
    description: 'Provide duration of the song',
  })
  @IsMilitaryTime()
  @IsNotEmpty()
  readonly duration: Date;

  @ApiProperty({
    example: 'My Lyrics',
    description: 'Provide lyrics of the song',
  })
  @IsString()
  @IsOptional()
  readonly lyrics: string;
}
