import { Component, OnInit } from '@angular/core';
import { StateManagementService } from 'src/app/core/state-management.service';
import { NoStockComponent } from '../no-stock/no-stock.component';
import { GenerateTicketComponent } from '../generar-ticket/generar-ticket.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styles: []
})
export class EditStockComponent implements OnInit {

  constructor(
    private state: StateManagementService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
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
          console.log("generar ticket")
          const dialogRef = this.dialog.open(GenerateTicketComponent, {
            panelClass: 'ms-custom-dialogbox'
          });
        }
      }
    }
  }

}
