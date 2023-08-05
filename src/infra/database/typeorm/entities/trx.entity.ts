import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity()
export class Trx {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  userId: number;

  @Column('int')
  productId: number;

  @Column('int')
  qty: number;

  @Column('int')
  totalPrice: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  user?: User;

  @ManyToOne(() => Product, (product) => product.id)
  product?: Product;
}
