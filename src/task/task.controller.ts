import { Controller, Get, Post, Body, Param, Delete, UseGuards, BadRequestException, Req, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/user/enum/role.enum';
import { HasRole } from 'src/auth/decorator/role.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { UpdateTaskDto } from './dto/update-task.dto';


@ApiTags('Task')
@ApiBearerAuth('access-token')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @HasRole(Role.ADMIN)
  @UseGuards(JwtAuthGuard , RolesGuard)
  async create(@Body() createTaskDto: CreateTaskDto) {
    const result = await this.taskService.create(createTaskDto);

    if(!result.success){
      throw new BadRequestException(result.message)
    }

    return result ; 
  }

  @Get()
  @HasRole(Role.ADMIN)
  @UseGuards(JwtAuthGuard , RolesGuard)
  async findAll() {
    return await this.taskService.findAll();
  }

  @Get('user-task/:id')
  @HasRole(Role.ADMIN)
  @UseGuards(JwtAuthGuard , RolesGuard)
  async findOneUserTask(@Req() req:Request , @Param('id') id:string) {
    const user = req.user as User ;
    return await this.taskService.findOneUserTask(user , id);
  }



  @Get('user-task/')
  @UseGuards(JwtAuthGuard)
  async findUserTask(@Req() req:Request) {
    const user = req.user as User ;
    return await this.taskService.findAllUserTask(user);
  }


  @Put('user-task/:id')
  @UseGuards(JwtAuthGuard)
  async updateTask(
    @Req() req:Request , 
    @Body() dto:UpdateTaskDto ,
    @Param('id') id:string
  ) {
    const user = req.user as User ;
    const res = await this.taskService.updateStatus(dto , id , user);

    if(!res.success){
      throw new BadRequestException(res.message)
    }

    return res ; 
  }


  @Delete(':id')
  @HasRole(Role.ADMIN)
  @UseGuards(JwtAuthGuard , RolesGuard)
  async remove(@Param('id') id: string) {
    const res = await this.taskService.remove(id);

    if(!res.success){
      throw new BadRequestException(res.message)
    }

    return res 
  }
}
