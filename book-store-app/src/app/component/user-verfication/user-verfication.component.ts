import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-user-verfication',
  templateUrl: './user-verfication.component.html',
  styleUrls: ['./user-verfication.component.scss']
})
export class UserVerficationComponent implements OnInit {

  /**
   * object of user and formgroup to fetch details from form
   */
  public user = new User();
  public userFormGroup: FormGroup;


  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
  ) {
    /** 
     * Added validators
     */
    this.userFormGroup = this.fb.group({
      emailId: new FormControl('', Validators.required),
      otp: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
  }

  /**
   * Purpose : To call an httpService method verifyUser that
   *           makes an api call to verify user
   */
  onSubmit() {
    this.user = this.userFormGroup.value;
    console.log(this.user);
    this.httpService.verifyUser(this.user).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl("/login");
    })
  }
}
