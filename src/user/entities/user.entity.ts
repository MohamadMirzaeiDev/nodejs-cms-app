import { BeforeInsert, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../enum/role.enum";
import * as bcrypt from 'bcrypt';
import { Order } from "src/order/entities/order.entity";
@Entity({name : "User"})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id : string ;

    @Column({type : 'varchar'})
    first_name : string ; 

    @Column({type : 'varchar'})
    last_name : string ; 

    @Column({type : 'varchar' , nullable : false})
    email : string ;

    @Column({type : 'varchar' , nullable : false , unique : true})
    username : string ; 

    @BeforeInsert()
    hashPassword(){
        this.password = bcrypt.hashSync(this.password , 12);
    }

    @Column({type : 'varchar' , nullable : false})
    password : string ; 

    @Column({type : 'enum' , enum : Role , array : true , default : [Role.DEFAULT]})
    roles : Role[] ; 

    @Column({type : 'varchar' , nullable : true})
    home_phone_number : string;
    
    @Column({type : 'varchar' , nullable : true})
    phone_number : string ; 

    @Column({type : 'varchar', nullable : true})
    address : string ;

    @Column({type : 'varchar' , nullable : true})
    country : string ;
    
    @Column({type : 'varchar' , nullable : true})
    city : string ; 

    @Column({type : 'varchar' , nullable : true})
    postal_code: string ;

    @Column({type : 'varchar' , nullable : true})
    note : string ; 

    @OneToMany(()=>Order , (order)=>order.user)
    orders : Order[] ;
}
