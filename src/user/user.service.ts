import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOptionsWhere, FindOptionsWhereProperty, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusResult } from 'src/shared/status-result/status-result';

type Where = FindOptionsWhere<User>

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo:Repository<User> , 
  ){}

  async findAll() :Promise<User[]>{
    return this.userRepo.find({})
  }

  async findOne(where:Where) {
    return await this.userRepo.findOne({where});
  }

  async findById(id:string):Promise<User>{
    const user = await this.userRepo.findOneBy({id})

    if(!user){
      throw new NotFoundException("user is not found")
    }

    return user ; 
  }


  async userCounter():Promise<number>{
    return await this.userRepo.count();
  }

  async create(createUserDto:CreateUserDto):Promise<User>{
    const {
      email , 
      first_name ,
      last_name , 
      password , 
      roles , 
      username ,
    } = createUserDto ;

    if(await this.findOne({email})){
      throw new BadRequestException('this email alredy exist')
    }

    if(await this.findOne({username})){
      throw new BadRequestException('this username alredy exist')
    }

    const user = new User()
   
    user.email = email ;
    user.first_name = first_name ;
    user.last_name = last_name; 
    user.username =  username ; 
    user.password = password ;
    user.roles = roles;

    const result = await this.userRepo.save(user);

    return result ; 
  }

  async update(id: string, updateUserDto: UpdateUserDto):Promise<StatusResult>{
    const {
      email ,
      username , 
      first_name , 
      last_name , 
    } = updateUserDto ; 

    const result:StatusResult = {
      message : 'user edited successfully' ,
      success : true 
    }

    try {
      await this.findById(id)

      await this.userRepo
                .createQueryBuilder()
                .update(User)
                .set({first_name , last_name, email , username})
                .where("id = :id",{id})
                .execute()
                
    } catch (error) {
      return {
        message : error.message ,
        success : false 
      }
    }


    return result ; 
  }

  async changePassword(id:string , password:string):Promise<StatusResult>{
    const result:StatusResult = {
      message : "Password successfully changed",
      success : true
    }

  
    try {
      await this.findById(id);

      await this.userRepo
                .createQueryBuilder()
                .update(User)
                .set({password})
                .where("id = :id", {id})
                .execute()
      
    } catch (error) {
      return {
        message : error.message ,
        success : false 
      }
    }

    return result ;

  }

  async remove(id:string):Promise<StatusResult>{
    await this.userRepo.delete({id})
    return {
      message : 'User removed successfully',
      success : true 
    }
  }
}
