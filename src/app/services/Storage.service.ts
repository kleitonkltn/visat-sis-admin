import { Injectable } from '@angular/core';



const TOKEN_KEY = 'token'
const USER_KEY = 'user'
@Injectable({
  providedIn: 'root'
})



export class StorageService {

  constructor() { }

  addToken(token) {
    return localStorage.setItem(TOKEN_KEY, token);
  }

  deleteToken() {
    this.deleteUser();
    return localStorage.removeItem(TOKEN_KEY);
  }

  getStorageToken() {
    return localStorage.getItem(TOKEN_KEY)
  }

  setUser(user) {
    return localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  deleteUser() {
    return localStorage.removeItem(USER_KEY);
  }

  getStorageUser() {
    return localStorage.getItem(USER_KEY)
  }
}
