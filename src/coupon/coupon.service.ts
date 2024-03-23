import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { StatusResult } from 'src/shared/status-result/status-result';
import { CouponStatus } from './enum/coupon.enum';
import { randomIntGenerator } from 'src/shared/random-int-generator/random-int-generator';

type Where = FindOptionsWhere<Coupon> ;

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepo:Repository<Coupon>
  ){}

  async create(createCouponDto: CreateCouponDto):Promise<StatusResult>{
    const {
      name ,
      type ,
      code , 
      duration , 
      value 
    } = createCouponDto ; 

    const statusResult:StatusResult = {
      message : 'Item created successfully',
      success : true , 
    }

    try {
      const couponExist = await this.couponRepo.findOne({where : {code}});

      if(couponExist){
        throw new BadRequestException('Coupon alredy exist')
      }


      const newCoupon = new Coupon()
        newCoupon.usage = randomIntGenerator(3);
        newCoupon.name = name ;
        newCoupon.code = code;
        newCoupon.duration = duration;
        newCoupon.value = value;
        newCoupon.type = type ; 

      const currentDate = new Date();
      const currentDuration = new Date(duration)
    
      if(currentDuration < currentDate){
        newCoupon.status = CouponStatus.INVALID 
      }else {
        newCoupon.status = CouponStatus.VALID 
      }

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
      code , 
      duration , 
      name , 
      type , 
      value
    } = updateCouponDto ;

    try {
      const coupon = await this.findOne({id});
      const currentDate = new Date();
      const currentDuration = new Date(duration);

      if(currentDuration < currentDate){
        coupon.status = CouponStatus.INVALID
      }else{
        coupon.status = CouponStatus.VALID
      }


      coupon.code = code ;
      coupon.name = name ; 
      coupon.type = type ; 
      coupon.duration = duration ;
      coupon.value = value ;

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
