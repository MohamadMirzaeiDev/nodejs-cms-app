import { Category } from "src/category/entities/category.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { randomIntGenerator } from 'src/shared/random-int-generator/random-int-generator'

@Entity({name : 'Product'})
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type : 'varchar'  , default : randomIntGenerator(6).toString() ,})
    unique_id : string ; 

    @Column({type : 'varchar' , array : true , nullable : true})
    images : string[];
    
    @Column({type : 'varchar' , nullable : false})
    name : string ; 
    
    @Column({type : 'varchar' , nullable : false})
    description : string ; 

    @Column({type : 'varchar' , nullable : false})
    color : string ; 
        
    @Column({type : 'varchar' , nullable : false})
    size : string ; 

    @Column({type : 'int' , nullable : false})
    count : number ;

    @Column({type : 'boolean' , nullable : false})
    inـstock :boolean ; 

    @ManyToOne(()=>Category , (category)=>category.products)
    category:Category ;
}
