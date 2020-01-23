/*
Main Project: the-hoarder (https://github.com/krampus-nuggets/the-hoarder)
This Project: the-hoarder-backend (https://github.com/krampus-nuggets/the-hoarder-backend)
Relating Project: autotrader (https://github.com/krampus-nuggets/data_science/tree/master/autotrader)
Author: @krampus-nuggets (https://github.com/krampus-nuggets)
Role: Backend API
*/

// START - Imports
const express = require("express");
const autotrader = require("./modules/AutoTrader");
// END

// Create Express Application
const app = express();

// Mount middleware to PATH
app.use("/autotrader", autotrader);

// Listen for connections
app.listen(4000);
