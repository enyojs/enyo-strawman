'use strict';

var
	gulp = require('gulp'),
	fs = require('fs'),
	Promise = require('bluebird'),
	jshint = require('gulp-jshint'),
	nom = require('nomnom'),
	rimraf = Promise.promisify(require('rimraf')),
	exec = require('child_process').exec,
	stylish = require('jshint-stylish');

var args = nom
	.script('gulp')
	.option('task', {position:0, default:'build', help:'Optional specific gulp task to execute. Defaults to "build".'})
	.option('production', {abbr:'P', flag:true, default:false, help:'Build in production mode.'})
	.option('source-maps', {flag:true, default:true, help:'Whether or not to build source-maps.'})
	.option('cache', {flag:true, default:true, help:'Enables the use of a cache-file.'})
	.option('clean', {flag:true, default:false, help:'This will empty the outdir before writing any new files to it.'})
	.option('samples', {flag:false, abbr: 's', help:'Comma-separated list of samples to build overriding the standard (e.g. enyo,moonstone,spotlight).'})
	.option('log-level', {abbr:'l', default:'error', help:'Log level; available options are [fatal, error, warn, info, debug, trace].'})
	.option('log-json', {flag:true, default:false, help:'Enable this flag to ensure the output of the logging is the normal bunayn ' +
			'"JSON" format to STDOUT that can be piped to their separate bunyan cli tool for filtering.'})
	.option('user', {flag:true, default:true, help:'Set this to false when executing from an automated script or in ' +
			'an environment where a user-environment should not be used.'})
	.parse();

gulp.task('default', ['build']);
gulp.task('build', build);
gulp.task('build-all', buildAll);
gulp.task('moonstone-extra', moonstone);
gulp.task('garnet', garnet);
gulp.task('sunstone', sunstone);
gulp.task('clean', clean);
gulp.task('jshint', lint);


function build() {
	return buildStrawman([
		'enyo', 'moonstone', 'layout', 'spotlight', 'enyo-ilib', 'onyx', 'canvas', 'svg', 'enyo-webos'
	]);
}

function buildAll() {
	var samples = fs.readdirSync('./src');
	for(var i=0; i<samples.length; i++) {
		if(samples[i].indexOf('-samples') > -1) {
			samples[i] = samples[i].replace('-samples', '');
		} else {
			samples.splice(i, 1);
			i--;
		}
	}
	return buildStrawman(samples);
}

function moonstone() {
	return buildStrawman([
		'enyo', 'moonstone-extra', 'layout', 'spotlight', 'enyo-ilib', 'onyx', 'canvas', 'svg', 'enyo-webos'
	]);
}

function garnet() {
	return buildStrawman([
		'enyo', 'garnet', 'layout', 'enyo-ilib', 'canvas', 'svg', 'enyo-webos'
	]);
}

function sunstone() {
	return buildStrawman([
		'enyo', 'sunstone', 'layout', 'enyo-ilib', 'canvas', 'svg', 'enyo-webos'
	]);
}

function writeConfig(samples) {
	var output = '';
	var exportsObject = {};
	for(var i=0; i<samples.length; i++) {
		if(samples[i] === 'enyo-ilib') {
			exportsObject[samples[i]] = 'iLib';
		} else if(samples[i] === 'enyo-webos') {
			exportsObject[samples[i]] = 'webOS';
		} else {
			var name = samples[i].replace('enyo-', '').replace('-extra', '').replace('-', ' ');
			name = name.replace(/\w\S*/g, function(str){return str.slice(0, 1).toUpperCase() + str.slice(1);});
			exportsObject[samples[i].replace('-extra', '')] = name;
		}
	}
	output += 'window.strawmanConfig = ' + JSON.stringify(exportsObject, null, '\t') + ';\n';
	fs.writeFileSync('./config.js', output, {encoding:'utf8'});
}

function buildStrawman(samples) {
	samples = (args.samples) ? args.samples.split(',') : samples;
	var mI = samples.indexOf('moonstone');
	var meI = samples.indexOf('moonstone-extra');
	if(meI > -1) {
		if(mI > -1) {
			samples.splice(mI, 1);
			meI = samples.indexOf('moonstone-extra');
		}
		samples.splice(meI+1, 0, 'moonstone-extra-light');
	} else {
		if(mI > -1) {
			samples.splice(mI+1, 0, 'moonstone-light');
		}
	}
	writeConfig(samples);
	
	if(args.clean) {
		return clean().then(function() {
			return promiseStrawman(samples);
		});
	} else {
		return promiseStrawman(samples);
	}
}

function clean() {
	return rimraf('./dist', {disableGlob:true});
}

function lint () {
	return gulp
		.src(['./src/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter(stylish, {verbose: true}))
		.pipe(jshint.reporter('fail'));
}

function promiseStrawman(samples) {
	var enyo = require('enyo-dev');
	var opts = samplerOpts().options;
	opts.subpackage = [];
	for(var i=0; i<samples.length; i++) {
		opts.subpackage.push(samplerOpts(samples[i]));
	}
	console.log('Building Enyo-Strawman...');
	var packager = enyo.packager(opts);
	packager.on('subpackage', function(e) {
		console.log('Building ' + e.options.outDir.replace('../../dist/', '') +
			' samples...');
	})
	var promiseOn = Promise.promisify(packager.on, {context:packager});
	return promiseOn('end');
}

function samplerOpts(item) {
	var target = '.';
	var opts = {
		package: '.',
		sourceMaps: args['source-maps'],
		clean: false,
		cache: args.cache,
		production: args.production,
		title: 'Sampler',
		logLevel: args['log-level'],
		logJson: args['log-json'],
		user: args.user
	};
	if(item) {
		target = './src/' + item.replace('-light', '') + '-samples';
		opts.outDir = '../../dist/' + item.replace('-extra', '');
		if(item.indexOf('moonstone')>-1 && item.indexOf('-light')>-1) {
			opts.lessVars = [{name: '@moon-theme', value: 'light'}];
		}
	} else {
		opts.headScripts = ['./config.js'];
	}
	return {name:target, options:opts};
}
