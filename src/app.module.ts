import {
  MiddlewareConsumer,
  Module,
  NestModule,
  // RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerModule } from './common/middleware/logger/logger.module';
// import { LoggerMiddleware } from './common/middleware/logger.middleware';
// import { DevConfigService } from './common/providers/DevConfigService';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PlaylistModule } from './playlist/playlist.module';
// import { SongsController } from './songs/songs.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ArtistsModule } from './artists/artists.module';
import { typeOrmAsyncConfig } from './db/data-source';
import { SeedModule } from './seed/seed.module';
import configuration from './config/configuration';
import { validate } from './config/env.validation';

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
      envFilePath: [`${process.cwd()}/.env.${process.env.NODE_ENV}`],
      load: [configuration],
      validate: validate,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    // TypeOrmModule.forRoot(dataSourceOptions),
    SongsModule,
    PlaylistModule,
    LoggerModule,
    UsersModule,
    AuthModule,
    ArtistsModule,
    SeedModule,
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
