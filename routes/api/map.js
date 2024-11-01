const appRoot = require("app-root-path");
const chrome = require("selenium-webdriver/chrome");
const { Builder, By, Key, until } = require("selenium-webdriver");
const fs = require("fs");

const screen = {
    width: 1080,
    height: 1080,
};

// Google Earth API
/*
var TILE_SIZE = 256;

function fromLatLngToPoint(lat, lng) {
  var mercator = -Math.log(Math.tan((0.25 + lat / 360) * Math.PI));
  return {
    x: TILE_SIZE * (lng / 360 + 0.5),
    y: TILE_SIZE / 2 * (1 +  mercator / Math.PI)
  };
}

function fromLatLngToTileCoord(lat, lng, zoom) {
  var point = fromLatLngToPoint(lat, lng);
  var scale = Math.pow(2, zoom);

  return {
    x: Math.floor(point.x * scale / TILE_SIZE),
    y: Math.floor(point.y * scale / TILE_SIZE),
    z: zoom
  };
}
*/

async function getImg(lat, long) {
    let driver = new Builder()
        .forBrowser("chrome")
        .setChromeOptions(
            new chrome.Options().addArguments("--headless").windowSize(screen)
        )
        .build();

    driver.get(`file:///${appRoot}/asdf.html?lat=${lat}&long=${long}`);
    await driver.sleep(2.5);
    // driver.manage().timeouts().implicitlyWait(2.5);
    let image = await driver.takeScreenshot();
    driver.quit();
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
