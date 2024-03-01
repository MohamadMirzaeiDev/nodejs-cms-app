import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoryService } from 'src/category/category.service';
import { StatusResult } from 'src/shared/status-result/status-result';
import { Product } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo:Repository<Product> ,
    private readonly categoryService:CategoryService , 
  ){}

  async create(createProductDto: CreateProductDto):Promise<StatusResult>{
    const {
      categoryId , 
      score ,
      count , 
      description ,
      name ,  
      isDigital , 
      comments , 
      tags , 
      weight , 
      inـstock 
    } = createProductDto ;

    const statusResult:StatusResult = {
      message : 'item created successfully',
      success : true , 
    }

    try {
      const newProduct = new Product();
      newProduct.name = name ;
      newProduct.description = description ;
      newProduct.score =  score; 
      newProduct.count = count ;
      newProduct.inـstock = inـstock ;
      newProduct.weight = weight; 
      newProduct.tags = tags ;
      newProduct.comments = comments ; 
      newProduct.isDigital = isDigital ;


      if(categoryId){
        const category = await this.categoryService.findOne({id:categoryId});
        newProduct.category = category ;
      }


      const savedProduct = await this.productRepo.save(newProduct);
      statusResult.Id = savedProduct.id ;
    } catch (error) {
      return {
        message : error.message , 
        success : false , 
      }
    }

    return statusResult ; 
  }

  async findAll():Promise<Product[]>{
    return await this.productRepo.find({relations : {category : true}})
  }

  async findOne(id : string){
    const product = await this.productRepo.findOne({where : {id} , relations : {category : true}})

    if(!product){
      throw new NotFoundException('product is not found')
    }

    return product ; 
  }

  async update(id: string, updateProductDto: UpdateProductDto):Promise<StatusResult>{
    const {
      categoryId , 
      score ,
      count , 
      description ,
      name ,  
      isDigital , 
      comments , 
      tags , 
      weight , 
      inـstock 
    } = updateProductDto ;


    const statusResult:StatusResult = {
      message : 'item edited successfully',
      success : true 
    }

    try {
      await this.findOne(id)
      let category:Category | null; 

      if(categoryId){
        const res  = await this.categoryService.findOne({id:categoryId});

        category = res ;
      }else {
        category = null
      }
      await this.productRepo
                .createQueryBuilder()
                .update(Product)
                .set({
                  score ,
                  count , 
                  description ,
                  name ,  
                  isDigital , 
                  comments , 
                  tags , 
                  weight , 
                  inـstock 
                })
                .where('id = :id' , {id})
                .execute()
                
    } catch (error) {
     return {
      message : error.message ,
      success : false
     } 
    }

    return statusResult
  }

  async remove(id: string):Promise<StatusResult>{
    await this.productRepo.delete({id})

    return {
      message : 'item removed successfully',
      success : true 
    }
  }
}
