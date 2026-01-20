import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './constants';
import { JWTStrategy } from './jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ArtistsModule } from 'src/artists/artists.module';
import { ApiKeyStrategy } from './ApiKeyStrategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
    ArtistsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy, ApiKeyStrategy],
  exports: [AuthService],
})
export class AuthModule {}
