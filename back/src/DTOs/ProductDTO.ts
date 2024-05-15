export class ProductDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: boolean;
  imgUrl: string;

  constructor(
    id: number,
    name: string,
    description: string,
    price: number,
    stock: boolean,
    imgUrl: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.imgUrl = imgUrl;
  }
}
// Path: src/DTOs/UserDTO.ts
