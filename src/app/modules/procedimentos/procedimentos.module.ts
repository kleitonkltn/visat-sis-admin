import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcedimentosRoutingModule } from './procedimentos-routing.module';
import { ProcedimentosFormComponent } from './procedimentos-form/procedimentos-form.component';
import { ProcedimentosListComponent } from './procedimentos-list/procedimentos-list.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ProcedimentosFormComponent, ProcedimentosListComponent],
  imports: [
    CommonModule,
    ProcedimentosRoutingModule,
    RouterModule
  ]
})
export class ProcedimentosModule { }
