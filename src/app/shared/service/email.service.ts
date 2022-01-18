import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from '../model/email.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  apiUrl = 'http://localhost:8080/email';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  public saveEmail(email: Email): Observable<Email> {
    return this.httpClient.post<Email>(this.apiUrl, email, this.httpOptions);
  }

  public deleteEmail(id: number): Observable<any> {
    return this.httpClient.delete(this.apiUrl + "/" + id);
  }

}
