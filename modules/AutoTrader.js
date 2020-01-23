// START - Imports
const puppeteer = require("puppeteer");
const express = require("express");
const Sentry = require("@sentry/node");
const router = express.Router();
// END

// START - GET method for Puppeteer function @ Endpoint
router.get("/", async function (req, res){
    // Launch browser in headless mode
    const browser = await puppeteer.launch({ headless: true });
    // Create a new-tab within browser
    const page = await browser.newPage();
    // Set browser-viewport dimensions
    await page.setViewport({ height: 1366, width: 768 });
    // Go-To URL provided via Query String && waitUntil all traffic on network has stopped
    await page.goto(req.query.url, { waitUntil: "networkidle0" });

    // ADD - Global variable for use outside of try-block
    let carData;

    try {
        // START - Puppeteer Evaluation [Get data by selector]
        carData = await page.evaluate(() => {
            let cars = [];
            // Add all car cards with given selector to data[Array]
            let data = document.querySelectorAll("div.e-available");
            
            // START - forEach loop => Sequentially processing each "card" within data[Array]
            // && creating key/value pairs within carsJSON{}
            data.forEach((car) => {
                let carsJSON = {};
                // Get <img> by Selector
                let image = document.querySelector("span.e-image>span.b-gallery-image>img[src^='https://img.autotrader.co.za/'] ");
                // Get Title by Selector and Extract Text
                carsJSON.title = car.querySelector("span.e-title").innerText;
                // Get price selector and extract text
                carsJSON.price = car.querySelector("span.e-price").innerText;
                // Clean up data from <img> to get URL
                carsJSON.image = image.src.replace(/.+?v=/, "");
                // Get car-post <a> and extract URL
                carsJSON.post = car.querySelector("div.e-available>a").href;
                // Push carsJSON{} into cars[Array]
                cars.push(carsJSON);
            });
            // END
            // Return cars[Array] when carData(await) is complete
            return cars;
    });
    // END
    } catch(err) {
        Sentry.captureMessage("forEach[AutoTrader] => Loop Failed");
        Sentry.captureException(err);
    }

    // START - Set server response
    // Set JSON header to Response
    res.header("Content-Type",'application/json');
    // Prettify and Respond with carData[{JSON}]
    res.send(JSON.stringify(carData, null, 4));
    // End Response
    res.end();
    // END
    
    // Wait for browser session to close
    await browser.close();
});

// Export Module
module.exports = router;
