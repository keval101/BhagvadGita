import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {catchError} from 'rxjs/operators'
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  isLoggedIn = false;

  constructor(public _fireAuth: AngularFireAuth, private _http: HttpClient, private _router: Router, private _msgService: MessageService) { }

  userSignUp(email: string, password: string) {
    this._fireAuth.createUserWithEmailAndPassword(email, password).then(
      res => {
        this.isLoggedIn = true;
        this._msgService.add({severity:'success', summary: 'Account Created!', detail: 'Thank you for joing with us. Your account is successfully created.'})
        localStorage.setItem('user', JSON.stringify(res.user))
        setTimeout(() => {
          this._router.navigate(['home']);
        }, 1000);
      }
    )
  }

  userSignIn(email: string, password: string) {
    this._fireAuth.signInWithEmailAndPassword(email, password).then(
      res => {
        this.isLoggedIn = true;
        this._msgService.add({severity:'success', summary: 'Login Successfull!', detail: 'You are logged in successfully.'})
        localStorage.setItem('user', JSON.stringify(res.user))
        setTimeout(() => {
          this._router.navigate(['home']);
        }, 1000);
      }
    )
  }

  logout(): void {
    this._fireAuth.signOut();
    localStorage.removeItem('user')
  }
  
}
