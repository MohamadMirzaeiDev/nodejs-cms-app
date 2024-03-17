import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, Max } from "class-validator";

export class CreateOrderDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Max(40 , {message : 'Invalid value'})
    product_count:number;

    @ApiProperty()
    @IsNotEmpty()
    productId:string; 

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email:string; 
}
