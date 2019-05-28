import { Component, OnInit, Inject } from '@angular/core';
import { StateManagementService } from 'src/app/core/state-management.service';
import { EditStockComponent } from '../edit-stock/edit-stock.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-no-stock',
  templateUrl: './no-stock.component.html',
  styles: []
})
export class NoStockComponent implements OnInit {

  constructor(
    private state: StateManagementService,
    private dialog: MatDialog,
    @Inject (MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  deleteTicket(): void {
    this.state.deleteTicket(this.data.index);
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
