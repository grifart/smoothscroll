import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';

import pkg from './package.json' with {type: 'json'};

export default {
	input: 'src/index.ts',
	output: {
		file: pkg.main,
		format: 'esm',
		sourcemap: true,
	},
	external: [
		/@babel\/runtime/, // see https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
		...Object.keys(pkg.dependencies || {}),
		...Object.keys(pkg.peerDependencies || {}),
	],
	plugins: [
		typescript(),
		babel({
			babelHelpers: 'runtime',
			exclude: 'node_modules/**',
			plugins: ['@babel/plugin-transform-runtime'],
		}),
	],
}
