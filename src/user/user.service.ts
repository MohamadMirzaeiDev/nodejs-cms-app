import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOptionsWhere, FindOptionsWhereProperty, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

type Where = FindOptionsWhere<User>

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo:Repository<User> , 
  ){}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() :Promise<User[]>{
    return this.userRepo.find({})
  }

  async findOne(where:Where) {
    return await this.userRepo.findOne({where});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
