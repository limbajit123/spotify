import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'Provide first name of the user',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Provide last name of the user',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Provide email address of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd',
    description: 'Provide password for the account',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
