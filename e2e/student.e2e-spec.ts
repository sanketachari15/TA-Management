import {element, by, browser, protractor} from "protractor";
import {until} from "selenium-webdriver";
import elementLocated = until.elementLocated;

describe('Student Page', () => {

    let EC = protractor.ExpectedConditions;

    beforeEach(() => {
        browser.get('/login');
        element(by.buttonText('Student-Login')).click();
    });

    it('should display student home page', () => {
        expect(element(by.css('.header-name')).getText()).toEqual('Welcome Student');
        expect(element(by.css('.example-container')).isPresent()).toBe(true);
    });

    it('should display student home name', () => {
        const name =  element(by.id('name')).getText();
        expect(name).toEqual('John\nJohansson');
    });

    it('should display student profile on selection', () => {
        element(by.linkText('Profile')).click();
        expect(element(by.id('profilePage')).isPresent()).toBe(true);
    });

    it('student should be able to change gpa', () => {
        element(by.linkText('Profile')).click();
        element(by.id('changeGpa')).click();
        const gpa = element(by.id('enterGpa'));
        gpa.sendKeys('\b\b\b\b3.9');
        element(by.id('okButton')).click();
        expect(element(by.id('gpa')).getText()).toEqual('GPA: 3.9');
    });

    // it('student should be able to upload profile picture', () => {
    //     element(by.linkText('Profile')).click();
    //     expect(element(by.id('profilePage')).isPresent()).toBe(true);
    // });

    it('should display student home on selection', () => {
        element(by.linkText('Home')).click();
        expect(element(by.id('homePage')).isPresent()).toBe(true);
    });

});
