import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'Category'})
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id : string ; 

    @Column({type : 'varchar' , nullable : false})
    name : string ; 
}
