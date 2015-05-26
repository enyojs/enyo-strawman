var
	kind = require('enyo/kind');

var
	Application = require('enyo/Application'),
	Control = require('enyo/Control'),
	Router = require('./Router'),
	MasterList = require('./List');

module.exports = kind({
	name: 'Strawman',
	kind: Application,
	resetView: true,
	components: [
		{kind: Router}
	],
	create: kind.inherit(function (sup) {
		return function () {
			MasterList = new MasterList({samples: Object.keys(this.samples)});
			sup.apply(this, arguments);
		};
	}),
	goSample: function (sampler, sample) {
		this.log(sampler, sample);
		// it is possible that the base sampler requested isn't set or isn't the one we have set
		// so we ensure that it is setup before proceeding
		this.setupView(sampler, function (app, Sampler) {
			Sampler.set('sample', sample, true);
		});
	},
	goSampler: function (sample) {
		this.log(sample);
		this.setupView(sample, function (app) {
			app.reRender();
		});
	},
	reRender: function () {
		this.log();
		// @bug calling render doesn't always re-render when the base view was the same but it
		// actually does need to be updated
		this.view.teardownRender();
		this.render();
	},
	setupView: function (view, done) {
		
		var
			app = this,
			samples = this.samples,
			sample = !view || typeof view == 'string' ? (samples[view] || MasterList) : (samples[view.prototype.kindName] || view);
		
		if (sample instanceof window.request) {
			// we haven't loaded the sampler yet
			return sample.then(function (Sample) {
				samples[view] = Sample;
				app.setupView(view, done);
			});
		}
		
		// to avoid the current implementation details of ViewController where it destroys previous
		// views when they are present and the view property is updated, we instance the view away
		// from the controller so its owner property doesn't match and we can reuse it
		//
		// obviously this is a work-around since we have to bypass our own components tree and the
		// fundamental logic behind their relationships...
		if (!(sample instanceof Control)) {
			sample = samples[typeof view == 'string' ? view : view.prototype.kindName] = new sample({app: this});
		}
		
		if (sample !== this.view) this.set('view', sample);
		if (done) done(this, sample);
	}
});