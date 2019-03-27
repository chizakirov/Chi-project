import { browser, by, element } from 'protractor';

// COMMENT: File structure of tests. I'm not sure I would put tests in public at all. 
// Public implies to me something that a client can hit via http to get a resource, like css, images and html files, traditionally.
// But if this is file-structure is auto-generated (which it sounds like it is, then ignore comment :)
export class AppPage {
  navigateTo() {
    // COMMENT: how does it know when the page has fully loaded?
    return browser.get('/');
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText();
  }
}
