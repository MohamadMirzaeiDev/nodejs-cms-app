import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'Category'})
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id : string ; 

    @Column({type : 'varchar' , nullable : false})
    name : string ; 

    @Column({type : 'varchar' , nullable : true})
    image : string ; 


    @Column({type : 'boolean' , nullable : true , default : true})
    visibale : boolean;


    @OneToMany(()=> Product , (product)=>product.category)
    products : Product[] ;
}
