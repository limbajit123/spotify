import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlaylistDto {
  @ApiProperty({
    example: 'My Playlist',
    description: 'Name of the playlist',
  })
  @IsString()
  @IsNotEmpty()
  readonly name;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'List of song ids',
  })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly songs;

  @ApiProperty({
    example: 1,
    description: 'Provide user id',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly user: number;
}
