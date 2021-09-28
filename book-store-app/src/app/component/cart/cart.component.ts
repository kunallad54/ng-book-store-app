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

  public cartDetails: CartModel[] = [];
  public cartCount : number = 0;

  private order = new Order();
  public orderFormGroup : FormGroup;
  constructor(
    private httpService: HttpService,
    private fb : FormBuilder,
  ) {
    this.orderFormGroup = this.fb.group({
      receiverName : new FormControl('',Validators.required),
      receiverNumber : new FormControl('',Validators.required),
      quantity : new FormControl('',Validators.required),
      city : new FormControl('',Validators.required),
      state : new FormControl('',Validators.required),
      address : new FormControl('',Validators.required),
      zipCode : new FormControl('',Validators.required),
      landMark : new FormControl('',Validators.required),
      bookId : new FormControl('',Validators.required)
    })
  }
  inputNumber: number = 1;
  ngOnInit(): void {
    this.httpService.getCartOrders(localStorage.getItem("TokenID")).subscribe(res=>{
      console.log(res);
      this.cartDetails = res.data;
      console.log(this.cartDetails);
      this.cartCount = this.cartDetails.length;
    })
  }

  remove(id : number){
    this.httpService.removeFromCart(localStorage.getItem("TokenID"),id).subscribe(res =>{
      console.log(res);
    })
    location.reload();
  }

  plus() {
    this.inputNumber = this.inputNumber + 1;
  }
  minus() {
    if (this.inputNumber != 0) {

    }
    this.inputNumber = this.inputNumber - 1;
  }
  onSubmit(){
    console.log(this.orderFormGroup.value);
  }
}
