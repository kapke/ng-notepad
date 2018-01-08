import { Router } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth'
import { Deceiver } from 'deceiver-core';
import { Subject } from 'rxjs/Subject'

import { IsAuthenticatedGuard } from '../is-authenticated.guard'

describe('IsAuthenticatedGuard', () => {
    let authStateSubject: Subject<object | null>
    let router: Router
    let afAuth: AngularFireAuth
    let guard: IsAuthenticatedGuard

    beforeEach(() => {
        authStateSubject = new Subject<object>()
        router = jasmine.createSpyObj('router', ['navigate'])
        afAuth = Deceiver(AngularFireAuth, {
            authState: authStateSubject,
        })
        guard = new IsAuthenticatedGuard(router, afAuth)
    })

    it('should ...', () => {
        expect(guard).toBeTruthy()
    })

    it('should return observable with true when authState emits non null value', () => {
        const nextSpy: (val: boolean) => void = jasmine
            .createSpy('next')
            .and.callFake((val: boolean) => {
                expect(val).toBe(true)
            })

        guard.canActivate().subscribe(nextSpy, fail, () => {
            expect(nextSpy).toHaveBeenCalledTimes(1)
        })

        authStateSubject.next({})
        authStateSubject.complete()
    })

    it('should return observable with false when authState emits a null', () => {
        const nextSpy: (val: boolean) => void = jasmine
            .createSpy('next')
            .and.callFake((val: boolean) => {
                expect(val).toBe(false)
            })

        guard.canActivate().subscribe(nextSpy, fail, () => {
            expect(nextSpy).toHaveBeenCalledTimes(1)
        })

        authStateSubject.next(null)
        authStateSubject.complete()
    })

    it('should navigate to login page if user is not authenticated', () => {
        guard.canActivate().subscribe(() => {
            expect(router.navigate).toHaveBeenCalledWith(['/login'])
        }, fail)

        authStateSubject.next(null)
        authStateSubject.complete()
    })

    it('should navigate to login page if user is not authenticated', () => {
        guard.canActivate().subscribe(() => {
            expect(router.navigate).not.toHaveBeenCalled()
        }, fail)

        authStateSubject.next({})
        authStateSubject.complete()
    })
})
