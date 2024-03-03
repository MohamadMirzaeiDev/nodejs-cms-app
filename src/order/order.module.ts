import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports : [
    ProductModule , 
    TypeOrmModule.forFeature([Order])
  ] , 
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
