import { Injectable } from '@angular/core';
import { Estabelecimentos } from 'src/models/Estabelecimentos';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorResponseDirective } from 'src/core/errorResponse.directive';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EstabelecimentosService {

  url = 'http://localhost:3000/api/estabelecimentos';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient, private errorRespnse: ErrorResponseDirective) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAll(): Observable<Estabelecimentos[]> {
    return this.httpClient.get<Estabelecimentos[]>(environment.urlEstabelecimento)
      .pipe(retry(2), catchError(this.errorRespnse.handleError));
  }
  getByID(id): Observable<Estabelecimentos> {
    return this.httpClient.get<Estabelecimentos>(environment.urlEstabelecimento + '/' + id)
    .pipe(retry(2), catchError((err) => this.errorRespnse.handleError(err)));
  }
  create(estabelecimento: Estabelecimentos) {
    return this.httpClient.post(environment.urlEstabelecimento, estabelecimento)
      .pipe(retry(2), catchError((err) => this.errorRespnse.handleError(err)));
  }
  update(estabelecimento: Estabelecimentos) {
    estabelecimento.createdAt = null;
    estabelecimento.updatedAt = null;
    return this.httpClient.put(environment.urlEstabelecimento + '/' + estabelecimento.id, estabelecimento)
  }


}
