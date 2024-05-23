// archivo.d.ts
export interface DataItem {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

export const data: DataItem[];
