import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpBookService {
  baseURL : string = "http://localhost:8080/book-store-app/book/";
  constructor(private httpClient : HttpClient) { }

  getAllBooks(tokenID : String):Observable<any>{
    return this.httpClient.get(this.baseURL);
  }
}
