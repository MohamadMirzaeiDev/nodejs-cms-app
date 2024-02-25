import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from 'express';
import { HasRoles } from "src/auth/decorator/role.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Role } from "src/user/enum/role.enum";

@ApiTags('Admin')
@Controller('admin')
export class AdminController {

    @Get('')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @UseGuards()
    async me(@Req() req:Request){
        return req.user ;
    }

}