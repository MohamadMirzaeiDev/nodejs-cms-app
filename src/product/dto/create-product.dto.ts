import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateProductDto {
    // @ApiProperty()
    // @IsNotEmpty()
    // @IsString()    
    // images : string[];
    
   
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
    color : string ; 
    
    
 
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    size : string ; 


    @ApiProperty()
    @IsNotEmpty()
    count : number ;


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    inـstock :boolean ; 

    @ApiProperty()
    categoryId?: string;
}
