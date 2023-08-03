const express = require("express");
const cors = require("cors");
const routes = require("./ApiContainer/routes/v1/routes");
require('dotenv').config()
const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(cors());

// any sample query for checking database connectivity
app.get("/healthcheck", (req, res) => {
  res.status(200).send('Health status ok')
});

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
