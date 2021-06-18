import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ : Observable<User> | any;
  constructor(public afAuth : AngularFireAuth, private route : ActivatedRoute, private router : Router, private db : AngularFirestore) {
    this.user$ =  this.afAuth.authState.pipe(
      switchMap(user => {
        if(user) {
          return <Observable<User>> this.db.doc<User>(`users/${user.uid}`).valueChanges();
        }
        else{
          return of(null);
        }

      })
    )
  }
  async login(){
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || this.router.url // Return right back at where you press login
    localStorage.setItem('returnUrl',returnUrl);

    const credential = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    return this.updateUserData(credential.user)
  }

  async logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/']);
    })
  }
  private updateUserData(user : any) {
    const useRef = this.db.doc(`users/${user.uid}`);
    const data = {
      name : user.displayName,
      email : user.email,
      photoURL : user.photoURL
    }

    return useRef.set(data, {merge : true});

  }
}
