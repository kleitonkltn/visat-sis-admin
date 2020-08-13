import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstabelecimentosRoutingModule } from './estabelecimentos-routing.module';
import { EstabelecimentosFormComponent } from './estabelecimentos-form/estabelecimentos-form.component';
import { EstabelecimentosListComponent } from './estabelecimentos-list/estabelecimentos-list.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ComponentsModule } from 'src/app/components/components.module';
import { ConfirmDialogService } from 'src/app/components/comfirm-dialog/confirm-dialog.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { ConsultaCNPJService } from 'src/app/services/ConsultaCNPJ.service';

import { ProcedimentosListComponent } from './procedimentos-list/procedimentos-list.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProcedimentosFormComponent } from './procedimentos-form/procedimentos-form.component';
import { MatButtonModule } from '@angular/material/button';

import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorResponseDirective } from 'src/app/core/errorResponse.directive';
import { CNPJandCPFPipe } from 'src/app/core/pipe/cnpj_cpf.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
@NgModule({
  declarations: [
    EstabelecimentosFormComponent,
    EstabelecimentosListComponent,
    ProcedimentosListComponent,
    ProcedimentosFormComponent,
    CNPJandCPFPipe,
  ],
  imports: [
    CommonModule,
    EstabelecimentosRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    HttpClientModule,
    ComponentsModule,
    HttpClientJsonpModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ], exports: [ProcedimentosListComponent, ProcedimentosFormComponent],
  providers: [ConfirmDialogService, ConsultaCNPJService, ErrorResponseDirective, CNPJandCPFPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EstabelecimentosModule { }
