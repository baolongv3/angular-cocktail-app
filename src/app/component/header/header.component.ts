import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user : User | any;
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((user : User) => {console.log(user);this.user = <User> user;})
  }

  login() {
    this.authService.login();
  }

  logout(){
    this.authService.logout();
  }

}
