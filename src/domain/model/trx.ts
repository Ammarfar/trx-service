import { ProductM } from './product';
import { UserM } from './user';

export class TrxM {
  id: number;
  userId: number;
  productId: number;
  qty: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  user?: UserM;
  product?: ProductM;
}
