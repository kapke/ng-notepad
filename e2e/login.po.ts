import { $, browser } from 'protractor'

export class LoginPage {
    navigateTo() {
        return browser.get(browser.baseUrl + 'login')
    }

    signInWithGoogle() {
        $('.google-sign-in').click()
    }
}
