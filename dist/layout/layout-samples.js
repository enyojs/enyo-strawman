(function (scope, bundled) {
	
	var   enyo     = scope.enyo || (scope.enyo = {})
		, manifest = enyo.__manifest__ || (defineProperty(enyo, '__manifest__', {value: {}}) && enyo.__manifest__)
		, exported = enyo.__exported__ || (defineProperty(enyo, '__exported__', {value: {}}) && enyo.__exported__)
		, require  = enyo.require || (defineProperty(enyo, 'require', {value: enyoRequire}) && enyo.require)
		, local    = bundled()
		, entries;

	// below is where the generated entries list will be assigned if there is one
	entries = ['index'];


	if (local) {
		Object.keys(local).forEach(function (name) {
			var value = local[name];
			if (manifest.hasOwnProperty(name)) {
				if (!value || !(value instanceof Array)) return;
			}
			manifest[name] = value;
		});
	}

	function defineProperty (o, p, d) {
		if (Object.defineProperty) return Object.defineProperty(o, p, d);
		o[p] = d.value;
		return o;
	}
	
	function enyoRequire (target) {
		if (!target || typeof target != 'string') return undefined;
		if (exported.hasOwnProperty(target))      return exported[target];
		var   request = enyo.request
			, entry   = manifest[target]
			, exec
			, map
			, ctx
			, reqs
			, reqr;
		if (!entry) throw new Error('Could not find module "' + target + '"');
		if (!(entry instanceof Array)) {
			if (typeof entry == 'object' && (entry.source || entry.style)) {
				throw new Error('Attempt to require an asynchronous module "' + target + '"');
			} else if (typeof entry == 'string') {
				throw new Error('Attempt to require a bundle entry "' + target + '"');
			} else {
				throw new Error('The shared module manifest has been corrupted, the module is invalid "' + target + '"');
			}
		}
		exec = entry[0];
		map  = entry[1];
		if (typeof exec != 'function') throw new Error('The shared module manifest has been corrupted, the module is invalid "' + target + '"');
		ctx  = {exports: {}};
		if (request) {
			if (map) {
				reqs = function (name) {
					return request(map.hasOwnProperty(name) ? map[name] : name);
				};
				defineProperty(reqs, 'isRequest', {value: request.isRequest});
			} else reqs = request;
		}
		reqr = !map ? require : function (name) {
			return require(map.hasOwnProperty(name) ? map[name] : name);
		};
		exec(
			ctx,
			ctx.exports,
			scope,
			reqr,
			reqs
		);
		return exported[target] = ctx.exports;
	}

	// in occassions where requests api are being used, below this comment that implementation will
	// be injected
	

	// if there are entries go ahead and execute them
	if (entries && entries.forEach) entries.forEach(function (name) { require(name); });
})(this, function () {
	// this allows us to protect the scope of the modules from the wrapper/env code
	return {'src/NameGenerator':[function (module,exports,global,require,request){
﻿// Licensed under Creative Commons Attribution 3.0 License
// attributed to: http://leapon.net/en/random-name-generator-javascript

/* exported makeName */
module.exports = {
	makeName: function (minlength, maxlength, prefix, suffix) {

		function rnd (minv, maxv) {
			if (maxv < minv) {
				return 0;
			}
			return Math.floor(Math.random()*(maxv-minv+1)) + minv;
		}

		prefix = prefix || '';
		suffix = suffix || '';
		// these weird character sets are intended to cope with the nature of English (e.g. char 'x' pops up less frequently than char 's')
		// note: 'h' appears as consonants and vocals
		var vocals = 'aeiouyh' + 'aeiou' + 'aeiou';
		var cons = 'bcdfghjklmnpqrstvwxz' + 'bcdfgjklmnprstvw' + 'bcdfgjklmnprst';
		var allchars = vocals + cons;
		var length = rnd(minlength, maxlength) - prefix.length - suffix.length;
		if (length < 1) {
			length = 1;
		}
		var consnum = 0;
		var i;
		if (prefix.length > 0) {
			for (i = 0; i < prefix.length; i++) {
				if (consnum == 2) {
					consnum = 0;
				}
				if (cons.indexOf(prefix[i]) != -1) {
					consnum++;
				}
			}
		}
		else {
			consnum = 1;
		}
		var name = prefix;
		for (i = 0; i < length; i++)
		{
			var touse;
			//if we have used 2 consonants, the next char must be vocal.
			if (consnum == 2)
			{
				touse = vocals;
				consnum = 0;
			}
			else {
				touse = allchars;
			}
			//pick a random character from the set we are goin to use.
			var c = touse.charAt(rnd(0, touse.length - 1));
			name = name + c;
			if (cons.indexOf(c) != -1) {
				consnum++;
			}
		}
		name = name.charAt(0).toUpperCase() + name.substring(1, name.length) + suffix;
		return name;
	}
};
}],'../strawman/LinkSupport':[function (module,exports,global,require,request){
/*
 * LinkSupport
 *
 * Add automatic on-tap support for controls with a href attribute
 */

require('enyo');

var
	kind = require('enyo/kind');

module.exports = {
	name: 'LinkSupport',
	tap: kind.inherit(function (sup) {
		return function (sender, ev) {
			sup.apply(this, arguments);
			var link = this.get('href') || ev.originator.get('href') || ev.originator.parent.get('href');
			if (link) {
				ev.preventDefault();
				window.location.href = link;
			}
		};
	})
};

}],'../strawman/Title':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

module.exports = kind({
	tag: 'h1'
});

}],'../strawman/AppRouter':[function (module,exports,global,require,request){
/*
 * AppRouter
 *
 * Hash sample routing for Enyo Strawman samples.
 */

require('enyo');

var
	kind = require('enyo/kind'),
	Router = require('enyo/Router');

module.exports = kind({
	kind: Router,
	useHistory: true,
	triggerOnStart: true,
	routes: [
		{path: ':sampleName/:locale', handler: 'handleRoute'},
		{path: ':sampleName', handler: 'handleRoute'},
		{path: '/:locale', handler: 'handleRouteLocaleOnly'}
	],
	events: {
		onRouteChange: ''
	},
	handleRoute: function (sampleName, locale) {
		this.doRouteChange({sampleName: sampleName, locale: locale || 'local'});
	},
	handleRouteLocaleOnly: function (locale) {
		this.handleRoute(null, locale);
	}
});


}],'../strawman/Link':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	LinkSupport = require('../LinkSupport');

module.exports = kind({
	name: 'Link',
	kind: Control,
	tag: 'span',
	classes: 'link',
	spotlight: true,
	mixins: [LinkSupport],
	badgeClassesChanged: function (was, is) {
		if (was) this.addRemoveClasses(was, false);
		if (is) this.addRemoveClasses(is, true);
	},
	addRemoveClasses: function (classes, state) {
		if (classes) {
			classes = classes.split(/\s+/);
			for (var i = 0; i < classes.length; i++) {
				this.addRemoveClass(classes[i], state);
			}
		}
	}
});

},{'../LinkSupport':'../strawman/LinkSupport'}],'src/FittableDescription':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Control = require('enyo/Control');

var
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows');

module.exports = kind({
	name: 'enyo.sample.FittableDescription',
	kind: Control,
	classes: 'fittable-sample-box',
	style: 'padding:10px;',
	components: [
		{tag: 'p', allowHtml: true, content: 'FittableColumns, no margin on boxes (all divs have some padding). By default, boxes "stretch" to fit the container (which must have a height).'},
		{kind: FittableColumns, classes: 'fittable-sample-height fittable-sample-box fittable-sample-o fittable-sample-mlr fittable-sample-mtb', components: [
			{content: 'BoxA', classes: 'fittable-sample-box'},
			{content: 'Fitting BoxB', fit: true, classes: 'fittable-sample-box'},
			{content: 'BoxC', classes: 'fittable-sample-box'}
		]},
		{tag: 'p', allowHtml: true, content: 'Boxes with left/right margins. Note: top/bottom margin on column boxes is NOT supported.'},
		{kind: FittableColumns, classes: 'fittable-sample-height fittable-sample-box fittable-sample-o fittable-sample-mlr fittable-sample-mtb', components: [
			{content: 'BoxA', classes: 'fittable-sample-box fittable-sample-mlr'},
			{content: 'Fitting BoxB', fit: true, classes: 'fittable-sample-box fittable-sample-mlr'},
			{content: 'BoxC', classes: 'fittable-sample-box fittable-sample-mlr'}
		]},
		{tag: 'p', allowHtml: true, content: 'With <code>noStretch: true</code>, boxes have natural height.'},
		{kind: FittableColumns, noStretch: true, classes: 'fittable-sample-height fittable-sample-box fittable-sample-o fittable-sample-mlr fittable-sample-mtb', components: [
			{content: 'BoxA', classes: 'fittable-sample-box fittable-sample-mlr'},
			{content: 'Fitting BoxB<br><br>with natural height', fit: true, allowHtml: true, classes: 'fittable-sample-box fittable-sample-mlr'},
			{content: 'BoxC', classes: 'fittable-sample-box fittable-sample-mlr'}
		]},
		{tag: 'p', allowHtml: true, content: 'FittableRows, no margin on boxes (all divs have some padding).'},
		{kind: FittableRows, classes: 'fittable-sample-height fittable-sample-box fittable-sample-o fittable-sample-mlr fittable-sample-mtb', components: [
			{content: 'BoxA', classes: 'fittable-sample-box'},
			{content: 'Fitting BoxB', fit: true, classes: 'fittable-sample-box'},
			{content: 'BoxC', classes: 'fittable-sample-box'}
		]},
		{tag: 'p', allowHtml: true, content: 'Row boxes may have margin in any dimension.<br><br> NOTE: Row boxes will collapse vertical margins according to css rules. If margin collapse is not desired, then "enyo-margin-expand" may be applied. Only in this case, left/right margin on row boxes is NOT supported.'},
		{kind: FittableRows, classes: 'fittable-sample-height fittable-sample-box fittable-sample-o fittable-sample-mlr fittable-sample-mtb', components: [
			{content: 'BoxA', classes: 'fittable-sample-box fittable-sample-mlr fittable-sample-mtb'},
			{content: 'Fitting BoxB', fit: true, classes: 'fittable-sample-box fittable-sample-mlr fittable-sample-mtb'},
			{content: 'BoxC', classes: 'fittable-sample-box fittable-sample-mlr fittable-sample-mtb'}
		]},
		{tag: 'p', allowHtml: true, content: 'With <code>noStretch: true</code>, boxes have natural width.<br><br> NOTE: margins will not collapse in this case.'},
		{kind: FittableRows, noStretch: true, classes: 'fittable-sample-height fittable-sample-box fittable-sample-o fittable-sample-mtb', components: [
			{content: 'BoxA', classes: 'fittable-sample-box fittable-sample-mlr fittable-sample-mtb'},
			{content: 'Fitting BoxB', fit: true, classes: 'fittable-sample-box fittable-sample-mlr fittable-sample-mtb'},
			{content: 'BoxC', classes: 'fittable-sample-box fittable-sample-mlr fittable-sample-mtb'}
		]}
	]
});
}],'src/FittableTests':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Control = require('enyo/Control');

var
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows');

module.exports = kind({
	name: 'enyo.sample.FittableTests',
	kind: Control,
	classes: 'fittable-sample-box',
	components: [
		{classes: 'fittable-sample-section', content: 'Rows/Columns using a combination of css units and highlighting margin collapse'},
		{kind: FittableRows, classes: 'fittable-sample-box fittable-sample-test', style: 'height: 400px;', components: [
			{content: 'FOO<br>margin-bottom: 1em', allowHtml: true, classes: 'fittable-sample-box fittable-sample-mlr fittable-sample-mtb', style: 'margin-bottom: 1em;'},
			{content: 'margin-top: 1em (collapsed since sibling shows greater of previous bottom and this top)<br>FOO', allowHtml: true, classes: 'fittable-sample-box fittable-sample-mlr fittable-sample-mtb', style: 'margin-top: 1em;'},
			{content: 'FOO<br>FOO', allowHtml: true, classes: 'fittable-sample-box fittable-sample-mlr fittable-sample-mtb'},
			{kind: FittableColumns, fit: true, classes: 'fittable-sample-box fittable-sample-mtb fittable-sample-mlr fittable-sample-o', components: [
				{content: '111111111111111', classes: 'fittable-sample-box fittable-sample-mlr'},
				{content: '111111111111111', classes: 'fittable-sample-box fittable-sample-mlr'},
				{content: '2', fit: true, classes: 'fittable-sample-box fittable-sample-mlr fittable-sample-o'},
				{content: '3333333', classes: 'fittable-sample-box fittable-sample-mlr'}
			]},
			{kind: FittableColumns, content: 'Bat', classes: 'fittable-sample-box fittable-sample-mtb enyo-center', components: [
				{content: 'add enyo-center to FittableColumns', classes: 'fittable-sample-box fittable-sample-mlr'},
				{content: '1', classes: 'fittable-sample-box fittable-sample-mlr'},
				{content: '2', classes: 'fittable-sample-box fittable-sample-mlr'},
				{content: '3', classes: 'fittable-sample-box fittable-sample-mlr'},
				{content: '4', classes: 'fittable-sample-box fittable-sample-mlr'},
				{content: '5', classes: 'fittable-sample-box fittable-sample-mlr'}
			]}
		]},
		{classes: 'fittable-sample-section', content: 'Rows with enyo-margin-expand to avoid margin-collapse'},
		{kind: FittableRows, classes: 'fittable-sample-box fittable-sample-test enyo-margin-expand', style: 'height: 250px;', components: [
			{content: 'FOO<br>margin-bottom: 1em', allowHtml: true, classes: 'fittable-sample-box fittable-sample-mtb', style: 'margin-bottom: 1em;'},
			{content: 'margin-top: 3em (not collapsed due to enyo-margin-expand on box)<br>FOO', allowHtml: true, classes: 'fittable-sample-box fittable-sample-mtb', style: 'margin-top: 3em;'},
			{content: 'FOO<br>FOO', allowHtml: true, fit: true, classes: 'fittable-sample-box fittable-sample-mtb'}
		]},
		{classes: 'fittable-sample-section', content: 'Tests to ensure fit region can be first, middle, or last'},
		{kind: FittableRows, classes: 'fittable-sample-boxable fittable-sample-small-test', components: [
			{content: 'A', fit: true},
			{content: 'B'},
			{content: 'C'}
		]},
		{kind: FittableRows, classes: 'fittable-sample-boxable fittable-sample-small-test', components: [
			{content: 'A'},
			{content: 'B', fit: true},
			{content: 'C'}
		]},
		{kind: FittableRows, classes: 'fittable-sample-boxable fittable-sample-small-test', components: [
			{content: 'A'},
			{content: 'B'},
			{content: 'C', fit: true}
		]},
		{kind: FittableColumns, classes: 'fittable-sample-boxable fittable-sample-small-test', components: [
			{content: 'A', fit: true},
			{content: 'B'},
			{content: 'C'}
		]},
		{kind: FittableColumns, classes: 'fittable-sample-boxable fittable-sample-small-test', components: [
			{content: 'A'},
			{content: 'B', fit: true},
			{content: 'C'}
		]},
		{style: 'height: 200px;', kind: FittableColumns, classes: 'fittable-sample-boxable fittable-sample-small-test', components: [
			{content: 'A'},
			{content: 'B'},
			{content: 'C', fit: true}
		]},
		{classes: 'fittable-sample-section', content: 'Tests for noStretch: true'},
		{kind: FittableRows, classes: 'fittable-sample-box fittable-sample-test', style: 'height: 400px;', noStretch: true, components: [
			{content: 'FOO<br>margin-bottom: 1em', allowHtml: true, classes: 'fittable-sample-box fittable-sample-mlr fittable-sample-mtb', style: 'margin-bottom: 1em;'},
			{content: 'margin-top: 2em (not collapsed; stretch false does not collapse due to use of float)<br>FOO', allowHtml: true, classes: 'fittable-sample-box fittable-sample-mlr fittable-sample-mtb', style: 'margin-top: 1em;'},
			{content: 'FOO<br>FOO', allowHtml: true, classes: 'fittable-sample-box fittable-sample-mlr fittable-sample-mtb'},
			{kind: FittableColumns, fit: true, noStretch: true, classes: 'fittable-sample-box fittable-sample-mtb fittable-sample-mlr fittable-sample-o', components: [
				{content: '111111111111111', classes: 'fittable-sample-box fittable-sample-mlr'},
				{content: '111111111111111', classes: 'fittable-sample-box fittable-sample-mlr'},
				{content: '2<br>2', allowHtml: true, fit: true, classes: 'fittable-sample-box fittable-sample-mlr fittable-sample-o'},
				{content: '3333333', classes: 'fittable-sample-box fittable-sample-mlr'}
			]},
			{kind: FittableColumns, content: 'Bat', noStretch: true, classes: 'fittable-sample-box fittable-sample-mtb enyo-center', components: [
				{content: 'add enyo-center to FittableColumns', classes: 'fittable-sample-box fittable-sample-mlr'},
				{content: '1', classes: 'fittable-sample-box fittable-sample-mlr'},
				{content: '2', classes: 'fittable-sample-box fittable-sample-mlr'},
				{content: '3', classes: 'fittable-sample-box fittable-sample-mlr'},
				{content: '4', classes: 'fittable-sample-box fittable-sample-mlr'},
				{content: '5', classes: 'fittable-sample-box fittable-sample-mlr'}
			]}
		]}
	]
});
}],'src/SlideableSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	FittableLayout = require('layout/FittableLayout'),
	FittableRows = require('layout/FittableRows'),
	Slideable = require('layout/Slideable'),
	FittableColumnsLayout = FittableLayout.Columns,
	FittableRowsLayout = FittableLayout.Rows,
	Control = require('enyo/Control');

var SlideableInfo = kind({
	kind: Control,
	published: {
		info: null
	},
	components: [
		{kind: FittableRows, classes: 'slideableinfo-sample', components: [
			{name: 'name'},
			{name: 'axis'},
			{name: 'unit'},
			{name: 'min'},
			{name: 'max'},
			{name: 'value'}
		]}
	],
	handlers: {
		onUpdateInfo: 'updateInfo'
	},
	create: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.infoChanged();
		};
	}),
	infoChanged: function () {
		for (var p in this.info) {
			if (this.$[p]) {
				this.$[p].setContent(utils.cap(p) + ': ' + this.info[p]);
			}
		}
	},
	updateInfo: function (sender, ev) {
		this.setInfo(ev);
		return true;
	}
});

module.exports = kind({
	name: 'enyo.sample.SlideableSample',
	classes: 'enyo-unselectable enyo-fit',
	style: 'overflow: hidden; background-color: #000;',
	components: [
		{name: 'top', kind: Slideable, axis: 'v', unit: '%', min: -90, max: 0, classes: 'enyo-fit slideable-sample top', onChange: 'updateInfo'},
		{name: 'right', kind: Slideable, axis: 'h', unit: '%', min: 0, max: 90, classes: 'enyo-fit slideable-sample right', onChange: 'updateInfo'},
		{name: 'bottom', kind: Slideable, axis: 'v', unit: '%', min: 0, max: 90, classes: 'enyo-fit slideable-sample bottom', onChange: 'updateInfo'},
		{name: 'left', kind: Slideable, axis: 'h', unit: '%', min: -90, max: 0, classes: 'enyo-fit slideable-sample left', onChange: 'updateInfo'}
	],
	handlers: {
		ondragstart: 'suppressPanelDrag'
	},
	create: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			var slideables = [];

			for (var c in this.$) {
				if (this.$[c].kind === 'Slideable') {
					slideables.push(this.$[c]);
				}
			}
			this.populate(slideables);
		};
	}),
	populate: function (slideables) {
		var slideable;
		for (var i = 0; i < slideables.length; i++) {
			slideable = slideables[i];
			slideable.createComponents([
				{style: slideable.axis === 'h' ? 'height: 38%;' : ''}, // cheating here for the horizontal Slideables to make everything nice and (almost) centered vertically
				{
					kind: SlideableInfo,
					layoutKind: (slideable.axis === 'v') ? FittableColumnsLayout : FittableRowsLayout,
					classes: 'enyo-center', // cheating here for the vertical Slideables to make everything nice and centered horizontally (no effect on horizontal Slideables)
					info: {
						name: slideable.name,
						axis: slideable.axis,
						unit: slideable.unit,
						min: slideable.min,
						max: slideable.max,
						value: slideable.value
					}
				}
			]);
		}
	},
	updateInfo: function (sender) {
		sender.waterfallDown('onUpdateInfo', {
			name: sender.name,
			axis: sender.axis,
			unit: sender.unit,
			min: sender.min,
			max: sender.max,
			value: Math.round(sender.value)
		});
		return true;
	},
	// keeps the view panel from moving in Sampler app while dragging the Slideable
	suppressPanelDrag: function () {
		return true;
	}
});
}],'src/EasingSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	easing = require('layout/easing');

var
	Animator = require('enyo/Animator'),
	Button = require('enyo/Button'),
	Select = require('enyo/Select');


module.exports = kind({
	name: 'moon.sample.EasingSample',
	classes: 'enyo-unselectable easing-sample',
	components: [
		{kind: Animator, name: 'animator', onStep: 'animatorStep', onEnd: 'animatorComplete', easingFunction: easing.linear},
		{name: 'container', classes: 'easing-sample-ball-container', components: [
			{name: 'box', classes: 'easing-sample-ball'}
		]},
		{classes: 'easing-sample-control-container', style: 'display:inline-block;', components: [
			{name: 'menu', kind: Select, onchange: 'itemSelected', components: [
				{content: 'Easing Type'}
			]},
			{name: 'btnAnimate', kind: Button, content: 'Animate', ontap: 'play'}
		]}
	],
	duration: 1000,
	create: kind.inherit(function (sup) {
		return function() {
			sup.apply(this, arguments);
			this.buildMenu();
		};
	}),
	itemSelected: function (sender, ev) {
		var item = Object.keys(easing)[sender.selected - 1];
		this.$.animator.setEasingFunction(easing[item] || easing.linear);
		this.play();
	},
	play: function () {
		this.$.btnAnimate.set('disabled', true);
		this.$.animator.play({
			startValue: 0,
			endValue: 150,
			node: this.$.box.hasNode(),
			duration: this.duration
		});
	},
	animatorStep: function (sender) {
		this.$.box.applyStyle('top', sender.value + 'px');
		return true;
	},
	animatorComplete: function (sender) {
		this.$.btnAnimate.set('disabled', false);
		return true;
	},
	buildMenu: function () {
		for (var k in easing){
			this.$.menu.createComponent({content: k});
		}
	}
});

}],'src/FittableAppLayout1':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows'),
	Button = require('enyo/Button'),
	Control = require('enyo/Control'),
	Input = require('enyo/Input'),
	ToolDecorator = require('enyo/ToolDecorator');

module.exports = kind({
	name: 'enyo.sample.FittableAppLayout1',
	kind: FittableRows,
	classes: 'enyo-fit',
	components: [
		{kind: Control, classes: 'layout-sample-toolbar', components: [
			{content: 'Header'},
			{kind: Button, content: 'Button'},
			{kind: ToolDecorator, tag: 'label', components: [
				{kind: Input}
			]}
		]},
		{kind: FittableColumns, fit: true, components: [
			{classes: 'fittable-sample-column'},
			{kind: FittableRows, fit: true, classes: 'fittable-sample-shadow', components: [
				{classes: 'fittable-sample-row fittable-sample-shadow2'},
				{fit: true, classes: 'fittable-sample-fitting-color'}
			]}
		]}
	]
});
}],'src/FittableAppLayout2':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');
	
var
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows'),
	Button = require('enyo/Button');

module.exports = kind({
	name: 'enyo.sample.FittableAppLayout2',
	kind: FittableColumns,
	classes: 'enyo-fit',
	components: [
		{kind: FittableRows, classes: 'fittable-sample-column', components: [
			{fit: true},
			{classes: 'layout-sample-toolbar', components: [
				{kind: Button, content: '1'}
			]}
		]},
		{kind: FittableRows, classes: 'fittable-sample-column fittable-sample-shadow', components: [
			{fit: true, style: ''},
			{classes: 'layout-sample-toolbar', components: [
				{kind: Button, content: '2'}
			]}
		]},
		{kind: FittableRows, fit: true, classes: 'fittable-sample-shadow', components: [
			{fit: true, classes: 'fittable-sample-fitting-color'},
			{classes: 'layout-sample-toolbar', components: [
				{kind: Button, content: '3'}
			]}
		]}
	]
});
}],'src/FittableAppLayout3':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows'),
	Button = require('enyo/Button');

module.exports = kind({
	name: 'enyo.sample.FittableAppLayout3',
	kind: FittableColumns,
	classes: 'enyo-fit',
	components: [
		{kind: FittableRows, fit: true, components: [
			{fit: true, classes: 'fittable-sample-fitting-color'},
			{classes: 'fittable-sample-row fittable-sample-shadow3'},
			{classes: 'layout-sample-toolbar', components: [
				{kind: Button, content: '1'}
			]}
		]},
		{kind: FittableRows, classes: 'fittable-sample-column fittable-sample-shadow', components: [
			{fit: true},
			{classes: 'layout-sample-toolbar', components: [
				{kind: Button, content: '2'}
			]}
		]}
	]
});
}],'src/FittableAppLayout4':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows'),
	Button = require('enyo/Button');

module.exports = kind({
	name: 'enyo.sample.FittableAppLayout4',
	kind: FittableColumns,
	classes: 'enyo-fit',
	components: [
		{kind: FittableRows, classes: 'fittable-sample-column fittable-sample-shadow4', components: [
			{fit: true},
			{classes: 'layout-sample-toolbar', components: [
				{content: 'Toolbar'}
			]}
		]},
		{kind: FittableRows, fit: true, components: [
			{fit: true, classes: 'fittable-sample-fitting-color'},
			{classes: 'layout-sample-toolbar', components: [
				{kind: Button, content: '2'}
			]}
		]}
	]
});
}],'src/FittableSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	FittableColumns = require('layout/FittableColumns'),
	FittableHeaderLayout = require('layout/FittableHeaderLayout'),
	FittableRows = require('layout/FittableRows');

module.exports = kind({
	name: 'enyo.sample.FittableSample',
	kind: FittableRows,
	classes: 'fittable-sample-box enyo-fit',
	components: [
		{layoutKind: FittableHeaderLayout, components:[
			{kind: Button, content: 'Back'},
			{content: 'Fittable Sample', fit: true, style: 'text-align:center'},
			{kind: Button, content: 'Action 1'},
			{kind: Button, content: 'Action 2'}
		]},
		{content: 'Foo<br>Foo', allowHtml: true, classes: 'fittable-sample-box fittable-sample-mtb'},
		{content: 'Foo<br>Foo', allowHtml: true, classes: 'fittable-sample-box fittable-sample-mtb'},
		{kind: FittableColumns, fit: true, classes: 'fittable-sample-box fittable-sample-mtb fittable-sample-o', components: [
			{content: 'Foo', classes: 'fittable-sample-box fittable-sample-mlr'},
			{content: 'Foo', classes: 'fittable-sample-box fittable-sample-mlr'},
			{content: 'Fits!', fit: true, classes: 'fittable-sample-box fittable-sample-mlr fittable-sample-o'},
			{content: 'Foo', classes: 'fittable-sample-box fittable-sample-mlr'}
		]},
		{kind: FittableColumns, content: 'Bat', classes: 'fittable-sample-box fittable-sample-mtb enyo-center', components: [
			{content: 'Centered', classes: 'fittable-sample-box fittable-sample-mlr'},
			{content: '1', classes: 'fittable-sample-box fittable-sample-mlr'},
			{content: '2', classes: 'fittable-sample-box fittable-sample-mlr'},
			{content: '3', classes: 'fittable-sample-box fittable-sample-mlr'},
			{content: '4', classes: 'fittable-sample-box fittable-sample-mlr'}
		]}
	]
});
}],'src/PanelsSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	CardArranger = require('layout/CardArranger'),
	CardSlideInArranger = require('layout/CardSlideInArranger'),
	CarouselArranger = require('layout/CarouselArranger'),
	CollapsingArranger = require('layout/CollapsingArranger'),
	DockRightArranger = require('layout/DockRightArranger'),
	FittableRows = require('layout/FittableRows'),
	GridArranger = require('layout/GridArranger'),
	LeftRightArranger = require('layout/LeftRightArranger'),
	Panels = require('layout/Panels'),
	SpiralArranger = require('layout/SpiralArranger'),
	TopBottomArranger = require('layout/TopBottomArranger'),
	Select = require('enyo/Select'),
	Button = require('enyo/Button'),
	ToolDecorator = require('enyo/ToolDecorator'),
	Input = require('enyo/Input');

var
	MyGridArranger = kind({
		kind: GridArranger,
		colHeight: '150',
		colWidth: '150'
	});

module.exports = kind({
	name: 'enyo.sample.PanelsSample',
	kind: FittableRows,
	classes: 'enyo-sample-panelssample enyo-fit',
	components: [
		{classes: 'toolbar', components: [
			{name: 'arrangerPicker', kind: Select, maxHeight: 360, floating: true, onchange: 'arrangerSelected', components: [
				{content: 'Arranger'}
			]},
			{kind: Button, content: 'Previous', ontap: 'prevPanel'},
			{kind: Button, content: 'Next', ontap: 'nextPanel'},
			{kind: ToolDecorator, components: [
				{kind: Input, value: 0, onchange: 'gotoPanel'}
			]},
			{kind: Button, content: 'Go', ontap: 'gotoPanel'},
			{kind: Button, content: 'Add', ontap: 'addPanel'},
			{kind: Button, content: 'Delete', ontap: 'deletePanel'}
		]},
		{kind: Panels, name: 'samplePanels', fit: true, realtimeFit: true, classes: 'panels-sample-panels enyo-border-box', components: [
			{content: 0, style: 'background:red;'},
			{content: 1, style: 'background:orange;'},
			{content: 2, style: 'background:yellow;'},
			{content: 3, style: 'background:green;'},
			{content: 4, style: 'background:blue;'},
			{content: 5, style: 'background:indigo;'},
			{content: 6, style: 'background:violet;'}
		]}
	],
	panelArrangers: [
		{name: 'CardArranger', arrangerKind: CardArranger},
		{name: 'CardSlideInArranger', arrangerKind: CardSlideInArranger},
		{name: 'CarouselArranger', arrangerKind: CarouselArranger, classes: 'panels-sample-wide'},
		{name: 'CollapsingArranger', arrangerKind: CollapsingArranger, classes: 'panels-sample-collapsible'},
		{name: 'LeftRightArranger', arrangerKind: LeftRightArranger},
		{name: 'TopBottomArranger', arrangerKind: TopBottomArranger, classes: 'panels-sample-topbottom'},
		{name: 'SpiralArranger', arrangerKind: SpiralArranger, classes: 'panels-sample-spiral'},
		{name: 'GridArranger', arrangerKind: MyGridArranger, classes: 'panels-sample-grid'},
		{name: 'DockRightArranger', arrangerKind: DockRightArranger, classes: 'panels-sample-collapsible'}
	],
	bgcolors: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'],
	create: kind.inherit(function (sup) {
		return function() {
			sup.apply(this, arguments);
			for (var i=0; i<this.panelArrangers.length; i++) {
				this.$.arrangerPicker.createComponent({content:this.panelArrangers[i].name});
			}
			this.panelCount=this.$.samplePanels.getPanels().length;
		};
	}),
	arrangerSelected: function (sender, ev) {
		var sp = this.$.samplePanels;
		var p = this.panelArrangers[sender.selected - 1];
		if (this.currentClass) {
			sp.removeClass(this.currentClass);
		}
		if (p) {
			if (p.classes) {
				sp.addClass(p.classes);
				this.currentClass = p.classes;
			}
			sp.setArrangerKind(p.arrangerKind);
			if (Panels.isScreenNarrow()) {
				this.$.samplePanels.setIndex(1);
			}
		}
	},
	// panels
	prevPanel: function () {
		this.$.samplePanels.previous();
		this.$.input.setValue(this.$.samplePanels.index);
	},
	nextPanel: function () {
		this.$.samplePanels.next();
		this.$.input.setValue(this.$.samplePanels.index);
	},
	gotoPanel: function () {
		this.$.samplePanels.setIndex(this.$.input.getValue());
	},
	panelCount: 0,
	addPanel: function () {
		var sp = this.$.samplePanels;
		var i = this.panelCount++;
		var p = sp.createComponent({
			style: 'background: ' + this.bgcolors[i % this.bgcolors.length],
			content:i
		});
		p.render();
		sp.reflow();
		sp.setIndex(i);
	},
	deletePanel: function () {
		var p = this.$.samplePanels.getActive();
		if (p) {
			p.destroy();
		}
	}
});
}],'../strawman/List':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Collection = require('enyo/Collection'),
	Scroller = require('enyo/Scroller'),
	DataRepeater = require('enyo/DataRepeater');

