import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid4 } from 'uuid';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(userDTO: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOneBy({
      email: userDTO.email,
    });
    if (existingUser) {
      throw new ConflictException(
        'User already exists with this email address.',
      );
    }
    const salt = await bcrypt.genSalt();
    userDTO.password = await bcrypt.hash(userDTO.password, salt);
    const user = new User();
    user.firstName = userDTO.firstName;
    user.lastName = userDTO.lastName;
    user.email = userDTO.email;
    user.apiKey = uuid4();
    user.password = userDTO.password;
    return await this.usersRepository.save(user);
  }
  async findOne(data: Partial<User>): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email: data.email });
    if (!user) {
      throw new NotFoundException('Could not find user');
    }
    return user;
  }
  async updateSecretKey(userId: number, secret: string): Promise<UpdateResult> {
    return this.usersRepository.update(
      { id: userId },
      {
        twoFASecret: secret,
        enable2FA: true,
      },
    );
  }
  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.usersRepository.update(
      { id: userId },
      {
        enable2FA: false,
        twoFASecret: null,
      },
    );
  }
  async findByApiKey(apiKey: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ apiKey });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }
}
