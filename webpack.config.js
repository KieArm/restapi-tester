const path = require("path");

module.exports = {
  entry: {
    app: ["babel-polyfill", "./src/app.js"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "app.bundle.js",
  },
  mode: "development",
};
