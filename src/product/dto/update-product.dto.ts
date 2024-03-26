import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDto {
    @ApiProperty()
    name : string ;
   
    @ApiProperty()
    description : string ; 
    
    @ApiProperty()
    price : number ; 

    @ApiProperty()
    count : number ;

    @ApiProperty()
    tags : string[]

    @ApiProperty()
    weight: string ; 

    @ApiProperty()
    isDigital :boolean ; 

    @ApiProperty()
    country :string ; 

    @ApiProperty()
    categoryId?: string;
}
