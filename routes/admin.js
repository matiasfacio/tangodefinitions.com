const express = require("express");
const bcrypt = require("bcrypt");
const fs = require("fs");
const { json } = require("express");
const Entry = require("../models/entry.js");
const { findOneAndDelete } = require("../models/entry.js");

const routes = express.Router();

routes.use(json());

routes.post("/registerAdmin", async (req, res) => {
  console.log("register admin");
  console.log(req.body);
  const password = req.body.password;
  try {
    const encryptedPass = await bcrypt.hash(password, 10);
    const admindata = {
      email: req.body.email,
      password: encryptedPass,
    };
    fs.writeFile(
      "./config/admin-config.json",
      JSON.stringify(admindata),
      (err) => {
        console.log(err);
      }
    );
    res.status(200);
  } catch {
    (err) => console.log(err);
    res.status(500).send("sorry");
  }

  res.end();
});

routes.post("/login", (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  try {
    fs.readFile("./config/admin-config.json", "utf-8", async (err, data) => {
      if (err) return res.send(500);
      parsedData = JSON.parse(data);
      if (parsedData.email !== email) {
        return res.status(400).send("wrong email");
      }
      const result = await bcrypt.compare(password, parsedData.password);
      console.log(result);
      if (result) {
        return res.status(200).send("login succesful");
      } else {
        return res.status(500).send("login failed");
      }
    });
  } catch (err) {
    res.send(500);
    console.log(err);
  }
});

routes.post("/add-definition", async (req, res) => {
  const newEntry = new Entry({
    title: req.body.title,
    snippet: req.body.snippet,
    definition: req.body.definition,
    video_link: req.body.video_link,
    language: req.body.language,
  });

  try {
    const response = await newEntry.save();
    res.status(200).end();
  } catch (error) {
    res.status(500).send("there was a problem, the entry couldn not be store");
  }
});

routes.put("/edit", async (req, res) => {
  console.log(req.body);
  try {
    const result = await Entry.replaceOne({ _id: req.body._id }, req.body);
    res.status(200).end()
  } catch (err) {
    console.log(err);
    res.status(400).end()
  }
});

routes.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const result = await Entry.findByIdAndDelete(id);
    res.status(200).send("done!");
  } catch (error) {
    console.log(error);
    res.status(500).send("failed to delete");
  }
});

module.exports = routes;
