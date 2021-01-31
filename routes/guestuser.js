const express = require("express");
const { json } = require("express");
const routes = express.Router();
const Entry = require("../models/entry.js");

//middleware

routes.use(json());

routes.use("*", (req, res, next) => {
  console.log("guest user routes");
  next();
});

// routes

routes.get("/search/:entry", (req, res) => {
  const entry = req.params.entry;
  Entry.find({ body: entry }, (error, quest) => {
    if (error) {
      console.log(error);
    }
    res.send(quest);
  });
});


module.exports = routes;