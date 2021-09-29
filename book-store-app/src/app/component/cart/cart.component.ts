import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartModel } from 'src/app/model/cart';
import { Order } from 'src/app/model/order';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  // cart array
  public cartDetails: CartModel[] = [];
  public cartCount: number = 0;

  // Boolean Values to use toggle logic to show and hide div on page
  public showDiv = false;
  public showOrderDiv = false;

  public order = new Order();
  public orderFormGroup: FormGroup;


  /**
   * Purpose : To create a constructor and to define all properties need in OrderDTO and 
   *           create FormControl and FormBuilder respectively for each and every property 
   *           and add validations
   * 
   * @param httpService is a reference for HttpService 
   * @param fb is a reference for FormBuilder
   */
  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
  ) {
    /**
     *  Added Validators
     */
    this.orderFormGroup = this.fb.group({
      receiverName: new FormControl('', Validators.required),
      receiverNumber: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required),
      landMark: new FormControl('', Validators.required),
      addressType: new FormControl('', Validators.required),
      bookId: new FormControl('', Validators.required)
    })
  }

  /**
   * Purpose : To get all carts details with the help of HttpService that calls getCartOrders api
   *           which returns list of cart
   */
  ngOnInit(): void {
    this.httpService.getCartOrders(localStorage.getItem("TokenID")).subscribe(res => {
      console.log(res);
      this.cartDetails = res.data;
      console.log(this.cartDetails);
      this.cartCount = this.cartDetails.length;
    })
  }

  /**
   * Purpose : To remove Book From Cart by calling HttpService Method removeFromCart
   *           that makes an api call deleteFromCart which deletes that particular book
   *           and returns the response
   * 
   * @param id book id of that book 
   */
  remove(id: number) {
    this.httpService.removeFromCart(localStorage.getItem("TokenID"), id).subscribe(res => {
      console.log(res);
    })
    location.reload();
  }

  /**
   * Purpose : To increase the quantity of book 
   * 
   * @param i index number from cart array
   */
  plus(i: number) {
    this.cartDetails[i].quantity = this.cartDetails[i].quantity + 1;
  }

  /**
   * Purpose : To decrease the quantity of book
   * 
   * @param i index number form cart array
   */
  minus(i: number) {
    if (this.cartDetails[i].quantity > 1) {
      this.cartDetails[i].quantity = this.cartDetails[i].quantity - 1;
    }
  }

  /**
   * Purpose : Toggle logic to display and hide the div customer div
   */
  displayCustomerDetails() {
    this.showDiv = !this.showDiv;
  }
  /**
   * Purpose : Toggle Logic to display and hide the div of order summary
   */
  displayOrderDetails() {
    this.showOrderDiv = !this.showOrderDiv;
  }

  /**
   * Purpose : To fetch details from form with orderFormGroup and then open next the div of order summary
   *          If details are not filled it will not open next div of order summary
   */
  onSubmit() {
    this.cartDetails.forEach(res => {

      this.orderFormGroup.patchValue({
        bookId: res.book.id,
        quantity: res.quantity
      })

    })
    if (this.orderFormGroup.valid) {
      this.showOrderDiv = !this.showOrderDiv;
    }
  }

  /**
   * Purpose : To place order by using HTTP service method placeOrder() which makes an api
   *           call to placeOrder() with token and (OrderDTO here OrderFormGroup) as arguments
   *           and return response 
   */
  placeOrder() {
    console.log("Order is : ", this.orderFormGroup.value)
    this.cartDetails.forEach(res => {
      this.orderFormGroup.patchValue({
        bookId: res.book.id,
        quantity: res.quantity
      })
      this.httpService.placeOrder(localStorage.getItem("TokenID"), this.orderFormGroup.value).subscribe(respond => {
        console.log(respond);
      })
    })
  }
}
