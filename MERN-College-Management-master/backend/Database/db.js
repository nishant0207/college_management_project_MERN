require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://admin:admin123@test1.fuarehv.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = () => {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => {
      console.log("Connected to MongoDB Successfully");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB", error);
    });
};

module.exports = connectToMongo;