var
	Link = require('../Link');

module.exports = kind({
	kind: Scroller,
	classes: 'strawman-list enyo-fit',
	samples: null,
	libraryName: '',
	listType: 'list',
	components: [
		{name: 'repeater', classes: 'list-frame', kind: DataRepeater, components: [
			{kind: Link, classes: 'item', bindings: [
				{from: 'model.name', to: 'href', transform: function (v) {
						var href = "#" + v;
						if (!this.owner.libraryName) { href = v + '/index.html'; }
						return href;
					}
				},
				{from: 'model.name', to: 'content', transform: function (v) {
						var name = v.replace(/Sample$/i, '');
						if (!this.owner.libraryName) {
							name = this.owner.samples[v] || name;
						}
						return name;
					}
				},
				{from: 'model.badgeClasses', to: 'badgeClasses'}
			]}
		]}
	],
	bindings: [
		{from: 'samples', to: '$.repeater.collection', transform: function (v) {
				if (!v) { return v; }
				return (v instanceof Collection) ? v : new Collection(Object.keys(v).map(function (key) {
					// Make an object that contains all of the strings and booleans etc that we can use as a model for our sample collection.
					var sampleModel = {name: key};
					for (var prop in v[key]) {
						// Don't bother copying functions
						if (typeof v[key][prop] != 'function') {
							sampleModel[prop] = v[key][prop];
						}
					}
					return sampleModel;
				}));
			}
		}
	],
	create: function () {
		this.inherited(arguments);
		this.listTypeChanged();
	},
	listTypeChanged: function (old) {
		this.$.repeater.removeClass(old);
		this.$.repeater.addClass(this.get('listType'));
	}
});

},{'../Link':'../strawman/Link'}],'src/ContextualLayoutSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	ContextualLayout = require('layout/ContextualLayout'),
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows'),
	Control = require('enyo/Control'),
	Popup = require('enyo/Popup'),
	Repeater = require('enyo/Repeater'),
	Scroller = require('enyo/Scroller');


/**
	sample.ContextualPopup_ is an example of a popup that uses the ContextualLayout layout strategy.
*/
var ContextualPopup = kind({
	kind: Popup,
	layoutKind: ContextualLayout,
	classes: 'sample-contextual-popup',

	floating: true,
	count: 5,

	//layout parameters
	vertFlushMargin: 60,	//vertical flush layout margin
	horizFlushMargin: 50,	//horizontal flush layout margin
	widePopup: 200,			//popups wider than this value are considered wide (for layout purposes)
	longPopup: 200,			//popups longer than this value are considered long (for layout purposes)
	horizBuffer: 16,		//do not allow horizontal flush popups past spec'd amount of buffer space on left/right screen edge

	handlers: {
		onRequestShowMenu: 'requestShow'
	},

	create: function () {
		Popup.prototype.create.apply(this, arguments);
		this.createComponent({kind: Repeater, count: this.count, onSetupItem: 'setupItem', components: [
			{name: 'item'}
		]});
	},
	setupItem: function (sender, ev) {
		ev.item.$.item.set('content', 'Item ' + ev.index);
	},
	requestShow: function (sender, ev) {
		var n = ev.activator.hasNode();
		if (n) {
			this.activatorOffset = this.getPageOffset(n);
		}
		this.show();
		return true;
	},
	getPageOffset: function (node) {
		// getBoundingClientRect returns top/left values which are relative to the viewport and not absolute
		var r = node.getBoundingClientRect();

		var pageYOffset = (window.pageYOffset === undefined) ? document.documentElement.scrollTop : window.pageYOffset;
		var pageXOffset = (window.pageXOffset === undefined) ? document.documentElement.scrollLeft : window.pageXOffset;
		var rHeight = (r.height === undefined) ? (r.bottom - r.top) : r.height;
		var rWidth = (r.width === undefined) ? (r.right - r.left) : r.width;

		return {top: r.top + pageYOffset, left: r.left + pageXOffset, height: rHeight, width: rWidth};
	}
});


module.exports = kind({
	name: 'layout.sample.ContextualLayoutSample',
	kind: FittableRows,
	classes: 'enyo enyo-fit',
	components: [
		{name: 'topToolbar', style: 'background-color: lightgray', components: [
			{kind: FittableColumns, style: 'width:100%;', components:[
				{components: [
					{kind: Control, classes: 'sample-popup-button icon-button', ontap: 'showPopup', style: 'background-image: url(' + 'assets/menu-icon-bookmark.png' + ')'},
					{kind: ContextualPopup, count: 2}
				]},
				{fit:true, style: 'position:absolute;right:0;', components: [
					{kind: Control, classes: 'sample-popup-button icon-button', ontap: 'showPopup', style: 'background-image: url(' + 'assets/menu-icon-bookmark.png' + ')'},
					{kind: ContextualPopup, count: 6}
				]}
			]}
		]},
		{kind: Scroller, fit: true, thumb: false, components:[
			{name: 'buttonContainer', kind: FittableRows, classes: 'onyx-contextualpopup-button-container enyo-fit', components:[
				//Top row of buttons
				{components:[
					{style: 'display:inline-block', components: [
						{kind: Control, content: 'Average', classes: 'sample-popup-button', ontap: 'showPopup'},
						{kind: ContextualPopup, count: 5}
					]},

					{style: 'display:inline-block;float:right', components: [
						{kind: Control, content: 'Small', classes: 'sample-popup-button', ontap: 'showPopup'},
						{kind: ContextualPopup, count: 1}
					]}
				]},
				//Center row of buttons
				{fit:true, style: 'padding-top:15%;padding-bottom:15%;', components:[
					{style: 'display:inline-block;', components: [
						{kind: Control, content: 'Wide', classes: 'sample-popup-button', ontap: 'showPopup'},
						{kind: ContextualPopup, style: 'width:300px', count: 0, components: [
							{kind: Scroller, style: 'min-width:150px;', horizontal: 'auto',  touch:true, thumb:false,  components:[
								{content: 'testing 1'},
								{content: 'testing 2'}
							]}
						]}
					]},
					{style: 'display:inline-block;float:right', components: [
						{kind: Control, content: 'Long', classes: 'sample-popup-button', ontap: 'showPopup'},
						{kind: ContextualPopup, count: 30}
					]}
				]},
				//Bottom row of buttons
				{components:[
					{style: 'display:inline-block;', components: [
						{kind: Control, content: 'Press Me', classes: 'sample-popup-button', ontap: 'showPopup'},
						{kind: ContextualPopup, style: 'width:200px', count: 10}
					]},
					{style: 'display:inline-block;float:right', components: [
						{kind: Control, content: 'Try Me', classes: 'sample-popup-button', ontap: 'showPopup'},
						{kind: ContextualPopup, style: 'width:250px', count: 5}
					]}
				]}
			]}
		]},
		{name: 'bottomToolbar', classes: 'onyx-menu-toolbar', style: 'background-color:lightgray', components: [
			{kind: FittableColumns, style: 'width:100%;', components:[
				{components: [
					{kind: Control, classes: 'sample-popup-button icon-button', ontap: 'showPopup', style: 'background-image: url(' + 'assets/menu-icon-bookmark.png' + ')'},
					{kind: ContextualPopup, count: 6}
				]},
				{fit: true, style: 'position:absolute;right:0;', components: [
					{kind: Control, classes: 'sample-popup-button icon-button', ontap: 'showPopup', style: 'background-image: url(' + 'assets/menu-icon-bookmark.png' + ')'},
					{kind: ContextualPopup, name: 'facebook', count: 6}
				]}
			]}
		]}
	],
	showPopup: function (sender, ev) {
		//
		sender.parent.waterfall('onRequestShowMenu', {
			activator: sender
		});
	}
});

}],'src/FlyweightRepeaterSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Scroller = require('enyo/Scroller'),
	FittableRows = require('layout/FittableRows'),
	FlyweightRepeater = require('layout/FlyweightRepeater');

module.exports = kind({
	name: 'enyo.sample.FlyweightRepeaterSample',
	kind: FittableRows,
	classes: 'flyweight-repeater-sample enyo-fit onyx',
	components: [
		{classes: 'layout-sample-toolbar', components: [
			{content: 'FlyweightRepeater Result'}
		]},
		{name:'result', style:'padding:12px; font-size: 20px;', content: 'Nothing selected yet.'},
		{kind: Scroller, fit: true, components: [
			{name:'repeater', kind: FlyweightRepeater, classes:'flyweight-repeater-sample-list', count: 26, onSetupItem: 'setupItem', components: [
				{name: 'item', classes:'flyweight-repeater-sample-item'}
			]}
		]}
	],
	handlers: {
		onSelect: 'itemSelected'
	},
	people: [
		{name: 'Andrew'},
		{name: 'Betty'},
		{name: 'Christopher'},
		{name: 'Donna'},
		{name: 'Ephraim'},
		{name: 'Frankie'},
		{name: 'Gerald'},
		{name: 'Heather'},
		{name: 'Ingred'},
		{name: 'Jack'},
		{name: 'Kevin'},
		{name: 'Lucy'},
		{name: 'Matthew'},
		{name: 'Noreen'},
		{name: 'Oscar'},
		{name: 'Pedro'},
		{name: 'Quentin'},
		{name: 'Ralph'},
		{name: 'Steven'},
		{name: 'Tracy'},
		{name: 'Uma'},
		{name: 'Victor'},
		{name: 'Wendy'},
		{name: 'Xin'},
		{name: 'Yulia'},
		{name: 'Zoltan'}
	],
	setupItem: function (sender, ev) {
		var index = ev.index;
		this.$.item.setContent((index+1) + '. ' + this.people[index].name);
		this.$.item.applyStyle('background', (ev.selected? 'dodgerblue':'lightgray'));
		/* stop propogation */
		return true;
	},
	itemSelected: function (sender, ev) {
		var index = ev.index;
		var count = ev.flyweight.count;
		if(index>=0 && index<count){
			this.$.result.setContent(' [' + (index+1) + '. ' + this.people[index].name + '] is selected');
		}
		return true;
	}
});

}],'src/TreeSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Scroller = require('enyo/Scroller'),
	Selection = require('enyo/Selection'),
	FittableRows = require('layout/FittableRows'),
	TreeNode = require('layout/Node');

module.exports = kind({
	name: 'enyo.sample.TreeSample',
	classes: 'enyo-unselectable enyo-fit',
	kind: FittableRows,
	fit: true,
	components: [
		{kind: Selection, onSelect: 'select', onDeselect: 'deselect'},
		{kind: Scroller, fit: true, components: [
			{kind: TreeNode, icon: 'assets/folder-open.png', content: 'Tree', expandable: true, expanded: true, onExpand: 'nodeExpand', onNodeTap: 'nodeTap', components: [
				{icon: 'assets/file.png', content: 'Alpha'},
				{icon: 'assets/folder-open.png', content: 'Bravo', expandable: true, expanded: true, components: [
					{icon: 'assets/file.png', content: 'Bravo-Alpha'},
					{icon: 'assets/file.png', content: 'Bravo-Bravo'},
					{icon: 'assets/file.png', content: 'Bravo-Charlie'}
				]},
				{icon: 'assets/folder.png', content: 'Charlie', expandable: true, components: [
					{icon: 'assets/file.png', content: 'Charlie-Alpha'},
					{icon: 'assets/file.png', content: 'Charlie-Bravo'},
					{icon: 'assets/file.png', content: 'Charlie-Charlie'}
				]},
				{icon: 'assets/folder-open.png', content: 'Delta', expandable: true, expanded: true, components: [
					{icon: 'assets/file.png', content: 'Delta-Alpha'},
					{icon: 'assets/file.png', content: 'Delta-Bravo'},
					{icon: 'assets/file.png', content: 'Delta-Charlie'}
				]},
				{icon: 'assets/file.png', content: 'Epsilon'}
			]}
		]}
	],
	nodeExpand: function (sender, ev) {
		sender.setIcon('assets/' + (sender.expanded ? 'folder-open.png' : 'folder.png'));
	},
	nodeTap: function (sender, ev) {
		var node = ev.originator;
		this.$.selection.select(node.id, node);
	},
	select: function (sender, ev) {
		ev.data.$.caption.applyStyle('background-color', 'lightblue');
	},
	deselect: function (sender, ev) {
		ev.data.$.caption.applyStyle('background-color', null);
	}
});

}],'../strawman/SampleList':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	platform = require('enyo/platform');

var
	Link = require('../Link'),
	List = require('../List'),
	Title = require('../Title'),
	AppRouter = require('../AppRouter');

module.exports = kind({
	title: 'Samples',
	classes: 'strawman',
	published: {
		sample: null,
		locale: 'local'
	},
	handlers: {
		onRouteChange: 'handleRoute'
	},
	listComponents: [
		{name: 'title', kind: Title},
		{name: 'back', kind: Link, classes: 'back-button', content: 'Back', href: '../index.html'},
		{name: 'list', kind: List}
	],
	create: function () {
		this.inherited(arguments);
		this.createComponent({name: 'router', kind: AppRouter});
		if (this.libraryName && this.version) {
			// only display version information for individual libraries that are versioned
 			console.log('%c%s: %s', 'color:blue', this.libraryName, this.version);
 		}
 	},
 	handleRoute: function (sender, ev) {
		this.set('locale', ev.locale);
		this.set('sample', ev.sampleName);
	},
	sampleChanged: function (was, is) {
		if (was) {
			if(this.$[was]) { this.$[was].destroy(); }
		} else {
			if(this.$.title) { this.$.title.destroy(); }
			if(this.$.back) { this.$.back.destroy(); }
			if(this.$.list) { this.$.list.destroy(); }
		}
		if (is && this.samples[is]) {
			if(platform.webos && global.screen.width<=400 && this.libraryName!=='Garnet') {
				this.addClass('wearable-sample');
			}
			global.sample = this.createComponent({name:is, kind: this.samples[is], classes:'strawman-sample'});
		} else {
			// We have no sample, just render out the list.
			this.removeClass('wearable-sample');
			this.createComponents(this.listComponents);
			this.binding({from: 'title',       to: '$.title.content'});
			this.binding({from: 'samples',     to: '$.list.samples'});
			this.binding({from: 'listType',    to: '$.list.listType'});
			this.binding({from: 'libraryName', to: '$.list.libraryName'});

			// Don't show back if we're at home.
			this.$.back.set('showing', !!this.libraryName);
		}
		this.render();
	}
});

},{'../Link':'../strawman/Link','../List':'../strawman/List','../Title':'../strawman/Title','../AppRouter':'../strawman/AppRouter'}],'src/PanZoomViewSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableColumns = require('layout/FittableColumns'),
	PanZoomView = require('layout/PanZoomView'),
	Button = require('enyo/Button');

