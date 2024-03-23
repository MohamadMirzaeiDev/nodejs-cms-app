import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    email : string ; 


    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title : string ;



    @IsNotEmpty()
    @ApiProperty()
    expire_time : Date;
}