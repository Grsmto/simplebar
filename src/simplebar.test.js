import SimpleBar from './simplebar';

beforeEach(() => {
    jest.resetModules();

    // Set up our document body
    document.body.innerHTML = '<div id="simplebar"></div>';
});

test('should call constructor', () => {
    const SimpleBar = require('./simplebar').default;
    jest.mock('./simplebar');

    const simpleBar = new SimpleBar(document.getElementById('simplebar'));

    expect(SimpleBar).toHaveBeenCalledTimes(1);
});
test('should return right scroll element', () => {
    const simpleBar = new SimpleBar(document.getElementById('simplebar'));
    const scrollElementY = simpleBar.getScrollElement();
    const scrollElementX = simpleBar.getScrollElement('x');
    
    expect(scrollElementY).toBe(simpleBar.scrollContentEl);
    expect(scrollElementX).toBe(simpleBar.contentEl);
});