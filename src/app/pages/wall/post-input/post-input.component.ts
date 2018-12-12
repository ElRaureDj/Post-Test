import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MessagesService } from '../../../services/messages.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-post-input',
  templateUrl: './post-input.component.html',
  styleUrls: ['./post-input.component.scss']
})
export class PostInputComponent implements OnInit {

  public postForm: FormGroup;
  uploadPercent: Observable<number>;
  urlImage: string;
  
  loading: boolean;
 
   constructor(private fb: FormBuilder, private messagesService: MessagesService, private authService: AuthService, private storage: AngularFireStorage) { 
    this.createForm(); 
    
    this.loading = false;
    this.urlImage = '';
  }


  ngOnInit() {
  }

  onUpload(e) {
    if(e.target.files.length){
          this.loading =true;
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => ref.getDownloadURL().subscribe(val =>{ 
      
      this.loading = false;    
      this.urlImage = val;
    }))).subscribe();
    }
  }

  public submit(): void {
    const {text} = this.postForm.value;    
  
   
    this.messagesService.createMessage(text, this.urlImage);
    // reset input
    this.postForm.reset();
   
  }

  private createForm(): void{
    this.postForm = this.fb.group({
      text: ['', [Validators.required]]
    });
  }
}