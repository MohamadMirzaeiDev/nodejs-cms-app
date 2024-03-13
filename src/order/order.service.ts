import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { StatusResult } from 'src/shared/status-result/status-result';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo:Repository<Order>,
    @Inject(forwardRef(()=>ProductService))
    private readonly productService:ProductService  , 
    @Inject(forwardRef(()=>UserService))
    private readonly userService:UserService , 
  ){}

  async create(createOrderDto: CreateOrderDto):Promise<StatusResult>{
    const { productId  , product_count , userId} = createOrderDto ;
    const statusResult:StatusResult = {
      message : 'Item created successfully' ,
      success : true 
    }

    try {
      const user = await this.userService.findById(userId);
      const product = await this.productService.findOne(productId);
      const orderExist = await this.orderRepo.findOne({where : {product : {id : product.id}}})


      if(orderExist){
        throw new BadRequestException('Order is exist')
      }

      if(product.count < product_count){
        throw new BadRequestException('The number of products in the warehouse is less than your request')
      }

      const total_price = product.price * product_count ;
      const userTotalPrice = user.purchase_amount += total_price ; 
      const userOrderCount = user.order_count += 1 ;

      await this.userService.updateOrderInfo(user.id , userOrderCount , userTotalPrice);

      const newOrder = new Order()
      newOrder.total_price = total_price ;
      newOrder.user = user ;
      newOrder.product_count = product_count ;
      newOrder.product = product ;
      
      const result = await this.orderRepo.save(newOrder);
      statusResult.Id = result.id ; 
    } catch (error) {
      return {
        message : error.message , 
        success : false , 
      }
    }


    return statusResult ; 
  }

  async findAll():Promise<Order[]>{
    return await this.orderRepo.find({relations : {user : true , product : true}})
  }

  async findOne(id: string):Promise<Order>{
    const order = await this.orderRepo.findOne({where : {id} ,relations : {user : true , product : true}});

    if(!order){
      throw new NotFoundException('Order not found')
    }
    
    return order ;
  }


  async updateStatus(id:string, updateOrderStatusDto:UpdateOrderStatusDto):Promise<StatusResult>{
    const { status } = updateOrderStatusDto;

    try {
      const order = await this.findOne(id);
      order.status = status ;
      await this.orderRepo.save(order);
    } catch (error) {
      return {
        message : error.message , 
        success : false 
      }
    }
    
    return {
      message : 'Status edited successfully',
      success : true 
    }
  }


  async getUserOrder(userId:string):Promise<Order[]>{
    return await this.orderRepo.find({where : {user : {id : userId}}}) ;
  }


  async getProductOrder(productId:string):Promise<Order[]>{
    return await this.orderRepo.find({where : {product : {id : productId}}}) ;
  }

  async remove(id: string):Promise<StatusResult>{
    await this.orderRepo.delete({id})
    return {
      message : 'Item removed successfully',
      success : true , 
    }
  }
}
