import { Component, OnInit } from '@angular/core';
import { StatusesService } from './statuses.service';
import { SharedService } from '../services/shared/shared.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.scss']
})

export class StatusesComponent implements OnInit {

  // Class constructor, injects StatusService as this.status
  constructor(public status: StatusesService,private sharedService:SharedService) { }
    
  // Status text
  public statusText: string
  public userNameText:string = '';//user Name textbox value
  public userName:string = '';//user Name
  private userNameSubscription:Subscription; //subscription
  public imageFile64:string= ''; //file 64 base String
  public serverUrl = 'http://localhost:4000';


  // The status available
  public statuses: any[]

  // Flag to see if a new status can be added or nah
  public canPostStatus: boolean = false

  // ngOnInit is automatically fired on intialisation
  ngOnInit() {
    // Get 50 of the most recent statuses
    // this.status.recent(50)
    this.status.list().subscribe((res) => {
      this.statuses = res['list'];
      console.log(this.statuses);
    })

    this.status.getposts().subscribe((res)=> {
      this.statuses = res;
    })
    this.userNameSubscription = this.sharedService.userName.subscribe((value)=>{ this.userName = value});

  }

  // Get the status of the text if its valid or nah
  typingStatus() {
    this.canPostStatus = this.status.valid(this.statusText) && this.status.updating() == false;
  }

  // Post a status if it is valid
  postStatus() {
    // this.status.valid(this.statusText) && this.status.post(this.statusText)
    this.status.insert(this.statusText,this.userName.toLowerCase(),this.imageFile64)
    // .then((res)=>{
    //   if(res != undefined && res['list'] != undefined){
    //     this.statuses = res['list'];
    //   }
    this.statusText = '';
    // }).catch((err)=>{console.log(err)});
  }

  // React to an existing post
  react(reaction: string, status) {
    this.status.react(reaction, status)
  }

  updateUser(){
    this.sharedService.setUserName(this.userNameText.trim())
    this.userNameText = '';
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

}
