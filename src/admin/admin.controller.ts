import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { Request } from 'express';
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@ApiTags('Admin')
@Controller('admin')
export class AdminController {

    @UseGuards(JwtAuthGuard)
    @Get('')
    async me(@Req() req:Request){
        return req.user ;
    }

}