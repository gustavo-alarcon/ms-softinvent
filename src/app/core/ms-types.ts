export interface Roles {
  invitado?: boolean;
  colaborador?: boolean;
  administrador?: boolean;
  cliente?: boolean;
}

export interface User {
  uid?: string;
  name?: string;
  lastname?: string;
  email?: string;
  photoURL?: string;
  db?: string;
  roles?: Roles;
  company?: string;
  web?: string;
  accountType?: number;
  accountState?: number;
  regDate?: Date;
  code?: number;
}

export interface Staff {
  address?: string,
  code: string,
  contact: {
    email: string,
    lastname: string,
    name: string,
    phone: number,
  }
  docNum: number,
  id: string,
  index: number,
  name: string,
  regDate: number,
  type: string
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
  index: number,
  name: string,
  stock: number,
  quantity: number,
  discountType: string,
  promo?: Promo,
  discount?: Discount,
  warehouse: string,
  salePrice: number,
  sale: number
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
  seller?: Staff,
  state: boolean
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
  type: string,
}

export interface Contact {
  email?: string,
  lastname: string,
  name: string,
  phone?: string
}
export interface Serie {
  numero: number,
  seleccionado : string;
  estado: boolean
}