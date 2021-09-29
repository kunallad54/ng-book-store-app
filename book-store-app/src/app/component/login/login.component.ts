import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   * User Class Object and FormGroup to get details from form
   */
  public user = new User();
  public userLoginGroup: FormGroup;

  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    private router: Router
  ) {
    /**
     * Validators Added
     */
    this.userLoginGroup = this.fb.group({
      emailID: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required,
      Validators.pattern("^(?=.*[0-9])(?=[^@#$%^&+=]*[@#$%^&+=][^@#$%^&+=]*$)(?=.*[a-z])(?=.*[A-Z]).{8,}$")])
    })
  }

  ngOnInit(): void {
  }

  /**
   * Purpose : To get call Login api by using http service method userLogin
   *           which makes and api call and returns response
   * 
   * @returns response
   */
  onSubmit() {
    this.user = this.userLoginGroup.value;
    console.log(this.user);
    return this.httpService.userLogin(this.userLoginGroup.value).subscribe(res => {
      console.log(res.data);
      localStorage.setItem("TokenID", res.data);
      this.router.navigateByUrl("/home");
    })
  }

  /**
   * Purpose : This method is used for validating user email and password are filled 
   * 
   * @param controlName value add in the input tag 
   * @param errorName error value got from the mat-error tag
   * @returns the error value 
   */
  public checkError = (controlName: string, errorName: string) => {
    return this.userLoginGroup.controls[controlName].hasError(errorName);
  }


}
