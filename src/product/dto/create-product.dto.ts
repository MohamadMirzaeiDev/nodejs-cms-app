import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateProductDto {   
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name : string ; 

   
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description : string ; 
    

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price : number ; 
    

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    count : number ;

    @ApiProperty()
    @IsNotEmpty()
    tags : string[]

    @ApiProperty()
    @IsNotEmpty()
    weight: string ; 

    @ApiProperty()
    @IsNotEmpty()
    isDigital :boolean ; 

    @ApiProperty()
    @IsNotEmpty()
    country :string ; 

    @ApiProperty()
    categoryId?: string;
}
