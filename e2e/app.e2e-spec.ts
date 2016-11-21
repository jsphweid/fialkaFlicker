import { FlickerMakerPage } from './app.po';

describe('flicker-maker App', function() {
  let page: FlickerMakerPage;

  beforeEach(() => {
    page = new FlickerMakerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
