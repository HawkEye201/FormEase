const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;

const database = () => {
  try {
    mongoose.connect(uri);
    mongoose.connection.on("connected", () => {
      console.log("Database connected");
    });
    mongoose.connection.on("error", (err) => {
      console.log("error in conncting to database", err);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = database();
