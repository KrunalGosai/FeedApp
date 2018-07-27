import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Injectable()
export class AuthService implements CanActivate {

  constructor(public router: Router, private sharedService:SharedService) { }

  canActivate(): boolean {
    if (this.sharedService.userName.toString().trim() == '') {
      console.log()
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}
