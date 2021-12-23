import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private ApiService: ApiService,private fb: FormBuilder, private router: Router) { }

  userDetails: any;
  loginForm = this.fb.group({
    userName: ['', Validators.required],
    passCode: ['', Validators.required]
  })
  ngOnInit(): void {
  }


  loginFn() {
    // console.log(this.loginForm)

    if (this.loginForm.valid) {
      console.log(this.loginForm)
      this.userDetails = {
        username: this.loginForm.get('userName').value,
        password: this.loginForm.get('passCode').value
      }

      const newLocal = "/dashboard";
      // this.ApiService.userLogin(this.userDetails).subscribe(response=>{
      //   console.log(response)
      //   localStorage.setItem('mySession', JSON.stringify(this.userDetails));
        
      //   this.router.navigate([newLocal])
      // })
      localStorage.setItem('mySession', JSON.stringify(this.userDetails));
      this.router.navigate([newLocal])
    }
  }
}
