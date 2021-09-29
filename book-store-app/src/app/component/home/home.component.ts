import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/model/book';
import { CartModel } from 'src/app/model/cart';
import { HttpService } from 'src/app/service/http.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /**
   * BookDetails Array and FormGroup
   */
  public bookDetails: Book[] = [];
  public cartFormGroup: FormGroup;

  constructor(
    private httpService: HttpService,
    private fb: FormBuilder
  ) {
    this.cartFormGroup = this.fb.group({
      bookId: new FormControl("", Validators.required),
      quantity: new FormControl("", Validators.required)
    })
  }

  /**
   * Purpose : To get All Books by using HTTP service method getAllBooks 
   *           which makes an api call that gets all the books from database
   * 
   * @param TokenID token of user 
   */
  ngOnInit(): void {
    console.log("Token is : ", localStorage.getItem("TokenID"));
    this.httpService.getAllBooks(localStorage.getItem("TokenID")).subscribe(response => {
      this.bookDetails = response.data;
      console.log(this.bookDetails);

    })
  }

  /**
   * Purpose : To add a book to cart by using http service addToCart method
   *           that makes an api call to add to cart and return response
   * 
   * @param book which reference of Book Object which needs to be added 
   */
  addToBag(book: Book) {
    this.cartFormGroup.patchValue({
      bookId: book.id,
      quantity: 1,
    })
    console.log(book.isBookAdded)
    console.log(this.cartFormGroup.value);
    this.httpService.addToCart(localStorage.getItem("TokenID"), this.cartFormGroup.value).subscribe(res => {
      console.log(res);
    })
    location.reload();
  }


}
