import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CouponStatus } from "../enum/coupon.enum";
import { CouponType } from "../enum/type.enum";

@Entity({name : 'Coupon'})
export class Coupon {
    @PrimaryGeneratedColumn('uuid')
    id:string ;

    @Column({type : 'varchar' , nullable : true })
    usage : string ;

    @Column({type : 'varchar' , nullable : false})
    name : string ; 

    @Column({type : 'varchar' , nullable : false})
    value : string ; 

    @Column({type : 'varchar' , nullable : false})
    code : string ; 

    @Column({type:'enum' , enum : CouponStatus , default : CouponStatus.VALID})
    status : CouponStatus ; 

    @Column({type:'enum' , enum : CouponType , default : CouponType.PRICE_DISCOUNT})
    type : CouponType ; 

    @Column({type : 'date' , nullable : true})
    duration : Date ;
}
