import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../enum/role.enum";
import { IsEmail } from "class-validator";

export class UpdateUserDto {
    @ApiProperty()
    first_name : string ; 
    
    @ApiProperty()
    last_name : string ; 

    @ApiProperty()
    username : string ;

    @ApiProperty()
    email : string ; 

    @ApiProperty()
    roles : Role[] ; 
    
    @ApiProperty()
    phone_number : string;

    @ApiProperty()
    home_phone_number : string;
   
    @ApiProperty()
    address : string ;
  
    @ApiProperty()
    country : string ;
    
    @ApiProperty()
    city : string ; 
    
    @ApiProperty()
    postal_code: string ;

    @ApiProperty()
    note : string ; 
}