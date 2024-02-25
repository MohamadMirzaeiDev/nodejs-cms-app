import { IsNotEmpty, IsString } from "class-validator";

export class VerifyDto {
    @IsString()
    @IsNotEmpty()
    email : string ; 

    @IsString()
    @IsNotEmpty()
    otpCode : string ; 
}