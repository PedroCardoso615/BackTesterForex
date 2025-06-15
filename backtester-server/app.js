const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const userRouter = require("./router/userRouter");
const tradeRouter = require("./router/tradeRouter");
const forexRouter = require("./router/forexRouter");

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRouter);
app.use("/trades", tradeRouter);
app.use("/forex", forexRouter);

module.exports = app;
