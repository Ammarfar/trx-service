import { ProductM } from '../model/product';

export interface ProductRepository {
  insert(product: ProductM): Promise<ProductM>;
  updateById(id: number, product: ProductM): Promise<void>;
  deleteById(id: number): Promise<void>;
}
