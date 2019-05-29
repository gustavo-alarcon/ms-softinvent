import { Component, OnInit, Inject } from '@angular/core';
import { StateManagementService } from 'src/app/core/state-management.service';
import { NoStockComponent } from '../no-stock/no-stock.component';
import { GenerateTicketComponent } from '../generar-ticket/generar-ticket.component';
import { MatDialog, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Ticket, ProductCart } from 'src/app/core/ms-types';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styles: []
})
export class EditStockComponent implements OnInit {
  currentTicket: Ticket;
  subscriptions: Array<Subscription> = [];
  cantidad = new FormControl();
  cant: number

  constructor(
    private state: StateManagementService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<EditStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductCart,
  ) { }

  ngOnInit() {
    let ticketsSubs = this.state.ticketsStateManagement.subscribe(res => {
      this.state.currentState = res;
      this.currentTicket =
        this.state.currentState[this.state.currentStateIndex];
    })

    this.subscriptions.push(ticketsSubs);
    
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }
  /*
  *@desc generates a new ticket if the stock of produc is less than the quantity, else show a dialog
  *return {void} : Without returns
  */
  GenerateTicket(): void {
    /*@const @private {flag} this variable indicates the state of the condition*/
    let flag: boolean = false;
    if (this.state.currentState[this.state.currentStateIndex].cart) {
      if (this.state.currentState[this.state.currentStateIndex].cart.length > 0) {
        console.log(this.state.currentState[this.state.currentStateIndex].cart.length)
        this.state.currentState[this.state.currentStateIndex].cart.forEach((product, index) => {
          console.log(index, product.stock, product.quantity)
          if (product.stock < product.quantity) {
            flag = true;
          }
        });
        if (flag) {
          console.log("avisos")
          const dialogRef = this.dialog.open(NoStockComponent, {
            panelClass: 'ms-custom-dialogbox'
          });
        }
        else {
          let newProduct: ProductCart;
          newProduct = {
            index: this.data.index,
            stock: this.data.stock,
            name: this.data.name,
            discount: this.data.discount,
            quantity: this.data.quantity,
            warehouse: this.data.warehouse,
            discountType: "discount",
            salePrice: this.data.salePrice,
            sale: this.data.sale
          };
          this.state.editProduct(newProduct)
          this.dialogRef.close(true);
          console.log("generar ticket")
          const dialogRef = this.dialog.open(GenerateTicketComponent, {
            panelClass: 'ms-custom-dialogbox'
          });
        }
      }
    }
  }

}
