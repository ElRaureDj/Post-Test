import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { AuthService } from './auth.service';
import { PostMessage } from '../classes/post';
import { map } from 'rxjs/operators';
import { User } from '../classes/user';

@Injectable()
export class MessagesService {

  //public chatrooms: Observable<any>;
  //public postMessages: Observable<any>;

  constructor(
    private db: AngularFirestore,
    private authService: AuthService
  ) {
    this.postCollection = db.collection<PostMessage>(`post`, ref => {
      return ref.orderBy('createdAt', 'desc').limit(20);
    });
    this.post = this.postCollection.valueChanges();
  }

  user: User = {
    displayName: '',
    email: '',
    photoUrl: ''
  };

  private postCollection: AngularFirestoreCollection<PostMessage>;
  private post: Observable<PostMessage[]>;

  getAllPost() {
    return this.post = this.postCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as PostMessage;
          return data;
        });
      }));
  }

  public createMessage(text: string, addpicture: string): void {    
    this.authService.isAuth().subscribe(user => {
      
      if (user) {        
        this.user.displayName = user.displayName;
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
      }

      const message = {
        message: text,
        createdAt: Date.now(),
        picture: addpicture,
        sender: {displayName: this.user.displayName, email: this.user.email, photoUrl: this.user.photoUrl}
      };
     
      this.db.collection(`post`).add(message);
    }    
    )
    
  }
}
