import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "../enums/task-status.enum";
import { User } from "src/user/entities/user.entity";

@Entity({name : 'task'})
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type : 'varchar' , nullable : false})
    title : string ;

    @Column({type : 'enum' , enum : TaskStatus , default : TaskStatus.PENDING})
    status : TaskStatus ;

    @ManyToOne(()=>User , (user)=>user.tasks)
    user : User ; 

    @Column({type:'date' , nullable : false })
    expire_time : Date ;

    @Column({type:'date' , default : new Date()})
    created_at : Date ;

    @Column({type:'date' , default : new Date()})
    updated_at : Date ;
}
