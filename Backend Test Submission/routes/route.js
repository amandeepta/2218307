const express = require("express");
const router = express.Router();

const { createShortURL } = require("../controller/createUrl");

router.post("/shorturls", createShortURL);

module.exports = router;
