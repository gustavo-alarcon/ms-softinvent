import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DatabaseService } from 'src/app/core/database.service';

@Component({
  selector: 'app-confirmar-anular',
  templateUrl: './confirmar-anular.component.html',
  styles: []
})
export class ConfirmarAnularComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmarAnularComponent>,
    public dbs: DatabaseService
  ) { }

  ngOnInit() {
  }

  cancelDocument(): void {
    this.dbs.cancelDocument(this.data);
    this.dialogRef.close(true);
  }

}
