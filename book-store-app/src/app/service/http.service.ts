import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseURL : string = "http://localhost:8080/book-store-app/";
  constructor(private httpClient : HttpClient) { }

  addUser(data : any):Observable<any>{
    return this.httpClient.post(this.baseURL + "user/register",data);
  }

  verifyUser(data : any):Observable<any>{
    return this.httpClient.post(this.baseURL + "user/verify-user",data);
  }

  forgotPassword(emailID : any):Observable<any>{
    return this.httpClient.post(this.baseURL + "user/forgot-password?emailID="+emailID,null);
  }

  userLogin(data: any):Observable<any>{
    console.log("Data in HTTPSERVICE :",data);
    return this.httpClient.post(this.baseURL + "user/login",data);
  }

  getAllBooks(tokenID : string | null):Observable<any>{
    return this.httpClient.get(this.baseURL + "book?token="+tokenID);
  }

  addToCart(tokenID : string | null , data:any):Observable<any>{
    return this.httpClient.post(this.baseURL + "cart/add-to-cart?token="+tokenID,data);
  }

  getCartOrders(tokenID : string | null):Observable<any>{
    return this.httpClient.get(this.baseURL + "cart/get-user-cart-orders?token="+tokenID);
  }

  removeFromCart(tokenID : string | null,id : number):Observable<any>{
    return this.httpClient.delete(this.baseURL + "cart/delete-from-cart?cart%20id="+id+"&token="+tokenID);
  }
}
