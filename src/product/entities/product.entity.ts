import { Category } from "src/category/entities/category.entity";
import { Column, Entity, ManyToOne, OneToMany   , PrimaryGeneratedColumn } from "typeorm";
import { Order } from "src/order/entities/order.entity";

@Entity({name : 'Product'})
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type : 'varchar' , nullable: false})
    unique_id : string ; 

    @Column({type : 'varchar' , array : true , nullable : true})
    images : string[];
    
    @Column({type : 'varchar' , nullable : false})
    name : string ; 
    
    @Column({type : 'varchar' , nullable : false})
    description : string ; 

    @Column({type : 'int' , nullable : false})
    price : number ; 

    @Column({type : 'int' , nullable : false })
    comments : number ;

    @Column({type : 'varchar' , array : true , nullable :false})
    tags: string[] ;

    @Column({type : 'varchar' , nullable : false })
    weight: string ; 

    @Column({type : 'boolean' , nullable : false })
    isDigital :boolean ; 

    @Column({type : 'int' , nullable : false })
    score : number ; 

    @Column({type : 'int' , nullable : false})
    count : number ;

    @Column({type : 'boolean' , default : false})
    inـstock :boolean ; 

    @Column({type : 'varchar' , nullable : false})
    country : string ; 

    @ManyToOne(()=>Category , (category)=>category.products , {cascade : true ,onDelete: "CASCADE"})
    category:Category ;

    @OneToMany(()=>Order , (order)=>order.product)
    orders : Order[];
}
