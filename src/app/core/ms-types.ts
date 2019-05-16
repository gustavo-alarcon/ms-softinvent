export interface Product {
  name: string,
  price: number,
  stock: number
}

export interface Ticket {
  cart?: Array<Product>,
  customer?: string
}

