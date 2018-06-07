import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared/shared.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private sharedService:SharedService) { }

  private userName:string = '';
  private userNameSubscription:Subscription;

  ngOnInit() {
    this.userNameSubscription = this.sharedService.userName.subscribe((value)=>{ this.userName = value});
  }

  public logout(){
    this.sharedService.setUserName('');
  }

}
