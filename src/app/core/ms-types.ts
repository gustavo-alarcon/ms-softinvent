export interface Staff {
  displayName: string,
  area: string,
  code: number
}

export interface Product {
  alertStock: number,
  category: string,
  code: number,
  currency: string,
  id: string,
  initialStock: number,
  name: string,
  purchase: number,
  regDate: number,
  sale: number,
  stock: number,
  unit: string,
  userId: string,
  userName: string,
  warehouse: string,
  warningStock: number
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
  stock: number,
  quantity: number,
  discountType: string,
  promo?: Promo,
  discount?: Discount,
  warehouse: string,
  purchasePrice: number,
  salePrice: number
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

export interface Warehouses {
  address: string,
  id: string,
  name: string,
  regDate: number,
  supervisor: Supervisor
}

export interface Supervisor {
  email?: string,
  lastname: string,
  name: string,
  phone?: number
}

export interface Parties {
  address: string,
  contacto: Contact,
  docNum: number,
  docType: string,
  id: string,
  name: string,
  regDate: number,
  type: string
}

export interface Contact {
  email?: string,
  lastname: string,
  name: string,
  phone?: string
}
