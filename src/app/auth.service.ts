import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor () {

    }

    public isAuthenticated (): boolean {
        return false;//this.user && !this.user.isAnonymous;
    }

    public login (): Promise<any> {
        return null;//this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    public logout (): Promise<any> {
        return null;//this.afAuth.auth.signOut();
    }

    public getUser () {
        return null;//this.user;
    }

    public getUserId (): Observable<string> {
        return null;/*this.afAuth.user.pipe(
            map((user: User) => user && user.uid)
        );*/
    }
}