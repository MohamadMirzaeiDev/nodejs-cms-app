import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty } from "class-validator";

export class UpdateAdminDto {
    @ApiProperty()
    first_name : string ; 
    
    @ApiProperty()
    last_name : string ; 

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

    @ApiProperty()
    username : string ;

    @ApiProperty()
    email : string ; 
}