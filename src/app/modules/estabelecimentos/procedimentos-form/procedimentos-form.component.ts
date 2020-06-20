import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Procedimentos } from 'src/models/Procedimentos';
import { ProcedimentosService } from 'src/app/services/Procedimentos.service';
import { DatePipe, formatDate } from '@angular/common';
import * as moment from 'moment-timezone';
import { Subject, pipe } from 'rxjs';
import { ConfirmDialogService } from 'src/app/components/comfirm-dialog/confirm-dialog.service';
import { isEmpty, catchError, retry } from 'rxjs/operators';
import { isUndefined, isNull } from 'util';
import { ErrorResponseDirective } from 'src/core/errorResponse.directive';
@Component({
  selector: 'app-procedimentos-form',
  templateUrl: './procedimentos-form.component.html',
  styleUrls: ['./procedimentos-form.component.css']
})
export class ProcedimentosFormComponent implements OnInit {
  @Input() idProcedimento: number;
  @Input() idEstabelecimento: number;
  @Output() closeForm = new Subject();
  @Output() alterForm = new Subject();
  procedimentosForm: FormGroup;
  procedimento = new Procedimentos();
  loadingForm = false;
  errorMessage;
  datePipe = new DatePipe('pt-BR');
  constructor(
    private procedimentosService: ProcedimentosService,
    private errorResponse: ErrorResponseDirective,
    private modalService: ConfirmDialogService
  ) { }
  ngOnInit() {
    this.createForm(new Procedimentos());
    this.getProcedimento();
  }
  createForm(procedimento: Procedimentos) {
    this.procedimentosForm = new FormGroup({
      id: new FormControl(procedimento.id),
      description: new FormControl(procedimento.description, Validators.required),
      comments: new FormControl(procedimento.comments),
      accomplishedAt: new FormControl(procedimento.accomplishedAt, Validators.required),
      estabelecimento: new FormControl(procedimento.estabelecimento)
    });
  }
  formToObject() {
    this.procedimento = this.f.value;
    this.procedimento.accomplishedAt = moment(this.procedimento.accomplishedAt, 'YYYY-MM-DD').format('DD/MM/YYYY');
    this.procedimento.estabelecimento = Number(this.idEstabelecimento);
  }
  submitForm() {

    if (isNull(this.idProcedimento)) {
      this.formToObject();
      this.procedimentosService.create(this.procedimento).subscribe((data) => {
        this.modalService.openConfirmDialog('Cadastro realizado com sucesso', 'Cadastro', false, 'alert-success')
          .then(() => {
            this.updateForm();
            this.createForm(new Procedimentos());
          });
      }, (err) => { console.log(err); this.errorMessage = err });
    } else {
      this.formToObject();
      this.procedimentosService.update(this.procedimento).subscribe((data) => {
        this.modalService.openConfirmDialog('Cadastro atualizado com sucesso', 'Cadastro', false, 'alert-success')
          .then(() => {
            this.updateForm();
            this.createForm(new Procedimentos());
          });
      }, (err) => { console.log(err); this.errorMessage = err });
    }

  }
  cancelForm() {
    this.closeForm.next(true);
    this.errorMessage = undefined;
  }
  updateForm() {
    this.alterForm.next(true);
    this.errorMessage = undefined;
  }

  public get f(): FormGroup { return this.procedimentosForm; }


  getProcedimento() {
    if (this.idProcedimento) {
      this.loadingForm = true;
      return new Promise((resolve, _reject) => {
        this.procedimentosService.getByID(this.idProcedimento).subscribe((data) => {
          this.idEstabelecimento = data.estabelecimento.id;
          this.procedimento = data;
          data.accomplishedAt = moment(data.accomplishedAt, 'DD/MM/YYYY').format('YYYY-MM-DD');
          this.createForm(data);
          this.loadingForm = false;
          resolve(data);
        }, (err) => { console.log(err) });
      });

    }
  }
}
