export class User {
  id?: string;
  displayName?: string;
  email?: string;
  password?: string;
  photoUrl?: string;

    constructor({id,displayName,email,password,photoUrl}){
        this.id = id;
        this.displayName = displayName;
        this.email = email;
        this.password = password;
        this.photoUrl = photoUrl;
    }
}
