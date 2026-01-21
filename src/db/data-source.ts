import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import 'dotenv/config';
import { Playlist } from 'src/playlist/entities/playlist.entity';
import { Song } from 'src/songs/entities/song.entity';
import { Artist } from 'src/users/entities/artist.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: configService.get<string>('dbHost'),
      port: configService.get<number>('dbPort'),
      username: configService.get<string>('dbUsername'),
      password: configService.get<string>('dbPassword'),
      database: configService.get<string>('dbName'),
      entities: [User, Playlist, Artist, Song],
      synchronize: false,
      migrations: ['dist/db/migrations/*.js'],
    };
  },
};
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
