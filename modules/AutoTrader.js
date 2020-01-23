// START - Imports
const puppeteer = require("puppeteer");
const express = require("express");
const router = express.Router();
// END

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
