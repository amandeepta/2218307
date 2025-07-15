const logActivity = require("../middleware/log");
const { createCode } = require("../utils/shortUrl");
const { isValidURL } = require("../utils/valid");

const baseHost = "https://localhost:5000"

async function createShortURL(req, res) {
  const { url, validity = 30, shortcode } = req.body;

  try {

    if (!url || typeof url !== "string" || !isValidURL(url)) {
      await logActivity("backend", "error", "utils", "Missing or invalid URL in request");
      return res.status(400).json({ error: "Provided URL is not valid." });
    }

   
    let finalCode = shortcode || createCode(6);


    const expiryTimestamp = new Date(Date.now() + validity * 60 * 1000).toISOString();

    const response = {
      shortLink: `${baseHost}/${finalCode}`,
      expiry: expiryTimestamp
    };

    await logActivity("backend", "info", "controller", `Short URL generated for ${url}`);
    return res.status(201).json(response);

  } catch (error) {
    await logActivity("backend", "error", "controller", "Unexpected server error during short URL creation");
    return res.status(500).json({ error: "Something went wrong on the server." });
  }
}

module.exports = { createShortURL };
