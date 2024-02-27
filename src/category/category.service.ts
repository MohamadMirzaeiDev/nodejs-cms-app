import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { StatusResult } from 'src/shared/status-result/status-result';

type Where = FindOptionsWhere<Category>

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo:Repository<Category> ,
  ){}

  async create(createCategoryDto: CreateCategoryDto):Promise<StatusResult>{
    const {name} = createCategoryDto ;
    const statusResult:StatusResult = {
      message : "Itam created successfully",
      success : true , 
    }

    try {
      const category = await this.findOne({name});
      if(category) throw new BadRequestException('category alredy exist');

      const newCategory = new Category()
      newCategory.name = name ; 
      const savedCategory = await this.categoryRepo.save(newCategory);

      statusResult.Id = savedCategory.id 
    } catch (error) {
      return {
        message : error.messag , 
        success : false
      }
    }

    return statusResult ;
  }

  async findAll() {
    return await this.categoryRepo.find({})
  }

  async findOne(where:Where) {
    return this.categoryRepo.findOne({where})
  }

  async update(id:string , updateCategoryDto:UpdateCategoryDto):Promise<StatusResult>{
    const {name} = updateCategoryDto ;
    const statusResult:StatusResult = {
      message : 'Category edited successfully' , 
      success :  true , 
    }

    try {
      const category = await this.findOne({id})

      if(!category){
        throw new BadRequestException('invalid category')
      }

      await this.categoryRepo
                .createQueryBuilder()
                .update(Category)
                .set({name})
                .where("id = :id",{id})
                .execute()


    } catch (error) {
      return {
        message : error.message , 
        success : false
      }
    }


    return statusResult ; 
  }

  async remove(id: string):Promise<StatusResult>{
    try {
      await this.categoryRepo.delete({id})
    } catch (error) {
      return {
        message : error.message ,
        success : false ,
      }
    }

    return {
      message : 'item removed successfully' , 
      success : true ,
    }
  }
}
