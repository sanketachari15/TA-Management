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

    getCoursesList(profCourses){
        // let courses = element.all(by.css('.prof-courses'));
        // courses.sendKeys(browser.params.courses);
        element.all(by.css('.courses1')).sendKeys(profCourses);
        // let pp = element.all(by.css('.prof-courses')).se;
        // pp.set(0).sendKeys(profCourses[0]);
        let profs = element.all(by.css('.courses1'));
        let firstOrg = profs.get(0);
        // console.log(firstOrg.getText());
        return firstOrg;
        // return element.all(by.css('.prof-courses'));

        // return courses
    }

    getProfPageSearchInput(){

        return element(by.css('input'));
    }


    getProfPageStudentList(){
        // element(by.repeater('let student of getStudents()')).sendKeys(browser.params);
        // return element(by.binding('getStudents()'));
        // element(by.binding('getStudents()')).sendKeys(browser.params);
        // return element.all(by.repeater('let student of getStudents()'));
        element(by.css('.students')).sendKeys(browser.params);
        return element.all(by.css('.students'));

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
