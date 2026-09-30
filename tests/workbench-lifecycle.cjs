// Run against the local server: node tests/workbench-lifecycle.cjs
// CDP_URL optionally reuses an existing Chrome; only this test's contexts are closed.
const { chromium } = require('playwright-core');
const assert = require('node:assert/strict');

(async () => {
  const shared = Boolean(process.env.CDP_URL);
  const browser = shared
    ? await chromium.connectOverCDP(process.env.CDP_URL)
    : await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const [width, reducedMotion] of [[390, 'no-preference'], [1280, 'no-preference'], [390, 'reduce']]) {
      const context = await browser.newContext({ viewport: { width, height: 850 }, reducedMotion, hasTouch: true });
      try {
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', e => errors.push(e.message));
        let spriteRequests = 0;
        page.on('request', r => { if (r.url().includes('/media/workbench/')) spriteRequests++; });
        await page.addInitScript(() => {
          window.workbenchPaints = 0;
          const clear = CanvasRenderingContext2D.prototype.clearRect;
          CanvasRenderingContext2D.prototype.clearRect = function (...args) {
            if (this.canvas.closest('#workbench')) window.workbenchPaints++;
            return clear.apply(this, args);
          };
        });
        const idle = () => page.waitForFunction(() => document.querySelector('#workbench canvas')?.dataset.state === 'idle');
        const stopped = async () => {
          await page.waitForTimeout(100);
          const paints = await page.evaluate(() => window.workbenchPaints);
          const requests = spriteRequests;
          await page.waitForTimeout(1000);
          assert.equal(await page.evaluate(() => window.workbenchPaints), paints, 'No rendering loop after exit');
          assert.equal(spriteRequests, requests, 'No asset requests after exit');
          assert.equal(await page.locator('#workbench canvas').getAttribute('data-state'), 'gone');
        };
        await page.goto(process.env.SITE_URL || 'http://localhost:3107');
        await idle();
        const canvas = page.locator('#workbench canvas');
        await canvas.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1200);
        const rect = await canvas.boundingBox();
        await page.touchscreen.tap(rect.x + rect.width / 2, rect.y + rect.height * .65);
        await page.waitForFunction(() => document.querySelector('#workbench canvas').dataset.state === 'gone', null, { timeout: 30000 });
        await stopped();
        await page.setViewportSize({ width: width === 390 ? 844 : 1100, height: 700 });
        await stopped(); // One resize redraw is allowed, but cannot restart animation.
        await page.emulateMedia({ reducedMotion: reducedMotion === 'reduce' ? 'no-preference' : 'reduce' });
        await stopped();
        await canvas.dispatchEvent('click', { clientX: rect.x + rect.width / 2, clientY: rect.y + 120 });
        await canvas.dispatchEvent('keydown', { key: 'Enter' });
        await stopped();
        await page.reload();
        await idle();
        assert.deepEqual(errors, []);
        console.log(`PASS ${width}px ${reducedMotion}: exit stops, no repeat requests, resize/motion/click cannot restart, refresh restores`);
      } finally { await context.close(); }
    }
  } finally { if (!shared) await browser.close(); }
})().then(() => process.exit(0), error => { console.error(error); process.exit(1); });
