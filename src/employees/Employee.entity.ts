import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
    type: 'integer',
  })
  phoneNumber: number;

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
    type: 'integer',
    nullable: false,
    unique: true,
  })
  debitCardNumber: number;
}
