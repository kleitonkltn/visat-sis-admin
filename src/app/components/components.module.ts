import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComfirmDialogComponent } from './comfirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './comfirm-dialog/confirm-dialog.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ConfirmDialogService],
  exports: [ComfirmDialogComponent],
  entryComponents: [ComfirmDialogComponent],
  declarations: [ComfirmDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ComponentsModule { }
