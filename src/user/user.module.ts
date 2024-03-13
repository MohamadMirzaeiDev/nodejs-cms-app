import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports : [
    forwardRef(()=>OrderModule) ,
    TypeOrmModule.forFeature([User])
  ] ,
  controllers : [UserController] , 
  providers: [UserService],
  exports : [UserService]
})
export class UserModule {}
