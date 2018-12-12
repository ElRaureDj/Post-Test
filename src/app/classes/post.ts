import {User} from './user';
export class PostMessage {
        message: string;
        createdAt: Date;
        picture: string;
        sender: User;
    
        constructor({message, createdAt, picture, sender}) {
            this.message = message;
            this.createdAt = createdAt;
            this.picture = picture;
            this.sender = sender;
        }
    }
    
