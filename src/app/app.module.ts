import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment'

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Services
import { AuthService } from './services/auth.service';
import { MessagesService } from './services/messages.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';

import {MatCardModule} from '@angular/material/card';
import { MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material';


import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { WallComponent } from './pages/wall/wall.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostInputComponent } from './pages/wall/post-input/post-input.component';
import { PostMessageComponent } from './pages/wall/post-message/post-message.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PlatformModule } from '@angular/cdk/platform';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WallComponent,
    NavbarComponent,
    ProfileComponent,
    PostInputComponent,
    PostMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    BsDropdownModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ScrollingModule,
    PlatformModule,
    MatProgressSpinnerModule
    
  ],
  providers: [
    AuthService,
    AuthGuard,
    AngularFireAuth, AngularFirestore,
    MessagesService
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
