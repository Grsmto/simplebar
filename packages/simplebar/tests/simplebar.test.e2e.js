import jestPuppeteerConfig from '../jest-puppeteer.config';

describe('Load', () => {
  beforeAll(async () => {
    await page.goto(
      `http://localhost:${jestPuppeteerConfig.server.port}/examples.html`
    );
  });

  beforeEach(async () => {
    await page.reload();
    await page.mouse.move(0, 0);
    await page.click('body', { delay: 64 }); // wait for SimpleBar to init
  });

  test('should render demo page', async () => {
    await expect(page).toMatch('Simplebar demo page');
  });

  test('should render SimpleBar on data-simplebar elements', async () => {
    await expect(page).toMatchElement('[data-simplebar] .simplebar-content');
  });

  test('should not auto hide the scrollbar', async () => {
    const demo = await expect(page).toMatchElement(
      '[data-simplebar-auto-hide="false"]'
    );
    await expect(demo).toMatchElement('.simplebar-scrollbar.simplebar-visible');
  });

  test('should force scrollbar track to be visible but scrollbar to be hidden', async () => {
    const trackSelector =
      '[data-simplebar-force-visible] .simplebar-track.simplebar-vertical';

    await page.waitForSelector(trackSelector, { visible: true });
    await page.waitForSelector(`${trackSelector} .simplebar-scrollbar`, {
      hidden: true
    });
  });

  test('should display SimpleBar in "rtl" mode', async () => {
    const el = await expect(page).toMatchElement('.demo-rtl');
    const scrollbarEl = await expect(el).toMatchElement(
      '.simplebar-track.simplebar-horizontal .simplebar-scrollbar'
    );
    const isRtl = await page.$eval('.demo-rtl', el => el.SimpleBar.isRtl);
    const transformStyle = await page.evaluate(
      el => el.style.transform,
      scrollbarEl
    );
    const elBoundingBox = await el.boundingBox();
    const scrollbarElBoundingBox = await scrollbarEl.boundingBox();

    expect(isRtl).toBeTruthy();
    expect(transformStyle).toEqual(
      `translate3d(${elBoundingBox.width -
        scrollbarElBoundingBox.width}px, 0px, 0px)`
    );
  });

  test('should add class "dragging" when dragging', async () => {
    const el = await expect(page).toMatchElement('#demo2');

    await page.click(
      '#demo2 .simplebar-track.simplebar-vertical .simplebar-scrollbar'
    );
    await page.mouse.down();

    const isDragging = await page.evaluate(
      el => el.classList.contains('simplebar-dragging'),
      el
    );

    expect(isDragging).toBeTruthy();
  });

  test('should recalculate scrollbar size when content size changes', async () => {
    const el = await expect(page).toMatchElement('#demo2');
    const scrollbarEl = await expect(el).toMatchElement(
      '.simplebar-track.simplebar-vertical .simplebar-scrollbar'
    );

    const scrollbarHeight = await page.evaluate(
      el => parseInt(el.style.height),
      scrollbarEl
    );

    // await jestPuppeteer.debug();

    await page.hover('#demo2 p');
    await page.click('#demo2 p', { delay: 1000 }); // wait for Simplebar to recalculate

    const scrollbarHeightAfterHover = await page.evaluate(
      el => parseInt(el.style.height),
      scrollbarEl
    );

    expect(scrollbarHeightAfterHover).toBeLessThan(scrollbarHeight);
  });
}, 999999);
// });
