import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Req, BadRequestException, NotFoundException } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/user/enum/role.enum';
import { HasRole } from 'src/auth/decorator/role.decorator';
import { Request } from 'express';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@ApiTags('Order')
@ApiBearerAuth('access-token')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HasRole(Role.ADMIN)   
  @UseGuards(JwtAuthGuard , RolesGuard)
  async create(@Body() createOrderDto: CreateOrderDto) {
    const result = await this.orderService.create(createOrderDto);

    if(!result.success){
      throw new BadRequestException(result.message);
    }

    return result ;
  }

  @Get()
  @HasRole(Role.ADMIN)   
  @UseGuards(JwtAuthGuard , RolesGuard)
  async findAll() {
    return await this.orderService.findAll();
  }

  @Get(':id')
  @HasRole(Role.ADMIN)   
  @UseGuards(JwtAuthGuard , RolesGuard)
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Put(':id/status')
  @HasRole(Role.ADMIN)   
  @UseGuards(JwtAuthGuard , RolesGuard)
  async updateStatus(@Param('id') id: string, @Body() updateOrderStatusDto: UpdateOrderStatusDto) {
    const result = await this.orderService.updateStatus(id, updateOrderStatusDto);

    if(!result.success){
      throw new BadRequestException(result.message);
    }

    return result ; 
  }

  @Delete(':id')
  @HasRole(Role.ADMIN)   
  @UseGuards(JwtAuthGuard , RolesGuard)
  async remove(@Param('id') id: string) {
    return await this.orderService.remove(id);
  }
}
