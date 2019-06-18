import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  isAuth = false;
  element: any;
  visibility = true;

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', [ Validators.required ]]
    });

    console.log('uid:', !!this.auth.userInvent.uid);
  }

  get email() {
    return this.loginFormGroup.get('email');
  }

  get password() {
    return this.loginFormGroup.get('password');
  }

  checkAuth() {
    this.auth.emailLogin(this.email.value, this.password.value);
  }

  goToDashboard() {
    this.router.navigateByUrl('/main');
  }

  showPassword(): void{
    this.element = document.getElementById('pass');
    if(this.element.getAttribute('type') === 'password') {
      this.element.setAttribute('type', 'text');
      this.visibility = false;
    } else {
      this.element.setAttribute('type', 'password');
      this.visibility = true;
    }
  }

}
