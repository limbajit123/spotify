import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { Enable2FAType } from 'src/types/auth-types';
import { UpdateResult } from 'typeorm';
import { ValidateTokenDto } from './dto/validate-token.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: 201,
    description: 'It will return the user in the response',
  })
  @Post('signup')
  signup(@Body() userDTO: CreateUserDto): Promise<User> {
    return this.userService.create(userDTO);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'It will return the access token in the response',
  })
  @Post('login')
  login(@Body() loginDTO: LoginDto) {
    return this.authService.login(loginDTO);
  }

  @ApiOperation({ summary: 'Enable 2FA' })
  @ApiResponse({
    status: 200,
    description: 'It will return the secret key in the response',
  })
  @Post('enable-2fa')
  @UseGuards(JwtAuthGuard)
  enable2FA(@Request() req): Promise<Enable2FAType> {
    return this.authService.enable2FA(req.user.userId);
  }

  @ApiOperation({ summary: 'Disable 2FA' })
  @ApiResponse({
    status: 200,
    description: 'Disable 2FA',
  })
  @Post('disable-2fa')
  @UseGuards(JwtAuthGuard)
  disable2FA(@Request() req): Promise<UpdateResult> {
    return this.authService.disable2FA(req.user.userId);
  }

  @ApiOperation({ summary: 'Validate 2FA' })
  @ApiResponse({
    status: 200,
    description: 'Validate 2FA',
  })
  @Post('validate-2fa')
  @UseGuards(JwtAuthGuard)
  validate2FA(
    @Request() req,
    @Body() validateTokenDto: ValidateTokenDto,
  ): Promise<{ verified: boolean }> {
    return this.authService.validate2FAToken(
      req.user.userId,
      validateTokenDto.token,
    );
  }

  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'Get user profile',
  })
  @Get('profile')
  @UseGuards(AuthGuard('bearer'))
  getProfile(@Request() req) {
    return { user: req.user, msg: 'Authenticated with api key' };
  }
}
