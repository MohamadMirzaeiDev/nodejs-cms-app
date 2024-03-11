import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsString, IsTimeZone } from "class-validator";
import { CouponStatus } from "../enum/coupon.enum";
import { ApiProperty } from "@nestjs/swagger";
import { CouponType } from "../enum/type.enum";

export class CreateCouponDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name : string ; 
    
    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    isActive : boolean ; 

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description : string ; 

    @ApiProperty()
    @IsEnum(CouponStatus)
    @IsNotEmpty()
    status : CouponStatus ; 

    @ApiProperty()
    @IsNotEmpty()
    expire_time : Date ;

    @ApiProperty()
    @IsEnum(CouponType)
    @IsNotEmpty()
    type : CouponType ; 
}
