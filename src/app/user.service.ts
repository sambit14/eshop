import { Injectable } from '@angular/core';
import { AngularFireDatabase ,AngularFireList,AngularFireObject} from '@angular/fire/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AppUser } from './models/app.user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dbPath = '/user';
  userRef: AngularFireList<AppUser> = null;

  
  constructor(private db:AngularFireDatabase) {
    this.userRef = db.list(this.dbPath);
   }

  save(user:firebase.User){
   this.db.object('/users' +user.uid).update({
     name:user.displayName,
     email:user.email
   })
  }

  get(uid:string):AngularFireObject<AppUser>{
    return this.db.object('/users/' + uid);
  }

}
