import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isSignUp = false;

  constructor() { }

  ngOnInit(): void {
  }

  signup(): void {
    this.isSignUp = true;
  }
  showLogin(): void {
    this.isSignUp = false;
  }
}
