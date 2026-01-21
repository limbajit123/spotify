import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('playlists')
@ApiTags('Playlists')
export class PlaylistController {
  constructor(private playListService: PlaylistService) {}

  @ApiOperation({ summary: 'Create playlist' })
  @ApiResponse({
    status: 200,
    description: 'It will return playlist in the response',
  })
  @Post()
  create(
    @Body()
    playlistDTO: CreatePlaylistDto,
  ): Promise<Playlist> {
    return this.playListService.create(playlistDTO);
  }

  @ApiOperation({ summary: 'Get all playlist' })
  @ApiResponse({
    status: 200,
    description: 'It will return all playlist in the response',
  })
  @Get()
  findAll(): Promise<Playlist[]> {
    try {
      return this.playListService.findAll();
    } catch (error) {
      throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }
}
