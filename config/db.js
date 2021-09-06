require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

const connect = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch (error) {
    console.error(error);
  }
};

mongoose.connection.on(
  "error",
  console.error.bind(console, "Connection error: ")
);

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

module.exports = { connect };
