import { ConfirmDialogService } from './../../../components/comfirm-dialog/confirm-dialog.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  matricula;
  password;
  isAuthenticating = false;
  constructor(private authService: AuthService, private modalService: ConfirmDialogService) { }

  ngOnInit() {
  }

  submitForm() {
    this.isAuthenticating = true
    const user = {
      matricula: this.matricula,
      password: this.password
    }
    this.authService.login(user).then((data) => {
      this.isAuthenticating = false;
      this.modalService.openConfirmDialog('Bem Vindo ' + data['userName'], 'Login', false).then(() => {
        window.location.reload()
      })
    }, () => {
      this.isAuthenticating = false;
      this.modalService.openConfirmDialog('Matricula e/ou Senha Incorreta', 'Login', false, 'alert-danger')
    })
  }

}
