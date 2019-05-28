import { Component, OnInit, Inject } from '@angular/core';
import { DatabaseService } from 'src/app/core/database.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmar-borrar-documento',
  templateUrl: './confirmar-borrar-documento.component.html',
  styles: []
})
export class ConfirmDeleteDocComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmDeleteDocComponent>,
    public dbs: DatabaseService
  ) { }

  ngOnInit() {
  }

  deleteDocument(): void {
    this.dbs.deleteDocument(this.data.id);
    this.dialogRef.close(true);
  }

}
