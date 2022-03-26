import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isSignUp = false;
  loginForm = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email]),
    password: new FormControl('', [ Validators.required, Validators.min(6)])
  });
  
  signUpForm = new FormGroup({
    name: new FormControl('', [ Validators.required]),
    email: new FormControl('', [ Validators.required, Validators.email]),
    password: new FormControl('', [ Validators.required, Validators.min(6)])
  })
  isBackClick = false;
  isLogin = false;
  constructor(private _location: Location, private _router: Router) { }

  ngOnInit(): void {
    this._router.url === '/login' ? this.isLogin = true : this.isLogin = false;
  }

  signup(): void {
    this.isSignUp = true;
  }
  showLogin(): void {
    this.isSignUp = false;
  }

  loginUser(): void {
    console.log(this.loginForm.value);
  }
  signUpUser(): void {
    console.log(this.signUpForm.value);
  }
  back(): void {
    this.isBackClick = true;
    setTimeout(() => { this._location.back() }, 400);
  }
}
