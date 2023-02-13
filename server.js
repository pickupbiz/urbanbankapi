const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const acctypesModel = require("./model/acctypesModel");
const branchesModel = require("./model/branchesModel");
const navsModel = require("./model/navsModel");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/urbanbankdb").then(() => {
  console.log("MongoDB is connected successfully!!!!!");
});

app.get("/", (req, res) => {
  res.send("Welcome to Urban Bank!");
});

app.get("/bu", (req, res) => {
  res.send("This is Banking Unit...");
});

app.get("/acctype", async (req, res) => {
  const result = await acctypesModel.find({});
  res.json(result);
});

app.get("/branches", async (req, res) => {
  const result = await branchesModel.find({});
  res.json(result);
});

app.get("/navs", async (req, res) => {
  const result = await navsModel.find({ isActive: true });
  res.json(result);
});

app.listen(2525, () => {
  console.log("Service is running on PORT : 2525....");
});
