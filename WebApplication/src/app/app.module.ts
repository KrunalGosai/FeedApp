import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { StatusesComponent } from './statuses/statuses.component';

import { StatusesService } from './statuses/statuses.service';
import { SharedService } from './services/shared/shared.service';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

//angular social tool 
import {
  SocialLoginModule,
  AuthServiceConfig,
  FacebookLoginProvider,
  GoogleLoginProvider
} from "angular-6-social-login";
import { VideorecordComponent } from './videorecord/videorecord.component';
// Configs 
export function getAuthServiceConfigs() {
let  config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
	        provider: new FacebookLoginProvider("1614205742041575")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
	        provider: new GoogleLoginProvider("341543928717-lkud8ljns0q811enoh4fieroriu07qfi.apps.googleusercontent.com")//AIzaSyCAd-hlV4mEsMJS079bIe4Vo2gQPH1DGig
        }
      ]);
  return config;
}
const routes: Routes = [
  { path: '', component: StatusesComponent },
  { path: 'video', canActivate:[AuthService] ,component: VideorecordComponent },
  { path: '**', component: StatusesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SidebarComponent,
    StatusesComponent,
    VideorecordComponent,
],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    SocialLoginModule,
    RouterModule.forRoot(routes)
  ],
  providers: [StatusesService,SharedService,AuthService,{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }