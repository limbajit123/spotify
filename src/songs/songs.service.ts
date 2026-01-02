import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Scope,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { connection } from 'src/common/middleware/constants/connection';
import type { Connection } from 'src/common/middleware/constants/connection';
import { Song } from './entities/song.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private readonly songRepository: Repository<Song>,
  ) {}

  async create(songDTO: CreateSongDto): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.releasedDate = songDTO.releasedDate;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    return await this.songRepository.save(song);
  }

  async findAll(): Promise<Song[]> {
    return await this.songRepository.find();
  }
  async findOne(id: number): Promise<Song> {
    const song = await this.songRepository.findOneBy({ id });
    if (!song) throw new HttpException('song not found', HttpStatus.NOT_FOUND);
    return song;
  }
  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.songRepository.delete(id);
  }
  async update(
    id: number,
    recordToUpdate: UpdateSongDto,
  ): Promise<UpdateResult> {
    await this.findOne(id);
    return await this.songRepository.update(id, recordToUpdate);
  }

  async paginate(
    options: IPaginationOptions,
    sortBy = 'releaseDate',
    order: 'ASC' | 'DESC' = 'DESC',
  ): Promise<Pagination<Song>> {
    const queryBuilder = this.songRepository.createQueryBuilder('song');
    queryBuilder.orderBy(`song.${sortBy}`, order);
    return paginate<Song>(queryBuilder, options);
  }
}
