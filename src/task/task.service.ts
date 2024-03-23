import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UserService } from 'src/user/user.service';
import { StatusResult } from 'src/shared/status-result/status-result';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    private readonly userService:UserService , 
    @InjectRepository(Task)
    private readonly taskRepo:Repository<Task>
  ){}

  async create(createTaskDto: CreateTaskDto):Promise<StatusResult>{
    const { 
      email , 
      title ,
      expire_time , 
    } = createTaskDto ;

    const statusResult:StatusResult = {
      message : 'Item created successfully' ,
      success : true , 
    }

    try {
      const user = await this.userService.findByEmail(email) ;
      const currentDate = new Date();
      const currentExpireTime = new Date(expire_time);

      if(currentDate > currentExpireTime){
        throw new BadRequestException('The selected time has passed')
      }

      const newTask = new Task();

      newTask.expire_time = expire_time ;
      newTask.title = title; 
      newTask.user = user; 
    
      const savedTask = await this.taskRepo.save(newTask);
      statusResult.Id = savedTask.id ;
    } catch (error) {
      return {
        message : error.message , 
        success : false , 
      }
    }

    return statusResult ;
  }

  async findAll():Promise<Task[]>{
    return await this.taskRepo.find({relations : {user : true}})
  }

  async findOne(id:string):Promise<Task>{
    const task = await this.taskRepo.findOne({where:{id} , relations : {user : true}});

    if(!task){
      throw new NotFoundException('Task is not found')
    }

    return task
  }

  async remove(id:string ):Promise<StatusResult>{
    try {
      await this.findOne(id);
      await this.taskRepo.delete({id})
    } catch (error) {
      return {
        message : error.message , 
        success : false ,
      }
    }

    return {
      message : 'Item removed successfully' , 
      success : true , 
    }
  }
}
