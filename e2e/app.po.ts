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

    getLoginPageDetails(buttonClass) {
        return element(by.css(buttonClass)).getText();
    }

    getProfPage(){
        return element(by.css('.middle')).isPresent();
    }

    /*getCoursesList(){
        return element(by.css('.prof-courses'));
    }*/

    getProfPageSearchInput(){
        return element(by.model('search'));
    }


    getProfPageStudentList(){
        let students = element(by.repeater('let student of getStudents()'));
        return students.element(by.binding('student.name'))
    }

    getProfPageStudentCard(){
        return element.all(by.css('.student-details'))
    }

    dragAndDropStudent(){
        let student = element(by.css('.student-details'));
        let dashborad = element(by.css('.student-details'));
        // browser.actions().dragAndDrop().perform();
    }
}
