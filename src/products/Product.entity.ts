import { Employee } from 'src/employees/Employee.entity';
import { Order } from 'src/orders/Order.entity';
import { Provider } from 'src/providers/Provider.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  title: string;

  @Column({
    nullable: false,
    length: 40,
    default: 'Un producto nuevo',
  })
  description: string;

  @Column({
    nullable: false,
    type: 'integer',
  })
  stock: number;

  @Column({
    default: '',
  })
  poster: string;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  price: number;

  @ManyToOne(() => Employee, (employee) => employee.products)
  employee: Employee;

  @ManyToMany(() => Order, (orders) => orders.products)
  orders: Order[];
}
