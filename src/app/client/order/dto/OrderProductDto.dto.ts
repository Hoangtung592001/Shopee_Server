export interface OrderProductDto {
  voucherId: number;
  address: string;
  data: {
    [key: string]: {
      productCode: number;
      quantity: number;
    }[];
  };
}
