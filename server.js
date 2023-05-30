const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const acctypesModel = require("./model/acctypesModel");
const branchesModel = require("./model/branchesModel");
const navsModel = require("./model/navsModel");
const cardsModel = require("./model/cardsModel");
const usersModel = require("./model/usersModel");
const transModel = require("./model/transModel");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());
const appsecrateid = "urbanbank505511";

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

app.post("/addnav", async (req,res)=>{
  const newNav= new navsModel({...req.body, isActive : true})
  await newNav.save();
  res.send("Successfully added the Navigation!")

})

app.get("/cards", async (req, res) => {
  const result = await cardsModel.find({});
  res.json(result);
});

app.post("/addcard", async (req, res) => {
  const newCard = new cardsModel(req.body);
  await newCard.save();
  res.json("Card is added successfully!!");
});

app.post("/adduser", async (req, res) => {
  const newUser = new usersModel({ ...req.body, isActive: true });
  await newUser.save();
  res.json(
    `Congratulation, ${req.body.fname} ${req.body.lname} for registration.`
  );
});

app.post("/login", async (req, res) => {
  const result = await usersModel.find(req.body);
  if (result.length > 0) {
    const { username, contact, email, fname, lname, accno } = result[0];
    const payload = { fname, lname, username, contact, email, accno };
    const token = jwt.sign(payload, appsecrateid);
    res.json(token);
  } else {
    res.status(401).json("Invalid user, please check username or password.");
  }
});

app.post("/addtrans", async (req, res) => {
  const transdate = Date.now();
  const payload = { ...req.body, transdate };
  const newTrans = new transModel(payload);
  await newTrans.save();
  res.json("Transaction added successfully!");
});
app.post("/alldebits", async (req, res) => {
  const payload = { ...req.body, transtype: "D" };
  const result = await transModel.find(payload);
  const allamount = result.map((item) => item.amount);
  const totamount = allamount.reduce((acc, curr) => acc + curr);
  res.json(totamount);
});

app.post("/allcredits", async (req, res) => {
  const payload = { ...req.body, transtype: "C" };
  const result = await transModel.find(payload);
  const allamount = result.map((item) => item.amount);
  const totamount = allamount.reduce((acc, curr) => acc + curr);
  res.json(totamount);
});
app.post("/balance", async (req, res) => {
  const payload = { ...req.body };
  const result = await transModel.find(payload);
  const alldebits = result
    .filter((item) => item.transtype === "D")
    .map((item) => item.amount)
    .reduce((acc, curr) => acc + curr);
  const allcredits = result
    .filter((item) => item.transtype === "C")
    .map((item) => item.amount)
    .reduce((acc, curr) => acc + curr);
  const balance = allcredits - alldebits;
  res.json(balance);
});
app.post("/alltrans", async (req, res) => {
  const result = await transModel.find(req.body);
  res.json(result);
});
app.listen(2525, () => {
  console.log("Service is running on PORT : 2525....");
});
