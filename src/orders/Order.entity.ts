import { Cadet } from 'src/cadets/Cadet.entity';
import { Employee } from 'src/employees/Employee.entity';
import { Product } from 'src/products/Product.entity';
import { Provider } from 'src/providers/Provider.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    nullable: false,
  })
  deliveryAdress: string;

  @ManyToOne(() => Cadet, (cadet) => cadet.orders)
  @JoinColumn({ name: 'cadet_Id' })
  cadet: Cadet;

  @ManyToOne(() => Provider, (provider) => provider.orders)
  @JoinColumn({ name: 'provider_Id' })
  provider: Provider;

  @ManyToMany(() => Product, (products) => products.orders, {
    cascade: true,
    eager: true,
  })
  @JoinTable({ name: 'orders_products' })
  products: Product[];

  @ManyToOne(() => Employee, (employee) => employee.orders)
  @JoinColumn({ name: 'employee_Id' })
  employee: Employee;
}
