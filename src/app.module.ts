import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerModule } from './common/middleware/logger/logger.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { DevConfigService } from './common/providers/DevConfigService';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/entities/song.entity';
import { User } from './users/entities/user.entity';
import { Artist } from './users/entities/artist.entity';
import { Playlist } from './playlist/entities/playlist.entity';
import { PlaylistModule } from './playlist/playlist.module';
// import { SongsController } from './songs/songs.controller';

// const devConfig = {
//   port: 3000,
// };
// const proConfig = {
//   port: 400,
// };

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // dialect: configService.getOrThrow<string>('DB_DIALECT'),
        host: configService.getOrThrow<string>('DB_HOST'),
        port: +configService.getOrThrow<string>('DB_PORT'),
        username: configService.getOrThrow<string>('DB_USERNAME'),
        password: configService.getOrThrow<string>('DB_PASSWORD'),
        database: configService.getOrThrow<string>('DB_NAME'),
        // autoLoadModels: true,
        synchronize: true,
        // logging: false,
        entities: [Song, Artist, User, Playlist],
      }),
    }),
    SongsModule,
    PlaylistModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   // provide: DevConfigService,
    //   // useClass: DevConfigService,
    //   provide: 'CONFIG',
    //   useFactory: () => {
    //     console.log(process.env.NODE_ENV);
    //     return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
    //   },
    // },
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    console.log(dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs');
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.GET });
    // consumer.apply(LoggerMiddleware).forRoutes(SongsController); //option no 3
  }
}
