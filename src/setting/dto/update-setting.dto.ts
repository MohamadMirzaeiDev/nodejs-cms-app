import { ApiProperty } from "@nestjs/swagger";

export class UpdateSettingDto {
    @ApiProperty()
    pendingOrder:boolean;

    @ApiProperty()
    emptyProductList:boolean;

    @ApiProperty()
    outOfStockProduct:boolean;

    @ApiProperty()
    taskNotDone:boolean ;

    @ApiProperty()
    numberDispaly:number;
}
