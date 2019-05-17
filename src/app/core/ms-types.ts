export interface Staff {
  displayName: string,
  area: string,
  code: number
}

export interface Product {
  name: string,
  warehouse: string,
  purchasePrice: number,
  salePrice: number
}

export interface Promo {
  id: string,
  name: string,
  percentage: number,
  amount: number,
  productId: string,
  startDate: number,
  endingDate: number
}

export interface Discount {
  percentage: number,
  amount: number,
}

export interface ProductCart {
  name: string,
  price: number,
  stock: number,
  quantity: number,
  discountType: string,
  promo?: Promo,
  discount?: Discount
}

export interface Ticket {
  index?: number,
  cart?: Array<ProductCart>,
  customer?: string,
  totalDiscount?: number,
  totalWithoutDiscount?: number,
  totalWithDiscount?: number,
  subtotal?: number,
  igv?: number,
  total?: number,
  seller?: Staff
}

export interface Link {
  name: string,
  icon: string,
  route: string
}

