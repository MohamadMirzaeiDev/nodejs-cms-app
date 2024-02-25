import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from 'express';
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller('admin')
export class AdminController {

    @UseGuards(JwtAuthGuard)
    @Get('')
    async me(@Req() req:Request){
        return req.user ;
    }

}