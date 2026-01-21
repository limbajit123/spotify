import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { Song } from './entities/song.entity';
import { UpdateSongDto } from './dto/update-song.dto';
import { UpdateResult } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtArtistGuard } from 'src/auth/jwt/jwt-artist.guard';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('songs')
@ApiTags('Songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @ApiOperation({ summary: 'Create new song' })
  @ApiResponse({
    status: 201,
    description: 'It will return the song in the response',
  })
  @Post()
  @UseGuards(JwtArtistGuard)
  create(@Body() createSongDTO: CreateSongDto, @Request() req): Promise<Song> {
    const result = this.songsService.create(createSongDTO);
    return result;
  }

  @ApiOperation({ summary: 'Get all songs' })
  @ApiResponse({
    status: 200,
    description: 'It will return all the songs in the response',
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('sortBy') sortBy: string = 'releasedDate',
    @Query('order') order: 'ASC' | 'DESC' = 'DESC',
  ): Promise<Pagination<Song>> {
    try {
      limit = limit > 100 ? 100 : limit;
      return this.songsService.paginate({ page, limit }, sortBy, order);
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  @ApiOperation({ summary: 'Get song by id' })
  @ApiResponse({
    status: 200,
    description: 'It will return the song in the response',
  })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    try {
      const result = this.songsService.findOne(id);
      return result;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  @ApiOperation({ summary: 'Update song by id' })
  @ApiResponse({
    status: 200,
    description: 'It will return the updated song in the response',
  })
  @Put(':id')
  @UseGuards(JwtArtistGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDTO: UpdateSongDto,
  ): Promise<UpdateResult> {
    return this.songsService.update(id, updateSongDTO);
  }

  @ApiOperation({ summary: 'Delete song by id' })
  @ApiResponse({
    status: 200,
    description: 'It will return the deleted song in the response',
  })
  @Delete(':id')
  @UseGuards(JwtArtistGuard)
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.songsService.remove(id);
  }
}
