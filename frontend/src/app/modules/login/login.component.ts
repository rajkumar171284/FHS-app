import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router) { }


  userDetails: any;
  loginForm = this.fb.group({
    userName: ['', Validators.required],
    passCode: ['', Validators.required]
  })
  ngOnInit(): void {
  }


  loginFn() {
    console.log(this.loginForm)

    if (this.loginForm.valid) {
      console.log(this.loginForm)
      this.userDetails = {
        userName: this.loginForm.get('userName').value,
        passCode: this.loginForm.get('passCode').value
      }
      localStorage.setItem('mySession', JSON.stringify(this.userDetails));
      this.router.navigate(["/dashboard"])
    }
  }
}
