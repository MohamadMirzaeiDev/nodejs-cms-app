import { IsNotEmpty, IsString } from "class-validator";
import { Role } from "../enum/role.enum";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    first_name : string ; 
    
    @IsNotEmpty()
    @IsString()
    last_name : string ; 

    @IsNotEmpty()
    @IsString()
    email : string ;
    
    @IsNotEmpty()
    @IsString()
    username : string ; 
    
    @IsNotEmpty()
    @IsString()
    password : string ; 

    @IsNotEmpty()
    roles : Role[] ; 
}