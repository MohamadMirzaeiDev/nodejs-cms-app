import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class VerifyDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email : string ; 

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    otpCode : string ; 
}