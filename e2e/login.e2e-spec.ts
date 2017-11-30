import {browser, element, by} from "protractor";

describe('Login Page', () => {

    beforeEach(() => {
        browser.get('/login');
        browser.ignoreSynchronization = true;

    });

    it('should display login page header', () => {
        expect(element(by.css('.header-name')).getText()).toEqual('TA Management');
    });

    it('should have three tabs in login page', () => {
        expect(element(by.css('.first-element')).getText()).toEqual('Prof-Login');
        expect(element(by.css('.second-element')).getText()).toEqual('Student-Login');
        expect(element(by.css('.third-element')).getText()).toEqual('Manager-Login');
    });
});
