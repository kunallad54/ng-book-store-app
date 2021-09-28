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

  public user = new User();
  public userLoginGroup: FormGroup;

  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    private router : Router
    ) {
    this.userLoginGroup = this.fb.group({
      emailID: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required,
        Validators.pattern("^(?=.*[0-9])(?=[^@#$%^&+=]*[@#$%^&+=][^@#$%^&+=]*$)(?=.*[a-z])(?=.*[A-Z]).{8,}$")])
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.user = this.userLoginGroup.value;
    console.log(this.user);
    return this.httpService.userLogin(this.userLoginGroup.value).subscribe(res =>{
      console.log(res.data);
      localStorage.setItem("TokenID",res.data);
      this.router.navigateByUrl("/home");
    })
  }

  public checkError = (controlName : string,errorName : string) => {
    return this.userLoginGroup.controls[controlName].hasError(errorName);
  }


}
