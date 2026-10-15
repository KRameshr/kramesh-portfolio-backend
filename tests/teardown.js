const mongoose = require("mongoose");

module.exports = async () => {
  if (global.__EXPRESS_SERVER__) {
    await new Promise((resolve) => {
      global.__EXPRESS_SERVER__.close(() => {
        resolve();
      });
    });
  }

  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    await mongoose.disconnect();
  }
};
