import { Component, OnInit } from '@angular/core';
import { MessagesService} from '../../services/messages.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {

  constructor(private dataApi: MessagesService) { }
    public posts = [];

    ngOnInit() {
      this.dataApi.getAllPost().subscribe(post => {
        console.log('Message', post);
        this.posts = post;
      })
    }

}
