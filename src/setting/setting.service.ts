import { Injectable } from '@nestjs/common';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Repository } from 'typeorm';
import { Setting } from './entities/setting.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting)
    private readonly settignRepo:Repository<Setting>
  ){}


  private async _seedSettign():Promise<Setting>{
    const setting = await this.settignRepo.findOne({where : {default_id : 1}})

    if(!setting){
      const newSetting = new Setting()
      const result = await this.settignRepo.save(newSetting);
      return result ;
    }

    return setting ; 
  }

  async findAll():Promise<Setting>{
    return await this._seedSettign()
  }


  async update(updateSettingDto: UpdateSettingDto):Promise<Setting>{
    const { 
      emptyProductList , 
      numberDispaly , 
      outOfStockProduct , 
      pendingOrder , 
      taskNotDone ,
    } = updateSettingDto;
    
    const setting = await this._seedSettign()

    setting.emptyProductList = emptyProductList ;
    setting.numberDispaly = numberDispaly ;
    setting.outOfStockProduct = outOfStockProduct ;
    setting.pendingOrder = pendingOrder ;
    setting.taskNotDone = taskNotDone ;

    const result = await this.settignRepo.save(setting);
    return result ; 
  }
}
