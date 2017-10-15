import { Component } from '@angular/core'
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider
import { Router } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase'

@Component({
    selector: 'ntp-login',
    template: `
        <button mat-raised-button class="google-sign-in" (click)="signInWithGoogle()">
            <img src="../../assets/google_signin_buttons/web/vector/btn_google_light_normal_ios.svg" alt="">
            Sign-in with google
        </button>
    `,
    styles: [
        `     
        .google-sign-in {
            padding-left: 0;
        }
        `,
    ],
})
export class LoginComponent {
    constructor(private router: Router, private afAuth: AngularFireAuth) {}

    public signInWithGoogle() {
        this.afAuth.auth
            .signInWithPopup(new GoogleAuthProvider())
            .then(() => this.router.navigate(['/']))
    }
}
