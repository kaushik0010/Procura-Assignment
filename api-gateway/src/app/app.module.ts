import { Module } from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices'
import { ProductsController } from './products.controller';

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
    ]),
  ],
  controllers: [ProductsController],
})
export class AppModule {}
