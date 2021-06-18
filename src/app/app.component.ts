import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cocktail-app';
  constructor(private authService : AuthService, private router : Router){}

  ngOnInit(){
    this.authService.user$.subscribe((user : User)=> {
      if(!user) {
         return;
      } else{
        const returnUrl = localStorage.getItem('returnUrl');
        if(!returnUrl){
          return;
        }
        localStorage.removeItem('returnUrl');
        this.router.navigateByUrl(returnUrl);
      }
    })
  }
}
