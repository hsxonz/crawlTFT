const mongoose = require("mongoose");

const uri =
  "mongodb+srv://dbMember:O0gIMt3BB87r8SxF@cluster0.nibth.mongodb.net/TFT?retryWrites=true&w=majority";

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
