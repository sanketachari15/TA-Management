import {AppPage} from './app.po';
import {ProfessorComponent} from "../src/app/professor/professor.component";
import {DataService} from "../src/app/data.service";
import {SharedService} from "../src/app/shared.service";
import {Observable} from "rxjs";


class MockDataService extends DataService{
    testData: any;
    constructor(){
        super(null);
         this.testData = require('../test_data/mock-data.json');
    }

    getStudents(){
        return Observable.of(this.testData.students);
    }

    getProfCourses(){
        return Observable.of(this.getCourses(this.getProf()));
    }

    getCourses(profName) {
        let prof;
        let profCourses = this.testData.profCourses;
        for (let index in profCourses){
            prof = profCourses[index];
            if (prof.name === profName)
                return prof.courses;
        }
        return [];
    };

    getProf(){
        this.prof = 'Alin Dobra';
        return this.prof;
    }
}

describe('Ta-Management App', () => {
    let page: AppPage;
    let professor: ProfessorComponent;
    let mockDS: MockDataService;
    let ss: SharedService;

    beforeEach(() => {
        page = new AppPage();
        mockDS = new MockDataService();
        ss = new SharedService();
        // professor = new ProfessorComponent(ds, ss);
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

    /*it('should have student list', () => {
        page.navigateTo('/prof');

        let list = page.getProfPageStudentList();
        expect(list.isPresent()).toBeTruthy();
        expect(list.count()).toEqual(14);

        /!*list.then(function (students) {
            expect(students[0].element(by.className('name')).getText()).toEqual('John Doe')
        });*!/

        /!*let keys = Object.keys(students);
        expect(keys.length).toEqual(14);*!/
        /!*_.forEach(keys, function (key) {
            expect(console.log(students[key])).toBe('John Doe')
        });*!/
    });*/

    /*it('should set search string for student', () => {
        page.navigateTo('/prof');
        // let input = page.getProfPageSearchInput();
        professor.ngOnInit();
        expect(professor.profCourses.length).toBe(3);
        expect(professor.students).toBeDefined();
        let input = page.getCoursesList(professor.profCourses);
        expect(input.isPresent()).toBe(true);
        // expect(Object.keys(input).length).toEqual(3);

        /!*_.forEach(Object.keys(input), function (key) {

        })*!/
        // input.sendKeys('jake');
        // expect(input.getAttribute('value')).toBe('jake');
    });*/

    /*it('should check student card clickable', () => {
        page.navigateTo('/prof');
        let cards = page.getProfPageStudentCard();

        expect(cards.isPresent()).toBeTruthy();

        _.forEach(cards, function (card) {
            card.click().then(function (val) {
                expect(val).toBeTruthy()
            })
        });
    });*/

});
