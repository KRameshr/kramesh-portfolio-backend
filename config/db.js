const mongoose = require("mongoose");

const connectDB = () => {
  let dbString =
    "mongodb+srv://{{uname}}:{{upassword}}@cluster0.{{dbstring}}.mongodb.net/{{dbname}}?appName=Cluster0";

  dbString = dbString
    .replace("{{uname}}", process.env.DB_USERNAME)
    .replace("{{upassword}}", process.env.DB_PASSWORD)
    .replace("{{dbstring}}", process.env.DB_STRING)
    .replace("{{dbname}}", process.env.DB_NAME);

  mongoose
    .connect(dbString)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB Error:", err));
};

module.exports = connectDB;
