import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseURL: string = "http://localhost:8080/book-store-app/";

  constructor(private httpClient: HttpClient) { }

  /**
   * Purpose : To make an api call add user that adds user in the database
   *            if details are valid and returns response
   * 
   * @param data user object 
   * @returns response
   */
  addUser(data: any): Observable<any> {
    return this.httpClient.post(this.baseURL + "user/register", data);
  }

  /**
   * Purpose : Ability to make an api call  verifyUser that verfies user
   *           if OTP entered is correct and returns response
   * 
   * @param data user details of object with email and OTP 
   * @returns response
   */
  verifyUser(data: any): Observable<any> {
    return this.httpClient.post(this.baseURL + "user/verify-user", data);
  }

  /**
   * Purpose : To make an api call forgotPassword which sends email to reset 
   *           password link if user entered email id verified and valid
   * 
   * @param emailID of user
   * @returns response
   */
  forgotPassword(emailID: any): Observable<any> {
    return this.httpClient.post(this.baseURL + "user/forgot-password?emailID=" + emailID, null);
  }

  /**
   * Purpose : Ability to make an api call loginUser that takes email Id and password
   *           and if correct and verified that returns token to keep user logged in
   * 
   * @param data user emailid and password as object 
   * @returns token ID as response
   */
  userLogin(data: any): Observable<any> {
    console.log("Data in HTTPSERVICE :", data);
    return this.httpClient.post(this.baseURL + "user/login", data);
  }

  /**
   * Purpose : To get all books from the database by making an api call
   *           to getBooks 
   * 
   * @param tokenID token of user who has logged in 
   * @returns list of books from database with response
   */
  getAllBooks(tokenID: string | null): Observable<any> {
    return this.httpClient.get(this.baseURL + "book?token=" + tokenID);
  }

  /**
   * Purpose : To add book to cart by making an api call to addToCart
   *           that adds book in cart
   * 
   * @param tokenID token of user who has logged in 
   * @param data book id and quantity of book as object
   * @returns response
   */
  addToCart(tokenID: string | null, data: any): Observable<any> {
    return this.httpClient.post(this.baseURL + "cart/add-to-cart?token=" + tokenID, data);
  }

  /**
   * Purpose : TO get all cart orders from database by making an api call
   *           that fetches list of cart
   * 
   * @param tokenID tokenID token of user who has logged in 
   * @returns list of cart
   */
  getCartOrders(tokenID: string | null): Observable<any> {
    return this.httpClient.get(this.baseURL + "cart/get-user-cart-orders?token=" + tokenID);
  }

  /**
   * Purpose : To delete or remove book from cart database by making an api call
   *           deleteFromCart 
   * 
   * @param tokenID tokenID token of user who has logged in 
   * @param id cart id 
   * @returns reponse
   */
  removeFromCart(tokenID: string | null, id: number): Observable<any> {
    return this.httpClient.delete(this.baseURL + "cart/delete-from-cart?cart%20id=" + id + "&token=" + tokenID);
  }

  /**
   * Purpose : To place order by making an api call placeOrder that saves order
   *           details in the database
   * 
   * @param tokenID tokenID token of user who has logged in 
   * @param data order details as object
   * @returns response
   */
  placeOrder(tokenID: string | null, data: any): Observable<any> {
    return this.httpClient.post(this.baseURL + "order/place-order?token=" + tokenID, data);
  }
}
