import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../enum/role.enum";
import * as bcrypt from 'bcrypt';
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
}
