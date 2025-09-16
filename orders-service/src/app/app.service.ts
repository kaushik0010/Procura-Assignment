
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, forkJoin } from 'rxjs';
import { CreateOrderDto } from '@procura-app/common';
import { Order } from '../order.entity';
import { OrderItem } from '../order-item.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @Inject('PRODUCTS_SERVICE') private readonly productsClient: ClientProxy,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    // 1. Fetch all product details from the products-service in parallel
    const productDetailsObservables = createOrderDto.items.map((item) =>
      this.productsClient.send({ cmd: 'get_product_by_id' }, item.productId),
    );

    const productDetails = await firstValueFrom(
      forkJoin(productDetailsObservables),
    );

    // 2. Validate products and calculate total amount
    let totalAmount = 0;
    const orderItems: OrderItem[] = [];

    for (let i = 0; i < createOrderDto.items.length; i++) {
      const itemDto = createOrderDto.items[i];
      const product = productDetails[i];

      if (!product) {
        throw new NotFoundException(
          `Product with ID ${itemDto.productId} not found.`,
        );
      }

      totalAmount += product.rate * itemDto.quantity;

      const orderItem = new OrderItem();
      orderItem.productId = product.id;
      orderItem.productName = product.name;
      orderItem.productRate = product.rate;
      orderItem.quantity = itemDto.quantity;
      orderItems.push(orderItem);
    }

    // 3. Create and save the order
    const newOrder = this.orderRepository.create({
      customerDetails: createOrderDto.customerDetails,
      items: orderItems,
      totalAmount,
    });

    return this.orderRepository.save(newOrder);
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['items'] });
  }
}