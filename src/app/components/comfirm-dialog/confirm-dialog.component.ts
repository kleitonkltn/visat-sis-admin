import { Component, TemplateRef, Input, Output, EventEmitter, OnInit, AfterContentInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-comfirm-dialog',
  templateUrl: './comfirm-dialog.component.html',
  styleUrls: ['./comfirm-dialog.component.sass']

})
export class ComfirmDialogComponent implements OnInit, AfterContentInit {
  public onClose: Subject<boolean>;
  @Input() message: string;
  @Input() header: string;
  @Input() classCss: string;
  @Input() options: boolean;
  @Output() closeEvent = new EventEmitter();
  visible = true;
  constructor(public bsModalRef: BsModalRef) { }
  ngAfterContentInit(): void {



    setTimeout(() => {
      if (this.options === false) {
        this.onCancel();
      }
    }, 3000);

  }

  ngOnInit() {
    this.onClose = new Subject();

  }

  public onConfirm() {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }

  public onCancel() {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }
}
