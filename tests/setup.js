const mongoose = require("mongoose");

process.env.DOTENV_CONFIG_QUIET = "true";
require("dotenv").config({ quiet: true });

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    await mongoose.disconnect();
  }
});
