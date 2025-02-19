import { Order } from 'src/orders/Order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({
  name: 'cadets',
})
export class Cadet {
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
    default: 0,
    type: 'double precision',
  })
  money: number;

  @OneToMany(() => Order, (orders) => orders.cadet)
  orders: Order[];
}
