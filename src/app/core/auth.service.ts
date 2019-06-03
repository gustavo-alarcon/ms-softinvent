import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// APP IMPORTS
import { User, Permits } from './ms-types';

// ANGULAR FIRE V2 IMPORTS
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

// RXJS IMPORTS
import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// MATERIAL DESIGN 7.1.0 IMPORTS
import { MatSnackBar } from '@angular/material';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user: Observable<User>;

  userInvent: User = {
    name: '',
    lastname: '',
    displayName: '',
    uid: '',
    email: '',
    db: '',
    company: '',
    accountType: 999,
    accountState: 999,
    regDate: 0,
    permits: ''
  };

  authLoader: boolean = false;
  now = new Date();

  // CUSTOMER'S COMPANIES
  appCompaniesCollection: AngularFirestoreCollection<any>;
  appCompanies: Array<Object> = [];

  public dataAppCompanies = new BehaviorSubject<any[]>([]);
  currentDataAppCompanies = this.dataAppCompanies.asObservable();

  // CUSTOMER'S USERS
  usersCollection: AngularFirestoreCollection<User>;
  users: Array<User> = [];

  public dataUsers = new BehaviorSubject<User[]>([]);
  currentDataUsers = this.dataUsers.asObservable();

  // USER PERMITS
  permitsDocument: AngularFirestoreDocument<Permits>;
  permits: Permits;

  public dataPermits = new BehaviorSubject<Permits>({ id: '', name: '', createBy: '', regDate: 0 });
  currentDataPermits = this.dataPermits.asObservable();

  // TOKENS
  tokensCollection: AngularFirestoreCollection<any>;
  tokens: Array<Object> = [];

  public dataTokens = new BehaviorSubject<any[]>([]);
  currentDataTokens = this.dataTokens.asObservable();

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public snackbar: MatSnackBar) {

    this.user = this.afAuth.authState
      .pipe(
        switchMap(user => {
          if (user) {
            this.afs.doc<User>(`users/${user.uid}`).valueChanges().subscribe(currentUser => {
              this.userInvent = currentUser;

              // Retrive permits
              this.permitsDocument =
                this.afs
                  .collection<Permits>(`db/${this.userInvent.db}/configurations/accounts/permits`)
                  .doc<Permits>(this.userInvent.permits);
              this.permitsDocument
                .valueChanges()
                .subscribe(res => {
                  this.permits = res;
                  this.dataPermits.next(res);
                });

              // Retrive accounts associated with the company
              this.usersCollection = this.afs.collection<User>(`users`, ref => ref.where('company', '==', this.userInvent.company));
              this.usersCollection.valueChanges().subscribe(res => {
                this.users = res;
                this.dataUsers.next(res);
              });
            });
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      );

    this.getAppCompanies();
  }

  emailLogin(email: string, password: string) {
    console.log(email, password);
    this.authLoader = true;
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(credential => {
        if (credential) {
          this.authLoader = false;
          this.router.navigateByUrl('/main');
        }
      })
      .catch(error => this.handleError(error));
  }

  emailSignUp(user, tokenId) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(ref => {
        user.uid = ref.user.uid;
        this.afs.collection('users').doc(ref.user.uid).set(user).then(res => {
          this.snackbar.open('Listo!', 'Cerrar', {
            duration: 6000
          });
          this.router.navigateByUrl('/welcome');
        });
        this.tokensCollection.doc(tokenId).update({ used: true });
      })
      .catch(error => this.handleError(error));
  }

  generateToken(user: User): void {
    this.afs.collection(`companies/${user.company}/tokens`).add(user)
      .then(ref => {
        ref.update({ token: ref.id });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getAppCompanies(): void {
    this.appCompaniesCollection = this.afs.collection('companies', ref => ref.orderBy('regDate', 'asc'));
    this.appCompaniesCollection.valueChanges().subscribe(res => {
      this.appCompanies = res;
      this.dataAppCompanies.next(res);
    });
  }

  getTokens(company): void {
    this.tokensCollection = this.afs.collection(`companies/${company}/tokens`, ref => ref.orderBy('regDate', 'desc'));
    this.tokensCollection.valueChanges().subscribe(res => {
      this.tokens = res;
      this.dataTokens.next(res);
    });
  }

  signOut() {

    this.userInvent = {
      name: '',
      lastname: '',
      displayName: '',
      uid: '',
      email: '',
      db: '',
      company: '',
      accountType: 999,
      accountState: 999,
      regDate: 0,
      permits: ''
    };

    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  private handleError(error) {
    let message = '';

    switch (error.code) {
      case 'auth/invalid-email':
        message = 'Error: El formato del correo es incorrecto';
        break;

      case 'auth/wrong-password':
        message = 'Error: El password es incorrecto o el usuario no tiene un password';
        break;

      case 'auth/user-disabled':
        message = 'Error: El usuario esta deshabilitado';
        break;

      case 'auth/user-not-found':
        message = 'Error: El usuario no está registrado';
        break;

      default:
        message = 'Hmmm esto es nuevo ...' + error.code;
        break;
    }
    this.snackbar.open(message, 'Cerrar', {
      duration: 6000,
    });

    this.authLoader = false;
  }
}
