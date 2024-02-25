import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";

export class SignUpDto {
    @ApiProperty()
    @IsNotEmpty()
    first_name : string ; 
    
    @ApiProperty()
    @IsNotEmpty()
    last_name : string ; 
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email : string ;
    
    @ApiProperty()
    @IsNotEmpty()
    username : string ; 
    
    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password : string ;
}