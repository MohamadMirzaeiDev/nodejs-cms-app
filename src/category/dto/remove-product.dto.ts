import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class RemoveProductDto {
    @IsNotEmpty()
    @ApiProperty()
    productId : string ;
}