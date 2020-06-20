import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateModule } from './template/template.module';
import { HomeComponent } from './components/home/home.component';
import { EstabelecimentosModule } from './modules/estabelecimentos/estabelecimentos.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { EstabelecimentosService } from './services/Estabelecimentos.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData, DatePipe } from '@angular/common';
import { ProcedimentosService } from './services/Procedimentos.service';
import { ComponentsModule } from './components/components.module';
import { ErrorResponseDirective } from 'src/core/errorResponse.directive';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoginComponent } from './modules/authentication/login/login.component';

registerLocaleData(localePt, 'pt-BR');


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorResponseDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EstabelecimentosModule,
    FormsModule,
    ReactiveFormsModule,
    TemplateModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ComponentsModule,
    HttpClientJsonpModule,
    NgxMaskModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [ErrorResponseDirective],
  providers: [EstabelecimentosService, ProcedimentosService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    DatePipe, ErrorResponseDirective, { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
