import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartModel } from 'src/app/model/cart';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public cartDetails: CartModel[] = [];

  public cartCount: number = 0;
  constructor(
    public router: Router,
    private httpService: HttpService,
  ) { }

  /**
   * Purpose : To get Cart Count By getting Cart Details by using http service getCartOrders 
   *           method that makes an api call to get all cart details
   */
  ngOnInit(): void {
    this.httpService.getCartOrders(localStorage.getItem("TokenID")).subscribe(res => {
      console.log(res);
      this.cartDetails = res.data;
      this.cartCount = this.cartDetails.length;
      console.log(this.cartDetails);
    })
  }

}
