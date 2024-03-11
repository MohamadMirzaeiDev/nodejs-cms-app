import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { StatusResult } from 'src/shared/status-result/status-result';

type Where = FindOptionsWhere<Coupon> ;

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepo:Repository<Coupon>
  ){}

  async create(createCouponDto: CreateCouponDto):Promise<StatusResult>{
    const {
      description , 
      expire_time , 
      isActive , 
      name , 
      status ,
      type ,
    } = createCouponDto ; 

    const statusResult:StatusResult = {
      message : 'Item created successfully',
      success : true , 
    }

    try {
      const currentDate = new Date();
    
      if(expire_time < currentDate){
        throw new BadRequestException('the time exised in current time ')
      }

      const couponExist = await this.couponRepo.findOne({where : {name}});

      if(couponExist){
        throw new BadRequestException('Coupon alredy exist')
      }


      const newCoupon = new Coupon()
        newCoupon.name = name ;
        newCoupon.description = description ; 
        newCoupon.expire_time = expire_time ;
        newCoupon.isActive = isActive;
        newCoupon.status = status ; 
        newCoupon.type = type ; 

      const savedCoupon = await this.couponRepo.save(newCoupon);
      statusResult.Id = savedCoupon.id ;
    } catch (error) {
      return {
        message : error.message , 
        success :  false ,
      }
    }

    return statusResult ; 
  }

  async findAll():Promise<Coupon[]>{
    return await this.couponRepo.find({});
  }

  async findOne(where:Where):Promise<Coupon>{
    const coupon = await this.couponRepo.findOne({where})

    if(!coupon){
      throw new NotFoundException('Coupon not found')
    }

    return coupon ; 
  }

  async update(id: string, updateCouponDto: UpdateCouponDto):Promise<StatusResult>{
    const {
      description , 
      name , 
      status , 
      type ,
      expire_time , 
      isActive ,
    } = updateCouponDto ;

    try {
      const coupon = await this.findOne({id});
      const currentDate = new Date();


      if(expire_time < currentDate){
        throw new BadRequestException('the time exised in current time ')
      }


      coupon.description = description ;
      coupon.name = name ; 
      coupon.status = status ;
      coupon.type = type ; 
      coupon.expire_time = expire_time ;
      coupon.isActive = isActive ;

      await this.couponRepo.save(coupon);
    } catch (error) {
      return {
        message : error.message ,
        success : false 
      }
    }

    return {
      message : 'Item edited successfully',
      success : true  ,
    }
  }

  async remove(id: string):Promise<StatusResult>{
    try {
      await this.findOne({id});
      await this.couponRepo.delete({id})
    } catch (error) {
      return {
        message:error.message,
        success:false,
      }
    }
    
    return {
      message : 'Item removed successfully',
      success : true , 
    }
  }
}
