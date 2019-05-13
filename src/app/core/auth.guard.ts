import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { MatSnackBar } from '@angular/material';

import { AuthService } from "./auth.service";
import { tap, map, take } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    public snackbar: MatSnackBar){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if(!loggedIn) {
          this.snackbar.open('Acceso denegado', 'Cerrar', {
            duration: 6000
          });
          this.router.navigate(['/welcome']);
        }
      })
    );
  }
}
