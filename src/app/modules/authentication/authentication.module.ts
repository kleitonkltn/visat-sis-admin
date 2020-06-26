import { LevelAccessPipe } from './../../core/pipe/levelAccess.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { StorageService } from 'src/app/services/storage.service';
import { UserInfoComponent } from './user-info/user-info.component';
import { MatDialogModule } from '@angular/material/dialog';

export function jwtOptionsFactory(tokenService) {
  return {
    tokenGetter: () => {
      return tokenService.getStorageToken();
    }
  };
}
@NgModule({
  declarations: [LoginComponent, UserInfoComponent, LevelAccessPipe],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [StorageService]
      }
    })
  ],
  entryComponents: [UserInfoComponent],
  exports: [LoginComponent, UserInfoComponent, LevelAccessPipe]
})
export class AuthenticationModule { }
