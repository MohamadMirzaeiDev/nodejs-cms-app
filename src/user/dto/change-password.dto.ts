import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ChangePasswordDto {
    @ApiProperty()
    @IsNotEmpty()
    password : string ; 
}