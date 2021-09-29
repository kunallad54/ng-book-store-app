import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  /**
   * Objecr of user and formgroup to fetch details from form
   */
  public user = new User();
  public userFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    public router: Router,
  ) {
    /**
     * Validators Added
     */
    this.userFormGroup = this.fb.group({
      firstName: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-Z\s]+$")]),
      lastName: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-Z\s]+$")]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^(6|7|8|9)?[0-9]{9}$")]),
      kyc: new FormControl('', [Validators.required, Validators.pattern("^[2-9]{1}[0-9]{11}$")]),
      dateOfBirth: new FormControl('', Validators.required),
      emailId: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.
        pattern("^(?=.*[0-9])(?=[^@#$%^&+=]*[@#$%^&+=][^@#$%^&+=]*$)(?=.*[a-z])(?=.*[A-Z]).{8,}$")])
    })
  }

  ngOnInit(): void {
  }

  /**
   * Purpose : To add user by using http Service method addUser that 
   *           makes an api call to add user and return response
   */
  onSubmit() {
    this.user = this.userFormGroup.value;
    console.log(this.user);
    this.httpService.addUser(this.user).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl("/verify-user");
    })

  }

  /**
  * Purpose : This method is used for validating user inputs are filled 
  * 
  * @param controlName value add in the input tag 
  * @param errorName error value got from the mat-error tag
  * @returns the error value 
  */
  public checkError = (controlName: string, errorName: string) => {
    return this.userFormGroup.controls[controlName].hasError(errorName);
  }
}
