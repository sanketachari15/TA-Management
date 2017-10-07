import {browser, by, element} from 'protractor';

export class AppPage {

    navigateTo(path = '/') {
        return browser.get(path);
    }

    getLoginPageDetails(buttonClass) {
        return element(by.css(buttonClass)).getText();
    }
}
