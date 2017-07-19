import { SKODADOVOLENCARDEVPage } from './app.po';

describe('skoda-dovolencar-dev App', () => {
  let page: SKODADOVOLENCARDEVPage;

  beforeEach(() => {
    page = new SKODADOVOLENCARDEVPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
