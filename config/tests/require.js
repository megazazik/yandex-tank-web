// tsconfig paths
const tsConfig = require('../../tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');

tsConfigPaths.register({
	baseUrl: tsConfig.compilerOptions.baseUrl,
	paths: tsConfig.compilerOptions.paths
});

// mock styles
require('mock-css-modules').register(['.less']);

// transpilers
require('ts-node').register({
	project: 'tsconfig.tests.json',
	disableWarnings: false
});

// error handling
require('tape-catch');