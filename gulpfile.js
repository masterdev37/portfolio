const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const scss = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const ssi = require("gulp-ssi");
const del = require('del');
const bssi = require('browsersync-ssi');

function browsersync() {
	browserSync.init({
		server: { 
			baseDir: 'app/',
			middleware: bssi({ baseDir: 'app/', ext: '.html' })
		},
		online: true,
		notify: false
	})
}

function scripts() {
	return src([
		'app/js/jquery-3.6.0.min.js',
		'app/js/swiper-bundle.min.js',
		'app/js/fancybox.umd.js',
		'app/js/jquery.inputmask.min.js',
	])
	.pipe(concat('app.min.js'))
	.pipe(uglify())
	.pipe(dest('app/js/'))
	.pipe(browserSync.stream())
}

function styles() {
	return src([
		'app/scss/main.scss',
		])
	.pipe(scss())
	.pipe(concat('main.min.css'))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
	.pipe(cleancss(( { level: { 1: { specialComments: 0 } } } )))
	.pipe(dest('app/css/'))
	.pipe(browserSync.stream())
}

function stylesLibs() {
	return src([
		'app/scss/libs.scss',
		])
	.pipe(scss())
	.pipe(concat('libs.min.css'))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
	.pipe(cleancss(( { level: { 1: { specialComments: 0 } } } )))
	.pipe(dest('app/css/'))
	.pipe(browserSync.stream())
}

function images() {
	return src('app/images/**/*')
	.pipe(newer('app/images/'))
	.pipe(imagemin())
	.pipe(dest('dist/images/'))
}

function cleanimg() {
	return del('app/images/**/*', { force: true })
}

function cleandist() {
	return del('dist/**/*',  {force: true })
}

function buildCopy() {
	return src([
		'app/css/**/*.min.css',
		'app/css/**/*.css',
		'app/js/app.min.js',
		'app/js/script.js',
		'app/**/*.html',
		'app/fonts/**/*',
		'app/images/**/*',
		'app/**/*.ico',
		'!app/parts/**/*.html',
	], { base: 'app' })
	.pipe(dest('dist'));
}

function buildHtml() {
	return src(['app/**/*.html', '!app/parts/**/*'])
	.pipe(ssi({ root: 'app/' }))
	.pipe(dest('dist'));
}

function startWatch() {
	watch('app/**/*.scss', styles)
	watch(['app/**/*.js', '!app/**/*.min.js'])
	watch('app/**/*.html').on('change', browserSync.reload);
	// watch('app/scss/animate/animate.scss', stylesLibs);
	watch('gulpfile.js', scripts);
	watch('app/scss/libs.scss', stylesLibs);
	watch('app/images/src/**/*', images);
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.stylesLibs = stylesLibs;
exports.images = images;
exports.cleanimg = cleanimg;
exports.cleandist = cleandist;
exports.build = series(cleandist, styles, stylesLibs, scripts, images, buildCopy, buildHtml);
exports.default = parallel(styles, stylesLibs, scripts, browsersync, startWatch);