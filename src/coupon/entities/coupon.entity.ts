import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CouponStatus } from "../enum/coupon.enum";
import { CouponType } from "../enum/type.enum";

@Entity({name : 'coupon'})
export class Coupon {
    @PrimaryGeneratedColumn('uuid')
    id:string ;

    @Column({type : 'varchar' , nullable : false})
    name : string ; 

    @Column({type : 'boolean' , nullable : false})
    isActive : boolean ; 

    @Column({type : 'varchar' , nullable : false})
    description : string ; 

    @Column({type:'enum' , enum : CouponStatus , default : CouponStatus.PENDING})
    status : CouponStatus ; 

    @Column({type:'enum' , enum : CouponType , default : CouponType.FREE_DELIVERY})
    type : CouponType ; 

    @Column({type : 'date' , nullable : true})
    expire_time : Date ;
}
