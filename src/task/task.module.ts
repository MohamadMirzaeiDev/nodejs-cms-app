import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Module({
  imports : [
    UserModule , 
    TypeOrmModule.forFeature([Task]),
  ] , 
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
