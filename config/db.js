require("dotenv").config({ quiet: true });
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    let dbString =
      "mongodb+srv://{{uname}}:{{upassword}}@cluster0.{{dbstring}}.mongodb.net/{{dbname}}?appName=Cluster0";

    dbString = dbString
      .replace("{{uname}}", process.env.DB_USERNAME)
      .replace("{{upassword}}", process.env.DB_PASSWORD)
      .replace("{{dbstring}}", process.env.DB_STRING)
      .replace("{{dbname}}", process.env.DB_NAME);

    await mongoose.connect(dbString);

    if (process.env.NODE_ENV !== "test") {
      console.log("DB Connected successfully");
    }
  } catch (err) {
    if (process.env.NODE_ENV !== "test") {
      console.error("DB Connection Error:", err.message);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
