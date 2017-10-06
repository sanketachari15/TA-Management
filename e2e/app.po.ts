import {browser, by, element} from 'protractor';

export class AppPage {

    navigateTo(path = '/') {
        return browser.get(path);
    }

    getLoginPageDetails(buttonClass) {
        // console.log(element(by.css('.first-element')).getText());
        return element(by.css(buttonClass)).getText();
    }
}
