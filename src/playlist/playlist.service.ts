import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Playlist } from './entities/playlist.entity';
import { User } from 'src/users/entities/user.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { Song } from 'src/songs/entities/song.entity';
@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
    @InjectRepository(Song) private readonly songRepository: Repository<Song>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(playlistDTO: CreatePlaylistDto): Promise<Playlist> {
    const playlist = new Playlist();
    playlist.name = playlistDTO.name;
    const songs = await this.songRepository.findBy({
      id: In(playlistDTO.songs),
    });
    playlist.songs = songs;
    const user = await this.userRepository.findOneBy({ id: playlistDTO.user });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    playlist.user = user;
    console.log(playlist);
    return await this.playlistRepository.save(playlist);
  }
  async findAll(): Promise<Playlist[]> {
    return await this.playlistRepository.find({
      relations: ['user', 'songs'],
    });
  }
}
