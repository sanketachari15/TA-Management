import { AppPage } from './app.po';

describe('ta-management App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display login page', () => {
    page.navigateTo();
    expect(page.getLoginPageDetails('.first-element')).toEqual('Prof-Login');
    expect(page.getLoginPageDetails('.second-element')).toEqual('Student-Login');
    expect(page.getLoginPageDetails('.third-element')).toEqual('Manager-Login');
  });

  it('should display home page for professor', () => {
    page.navigateTo('/prof');
  });
});
