import { ProductM } from 'src/domain/model/product';
import { Product } from '../entities/product.entity';

export class ProductMapper {
  private constructor() {
    throw new Error(
      'TypeOrmProductMapper is a static class and should not be instantiated',
    );
  }

  public static toEntity(product: ProductM): Product {
    return {
      id: product.id,
      name: product.name,
    };
  }

  public static toDomain(product: Product): ProductM {
    const productM: ProductM = new ProductM();

    productM.id = product.id;
    productM.name = product.name;

    return productM;
  }
}
