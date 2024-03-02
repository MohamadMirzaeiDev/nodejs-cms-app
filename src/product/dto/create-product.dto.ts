import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsString, Max, Min } from "class-validator";

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
    @IsString()
    price : string ; 
    

    @ApiProperty()
    @IsNotEmpty()
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
    categoryId?: string;
}
