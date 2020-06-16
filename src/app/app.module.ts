import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTablesModule } from 'angular-datatables';
import { TemplateModule } from './template/template.module';
import { HomeComponent } from './components/home/home.component';
import { EstabelecimentosModule } from './modules/Estabelecimentos/Estabelecimentos.module';
import { ProcedimentosModule } from './modules/procedimentos/procedimentos.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EstabelecimentosModule,
    FormsModule,
    DataTablesModule,
    ProcedimentosModule,
    ReactiveFormsModule,
    TemplateModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
