const express = require("express");
const app = express();
const shortUrl = require("./routes/route");
const cors = require('cors')
app.use(cors())

app.use(express.json());

app.use("/", shortUrl);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
