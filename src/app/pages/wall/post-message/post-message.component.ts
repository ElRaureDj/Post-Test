import { Component, OnInit, Input } from '@angular/core';
import { PostMessage } from '../../../classes/post';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../../classes/user'

@Component({
  selector: 'app-post-message',
  templateUrl: './post-message.component.html',
  styleUrls: ['./post-message.component.scss']
})
export class PostMessageComponent implements OnInit {

  @Input() post: PostMessage;
  userEmail: string; 
  isOwnMessage: boolean;
  ownEmail: string;

  constructor(private authService: AuthService) {
    authService.isAuth().subscribe(user => {
      this.ownEmail = user.email;
      this.isOwnMessage = this.ownEmail === this.userEmail;
    });}
  ngOnInit(){

  }
  

}
