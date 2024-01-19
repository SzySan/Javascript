const mongoose = require("mongoose");
const connect = mongoose.connect(
  "mongodb+srv://admin:admin12345@baza.giaokif.mongodb.net/?retryWrites=true&w=majority"
);

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
