import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/model/book';
import { CartModel } from 'src/app/model/cart';
import { HttpService } from 'src/app/service/http.service';

interface SortBooks{
  value : string,
  viewValue : string,
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sort: SortBooks[] = [
    {value:"1",viewValue:"Price : Low to High"},
    {value:"2",viewValue:"Price : High to Low"},
    {value:"3",viewValue:"Newest Arrivals"},
  ]

  public bookDetails:Book[]=[];
  // private cart = new Cart();
  public cartFormGroup : FormGroup;
  constructor(
    private httpService : HttpService,
    private fb : FormBuilder
    ) 
    {
    this.cartFormGroup = this.fb.group({
      bookId : new FormControl("",Validators.required),
      quantity : new FormControl("",Validators.required)
    })
   }

  ngOnInit(): void {
    console.log("Token is : ",localStorage.getItem("TokenID"));
    this.httpService.getAllBooks(localStorage.getItem("TokenID")).subscribe(response =>{
      this.bookDetails = response.data;
      console.log(this.bookDetails);
      
    })
  }
  // getItems(){
  //   for(let i=0; i < 4;i++){
  //     console.log(this.bookDetails[i]);
  //   }
  // }
  // buttonClicked : Boolean = false;

  addToBag( book : Book){
    this.cartFormGroup.patchValue({
      bookId : book.id,
      quantity : 1,
    })
    console.log(book.isBookAdded)
    console.log(this.cartFormGroup.value);
    this.httpService.addToCart(localStorage.getItem("TokenID"),this.cartFormGroup.value).subscribe(res =>{
      console.log(res);
    })
    location.reload();
  }


}
