const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const fs = require('fs')

puppeteer.use(StealthPlugin())

const videoURL = 'https://www.tiktok.com/@rara_princes/video/7522175254991572230'
const proxies = fs.readFileSync('proxies.txt', 'utf-8').split('\n').filter(Boolean)
const TOTAL_VIEWS = 10

let viewCount = 0

;(async () => {
  while (viewCount < TOTAL_VIEWS) {
    const proxy = proxies[viewCount % proxies.length]  // rotasi proxy
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: [`--proxy-server=http://${proxy}`, '--no-sandbox']
      })
      const page = await browser.newPage()
      await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36")
      await page.goto(videoURL, { waitUntil: 'networkidle2' })
      await page.waitForTimeout(12000) // tonton 10 detik
      await browser.close()

      viewCount++
      console.log(`[🔥 ${viewCount}/500] View berhasil via ${proxy}`)
    } catch (err) {
      console.log(`[❌] Gagal: ${err.message}`)
    }
  }
})()
