const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    stats: {
        children: false, // Hide children information
        maxModules: 0 // Set the maximum number of modules to be shown
    }
  }
};