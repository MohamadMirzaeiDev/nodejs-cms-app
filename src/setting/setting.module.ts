import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([Setting]) , 
    UserModule ,
  ],
  controllers: [SettingController],
  providers: [SettingService],
})
export class SettingModule {}
