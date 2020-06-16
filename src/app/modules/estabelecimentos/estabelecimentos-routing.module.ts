import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstabelecimentosFormComponent } from './estabelecimentos-form/estabelecimentos-form.component';
import { EstabelecimentosListComponent } from './estabelecimentos-list/estabelecimentos-list.component';


const routes: Routes = [{
  path: 'estabelecimentos/form', component: EstabelecimentosFormComponent
}, { path: 'estabelecimentos/list', component: EstabelecimentosListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstabelecimentosRoutingModule { }
