import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {
  public userName = new Subject<string>();

  constructor() { }

  setUserName(value:string){
    this.userName.next(value);
  }


}
