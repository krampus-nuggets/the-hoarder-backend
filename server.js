// START - Imports
const express = require("express");
const autotrader = require("./modules/AutoTrader");
// END

// Create Express Application
const app = express();

// Mount middleware to PATH
app.use("/autotrader", autotrader);

