import { Router } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth'
import { Deceiver } from 'deceiver-core'
import { User } from 'firebase'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Subject } from 'rxjs/Subject'

import { IsAuthenticatedGuard } from '../is-authenticated.guard'
import { AuthenticatedUserSpy } from '../testing';

describe('IsAuthenticatedGuard', () => {
    let authStateSubject: Subject<User | null>
    let router: Router
    let afAuth: AngularFireAuth
    let guard: IsAuthenticatedGuard

    beforeEach(() => {
        router = jasmine.createSpyObj('router', ['navigate'])
        afAuth = Deceiver(AngularFireAuth, {
            get authState() {
                return authStateSubject
            },
        })
        guard = new IsAuthenticatedGuard(router, afAuth)
    })

    afterEach(() => {
        authStateSubject = new Subject<User | null>()
    })

    it('should ...', () => {
        expect(guard).toBeTruthy()
    })

    it('should return observable with true when authState emits non null value', () => {
        authStateSubject = new BehaviorSubject(AuthenticatedUserSpy())
        authStateSubject.complete()

        const nextSpy: (val: boolean) => void = jasmine
            .createSpy('next')
            .and.callFake((val: boolean) => {
                expect(val).toBe(true)
            })

        guard.canActivate().subscribe(nextSpy, fail, () => {
            expect(nextSpy).toHaveBeenCalledTimes(1)
        })
    })

    it('should return observable with false when authState emits a null', () => {
        const nextSpy: (val: boolean) => void = jasmine
            .createSpy('next')
            .and.callFake((val: boolean) => {
                expect(val).toBe(false)
            })

        authStateSubject = new BehaviorSubject(null)
        authStateSubject.complete()

        guard.canActivate().subscribe(nextSpy, fail, () => {
            expect(nextSpy).toHaveBeenCalledTimes(1)
        })
    })

    it('should navigate to login page if user is not authenticated', () => {
        authStateSubject = new BehaviorSubject(null)
        authStateSubject.complete()

        guard.canActivate().subscribe(() => {
            expect(router.navigate).toHaveBeenCalledWith(['/login'])
        }, fail)
    })

    it('should navigate to login page if user is not authenticated', () => {
        authStateSubject = new BehaviorSubject(AuthenticatedUserSpy())
        authStateSubject.complete()

        guard.canActivate().subscribe(() => {
            expect(router.navigate).not.toHaveBeenCalled()
        }, fail)
    })
})
