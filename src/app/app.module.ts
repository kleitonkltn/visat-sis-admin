import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateModule } from './template/template.module';
import { HomeComponent } from './components/home/home.component';
import { EstabelecimentosModule } from './modules/estabelecimentos/estabelecimentos.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule} from 'ngx-mask';
import { EstabelecimentosService } from './services/Estabelecimentos.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData, DatePipe } from '@angular/common';
import { ProcedimentosService } from './services/Procedimentos.service';
import { ComponentsModule } from './components/components.module';
import { ErrorResponseDirective } from 'src/app/core/errorResponse.directive';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { LoginService } from './services/Login.service';
import { StorageService } from './services/storage.service';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';

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
    AuthenticationModule,
    FormsModule,
    ReactiveFormsModule,
    TemplateModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ComponentsModule,
    HttpClientJsonpModule,
    JwtModule,
    NgxMaskModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [ErrorResponseDirective],
  providers: [EstabelecimentosService, ProcedimentosService, JwtHelperService, LoginService, StorageService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    DatePipe, ErrorResponseDirective, { provide: LOCALE_ID, useValue: 'pt-BR' }, {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
