import { Component, OnInit } from '@angular/core';
import { StateManagementService } from 'src/app/core/state-management.service';

@Component({
  selector: 'app-no-stock',
  templateUrl: './no-stock.component.html',
  styles: []
})
export class NoStockComponent implements OnInit {

  constructor(
    private state: StateManagementService,
  ) { }
 
  ngOnInit() {
  }
  deleteTicket(index): void {
    this.state.eliminarTicket(index);
    this.state.calcTotalSalePrice();
  }

}
