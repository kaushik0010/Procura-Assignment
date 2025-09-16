
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity({ name: 'order_items' })
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid')
  productId: string;
  
  @Column()
  productName: string; // Store for historical reference

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  productRate: number; // Store for historical reference

  @Column()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}