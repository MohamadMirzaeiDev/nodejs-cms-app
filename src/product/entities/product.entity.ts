import { Category } from "src/category/entities/category.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { randomIntGenerator } from 'src/shared/random-int-generator/random-int-generator'
import { Order } from "src/order/entities/order.entity";

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
    price : string ; 

    @Column({type : 'int' , default : randomIntGenerator(2)})
    comments : number ;

    @Column({type : 'varchar' , array : true , nullable :false})
    tags: string[] ;

    @Column({type : 'varchar' , nullable : false })
    weight: string ; 

    @Column({type : 'boolean' , nullable : false })
    isDigital :boolean ; 

    @Column({type : 'int' , default : randomIntGenerator(1)})
    score : number ; 

    @Column({type : 'int' , nullable : false})
    count : number ;

    @Column({type : 'boolean' , default : false})
    inـstock :boolean ; 

    @ManyToOne(()=>Category , (category)=>category.products)
    category:Category ;

    @OneToMany(()=>Order , (order)=>order.product)
    orders : Order[];
}
