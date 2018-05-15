'use strict';

import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';


// BUILD

gulp.task('default', ['build']);

gulp.task('build', (cb) => {
	buildJs(cb);
});

gulp.task('watch', ['build'], () => {
	gulp.watch([
		'index.js',
		'visual.js',
	], ['build']);
});


const buildJs = (cb) => {
	const smoothScrollingFileName = 'visual.js';

	let bundler = browserify(smoothScrollingFileName, {debug: true});
	bundler.transform(babelify, {
		presets: ['env'],
		sourceMaps: true
	});

	bundler.bundle()
		.pipe(plumber())
		.pipe(source(smoothScrollingFileName))
		.pipe(rename('visual.dist.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write('.'))
		.pipe(plumber.stop())
		.pipe(gulp.dest('.'))
		.on('end', () => {
			cb();
		});
};