module.exports = kind({
	name: 'enyo.sample.PanZoomViewSample',
	components: [
		{kind: PanZoomView, contentWidth: 600, contentHeight: 600, classes: 'panzoomview-demo', onZoom: 'zoom', components: [
			{kind: FittableColumns, components: [
				{content: 'Hello World', style: 'background: orange; width: 200px; height: 200px;'},
				{content: 'Hello World', style: 'background: blue; width: 200px; height: 200px;'},
				{content: 'Hello World', style: 'background: cyan; width: 200px; height: 200px;'}
			]},
			{kind: FittableColumns, components: [
				{content: 'Hello World', style: 'background: lightblue; width: 200px; height: 200px;'},
				{content: 'Hello World', style: 'background: yellow; width: 200px; height: 200px;'},
				{content: 'Hello World', style: 'background: red; width: 200px; height: 200px;'}
			]},
			{kind: FittableColumns, components: [
				{content: 'Hello World', style: 'background: brown; width: 200px; height: 200px;'},
				{content: 'Hello World', style: 'background: green; width: 200px; height: 200px;'},
				{content: 'Hello World', style: 'background: pink; width: 200px; height: 200px;'}
			]}
		]},

		{style: 'padding-top:10px; width:60%; margin:auto;', components: [
			{content: 'panZoomView Scale'},
			{style: 'text-align:center;', components: [
				{kind: Button, content: 'auto',   ontap: 'autoScale',   classes: 'panzoomview-demoButton'},
				{kind: Button, content: 'width',  ontap: 'widthScale',  classes: 'panzoomview-demoButton'},
				{kind: Button, content: 'height', ontap: 'heightScale', classes: 'panzoomview-demoButton'},
				{kind: Button, content: 'fit',    ontap: 'fitScale',    classes: 'panzoomview-demoButton'},
				{kind: Button, content: '0.5', ontap: 'halfScale', classes: 'panzoomview-demoButton'},
				{kind: Button, content: '1.0', ontap: 'normalScale', classes: 'panzoomview-demoButton'},
				{kind: Button, content: '2.0', ontap: 'doubleScale', classes: 'panzoomview-demoButton'}
			]}
		]}
	],
	create: kind.inherit (function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.scale = 'auto';
		};
	}),
	handleResize: function (sender, ev) {
		this.inherited(arguments);
		this.$.panZoomView.setScale(this.scale);
	},
	autoScale: function (sender, ev) {
		this.scale = 'auto';
		this.$.panZoomView.setScale(this.scale);
	},
	widthScale: function (sender, ev) {
		this.scale = 'width';
		this.$.panZoomView.setScale(this.scale);
	},
	heightScale: function (sender, ev) {
		this.scale = 'height';
		this.$.panZoomView.setScale(this.scale);
	},
	fitScale: function (sender, ev) {
		this.scale = 'fit';
		this.$.panZoomView.setScale(this.scale);
	},
	halfScale: function (sender, ev) {
		this.scale = 0.5;
		this.$.panZoomView.setScale(this.scale);
	},
	normalScale: function (sender, ev) {
		this.scale = 1.0;
		this.$.panZoomView.setScale(this.scale);
	},
	doubleScale: function (sender, ev) {
		this.scale = 2.0;
		this.$.panZoomView.setScale(this.scale);
	}
});
}],'src/PanZoomViewSample2':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	PanZoomView = require('layout/PanZoomView');

module.exports = kind({
	name: 'enyo.sample.PanZoomViewSample2',
	classes: 'enyo-unselectable',
	style: 'width: 600px; padding: 20px; border: 1px solid #ccc; margin: auto;',
	components: [

	// add zoom in and zoom out controls
	// add down and up controls
		{content: 'Please review this fine print:', tag: 'h1'},
		{kind: PanZoomView, style: 'width: 600px; height: 400px; font-size: .5em;', touchOverscroll: true, thumb: true, scale: 'width', contentWidth: 1200, components: [
			{classes: 'enyo-unselectable', content: 'Truly cross-platform Use the same framework to develop apps for the web and for all major platforms, desktop and mobile.  Free and open-source 100% free to use, Enyo is available under the Apache License, Version 2.0.  Extensible With a small, rock-solid core, Enyo is modular and designed to be extended by the developer community. Built to manage complexity Enyo\'s elegant component model makes it simple to build and maintain even the most complex apps.  Optimized for mobile Enyo has roots in mobile and was built from the ground up to shine on tablets and phones.  Lightweight & Fast Enyo is small (core is <25k gzipped) and tuned for speed and responsiveness on all supported platforms.Truly cross-platform Use the same framework to develop apps for the web and for all major platforms, desktop and mobile.  Free and open-source 100% free to use, Enyo is available under the Apache License, Version 2.0.  Extensible With a small, rock-solid core, Enyo is modular and designed to be extended by the developer community. Built to manage complexity Enyo\'s elegant component model makes it simple to build and maintain even the most complex apps.  Optimized for mobile Enyo has roots in mobile and was built from the ground up to shine on tablets and phones.  Lightweight & Fast Enyo is small (core is <25k gzipped) and tuned for speed and responsiveness on all supported platforms.Truly cross-platform Use the same framework to develop apps for the web and for all major platforms, desktop and mobile.  Free and open-source 100% free to use, Enyo is available under the Apache License, Version 2.0.  Extensible With a small, rock-solid core, Enyo is modular and designed to be extended by the developer community. Built to manage complexity Enyo\'s elegant component model makes it simple to build and maintain even the most complex apps.  Optimized for mobile Enyo has roots in mobile and was built from the ground up to shine on tablets and phones.  Lightweight & Fast Enyo is small (core is <25k gzipped) and tuned for speed and responsiveness on all supported platforms.Truly cross-platform Use the same framework to develop apps for the web and for all major platforms, desktop and mobile.  Free and open-source 100% free to use, Enyo is available under the Apache License, Version 2.0.  Extensible With a small, rock-solid core, Enyo is modular and designed to be extended by the developer community. Built to manage complexity Enyo\'s elegant component model makes it simple to build and maintain even the most complex apps.  Optimized for mobile Enyo has roots in mobile and was built from the ground up to shine on tablets and phones.  Lightweight & Fast Enyo is small (core is <25k gzipped) and tuned for speed and responsiveness on all supported platforms.Truly cross-platform Use the same framework to develop apps for the web and for all major platforms, desktop and mobile.  Free and open-source 100% free to use, Enyo is available under the Apache License, Version 2.0.  Extensible With a small, rock-solid core, Enyo is modular and designed to be extended by the developer community. Built to manage complexity Enyo\'s elegant component model makes it simple to build and maintain even the most complex apps.  Optimized for mobile Enyo has roots in mobile and was built from the ground up to shine on tablets and phones.  Lightweight & Fast Enyo is small (core is <25k gzipped) and tuned for speed and responsiveness on all supported platforms.Truly cross-platform Use the same framework to develop apps for the web and for all major platforms, desktop and mobile.  Free and open-source 100% free to use, Enyo is available under the Apache License, Version 2.0.  Extensible With a small, rock-solid core, Enyo is modular and designed to be extended by the developer community. Built to manage complexity Enyo\'s elegant component model makes it simple to build and maintain even the most complex apps.  Optimized for mobile Enyo has roots in mobile and was built from the ground up to shine on tablets and phones.  Lightweight & Fast Enyo is small (core is <25k gzipped) and tuned for speed and responsiveness on all supported platforms.Truly cross-platform Use the same framework to develop apps for the web and for all major platforms, desktop and mobile.  Free and open-source 100% free to use, Enyo is available under the Apache License, Version 2.0.  Extensible With a small, rock-solid core, Enyo is modular and designed to be extended by the developer community. Built to manage complexity Enyo\'s elegant component model makes it simple to build and maintain even the most complex apps.  Optimized for mobile Enyo has roots in mobile and was built from the ground up to shine on tablets and phones.  Lightweight & Fast Enyo is small (core is <25k gzipped) and tuned for speed and responsiveness on all supported platforms.Truly cross-platform Use the same framework to develop apps for the web and for all major platforms, desktop and mobile.  Free and open-source 100% free to use, Enyo is available under the Apache License, Version 2.0.  Extensible With a small, rock-solid core, Enyo is modular and designed to be extended by the developer community. Built to manage complexity Enyo\'s elegant component model makes it simple to build and maintain even the most complex apps.  Optimized for mobile Enyo has roots in mobile and was built from the ground up to shine on tablets and phones.  Lightweight & Fast Enyo is small (core is <25k gzipped) and tuned for speed and responsiveness on all supported platforms.Truly cross-platform Use the same framework to develop apps for the web and for all major platforms, desktop and mobile.  Free and open-source 100% free to use, Enyo is available under the Apache License, Version 2.0.  Extensible With a small, rock-solid core, Enyo is modular and designed to be extended by the developer community. Built to manage complexity Enyo\'s elegant component model makes it simple to build and maintain even the most complex apps.  Optimized for mobile Enyo has roots in mobile and was built from the ground up to shine on tablets and phones.  Lightweight & Fast Enyo is small (core is <25k gzipped) and tuned for speed and responsiveness on all supported platforms.Truly cross-platform Use the same framework to develop apps for the web and for all major platforms, desktop and mobile.  Free and open-source 100% free to use, Enyo is available under the Apache License, Version 2.0.  Extensible With a small, rock-solid core, Enyo is modular and designed to be extended by the developer community. Built to manage complexity Enyo\'s elegant component model makes it simple to build and maintain even the most complex apps.  Optimized for mobile Enyo has roots in mobile and was built from the ground up to shine on tablets and phones.  Lightweight & Fast Enyo is small (core is <25k gzipped) and tuned for speed and responsiveness on all supported platforms.Truly cross-platform Use the same framework to develop apps for the web and for all major platforms, desktop and mobile.  Free and open-source 100% free to use, Enyo is available under the Apache License, Version 2.0.  Extensible With a small, rock-solid core, Enyo is modular and designed to be extended by the developer community. Built to manage complexity Enyo\'s elegant component model makes it simple to build and maintain even the most complex apps.  Optimized for mobile Enyo has roots in mobile and was built from the ground up to shine on tablets and phones.  Lightweight & Fast Enyo is small (core is <25k gzipped) and tuned for speed and responsiveness on all supported platforms.Truly cross-platform Use the same framework to develop apps for the web and for all major platforms, desktop and mobile.  Free and open-source 100% free to use, Enyo is available under the Apache License, Version 2.0.  Extensible With a small, rock-solid core, Enyo is modular and designed to be extended by the developer community. Built to manage complexity Enyo\'s elegant component model makes it simple to build and maintain even the most complex apps.  Optimized for mobile Enyo has roots in mobile and was built from the ground up to shine on tablets and phones.  Lightweight & Fast Enyo is small (core is <25k gzipped) and tuned for speed and responsiveness on all supported platforms.Truly cross-platform Use the same framework to develop apps for the web and for all major platforms, desktop and mobile.  Free and open-source 100% free to use, Enyo is available under the Apache License, Version 2.0.  Extensible With a small, rock-solid core, Enyo is modular and designed to be extended by the developer community. Built to manage complexity Enyo\'s elegant component model makes it simple to build and maintain even the most complex apps.  Optimized for mobile Enyo has roots in mobile and was built from the ground up to shine on tablets and phones.  Lightweight & Fast Enyo is small (core is <25k gzipped) and tuned for speed and responsiveness on all supported platforms.Truly cross-platform Use the same framework to develop apps for the web and for all major platforms, desktop and mobile.  Free and open-source 100% free to use, Enyo is available under the Apache License, Version 2.0.  Extensible With a small, rock-solid core, Enyo is modular and designed to be extended by the developer community. Built to manage complexity Enyo\'s elegant component model makes it simple to build and maintain even the most complex apps.  Optimized for mobile Enyo has roots in mobile and was built from the ground up to shine on tablets and phones.  Lightweight & Fast Enyo is small (core is <25k gzipped) and tuned for speed and responsiveness on all supported platforms.Truly cross-platform Use the same framework to develop apps for the web and for all major platforms, desktop and mobile.  Free and open-source 100% free to use, Enyo is available under the Apache License, Version 2.0.  Extensible With a small, rock-solid core, Enyo is modular and designed to be extended by the developer community. Built to manage complexity Enyo\'s elegant component model makes it simple to build and maintain even the most complex apps.  Optimized for mobile Enyo has roots in mobile and was built from the ground up to shine on tablets and phones.  Lightweight & Fast Enyo is small (core is <25k gzipped) and tuned for speed and responsiveness on all supported platforms.Truly cross-platform Use the same framework to develop apps for the web and for all major platforms, desktop and mobile.  Free and open-source 100% free to use, Enyo is available under the Apache License, Version 2.0.  Extensible With a small, rock-solid core, Enyo is modular and designed to be extended by the developer community. Built to manage complexity Enyo\'s elegant component model makes it simple to build and maintain even the most complex apps.  Optimized for mobile Enyo has roots in mobile and was built from the ground up to shine on tablets and phones.  Lightweight & Fast Enyo is small (core is <25k gzipped) and tuned for speed and responsiveness on all supported platforms.Truly cross-platform Use the same framework to develop apps for the web and for all major platforms, desktop and mobile.  Free and open-source 100% free to use, Enyo is available under the Apache License, Version 2.0.  Extensible With a small, rock-solid core, Enyo is modular and designed to be extended by the developer community. Built to manage complexity Enyo\'s elegant component model makes it simple to build and maintain even the most complex apps.  Optimized for mobile Enyo has roots in mobile and was built from the ground up to shine on tablets and phones.  Lightweight & Fast Enyo is small (core is <25k gzipped) and tuned for speed and responsiveness on all supported platforms.Truly cross-platform Use the same framework to develop apps for the web and for all major platforms, desktop and mobile.  Free and open-source 100% free to use, Enyo is available under the Apache License, Version 2.0.  Extensible With a small, rock-solid core, Enyo is modular and designed to be extended by the developer community. Built to manage complexity Enyo\'s elegant component model makes it simple to build and maintain even the most complex apps.  Optimized for mobile Enyo has roots in mobile and was built from the ground up to shine on tablets and phones.  Lightweight & Fast Enyo is small (core is <25k gzipped) and tuned for speed and responsiveness on all supported platforms.Truly cross-platform Use the same framework to develop apps for the web and for all major platforms, desktop and mobile.  Free and open-source 100% free to use, Enyo is available under the Apache License, Version 2.0.  Extensible With a small, rock-solid core, Enyo is modular and designed to be extended by the developer community. Built to manage complexity Enyo\'s elegant component model makes it simple to build and maintain even the most complex apps.  Optimized for mobile Enyo has roots in mobile and was built from the ground up to shine on tablets and phones.  Lightweight & Fast Enyo is small (core is <25k gzipped) and tuned for speed and responsiveness on all supported platforms.Truly cross-platform Use the same framework to develop apps for the web and for all major platforms, desktop and mobile.  Free and open-source 100% free to use, Enyo is available under the Apache License, Version 2.0.  Extensible With a small, rock-solid core, Enyo is modular and designed to be extended by the developer community. Built to manage complexity Enyo\'s elegant component model makes it simple to build and maintain even the most complex apps.  Optimized for mobile Enyo has roots in mobile and was built from the ground up to shine on tablets and phones.  Lightweight & Fast Enyo is small (core is <25k gzipped) and tuned for speed and responsiveness on all supported platforms.Truly cross-platform Use the same framework to develop apps for the web and for all major platforms, desktop and mobile.  Free and open-source 100% free to use, Enyo is available under the Apache License, Version 2.0.  Extensible With a small, rock-solid core, Enyo is modular and designed to be extended by the developer community. Built to manage complexity Enyo\'s elegant component model makes it simple to build and maintain even the most complex apps.  Optimized for mobile Enyo has roots in mobile and was built from the ground up to shine on tablets and phones.  Lightweight & Fast Enyo is small (core is <25k gzipped) and tuned for speed and responsiveness on all supported platforms.Truly cross-platform Use the same framework to develop apps for the web and for all major platforms, desktop and mobile.  Free and open-source 100% free to use, Enyo is available under the Apache License, Version 2.0.  Extensible With a small, rock-solid core, Enyo is modular and designed to be extended by the developer community. Built to manage complexity Enyo\'s elegant component model makes it simple to build and maintain even the most complex apps.  Optimized for mobile Enyo has roots in mobile and was built from the ground up to shine on tablets and phones.  Lightweight & Fast Enyo is small (core is <25k gzipped) and tuned for speed and responsiveness on all supported platforms.Truly cross-platform Use the same framework to develop apps for the web and for all major platforms, desktop and mobile.  Free and open-source 100% free to use, Enyo is available under the Apache License, Version 2.0.  Extensible With a small, rock-solid core, Enyo is modular and designed to be extended by the developer community. Built to manage complexity Enyo\'s elegant component model makes it simple to build and maintain even the most complex apps.  Optimized for mobile Enyo has roots in mobile and was built from the ground up to shine on tablets and phones.  Lightweight & Fast Enyo is small (core is <25k gzipped) and tuned for speed and responsiveness on all supported platforms.Truly cross-platform Use the same framework to develop apps for the web and for all major platforms, desktop and mobile.  Free and open-source 100% free to use, Enyo is available under the Apache License, Version 2.0.  Extensible With a small, rock-solid core, Enyo is modular and designed to be extended by the developer community. Built to manage complexity Enyo\'s elegant component model makes it simple to build and maintain even the most complex apps.  Optimized for mobile Enyo has roots in mobile and was built from the ground up to shine on tablets and phones.  Lightweight & Fast Enyo is small (core is <25k gzipped) and tuned for speed and responsiveness on all supported platforms.'}
		]}
	]
});
}],'src/PanZoomViewSample3':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	PanZoomView = require('layout/PanZoomView'),
	Button = require('enyo/Button'),
	Img = require('enyo/Image');

