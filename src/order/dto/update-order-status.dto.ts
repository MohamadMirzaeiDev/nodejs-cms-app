import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { OrderStatus } from "../enum/order-status.enum";
import { IsNotEmpty } from "class-validator";

export class UpdateOrderStatusDto {
    @IsNotEmpty()
    @ApiProperty()
    status:OrderStatus ;
}