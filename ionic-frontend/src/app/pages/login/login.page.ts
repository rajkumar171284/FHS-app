import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userDetails: any;
  loginForm = this.fb.group({
    userName: ['', Validators.required],
    passCode: ['', Validators.required]
  })
  constructor(public loadingController: LoadingController,private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    // this.presentLoading()
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  loginFn() {
    // console.log(this.loginForm)

    if (this.loginForm.valid) {
      this.presentLoading();
      console.log(this.loginForm)
      this.userDetails = {
        userName: this.loginForm.get('userName').value,
        passCode: this.loginForm.get('passCode').value
      }
      localStorage.setItem('mySession', JSON.stringify(this.userDetails));
      const newLocal = "home/tabs/mimic";
      this.router.navigate([newLocal])
    }
  }

}