var ImagesView = kind({
	width: 0,
	height: 0,
	published: {
		src : ''
	},
	components:[
		{kind: Img, onload: 'load', ondown: 'down'},
		{kind: Img, onload: 'load', ondown: 'down'}
	],
	create: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.srcChanged();
		};
	}),
	srcChanged: function () {
		this.height = this.width = 0;
		this.$.image.setSrc(this.src);
		this.$.image2.setSrc(this.src);
	},
	load: function (sender, ev) {
		this.width += ev.originator.node.clientWidth;
		this.height = Math.max(this.height, ev.originator.node.clientHeight);
		this.bubble('onSetDimensions', { width: this.width, height: this.height });
	},
	down: function (sender, ev) {
		// Fix to prevent image drag in Firefox
		ev.preventDefault();
	}
});

module.exports = kind({
	name: 'enyo.sample.PanZoomViewSample3',
	classes: 'enyo-unselectable',
	style: 'width: 600px; border: 1px solid #ccc; margin: auto;',
	components: [
		{kind: PanZoomView, style: 'width: 100%; height: 400px;', scale: 'fit', components: [
			{name: 'imagesView', kind: ImagesView, src: 'assets/globe.jpg'}
		]},
		{kind: Button, content: 'change image', ontap: 'changeImage'}
	],
	planets: ['assets/globe.jpg', 'assets/earth.jpg', 'assets/jupiter.jpg', 'assets/mars.jpg', 'assets/mercury.jpg', 'assets/neptune.jpg', 'assets/saturn.jpg', 'assets/uranus.jpg', 'assets/venus.jpg'],
	changeImage: function (){
		var imageview = this.$.panZoomView.$.imagesView;
		imageview.setSrc( this.planets[ (utils.indexOf(imageview.src, this.planets)+1)%this.planets.length ] );
	}
});

}],'src/ListBasicSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	List = require('layout/List'),
	NameGenerator = require('../NameGenerator');

module.exports = kind({
	name: 'enyo.sample.ListBasicSample',
	classes: 'list-sample enyo-fit',
	components: [
		{name: 'list', kind: List, count: 20000, multiSelect: false, classes: 'enyo-fit list-sample-list', onSetupItem: 'setupItem', components: [
			{name: 'item', classes: 'list-sample-item enyo-border-box', components: [
				{name: 'index', classes: 'list-sample-index'},
				{name: 'name'}
			]}
		]}
	],
	NameGenerator: [],
	setupItem: function (sender, ev) {
		// this is the row we're setting up
		var i = ev.index;
		// make some mock data if we have none for this row
		if (!this.NameGenerator[i]) {
			this.NameGenerator[i] = NameGenerator.makeName(5, 10, '', '');
		}
		var n = this.NameGenerator[i];
		var ni = ('00000000' + i).slice(-7);
		// apply selection style if sender (the list) indicates that this row is selected.
		this.$.item.addRemoveClass('list-sample-selected', sender.isSelected(i));
		this.$.name.setContent(n);
		this.$.index.setContent(ni);
		return true;
	}
});
},{'../NameGenerator':'src/NameGenerator'}],'src/ListContactsSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	job = require('enyo/job'),
	utils = require('enyo/utils');

var
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows'),
	List = require('layout/List'),
	Button = require('enyo/Button'),
	Checkbox = require('enyo/Checkbox'),
	Img = require('enyo/Image'),
	Input = require('enyo/Input'),
	Popup = require('enyo/Popup'),
	NameGenerator = require('../NameGenerator');


// It's convenient to create a kind for the item we'll render in the contacts list.
var ContactItem = kind({
	events: {
		onRemove: ''
	},
	published: {
		importance: 0
	},
	components: [
		{name: 'avatar', kind: Img, classes: 'list-sample-contacts-avatar'},
		{components: [
			{name: 'name'},
			{name: 'title', classes: 'list-sample-contacts-description'},
			{content: '(415) 711-1234', classes: 'list-sample-contacts-description'}
		]},
		{name: 'remove', classes: 'list-sample-contacts-remove-button', ontap: 'removeTap'}
	],
	setContact: function (contact) {
		this.$.name.setContent(contact.name);
		this.$.avatar.setSrc(contact.avatar);
		this.$.title.setContent(contact.title);
	},
	setSelected: function (selected) {
		this.addRemoveClass('list-sample-contacts-item-selected', selected);
		this.$.remove.applyStyle('display', selected ? 'inline-block' : 'none');
	},
	renderImportance: function () {
		switch(this.importance) {
		case 0:
			this.$.importance.setContent('not important');
			break;
		case -1:
			this.$.importance.setContent('important');
			break;
		case -2:
			this.$.importance.setContent('very important');
			break;
		default:
			window.alert(this.importance+' - wowzer');
			break;
		}
	},
	removeTap: function (sender, ev) {
		this.doRemove({index: ev.index});
		return true;
	}
});

module.exports = kind({
	name: 'enyo.sample.ListContactsSample',
	kind: FittableRows,
	classes: 'list-sample-contacts enyo-fit',
	components: [
		{
			kind: FittableColumns,
			classes: 'layout-sample-toolbar',
			style: 'height: 55px;',
			components: [
				{kind: Button, content: 'setup', ontap: 'showSetupPopup'},
				{tag: 'label', components: [
					{name: 'newContactInput', kind: Input, value: 'Frankie Fu'}
				]},
				{kind: Button, content: 'new contact', ontap: 'addItem'},
				{fit: true},
				{tag: 'label', components: [
					{kind: Input, placeholder: 'Search...', style: 'width: 140px;', oninput: 'searchInputChange'},
					{kind: Img, src: 'assets/search-input-search.png', style: 'width: 20px;'}
				]},
				{kind: Button, content: 'remove selected', ontap: 'removeSelected'}
			]
		},
		{
			kind: List,
			classes: 'list-sample-contacts-list enyo-unselectable',
			fit: true,
			multiSelect: true,
			onSetupItem: 'setupItem',
			components: [
				{name: 'divider', classes: 'list-sample-contacts-divider'},
				{name: 'item', kind: ContactItem, classes: 'list-sample-contacts-item enyo-border-box', onRemove: 'removeTap'}
			]
		},
		{
			name: 'popup',
			kind: Popup,
			modal: true,
			centered: true,
			classes: 'list-sample-contacts-popup',
			components: [
				{
					components: [
						{style: 'display:inline-block', components:[
							{content: 'count:', classes: 'list-sample-contacts-label'},
							{name: 'countOutput', kind: Input, type: 'number', value: 200, onchange: 'countChanging'}
						]}
					]
				},
				{
					components: [
						{content: 'rowsPerPage:', classes: 'list-sample-contacts-label'},
						{name: 'rowsPerPageOutput', kind: Input, type: 'number', value: 50, onchange: 'rowsChanging'}
					]
				},
				{
					components: [
						{content: 'hide divider:', classes: 'list-sample-contacts-label'},
						{name: 'hideDividerCheckbox', kind: Checkbox}
					]
				},
				{
					components: [
						{kind: Button, content: 'populate list', classes: 'list-sample-contacts-populate-button', ontap: 'populateList'}
					]
				}
			]
		}
	],
	rendered: kind.inherit (function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.populateList();
		};
	}),
	setupItem: function (sender, ev) {
		var i = ev.index;
		var data = this.filter ? this.filtered : this.db;
		var item = data[i];
		// content
		this.$.item.setContact(item);
		// selection
		this.$.item.setSelected(sender.isSelected(i));
		// divider
		if (!this.hideDivider) {
			var d = item.name[0];
			var prev = data[i-1];
			var showd = d != (prev && prev.name[0]);
			this.$.divider.setContent(d);
			this.$.divider.canGenerate = showd;
			this.$.item.applyStyle('border-top', showd ? 'none' : null);
		}
		return true;
	},
	refreshList: function () {
		if (this.filter) {
			this.filtered = this.generateFilteredData(this.filter);
			this.$.list.setCount(this.filtered.length);
		} else {
			this.$.list.setCount(this.db.length);
		}
		this.$.list.refresh();
	},
	addItem: function () {
		var item = this.generateItem(utils.cap(this.$.newContactInput.getValue()));
		var i = 0;
		for (var di; (di=this.db[i]); i++) {
			if (di.name > item.name) {
				this.db.splice(i, 0, item);
				break;
			}
		}
		// if we hit end of for-loop, add to end of list
		if (!di) {
			this.db.push(item);
		}
		this.refreshList();
		this.$.list.scrollToRow(i);
	},
	removeItem: function (index) {
		this._removeItem(index);
		this.$.list.getSelection().remove(index);
		this.refreshList();
	},
	_removeItem: function (index) {
		var i = this.filter ? this.filtered[index].dbIndex : index;
		this.db.splice(i, 1);
	},
	removeTap: function (sender, ev) {
		this.removeItem(ev.index);
		return true;
	},
	removeSelected: function () {
		// get selected items, sort numerically in decending order
		var selected = utils.keys(this.$.list.getSelection().getSelected());
		selected.sort(function (a,b) { return b-a; });
		// remove items one-by-one, starting with last in the list
		for (var i=0; i < selected.length; i++) {
			this._removeItem(selected[i]);
		}
		// clear selection, since all selected items are now gone
		this.$.list.getSelection().clear();
		// re-render list in current position
		this.refreshList();
	},
	populateList: function () {
		this.$.popup.hide();
		this.createDb(this.$.countOutput.getValue());
		this.$.list.setCount(this.db.length);
		this.$.list.setRowsPerPage(this.$.rowsPerPageOutput.getValue());
		//
		this.hideDivider = this.$.hideDividerCheckbox.getValue();
		//this.$.divider.canGenerate = !this.hideDivider;
		//
		this.$.list.reset();
	},
	createDb: function (count) {
		this.db = [];
		for (var i=0; i<count; i++) {
			this.db.push(this.generateItem(NameGenerator.makeName(4, 6) + ' ' + NameGenerator.makeName(5, 10)));
		}
		this.sortDb();
	},
	generateItem: function (name) {
		return {
			name: name,
			avatar: 'assets/avatars/' + avatars[utils.irand(avatars.length)],
			title: titles[utils.irand(titles.length)],
			importance: 0
		};
	},
	sortDb: function () {
		this.db.sort(function (a, b) {
			if (a.name < b.name) {
				return -1;
			}
			else if (a.name > b.name) {
				return 1;
			}
			else {
				return 0;
			}
		});
	},
	showSetupPopup: function () {
		this.$.popup.show();
	},
	searchInputChange: function (sender) {
		job(this.id + ':search', this.bindSafely('filterList', sender.getValue()), 200);
	},
	filterList: function (filter) {
		if (filter != this.filter) {
			this.filter = filter;
			this.filtered = this.generateFilteredData(filter);
			this.$.list.setCount(this.filtered.length);
			this.$.list.reset();
		}
	},
	generateFilteredData: function (filter) {
		var re = new RegExp('^' + filter, 'i');
		var r = [];
		for (var i=0, d; (d=this.db[i]); i++) {
			if (d.name.match(re)) {
				d.dbIndex = i;
				r.push(d);
			}
		}
		return r;
	},
	countChanging: function (sender, ev) {
		this.$.countOutput.setContent(Math.round(sender.getValue()) * 50);
	},
	rowsChanging: function (sender, ev) {
		this.$.rowsPerPageOutput.setContent(Math.round(sender.getValue()) * 5);
	}
});

var avatars = [
	'angel.png',
	'astrologer.png',
	'athlete.png',
	'baby.png',
	'clown.png',
	'devil.png',
	'doctor.png',
	'dude.png',
	'dude2.png',
	'dude3.png',
	'dude4.png',
	'dude5.png',
	'dude6.png'
];
var titles = [
	'Regional Data Producer',
	'Internal Markets Administrator',
	'Central Solutions Producer',
	'Dynamic Program Executive',
	'Direct Configuration Executive',
	'International Marketing Assistant',
	'District Research Consultant',
	'Lead Intranet Coordinator',
	'Central Accountability Director',
	'Product Web Assistant'
];
},{'../NameGenerator':'src/NameGenerator'}],'src/ListHorizontalFlickrSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows'),
	List = require('layout/List'),
	Button = require('enyo/Button'),
	Component = require('enyo/Component'),
	Img = require('enyo/Image'),
	Input = require('enyo/Input'),
	JsonpRequest = require('enyo/Jsonp');

// A simple component to do a Flickr search.
var ListHorizontalFlickrSearch = kind({
	kind: Component,
	published: {
		searchText: ''
	},
	events: {
		onResults: ''
	},
	url: 'https://api.flickr.com/services/rest/',
	pageSize: 200,
	api_key: '2a21b46e58d207e4888e1ece0cb149a5',
	search: function (searchText, page) {
		this.searchText = searchText || this.searchText;
		var i = (page || 0) * this.pageSize;
		var params = {
			method: 'flickr.photos.search',
			format: 'json',
			api_key: this.api_key,
			per_page: this.pageSize,
			page: i,
			text: this.searchText
		};
		return new JsonpRequest({url: this.url, callbackName: 'jsoncallback'})
			.response(this, 'processResponse')
			.go(params);
	},
	processResponse: function (sender, res) {
		var photos = res.photos ? res.photos.photo || [] : [];
		for (var i=0, p; (p=photos[i]); i++) {
			var urlprefix = 'http://farm' + p.farm + '.static.flickr.com/' + p.server + '/' + p.id + '_' + p.secret;
			p.thumbnail = urlprefix + '_s.jpg';
			p.original = urlprefix + '.jpg';
		}
		this.doResults(photos);
		return photos;
	}
});

