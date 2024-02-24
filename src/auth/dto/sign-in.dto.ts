import { IsNotEmpty, Length } from "class-validator";

export class SignInDto {
    @IsNotEmpty()
    username : string ;
    
    @IsNotEmpty()
    password : string ; 
}