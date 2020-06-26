import { ConfirmDialogService } from './../components/comfirm-dialog/confirm-dialog.service';
import { Usuario } from './../../models/Usuario';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { LoginService } from './Login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _user: Usuario = null;
  authenticationState = new BehaviorSubject(false);
  _token: string;
  observable = new Observable(subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
      subscriber.next(4);
      subscriber.complete();
    }, 1000);
  });
  constructor(
    private helper: JwtHelperService,
    private storage: StorageService,
    private loginService: LoginService,
    private router: Router,
    private modalService: ConfirmDialogService
  ) { }

  checkToken() {
    const token = this.storage.getStorageToken()
    if (token) {
      const decoded = this.helper.decodeToken(token);
      const isExpired = this.helper.isTokenExpired(token);
      if (!isExpired) {
        this.authenticationState.next(true);
        this._user = decoded;
        this._token = token
        this.storage.setUser(this._user);
      } else {
        this.authenticationState.next(false);
        this.storage.deleteUser();
        this.modalService.openConfirmDialog('Sessão Expirada', 'Login', false, 'alert-danger').then(() => { this.logout(); })

      }
    }
  }

  login(user) {
    return new Promise((resolve, reject) => {
      this.loginService.login(user.matricula, user.password).subscribe((res) => {
        this.authenticationState.next(true)
        this._user = this.helper.decodeToken(res['token'])
        this.storage.addToken(res['token'])
        this.storage.setUser(this._user)
        resolve(this._user);
      }, (err) => {
        this.authenticationState.next(false);
        reject(err)
      })
    })
  }

  logout() {
    this.storage.deleteToken()
    this.authenticationState.next(false);
    window.location.reload()
  }

  isAuthenticated() {
    this.checkToken();
    return this.authenticationState.value;
  }

}