module.exports = kind({
	name: 'enyo.sample.ListHorizontalFlickrSample',
	classes: 'enyo-unselectable enyo-fit list-sample-flickr',
	components: [
		{kind: FittableRows, components: [
			{classes: 'layout-sample-toolbar', components: [
				{kind: FittableColumns, tag: 'label', style: 'width: 90%;', components: [
					{name: 'searchInput', fit: true, kind: Input, value: 'Japan', onchange: 'search'},
					{kind: Img, src: 'assets/search-input-search.png', style: 'width: 20px; height: 20px;'}
				]},
				{name: 'searchSpinner', kind: Img, src: 'assets/spinner.gif', showing: false}
			]},
			{kind: List, orient: 'h', fit: true, onSetupItem: 'setupItem', components: [
				{name: 'item', style: 'padding: 10px;', classes: 'list-sample-flickr-item enyo-border-box', ontap: 'itemTap', components: [
					{name: 'thumbnail', kind: Img, classes: 'list-sample-flickr-thumbnail'}
				]},
				{name: 'more', style: 'padding: 10px;position:absolute', classes: 'list-sample-flickr-more enyo-border-box', components: [
					{kind: Button, content: 'more',  ontap: 'more'},
					{name: 'moreSpinner', kind: Img, src: 'assets/spinner.gif', classes: 'list-sample-flickr-more-spinner'}
				]}
			]}
		]},
		{kind: ListHorizontalFlickrSearch, name: 'flickrSearch', onResults: 'searchResults'}
	],
	rendered: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.search();
		};
	}),
	search: function () {
		this.searchText = this.$.searchInput.getValue();
		this.page = 0;
		this.results = [];
		this.$.searchSpinner.show();
		this.$.flickrSearch.search(this.searchText);
	},
	searchResults: function (sender, results) {
		this.$.searchSpinner.hide();
		this.$.moreSpinner.hide();
		this.results = this.results.concat(results);
		this.$.list.setCount(this.results.length);
		if (this.page === 0) {
			this.$.list.reset();
		} else {
			this.$.list.refresh();
		}
		return true;
	},
	setupItem: function (sender, ev) {
		var i = ev.index;
		var item = this.results[i];
		this.$.item.addRemoveClass('onyx-selected', sender.isSelected(ev.index));
		this.$.thumbnail.setSrc(item.thumbnail);
		this.$.more.canGenerate = !this.results[i+1];
		return true;
	},
	more: function () {
        this.page++;
		this.$.moreSpinner.show();
        this.$.flickrSearch.search(this.searchText, this.page);
	},
	showList: function () {
		this.setIndex(0);
	}
});
}],'src/ListLanguagesSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows'),
	List = require('layout/List'),
	Button = require('enyo/Button'),
	Input = require('enyo/Input');

module.exports = kind({
	name: 'enyo.sample.ListLanguagesSample',
	kind: FittableRows,
	classes: 'list-sample-language enyo-fit',
	data: [],
	languages: {
		English: ['One',  'Two',  'Three', 'Four',    'Five',    'Six',   'Seven',  'Eight', 'Nine',  'Ten'],
		Italian: ['Uno',  'Due',  'Tre',   'Quattro', 'Cinque',  'Sei',   'Sette',  'Otto',  'Nove',  'Dieci'],
		Spanish: ['Uno',  'Dos',  'Tres',  'Cuatro',  'Cinco',   'Seis',  'Siete',  'Ocho',  'Nueve', 'Diez'],
		German:  ['Eins', 'Zwei', 'Drei',  'Vier',    'F\xFCnf', 'Sechs', 'Sieben', 'Acht',  'Neun',  'Zehn'],
		French:  ['Un',   'Deux', 'Trois', 'Quatre',  'Cinq',    'Six',   'Sept',   'Huit',  'Neuf',  'Dix']
	},
	components: [
		{kind: FittableColumns, classes: 'layout-sample-toolbar', style: 'height: 55px;', components: [
			{content: 'Rows:'},
			{tag: 'label', components: [
				{kind: Input, value: '10', name: 'numRows' }
			]},
			{kind: Button, content: 'Repopulate', ontap: 'populateList'}
		]},
		{
			kind: List,
			classes: 'list-sample-language-list enyo-unselectable',
			fit: true,
			multiSelect: true,
			reorderable: true,
			centerReorderContainer: false,
			enableSwipe: true,
			onSetupItem: 'setupItem',
			onReorder: 'listReorder',
			onSetupReorderComponents: 'setupReorderComponents',
			// onSetupPinnedReorderComponents: 'setupPinnedReorderComponents',
			onSetupSwipeItem: 'setupSwipeItem',
			onSwipeComplete: 'swipeComplete',
			components: [
				{name: 'item', classes: 'list-sample-language-item', components: [
					{name: 'text', classes: 'itemLabel'},
					{name: 'rowNumber', classes: 'rowNumberLabel'},
					{name: 'serial', classes: 'serialLabel'}
				]}
			],
			reorderComponents: [
				{name: 'reorderContent', classes: 'enyo-fit reorderDragger', components: [
					{name: 'reorderTitle', tag: 'h2', allowHtml: true}
				]}
			],
			// For Enyo 2.2, we comment out these components to disable pinned mode which is still
			// considered a work in progress.
			/* pinnedReorderComponents: [
				{name: 'pinnedReorderItem', classes: 'enyo-fit swipeGreen', components: [
					{name: 'pinnedReorderTitle', tag: 'h2', allowHtml: true},
					{name: 'dropButton', kind: 'onyx.Button', ontap: 'dropPinnedRow', content: 'Drop', classes: 'dropButton'},
					{name: 'cancelButton', kind: 'onyx.Button', ontap: 'cancelPinnedMode', content: 'Cancel', classes: 'cancelButton'}
				]}
			], */
			swipeableComponents: [
				{name: 'swipeItem', classes: 'enyo-fit swipeGreen', components: [
					{name: 'swipeTitle', classes: 'swipeTitle'}
				]}
			]
		}
	],
	rendered: kind.inherit(function (sup) {
		return function() {
			sup.apply(this, arguments);
			this.populateList();
		};
	}),
	listReorder: function (sender, ev) {
		var movedItem = utils.clone(this.data[ev.reorderFrom]);
		this.data.splice(ev.reorderFrom,1);
		this.data.splice((ev.reorderTo),0,movedItem);
	},
	setupItem: function (sender, ev) {
		var i = ev.index;
		if(!this.data[i]) {
			return;
		}
		var currentLanguage = this.data[i].langs[this.data[i].currentIndex];
		var val = this.data[i].val;
		var number = this.languages[currentLanguage][val];
		var serial = this.data[i].serial;
		this.$.rowNumber.setContent('ROW ' + i);
		this.$.text.setContent(number);
		this.$.serial.setContent('#' + serial);
	},
	setupReorderComponents: function (sender, ev) {
		var i = ev.index;
		if(!this.data[i]) {
			return;
		}
		var currentLanguage = this.data[i].langs[this.data[i].currentIndex];
		var val = this.data[i].val;
		var number = this.languages[currentLanguage][val];
		this.$.reorderTitle.setContent(number);
		return true;
	},
	/* setupPinnedReorderComponents: function(sender, ev) {
		var i = ev.index;
		if(!this.data[i]) {
			return;
		}
		var currentLanguage = this.data[i].langs[this.data[i].currentIndex];
		var val = this.data[i].val;
		var number = this.languages[currentLanguage][val];
		this.$.pinnedReorderTitle.setContent(number);
	}, */
	//* Called when the 'Drop' button is pressed on the pinned placeholder row
	/* dropPinnedRow: function(sender, ev) {
		this.$.list.dropPinnedRow(ev);
	}, */
	//* Called when the 'Cancel' button is pressed on the pinned placeholder row
	/* cancelPinnedMode: function(sender, ev) {
		this.$.list.cancelPinnedMode(ev);
	}, */
	setupSwipeItem: function (sender, ev) {
		var i = ev.index;
		if(!this.data[i]) {
			return;
		}
		var newLang = (ev.xDirection == 1)
			? this.getNextLang(i)
			: this.getPrevLang(i);
		this.$.swipeTitle.setContent(this.data[i].langs[newLang]);
		return true;
	},
	swipeComplete: function (sender, ev) {
		var i = ev.index;
		this.data[i].currentIndex = (ev.xDirection == 1)
			? this.getNextLang(i)
			: this.getPrevLang(i);
		this.$.list.renderRow(i);
	},
	getNextLang: function (index) {
		var currentLang = this.data[index].currentIndex;
		return (currentLang + 1) % this.data[index].langs.length;
	},
	getPrevLang: function (index) {
		var currentLang = this.data[index].currentIndex;
		return (currentLang - 1 + this.data[index].langs.length) % this.data[index].langs.length;
	},
	populateList: function () {
		this.createRandomData();
		this.$.list.setCount(this.data.length);
		this.$.list.reset();
	},
	createRandomData: function () {
		var languages = this.getLanguages();
		var langs;
		var dataCount = parseInt(this.$.numRows.getValue(), 10);
		this.data = [];
		var sortFunc = function() {return 0.5 - Math.random();};
		for(var i=0;i<dataCount;i++) {
			langs = utils.clone(languages);
			langs.sort(sortFunc);
			this.data.push({
				langs: langs,
				val: i % 10,
				currentIndex: 0,
				serial: i
			});
		}
		this.data.sort(function() {return 0.5 - Math.random();});
	},
	getLanguages: function () {
		return utils.keys(this.languages);
	}
});
}],'src/ListNoSelectSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	List = require('layout/List'),
	NameGenerator = require('./NameGenerator');

module.exports = kind({
	name: 'enyo.sample.ListNoSelectSample',
	classes: 'list-sample enyo-fit',
	components: [
		{name: 'list', kind: List, count: 20000, noSelect: true, multiSelect: false, classes: 'enyo-fit list-sample-list',
			onSetupItem: 'setupItem', components: [
			{name: 'item', classes: 'list-sample-item enyo-border-box', components: [
				{name: 'index', classes: 'list-sample-index'},
				{name: 'name'}
			]}
		]}
	],
	NameGenerator: [],
	setupItem: function (sender, ev) {
		// this is the row we're setting up
		var i = ev.index;
		// make some mock data if we have none for this row
		if (!this.NameGenerator[i]) {
			this.NameGenerator[i] = NameGenerator.makeName(5, 10, '', '');
		}
		var n = this.NameGenerator[i];
		var ni = ('00000000' + i).slice(-7);
		this.$.name.setContent(n);
		this.$.index.setContent(ni);
		return true;
	}
});

},{'./NameGenerator':'src/NameGenerator'}],'src/PersistentSwipeableItemSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	List = require('layout/List');

module.exports = kind({
	name: 'enyo.sample.PersistentSwipeableItemSample',
	kind: FittableRows,
	classes: 'list-sample-persistent-swipeable-item enyo-fit',
	data: ['Cat','Dog','Hippopotamus'],
	components: [
		{
			kind: List,
			classes: 'list-sample-persistent-swipeable-item-list enyo-unselectable',
			fit: true,
			multiSelect: true,
			reorderable: false,
			enableSwipe: true,
			centerReorderContainer: false,
			onSetupItem: 'setupItem',
			onSetupSwipeItem: 'setupSwipeItem',
			onSwipeComplete: 'swipeComplete',
			components: [
				{name: 'item', classes: 'list-sample-persistent-swipeable-item-item', components: [
					{name: 'text', classes: 'itemLabel', allowHtml: true}
				]}
			],
			swipeableComponents: [
				{name: 'swipeItem', classes: 'enyo-fit swipeGreen', components: [
					{name: 'swipeTitle', classes: 'swipeTitle', content: 'This is a test'}
				]}
			]
		}
	],
	rendered: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.populateList();
		};
	}),
	populateList: function () {
		this.$.list.setCount(this.data.length);
		this.$.list.reset();
	},
	setupItem: function (sender, ev) {
		if(!this.data[ev.index]) {
			return;
		}

		this.$.text.setContent(this.data[ev.index]);
		return true;
	},
	setupSwipeItem: function (sender, ev) {
		if(!this.data[ev.index]) {
			return true;
		}

		if(ev.xDirection === -1) {
			// Persist swipeable item if swiped from right to left
			this.$.list.setPersistSwipeableItem(true);
			this.$.swipeTitle.setContent('This is a persistent item');
			this.$.swipeItem.removeClass('swipeGreen');
			this.$.swipeItem.addClass('swipeRed');
		} else {
			// Don't persist swipeable item if swiped from left to right
			this.$.list.setPersistSwipeableItem(false);
			this.$.swipeTitle.setContent('This is not a persistent item');
			this.$.swipeItem.removeClass('swipeRed');
			this.$.swipeItem.addClass('swipeGreen');
		}
		return true;
	},
	swipeComplete: function (sender, ev) {
	}
});
}],'src/PanelsFlickrSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	json = require('enyo/json');

var
	CollapsingArranger = require('layout/CollapsingArranger'),
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows'),
	List = require('layout/List'),
	Panels = require('layout/Panels'),
	Ajax = require('enyo/Ajax'),
	Button = require('enyo/Button'),
	Component = require('enyo/Component'),
	Img = require('enyo/Image'),
	Input = require('enyo/Input'),
	JsonpRequest = require('enyo/Jsonp');

// A simple component to do a Flickr search.
var PanelsFlickrSearch = kind({
	kind: Component,
	published: {
		searchText: ''
	},
	events: {
		onResults: ''
	},
	url: 'https://api.flickr.com/services/rest/',
	pageSize: 200,
	api_key: '2a21b46e58d207e4888e1ece0cb149a5',
	search: function (searchText, page) {
		this.searchText = searchText || this.searchText;
		var i = (page || 0) * this.pageSize;
		var params = {
			method: 'flickr.photos.search',
			format: 'json',
			api_key: this.api_key,
			per_page: this.pageSize,
			page: i,
			text: this.searchText
		};
		var req;
		if (window.location.protocol === 'ms-appx:') {
			params.nojsoncallback = 1;
			// Use ajax for platforms with no jsonp support (Windows 8)
			req = new Ajax({url: this.url, handleAs: 'text'})
				.response(this, 'processAjaxResponse')
				.go(params);
		} else {
			req = new JsonpRequest({url: this.url, callbackName: 'jsoncallback'})
				.response(this, 'processResponse')
				.go(params);
		}
		return req;
	},
	processAjaxResponse: function (sender, res) {
		res = json.parse(res);
		this.processResponse(sender, res);
	},
	processResponse: function (sender, res) {
		var photos = res.photos ? res.photos.photo || [] : [];
		for (var i=0, p; (p=photos[i]); i++) {
			var urlprefix = 'http://farm' + p.farm + '.static.flickr.com/' + p.server + '/' + p.id + '_' + p.secret;
			p.thumbnail = urlprefix + '_s.jpg';
			p.original = urlprefix + '.jpg';
		}
		this.doResults(photos);
		return photos;
	}
});

