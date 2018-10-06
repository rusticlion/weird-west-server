require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

const routes = require("./api/routes");

const port = process.env.PORT || 5050;
const corsOptions = {
  origin: "*",
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
};

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({ message: `Connected to the server on port ${port}` });
});
routes(app);

mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${
    process.env.DB_SERVER
  }`,
  { useNewUrlParser: true },
  () => {
    console.log("Connected to MongoDB on MLab.");
  }
);
mongoose.set("useCreateIndex", true);
// Fix deprecation warning for useFindOneandUpdate instead of useFindAndModify
mongoose.set("useFindAndModify", false);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
