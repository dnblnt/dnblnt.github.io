import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'
import lighthouse from 'lighthouse'
import desktopConfig from 'lighthouse/core/config/desktop-config.js'

await mkdir('.artifacts', { recursive: true })
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'msedge', headless: true, args: ['--remote-debugging-port=9223'] })
try {
  for (const mode of ['mobile', 'desktop']) {
    const { lhr, report } = await lighthouse(process.env.TEST_URL || 'http://127.0.0.1:4173', {
      port: 9223, output: 'html', onlyCategories: ['performance', 'accessibility', 'seo', 'best-practices'],
      ...(mode === 'desktop' ? { formFactor: 'desktop', screenEmulation: { mobile: false, width: 1440, height: 1000, deviceScaleFactor: 1, disabled: false } } : {}),
    }, mode === 'desktop' ? desktopConfig : undefined)
    await writeFile(`.artifacts/lighthouse-${mode}.html`, report)
    await writeFile(`.artifacts/lighthouse-${mode}.json`, JSON.stringify(lhr, null, 2))
    const scores = Object.fromEntries(Object.entries(lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)]))
    console.log(JSON.stringify({ mode, scores }))
    for (const category of ['performance', 'accessibility', 'seo']) {
      if (scores[category] < 95) {
        const failures = lhr.categories[category].auditRefs.filter(ref => ref.weight > 0 && lhr.audits[ref.id].score !== null && lhr.audits[ref.id].score < 1).map(ref => ({ id: ref.id, title: lhr.audits[ref.id].title, score: lhr.audits[ref.id].score }))
        console.log(JSON.stringify({ category, failures }))
        process.exitCode = 1
      }
    }
  }
} finally {
  await browser.close()
}
