import { browser, ExpectedConditions as until } from 'protractor'

export class NotepadPage {
    public navigateTo() {
        return browser.get(this.getUrl())
    }

    public isDisplayed() {
        return browser.getCurrentUrl().then(url => url === this.getUrl())
    }

    public waitUntilDisplayed() {
        browser.wait(until.urlIs(this.getUrl()))
    }

    private getUrl() {
        return browser.baseUrl + 'notepad'
    }
}
