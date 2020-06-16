import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcedimentosFormComponent } from './procedimentos-form/procedimentos-form.component';
import { ProcedimentosListComponent } from './procedimentos-list/procedimentos-list.component';


const routes: Routes = [{
  path: 'procedimentos/form', component: ProcedimentosFormComponent
}, { path: 'procedimentos/list', component: ProcedimentosListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcedimentosRoutingModule { }
