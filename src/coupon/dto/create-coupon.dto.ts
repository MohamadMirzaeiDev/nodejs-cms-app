import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CouponType } from "../enum/type.enum";
import { Transform } from "class-transformer";

export class CreateCouponDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name : string ; 


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    code : string ; 


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    value : string ; 

    @ApiProperty()
    @IsNotEmpty()
    duration : Date ;

    @ApiProperty()
    @IsEnum(CouponType)
    @IsNotEmpty()
    type : CouponType ; 
}
