import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, Max } from "class-validator";

export class CreateOrderDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Max(40 , {message : 'The number of imported products is greater than the available number'})
    product_count:number;

    @ApiProperty()
    @IsNotEmpty()
    productId:string; 

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email:string; 
}
