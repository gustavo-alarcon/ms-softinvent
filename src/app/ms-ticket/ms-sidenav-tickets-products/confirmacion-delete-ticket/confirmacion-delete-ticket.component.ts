import { Component, OnInit } from '@angular/core';
import { StateManagementService } from 'src/app/core/state-management.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmacion-delete-ticket',
  templateUrl: './confirmacion-delete-ticket.component.html',
  styles: []
})
export class ConfirmDeleteTicketComponent implements OnInit {

  constructor(
    private state: StateManagementService,
    public dialogRef: MatDialogRef<ConfirmDeleteTicketComponent>,
  ) { }

  ngOnInit() {
  }
  /*
  * @desc  elimina a un ticker de la lista de tickets
  * @param {!Number[]} index indice del ticket a eliminar
  * @return { void } : Without returns
  */
 deleteTicket(index): void {
  this.state.deleteTicket(index);
  this.state.calcTotalSalePrice();
  this.dialogRef.close(true);
}

}
