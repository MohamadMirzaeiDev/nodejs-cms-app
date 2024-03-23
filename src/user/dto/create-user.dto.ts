import { IsEnum, IsNotEmpty, IsString } from "class-validator";
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
    @IsEnum(Role)
    role : Role ; 
    


    @ApiProperty()
    @IsNotEmpty()
    home_phone_number : string;
    
  
    @ApiProperty()
    @IsNotEmpty()
    phone_number : string ; 

   
    @ApiProperty()
    @IsNotEmpty()
    address : string ;

  
    @ApiProperty()
    @IsNotEmpty()
    country : string ;
    
    
    @ApiProperty()
    @IsNotEmpty()
    city : string ; 

    
    @ApiProperty()
    @IsNotEmpty()
    postal_code: string ;

    @ApiProperty()
    @IsNotEmpty()
    note : string ; 
}