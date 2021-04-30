import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

const pkg = require('./package.json');

export default {
	input: 'src/index.ts',
	output: [
		{ file: pkg.main, format: 'umd', name: 'SmoothScroll', globals: { 'velocity-animate': 'Velocity' }, sourcemap: true },
		{ file: pkg.module, format: 'esm', sourcemap: true },
	],
	external: [
		...Object.keys(pkg.dependencies || {}),
		...Object.keys(pkg.peerDependencies || {}),
	],
	plugins: [
		resolve(),
		typescript(),
		babel({
			exclude: 'node_modules/**',
		}),
	],
}
