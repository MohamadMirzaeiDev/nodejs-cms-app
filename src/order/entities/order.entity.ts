import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatus } from "../enum/order-status.enum";
import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";

@Entity({name : 'Order'})
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id : string ; 

    @Column({type : "int" , nullable : true , default : 0})
    total_price : number ; 
    
    @Column({type : "int" , nullable : false})
    product_count : number ; 

    @Column({type : 'enum' , enum : OrderStatus , default : OrderStatus.PENDING})
    status : OrderStatus ;

    @Column({type : 'date' , default : new Date()})
    created_at : Date ; 

    @ManyToOne(()=>Product , (product)=>product.orders)
    product : Product ; 

    @ManyToOne(()=>User , (user)=>user.orders)
    user : User
}
