import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schema/user.schema';
import { IsUser } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

Injectable();
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<IsUser>) {}

  public async getAllUsers(): Promise<IsUser[]> {
    const result = await this.userModel.find();

    return result;
  }

  public async getOneUser(id: string): Promise<IsUser> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  // public async getUserByEmail(email: string): Promise<IsUser> {
  //   const result = await this.userModel.findOne(email);
  //   if (!result) {
  //     throw new NotFoundException(`User ${email} not found`);
  //   }
  //   return result;
  // }

  public async getUserByUsername(username: string): Promise<IsUser> {
    const result = await this.userModel.findOne({ username });

    return result;
  }

  public async deleteUser(id: string): Promise<IsUser> {
    const user = await this.userModel.findByIdAndDelete(id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  public async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IsUser> {
    const user = await this.userModel.findById(id, updateUserDto, {
      new: true,
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }
}
