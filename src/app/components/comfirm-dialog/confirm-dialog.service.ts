import { Injectable } from '@angular/core';
import { ComfirmDialogComponent } from './confirm-dialog.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {


  public modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'confirm-dialog'
  };
  constructor(
    private modalService: BsModalService
  ) { }

  openConfirmDialog(message?: string, header?: string, options = true, classCss?: string) {
    return new Promise((resolve, _reject) => {
      this.modalRef = this.modalService.show(ComfirmDialogComponent, this.config);
      this.modalRef.content.header = header || 'Confirmar';
      this.modalRef.content.options = options;
      this.modalRef.content.classCss = classCss;
      this.modalRef.content.message = message || 'Deseja Confirmar a ação?';
      this.modalRef.content.onClose.subscribe((result) => {
        resolve(result);
      });
    });
  }

}

