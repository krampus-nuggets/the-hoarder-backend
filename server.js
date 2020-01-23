/*
Main Project: the-hoarder (https://github.com/krampus-nuggets/the-hoarder)
This Project: the-hoarder-backend (https://github.com/krampus-nuggets/the-hoarder-backend)
Relating Project: autotrader (https://github.com/krampus-nuggets/data_science/tree/master/autotrader)
Author: @krampus-nuggets (https://github.com/krampus-nuggets)
Role: Backend API
*/

// START - Imports
const express = require("express");
// Create Express Application
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const Sentry = require("@sentry/node");
const autotrader = require("./modules/AutoTrader");
// END

// START - Sentry Init
// Sentry Init
Sentry.init({ dsn: 'https://0294800f6353458981e93ee9fbc10798@sentry.io/1894799' });

// Sentry Request Handler
app.use(Sentry.Handlers.requestHandler());

// Sentry Error Handler
app.use(Sentry.Handlers.errorHandler());
// END

// Mount middleware to PATH
app.use("/autotrader", autotrader);

// Listen for connections
app.listen(4000);
