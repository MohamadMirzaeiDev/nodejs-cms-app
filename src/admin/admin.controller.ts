import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from 'express';
import { HasRole } from "src/auth/decorator/role.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/role.guard";
import { Role } from "src/user/enum/role.enum";


@ApiBearerAuth('access-token')
@ApiTags('Admin')
@Controller('admin')
export class AdminController {

    @Get('')
    @HasRole(Role.ADMIN)
    @UseGuards(JwtAuthGuard , RolesGuard)
    async me(@Req() req:Request){
        return req.user ;
    }

}