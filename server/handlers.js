"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");

const { actions } = require("./data");

// CONFIRMED
const getAllActionsByUserEmail = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("peaceofmind");
  const { useremail } = req.params;
  const actions = await db
    .collection("actionsCollection")
    .find({ useremail, completed: false })
    // find all actions that match this useremail
    .toArray();
  res
    .status(200)
    .json({ status: 200, message: "Success all my actions!", actions });
  console.log(actions);
  client.close();
};

// CONFIRMED
const getDoneListByUserEmail = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("peaceofmind");
  const { useremail } = req.params;
  const actions = await db
    .collection("actionsCollection")
    .find({ useremail })
    .toArray();
  // let doneList = actions.map((action) => {

  const doneListFiltered = actions.filter(
    (action) => action.completed === true
  );
  res.status(200).json({
    status: 200,
    message: "Hurray my done list!",
    actions: doneListFiltered,
  });
  client.close();
};

//Get user account
// const getUserAccount = async (req, res) => {
//   const client = new MongoClient(MONGO_URI, options);
//   await client.connect();
//   const { _id } = req.params;
//   const db = client.db("peaceofmind");
//   db.collection("usersCollection").findOne({ _id }, (err, result) => {
//     console.log(result);
//     result
//       ? res.status(200).json({ status: 200, _id, data: result })
//       : res.status(400).json({ status: 400, _id, data: "No user!" });
//     client.close();
//   });
// };

// CONFIRMED
const getSingleAction = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const { _id } = req.params;
  const db = client.db("peaceofmind");
  db.collection("actionsCollection").findOne({ _id }, (err, result) => {
    console.log(result);
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(400).json({ status: 400, _id, data: "No action found!" });
    client.close();
  });
};

// CONFIRMED
const addAction = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("peaceofmind");
    const newAction = {
      ...req.body,
      _id: uuidv4(),
      time: Date(),
      completed: false,
      priority: false,
    };
    // req.body
    // Contains key-value pairs of data submitted in the request body.
    // By default, it is undefined, and is populated when you use body-parsing middleware such as express.json() or express.urlencoded().
    const result = await db
      .collection("actionsCollection")
      .insertOne(newAction);
    res.status(200).json({ status: 200, data: result });
  } catch (err) {
    res.status(400).json({
      status: 400,
      data: req.body,
      message: "Try adding action again!",
    });
    console.log(err.stack);
  }
  client.close();
};

// CONFIRMED
const updateAction = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const { _id } = req.params;
  const db = client.db("peaceofmind");
  await db
    .collection("actionsCollection")
    .updateOne({ _id }, { $set: { action: req.body.action } });
  res.status(200).json({ status: 200, _id, ...req.body });
  client.close();
};

// CONFIRMED

const completeAction = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const { _id } = req.params;
  const db = client.db("peaceofmind");
  await db
    .collection("actionsCollection")
    .updateOne({ _id }, { $set: { completed: true } });
  res.status(200).json({ status: 200, _id, ...req.body });
  client.close();
};

// CONFIRMED

const deleteAction = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const { _id } = req.params;
  const db = client.db("peaceofmind");
  await db.collection("actionsCollection").deleteOne({ _id: _id });
  res.status(200).json({ status: 200, message: "Action deleted!" });
  client.close();
};

const starAction = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const { _id } = req.params;
  const db = client.db("peaceofmind");
  await db
    .collection("actionsCollection")
    .updateOne({ _id }, { $set: { priority: true } });
  res.status(200).json({ status: 200, _id, ...req.body });
  client.close();
};

module.exports = {
  getAllActionsByUserEmail,
  getDoneListByUserEmail,
  getSingleAction,
  addAction,
  updateAction,
  completeAction,
  deleteAction,
  starAction,
  // getUserAccount,
  // addUser
};
