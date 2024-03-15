import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, BadRequestException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/user/enum/role.enum';
import { HasRole } from 'src/auth/decorator/role.decorator';

@ApiTags('Product')
@ApiBearerAuth('access-token')
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService ,
  ) {}

  @Post()
  @HasRole(Role.ADMIN)   
  @UseGuards(JwtAuthGuard , RolesGuard)
  async create(@Body() createProductDto: CreateProductDto) {
    const result = await this.productService.create(createProductDto);

    if(!result.success){
      throw new BadRequestException(result.message) ;
    }

    return result;
  }

  @Get()
  @HasRole(Role.ADMIN)   
  @UseGuards(JwtAuthGuard , RolesGuard)
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @HasRole(Role.ADMIN)   
  @UseGuards(JwtAuthGuard , RolesGuard)
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(id)
  }

  @Put(':id')
  @HasRole(Role.ADMIN)   
  @UseGuards(JwtAuthGuard , RolesGuard)
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const result = await this.productService.update(id, updateProductDto);

    if(!result.success){
      throw new BadRequestException(result.message);
    }
    return result ;
  }

  @Delete(':id')
  @HasRole(Role.ADMIN)   
  @UseGuards(JwtAuthGuard , RolesGuard)
  async remove(@Param('id') id: string) {
    const result = await this.productService.remove(id);


    if(!result.success){
      throw new BadRequestException(result.message);
    }
    return result ;
  }
}
