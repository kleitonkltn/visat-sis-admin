import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstabelecimentosRoutingModule } from './estabelecimentos-routing.module';
import { EstabelecimentosFormComponent } from './estabelecimentos-form/estabelecimentos-form.component';
import { EstabelecimentosListComponent } from './estabelecimentos-list/estabelecimentos-list.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [EstabelecimentosFormComponent, EstabelecimentosListComponent],
  imports: [
    CommonModule,
    EstabelecimentosRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class EstabelecimentosModule { }
