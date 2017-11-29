import {element, by, browser, protractor} from "protractor";

describe('Professor Page', () => {

    let EC = protractor.ExpectedConditions;

    beforeEach(() => {
        browser.get('/');
        element(by.css('.first-element')).click();
        browser.sleep(500);
        element(by.id('okButton')).click();
        browser.sleep(500);
    });

    it('should display professor home page', () => {
        expect(element(by.css('.header-name')).getText()).toEqual('Welcome Professor');
        expect(element(by.css('.middle')).isPresent()).toBe(true)
    });

    it('should have student list', () => {
        let students = element.all(by.id('students'));
        expect(students).toBeTruthy();
        expect(students.count()).toEqual(9)
    });

    it('should search student', () => {
        browser.sleep(1000);
        let search = element(by.name('search-input'));
        expect(search).toBeTruthy();
        search.sendKeys('Anna');
        browser.sleep(1000);
        let students = element.all(by.id('students'));
        expect(students.count()).toEqual(1);
        let studentName = element(by.id('student-name'));
        // browser.wait(EC.not(EC.presenceOf(studentName)), 5000);
        expect(studentName).toBeTruthy();
        expect(studentName.getText()).toContain('Anna');
        browser.sleep(2000);
    });

    it('students should have name', () => {
        let students = element.all(by.id('students'));
        expect(students.count()).toEqual(9);

        for (let i = 0; i < 9; i++){
            expect(students.get(i).element(by.css('student-name'))).toBeTruthy();
        }
    });

    it('should direct to announcement Page', () =>{
        let announcements = element(by.id('announcements'));
        browser.executeScript(function (elem) { elem.click(); }, announcements.getWebElement());
        browser.sleep(1000);
        expect(browser.getCurrentUrl()).toContain('course');
    });

    it('should direct to message Page', () =>{
        let messages = element(by.id('messages'));
        browser.executeScript(function (elem) { elem.click(); }, messages.getWebElement());
        browser.sleep(1000);
        expect(browser.getCurrentUrl()).toContain('course');
    });

    it('should direct to file Page', () =>{
        let files = element(by.id('files'));
        browser.executeScript(function (elem) { elem.click(); }, files.getWebElement());
        browser.sleep(1000);
        expect(browser.getCurrentUrl()).toContain('course');
    });

    it('should download the student list', () => {
        let download = element(by.id('download'));
        browser.executeScript(function (elem) { elem.click(); }, download.getWebElement());
        browser.sleep(1000);
    });

});
