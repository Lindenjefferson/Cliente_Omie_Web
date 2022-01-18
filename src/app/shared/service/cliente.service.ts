import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente.model';
import { ClienteDetail } from '../model/clienteDetail.model';
import { ResponsePageable } from '../model/responsePageable.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  apiUrl = 'http://localhost:8080/cliente';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  public getClientesWithPage(page: number): Observable<ResponsePageable> {
    return this.httpClient.get<ResponsePageable>(this.apiUrl + '/list/page=' + page);
  }

  public saveCliente(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(this.apiUrl, cliente, this.httpOptions);
  }

  public deleteCliente(id: number): Observable<any> {
    return this.httpClient.delete(this.apiUrl + "/" + id);
  }

  public updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.httpClient.put<Cliente>(this.apiUrl + "/" + id, cliente, this.httpOptions);
  }

  public getClienteDetail(id: number): Observable<ClienteDetail> {
    return this.httpClient.get<ClienteDetail>(this.apiUrl + "/detail/" + id);
  }

}
