import { Router } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  public registerForm: FormGroup;

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private storage: AngularFireStorage) { 
    this.createForm();
  }
  @ViewChild('imageUser') inputImageUser: ElementRef;
  @ViewChild('nameUser') inputName: ElementRef;
  
  ngOnInit() {
  }

  private createForm(): void{
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onUpload(e) {
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }

  onAddUser() {
    if (this.registerForm.valid) {
      const {email, password} = this.registerForm.value;
      this.authService.registerUser(email, password)
        .then((res) => {
          this.authService.isAuth().subscribe(user => {
            if (user) {
              user.updateProfile({
                displayName: this.inputName.nativeElement.value,
                photoURL: this.inputImageUser.nativeElement.value
              }).then(() => {
                this.router.navigate(['/wall']);
              }).catch((error) => console.log('error', error));
            }
          });
        }).catch(err => console.log('err', err.message));
      }
  }

}
