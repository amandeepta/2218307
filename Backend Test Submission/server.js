const express = require("express");
const app = express();
const shortUrl = require("./routes/route");

app.use(express.json());

app.use("/", shortUrl);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
