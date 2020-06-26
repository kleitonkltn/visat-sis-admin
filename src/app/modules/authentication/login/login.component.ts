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
  constructor(private authService: AuthService, private modalService: ConfirmDialogService) { }

  ngOnInit() {
  }

  submitForm() {
    const user = {
      matricula: this.matricula,
      password: this.password
    }
    this.authService.login(user).then((data) => {
      this.modalService.openConfirmDialog('Bem Vindo ' + data['userName'], 'Login', false).then(() => {
        window.location.reload()
      })
    }, () => {
      this.modalService.openConfirmDialog('Matricula e/ou Senha Incorreta', 'Login', false, 'alert-danger')
    })
  }

}
