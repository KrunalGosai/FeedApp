import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, RequestOptions } from '@angular/http';
import { HttpModule, Headers } from '@angular/http';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { StatusesComponent } from './statuses/statuses.component';

import { StatusesService } from './statuses/statuses.service';
import { SharedService } from './services/shared/shared.service';


export const firebaseConfig = {
  apiKey: "AIzaSyAL5_KDTjiqo9PI19qBJTu4xbuqu_snYTw",
  authDomain: "reactions-634d3.firebaseapp.com",
  databaseURL: "https://reactions-634d3.firebaseio.com",
  projectId: "reactions-634d3",
  storageBucket: "reactions-634d3.appspot.com",
  messagingSenderId: "25397341111"
};

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SidebarComponent,
    StatusesComponent,
],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [StatusesService,SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
