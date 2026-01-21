import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateTokenDto {
  @ApiProperty({ example: 'token', description: 'Provide token' })
  @IsNotEmpty()
  @IsString()
  token: string;
}
