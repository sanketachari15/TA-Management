import {element, by, browser} from "protractor";

describe('Professor Page', () => {

    beforeEach(() => {
        browser.get('/prof');
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
        let search = element(by.name('search-input'));
        search.sendKeys('Anna');
        browser.sleep(1000);
        let students = element.all(by.id('students'));
        expect(students.count()).toEqual(1);
        expect(element(by.id('student-name'))).toBeTruthy();
        expect(element(by.id('student-name')).getText()).toContain('Anna');
        browser.sleep(1000);
    });

    it('students should have name', () => {
        let students = element.all(by.id('students'));
        expect(students.count()).toEqual(9);

        for (let i = 0; i < 9; i++){
            expect(students.get(i).element(by.css('student-name'))).toBeTruthy();
        }
    });

});
