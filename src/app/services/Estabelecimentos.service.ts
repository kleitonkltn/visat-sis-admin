import { Injectable } from '@angular/core';
import { Estabelecimentos } from 'src/models/Estabelecimentos';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorResponseDirective } from '../core/errorResponse.directive';
@Injectable({
  providedIn: 'root'
})
export class EstabelecimentosService {

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


  getPDFReportAllEstabelecimentos(): Observable<HttpResponse<Blob>> {
    let headers = new HttpHeaders();
    headers = new HttpHeaders({ Accept: 'application/pdf' });
    return this.httpClient.post(environment.urlReportEstabelecimentos + '/all', '', {
      headers, responseType: 'blob', observe: 'response'
    });
  }
  getReportEstabelecimentosByDate(startDate, endDate): Observable<HttpResponse<Blob>> {
    let headers = new HttpHeaders();
    headers = new HttpHeaders({ Accept: 'application/pdf' });
    return this.httpClient.post(environment.urlReportEstabelecimentos + '/date',
      {
        startDate,
        endDate
      }, {
      headers, responseType: 'blob', observe: 'response'
    });
  }
  getReportEstabelecimentosByIDs(ids: number[]): Observable<HttpResponse<Blob>> {
    let headers = new HttpHeaders();
    headers = new HttpHeaders({ Accept: 'application/pdf' });
    return this.httpClient.post(environment.urlReportEstabelecimentos + '/multipleids',
      {
        ids
      }, {
      headers, responseType: 'blob', observe: 'response'
    });
  }
}
