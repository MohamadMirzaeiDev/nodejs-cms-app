import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsString, Max, Min } from "class-validator";

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
    count : number ;


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    inـstock :boolean ; 

    @ApiProperty()
    @IsNotEmpty()
    tags : string[]

    @ApiProperty()
    @IsNotEmpty()
    comments : string[] ;

    @ApiProperty()
    @IsNotEmpty()
    weight: string ; 

    @ApiProperty()
    @IsNotEmpty()
    isDigital :boolean ; 

    @ApiProperty()
    @IsNotEmpty()
    @Max(5)
    score : number; 


    @ApiProperty()
    categoryId?: string;
}
