import { chromium } from 'playwright'

const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'msedge', headless: true })
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
  await page.goto(`${process.env.TEST_URL || 'http://127.0.0.1:5173'}/og-image.svg`)
  await page.screenshot({ path: 'public/og-image.png', type: 'png' })
  console.log('Exported 1200 × 630 social preview image.')
} finally {
  await browser.close()
}
