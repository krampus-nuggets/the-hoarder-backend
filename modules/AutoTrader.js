// START - Imports
const puppeteer = require("puppeteer");
const express = require("express");
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

    // START - Set server response
    // Set JSON header to Response
    res.header("Content-Type",'application/json');
    // Prettify and Respond with carData[{JSON}]
    res.send(JSON.stringify(carData, null, 4));
    // End Response
    res.end();
    // END
    

// Export Module
module.exports = router;
