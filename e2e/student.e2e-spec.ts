import {element, by, browser, protractor} from "protractor";
import {until} from "selenium-webdriver";
import elementLocated = until.elementLocated;

describe('Student Page', () => {

    let EC = protractor.ExpectedConditions;
    let path = require('path');

    beforeEach(() => {
        browser.get('/login');
        element(by.buttonText('Student-Login')).click();
        browser.sleep(200);
        element(by.css('.login-button')).click();
        browser.sleep(200);
        let email = element(by.name('email'));
        email.sendKeys('jj@ufl.edu');
        let password = element(by.name('password'));
        password.sendKeys('jj');
        element(by.id('ok')).click();
        browser.sleep(1000);
    });

    it('should display student home page', () => {
        browser.sleep(200);
        expect(element(by.css('.header-name')).getText()).toEqual('Welcome Student');
        expect(element(by.css('.example-container')).isPresent()).toBe(true);
    });

    it('should display student name', () => {
        browser.sleep(200);
        const name =  element(by.id('name')).getText();
        expect(name).toEqual('John\nJohansson');
    });

    it('should display student profile on selection', () => {
        browser.sleep(200);
        element(by.linkText('Profile')).click();
        expect(element(by.id('profilePage')).isPresent()).toBe(true);
    });

    it('student should be able to change gpa in the profile', () => {
        browser.sleep(200);
        element(by.linkText('Profile')).click();
        element(by.id('changeGpa')).click();
        browser.sleep(100);
        const gpa = element(by.id('enterGpa'));
        gpa.sendKeys('\b\b\b\b3.9');
        element(by.id('okButton')).click();
        browser.sleep(600);
        expect(element(by.id('gpa')).getText()).toEqual('GPA: 3.9');
    });

    it('student should be able to upload profile picture', () => {
        browser.sleep(200);
        element(by.linkText('Profile')).click();
        const fileToUpload = '../src/assets/images/ta2.jpg',
        absolutePath = path.resolve(__dirname, fileToUpload);
        element(by.id('pictureUpload')).sendKeys(absolutePath);
        browser.sleep(2000);
        expect(element(by.id('picture')).isPresent()).toBe(true);
    });

    it('Student should be able to view his Resume', () => {
        browser.sleep(200);
        element(by.linkText('Profile')).click();
        element(by.buttonText('View Resume')).click();
        browser.sleep(2500);
        expect(element(by.id('taResume')).isDisplayed()).toBe(true);
    });

    it('should display student home on selection', () => {
        browser.sleep(200);
        element(by.linkText('Home')).click();
        expect(element(by.id('homePage')).isPresent()).toBe(true);
    });

    it('Student should be able to see his Recent Announcements, Messages and Files', () => {
        browser.sleep(200);
        element(by.linkText('Home')).click();
        element(by.linkText('Home')).click();
        browser.sleep(500);
        element(by.linkText('Announcements')).click();
        browser.sleep(500);
        element(by.linkText('Messages')).click();
        browser.sleep(500);
        element(by.linkText('Files')).click();
        browser.sleep(500);
        expect(element(by.linkText('Files')).isPresent()).toBe(true);
    });
});
