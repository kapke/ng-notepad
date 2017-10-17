import { InjectionToken } from '@angular/core'
import { AngularFireAuth } from 'angularfire2/auth'
import { User } from 'firebase'

export type AuthenticatedUser = User
export const AuthenticatedUser = new InjectionToken('AuthenticatedUser')

export function authenticatedUserFactory(afAuth: AngularFireAuth): AuthenticatedUser | null {
    return afAuth.auth.currentUser
}
