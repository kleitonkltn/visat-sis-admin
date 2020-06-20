import { Directive } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Directive({
  selector: '[appErrorResponse]'
})
export class ErrorResponseDirective {

  constructor() { }
  handleError(error: HttpErrorResponse) {
    console.log(error);

    let errorMessage = '';
    if (error.error.errors) {
      error.error.errors.forEach((element: string) => {
        errorMessage = ` ${errorMessage} ` + ` ${element} \n`;
      });
      return throwError(errorMessage);
    }
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `${error.error.message} `;
    }
    return throwError(errorMessage);
  }
}
