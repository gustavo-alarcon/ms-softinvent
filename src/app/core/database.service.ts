import { Promo, PromoProduct, Transfer, TransferProduct } from 'src/app/core/ms-types';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable, of, BehaviorSubject } from "rxjs";
import { AuthService } from "./auth.service";
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { serialNumber, Product } from './ms-types';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  /*---------------- CONFIGURATION DATA --------------------- */

  // CONFIG - PARTY TYPES
  partyTypesDocument: AngularFirestoreDocument<any>;
  partyTypes: Array<any>;

  public dataPartyTypes = new BehaviorSubject<any>([]);
  currentDataPartyTypes = this.dataPartyTypes.asObservable();

  // CONFIG - PARTY DOCUMENTS TYPES
  partyDocumentTypesDocument: AngularFirestoreDocument<any>;
  partyDocumentTypes: Array<any>;

  public dataPartyDocumentTypes = new BehaviorSubject<any>([]);
  currentDataPartyDocumentTypes = this.dataPartyDocumentTypes.asObservable();

  // CONFIG - DOCUMENT TYPES
  documentTypesDocument: AngularFirestoreDocument<any>;
  documentTypes: Array<any>;

  public dataDocumentTypes = new BehaviorSubject<any>([]);
  currentDataDocumentTypes = this.dataDocumentTypes.asObservable();

  // CONFIG - DOCUMENT CONFIG
  documentConfigDocument: AngularFirestoreDocument<any>;
  documentConfig: Array<any>;

  public dataDocumentConfig = new BehaviorSubject<any>([]);
  currentDataDocumentCorreLength = this.dataDocumentConfig.asObservable();

  // CONFIG - CATEGORY TYPES
  categoryTypesCollection: AngularFirestoreCollection<any>;
  categoryTypes: Array<any>;

  public dataCategoryTypes = new BehaviorSubject<any[]>([]);
  currentDataCategoryTypes = this.dataCategoryTypes.asObservable();

  // CONFIG - CURRENCY TYPES
  currencyTypesDocument: AngularFirestoreDocument<any>;
  currencyTypes: Array<any>;

  public dataCurrencyTypes = new BehaviorSubject<any>([]);
  currentDataCurrencyTypes = this.dataCurrencyTypes.asObservable();

  // CONFIG - UNIT TYPES
  unitTypesDocument: AngularFirestoreDocument<any>;
  unitTypes: Array<any>;

  public dataUnitTypes = new BehaviorSubject<any>([]);
  currentDataUnitTypes = this.dataUnitTypes.asObservable();

  // CONFIG - COMPANY
  companyDocument: AngularFirestoreDocument<any>;
  company: Array<any>;

  public dataCompany = new BehaviorSubject<any>([]);
  currentDataCompany = this.dataCompany.asObservable();


  /*---------------- WAREHOUSES DATA --------------------- */

  // WAREHOUSES
  warehousesCollection: AngularFirestoreCollection<any>;
  warehouses: Array<Object> = [];

  public dataWarehouses = new BehaviorSubject<any[]>([]);
  currentDataWarehouses = this.dataWarehouses.asObservable();

  /*---------------- SERIAL COLLECTIONS DATA --------------------- */

  // WAREHOUSES
  serialCollection: AngularFirestoreCollection<serialNumber>;
  serialNumbers: Array<serialNumber> = [];

  public dataSerial = new BehaviorSubject<serialNumber>({id: '' , number :0, state :'',regDate : 0,createdBy : ''});
  currentDataSerial = this.dataSerial.asObservable();


  /*---------------- PARTIES DATA --------------------- */

  // PARTIES
  partiesCollection: AngularFirestoreCollection<any>;
  parties: Array<Object> = [];

  public dataParties = new BehaviorSubject<any[]>([]);
  currentDataParties = this.dataParties.asObservable();

  // PARTIES - CUSTOMERS
  partiesCustomersCollection: AngularFirestoreCollection<any>;
  partiesCustomers: Array<Object> = [];

  public dataPartiesCustomers = new BehaviorSubject<any[]>([]);
  currentDataPartiesCustomers = this.dataPartiesCustomers.asObservable();

  // PARTIES - PROVIDERS
  partiesProvidersCollection: AngularFirestoreCollection<any>;
  partiesProviders: Array<Object> = [];

  public dataPartiesProviders = new BehaviorSubject<any[]>([]);
  currentDataPartiesProviders = this.dataPartiesProviders.asObservable();



  /*---------------- DOCUMENTS DATA --------------------- */

  // DOCUMENTS
  documentsCollection: AngularFirestoreCollection<any>;
  documents: Array<Object> = [];

  public dataDocuments = new BehaviorSubject<any[]>([]);
  currentDataDocuments = this.dataDocuments.asObservable();

  // BOOK OF DOCUMENT
  bookCollection: AngularFirestoreCollection<any>;
  book: Array<Object> = [];

  public dataBook = new BehaviorSubject<any[]>([]);
  currentDataBook = this.dataBook.asObservable();

  // DOCUMENT TO SET ON USER REQUEST
  documentToSetCollection: AngularFirestoreCollection<any>;
  documentAssignedCollection: AngularFirestoreCollection<any>;
  documentToSet: any = {
    serie: '',
    correlative: '',
    documentName: '',
    productList: []
  };

  public dataDocumentToSet = new BehaviorSubject<any>([]);
  currentDataDocumentToSet = this.dataDocumentToSet.asObservable();

  /*---------------- PRODUCTS DATA --------------------- */

  // PRODUCTS
  productsCollection: AngularFirestoreCollection<any>;
  products: Array<any> = [];

  public dataProducts = new BehaviorSubject<any[]>([]);
  currentDataProducts = this.dataProducts.asObservable();
  
  // PACKAGES
  packagesCollection: AngularFirestoreCollection<any>;
  packages: Array<Object> = [];

  public dataPackages = new BehaviorSubject<any[]>([]);
  currentDataPackages = this.dataPackages.asObservable();

  // PROMOTIONS
  promotionsCollection: AngularFirestoreCollection<Promo>;
  promotions: Array<Promo> = [];

  public dataPromotions = new BehaviorSubject<Promo[]>([]);
  currentDataPromotions = this.dataPromotions.asObservable();

  // PROMOTION PRODUCTS
  promotionProductsCollection: AngularFirestoreCollection<PromoProduct>;
  promotionProducts: Array<PromoProduct> = [];

  public dataPromotionProducts = new BehaviorSubject<PromoProduct[]>([]);
  currentDataPromotionProducts = this.dataPromotionProducts.asObservable();

  /*---------------- LOGISTIC ------------------------ */

  // TRANSFERS
  transfersCollection: AngularFirestoreCollection<Transfer>;
  transfers: Array<Transfer> = [];

  public dataTransfers = new BehaviorSubject<Transfer[]>([]);
  currentDataTransfers = this.dataTransfers.asObservable();

  /*---------------- HISTORY DATA --------------------- */

  // HISTORY
  historyCollection: AngularFirestoreCollection<any>;
  history: Array<Object> = [];

  public dataHistory = new BehaviorSubject<any[]>([]);
  currentDataHistory = this.dataHistory.asObservable();


  setDocLoading = false;
  documentAssigned = false;

  constructor(
    private afs: AngularFirestore,
    public auth: AuthService,
    public snackbar: MatSnackBar
  ) {

    this.getConfig();
    this.getWarehouses();
    this.getParties();
    this.getPartiesCustomers();
    this.getPartiesProviders();
    this.getDocuments();
    this.getProducts();
    this.getPackages();
    this.getPromotions();
    this.getTransfers();

    this.dataDocumentToSet.next(this.documentToSet);


  }

  /*---------------- APP CONFIGURATION --------------------- */

  getConfig(): void {
    this.partyTypesDocument = this.afs.doc(`db/${this.auth.userInvent.db}/inventConfig/partyTypes`);
    this.partyTypesDocument.valueChanges().subscribe(res => {
      this.partyTypes = res;
      this.dataPartyTypes.next(res);
    });

    this.partyDocumentTypesDocument = this.afs.doc(`db/${this.auth.userInvent.db}/inventConfig/partyDocumentTypes`);
    this.partyDocumentTypesDocument.valueChanges().subscribe(res => {
      this.partyDocumentTypes = res;
      this.dataPartyDocumentTypes.next(res);
    });

    this.documentTypesDocument = this.afs.doc(`db/${this.auth.userInvent.db}/inventConfig/documentTypes`);
    this.documentTypesDocument.valueChanges().subscribe(res => {
      this.documentTypes = res;
      this.dataDocumentTypes.next(res);
    });

    this.documentConfigDocument = this.afs.doc(`db/${this.auth.userInvent.db}/inventConfig/documentConfig`);
    this.documentConfigDocument.valueChanges().subscribe(res => {
      this.documentConfig = res;
      this.dataDocumentConfig.next(res);
    });

    this.categoryTypesCollection = this.afs.collection(`db/${this.auth.userInvent.db}/inventConfig/products/categories`);
    this.categoryTypesCollection.valueChanges().subscribe(res => {
      this.categoryTypes = res;
      this.dataCategoryTypes.next(res);
    });

    this.currencyTypesDocument = this.afs.doc(`db/${this.auth.userInvent.db}/inventConfig/currencyTypes`);
    this.currencyTypesDocument.valueChanges().subscribe(res => {
      this.currencyTypes = res;
      this.dataCurrencyTypes.next(res);
    });

    this.unitTypesDocument = this.afs.doc(`db/${this.auth.userInvent.db}/inventConfig/unitTypes`);
    this.unitTypesDocument.valueChanges().subscribe(res => {
      this.unitTypes = res;
      this.dataUnitTypes.next(res);
    });

    this.companyDocument = this.afs.doc(`companies/${this.auth.userInvent.company}`);
    this.companyDocument.valueChanges().subscribe(res => {
      this.company = res;
      this.dataCompany.next(res);
    });

  }
  /*---------------- SERIALNUMBERS --------------------- */
  // getSerialNumbers(id_product): void {
  //   this.serialCollection = this.afs.collection(`db/${this.auth.userInvent.db}/products/`+id_product+'/serialNumber', ref => ref.orderBy('regDate', 'desc'));
  //   this.serialCollection.valueChanges()
  //     .pipe(
  //       map(res => {
  //         //ADDING ACTIVATES TO RESULT
  //         res.forEach((serial, index) => {
  //           serial['activated'] = false;
  //         })
  //         return res;
  //       })
  //     )
  //     .subscribe(res => {
  //       this.serialNumbers = res;
  //       this.dataSerial.next(res);
  //       console.log(res);
  //     });
      
  // }
  getSerialNumbers(id_product): Observable<serialNumber[]> {
    this.serialCollection = this.afs.collection<serialNumber>(`db/test/products/`+id_product+'/serialNumber', ref => ref.orderBy('regDate', 'desc'));
    return this.serialCollection.valueChanges();
  }



  /*---------------- WAREHOUSES --------------------- */

  getWarehouses(): void {
    this.warehousesCollection = this.afs.collection(`db/${this.auth.userInvent.db}/warehouses`, ref => ref.orderBy('regDate', 'desc'));
    this.warehousesCollection.valueChanges()
      .pipe(
        map(res => {
          //ADDING INDEX TO RESULT
          res.forEach((warehouse, index) => {
            warehouse['index'] = index + 1;
          })
          return res;
        })
      )
      .subscribe(res => {
        this.warehouses = res;
        this.dataWarehouses.next(res);
      });
  }

  deleteWarehouse(id): void {
    this.warehousesCollection.doc(id).delete().then(() => {
      this.snackbar.open('Almacén borrado!', 'Cerrar', {
        duration: 6000
      });
    })
      .catch(err => {
        this.snackbar.open('Oops!...Parece que hubo un error', 'Cerrar', {
          duration: 6000
        });
        console.log(err);
      })
  }

  /*---------------- PARTIES --------------------- */

  getParties(): void {
    this.partiesCollection = this.afs.collection(`db/${this.auth.userInvent.db}/parties`, ref => ref.orderBy('regDate', 'desc'));
    this.partiesCollection.valueChanges()
      .pipe(
        map(res => {
          //ADDING INDEX TO RESULT
          res.forEach((parties, index) => {
            parties['index'] = index + 1;
          })
          return res;
        })
      )
      .subscribe(res => {
        this.parties = res;
        this.dataParties.next(res);
      });
  }

  getPartiesCustomers(): void {
    this.partiesCustomersCollection = this.afs.collection(`db/${this.auth.userInvent.db}/parties`, ref => ref.where('type', '==', 'Cliente'));
    this.partiesCustomersCollection.valueChanges()
      .pipe(
        map(res => {
          //ADDING INDEX TO RESULT
          res.forEach((partiesCustomers, index) => {
            partiesCustomers['index'] = index + 1;
          })
          return res;
        })
      )
      .subscribe(res => {
        this.partiesCustomers = res;
        this.dataPartiesCustomers.next(res);
      });
  }

  getPartiesProviders(): void {
    this.partiesProvidersCollection = this.afs.collection(`db/${this.auth.userInvent.db}/parties`, ref => ref.where('type', '==', 'Proveedor'));
    this.partiesProvidersCollection.valueChanges()
      .pipe(
        map(res => {
          //ADDING INDEX TO RESULT
          res.forEach((partiesProviders, index) => {
            partiesProviders['index'] = index + 1;
          })
          return res;
        })
      )
      .subscribe(res => {
        this.partiesProviders = res;
        this.dataPartiesProviders.next(res);
      });
  }

  

  deleteParty(id): void {
    this.partiesCollection.doc(id).delete().then(() => {
      this.snackbar.open('Tercero borrado!', 'Cerrar', {
        duration: 6000
      });
    })
      .catch(err => {
        this.snackbar.open('Oops!...Parece que hubo un error', 'Cerrar', {
          duration: 6000
        });
        console.log(err);
      })
  }

  /*---------------- DOCUMENTS --------------------- */

  getDocuments(): void {
    this.documentsCollection = this.afs.collection(`db/${this.auth.userInvent.db}/documents`, ref => ref.orderBy('regDate', 'desc'));
    this.documentsCollection.valueChanges()
      .pipe(
        map(res => {
          //ADDING INDEX TO RESULT
          res.forEach((documents, index) => {
            documents['index'] = index + 1;
          })
          return res;
        })
      )
      .subscribe(res => {
        this.documents = res;
        this.dataDocuments.next(res);
      });
  }

  getBookOfDocument(documentId) {
    this.bookCollection = this.afs.collection(`db/${this.auth.userInvent.db}/documents/${documentId}/book`, ref => ref.orderBy('correlative', 'asc'));
    this.bookCollection.valueChanges()
      .pipe(
        map(res => {
          //ADDING INDEX TO RESULT
          res.forEach((documentInBook, index) => {
            documentInBook['index'] = index + 1;
          })
          return res;
        })
      )
      .subscribe(res => {
        this.book = res;
        this.dataBook.next(res);
      })
    return this.bookCollection;
  }

  /*
  setDocumentToUser(document): void {

    this.setDocLoading = true;

    this.documentAssigned = false;

    this.documentAssignedCollection = this.documentsCollection.doc(`${document['id']}`).collection(`book`,ref => ref.where('userId', '==', `${this.auth.userInvent.uid}`).where('state','==','En uso').limit(1));

    this.documentAssignedCollection.get().forEach( snapshot => {

      if(snapshot.docs.length != 0){
        
        this.documentToSet = snapshot.docs[0].data();
        this.dataDocumentToSet.next(snapshot.docs[0].data());

        this.snackbar.open(`Documento N° ${snapshot.docs[0].data()['correlative']} seleccionado!`, 'Cerrar', {
          duration: 6000
        });

        this.setDocLoading = false;

        this.documentAssigned = true;

      }else{

        this.documentToSetCollection = this.documentsCollection.doc(`${document['id']}`).collection(`book`,ref => ref.where('state', '==', 'Disponible'));


        this.documentToSetCollection.get().forEach( snapshot => {
    
          if(snapshot.docs.length != 0){
            var sortedDocs = snapshot.docs.sort((a,b)=>a.data()['correlative']-b.data()['correlative']);
    
            sortedDocs[0].ref.update({
                state: 'En uso',
                userId: this.auth.userInvent.uid,
                userName: this.auth.userInvent.name + ', ' + this.auth.userInvent.lastname,
                regDate: Date.now()
            })
            .then(() => {
              this.documentToSet = sortedDocs[0].data();
              this.dataDocumentToSet.next(sortedDocs[0].data());
      
              this.snackbar.open(`Documento N° ${sortedDocs[0].data()['correlative']} seleccionado!`, 'Cerrar', {
                duration: 6000
              });
      
              this.setDocLoading = false;
            })
            .catch( err => {
              console.log(err);
            });
    
          }else{
            this.setDocLoading = false;
            this.snackbar.open(`No hay más números correlativos disponbiles`, 'Cerrar', {
              duration: 6000
            });
          }
        });
      }

    }); 
  }*/


  /*
  unsetDocumentFromUser(): void {

    this.setDocLoading = true;

    if(this.documentAssigned){

      this.documentAssignedCollection.doc(`${this.documentToSet['id']}`).update({
        state: 'Disponible',
        userId: '',
        userName: '',
        regDate: 0
      })
      .then( res => {
        this.setDocLoading = false;
        this.documentToSet = {
          serie: '',
          correlative: '',
          documentName: '',
          productList: []
        };
        this.dataDocumentToSet.next(this.documentToSet);
  
        this.snackbar.open(`Documento liberado!`, 'Cerrar', {
          duration: 6000
        });
      })
      .catch( err => {
        this.snackbar.open('Oops!...Parece que hubo un error', 'Cerrar', {
          duration: 6000
        });
        console.log(err);
      });

    }else{

      this.documentToSetCollection.doc(`${this.documentToSet['id']}`).update({
        state: 'Disponible',
        userId: '',
        userName: '',
        regDate: 0
      })
      .then( res => {
        this.setDocLoading = false;
        this.documentToSet = {
          serie: '',
          correlative: '',
          documentName: '',
          productList: []
        };

        this.dataDocumentToSet.next(this.documentToSet);
  
        this.snackbar.open(`Documento liberado!`, 'Cerrar', {
          duration: 6000
        });
      })
      .catch( err => {
        this.snackbar.open('Oops!...Parece que hubo un error', 'Cerrar', {
          duration: 6000
        });
        console.log(err);
      });

    }
  }*/

  deleteDocument(id): void {
    this.documentsCollection.doc(id).delete().then(() => {

      this.snackbar.open('Documento borrado!', 'Cerrar', {
        duration: 6000
      });
    })
      .catch(err => {
        this.snackbar.open('Oops!...Parece que hubo un error', 'Cerrar', {
          duration: 6000
        });
        console.log(err);
      })
  }

  /*---------------- PRODUCTS --------------------- */

  getProducts(): void {
    this.productsCollection = this.afs.collection(`db/${this.auth.userInvent.db}/products`, ref => ref.orderBy('regDate', 'desc'));
    this.productsCollection.valueChanges()
      .pipe(
        map(res => {
          //ADDING INDEX TO RESULT
          res.forEach((product, index) => {
            product['index'] = index + 1;
          })


          return res;
        })
      )
      .subscribe(res => {
        this.products = res;
        this.dataProducts.next(res);
      });
  }

  checkIfCategoryExist(ref): Observable<boolean> {
    return this.categoryTypesCollection.valueChanges()
      .pipe(
        map(categories => {
          let exist = false;
          categories.forEach(category => {
            if (category['name'] === ref) {
              exist = true;
            }
          })
          return exist;
        })
      );
  }

  checkIfUnitExist(_unit): Observable<boolean> {
    return this.unitTypesDocument.valueChanges()
      .pipe(
        map(units => {
          let exist = false;
          units['unitTypes'].forEach(unit => {
            if (unit === _unit) {
              exist = true;
            }
          })
          return exist;
        })
      )
  }

  deleteProduct(id): void {
    this.productsCollection.doc(id).delete().then(() => {
      this.snackbar.open('Producto borrado!', 'Cerrar', {
        duration: 6000
      });
    })
      .catch(err => {
        this.snackbar.open('Oops!...Parece que hubo un error', 'Cerrar', {
          duration: 6000
        });
        console.log(err);
      })
  }

  getPackages(): void {
    this.packagesCollection = this.afs.collection(`db/${this.auth.userInvent.db}/package`, ref => ref.orderBy('regDate', 'desc'));
    this.packagesCollection.valueChanges()
      .pipe(
        map(res => {
          //ADDING INDEX TO RESULT
          res.forEach((packages, index) => {
            packages['index'] = index + 1;
          });
          return res;
        })
      )
      .subscribe(res => {
        this.packages = res;
        this.dataPackages.next(res);
      });
  }

  getPackagesProducts(id_package): Observable<PromoProduct[]> {
    return this.afs.collection<PromoProduct>(`db/${this.auth.userInvent.db}/package/${id_package}/products`, ref => ref.orderBy('name', 'desc')).valueChanges();
  }

  getPromotions(): void {
    this.promotionsCollection =
      this.afs.collection<Promo>(`db/${this.auth.userInvent.db}/promotions`, ref => ref.orderBy('regDate', 'desc'));
    this.promotionsCollection.valueChanges()
      .pipe(
        map(res => {
          // ADDING INDEX TO RESULT
          res.forEach((promotions, index) => {
            promotions['index'] = index + 1;
          });
          return res;
        })
      )
      .subscribe(res => {
        this.promotions = res;
        this.dataPromotions.next(res);
      });
  }

  getPromoProducts(id_promo): Observable<PromoProduct[]> {
    return this.afs.collection<PromoProduct>(`db/${this.auth.userInvent.db}/promotions/${id_promo}/products`, ref => ref.orderBy('regDate', 'desc')).valueChanges();
  }

  /*---------------- LOGISTIC --------------------- */

  getTransfers(): void {
    this.transfersCollection = this.afs.collection(`db/${this.auth.userInvent.db}/transfers`, ref => ref.orderBy('regDate', 'desc'));
    this.transfersCollection.valueChanges()
      .subscribe(res => {
        this.transfers = res;
        this.dataTransfers.next(res);
      });
  }

  getTransferProducts(id_transfer): Observable<TransferProduct[]> {
    return this.afs.collection<TransferProduct>(`db/${this.auth.userInvent.db}/transfers/${id_transfer}/products`, ref => ref.orderBy('regDate', 'desc')).valueChanges();
  }

  /*---------------- REGISTRY --------------------- */

  addItem(item): void {
    item['index'] = this.documentToSet['productList'].length;
    this.documentToSet['productList'].push(item);
    this.dataDocumentToSet.next(this.documentToSet);
  }

  deleteItem(itemId): void {
    this.documentToSet['productList'].splice(itemId, 1);
    this.documentToSet['productList'].forEach((element, i) => {
      element['index'] = i;
    })
    this.dataDocumentToSet.next(this.documentToSet);
  }

  cleanList(): void {
    this.documentToSet['productList'] = [];
    this.dataDocumentToSet.next(this.documentToSet);
  }

  saveMovement(document, party, observations, warehouseDestination?, staff?, warehouseOrigin?): void {

    this.setDocLoading = true;

    this.documentToSet['correlative'] = parseInt(document['actualCorrelative']);
    this.documentToSet['serie'] = document['serie'];
    this.documentToSet['documentName'] = document['name'];
    this.documentToSet['documentNature'] = document['nature'];
    this.documentToSet['documentId'] = document['id'];

    this.documentToSet['observations'] = observations;
    this.documentToSet['partyDoc'] = party['docType'];
    this.documentToSet['partyDocNum'] = party['docNum'];
    this.documentToSet['partyId'] = party['id'];
    this.documentToSet['partyName'] = party['name'];
    this.documentToSet['userId'] = this.auth.userInvent.uid;
    this.documentToSet['userName'] = this.auth.userInvent.name + ', ' + this.auth.userInvent.lastname;
    this.documentToSet['regDate'] = Date.now();
    this.documentToSet['state'] = 'Grabado';
    this.documentToSet['warehouseOrigin'] = warehouseOrigin;
    this.documentToSet['warehouseDestination'] = '';

    let validatedStock = true;

    switch (document['nature']) {

      case 'SALIDA':

        this.documentToSet['vendorId'] = staff['id'];
        this.documentToSet['vendorName'] = staff['name'];

        this.documentToSet['productList'].forEach(async (element, i) => {

          await this.productsCollection.doc(element['productId']).get().forEach(snapshot => {
            if (snapshot.data()['stock'] >= element['quantity'] && validatedStock) {
              this.afs.firestore.runTransaction(async t => {
                return t.get(snapshot.ref).then(doc => {
                  t.update(snapshot.ref, { stock: doc.data().stock - element['quantity'] });
                })
              })
            } else {
              validatedStock = false;
              this.snackbar.open(`El stock del producto ${element['productName']} ha sido modificado y es menor a la cantidad que se pretende vender. Genere nuevamente el movimiento.`, 'Cerrar', {
                duration: 30000
              });
            }

          })

        });


        break;

      case 'AJUSTE DE SALIDA':

        this.documentToSet['productList'].forEach(async (element, i) => {

          await this.productsCollection.doc(element['productId']).get().forEach(snapshot => {

            if (snapshot.data()['stock'] >= element['quantity'] && validatedStock) {
              this.afs.firestore.runTransaction(async t => {
                return t.get(snapshot.ref).then(doc => {
                  t.update(snapshot.ref, { stock: doc.data().stock - element['quantity'] });
                })
              })
            } else {
              validatedStock = false;
              this.snackbar.open(`El stock del producto ${element['productName']} ha sido modificado y es menor a la cantidad que se pretende vender. Genere nuevamente el movimiento.`, 'Cerrar', {
                duration: 30000
              });
            }

          })

        });

        break;

      case 'AJUSTE DE ENTRADA':

        this.documentToSet['productList'].forEach(async (element, i) => {

          await this.productsCollection.doc(element['productId']).get().forEach(snapshot => {

            this.afs.firestore.runTransaction(async t => {
              return t.get(snapshot.ref).then(doc => {
                t.update(snapshot.ref, { stock: doc.data().stock + element['quantity'] });
              })
            })

          })

        })

        break;

      case 'ENTRADA':

        this.documentToSet['productList'].forEach(async (element, i) => {

          await this.productsCollection.doc(element['productId']).get().forEach(snapshot => {

            this.afs.firestore.runTransaction(async t => {
              return t.get(snapshot.ref).then(doc => {
                t.update(snapshot.ref, { stock: doc.data().stock + element['quantity'] });
              })
            })

          })

        });

        break;

      case 'TRANSFERENCIA':

        this.documentToSet['warehouseDestination'] = warehouseDestination['name'];

        this.documentToSet['productList'].forEach(async (element, i) => {

          await this.productsCollection.doc(element['productId']).get().forEach(snapshot => {

            if (snapshot.data()['stock'] >= element['quantity'] && validatedStock) {

              this.afs.firestore.runTransaction(async t => {
                return t.get(snapshot.ref).then(doc => {
                  t.update(snapshot.ref, { stock: doc.data().stock - element['quantity'] });
                })
              })

            } else {

              validatedStock = false;
              this.snackbar.open(`El stock del producto ${element['productName']} ha sido modificado y es menor a la cantidad que se pretende vender. Genere nuevamente el movimiento.`, 'Cerrar', {
                duration: 30000
              });

            }

          });

          let productExistOnDestination = false;

          await this.productsCollection.get().forEach(snapshot => {

            snapshot.docs.forEach(doc => {

              if (doc.data()['name'] === element['productName'] && doc.data()['warehouse'] === warehouseDestination['name']) {

                this.afs.firestore.runTransaction(async t => {
                  return t.get(doc.ref).then(doc => {
                    t.update(doc.ref, { stock: doc.data().stock + element['quantity'] });
                  })
                });

                productExistOnDestination = true;

              }

            });

          });

          if (!productExistOnDestination) {
            this.productsCollection.doc(element['productId']).get().forEach(snapshot => {
              this.productsCollection
                .add(snapshot.data())
                .then(ref => {
                  ref.update({
                    id: ref.id,
                    initialStock: element['quantity'],
                    stock: element['quantity'],
                    warehouse: warehouseDestination['name'],
                    userId: this.auth.userInvent.uid,
                    userName: this.auth.userInvent.name + ', ' + this.auth.userInvent.lastname,
                    regDate: Date.now()
                  })
                })
                .catch(err => {
                  console.log(err);
                })
            });

          }

        });


        break;

      default:
        break;
    }


    if (validatedStock) {

      this.afs.collection(`db/${this.auth.userInvent.db}/history`)
        .add(this.documentToSet)
        .then(ref => {
          ref.update({ id: ref.id });

          this.documentToSet = {
            serie: '',
            correlative: '',
            documentName: '',
            productList: []
          };
          this.dataDocumentToSet.next(this.documentToSet);
          this.setDocLoading = false;

          this.snackbar.open('Documento GRABADO!', 'Cerrar', {
            duration: 6000
          });
        })
        .catch(err => {
          this.snackbar.open('Oops!...Parece que hubo un error [Historial]', 'Cerrar', {
            duration: 6000
          });
          console.log(err);
        });

      //UPDATE CORRELATIVE
      if (document['nature'] != 'ENTRADA') {

        this.documentsCollection.doc(document['id']).get().forEach(doc => {

          this.afs.firestore.runTransaction(async t => {
            return t.get(doc.ref).then(doc => {
              t.update(doc.ref, { actualCorrelative: doc.data().actualCorrelative + 1 });
            })
          });

        })
          .then(() => {
            this.snackbar.open(`${document['name']} N° ${document['actualCorrelative']} guardado en el historial`, 'Cerrar', {
              duration: 6000
            });
          })

        // if(this.documentAssigned){

        //   this.documentAssignedCollection.doc(this.documentToSet['id']).update({
        //     observations: observations,
        //     partyDoc: party['docType'],
        //     partyDocNum: party['docNum'],
        //     partyId: party['id'],
        //     partyName: party['name'] + ', ' + party['lastname'],
        //     productList: this.documentToSet['productList'],
        //     regDate: Date.now(),
        //     state: 'Grabado'
        //   })
        //   .then(() => {
        //     this.documentToSet = {
        //       serie: '',
        //       correlative: '',
        //       documentName: '',
        //       productList: []
        //     };
        //     this.dataDocumentToSet.next(this.documentToSet);
        //     this.setDocLoading = false;
        //     this.snackbar.open(`Documento N° ${this.documentToSet['correlative']} actualizado!`, 'Cerrar', {
        //       duration: 6000
        //     });

        //   })
        //   .catch( err => {
        //     this.snackbar.open('Oops!...Parece que hubo un error', 'Cerrar', {
        //       duration: 6000
        //     });
        //     console.log(err);
        //   });

        // }else{

        //   this.documentToSetCollection.doc(this.documentToSet['id']).update({
        //     observations: observations,
        //     partyDoc: party['docType'],
        //     partyDocNum: party['docNum'],
        //     partyId: party['id'],
        //     partyName: party['name'] + ', ' + party['lastname'],
        //     productList: this.documentToSet['productList'],
        //     regDate: Date.now(),
        //     state: 'Grabado'
        //   })
        //   .then(() => {
        //     this.documentToSet = {
        //       serie: '',
        //       correlative: '',
        //       documentName: '',
        //       productList: []
        //     };
        //     this.dataDocumentToSet.next(this.documentToSet);
        //     this.setDocLoading = false;
        //     this.snackbar.open(`Documento N° ${this.documentToSet['correlative']} actualizado!`, 'Cerrar', {
        //       duration: 6000
        //     });

        //   })
        //   .catch( err => {
        //     this.snackbar.open('Oops!...Parece que hubo un error', 'Cerrar', {
        //       duration: 6000
        //     });
        //     console.log(err);
        //   });

        // }

      }

    }

  }


  /*---------------- HISTORY --------------------- */
  getHistory(documentNature, rangeStart, rangeEnd): void {
    this.historyCollection = this.afs.collection(`db/${this.auth.userInvent.db}/history`, ref => ref.where('regDate', '>=', rangeStart).where('regDate', '<', rangeEnd + 864E5));
    this.historyCollection.valueChanges()
      .pipe(
        map(res => {
          //ADDING INDEX TO RESULT & EXCLUDING BY NATURE TYPE
          let filteredResults = [];
          let index = 1;
          res.forEach(history => {
            if (history['documentNature'] === documentNature) {
              history['index'] = index;
              filteredResults.push(history);
              index++;
            }
          });

          var sortedHistory = filteredResults.sort((a, b) => b['regDate'] - a['regDate']);

          return sortedHistory;
        })
      )
      .subscribe(res => {
        this.history = res;
        this.dataHistory.next(res);
        this.snackbar.open(`Listo!`, 'Cerrar', {
          duration: 6000
        });
      });
  }

  cancelDocument(movement): void {

    let validatedStock = true;

    this.historyCollection.doc(`${movement['id']}`).get().forEach(doc => {

      doc.ref.update({ state: 'Anulado' })
        .then(() => {
          this.snackbar.open(`Documento anulado!`, 'Cerrar', {
            duration: 6000
          });
        })
        .catch(err => {
          this.snackbar.open('Oops!...Parece que hubo un error', 'Cerrar', {
            duration: 6000
          });
          console.log(err);
        });

      doc.data()['productList'].forEach(product => {

        this.productsCollection.doc(`${product['productId']}`).get().forEach(async doc => {

          if (movement['documentNature'] === 'ENTRADA' || movement['documentNature'] === 'AJUSTE DE ENTRADA') {

            this.afs.firestore.runTransaction(async t => {
              return t.get(doc.ref).then(doc => {
                t.update(doc.ref, { stock: doc.data()['stock'] - product['quantity'] });
              });
            });

          } else if (movement['documentNature'] === 'SALIDA' || movement['documentNature'] === 'AJUSTE DE SALIDA') {

            this.afs.firestore.runTransaction(async t => {
              return t.get(doc.ref).then(doc => {
                t.update(doc.ref, { stock: doc.data()['stock'] + product['quantity'] });
              });
            });

          } else if (movement['documentNature'] === 'TRANSFERENCIA') {

            // movement['productList'].forEach( async (element, i) => {

            await this.productsCollection.doc(product['productId']).get().forEach(snapshot => {

              if (snapshot.data()['stock'] >= product['quantity'] && validatedStock) {

                this.afs.firestore.runTransaction(async t => {
                  return t.get(snapshot.ref).then(doc => {
                    t.update(snapshot.ref, { stock: doc.data().stock + product['quantity'] });
                  })
                })

              }

            });

            await this.productsCollection.get().forEach(snapshot => {

              snapshot.docs.forEach(doc => {

                if (doc.data()['name'] === product['productName'] && doc.data()['warehouse'] === movement['warehouseDestination']) {

                  if (doc.data().stock >= product['quantity']) {
                    this.afs.firestore.runTransaction(async t => {
                      return t.get(doc.ref).then(doc => {
                        t.update(doc.ref, { stock: doc.data().stock - product['quantity'] });
                      })
                    });
                  } else {
                    validatedStock = false;
                    this.snackbar.open(`El stock del producto ${product['productName']} es menor a la cantidad que se pretende restar (${doc.data().stock} - ${product['quantity']}). EL DOCUMENTO NO SE PUEDE ANULAR.`, 'Cerrar', {
                      duration: 8000
                    });
                  }


                }

              });

            });

            // });

          }

        });

      })

    })
      .then(() => {
        this.snackbar.open('Stock reestablecido!', 'Cerrar', {
          duration: 6000
        });
      })
      .catch(err => {
        this.snackbar.open('Oops!...Parece que hubo un error', 'Cerrar', {
          duration: 6000
        });
        console.log(err);
      });

  }

  cancelFromRegistry(document, observations): void {

    this.setDocLoading = true;

    this.documentToSet['correlative'] = parseInt(document['actualCorrelative']);
    this.documentToSet['serie'] = document['serie'];
    this.documentToSet['documentName'] = document['name'];
    this.documentToSet['documentNature'] = document['nature'];
    this.documentToSet['documentId'] = document['id'];

    this.documentToSet['observations'] = observations;
    this.documentToSet['partyDoc'] = '';
    this.documentToSet['partyDocNum'] = '';
    this.documentToSet['partyId'] = '';
    this.documentToSet['partyName'] = '';
    this.documentToSet['userId'] = this.auth.userInvent.uid;
    this.documentToSet['userName'] = this.auth.userInvent.name + ', ' + this.auth.userInvent.lastname;
    this.documentToSet['regDate'] = Date.now();
    this.documentToSet['state'] = 'Anulado';
    this.documentToSet['warehouseOrigin'] = '';
    this.documentToSet['warehouseDestination'] = '';

    this.afs.collection(`db/${this.auth.userInvent.db}/history`)
      .add(this.documentToSet)
      .then(ref => {
        ref.update({ id: ref.id });

        this.documentToSet = {
          serie: '',
          correlative: '',
          documentName: '',
          productList: []
        };
        this.dataDocumentToSet.next(this.documentToSet);
        this.setDocLoading = false;

        this.snackbar.open('Documento ANULADO!', 'Cerrar', {
          duration: 6000
        });
      })
      .catch(err => {
        this.snackbar.open('Oops!...Parece que hubo un error [Historial]', 'Cerrar', {
          duration: 6000
        });
        console.log(err);
      });

    //UPDATE CORRELATIVE
    if (document['nature'] != 'ENTRADA') {

      this.documentsCollection.doc(document['id']).get().forEach(doc => {

        this.afs.firestore.runTransaction(async t => {
          return t.get(doc.ref).then(doc => {
            t.update(doc.ref, { actualCorrelative: doc.data().actualCorrelative + 1 });
          })
        });

      })
        .then(() => {
          this.snackbar.open(`${document['name']} N° ${document['actualCorrelative']} guardado en el historial`, 'Cerrar', {
            duration: 6000
          });
        })

    }

  }

}
