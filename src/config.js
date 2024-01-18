const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/Users");

connect
  .then(() => {
    console.log("Database połączona");
  })
  .catch(() => {
    console.log("Database nie połączona");
  });

const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = new mongoose.model("uzytkownicy", loginSchema);

module.exports = collection;
