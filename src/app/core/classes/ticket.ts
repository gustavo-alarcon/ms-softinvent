import { Ticket, ProductCart, Staff } from "../ms-types";

/**
 * @desc ...
 */
export class MsTicket {

  public index: number;
  public cart?: Array<ProductCart>;
  public customer?: string;
  public totalDiscount?: number;
  public totalWithoutDiscount?: number;
  public totalWithDiscount?: number;
  public subtotal?: number;
  public igv?: number;
  public total?: number;
  public seller?: Staff

  constructor() {
    
  }

  /**
   * @desc Agrega un producto de tipo ProductCart al carrito de compras
   * @param product { ProductCart } Producto que será agregado al carrito de compras
   */
  public addProduct(product: ProductCart) {
    this.cart.push(product);
  }
}
