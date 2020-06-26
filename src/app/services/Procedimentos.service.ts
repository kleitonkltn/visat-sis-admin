import { Injectable } from '@angular/core';
import { Procedimentos } from 'src/models/Procedimentos';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorResponseDirective } from 'src/app/core/errorResponse.directive';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProcedimentosService {

  constructor(private httpClient: HttpClient, private errorResponse: ErrorResponseDirective) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAll(): Observable<Procedimentos[]> {
    return this.httpClient.get<Procedimentos[]>(environment.urlProcecimentos)
      .pipe(retry(2), catchError((err) => this.errorResponse.handleError(err)));
  }
  getByEstabelecimentoId(id: number): Observable<Procedimentos[]> {
    return this.httpClient.get<Procedimentos[]>(environment.urlProcecimentos + '/filter/estabelecimento?id=' + id)
      .pipe(retry(2), catchError((err) => this.errorResponse.handleError(err)));
  }
  getByID(id: number): Observable<Procedimentos> {
    return this.httpClient.get<Procedimentos>(environment.urlProcecimentos + '/' + id)
      .pipe(retry(2), catchError((err) => this.errorResponse.handleError(err)));
  }
  create(procedimento: Procedimentos) {
    return this.httpClient.post(environment.urlProcecimentos, procedimento)
      .pipe(retry(2), catchError((err) => this.errorResponse.handleError(err)));
  }
  update(procedimento: Procedimentos) {
    procedimento.createdAt = null;
    procedimento.updatedAt = null;
    return this.httpClient.put(environment.urlProcecimentos + '/' + procedimento.id, procedimento)
      .pipe(retry(2), catchError((err) => this.errorResponse.handleError(err)));
  }


}
