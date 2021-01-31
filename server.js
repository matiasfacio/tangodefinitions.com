// NODE_ENV=production node server.js to run the server on production mode!!!

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const DB_KEY_TBC = process.env.DB_KEY_TBC;
const Entry = require("./models/entry");
const { json } = require("express");
const path = require("path");
const app = express();
const dev = app.get("env");

// adding routes
const adminroutes = require("./routes/admin.js");
const guestroutes = require("./routes/guestuser.js");

// middlewares

app.use(cors());
app.use(json());

// PORT

const PORT = process.env.PORT || 5000;
app.set("PORT", PORT);

// check for production mode

if (dev === "production") {
  app.disable("x-powered-by");
  app.use(morgan("common"));
  app.use(express.static(path.join(__dirname, "tango-def", "build")));
  console.log("production mode active:", dev);
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "tango-def", "build", "index.html"));
  });
}

if (dev !== "production") {
  app.use(morgan("dev"));
  console.log("mode", dev);
}

// use routes middleware

app.use("/adminarea", adminroutes);
app.use("/guest", guestroutes);

// connect to database

mongoose
  .connect(DB_KEY_TBC, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(PORT, () => {
      console.log(`listening at port ${PORT}`);
      console.log("connected to mongoDB");
    })
  )
  .catch((err) => console.log(err));

// routes

app.get("/", (req, res) => {
  res.send("<h1>MongoDB</h1>");
});

app.get("/searchall", (req, res) => {
  console.log("search all");
  Entry.find()
    .sort({ createdAt: -1 })
    .then((response) => JSON.stringify(response))
    .then((response) =>
      response.length ? res.status(200).send(response) : res.send("nothing yet")
    )
    .catch((err) => console.log(err));
});

app.get("/search/:entry", (req, res) => {
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
      }
      console.log(quest);
      res.send(quest);
    }
  );
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
