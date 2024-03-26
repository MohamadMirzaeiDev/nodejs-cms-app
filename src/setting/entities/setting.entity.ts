import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'Setting'})
export class Setting {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type:'int' , default : 1})
    default_id:number 
    
    @Column({type : 'boolean' , default : false})
    pendingOrder:boolean;

    @Column({type : 'boolean' , default : false})
    emptyProductList:boolean;

    @Column({type : 'boolean' , default : false})
    outOfStockProduct:boolean;

    @Column({type : 'boolean' , default : false})
    taskNotDone:boolean ;

    @Column({type:'int' , default : 0})
    numberDispaly:number;
}
