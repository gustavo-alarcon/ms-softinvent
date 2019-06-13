import { Component, OnInit, Inject } from '@angular/core';
import { StateManagementService } from 'src/app/core/state-management.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Ticket } from 'src/app/core/ms-types';

@Component({
  selector: 'app-confirmacion-delete-ticket',
  templateUrl: './confirmacion-delete-ticket.component.html',
  styles: []
})
export class ConfirmDeleteTicketComponent implements OnInit {

  constructor(
    private state: StateManagementService,
    public dialogRef: MatDialogRef<ConfirmDeleteTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public index: number
  ) { }

  ngOnInit() {
    console.log('index', this.index)
  }
  /*
  * @desc  elimina a un ticker de la lista de tickets
  * @param {!Number[]} index indice del ticket a eliminar
  * @return { void } : Without returns
  */
  deleteTicketYes(): void {
    console.log('index', this.index)
    this.state.deleteTicket(this.index);
    this.state.calcTotalSalePrice();
    this.dialogRef.close(true);
  }

}
