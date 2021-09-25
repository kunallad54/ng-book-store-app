import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseURL : string = "http://localhost:8080/book-store-app/user/";
  constructor(private httpClient : HttpClient) { }

  addUser(data : any):Observable<any>{
    return this.httpClient.post(this.baseURL + "register",data);
  }

  verifyUser(data : any):Observable<any>{
    return this.httpClient.post(this.baseURL + "verify-user",data);
  }
}
