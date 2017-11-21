
import {browser} from "protractor";

describe('Home Page', () => {

    beforeEach(() => {
        browser.get('/');
    });

    it('should display browser title as TA Management', () => {
        expect(browser.getTitle()).toEqual('TA Management');
    });
});
