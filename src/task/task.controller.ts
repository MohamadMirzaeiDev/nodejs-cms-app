import { Controller, Get, Post, Body, Param, Delete, UseGuards, BadRequestException } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/user/enum/role.enum';
import { HasRole } from 'src/auth/decorator/role.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


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
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  @HasRole(Role.ADMIN)
  @UseGuards(JwtAuthGuard , RolesGuard)
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Delete(':id')
  @HasRole(Role.ADMIN)
  @UseGuards(JwtAuthGuard , RolesGuard)
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
