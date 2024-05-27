// orderValidation.ts
import { UsersDBService } from '../users/usersDB.service'; // Importa el servicio de usuarios
import { ProductsDBService } from '../products/productsDB.service'; // Importa el servicio de productos
import { Product } from 'src/products/products.entity';

export async function validateUser(
  usersDBService: UsersDBService,
  userId: string,
) {
  const user = await usersDBService.getUserById(userId);
  return user;
}

export async function validateProducts(
  productsDBService: ProductsDBService,
  products: { id: string }[],
) {
  const validatedProducts = await Promise.all(
    products.map(async (productId: { id: string }) => {
      const product: Product = await productsDBService.getProductById(
        productId.id,
      );

      return product;
    }),
  );

  const filteredProducts = validatedProducts.filter(
    (product) => product !== null,
  );

  return filteredProducts;
}
