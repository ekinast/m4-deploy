export class AddOrderDto {
  userId: string;
  products: { id: string }[];

  constructor(userId: string, products: { id: string }[]) {
    this.userId = userId;
    this.products = products;
  }
}
