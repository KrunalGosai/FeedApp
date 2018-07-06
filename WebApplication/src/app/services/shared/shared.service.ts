import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedinLoginProvider
} from 'angular-6-social-login';

@Injectable()
export class SharedService {
  public userName = new Subject<string>();
  public profilePic = new Subject<string>();

  private loginProvider:string;

  constructor( private socialAuthService: AuthService) { }

  setUserName(value:string){
    this.userName.next(value);
  }

  LoginWith(socialPlatform){
    this.LogOut()
    this.loginProvider = socialPlatform;
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }
    else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } 
    else if (socialPlatform == "linkedin") {
      socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this.userName.next(userData.name);
        this.profilePic.next(userData.image);
        this.loginProvider = '';
      }, (err) => console.log(err)
    );
  }

  LogOut(){
      this.socialAuthService.signOut().then(res =>{console.log(res)}).catch(err => console.log(err));
      this.userName.next('');
      this.profilePic.next('');
  }

}
