const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");
const { name } = require("ejs");

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };
  const existingUser = await collection.findOne({ name: data.name });

  if (existingUser) {
    res.send(`Użytkownik już istnieje. Użyj innej nazwy`);
  } else {
    const saltRouds = 10;
    const zaszyfrowaneHasło = await bcrypt.hash(data.password, saltRouds);
    data.password = zaszyfrowaneHasło;
    const userData = await collection.create(data);
    console.log(userData);
    res.redirect("/");
  }
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.username });
    if (!check) {
      res.send("Nie znana nazwa użytkownika");
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (isPasswordMatch) {
      res.render("home");
    } else {
      req.send("złe hasło");
    }
  } catch {
    res.send("złe dane");
  }
});

const port = 5500;

app.listen(port, () => {
  console.log("server działa");
});
