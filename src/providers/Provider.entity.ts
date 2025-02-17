import { Order } from 'src/orders/Order.entity';
import { Product } from 'src/products/Product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'providers',
})
export class Provider {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    nullable: false,
    unique: true,
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
    type: 'integer',
    nullable: false,
  })
  phoneNumber: number;

  @Column({
    type: 'date',
    nullable: false,
  })
  birthdate: Date;

  @Column({
    nullable: false,
    unique: true,
    type: 'integer',
  })
  dni: number;

  @Column({
    unique: true,
    nullable: false,
  })
  key: string;

  @OneToMany(() => Order, (orders) => orders.provider)
  orders: Order[];
}
