import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../../api.service';

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
  constructor(public toastController: ToastController, private ApiService: ApiService, public loadingController: LoadingController, private fb: FormBuilder, private router: Router) { }

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
      this.simpleLoader()
      console.log(this.loginForm)
      this.userDetails = {
        username: this.loginForm.get('userName').value,
        password: this.loginForm.get('passCode').value
      }
      this.ApiService.userLogin(this.userDetails).subscribe(response => {

        // console.log(response)
        if (response) {
          let val = response.toLowerCase()
          if (val.includes('invalid')) {
            // false
            this.dismissLoader()
            this.presentToast(response)
          }else{
            localStorage.setItem('mySession', JSON.stringify(this.userDetails));
            const newLocal = "home/tabs/mimic";
            this.router.navigate([newLocal])
          }

        }

      }, (error) => {
        console.log(error)
        this.presentToast(error)
      })

    }
  }
  // Simple loader
  simpleLoader() {
    this.loadingController.create({
      message: 'Loading...'
    }).then((response) => {
      response.present();
    });
  }
  // Dismiss loader
  dismissLoader() {
    this.loadingController.dismiss().then((response) => {
      console.log('Loader closed!', response);
    }).catch((err) => {
      console.log('Error occured : ', err);
    });
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
