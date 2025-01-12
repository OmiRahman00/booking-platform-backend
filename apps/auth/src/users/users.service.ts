import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {
  }
  //create method is used to create a new user.
  async create(createUserDto: CreateUserDto) {
    await this.validateCreateUserDto(createUserDto);//validate the CreateUserDto object.
    return this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }
  //validateCreateUserDto method is used to validate the CreateUserDto object.
  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({ email: createUserDto.email });
    if (existingUser) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }
  //verifyUser method is used to verify the user credentials.
  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }
  //getUser method is used to get the user by the GetUserDto object.
  async getUser(getUserDto: GetUserDto) {
    return this.usersRepository.findOne(getUserDto);
  }

}
