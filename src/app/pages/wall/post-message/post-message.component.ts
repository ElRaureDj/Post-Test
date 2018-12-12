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
  userEmail: string = ''; 
  isOwnMessage: boolean = false;
  ownEmail: string = '';

  constructor(private authService: AuthService) {
    this.authService.isAuth().subscribe(user =>
      {
        if (user) {
          this.ownEmail = user.email;
          this.isOwnMessage = this.ownEmail === this.userEmail;
          return;
        } else{
          return false;
        }
    });
    }
  ngOnInit(post = this.post){
    this.userEmail = post.sender.email;
  }
  

}
