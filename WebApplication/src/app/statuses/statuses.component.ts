import { Component, OnInit} from '@angular/core';
import { StatusesService } from './statuses.service';
import { SharedService } from '../services/shared/shared.service';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedinLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.scss']
})

export class StatusesComponent implements OnInit {

  // Class constructor, injects StatusService as this.status
  constructor(public status: StatusesService,private sharedService:SharedService, private socialAuthService: AuthService) { }
    
  // Status text
  public statusText: string
  public userName = '' ;//user Name
  public imageFile64:string= ''; //file 64 base String
  public userProfilePic:String = '';

  // The status available
  public statuses: any[]

  // Flag to see if a new status can be added or nah
  public canPostStatus: boolean = false

  // ngOnInit is automatically fired on intialisation
  ngOnInit() {

    this.status.list().subscribe((res) => {
      this.statuses = res['list'];
    })

    this.status.getposts().subscribe((res)=> {
      this.statuses = res;
    })

    this.sharedService.userName.subscribe((value)=>{ this.userName = value});
    // if(this.socialAuthService.authState['source']['value'] != null){
    //   this.socialAuthService.signOut().then(value => {
    //     console.log(value)
    //   });
    // }
    this.sharedService.profilePic.subscribe(value=>{this.userProfilePic = value});
  }

  // Get the status of the text if its valid or nah
  typingStatus() {
    this.canPostStatus = this.status.valid(this.statusText) && this.status.updating() == false;
  }

  // Post a status if it is valid
  postStatus() {
    this.status.insert(this.statusText,this.userName.toLowerCase(),this.imageFile64,this.userProfilePic);
    this.statusText = '';
    this.imageFile64 = '';
  }

  // React to an existing post
  react(reaction: string, status) {
    this.status.react(reaction, status)
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageFile64 = reader.result;
      };
    }else{
      this.imageFile64 = '';
    }
  }
  
  public socialSignIn(socialPlatform : string) {
    this.sharedService.LoginWith(socialPlatform);
  }
}