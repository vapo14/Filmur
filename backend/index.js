require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const routes = require("./routes");
const port = process.env.PORT || 8000;
const cors = require("cors");

app.use(cors());

app.use(express.json());

// setup routes
app.use("/api", routes);
mongoose.connect(process.env.MONGO_STR);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
