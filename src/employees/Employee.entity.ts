import { Role } from 'src/enum/Role.enum';
import { Order } from 'src/orders/Order.entity';
import { Product } from 'src/products/Product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'employees',
})
export class Employee {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  surname: string;

  @Column({
    nullable: false,
  })
  phoneNumber: string;

  @Column({
    nullable: false,
    type: 'date',
  })
  birthdate: Date;

  @Column({
    nullable: false,
    type: 'integer',
    unique: true,
  })
  dni: number;

  @Column({
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
    unique: true,
  })
  marketAdress: string;

  @Column({
    nullable: false,
    unique: true,
  })
  debitCardNumber: string;

  @Column({
    enum: Role,
    nullable: false,
  })
  role: string;

  @Column({
    default: 0,
    type: 'double precision',
  })
  money: number;

  @Column({
    type: 'jsonb',
    default: [],
  })
  cart: Product[];

  @OneToMany(() => Order, (orders) => orders.employee)
  orders: Order[];

  @OneToMany(() => Product, (product) => product.employee)
  products: Product[];
}
