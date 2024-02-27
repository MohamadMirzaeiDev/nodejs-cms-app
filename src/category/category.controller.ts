import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, NotFoundException } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HasRole } from 'src/auth/decorator/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/user/enum/role.enum';

@ApiTags('Category')
@ApiBearerAuth('access-token')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HasRole(Role.ADMIN)   
  @UseGuards(JwtAuthGuard , RolesGuard)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get() 
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne({id});

    if(!category){
      throw new NotFoundException('invalid category')
    }

    return category ; 
  }

  @Put(':id')
  @HasRole(Role.ADMIN)   
  @UseGuards(JwtAuthGuard , RolesGuard)
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @HasRole(Role.ADMIN)   
  @UseGuards(JwtAuthGuard , RolesGuard)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
