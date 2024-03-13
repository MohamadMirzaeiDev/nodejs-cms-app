import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Max } from "class-validator";

export class CreateOrderDto {
    @ApiProperty()
    @IsNotEmpty()
    @Max(40)
    @IsNumber()
    product_count:number  ;

    @ApiProperty()
    @IsNotEmpty()
    productId : string ; 

    @ApiProperty()
    @IsNotEmpty()
    userId : string ; 
}
