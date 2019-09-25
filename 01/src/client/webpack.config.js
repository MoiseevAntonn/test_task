var path = require("path");

module.exports = {
  entry : "./main.js",
  output : {
    path : path.join(__dirname,"../public/build"),
    filename : "bundle.js",
  },
  devtool : "source-map",
  module : {
    rules : [
      {
        test : /(\.js$)|(\.jsx$)/,
        use : {
          loader : "babel-loader"
        },
        exclude : ["/node_modules/","/public/"]
      },
      {
        test : /\.css$/,
        use : ["style-loader","css-loader"],
        exclude : ["/node_modules/","/public/"]
      }
    ]
  }
}
