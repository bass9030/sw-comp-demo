const chrome = require("selenium-webdriver/chrome");
const { Builder, By, Key, until } = require("selenium-webdriver");
const fs = require("fs");

const screen = {
    width: 1080,
    height: 1080,
};

async function getImg(lat, long) {
    let driver = new Builder()
        .forBrowser("chrome")
        .setChromeOptions(
            new chrome.Options().addArguments("--headless").windowSize(screen)
        )
        .build();

    driver.get(`file:///../../asdf.html?lat=${lat}&long=${long}`);
    await driver.wait(until.elementLocated(By.id("map")), 3000);
    let image = await driver.takeScreenshot();
    // driver.quit();
    return image;
}

var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
    try {
        let lat = req.query?.lat;
        let long = req.query?.long;
        res.json({ data: await getImg(lat, long) });
    } catch (e) {
        console.error(e);
        res.status(500);
        res.json({ err: req.app.get("env") == "development" ? e : undefined });
    }
});
module.exports = router;
