const puppeteer = require("puppeteer")

const puppeteerParams = {
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
    wppUrl: "https://web.whatsapp.com/",
    qtyOfMessages: 500,
    timer: 500,
    textMessage: "test",
    classInputTypeMessage: "._2_1wd",
    contactName: "Leandro",
    classDivContact: ".OTBsx",
}

const timer = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}

const mainBot = async () => {

    try {

        const browser = await puppeteer.launch({headless: false})
        const page = await browser.newPage()
        
        await page.setUserAgent(puppeteerParams.userAgent)
        await page.goto(puppeteerParams.wppUrl)
        await page.waitForSelector(puppeteerParams.classInputTypeMessage)
        await timer(puppeteerParams.timer)

        await page.click(`span[title='${puppeteerParams.contactName}']`)
        await page.waitForSelector(puppeteerParams.classDivContact)

        const editor = await page.$("div[tabindex='-1']")
        await editor.focus()

        for (let i = 0; i < puppeteerParams.qtyOfMessages; i++) {
            await page.evaluate(() => document.execCommand("insertText", false, `${puppeteerParams.textMessage}-${i}`))
            await page.click("span[data-testid='send']")
            await timer(puppeteerParams.timer)
        }
    } catch (e) {
        console.error('deu ruim', e)
    }
}

mainBot()