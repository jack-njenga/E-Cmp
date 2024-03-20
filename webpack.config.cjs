const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        index: path.resolve(__dirname, "./static/scripts/app.js")
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "bundle.js"
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader',
          },
        ],
      }, 
}