// Import the required packages to the service
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import "rxjs/add/operator/map";
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StatusesService {

  // Flag to see if status update is in progress
  private inProgress: boolean = false

  // Possible available reactions
  private reactions: string[] = ['like', 'love', 'dislike']

  // All the statuses available
  public statuses: FirebaseListObservable<any[]>

  // The maimum length and minimum length of a status
  public maxLength:number = 500
  public minLength:number = 0

  // Flag that determines if the status text is valid or nah
  public statusTextValid: boolean = false

  headers: HttpHeaders;
  // options: any;
  httpOptions:any;

  //Socket
  private socket;

  // Class constructor, injects the angular fire database as this.af
  constructor(private af: AngularFireDatabase,private api:HttpClient) {
    // this.headers = new HttpHeaders();
    // this.headers.append('currentuserid', sessionStorage.getItem('currentuserid'));
    // this.headers.append('currentRole', sessionStorage.getItem('currentRole'));
    // this.headers.append('Content-Type', 'application/json');
    // this.headers.append('Access-Control-Allow-Origin', '*');
    // this.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
    // this.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // this.options = { headers: this.headers };
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.socket = io('http://localhost:8080');
   }

  // ----------------------------------------------------------------------
  // Method to post the status to Firebase
  // ----------------------------------------------------------------------
  post(status: string) {
    if ( ! this.updating()) {
      this.inProgress = true
      let payload = {text: status, like:0, dislike:0, love:0, createdAt: {".sv": "timestamp"}};
      this.statuses.push(payload).then( snapshot => {
        this.inProgress = false
      })
    }
  }

  // ----------------------------------------------------------------------
  // Method to send a reaction to a status to Firebase
  // ----------------------------------------------------------------------

  react(reaction: string, status) {
    if (this.reactions.indexOf(reaction)) {
      let reactions: any = {}
      let count: number = isNaN(parseInt(status[reaction])) ? 0 : parseInt(status[reaction])
      reactions[reaction] = count+1
      this.statuses.update(status.$key, reactions)
    }
  }

  // ----------------------------------------------------------------------
  // Method to get the recent statuses from Firebase
  // ----------------------------------------------------------------------

  recent(amount: number): FirebaseListObservable<any[]> {
    // return this.statuses = this.af.list('/statuses').map(arr => arr.reverse()) as FirebaseListObservable<any[]>;
    return null;
  }

  // ----------------------------------------------------------------------
  // Method to check the validity of a status update
  // ----------------------------------------------------------------------

  valid(status: string) : boolean {
    return status.length >= this.minLength && status.length <= this.maxLength
  }

  // ----------------------------------------------------------------------
  // Method to check the in progress flag
  // ----------------------------------------------------------------------

  updating() : boolean {
    return this.inProgress
  }

  // ----------------------------------------------------------------------
  // Method to get list of posts
  // ----------------------------------------------------------------------
  list(){
    return this.api.get(environment.serverURL+'/feed/list')
  }

  // ----------------------------------------------------------------------
  // Method to insert post
  // ----------------------------------------------------------------------
  insert(post:string,user_id:string){
    // let body = JSON.stringify({"user_id":user_id,"feedPost":post});
    // console.log(body);
    // return this.api.post(environment.serverURL+'/feed/newpost',body,this.httpOptions)
    //   .toPromise()
    //   .then((res)=>{return res || {}})
    //   .catch((err)=>{ console.log(err); return {}})
    this.socket.emit('newpost',{"user_id":user_id,"feedPost":post});
  }

  public getposts = () => {
    return Observable.create((observer) => {
        this.socket.on('newpost', (res) => {
          observer.next(res.list);
        });
    });
}
}
