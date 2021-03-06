export interface Roles {
  invitado?: boolean;
  colaborador?: boolean;
  administrador?: boolean;
  cliente?: boolean;
}

export interface User {
  uid: string;
  name: string;
  lastname: string;
  displayName: string;
  email: string;
  photoURL?: string;
  db: string;
  roles?: Roles;
  company: string;
  web?: string;
  accountType: number;
  accountState: number;
  regDate: number;
  code?: number;
  permits: string;
}

export interface Permits {
  name: string;
  id: string;
  createBy: string;
  lastEditBy?: string;
  regDate: number;
  warehouse?: {
    section: boolean;
    create: boolean;
    update: boolean;
    remove: boolean;
  };
  parties?: {
    section: boolean;
    create: boolean;
    update: boolean;
    remove: boolean;
  };
  documents?: {
    section: boolean;
    create: boolean;
    update: boolean;
    remove: boolean;
  };
  products?: {
    section: boolean;
    create: boolean;
    update: boolean;
    remove: boolean;
    addProduction: boolean;
    readSalePrice: boolean;
    readPurchasePrice: boolean;
  };
  configurations?: {
    section: boolean;
    accounts: boolean;
    system: boolean;
    notifications: boolean;
  };
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
  code: string,
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
  id: string;
  name: string;
  type: number;
  discount?: number;
  firstNumber?: number;
  secondNumber?: number;
  startDate?: number;
  endingDate?: number;
  active: boolean;
}

export interface PromoProduct {
  id: string;
  itemId: string;
  code: string;
  name: string;
  category: string;
  regDate: number;
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
  sale: number,
  serialNumbers: Array<serialNumber>,
  maxDiscount: number,
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

export interface serialNumber {
  id: string;
  number: number;
  state: string;
  regDate: number;
  createdBy: string;
  activated?: boolean;

}

export interface Package {
  id: string;
  code: string;
  name: string;
  category: string;
  sale: number;
  regDate: number;
  img: string;
}

export interface PackageProduct {
  id: string;
  sale: number;
  name: string;
  category: string;
  code: string;
  quantity?: number;
  unit?: string;
}

export interface Transfer {
  id: string;
  docName: string;
  docSerie: string;
  docCorrelative: number;
  status: string;
  productList?: Array<TransferProduct>;
  regDate: number;
}

export interface TransferProduct {
  id: string;
  index?: number;
  code: string;
  name: string;
  quantity: number;
  serialList?: Array<ProductSerialNumber>;
  observations: string;
  regDate: number;
}

export interface ProductSerialNumber {
  id: string;
  productId: string;
  serial: number;
  received: boolean;
  regDate: number;
}
