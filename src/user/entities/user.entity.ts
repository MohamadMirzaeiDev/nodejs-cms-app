import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({type : 'varchar' , nullable : false})
    password : string ; 
}
