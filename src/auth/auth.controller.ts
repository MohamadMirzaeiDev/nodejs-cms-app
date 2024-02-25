import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService ,
    ){}
    @Post('signup')
    async signUp(@Body() signUpDto:SignUpDto){
        return this.authService.signUp(signUpDto)
    }


    @Post('signin')
    async signIn(@Body() signInDto:SignInDto){
        return this.authService.signIn(signInDto);
    }

    @Post('verify')
    async veerify(){

    }
}