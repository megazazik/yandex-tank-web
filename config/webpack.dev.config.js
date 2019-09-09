'Use strict';
const { createClientEntry } = require('@megazazik/build');
const common = require('./common');

const config = createClientEntry({
	...common,
	entry: {index: './src/dev/index'},
	emitFiles: true,
	tsconfig: 'tsconfig.dev.json',
});

config.optimization.removeEmptyChunks = false;

module.exports = config;