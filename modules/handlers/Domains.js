// START - Imports
const express = require("express");
const router = express.Router();
const autotrader = require("../jobs/AutoTrader");
// END

/*
AutoTrader > https://www.autotrader.co.za/cars-for-sale/western-cape/p-9/bmw?price=100001-to-200000
*/

// START - Domain handler
router.get("/", async function (req, res){
    if (req.query.domain == "autotrader"){
        let queryUrl = `https://www.autotrader.co.za/cars-for-sale/${req.query.province}/p-9/${req.query.brand}?price=${req.query.priceRange}`;
        res.header("Content-Type", "application/json");
        res.send(await autotrader(queryUrl));
        res.end()
    }
    else {
        res.header("Content-Type", "text/html");
        res.send("WTF Bro");
        res.end()
    }
})
// END - Domain handler


// Export Module
module.exports = router;