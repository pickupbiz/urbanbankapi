const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const acctypesModel = require("./model/acctypesModel");
const branchesModel = require("./model/branchesModel");
const navsModel = require("./model/navsModel");
const cardsModel = require("./model/cardsModel");

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

app.post("/addacctype", (req, res) => {
  const newAccType = new acctypesModel(req.body);
  newAccType.save();
  res.json("Successfully added Account Type!!!");
});

app.get("/branches", async (req, res) => {
  const result = await branchesModel.find({});
  res.json(result);
});

app.post("/addbranch", async (req, res) => {
  const newBranch = new branchesModel({ ...req.body, isActive: true });
  await newBranch.save();
  res.json("Successfully added new Branch!!!");
});
app.get("/navs", async (req, res) => {
  const result = await navsModel.find({ isActive: true });
  res.json(result);
});

app.get("/cards", async (req, res) => {
  const result = await cardsModel.find({});
  res.json(result);
});

app.post("/addcard", async (req, res) => {
  const newCard = new cardsModel(req.body);
  await newCard.save();
  res.json("Card is added successfully!!");
});
app.listen(2525, () => {
  console.log("Service is running on PORT : 2525....");
});
