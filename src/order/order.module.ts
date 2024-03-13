import { Module, forwardRef } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports : [
    forwardRef(()=>UserModule) , 
    forwardRef(()=>ProductModule) , 
    TypeOrmModule.forFeature([Order])
  ] , 
  controllers: [OrderController],
  providers: [OrderService],
  exports : [OrderService]
})
export class OrderModule {}
