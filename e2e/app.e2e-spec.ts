import {AppPage} from './app.po';
import * as _ from 'underscore';

describe('Ta-Management App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display browser title as TA Management', () => {
        page.navigateTo('/');
        expect(page.getTitle()).toEqual('TA Management');
    });

    it('should display login page', () => {
        page.navigateTo('/login');
        expect(page.getHeader()).toEqual('TA Management');
    });

    it('should have three tabs in login page', () => {
        page.navigateTo();
        expect(page.getLoginPageDetails('.first-element')).toEqual('Prof-Login');
        expect(page.getLoginPageDetails('.second-element')).toEqual('Student-Login');
        expect(page.getLoginPageDetails('.third-element')).toEqual('Manager-Login');
    });

    it('should display professor home page', () => {
        page.navigateTo('/prof');
        expect(page.getHeader()).toEqual('Welcome Professor');
        expect(page.getProfPage()).toBe(true)
    });

    it('should have student list', () => {
        page.navigateTo('/prof');

        let students = page.getProfPageStudentList();
        expect(students.isPresent()).toBeTruthy();
        _.forEach(students, function (student) {
            expect(students.getText()).toBe('John Doe')
        });
    });

    it('should set search string for student', () => {
        page.navigateTo('/prof');
        let input = page.getProfPageSearchInput();

        expect(input.isPresent()).toBeTruthy();
        input.sendKeys('jake');
        input.getAttribute('value').then(function (attr) {
            expect(attr).toBe('jake');
        });
    });

    it('should check student card clickable', () => {
        page.navigateTo('/prof');
        let cards = page.getProfPageStudentCard();

        expect(cards.isPresent()).toBeTruthy();

        _.forEach(cards, function (card) {
            card.click().then(function (val) {
                expect(val).toBeTruthy()
            })
        });
    });

});
