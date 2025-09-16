import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateProductDto } from '@procura-app/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'create_product' })
  createProduct(@Payload() data: CreateProductDto) {
    return this.appService.createProduct(data);
  }

  @MessagePattern({ cmd: 'get_all_products' })
  getAllProducts() {
    return this.appService.getAllProducts();
  }
  
  @MessagePattern({ cmd: 'get_product_by_id' })
  getProductById(@Payload() id: string) {
    return this.appService.getProductById(id);
  }
}
