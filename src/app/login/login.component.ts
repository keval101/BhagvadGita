import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  })
  signUpForm = new FormGroup({
    name: new FormControl('', [ Validators.required]),
    email: new FormControl('', [ Validators.required, Validators.email]),
    password: new FormControl('', [ Validators.required, Validators.min(6)])
  })
  constructor() { }

  ngOnInit(): void {
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
}
