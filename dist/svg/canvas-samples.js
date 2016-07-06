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
	return {'../strawman/LinkSupport':[function (module,exports,global,require,request){
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

},{'../LinkSupport':'../strawman/LinkSupport'}],'../strawman/List':[function (module,exports,global,require,request){
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

},{'../Link':'../strawman/Link'}],'src/BasicSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Control = require('enyo/Control'),
	Button = require('enyo/Button'),
	Root = require('svg/Root'),
	Rectangle = require('svg/Rectangle'),
	Circle = require('svg/Circle'),
	Path = require('svg/Path'),
	SvgText = require('svg/Text'),
	TextPath = require('svg/TextPath'),
	Arc = require('svg/Arc');


module.exports = kind({
	name: 'SvgSample',
	kind: Control,
	classes: 'sample svg-sample',
	components: [
		{content: 'Many Stacked SVG Element:', classes: 'divider'},
		{kind: Root, viewBox: '0 0 100 100', style: 'height: 250px; width: 250px;', components: [
			{kind: Rectangle, width: 100, height: 100, x: 0, y: 0, style: 'fill: cyan;'},
			{kind: Circle, cx: 30, cy: 30, r: 15, style: 'fill: #FFCB00;'},
			{name: 'path', kind: Path, style: 'fill: #459652;', d: 'M100,50c-10.6,11.9-36.5,16.5-50,0S14.4,35.1,0,50v50h100V50z'},
			{kind: Rectangle, width: 20, height: 40, x: 75, y: 30, transform: 'rotate(10,70,40)', style: 'fill: #3E57BA;'},
			{kind: SvgText, content: 'SVG Text', x: 20, y: 55, style: 'fill: #BF4C41;', classes: 'svg-sample-header-text'},
			{name: 'textPath', kind: Path, stroke: '#D9965B', d: 'M10,90c10.4-11.6,30.4-20,40-10c13.3,13.8,29,6.7,40,0'},
			{kind: SvgText, classes: 'svg-sample-header-text', components: [
				{kind: TextPath, content: 'Text on a path!', style: 'fill: blanchedalmond;', target: 'textPath'}
			]}
		]},
		{content: 'Arcs (Hollow and Filled):', classes: 'divider'},
		{kind: Button, small: true, content: 'Random Arc', ontap: 'randomArc'},
		{kind: Root, viewBox: '0 0 100 100', style: 'height: 250px; width: 250px; display: block;', components: [
			{name: 'arc1', kind: Arc, x: 50, y: 50, radius: 45, startAngle: 10, endAngle: 220, ontap: 'buttonTapped', filled: true, style: 'fill: orange;'},
			{name: 'arc2', kind: Arc, x: 50, y: 50, radius: 45, startAngle: 10, endAngle: 220, ontap: 'buttonTapped', 'stroke-linecap': 'round', style: 'fill: none; stroke: white; stroke-width: 3px;'},
			{name: 'arc3', kind: Arc, x: 50, y: 50, radius: 40, startAngle: 10, endAngle: 220, ontap: 'buttonTapped', 'stroke-linecap': 'round', style: 'fill: none; stroke: white; stroke-width: 3px;'},
			{name: 'arc4', kind: Arc, x: 50, y: 50, radius: 35, startAngle: 10, endAngle: 220, ontap: 'buttonTapped', 'stroke-linecap': 'round', style: 'fill: none; stroke: white; stroke-width: 3px;'},
			{name: 'arc5', kind: Arc, x: 50, y: 50, radius: 30, startAngle: 10, endAngle: 220, ontap: 'buttonTapped', 'stroke-linecap': 'round', style: 'fill: none; stroke: white; stroke-width: 3px;'},
			{name: 'arc6', kind: Arc, x: 50, y: 50, radius: 25, startAngle: 10, endAngle: 220, ontap: 'buttonTapped', 'stroke-linecap': 'round', style: 'fill: none; stroke: white; stroke-width: 3px;'}
		]},
		{content: 'Logo Hover:', classes: 'divider'},
		{kind: Root, viewBox: '0 0 100 100', style: 'height: 250px; width: 250px; display: block;', components: [
			{name: 'logo', kind: Path, classes: 'svg-sample-logo', spotlight: true, ontap: 'buttonTapped', d: 'M49.3,90c-5.7,0-11-1-15.9-3.1c-4.9-2.1-9.2-5-12.9-8.8c-3.8-3.7-6.7-7.9-8.9-12.9C9.6,60.3,8.5,55,8.5,49.3 c0-5.7,1.1-11,3.2-15.8c2.1-4.8,5.1-9.2,8.9-13c3.8-3.7,8.1-6.5,13-8.6c4.8-2.1,10.1-3.2,15.8-3.2c5.6,0,10.8,1.1,15.7,3.2 c4.9,2.1,9.3,5,13.1,8.6c3.7,3.8,6.6,8.1,8.7,13c2.1,4.8,3.2,10.1,3.2,15.8c0,5.7-1.1,11-3.2,15.9c-2.1,4.9-5,9.2-8.7,12.8 c-3.8,3.8-8.1,6.7-13,8.9C60.3,88.9,55,90,49.3,90z M50.9,15.3c-0.4-0.1-0.8-0.2-1.1-0.2c-4.8,0-9.4,0.9-13.6,2.7 c-4.2,1.8-7.9,4.3-11.1,7.4c-3.2,3.2-5.6,6.8-7.4,10.9c-1.8,4.1-2.7,8.5-2.7,13.2c0,4.7,0.9,9.1,2.8,13.2c1.9,4.1,4.4,7.7,7.6,10.9 c3.2,3.2,6.8,5.6,11,7.4c4.1,1.8,8.4,2.6,12.9,2.6c4.8,0,9.3-0.9,13.4-2.8c4.1-1.9,7.6-4.4,10.6-7.5c3-3.2,5.4-6.8,7.2-10.9 c1.8-4.1,2.8-8.4,2.9-12.9v-1.5H58.9v3.1h21.3v0.6c-0.3,4-1.3,7.8-3,11.3c-1.7,3.5-4,6.6-6.8,9.2c-2.8,2.6-6,4.7-9.6,6.2 c-3.6,1.5-7.4,2.3-11.4,2.3c-4.4,0-8.5-0.9-12.3-2.6c-3.8-1.7-7.1-4.1-9.8-7s-4.9-6.3-6.4-10c-1.5-3.7-2.3-7.5-2.3-11.5 c0-4.4,0.8-8.5,2.5-12.3c1.7-3.8,4-7,7-9.7s6.3-4.9,9.9-6.5c3.7-1.6,7.5-2.4,11.5-2.4h1.6V15.3z M36.4,41c1.2,0,2.3-0.4,3.3-1.3 c1-0.9,1.5-2,1.5-3.3c0-1.3-0.5-2.4-1.5-3.3c-1-0.9-2.1-1.4-3.3-1.4c-1.4,0-2.5,0.5-3.4,1.4c-0.9,0.9-1.3,2.1-1.3,3.3 c0,1.3,0.4,2.4,1.3,3.3C33.8,40.6,34.9,41,36.4,41z M47.6,67.2h11.3v-3.4h-8V31.6h-3.3V67.2z'}
		]},
		{classes: 'console', components: [
			{content: 'Result', classes: 'divider'},
			{name: 'result', classes: 'ouput', allowHtml: true, content: 'No button pressed yet.'}
		]}
	],
	randomArc: function () {
		var startAngle = Math.random() * 360;
		this.$.arc2.set('startAngle', startAngle );
		this.$.arc2.set('startAngle', startAngle );
		this.$.arc3.set('startAngle', startAngle );
		this.$.arc4.set('startAngle', startAngle );
		this.$.arc5.set('startAngle', startAngle );
		this.$.arc6.set('startAngle', startAngle );
		this.$.arc2.set('endAngle', startAngle + (Math.random() * 360) );
		this.$.arc3.set('endAngle', startAngle + (Math.random() * 360) );
		this.$.arc4.set('endAngle', startAngle + (Math.random() * 360) );
		this.$.arc5.set('endAngle', startAngle + (Math.random() * 360) );
		this.$.arc6.set('endAngle', startAngle + (Math.random() * 360) );
	},
	buttonTapped: function (sender, ev) {
		this.$.result.set('content', '&quot;' + sender.name + '&quot; pressed.');
	}
});

module.exports.badgeClasses = 'new';

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

},{'../Link':'../strawman/Link','../List':'../strawman/List','../Title':'../strawman/Title','../AppRouter':'../strawman/AppRouter'}],'../strawman/ScrollingSampleList':[function (module,exports,global,require,request){
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

},{'./SampleList':'../strawman/SampleList'}],'index':[function (module,exports,global,require,request){
require('enyo/options').accessibility = true;

var
	kind = require('enyo/kind'),
	ready = require('enyo/ready');

var
	Svg = require('svg');

var
	ScrollingSampleList = require('../strawman/ScrollingSampleList');

var
	samples = {
		BasicSample: require('./src/BasicSample')
	};

var Sample = kind({
	kind: ScrollingSampleList,
	title: 'SVG Samples',
	version: Svg.version,
	libraryName: 'Svg',
	samples: samples
});

ready(function() {
	new Sample().renderInto(document.body);
});


},{'../strawman/ScrollingSampleList':'../strawman/ScrollingSampleList','./src/BasicSample':'src/BasicSample'}]
	};

});
//# sourceMappingURL=canvas-samples.js.map