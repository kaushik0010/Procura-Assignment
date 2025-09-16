import { Body, Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger'
import { ClientProxy } from '@nestjs/microservices';
import {CreateProductDto} from '@procura-app/common'
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send({ cmd: 'create_product' }, createProductDto);
  }

  @Get()
  getAllProducts() {
    return this.productsClient.send({ cmd: 'get_all_products' }, {});
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'get_product_by_id' }, id);
  }
}
