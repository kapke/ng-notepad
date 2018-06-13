import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth'
import { User } from 'firebase/app'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
    constructor(private router: Router, private afAuth: AngularFireAuth) {}

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return this.afAuth.authState.pipe(
            map((user: User | null) => user != null),
            tap((result: boolean) => {
                if (!result) {
                    this.router.navigate(['/login'])
                }
            }),
        )
    }
}
