'use strict';

var
	gulp = require('gulp'),
	fs = require('fs'),
	Promise = require('bluebird'),
	del = require('del'),
	jshint = require('gulp-jshint'),
	nom = require('nomnom'),
	exec = require('child_process').exec,
	stylish = require('jshint-stylish');

var args = nom
	.script('gulp')
	.option('task', {position:0, default:'build', help:'Optional specific gulp task to execute. Defaults to "build".'})
	.option('production', {abbr:'P', flag:true, default:false, help:'Build in production mode.'})
	.option('source-maps', {flag:true, default:true, help:'Whether or not to build source-maps.'})
	.option('cache', {flag:true, default:true, help:'Enables the use of a cache-file.'})
	.option('clean', {flag:true, default:false, help:'This will empty the outdir before writing any new files to it.'})
	.option('log-level', {abbr:'l', default:'error', help:'Log level; available options are [fatal, error, warn, info, debug, trace].'})
	.option('log-json', {flag:true, default:false, help:'Enable this flag to ensure the output of the logging is the normal bunayn ' +
			'"JSON" format to STDOUT that can be piped to their separate bunyan cli tool for filtering.'})
	.option('user', {flag:true, default:true, help:'Set this to false when executing from an automated script or in ' +
			'an environment where a user-environment should not be used.'})
	.option('script-safe', {flag:false, default:false, help:'Similar "user" option, except for older versions of enyo-dev'})
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

	
	if(args.clean) {
		return clean().then(function() {
			return promiseStrawman(samples);
		});
	} else {
		return promiseStrawman(samples);
	}
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

function promiseStrawman(samples) {
	console.log('Building Enyo-Strawman for ' + samples.join(', ') + '...');
	var samplers = [promiseSampler()];
	for(var i=0; i<samples.length; i++) {
		samplers.push(promiseSampler(samples[i]));
	}
	return Promise.all(samplers);
}

function promiseSampler(item) {
	var target = '.';
	var cmd = 'enyo pack . --title=Sampler --no-clean -l ' + args['log-level'];
	cmd += (args.production) ? ' -P' : '';
	cmd += (args['source-maps']) ? ' --source-maps' : ' --no-source-maps';
	cmd += (args.cache) ? ' --cache' : ' --no-cache';
	cmd += (args['log-json']) ? ' --log-json ' : '';
	cmd += (args.user) ? '' : ' --no-user';
	cmd += (args['script-safe']) ? ' --script-safe' : '';
	
	if(item) {
		target = './src/' + item.replace('-light', '') + '-samples';
		cmd += ' -d ../../dist/' + item.replace('-extra', '');
		if(item.indexOf('moonstone')>-1 && item.indexOf('-light')>-1) {
			cmd += ' --less-var=@moon-theme:light';
		}
	} else {
		cmd += ' --head-scripts=./config.js';
	}
	return promiseExec(cmd, {cwd:target});
}

process.stdout.setMaxListeners(0);
process.stderr.setMaxListeners(0);

function promiseExec(cmd, opts) {
	opts = opts || {cwd:process.cwd()};
	return new Promise(function(resolve, reject) {
		var child = exec(cmd, opts, function(err, stdout, stderr) {
			if(err)
				reject(err);
			else
				resolve();
		});
		child.stdout.pipe(process.stdout);
		child.stderr.pipe(process.stderr);
	});
}