module.exports = kind({
	name: 'enyo.sample.PanelsFlickrSample',
	kind: Panels,
	classes: 'panels-sample-flickr-panels enyo-unselectable enyo-fit',
	arrangerKind: CollapsingArranger,
	components: [
		{kind: FittableRows, classes: 'enyo-fit', components: [
			{components: [
				{kind: FittableColumns, tag: 'label', style: 'width: 90%;', components: [
					{name: 'searchInput', fit: true, kind: Input, value: 'Japan', onchange: 'search'},
					{kind: Img, src: 'assets/search-input-search.png', style: 'width: 20px; height: 20px;'}
				]},
				{name: 'searchSpinner', kind: Img, src: 'assets/spinner.gif', showing: false}
			]},
			{kind: List, fit: true, touch: true, onSetupItem: 'setupItem', components: [
				{name: 'item', style: 'padding: 10px;', classes: 'panels-sample-flickr-item enyo-border-box', ontap: 'itemTap', components: [
					{name: 'thumbnail', kind: Img, classes: 'panels-sample-flickr-thumbnail'},
					{name: 'title', classes: 'panels-sample-flickr-title'}
				]},
				{name: 'more', style: 'background-color: #323232;', components: [
					{kind: Button, content: 'more photos', classes: 'onyx-dark panels-sample-flickr-more-button', ontap: 'more'},
					{name: 'moreSpinner', kind: Img, src: 'assets/spinner.gif', classes: 'panels-sample-flickr-more-spinner'}
				]}
			]}
		]},
		{name: 'pictureView', fit: true, kind: FittableRows, classes: 'enyo-fit panels-sample-flickr-main', components: [
			{name: 'backToolbar', showing: false, components: [
				{kind: Button, content: 'Back', ontap: 'showList'}
			]},
			{fit: true, style: 'position: relative;', components: [
				{name: 'flickrImage', kind: Img, classes: 'enyo-fit panels-sample-flickr-center panels-sample-flickr-image', showing: false, onload: 'imageLoaded', onerror: 'imageLoaded'},
				{name: 'imageSpinner', kind: Img, src: 'assets/spinner-large.gif', classes: 'enyo-fit panels-sample-flickr-center', showing: false}
			]}
		]},
		{name: 'flickrSearch', kind: PanelsFlickrSearch, onResults: 'searchResults'}
	],
	rendered: kind.inherit(function (sup) {
		return function() {
			sup.apply(this, arguments);
			this.search();
		};
	}),
	reflow: kind.inherit(function (sup) {
		return function() {
			sup.apply(this, arguments);
			var backShowing = this.$.backToolbar.showing;
			this.$.backToolbar.setShowing(Panels.isScreenNarrow());
			if (this.$.backToolbar.showing != backShowing) {
				this.$.pictureView.resize();
			}
		};
	}),
	search: function () {
		this.searchText = this.$.searchInput.getValue();
		this.page = 0;
		this.results = [];
		this.$.searchSpinner.show();
		this.$.flickrSearch.search(this.searchText);
	},
	searchResults: function (sender, results) {
		this.$.searchSpinner.hide();
		this.$.moreSpinner.hide();
		this.results = this.results.concat(results);
		this.$.list.setCount(this.results.length);
		if (this.page === 0) {
			this.$.list.reset();
		} else {
			this.$.list.refresh();
		}
	},
	setupItem: function (sender, ev) {
		var i = ev.index;
		var item = this.results[i];
		this.$.item.addRemoveClass('onyx-selected', sender.isSelected(ev.index));
		this.$.thumbnail.setSrc(item.thumbnail);
		this.$.title.setContent(item.title || 'Untitled');
		this.$.more.canGenerate = !this.results[i+1];
		return true;
	},
	more: function () {
		this.page++;
		this.$.moreSpinner.show();
		this.$.flickrSearch.search(this.searchText, this.page);
	},
	itemTap: function (sender, ev) {
		if (Panels.isScreenNarrow()) {
			this.setIndex(1);
		}
		this.$.imageSpinner.show();
		var item = this.results[ev.index];

		if (item.original == this.$.flickrImage.getSrc()) {
			this.imageLoaded();
		} else {
			this.$.flickrImage.hide();
			this.$.flickrImage.setSrc(item.original);
		}
	},
	imageLoaded: function () {
		var img = this.$.flickrImage;
		img.removeClass('tall');
		img.removeClass('wide');
		img.show();
		var b = img.getBounds();
		var r = b.height / b.width;
		if (r >= 1.25) {
			img.addClass('tall');
		} else if (r <= 0.8 ) {
			img.addClass('wide');
		}
		this.$.imageSpinner.hide();
	},
	showList: function () {
		this.setIndex(0);
	}
});

}],'src/PanelsSlidingSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	CollapsingArranger = require('layout/CollapsingArranger'),
	Panels = require('layout/Panels'),
	List = require('layout/List'),
	Checkbox = require('enyo/Checkbox'),
	Scroller = require('enyo/Scroller');

module.exports = kind({
	name: 'enyo.sample.PanelsSlidingSample',
	kind: FittableRows,
	classes: 'enyo-fit',
	components: [
		{tag: 'label', components: [
			{tag: 'span', content: 'Realtime'},
			{kind: Checkbox, onchange: 'checkboxChange'}
		]},
		{kind: Panels, fit: true, classes: 'panels-sample-sliding-panels', arrangerKind: CollapsingArranger, wrap: false, components: [
			{name: 'left', components: [
				{kind: List, classes: 'enyo-fit', touch: true, count: 1000, onSetupItem: 'setupItem', item: 'item1', components: [
					{name: 'item1', classes: 'panels-sample-sliding-item'}
				]}
			]},
			{name: 'middle', components: [
				{kind: List, classes: 'enyo-fit', touch: true, count: 1000, onSetupItem: 'setupItem', item: 'item2', components: [
					{name: 'item2', classes: 'panels-sample-sliding-item'}
				]}
			]},
			{name: 'body', fit: true, components: [
				{kind: Scroller, classes: 'enyo-fit', touch: true, components: [
					{classes: 'panels-sample-sliding-content', content: 'Broke, down dumb hospitality firewood chitlins. Has mud tired uncle everlastin\' cold, out. Hauled thar, up thar tar heffer quarrel farmer fish water is. Simple gritts dogs soap give kickin\'. Ain\'t shiney water range, preacher java rent thar go. Skinned wirey tin farm, trespassin\' it, rodeo. Said roped caught creosote go simple. Buffalo butt, jig fried commencin\' cipherin\' maw, wash. Round-up barefoot jest bible rottgut sittin\' trailer shed jezebel. Crop old over poker drinkin\' dirt where tools skinned, city-slickers tools liniment mush tarnation. Truck lyin\' snakeoil creosote, old a inbred pudneer, slap dirty cain\'t. Hairy, smokin\', nothin\' highway hootch pigs drinkin\', barefoot bootleg hoosegow mule. Tax-collectors uncle wuz, maw watchin\' had jumpin\' got redblooded gimmie truck shootin\' askin\' hootch. No fat ails fire soap cabin jail, reckon if trespassin\' fixin\' rustle jest liniment. Ya huntin\' catfish shot good bankrupt. Fishin\' sherrif has, fat cooked shed old. Broke, down dumb hospitality firewood chitlins. Has mud tired uncle everlastin\' cold, out. Hauled thar, up thar tar heffer quarrel farmer fish water is. Simple gritts dogs soap give kickin\'. Ain\'t shiney water range, preacher java rent thar go. Skinned wirey tin farm, trespassin\' it, rodeo. Said roped caught creosote go simple. Buffalo butt, jig fried commencin\' cipherin\' maw, wash. Round-up barefoot jest bible rottgut sittin\' trailer shed jezebel. Crop old over poker drinkin\' dirt where tools skinned, city-slickers tools liniment mush tarnation. Truck lyin\' snakeoil creosote, old a inbred pudneer, slap dirty cain\'t. Hairy, smokin\', nothin\' highway hootch pigs drinkin\', barefoot bootleg hoosegow mule. Tax-collectors uncle wuz, maw watchin\' had jumpin\' got redblooded gimmie truck shootin\' askin\' hootch. No fat ails fire soap cabin jail, reckon if trespassin\' fixin\' rustle jest liniment. Ya huntin\' catfish shot good bankrupt. Fishin\' sherrif has, fat cooked shed old. Broke, down dumb hospitality firewood chitlins. Has mud tired uncle everlastin\' cold, out. Hauled thar, up thar tar heffer quarrel farmer fish water is. Simple gritts dogs soap give kickin\'. Ain\'t shiney water range, preacher java rent thar go. Skinned wirey tin farm, trespassin\' it, rodeo. Said roped caught creosote go simple. Buffalo butt, jig fried commencin\' cipherin\' maw, wash. Round-up barefoot jest bible rottgut sittin\' trailer shed jezebel. Crop old over poker drinkin\' dirt where tools skinned, city-slickers tools liniment mush tarnation. Truck lyin\' snakeoil creosote, old a inbred pudneer, slap dirty cain\'t. Hairy, smokin\', nothin\' highway hootch pigs drinkin\', barefoot bootleg hoosegow mule. Tax-collectors uncle wuz, maw watchin\' had jumpin\' got redblooded gimmie truck shootin\' askin\' hootch. No fat ails fire soap cabin jail, reckon if trespassin\' fixin\' rustle jest liniment. Ya huntin\' catfish shot good bankrupt. Fishin\' sherrif has, fat cooked shed old. Broke, down dumb hospitality firewood chitlins. Has mud tired uncle everlastin\' cold, out. Hauled thar, up thar tar heffer quarrel farmer fish water is. Simple gritts dogs soap give kickin\'. Ain\'t shiney water range, preacher java rent thar go. Skinned wirey tin farm, trespassin\' it, rodeo. Said roped caught creosote go simple. Buffalo butt, jig fried commencin\' cipherin\' maw, wash. Round-up barefoot jest bible rottgut sittin\' trailer shed jezebel. Crop old over poker drinkin\' dirt where tools skinned, city-slickers tools liniment mush tarnation. Truck lyin\' snakeoil creosote, old a inbred pudneer, slap dirty cain\'t. Hairy, smokin\', nothin\' highway hootch pigs drinkin\', barefoot bootleg hoosegow mule. Tax-collectors uncle wuz, maw watchin\' had jumpin\' got redblooded gimmie truck shootin\' askin\' hootch. No fat ails fire soap cabin jail, reckon if trespassin\' fixin\' rustle jest liniment. Ya huntin\' catfish shot good bankrupt. Fishin\' sherrif has, fat cooked shed old.'}
				]}
			]}
		]}
	],
	setupItem: function (sender, ev) {
		this.$[sender.item].setContent('This is row number: ' + ev.index);
		return true;
	},
	checkboxChange: function (sender) {
		this.$.panels.realtimeFit = sender.getValue();
		return true;
	}
});
}],'../strawman/ScrollingSampleList':[function (module,exports,global,require,request){
var
	Scroller = require('enyo/Scroller');

var
	SampleList = require('./SampleList');

module.exports = SampleList.kind({
	components: [
		{name: 'client', kind: Scroller, classes: 'enyo-fit'},
		{content: '<', classes: 'strawman-sample-back', ontap:'goBack'}
	],
	goBack: function() {
 		global.history.go(-1);
 		return false;
  	}
});

},{'./SampleList':'../strawman/SampleList'}],'src/ImageViewSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	EnyoImage = require('enyo/Image');

var
	ImageView = require('layout/ImageView'),
	ImageViewPin = require('layout/ImageViewPin');

/**
	Our map pin icon is based in whole or in part on the OpenStructs open source information and documentation,
	largely developed by Structured Dynamics LLC. You are free to use this content and system as you wish, so long
	as any derivative works acknowledge these contributions. TechWiki is provided under the Creative Commons
	Attribution License, version 3.0. - http://techwiki.openstructs.org/index.php/Open_Source_Icons
*/
module.exports = kind({
	name: 'enyo.sample.ImageViewSample',
	components: [
		{name: 'sampleImageView', kind: ImageView, src: 'assets/globe.jpg', scale: 'auto', classes: 'enyo-fit', components: [
			{kind: ImageViewPin, highlightAnchorPoint:true, anchor: {top:79, right:224}, position: {bottom:0, left:-16}, components: [
				{kind: EnyoImage, src: 'assets/pin.png'}
			]},
			{kind: ImageViewPin, anchor: {top:280, left:415}, position: {bottom:0, right:-16}, components: [
				{kind: EnyoImage, src: 'assets/pin.png'}
			]},
			{kind: ImageViewPin, highlightAnchorPoint:true, anchor: {bottom: '20%', left: '400px'}, position: {bottom:0, left:0}, components: [
				{style: 'background:rgba(255,255,255,0.8);border:1px solid #888;margin:0px;padding:0px;width:300px', components: [
					{tag: 'h3', content: 'This is a text box'}
				]}
			]},
			{name: 'testPin', kind: ImageViewPin, anchor: {top: '10%', right: '10%'}, position: {top:0, left:0}, components: [
				{style: 'border:1px solid yellow;width:10px;background:red;height:10px;'}
			]}
		]}
	]
});


}],'src/ListAroundSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	job = require('enyo/job'),
	utils = require('enyo/utils');

var
	Icon = require('onyx/Icon');

var
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows'),
	AroundList = require('layout/AroundList'),
	Button = require('enyo/Button'),
	Checkbox = require('enyo/Checkbox'),
	Img = require('enyo/Image'),
	Input = require('enyo/Input'),
	Popup = require('enyo/Popup'),
	NameGenerator = require('../NameGenerator');

// It's convenient to create a kind for the item we'll render in the contacts list.
var AroundListContactItem = kind({
	events: {
		onRemove: ''
	},
	components: [
		{name: 'avatar', kind: Img, classes: 'list-sample-around-avatar'},
		{components: [
			{name: 'name', classes: 'list-sample-around-name'},
			{name: 'title', classes: 'list-sample-around-description'},
			{content: '(415) 711-1234', classes: 'list-sample-around-description'}
		]},
		{name: 'remove', kind: Icon, classes: 'list-sample-around-remove-button', src: 'assets/remove-icon.png', ontap: 'removeTap'}
	],
	setContact: function (contact) {
		this.$.name.setContent(contact.name);
		this.$.avatar.setSrc(contact.avatar);
		this.$.title.setContent(contact.title);
	},
	setSelected: function (selected) {
		this.addRemoveClass('list-sample-around-item-selected', selected);
		this.$.remove.applyStyle('display', selected ? 'inline-block' : 'none');
	},
	removeTap: function (sender, ev) {
		this.doRemove({index: ev.index});
		return true;
	}
});

