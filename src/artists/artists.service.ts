import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/users/entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}
  async findArtist(userId: number): Promise<Artist | null> {
    const artist = await this.artistRepository.findOneBy({
      user: { id: userId },
    });
    return artist;
  }
  async findArtistByUserId(userId: number): Promise<Artist> {
    const artist = await this.artistRepository.findOneBy({
      user: { id: userId },
    });
    if (!artist)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    return artist;
  }
}
