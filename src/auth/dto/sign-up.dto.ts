import { IsEmail, IsNotEmpty, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";

export class SignUpDto {
    @IsNotEmpty()
    first_name : string ; 
    
    @IsNotEmpty()
    last_name : string ; 
    
    @IsNotEmpty()
    @IsEmail()
    email : string ;
    
    @IsNotEmpty()
    username : string ; 
    
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password : string ;
}