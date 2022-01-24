// "use strict";
// const path = require("path");
const express = require("express");
// require("dotenv").config();
const PORT = 8000;
const {
  // NOPE getUserAccount,
  getAllActionsByUserEmail,
  getDoneListByUserEmail,
  //
  getSingleAction,
  addAction,
  updateAction,
  starAction,
  completeAction,
  deleteAction,
} = require("./handlers");

express()
  // .use(morgan("tiny"))
  .use(express.json())

  .get("/hello", (req, res) => {
    res.status(200).json({ Hello: "Hello Friend!" });
  })

  // ---------------------------------
  // add new endpoints here 👇

  // TESTED
  .get("/accounts/:useremail/actions", getAllActionsByUserEmail)
  .get("/accounts/:useremail/actions/donelist", getDoneListByUserEmail)
  .get("/accounts/:useremail/actions/:_id", getSingleAction)
  .post("/accounts/:useremail/actions/:_id", addAction)
  .delete("/accounts/:useremail/actions/:_id", deleteAction)
  .put("/accounts/:useremail/actions/:_id", updateAction)
  .post("/accounts/:useremail/actions/:_id/star", starAction)
  .post("/accounts/:useremail/actions/:_id/complete", completeAction)

  // .get("/accounts/:useremail", getUserAccount)
  // .post("/accounts", addUser)
  // create new user

  // endpoint is = link for front-end

  // add new endpoints here ☝️
  // ---------------------------------

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, function () {
    console.info("🌍 Listening on port " + PORT);
  });
