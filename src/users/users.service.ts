import { Injectable } from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from './repository/user.repository';
import { IsUser } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IsUser>,
    private userRepository: UserRepository,
  ) {}

  // async create(userDto: CreateUserDto): Promise<User> {
  //   const newUser = new this.userModel({
  //     userDto,
  //   });
  //   return await newUser.save();
  // }

  async findAllUsers(): Promise<IsUser[]> {
    const results = await this.userRepository.getAllUsers();

    return results;
  }

  // async findOneByEmail(email: string): Promise<IsUser> {
  //   const result = await this.userRepository.getUserByEmail(email);

  //   return result;
  // }
  async updateUserImage(id: string, imagePath: string) {
    return this.userRepository.updateUserImage(id, imagePath);
  }
  async findByUsername(username: string): Promise<IsUser> {
    const result = await this.userRepository.getUserByUsername(username);

    return result;
  }

  async findById(id: string): Promise<IsUser> {
    const user = await this.userRepository.getOneUser(id);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.updateUser(id, updateUserDto);
  }

  async remove(id: string) {
    await this.userRepository.deleteUser(id);
  }
}
