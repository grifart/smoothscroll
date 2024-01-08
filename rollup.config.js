import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

import pkg from './package.json' with {type: 'json'};

export default {
	input: 'src/index.ts',
	output: [
		{ file: pkg.main, format: 'umd', name: 'SmoothScroll', globals: { 'velocity-animate': 'Velocity' }, sourcemap: true },
		{ file: pkg.module, format: 'esm', sourcemap: true },
	],
	external: [
		/@babel\/runtime/, // see https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
		...Object.keys(pkg.dependencies || {}),
		...Object.keys(pkg.peerDependencies || {}),
	],
	plugins: [
		resolve(),
		typescript(),
		babel({
			babelHelpers: 'runtime',
			exclude: 'node_modules/**',
			plugins: ['@babel/plugin-transform-runtime'],
		}),
	],
}
