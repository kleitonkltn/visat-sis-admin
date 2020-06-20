import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCNPJService {
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })
  };
  url = 'https://www.receitaws.com.br/v1/cnpj';
  constructor(private httpClient: HttpClient) { }

  getInfoCNPJ(cnpj) {
    return this.httpClient.jsonp(this.url + '/' + cnpj, 'callback');
  }

}