module.exports = kind({
	name: 'enyo.sample.ListAroundSample',
	kind: FittableRows,
	classes: 'enyo-fit enyo-unselectable',
	components: [
		{name: 'list', kind: AroundList, classes: 'list-sample-around', fit: true, multiSelect: true, onSetupItem: 'setupItem', aboveComponents: [
			{kind: FittableColumns, classes: 'layout-sample-toolbar', components: [
				{kind: FittableColumns, tag: 'label', fit: true, noStretch: true, components: [
					{kind: Input, placeholder: 'Search...', fit: true, oninput: 'searchInputChange'},
					{kind: Img, src: 'assets/search-input-search.png', style: 'height: 20px; width: 20px;'}
				]}
			]}
		], components: [
			{name: 'divider', classes: 'list-sample-around-divider'},
			{name: 'item', kind: AroundListContactItem, classes: 'list-sample-around-item enyo-border-box', onRemove: 'removeTap'}
		]},
		{name: 'popup', kind: Popup, modal: true, centered: true, classes: 'list-sample-around-popup', components: [
			{components: [
				{content: 'count:', classes: 'list-sample-around-label'},
				{tag: 'label', components: [
					{name: 'countInput', kind: Input, style: 'width: 80px', value: 100}
				]}
			]},
			{components: [
				{content: 'rowsPerPage:', classes: 'list-sample-around-label'},
				{tag: 'label', components: [
					{name: 'rowsPerPageInput', kind: Input, style: 'width: 80px', value: 50}
				]}
			]},
			{components: [
				{content: 'hide divider:', classes: 'list-sample-around-label'},
				{name: 'hideDividerCheckbox', kind: Checkbox}
			]},
			{components: [
				{kind: Button, content: 'populate list', classes: 'list-sample-around-populate-button', ontap: 'populateList'}
			]}
		]}
	],
	rendered: kind.inherit(function (sup) {
		return function() {
			sup.apply(this, arguments);
			this.populateList();
		};
	}),
	setupItem: function (sender, ev) {
		var i = ev.index;
		var data = this.filter ? this.filtered : this.db;
		var item = data[i];
		// content
		this.$.item.setContact(item);
		// selection
		this.$.item.setSelected(sender.isSelected(i));
		// divider
		if (!this.hideDivider) {
			var d = item.name[0];
			var prev = data[i-1];
			var showd = d != (prev && prev.name[0]);
			this.$.divider.setContent(d);
			this.$.divider.canGenerate = showd;
			this.$.item.applyStyle('border-top', showd ? 'none' : null);
		}
		return true;
	},
	refreshList: function () {
		if (this.filter) {
			this.filtered = this.generateFilteredData(this.filter);
			this.$.list.setCount(this.filtered.length);
		} else {
			this.$.list.setCount(this.db.length);
		}
		this.$.list.refresh();
	},
	addItem: function () {
		var item = this.generateItem(utils.cap(this.$.newContactInput.getValue()));
		var i = 0;
		for (var di; (di=this.db[i]); i++) {
			if (di.name > item.name) {
				this.db.splice(i, 0, item);
				break;
			}
		}
		this.refreshList();
		this.$.list.scrollToRow(i);
	},
	removeItem: function (index) {
		this._removeItem(index);
		this.refreshList();
		this.$.list.getSelection().deselect(index);
	},
	_removeItem: function (index) {
		var i = this.filter ? this.filtered[index].dbIndex : index;
		this.db.splice(i, 1);
	},
	removeTap: function (sender, ev) {
		this.removeItem(ev.index);
		return true;
	},
	populateList: function () {
		this.$.popup.hide();
		this.createDb(this.$.countInput.getValue());
		this.$.list.setCount(this.db.length);
		this.$.list.setRowsPerPage(this.$.rowsPerPageInput.getValue());
		//
		this.hideDivider = this.$.hideDividerCheckbox.getValue();
		this.$.divider.canGenerate = !this.hideDivider;
		//
		this.$.list.reset();
		this.$.list.scrollToContentStart();
	},
	createDb: function (count) {
		this.db = [];
		for (var i=0; i<count; i++) {
			this.db.push(this.generateItem(NameGenerator.makeName(4, 6) + ' ' + NameGenerator.makeName(5, 10)));
		}
		this.sortDb();
	},
	generateItem: function (name) {
		return {
			name: name,
			avatar: 'assets/avatars' + '/' + avatars[utils.irand(avatars.length)],
			title: titles[utils.irand(titles.length)]
		};
	},
	sortDb: function () {
		this.db.sort(function (a, b) {
			if (a.name < b.name) {
				return -1;
			}
			else if (a.name > b.name) {
				return 1;
			}
			else {
				return 0;
			}
		});
	},
	showSetupPopup: function () {
		this.$.popup.show();
	},
	searchInputChange: function (sender) {
		job(this.id + ':search', this.bindSafely('filterList', sender.getValue()), 200);
		return true;
	},
	filterList: function (filter) {
		if (filter != this.filter) {
			this.filter = filter;
			this.filtered = this.generateFilteredData(filter);
			this.$.list.setCount(this.filtered.length);
			this.$.list.reset();
		}
	},
	generateFilteredData: function (filter) {
		var re = new RegExp('^' + filter, 'i');
		var r = [];
		for (var i=0, d; (d=this.db[i]); i++) {
			if (d.name.match(re)) {
				d.dbIndex = i;
				r.push(d);
			}
		}
		return r;
	}
});

var avatars = [
	'angel.png',
	'astrologer.png',
	'athlete.png',
	'baby.png',
	'clown.png',
	'devil.png',
	'doctor.png',
	'dude.png',
	'dude2.png',
	'dude3.png',
	'dude4.png',
	'dude5.png',
	'dude6.png'
];
var titles = [
	'Regional Data Producer',
	'Internal Markets Administrator',
	'Central Solutions Producer',
	'Dynamic Program Executive',
	'Direct Configuration Executive',
	'International Marketing Assistant',
	'District Research Consultant',
	'Lead Intranet Coordinator',
	'Central Accountability Director',
	'Product Web Assistant'
];
},{'../NameGenerator':'src/NameGenerator'}],'src/ListPulldownSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	json = require('enyo/json');

var
	PulldownList = require('layout/PulldownList'),
	FittableRows = require('layout/FittableRows'),
	Ajax = require('enyo/Ajax'),
	Button = require('enyo/Button'),
	Img = require('enyo/Image'),
	Input = require('enyo/Input'),
	JsonpRequest = require('enyo/Jsonp');


module.exports = kind({
	name: 'enyo.sample.ListPulldownSample',
	classes: 'enyo-unselectable enyo-fit onyx',
	kind: FittableRows,
	components: [
		{classes: 'layout-sample-toolbar', components: [
			{label: 'label', components: [
				{name: 'searchInput', kind: Input, value: 'nature', placeholder: 'Enter seach term'},
				{kind: Img, src: 'assets/search-input-search.png', style: 'width: 20px;'}
			]},
			{kind: Button, content: 'search', ontap: 'search'}
		]},
		{name: 'list', kind: PulldownList, classes: 'list-sample-pulldown-list', fit: true, onSetupItem: 'setupItem', onPullRelease: 'pullRelease', onPullComplete: 'pullComplete', components: [
			{style: 'padding: 10px; height:70px', classes: 'list-sample-pulldown-item enyo-border-box', components: [
				{name: 'icon', kind: Img, style: 'float: left; width: 48px; height: 48px; padding: 0 10px 10px 0;'},
				{name: 'name', tag: 'span', style: 'font-weight: bold;'}
			]}
		]}
	],
	rendered: kind.inherit(function (sup) {
		return function() {
			sup.apply(this, arguments);
			this.search();
		};
	}),
	pullRelease: function () {
		this.pulled = true;
		// add 1 second delay so we can see the loading message
		setTimeout(this.bindSafely(function() {
			this.search();
		}), 1000);
	},
	pullComplete: function () {
		this.pulled = false;
		this.$.list.reset();
	},
	search: function () {
		// Capture searchText and strip any whitespace
		var searchText = this.$.searchInput.getValue().replace(/^\s+|\s+$/g, '');
		if (searchText === '') {
			// For whitespace searches, set new content value in order to display placeholder
			this.$.searchInput.setValue(searchText);
			return;
		}
		this.searchFlickr(searchText);
	},
	searchFlickr: function (searchText) {
		var params = {
			method: 'flickr.photos.search',
			format: 'json',
			api_key: '2a21b46e58d207e4888e1ece0cb149a5',
			per_page: 50,
			page: 0,
			text: searchText,
			sort: 'date-posted-desc',
			extras: 'url_m'
		}, url = 'https://api.flickr.com/services/rest/';
		if (window.location.protocol === 'ms-appx:') {
			params.nojsoncallback = 1;
			// Use ajax for platforms with no jsonp support (Windows 8)
			new Ajax({url: url, handleAs: 'text'})
				.response(this, 'processAjaxSearchResults')
				.go(params);
		} else {
			new JsonpRequest({url: url, callbackName: 'jsoncallback'})
				.response(this, 'processSearchResults')
				.go(params);
		}
	},
	processAjaxSearchResults: function (req, res) {
		res = json.parse(res);
		this.processSearchResults(req, res);
	},
	processSearchResults: function (req, res) {
		this.results = res.photos.photo;
		this.$.list.setCount(this.results.length);
		if (this.pulled) {
			this.$.list.completePull();
		} else {
			this.$.list.reset();
		}
	},
	setupItem: function (sender, ev) {
		var i = ev.index;
		var item = this.results[i];
		if (!item.url_m) {
			return true;
		}
		this.$.icon.setSrc(item.url_m);
		this.$.name.setContent(item.title);
		return true;
	}
});
}],'src/ImageCarouselSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	Input = require('enyo/Input'),
	FittableRows = require('layout/FittableRows'),
	ImageCarousel = require('layout/ImageCarousel');

module.exports = kind({
	name: 'enyo.sample.ImageCarouselSample',
	kind: FittableRows,
	classes: 'enyo-fit',
	components: [
		{classes: 'layout-sample-toolbar', style: 'text-align:center;', components: [
			{kind: Button, content: '&larr;', allowHtml: true, ontap: 'previous'},
			{kind: Button, content: '&rarr;', allowHtml: true, ontap: 'next'},
			{tag: 'label', classes: 'imagecarousel-sample-input', components: [
				{name: 'carouselIndexInput', kind: Input, value: '0', onchange: 'updateIndex'}
			]}
		]},
		{name: 'carousel', kind: ImageCarousel, fit:true, onload: 'load', onZoom: 'zoom', onerror: 'error', onTransitionStart: 'transitionStart', onTransitionFinish: 'transitionFinish'}
	],
	create: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.urls = [
				'assets/mercury.jpg',
				'assets/venus.jpg',
				'assets/earth.jpg',
				'assets/mars.jpg',
				'assets/jupiter.jpg',
				'assets/saturn.jpg',
				'assets/uranus.jpg',
				'assets/neptune.jpg'
			];
			// although we're specifying all the image urls now, the images themselves
			// only get created/loaded as needed
			this.$.carousel.setImages(this.urls);
		};
	}),
	load: function (sender, ev) {
		//enyo.log('image loaded: ' + ev.originator.src);
	},
	zoom: function (sender, ev) {
		//enyo.log('image zoomed: ' + ev.scale + ' scale on ' + ev.originator.src);
	},
	error: function (sender, ev) {
		//enyo.log('image error: ' + ev.originator.src);
	},
	transitionStart: function (sender, ev) {
		//enyo.log('image now transitioning from: ' + this.$.carousel.getImageByIndex(ev.fromIndex).src
		//		+ ' to ' + this.$.carousel.getImageByIndex(ev.toIndex).src);
	},
	transitionFinish: function (sender, ev) {
		//enyo.log('image transitioned to: ' + this.$.carousel.getActiveImage().src);
		if (this.$.carouselIndexInput) {
			this.$.carouselIndexInput.setValue(ev.toIndex);
		}
	},
	previous: function (sender, ev) {
		this.$.carousel.previous();
	},
	next: function (sender, ev) {
		this.$.carousel.next();
	},
	getRandomIndex: function () {
		var i = Math.floor(Math.random()*this.$.carousel.images.length);
		while(i==this.$.carousel.index) { //make sure it isn't the active index
			i = Math.floor(Math.random()*this.$.carousel.images.length);
		}
		return i;
	},
	updateIndex: function (sender, ev) {
		var index = this.trimWhitespace(this.$.carouselIndexInput.getValue());
		if (index === '' || isNaN(index)) {
			//enyo.log('Numbers only please.')
			return;
		}
		this.$.carousel.setIndex(parseInt(index, 10));
	},
	trimWhitespace: function (str) {
		return str.replace(/^\s+|\s+$/g,'');
	}
});
}],'index':[function (module,exports,global,require,request){
require('enyo/options').accessibility = true;

var
	kind = require('enyo/kind'),
	ready = require('enyo/ready'),
	dom = require('enyo/dom');

var
	Layout = require('layout');

var
	ScrollingSampleList = require('../strawman/ScrollingSampleList');

var
	samples = {
		ContextualLayoutSample			: require('./src/ContextualLayoutSample'),
		EasingSample					: require('./src/EasingSample'),
		FittableAppLayout1				: require('./src/FittableAppLayout1'),
		FittableAppLayout2				: require('./src/FittableAppLayout2'),
		FittableAppLayout3				: require('./src/FittableAppLayout3'),
		FittableAppLayout4				: require('./src/FittableAppLayout4'),
		FittableDescription				: require('./src/FittableDescription'),
		FittableTests					: require('./src/FittableTests'),
		FittableSample					: require('./src/FittableSample'),
		FlyweightRepeaterSample			: require('./src/FlyweightRepeaterSample'),
		ImageCarouselSample				: require('./src/ImageCarouselSample'),
		ImageViewSample					: require('./src/ImageViewSample'),
		ListAroundSample				: require('./src/ListAroundSample'),
		ListBasicSample					: require('./src/ListBasicSample'),
		ListContactsSample				: require('./src/ListContactsSample'),
		ListHorizontalFlickrSample		: require('./src/ListHorizontalFlickrSample'),
		ListLanguagesSample				: require('./src/ListLanguagesSample'),
		ListNoSelectSample				: require('./src/ListNoSelectSample'),
		ListPulldownSample				: require('./src/ListPulldownSample'),
		PersistentSwipeableItemSample	: require('./src/PersistentSwipeableItemSample'),
		PanelsSample					: require('./src/PanelsSample'),
		PanelsFlickrSample				: require('./src/PanelsFlickrSample'),
		PanelsSlidingSample				: require('./src/PanelsSlidingSample'),
		PanZoomView1Sample				: require('./src/PanZoomViewSample'),
		PanZoomView2Sample				: require('./src/PanZoomViewSample2'),
		PanZoomView3Sample				: require('./src/PanZoomViewSample3'),
		SlideableSample					: require('./src/SlideableSample'),
		TreeSample						: require('./src/TreeSample')
	};

var Sample = kind({
	kind: ScrollingSampleList,
	title: 'Layout Samples',
	version: Layout.version,
	libraryName: 'Layout',
	samples: samples
});

ready(function() {
	new Sample().renderInto(document.body);
	dom.removeClass(document.body, 'onyx');
});


},{'../strawman/ScrollingSampleList':'../strawman/ScrollingSampleList','./src/ContextualLayoutSample':'src/ContextualLayoutSample','./src/EasingSample':'src/EasingSample','./src/FittableAppLayout1':'src/FittableAppLayout1','./src/FittableAppLayout2':'src/FittableAppLayout2','./src/FittableAppLayout3':'src/FittableAppLayout3','./src/FittableAppLayout4':'src/FittableAppLayout4','./src/FittableDescription':'src/FittableDescription','./src/FittableTests':'src/FittableTests','./src/FittableSample':'src/FittableSample','./src/FlyweightRepeaterSample':'src/FlyweightRepeaterSample','./src/ImageCarouselSample':'src/ImageCarouselSample','./src/ImageViewSample':'src/ImageViewSample','./src/ListAroundSample':'src/ListAroundSample','./src/ListBasicSample':'src/ListBasicSample','./src/ListContactsSample':'src/ListContactsSample','./src/ListHorizontalFlickrSample':'src/ListHorizontalFlickrSample','./src/ListLanguagesSample':'src/ListLanguagesSample','./src/ListNoSelectSample':'src/ListNoSelectSample','./src/ListPulldownSample':'src/ListPulldownSample','./src/PersistentSwipeableItemSample':'src/PersistentSwipeableItemSample','./src/PanelsSample':'src/PanelsSample','./src/PanelsFlickrSample':'src/PanelsFlickrSample','./src/PanelsSlidingSample':'src/PanelsSlidingSample','./src/PanZoomViewSample':'src/PanZoomViewSample','./src/PanZoomViewSample2':'src/PanZoomViewSample2','./src/PanZoomViewSample3':'src/PanZoomViewSample3','./src/SlideableSample':'src/SlideableSample','./src/TreeSample':'src/TreeSample'}]
	};

});
//# sourceMappingURL=layout-samples.js.map