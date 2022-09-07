export interface ICreateProductDTO {
  name: string;
  cost?: number;
  price: number;
  quantity: number;
  barcode?: string;
  description: string;
  category: string;
  unit: string;
  expirationDate?: string;
  providerCode?: string;
  ean?: string;
  ncm?: string;
  cest?: string;
  origin?: string;
  liquidWeight?: number;
  bruteWeight?: number;
  width?: number;
  height?: number;
  length?: number;
}