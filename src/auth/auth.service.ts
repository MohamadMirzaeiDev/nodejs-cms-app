import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from 'src/user/user.service';
import { Role } from 'src/user/enum/role.enum';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt.payload';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UserService , 
        private readonly jwtService:JwtService , 
    ){}

    private async _signToken(payload:JwtPayload){
        return await this.jwtService.signAsync(payload , );
    }


    async verify(){

    }

    async signUp(signUpDto:SignUpDto){
        const {
            first_name , 
            last_name , 
            username , 
            password , 
            email
        } = signUpDto ;
        
        
        const user = new User()
        user.email = email ; 
        user.username = username ; 
        user.password = password ; 
        user.first_name = first_name ; 
        user.last_name = last_name ; 


        const countUser = await this.userService.userCounter() ;

        if(countUser === 0){
            user.roles = [Role.ADMIN , Role.DEFAULT]
        }

        const savedUser = await this.userService.create(user);

        const payload:JwtPayload = {
            role : savedUser.roles , 
            sub : user.id , 
            username : user.username , 
        }

        const token = await this._signToken(payload);


        return {token} ; 

    }

    async signIn(signInDto:SignInDto){
        const {username , password} = signInDto ;
        
        const user = await this.userService.findOne({username}) ;


        if(!user){
            throw new BadRequestException('username or password is invalid')
        }

        const validPass = await bcrypt.compare(password , user.password);

        if(!validPass){
            throw new BadRequestException('username or password is invalid')
        }

        const payload:JwtPayload = {
            sub : user.id , 
            role : user.roles , 
            username : user.username , 
        }

        const token = await this._signToken(payload);


        return {token} ; 
    }
}
