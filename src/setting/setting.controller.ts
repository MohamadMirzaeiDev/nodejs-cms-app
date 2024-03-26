import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { SettingService } from './setting.service';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/user/enum/role.enum';
import { HasRole } from 'src/auth/decorator/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@ApiTags('Setting')
@ApiBasicAuth('access-token')
@Controller('setting')
export class SettingController {
  constructor(
    private readonly settingService: SettingService ,
    private readonly userService:UserService , 
  ) {}

  @Get()
  @HasRole(Role.ADMIN)   
  @UseGuards(JwtAuthGuard , RolesGuard)
  findAll() {
    return this.settingService.findAll();
  }


  @Put('')
  @HasRole(Role.ADMIN)   
  @UseGuards(JwtAuthGuard , RolesGuard)
  update(@Body() dto: UpdateSettingDto) {
    return this.settingService.update(dto);
  }

  @Put('admin')
  @HasRole(Role.ADMIN)   
  @UseGuards(JwtAuthGuard , RolesGuard)
  async updateDetails(@Req() req:Request ,  @Body() dto:UpdateAdminDto){
    const user = req.user as User ; 
    const result = await this.userService.update(user.id , {...dto , roles: user.roles})

    if(!result.success){
      throw new BadRequestException(result.success)
    }

    return result ; 
  }
}
