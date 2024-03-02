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
      count , 
      description ,
      name ,  
      isDigital ,  
      tags , 
      weight ,
      price 
    } = createProductDto ;

    const statusResult:StatusResult = {
      message : 'item created successfully',
      success : true , 
    }

    try {
      const newProduct = new Product();
      newProduct.name = name ;
      newProduct.description = description ;
      newProduct.count = count ;
      newProduct.weight = weight; 
      newProduct.tags = tags ;
      newProduct.isDigital = isDigital ;
      newProduct.price = price ;

      if(count > 0){
        newProduct.inـstock = true ; 
      }else{
        newProduct.inـstock = false ; 
      }


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
      count , 
      description ,
      name ,  
      isDigital , 
      tags , 
      weight , 
      price , 
    } = updateProductDto ;


    const statusResult:StatusResult = {
      message : 'item edited successfully',
      success : true 
    }

    try {
      const product = await this.findOne(id);

      let category:Category | null; 

      if(categoryId){
        const res = await this.categoryService.findOne({id:categoryId});

        category = res ;
      }else {
        category = null
      }

      product.name = name ;
      product.description = description ;
      product.count = count ;
      product.weight = weight; 
      product.tags = tags ;
      product.isDigital = isDigital ;
      product.price = price ;
      product.category = category ; 

      if(count > 0){
        product.inـstock = true ; 
      }else{
        product.inـstock = false ;
      }

      
      await this.productRepo.save(product);
                
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
