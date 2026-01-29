import {
  Controller,
  // Get,
  // Param,
  // ParseIntPipe,
  // UseGuards,
} from '@nestjs/common';
// import { UsersService } from './users.service';
// import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('users')
// @ApiTags('Users')
export class UsersController {
  // constructor(private readonly userService: UsersService) {}
  // @ApiOperation({ summary: 'Get all users' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'It will return all users in the response',
  // })
  // @Get()
  // async findAll() {
  //   return this.userService.findAll();
  // }
  // @ApiOperation({ summary: 'Get user by id' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'It will return a user in the response',
  // })
  // @Get(':id')
  // @UseGuards(JwtAuthGuard)
  // findOne(
  //   @Param('id', ParseIntPipe)
  //   id: number,
  // ) {
  //   const result = this.userService.findById(id);
  //   return result;
  // }
}
