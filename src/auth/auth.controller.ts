import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @Get('register')
    async signUp(){

    }


    @Post('login')
    async signIn(){

    }

    @Post('verify')
    async veerify(){

    }
}
