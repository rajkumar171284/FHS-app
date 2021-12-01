import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {

  constructor(private loadingController: LoadingController,private router: Router) { }

  ngOnInit() {}
  logOut(){
    this.loadingController.create({
      message: '',
      duration:2000
    }).then((response) => {
      response.dismiss()
localStorage.clear();
    this.router.navigate(['login'])
    })
    // localStorage.clear();
    // this.router.navigate(['login'])
  }
}
