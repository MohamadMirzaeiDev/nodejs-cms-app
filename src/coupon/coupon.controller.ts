import { Controller, Get, Post, Body, Patch, Param, Delete, Put, BadRequestException, UseGuards } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/user/enum/role.enum';
import { HasRole } from 'src/auth/decorator/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';

@ApiTags('Coupon')
@ApiBearerAuth('access-token')
@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  @HasRole(Role.ADMIN)   
  @UseGuards(JwtAuthGuard , RolesGuard)
  async create(@Body() createCouponDto: CreateCouponDto) {
    const result = await this.couponService.create(createCouponDto);
    
    if(!result.success){
      throw new BadRequestException(result.message)
    }

    return result ; 
  }

  @Get()
  @HasRole(Role.ADMIN)   
  @UseGuards(JwtAuthGuard , RolesGuard)
  findAll() {
    return this.couponService.findAll();
  }

  @Get(':id')
  @HasRole(Role.ADMIN)   
  @UseGuards(JwtAuthGuard , RolesGuard)
  async indOne(@Param('id') id: string) {
    return await this.couponService.findOne({id});
  }

  @Put(':id')
  @HasRole(Role.ADMIN)   
  @UseGuards(JwtAuthGuard , RolesGuard)
  async update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    const result = await this.couponService.update(id, updateCouponDto);
    
    if(!result.success){
      throw new BadRequestException(result.message)
    }

    return result ; 
  }

  @Delete(':id')
  @HasRole(Role.ADMIN)   
  @UseGuards(JwtAuthGuard , RolesGuard)
  async remove(@Param('id') id: string) {
    const result = await this.couponService.remove(id);
    
    if(!result.success){
      throw new BadRequestException(result.message)
    }

    return result ; 
  }
}
