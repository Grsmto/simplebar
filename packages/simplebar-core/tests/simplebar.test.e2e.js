import 'expect-puppeteer';
import jestPuppeteerConfig from '../jest-puppeteer.config';

/**
 * Mark test status on BrowserStack.
 *
 * @param {Page} page - Page object created by Puppeteer context.
 * @param {String} status - Status string can be either passed|failed.
 * @param {String} reason - Explanatory reason for the status marked.
 * @return {Promise<String>} Stringified response from BrowserStack regarding the
 * execution of the jsExecutor.
 */
function markTest(page, status, reason) {
  return page.evaluate(
    (_) => {},
    `browserstack_executor: ${JSON.stringify({
      action: 'setSessionStatus',
      arguments: { status, reason },
    })}`
  );
}

try {
  beforeAll(async () => {
    await page.goto(`http://localhost:${jestPuppeteerConfig.server.port}`);
    await page.waitForSelector('h1');
  }, 20000);

  beforeEach(async () => {
    await page.reload();
    await page.mouse.move(0, 0);
  });

  afterAll(async () => {
    await markTest(page, 'passed', 'All test passed!');
  });

  test('should render demo page', async () => {
    await expect(page).toMatch('Simplebar demo page');
  });

  test('should render SimpleBar on data-simplebar elements', async () => {
    await expect(page).toMatchElement('[data-simplebar] .simplebar-content');
  });

  test('should force scrollbar track to be visible but scrollbar to be hidden', async () => {
    const trackSelector =
      '[data-simplebar-force-visible] .simplebar-track.simplebar-vertical';

    await page.waitForSelector(trackSelector, { visible: true });
    await page.waitForSelector(`${trackSelector} .simplebar-scrollbar`, {
      hidden: true,
    });
  });

  test('should display SimpleBar in "rtl" mode', async () => {
    const el = await expect(page).toMatchElement('.demo-rtl');
    const scrollbarEl = await expect(el).toMatchElement(
      '.simplebar-track.simplebar-horizontal .simplebar-scrollbar'
    );
    const transformStyle = await page.evaluate(
      (el) => el.style.transform,
      scrollbarEl
    );
    const elBoundingBox = await el.boundingBox();
    const scrollbarElBoundingBox = await scrollbarEl.boundingBox();

    expect(transformStyle).toEqual(
      `translate3d(${
        elBoundingBox.width - scrollbarElBoundingBox.width
      }px, 0px, 0px)`
    );
  });

  test('should add class "dragging" when dragging', async () => {
    const el = await expect(page).toMatchElement('#demo2');

    await page.click(
      '#demo2 .simplebar-track.simplebar-vertical .simplebar-scrollbar'
    );
    await page.mouse.down();

    const isDragging = await page.evaluate(
      (el) => el.classList.contains('simplebar-dragging'),
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
      (el) => parseInt(el.style.height),
      scrollbarEl
    );

    // await jestPuppeteer.debug();

    await page.hover('#demo2 p');
    await page.click('#demo2 p', { delay: 1000 }); // wait for Simplebar to recalculate

    const scrollbarHeightAfterHover = await page.evaluate(
      (el) => parseInt(el.style.height),
      scrollbarEl
    );

    expect(scrollbarHeightAfterHover).toBeLessThan(scrollbarHeight);
  });
} catch (err) {
  markTest(page, 'failed', err.message);
}
