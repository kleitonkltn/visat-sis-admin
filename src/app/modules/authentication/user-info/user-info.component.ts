import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/models/Usuario';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.sass']
})
export class UserInfoComponent implements OnInit {
  userData: Usuario;
  constructor(private auth: AuthService) { }
  ngOnInit() {
    this.auth.isAuthenticated()
    this.userData = this.auth._user;
  }
  logout() {
    this.auth.logout()
    window.location.reload();
  }
}
