import { $, $$, browser, ExpectedConditions as until } from 'protractor'

export class GoogleAuth {
    public url = 'https://accounts.google.com/signin'
    public testingUser = {
        mail: 'kapke.testing@gmail.com',
        password: 'alamakota',
    }

    public loginAsTestGoogleUser() {
        browser.get(this.url)
        this.fillLoginInput()
        this.clickLoginNext()
        this.fillPasswordInput()
        this.clickPasswordNext()
        this.waitForLoggedInPage()
    }

    public fillPasswordInput() {
        const passwordInput = $('input[name="password"]')
        browser.wait(until.visibilityOf(passwordInput))
        passwordInput.sendKeys(this.testingUser.password)
    }

    public clickLoginNext() {
        $$('#identifierNext').click()
    }

    public fillLoginInput() {
        $('input[name="identifier"]').sendKeys(this.testingUser.mail)
    }

    public clickPasswordNext() {
        const passwordNext = $('#passwordNext')
        browser.wait(until.elementToBeClickable(passwordNext))
        browser.sleep(1000) // There is something on google site that forces us to wait until actual click is made
        passwordNext.click()
    }

    public waitForLoggedInPage () {
        browser.wait(until.textToBePresentInElement($('h1'), 'Konto Google'))
    }

    selectTestingUser() {
        // Starting point for handling a pop-up
        // In this case it is meant to select user from google pop-up
        browser.wait(
            browser.driver.getAllWindowHandles().then(handles => {
                browser.driver.switchTo().window(handles[1])
                browser.sleep(10000)
                const userSelector = '[data-authuser="0"]'

                browser.wait(until.elementToBeClickable($(userSelector)))
                $(userSelector).click()
            }),
        )
        browser.driver.getAllWindowHandles().then(handles => {
            browser.driver.switchTo().window(handles[0])
        })
    }
}
