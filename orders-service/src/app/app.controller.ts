
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateOrderDto } from '@procura-app/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'create_order' })
  createOrder(@Payload() createOrderDto: CreateOrderDto) {
    return this.appService.createOrder(createOrderDto);
  }

  @MessagePattern({ cmd: 'get_all_orders' })
  getAllOrders() {
    return this.appService.getAllOrders();
  }
}