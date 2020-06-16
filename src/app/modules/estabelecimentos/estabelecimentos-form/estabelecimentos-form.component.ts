import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Estabelecimentos } from 'src/models/Estabelecimentos';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { isUndefined, isNull } from 'util';
@Component({
  selector: 'app-estabelecimentos-form',
  templateUrl: './estabelecimentos-form.component.html',
  styleUrls: ['./estabelecimentos-form.component.sass']
})
export class EstabelecimentosFormComponent implements OnInit {
  estabelecimentoForm: FormGroup;
  estabelecimento: Estabelecimentos;
  idUpdate: Number ;
  formSubmitted = false;

  public get isUpdate(): boolean { return !isUndefined(this.idUpdate) }

  data: Observable<Boolean>;
  public celular = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public telefone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public cep = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public cnpj = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];


  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.createForm(new Estabelecimentos());

  }

  createForm(estabelecimento: Estabelecimentos) {
    this.estabelecimentoForm = new FormGroup({
      id: new FormControl(estabelecimento.id),
      cnpj_cpf: new FormControl(estabelecimento.cnpj_cpf, Validators.required),
      nome_fantasia: new FormControl(estabelecimento.nome_fantasia, Validators.required),
      razao_social: new FormControl(estabelecimento.razao_social, Validators.required),
      contato: new FormControl(estabelecimento.contato),
      endereco: new FormControl(estabelecimento.endereco, Validators.required),
      bairro: new FormControl(estabelecimento.bairro),
      email: new FormControl(estabelecimento.email),
      municipio: new FormControl(estabelecimento.municipio),
      uf: new FormControl(estabelecimento.uf),
      grau_de_risco: new FormControl(estabelecimento.grau_de_risco, Validators.required),
      tipo_de_risco: new FormControl(estabelecimento.tipo_de_risco),
      createdAt: new FormControl(estabelecimento.createdAt),
      updatedAt: new FormControl(estabelecimento.updatedAt),
    });
  }

  public get f() { return this.estabelecimentoForm.controls };


  submitForm() {
    this.formSubmitted == true;
    this.estabelecimentoForm.valid
    this.idUpdate = this.isUpdate == false ? 100 : undefined
  }

}
