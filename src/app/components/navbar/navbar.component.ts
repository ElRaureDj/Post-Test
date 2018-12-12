import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService, private afsAuth: AngularFireAuth) { }

  public app_name: string = 'Post-Test';
  public isLogged: boolean = false;
  userEmail: string;
  ngOnInit() {  
  
    this.authService.isAuth().subscribe(user =>
      {
        if (user) {
          this.userEmail = user.email;
          this.isLogged = true;
          return;
        } else{
          return false;
        }
        //this.isLogged = user ? true : false;
      });
  
  }

  onLogout() {
    this.authService.logoutUser();
  }

}
