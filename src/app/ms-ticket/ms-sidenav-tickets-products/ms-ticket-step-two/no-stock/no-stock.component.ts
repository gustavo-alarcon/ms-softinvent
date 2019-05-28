import { Component, OnInit } from '@angular/core';
import { StateManagementService } from 'src/app/core/state-management.service';
import { EditStockComponent } from '../edit-stock/edit-stock.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-no-stock',
  templateUrl: './no-stock.component.html',
  styles: []
})
export class NoStockComponent implements OnInit {

  constructor(
    private state: StateManagementService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }
  deleteTicket(index): void {
    this.state.deleteTicket(index);
    this.state.calcTotalSalePrice();
  }
  editStock(): void {
    const dialogRef = this.dialog.open(EditStockComponent, {
      panelClass: 'ms-custom-dialogbox'

    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
