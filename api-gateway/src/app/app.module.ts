import { Module } from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices'
import { ProductsController } from './products.controller';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'products-service', // Docker service name
          port: 3001,
        },
      },
      { // Add this block
        name: 'ORDERS_SERVICE',
        transport: Transport.TCP,
        options: { host: 'orders-service', port: 3002 },
      },
    ]),
  ],
  controllers: [ProductsController, OrdersController],
  providers: []
})
export class AppModule {}
