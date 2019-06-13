import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from '../core/database.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { AuthService } from '../core/auth.service';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CreatePartyComponent } from '../terceros/crear-tercero/crear-tercero.component';
import { ConfirmClearRegisterComponent } from './confirmar-limpiar-registrar/confirmar-limpiar-registrar.component';
import { ConfirmSaveRegisterComponent } from './confirmar-grabar-registrar/confirmar-grabar-registrar.component';
import { invoke } from 'q';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  disableTooltips = new FormControl(true);
  documentDate = new FormControl(new Date());
  filteredWarehouses: Array<any> = [];
  filteredParties: Array<any> = [];
  filteredDocuments: Array<any> = [];
  filteredProducts: Array<any> = [];
  filteredItems: Array<any> = [];

  displayedColumns: string[] = ['delete', 'quantity', 'productName', 'unitPrice', 'import'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  documentField = "";
  documentFromList = new FormControl();
  filteredDocumentOptions: Observable<any>;

  productField = "";
  productFromList = new FormControl();
  filteredProductOptions: Observable<any>;

  partyField = "";
  partyFromList = new FormControl();
  filteredPartyOptions: Observable<any>;

  warehouseField = "";
  warehouseFromList = new FormControl();
  filteredWarehouseOptions: Observable<any>;

  warehouseDestField = "";
  warehouseDestFromList = new FormControl();
  filteredWarehouseDestOptions: Observable<any>;

  staffField = "";
  staffFromList = new FormControl();
  filteredStaffOptions: Observable<any>;

  documentSerie: any;
  documentCorrelative: any;

  selectedDocument: object = {};
  selectedParty: object = {};
  selectedProduct: object = {};
  selectedStaff: object = {};
  selectedWarehouseOrigin: object = {};
  selectedWarehouseDest: object = {};
  
  qty: any = '';
  price: any = '';
  observations: any = '';
  total: any = 0;
  disablePrice: boolean = false;

  constructor(
    public dbs: DatabaseService,
    public auth: AuthService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {

    this.dbs.currentDataWarehouses.subscribe( warehouses => {
      this.filteredWarehouses = warehouses;
    });

    this.dbs.currentDataDocuments.subscribe( Documents => {
      this.filteredDocuments = Documents;
      this.documentFromList.patchValue("");
    });


    this.dbs.currentDataDocumentToSet.subscribe( document => {
      if(typeof document === 'object'){
        this.documentSerie = document['serie'];
        this.documentCorrelative = document['correlative'];
        this.filteredItems = document['productList'];
        this.dataSource.data = this.filteredItems;

        this.total = 0;
        this.filteredItems.forEach( option => {
          this.total += option['import'];
        })
      }
    });

    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


    
    this.filteredDocumentOptions = this.documentFromList.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterDocuments(value))
      );

    this.filteredProductOptions = this.productFromList.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterProducts(value))
      );

    this.filteredPartyOptions = this.partyFromList.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterParties(value))
      );

    this.filteredWarehouseOptions = this.warehouseFromList.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterWarehouses(value))
      );

    this.filteredWarehouseDestOptions = this.warehouseDestFromList.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterWarehousesDest(value))
      );

    
  }

  private _filterDocuments(value): any {
    const filterValue = (typeof value === 'object')? value['name'].toLowerCase() : value.toLowerCase();
    return this.dbs.documents.filter(option => option['name'].toLowerCase().includes(filterValue));
  }

  private _filterProducts(value): any {
    const filterValue = (typeof value === 'object')? value['name'].toLowerCase() : value.toLowerCase();
    return this.filteredProducts.filter(option => option['name'].toLowerCase().includes(filterValue));
  }

  private _filterParties(value): any {
    const filterValue = (typeof value === 'object')? value['name'].toLowerCase() : value.toLowerCase();
    return this.filteredParties.filter(option => option['name'].toLowerCase().includes(filterValue));
  }

  private _filterWarehouses(value): any {
    const filterValue = (typeof value === 'object')? value['name'].toLowerCase() : value.toLowerCase();
    return this.dbs.warehouses.filter(option => option['name'].toLowerCase().includes(filterValue));
  }

  private _filterWarehousesDest(value): any {
    const filterValue = (typeof value === 'object')? value['name'].toLowerCase() : value.toLowerCase();
    return this.dbs.warehouses.filter(option => option['name'].toLowerCase().includes(filterValue));
  }

  
  filterPartiesData(ref: string) {
    ref = ref.toLowerCase();
    this.filteredParties = this.dbs.parties.filter(option => option['type'].toLowerCase().includes(ref));
    this.partyFromList.patchValue("");
    this.warehouseFromList.patchValue("");
  }

  filterProductsData(ref: string) {
    ref = ref.toLowerCase();
    this.filteredProducts = this.dbs.products.filter(option => option['warehouse'].toLowerCase().includes(ref));
    this.productFromList.patchValue("");
  }


  setDocumentField(document): void {
    if(typeof document === 'object'){
      this.selectedDocument = document;
      this.staffFromList.patchValue("");

      this.disablePrice = false;

      if(document['nature'] === 'AJUSTE DE ENTRADA' || document['nature'] === 'AJUSTE DE SALIDA' || document['nature'] === 'TRANSFERENCIA'){
        this.disablePrice = true;
        this.price = 0;
      }

      if(document['nature'] != 'ENTRADA'){
        this.dbs.documentToSet['serie']= document['serie'];
        this.dbs.documentToSet['correlative']= document['actualCorrelative'];
      }
      
      this.filteredParties = [];
      this.filterPartiesData(document.partyType);

    }
  }
  

  showDocumentSelected(document): string | undefined {
    return document? document['name'] : undefined;
  }

  setSerieField(serie): void {
    this.selectedDocument['serie'] = serie;
  }

  setCorrelativeField(correlative): void {
    this.selectedDocument['actualCorrelative'] = parseInt(correlative);
  }

  setPartyField(party): void {
    if(typeof party === 'object'){
      this.selectedParty = party;
    }
  }

  showPartySelected(party): string | undefined {
    return party? party['name'] : undefined;
  }

  setWarehouseField(warehouse): void {
    if(typeof warehouse === 'object'){
      this.filteredProducts = [];
      this.selectedWarehouseOrigin = warehouse;
      this.filterProductsData(warehouse.name);
      this.price = '';

      if(this.disablePrice){
        this.price = 0;
      }
      
      this.qty = '';
      this.selectedProduct = {};
    }
  }

  setWarehouseDestField(warehouse): void {
    if(typeof warehouse === 'object'){
      this.selectedWarehouseDest = warehouse;
    }
  }

  showWarehouseSelected(warehouse): string | undefined {
    return warehouse? warehouse['name'] : undefined;
  }

  showWarehouseDestSelected(warehouse): string | undefined {
    return warehouse? warehouse['name'] : undefined;
  }

  setProductField(product): void {
    if(typeof product === 'object'){
      this.selectedProduct = product;
      if(this.selectedDocument['nature'] === 'ENTRADA'){
        this.price = product['purchase'];
      }else{
        this.price = product['sale'];
      }
      
      if(this.disablePrice){
        this.price = 0;
      }
      this.qty = 1;
    }
  }

  setStaffField(staff): void {
    if(typeof staff === 'object'){
      this.selectedStaff = staff;
    }
  }

  showStaffSelected(staff): string | undefined {
    return staff? staff['name'] : undefined;
  }

  showProductSelected(product): string | undefined {
    return product? product['name'] : undefined;
  }

  setQuantityField(qty): void {
    if(qty > this.selectedProduct['stock'] && (this.selectedDocument['nature'] === 'AJUSTE DE SALIDA' || this.selectedDocument['nature'] === 'SALIDA') ){
      this.qty = 0;
      this.snackbar.open('Este valor es superior al stock actual', 'Cerrar', {
        duration: 10000
      });
      
    }else if(qty < 0){
      this.qty = 0;
      this.snackbar.open('No se pueden asignar valores negativos', 'Cerrar', {
        duration: 10000
      });
    }else{
      this.qty = parseFloat(qty);
    }
    
  }

  setPriceField(price): void {
    this.price = price;
    if(price < 0){
      this.snackbar.open('No se pueden asignar valores negativos', 'Cerrar', {
        duration: 10000
      });
      this.price = '';
    }else{
      this.price = parseFloat(price);
    }

  }

  setObservationsField(observations): void {
    this.observations = observations;
  }

  createParty(): void{
    this.dialog.open(CreatePartyComponent, {
      panelClass: "ms-custom-dialogbox"
    });
  }

  deleteItem(itemId): void {
    this.dbs.deleteItem(itemId);
  }

  addItem(){

    if( this.qty && (this.price >= 0) && this.selectedProduct){

      let results = this.dbs.documentToSet['productList'].filter( option => option['productName'] === this.selectedProduct['name']);

      if(results.length === 0){

        let item = {
          quantity: this.qty,
          productName: this.selectedProduct['name'],
          productUnit: this.selectedProduct['unit'],
          productId: this.selectedProduct['id'],
          unitPrice: this.price,
          import: this.price * this.qty
        }
    
        this.dbs.addItem(item);
  
        this.qty = '';
        this.price= '';
      }else{
        this.snackbar.open('El producto ya existe en la lista', 'Cerrar', {
          duration: 6000
        });
      }

    }else{
      this.snackbar.open('Complete los datos (PROD, CANT, PRECIO) para agregar un producto', 'Cerrar', {
        duration: 6000
      });
    }
  }

  confirmClean(): void {

    if(this.dbs.documentToSet['productList'].length > 0) {
      this.dialog.open(ConfirmClearRegisterComponent, {
        panelClass: 'ms-custom-dialogbox'
      });
    }else{
      this.snackbar.open('No hay elementos en la lista', 'Cerrar', {
        duration: 6000
      });
    }

  }

  confirmSave(): void {
    if(this.selectedDocument && this.selectedParty && this.selectedProduct && this.dbs.documentToSet['productList'].length > 0){
      this.dbs.documentToSet['totalImport'] = this.total;
      this.dialog.open(ConfirmSaveRegisterComponent, {
        data: [this.selectedDocument, this.selectedParty, this.observations, this.selectedWarehouseDest, this.selectedStaff, this.selectedWarehouseOrigin['name']],
        panelClass: 'ms-custom-dialogbox'
      });
    }else{
      this.snackbar.open('Complete los datos para poder GRABAR', 'Cerrar', {
        duration: 6000
      });
    }
    
  }

  confirmCancel(): void {

    if(!this.selectedDocument['id']){
      this.snackbar.open('No hay un documento seleccionado', 'Cerrar', {
        duration: 6000
      });
      return;
    }

    if(!this.observations){
      this.snackbar.open('Describa el motivo de anulación del documento', 'Cerrar', {
        duration: 8000
      });
      return;
    }

    this.dbs.cancelFromRegistry(this.selectedDocument, this.observations);
  }
}
