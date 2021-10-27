import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pro13';
  routes=[
    {
      url:'/dashboard',name:'fa-user',img:'icon-1.png'
    },
    {
      url:'/start',name:'fa-tag',img:'icon-2.png'
    },
    {
      url:'/csv',name:'fa-file',img:'icon-1.png'
    },
    {
      url:'/plot',name:'fa-file',img:'icon-2.png'
    }
  ]
}
