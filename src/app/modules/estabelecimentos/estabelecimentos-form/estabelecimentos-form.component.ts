import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Estabelecimentos } from 'src/models/Estabelecimentos';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isUndefined } from 'util';
import { ConfirmDialogService } from 'src/app/components/comfirm-dialog/confirm-dialog.service';
import { EstabelecimentosService } from 'src/app/services/Estabelecimentos.service';
import { ConsultaCNPJService } from 'src/app/services/ConsultaCNPJ.service';
import { CNPJ } from 'src/models/CNPJ';
@Component({
  selector: 'app-estabelecimentos-form',
  templateUrl: './estabelecimentos-form.component.html',
  styleUrls: ['./estabelecimentos-form.component.sass']
})
export class EstabelecimentosFormComponent implements OnInit {

  estabelecimentoForm: FormGroup;
  estabelecimento = new Estabelecimentos();
  idUpdate: number;
  formSubmitted = false;
  loadingForm = false;
  submittingForm = false;
  loadingCnpj = false;

  public get isUpdate(): boolean { return !isUndefined(this.idUpdate) }

  data: Observable<boolean>;
  mask: string;


  constructor(
    private modalService: ConfirmDialogService,
    private router: Router,
    private routeActivated: ActivatedRoute,
    private estabelecimentoService: EstabelecimentosService,
    private cnpjService: ConsultaCNPJService
  ) {
    this.verifyParams();
  }


  verifyParams() {
    this.routeActivated.queryParams.subscribe(
      queryParams => {
        this.idUpdate = queryParams.id;
        if (this.idUpdate != null) {
          this.loadingForm = true
          window.scrollTo(0, 0);
          this.estabelecimentoService.getByID(this.idUpdate).subscribe((estabelecimentos) => {
            this.estabelecimento = estabelecimentos;
            this.createForm(this.estabelecimento);
            this.loadingForm = false
          }, () => {
          });
        } else {
          this.createForm(new Estabelecimentos());
          this.loadingForm = false
        }
      }
    );
  }
  ngOnInit() {
    this.createForm(new Estabelecimentos());
  }

  createForm(estabelecimento: Estabelecimentos) {
    this.estabelecimentoForm = new FormGroup({
      id: new FormControl({ value: estabelecimento.id, disabled: true }),
      cnpj_cpf: new FormControl(estabelecimento.cnpj_cpf, Validators.required),
      nome_fantasia: new FormControl(estabelecimento.nome_fantasia, Validators.required),
      razao_social: new FormControl(estabelecimento.razao_social, Validators.required),
      contato: new FormControl(estabelecimento.contato),
      endereco: new FormControl(estabelecimento.endereco, Validators.required),
      bairro: new FormControl(estabelecimento.bairro),
      email: new FormControl(estabelecimento.email),
      municipio: new FormControl(estabelecimento.municipio),
      uf: new FormControl(estabelecimento.uf),
      grau_de_risco: new FormControl(estabelecimento.grau_de_risco),
      tipo_de_risco: new FormControl(estabelecimento.tipo_de_risco),
      createdAt: new FormControl({ value: estabelecimento.createdAt, disabled: true }),
      updatedAt: new FormControl({ value: estabelecimento.updatedAt, disabled: true }),
    });
  }

  public get f(): FormGroup { return this.estabelecimentoForm };
  public formItem(campo: string): AbstractControl { return this.estabelecimentoForm.get(campo) };

  submitForm() {
    this.submittingForm = true
    if (this.f.valid === true) {
      this.formToObject()
      if (this.idUpdate != null) {
        this.estabelecimento.id = this.idUpdate;
        this.estabelecimentoService.update(this.estabelecimento).subscribe(() => {
          this.modalService.openConfirmDialog('Cadastro atualizado com sucesso', 'Cadastro', false, 'alert-success')
            .then(() => {
              this.submittingForm = false
              this.router.navigate(['estabelecimentos/list'])
            })
        })
      } else {
        this.estabelecimentoService.create(this.estabelecimento).subscribe((response) => {
          if (response['id']) {
            this.modalService.openConfirmDialog('Cadastro realizado com sucesso *', 'Cadastro', false, 'alert-success')
              .then(() => {
                this.submittingForm = false
                this.router.navigate(['estabelecimentos/list'])
              })
          }
        })
      }
    } else {
      this.submittingForm = false
      this.modalService.openConfirmDialog('Cadastro incompleto. Favor preencha todos os campos com *', 'Cadastro', false, 'alert-danger')
    }
  }
  searchCnpj() {
    this.loadingCnpj = true;
    if (this.isCPF()) {
      this.loadingCnpj = false;
      return this.modalService.openConfirmDialog('Consulta Permitida Somente a CNPJ',
        'Dados Inválidos', false, 'alert-danger')
    } else {
      const cnpj = this.f.get('cnpj_cpf').value.replace('/', '').replace('-', '').replace('.', '');
      this.cnpjService.getInfoCNPJ(cnpj).subscribe((data: any) => {
        console.log(data);
        if (data.status === 'ERROR') {
          this.loadingCnpj = false;
          return this.modalService.openConfirmDialog('Erro ao Realizar consulta do CNPJ. Favor preencher manualmente',
            data.message, false, 'alert-danger')
        }
        this.cnpjToEstabelecimento(data);
        this.createForm(this.estabelecimento);
        this.estabelecimentoForm.controls['cnpj_cpf'].setValue(data.cnpj)
        this.loadingCnpj = false;
      })
    }
  }
  cnpjToEstabelecimento(data) {
    this.estabelecimento.razao_social = data.nome
    this.estabelecimento.nome_fantasia = data.fantasia
    this.estabelecimento.contato = data.telefone
    this.estabelecimento.municipio = data.municipio
    this.estabelecimento.uf = data.uf
    this.estabelecimento.email = data.email
    this.estabelecimento.endereco = `${data.logradouro} - N° ${data.numero}`;
    this.estabelecimento.bairro = data.bairro
    this.estabelecimento.tipo_de_risco = 'Atividade Principal'
    data.atividade_principal.forEach(element => {
      this.estabelecimento.tipo_de_risco = this.estabelecimento.tipo_de_risco + ' \n' + element.code + ' - ' + element.text
    });
    this.estabelecimento.tipo_de_risco = this.estabelecimento.tipo_de_risco + ' \n \n' + 'Atividade Secundárias'
    data.atividades_secundarias.forEach(element => {
      this.estabelecimento.tipo_de_risco = this.estabelecimento.tipo_de_risco + ' \n' + element.code + ' - ' + element.text
    });
  }
  formToObject() {
    this.estabelecimento = this.estabelecimentoForm.value;
  }

  clearForm() {
    this.modalService.openConfirmDialog('Deseja Cancelar o cadastro?', 'Cadastro').then((response) => {
      if (response === true) {
        this.router.navigate(['estabelecimentos/list'])
      }
    })

  }
  isCPF(): boolean {
    return this.formItem('cnpj_cpf').value == null ? true : this.formItem('cnpj_cpf').value.length < 12 ? true : false;
  }

  getCpfCnpjMask(): string {
    return this.isCPF() ? '000.000.000-009' : '00.000.000/0000-00';
  }



}
