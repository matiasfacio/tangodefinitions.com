const express = require("express");
const bcrypt = require("bcrypt");
const fs = require("fs");
const { json } = require("express");
const Entry = require('../models/entry.js')

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
        password: encryptedPass
    }
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
      parsedData = JSON.parse(data)
      if (parsedData.email !== email) {
          return res.status(400).send('wrong email')
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

routes.post("/add-definition", (req, res) => {
  const newEntry = new Entry({
    title: req.body.title,
    snippet: req.body.snippet,
    definition: req.body.definition,
    video_link: req.body.video_link,
  });

  newEntry
    .save()
    .then((response) => res.send(response.body))
    .catch((err) => console.log(err));
});

module.exports = routes;
