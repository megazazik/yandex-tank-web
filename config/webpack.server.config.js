'Use strict';
const path = require('path');
const { createServerEntry } = require('@megazazik/build');
const common = require('./common');

module.exports = createServerEntry({
	...common,
	entry: {index: './src/entries/server/index'},
	emitFiles: false,
	outputPath: path.resolve(__dirname, '../dist'),
});