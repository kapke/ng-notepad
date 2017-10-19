import { browser } from 'protractor'

import { AppPage } from './app.po'
import { GoogleAuth } from './googleAuth.po'
import { LoginPage } from './login.po'
import { NotepadPage } from './notepad.po'

describe('notepad App', () => {
    let app: AppPage
    let login: LoginPage
    let notepad: NotepadPage
    let googleAuth: GoogleAuth

    beforeEach(() => {
        browser.waitForAngularEnabled(false)
        app = new AppPage()
        login = new LoginPage()
        notepad = new NotepadPage()
        googleAuth = new GoogleAuth()
    })

    it('should display proper instance information', () => {
        app.navigateTo()

        expect(app.getInstanceText()).toBe('notepad-e2e')
    })

    it('should login to google account and login to app', () => {
        googleAuth.loginAsTestGoogleUser()

        login.navigateTo()
        login.signInWithGoogle()

        notepad.waitUntilDisplayed()

        expect(notepad.isDisplayed()).toBe(true)
    })

    it('should redirect to notepad if logged in with google', () => {
        // I don't need to login in this test cause I'm still logged from the previous one

        app.navigateTo()

        notepad.waitUntilDisplayed()
        expect(notepad.isDisplayed()).toBe(true)
    })
})
