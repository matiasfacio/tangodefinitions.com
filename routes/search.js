const express = require("express");
const { json } = require("express");
const routes = express.Router();
const Entry = require("../models/entry.js");

// middleware

routes.use(json());

routes.get("/searchall", (req, res) => {
  console.log("search all");
  Entry.find()
    .sort({ createdAt: -1 })
    .then((response) => JSON.stringify(response))
    .then((response) =>
      response.length ? res.status(200).send(response) : res.send("nothing yet")
    )
    .catch((err) => console.log(err));
});

routes.get("/:entry", (req, res) => {
  const entry = req.params.entry;
  console.log(entry);
  Entry.find(
    {
      $or: [
        { definition: { $regex: entry, $options: "i" } },
        { title: { $regex: entry, $options: "i" } },
      ],
    },
    (error, quest) => {
      if (error) {
        console.log(error);
        return res.send("nothing founded"); //added this
      }
      console.log(quest);
      const questParsed = JSON.stringify(quest);
      res.send(questParsed);
    }
  );
});

module.exports = routes;
