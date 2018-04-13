// test('should call constructor', () => {
//     const SimpleBar = require('./simplebar').default;
//     jest.mock('./simplebar');

//     const simpleBar = new SimpleBar(document.getElementById('simplebar'));

//     expect(SimpleBar).toHaveBeenCalledTimes(1);
// });
// test('should return right scroll element', () => {
//     const simpleBar = new SimpleBar(document.getElementById('simplebar'));
//     const scrollElementY = simpleBar.getScrollElement();
//     const scrollElementX = simpleBar.getScrollElement('x');
    
//     expect(scrollElementY).toBe(simpleBar.scrollContentEl);
//     expect(scrollElementX).toBe(simpleBar.contentEl);
// });

describe('Load', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:8080/demo/');
    })
    
    it('should render demo page', async () => {
        await expect(page).toMatch('Simplebar demo page');
    })
});