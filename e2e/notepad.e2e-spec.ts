import { browser } from 'protractor'
import { AppPage } from './app.po'
import { NotepadPage } from './notepad.po'

describe('notepad', function() {
    let app: AppPage
    let notepad: NotepadPage

    beforeEach(() => {
        browser.waitForAngularEnabled(false)
        app = new AppPage()
        notepad = new NotepadPage()
    })

    it('should redirect to notepad if logged in with google', () => {
        // I don't need to login in this test cause I'm still logged from the previous one

        app.navigateTo()

        notepad.waitUntilDisplayed()
        expect(notepad.isDisplayed()).toBe(true)
    })
})
