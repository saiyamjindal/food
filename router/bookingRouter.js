const express = require("express");
const bookingRouter = express.Router();
const { protectRoute } = require("../controller/authController")
const { createSession } = require("../controller/bookingcontroller")
bookingRouter.post("/createSession", protectRoute, createSession);
module.exports = bookingRouter;