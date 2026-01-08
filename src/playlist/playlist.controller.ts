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

@Controller('playlists')
export class PlaylistController {
  constructor(private playListService: PlaylistService) {}
  @Post()
  create(
    @Body()
    playlistDTO: CreatePlaylistDto,
  ): Promise<Playlist> {
    return this.playListService.create(playlistDTO);
  }
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
