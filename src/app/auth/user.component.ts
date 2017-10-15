import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth'
import { User } from 'firebase'

@Component({
    selector: 'app-user',
    template: `
        <mat-card class="user-card">
            <mat-card-title>
                <img [src]="user.photoURL" alt="user photo" class="user-photo">
                {{ user.displayName }}
            </mat-card-title>
            <mat-card-actions>
                <button mat-button (click)="logOut()">Log out</button>
            </mat-card-actions>
        </mat-card>
    `,
    styles: [
        `
        .user-card {
            width: 300px;
        }
        
        .user-photo {
            max-width: 2em;
            max-height: 2em;
            border-radius: 50%;
            vertical-align: middle;
        }
    `,
    ],
})
export class UserComponent {
    public readonly user: User | null = this.afAuth.auth.currentUser

    constructor(private router: Router, private afAuth: AngularFireAuth) {}

    public logOut() {
        this.afAuth.auth.signOut().then(() => this.router.navigate(['/login']))
    }
}
