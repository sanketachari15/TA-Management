import {browser, by, element} from 'protractor';

export class AppPage {

    navigateTo(path = '/') {
        return browser.get(path);
    }

    getTitle(){
        return browser.getTitle();
    }

    getHeader(){
        return element(by.css('.header-name')).getText();
    }
}
