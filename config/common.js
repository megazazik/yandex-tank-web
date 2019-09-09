const path = require('path');

module.exports = {
	publicPath: '/static/',
	outputPath: path.resolve(__dirname, '../public/static'),
	contextPath: path.resolve(__dirname, '../'),
}