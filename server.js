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
const domain = require("./modules/handlers/Domains");
// END

// START - Sentry Init
// Sentry Init
Sentry.init({ dsn: process.env.SENTRY_DSN });

// Sentry Request Handler
app.use(Sentry.Handlers.requestHandler());

// Sentry Error Handler
app.use(Sentry.Handlers.errorHandler());
// END

// Mount middleware to PATH [ AutoTrader ]
app.use("/domain", domain);

// Listen for connections
app.listen(process.env.PORT);
