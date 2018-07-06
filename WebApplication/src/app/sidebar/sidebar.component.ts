import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared/shared.service';
import { Subscription } from 'rxjs/Subscription';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private sharedService:SharedService) { }

  private userName:string = '';
  private profilePic:string = '';

  ngOnInit() {
    this.sharedService.userName.subscribe((value)=>{ this.userName = value});
    this.sharedService.profilePic.subscribe(value => { this.profilePic = value});
  }

  public logout(){
    this.sharedService.LogOut();
  }

}
