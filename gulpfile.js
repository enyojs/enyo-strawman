'use strict';

var
	gulp = require('gulp'),
	fs = require('fs'),
	enyo = require('enyo-dev'),
	Promise = require('bluebird'),
	del = require('del'),
	jshint = require('gulp-jshint'),
	nom = require('nomnom'),
	stylish = require('jshint-stylish');

var args = nom
	.option('P', {
		full: 'production',
		flag: true
	})
	.parse();


gulp.task('default', ['build']);
gulp.task('build', build);
gulp.task('build-all', buildAll);
gulp.task('moonstone', moonstone);
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
	var hasWebOS = (samples.indexOf('enyo-webos') > -1);
	var output = '';
	if(hasWebOS) {
		output += 'var platform = require(\'enyo/platform\');\n\n';
	}
	var exportsObject = {};
	for(var i=0; i<samples.length; i++) {
		if(samples[i] === 'enyo-ilib') {
			exportsObject[samples[i]] = 'iLib';
		} else if(samples[i] !== 'enyo-webos') {
			var name = samples[i].replace('enyo-', '').replace('-extra', '').replace('-', ' ');
			name = name.replace(/\w\S*/g, function(str){return str.slice(0, 1).toUpperCase() + str.slice(1);});
			exportsObject[samples[i].replace('-extra', '')] = name;
		}
	}
	output += 'module.exports = ' + JSON.stringify(exportsObject, null, '\t') + ';\n\n';
	if(hasWebOS) {
		output += 'if(platform.webos) {\n\tmodule.exports[\'enyo-webos\'] = \'webOS\';\n}\n';
	}
	fs.writeFileSync('./src/strawman/config.js', output, {encoding:'utf8'});
}

function buildStrawman(samples) {
	var cwd = process.cwd();
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
	samples.unshift('.');
	
	console.log('Building Enyo-Strawman...');
	
	return Promise.reduce(samples, function(_, item, index, length) {
		process.chdir(cwd);
		var target = item.replace('-light', '');
		var theme = 'dark';
		if(item.indexOf('-light') > -1) {
			theme = 'light'
		}
		var opts = {
			package: '.',
			sourceMaps: false,
			clean: false,
			cache: false,
			production: args.P,
			lessVars: [{
				name: '@moon-theme',
				value: theme
			}],
			title: 'Sampler',
			logLevel: 'error'
		};
		if(item!=='.') {
			target = './src/' + target + '-samples';
			opts.outdir = '../../dist/' + item.replace('-extra', '');
			console.log('Building ' + item + ' samples...');
		}
		process.chdir(target);
		return enyo.package(opts);
	}, null);
}

function clean() {
	return del(['./dist']);
}

function lint () {
	return gulp
		.src(['./src/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter(stylish, {verbose: true}))
		.pipe(jshint.reporter('fail'));
}
