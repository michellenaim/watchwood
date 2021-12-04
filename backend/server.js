const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
require("./app/models/post.model.js");

require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .on("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", (err) => {
    console.log(`Connection error: ${err.message}`);
  });

require("./app/routes/post.router.js")(app);

const server = app.listen(8080, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log("App is listening at http://%s:%s", host, port);
});
