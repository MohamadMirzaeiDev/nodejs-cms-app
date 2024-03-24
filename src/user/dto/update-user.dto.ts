import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Role } from "../enum/role.enum";

export class UpdateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    first_name : string ; 
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    last_name : string ; 


    @ApiProperty()
    @IsNotEmpty()da
    roles : Role[] ; 
    

    @ApiProperty()
    @IsNotEmpty()
    phone_number : string;

    @ApiProperty()
    @IsNotEmpty()
    home_phone_number : string;
   
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