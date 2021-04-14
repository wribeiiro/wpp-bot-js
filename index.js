const puppeteer = require("puppeteer")

const timer = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}

const mainBot = async () => {

    try {
        const browser = await puppeteer.launch({headless: false})
        const page = await browser.newPage()
        
        await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36')
        await page.goto('https://web.whatsapp.com/')
        await page.waitForSelector('._2_1wd')
        await timer(5000)

        await page.click('span[title="Leandro"]')
        await page.waitForSelector(".OTBsx")

        const editor = await page.$("div[tabindex='-1']")
        await editor.focus()

        for (let i = 0; i < 50; i++) {
            await page.evaluate(() => document.execCommand("insertText", false, `test++`))
            await page.click("span[data-testid='send']")
            await timer(1000)
        }
    } catch (e) {
        console.error('deu ruim', e)
    }
}

mainBot()