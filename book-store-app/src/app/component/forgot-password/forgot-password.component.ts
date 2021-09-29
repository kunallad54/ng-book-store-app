import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }

  emailID!: string;

  /**
   * Purpose : Ability to make call http Service method forgotPassword that 
   *           makes an api call with emailId as argument
   * 
   * @returns response
   */
  onSubmit() {
    console.log(this.emailID);
    return this.httpService.forgotPassword(this.emailID).subscribe(res => {
      console.log(res);
    })
  }
}
