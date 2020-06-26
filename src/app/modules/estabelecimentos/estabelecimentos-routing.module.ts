import { AuthGuard } from './../../core/guards/auth-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstabelecimentosFormComponent } from './estabelecimentos-form/estabelecimentos-form.component';
import { EstabelecimentosListComponent } from './estabelecimentos-list/estabelecimentos-list.component';


const routes: Routes = [{
  path: 'estabelecimentos/form', component: EstabelecimentosFormComponent, canActivate: [AuthGuard]
}, { path: 'estabelecimentos/list', component: EstabelecimentosListComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class EstabelecimentosRoutingModule { }
