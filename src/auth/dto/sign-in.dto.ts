import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class SignInDto {
    @ApiProperty({type : 'string'})
    @IsNotEmpty()
    username : string ;
    
    @ApiProperty()
    @IsNotEmpty()
    password : string ; 
}