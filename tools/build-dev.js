const webpack = require('webpack');
const configFactory = require('../etc/webpack/config');
const config = configFactory('development');

console.log('Starting development build...');
webpack(config, (err, stats) => {
  if (err) {
    console.error('Webpack error:', err);
    process.exit(1);
  }
  
  const info = stats.toJson();
  if (stats.hasErrors()) {
    console.error('Build errors:', info.errors);
    process.exit(1);
  }
  
  if (stats.hasWarnings()) {
    console.warn('Build warnings:', info.warnings);
  }

  console.log('Build complete successfully!');
});
