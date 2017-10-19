import { browser, by, element } from 'protractor'

export class AppPage {
    navigateTo() {
        return browser.get('/')
    }

    getInstanceText() {
        return element(by.css('ntp-root .instance')).getText()
    }
}
