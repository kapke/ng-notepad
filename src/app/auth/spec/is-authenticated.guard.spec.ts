import { inject, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth'
import { Subject } from 'rxjs/Subject'

import { IsAuthenticatedGuard } from '../is-authenticated.guard'

describe('IsAuthenticatedGuard', () => {
    let authStateSubject: Subject<object | null>

    beforeEach(() => {
        authStateSubject = new Subject<object>()
    })

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                IsAuthenticatedGuard,
                { provide: Router, useValue: jasmine.createSpyObj('router', ['navigate']) },
                { provide: AngularFireAuth, useValue: { authState: authStateSubject } },
            ],
        })
    })

    it(
        'should ...',
        inject([IsAuthenticatedGuard], (guard: IsAuthenticatedGuard) => {
            expect(guard).toBeTruthy()
        }),
    )

    it(
        'should return observable with true when authState emits non null value',
        inject([IsAuthenticatedGuard], (guard: IsAuthenticatedGuard) => {
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
        }),
    )

    it(
        'should return observable with false when authState emits a null',
        inject([IsAuthenticatedGuard], (guard: IsAuthenticatedGuard) => {
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
        }),
    )

    it(
        'should navigate to login page if user is not authenticated',
        inject([IsAuthenticatedGuard, Router], (guard: IsAuthenticatedGuard, router: Router) => {
            guard.canActivate().subscribe(() => {
                expect(router.navigate).toHaveBeenCalledWith(['/login'])
            }, fail)

            authStateSubject.next(null)
            authStateSubject.complete()
        }),
    )

    it(
        'should navigate to login page if user is not authenticated',
        inject([IsAuthenticatedGuard, Router], (guard: IsAuthenticatedGuard, router: Router) => {
            guard.canActivate().subscribe(() => {
                expect(router.navigate).not.toHaveBeenCalled()
            }, fail)

            authStateSubject.next({})
            authStateSubject.complete()
        }),
    )
})
