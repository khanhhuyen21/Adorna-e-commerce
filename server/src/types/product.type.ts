export class ProductInterface {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  categoryId: number;
}

export class ProductUpdateInterface {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  categoryId: number;
}
