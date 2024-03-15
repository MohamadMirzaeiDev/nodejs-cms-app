import { BadRequestException, Body, Controller, Get, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from 'express';
import { HasRole } from "src/auth/decorator/role.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/role.guard";
import { Role } from "src/user/enum/role.enum";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { UserService } from "src/user/user.service";


@ApiBearerAuth('access-token')
@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(
        private readonly userService:UserService
    ){}
    
    @Get('')
    @HasRole(Role.ADMIN)
    @UseGuards(JwtAuthGuard , RolesGuard)
    async me(@Req() req:Request){
        return req.user ; 
    }

    @Put('/password')
    @HasRole(Role.ADMIN)
    @UseGuards(JwtAuthGuard , RolesGuard)
    async updatePassword(@Req() user:any , @Body() changePassswordDto:ChangePasswordDto){
        const result = await this.userService.changePassword(changePassswordDto , user.id);

        if(!result.success){
            throw new BadRequestException(result.message);
        }

        return result ; 
    }

}