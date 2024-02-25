import { IsNotEmpty, IsString } from "class-validator";
import { Role } from "../enum/role.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    first_name : string ; 
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    last_name : string ; 

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email : string ;


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username : string ; 
    

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password : string ; 


    @ApiProperty()
    @IsNotEmpty()
    roles : Role[] ; 
}