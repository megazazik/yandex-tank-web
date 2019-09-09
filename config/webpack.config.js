'Use strict';
const { createClientEntry } = require('@megazazik/build');
const common = require('./common');

const config = createClientEntry({
	...common,
	entry: {index: './src/entries/index'},
	emitFiles: true,
});

config.optimization.removeEmptyChunks = false;

module.exports = config;