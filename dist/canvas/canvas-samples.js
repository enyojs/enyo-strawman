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

},{'../LinkSupport':'../strawman/LinkSupport'}],'src/CanvasBallsSample':[function (module,exports,global,require,request){
var
	animation = require('enyo/animation'),
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	Input = require('enyo/Input');

var
	Canvas = require('canvas/Canvas'),
	CanvasControl = require('canvas/Control'),
	Circle = require('canvas/Circle'),
	Rectangle = require('canvas/Rectangle'),
	CanvasText = require('canvas/Text');


module.exports = kind({
	name:'enyo.sample.CanvasBallsSample',
	style:'padding:15px;',
	components: [
		{kind: Canvas, style: 'border: 1px solid black;', attributes: {width: 280, height: 300}, components: [
			// a container for the balls
			{name: 'ballpit', kind: CanvasControl},
			// a visible shelf to bounce off of
			{kind: Rectangle, bounds: {l: 0, t: 290, w: 300, h: 10}},
			// an FPS counter
			{name:'fpsCounter', kind: CanvasText, bounds: {l: 0, t: 15}, color: 'black'}
		]},
		{tag: 'br'},
		// Reset the balls / change the number
		{tag: 'button', content: 'Reset', ontap: 'reset'},
		{tag: 'br'},
		{tag: 'span', content:'Balls: '},
		{kind: Input, name: 'balls', value: '10', placeholder: 'Number of Balls'}
	],
	published: {
		// force of gravity
		accel: 9.8,
		// number of balls to show
		balls: 10
	},
	setupBalls: function () {
		// pause loop to update the balls
		if (this.cancel) {
			animation.cancelAnimationFrame(this.cancel);
		}
		this.loopStart = Date.now();
		this.frame = 0;
		this.start = Date.now();
		this.$.ballpit.destroyClientControls();
		var colors = [ 'green', 'blue', 'black', 'brown', 'red', 'orange'];
		var bounce, color, t, l;
		for (var i = 0; i < this.balls; i++) {
			// bounce from 0.30 to 0.99
			bounce = (utils.irand(69) + 30) / 100;
			color = colors[utils.irand(colors.length)];
			t = utils.irand(375);
			l = 10 + (utils.irand(27) * 10);
			this.$.ballpit.createComponent({
				kind: Circle,
				bounds: {l: l, t: t, w: 10},
				color: color,
				bounce: bounce,
				vel: 0,
				owner: this
			});
		}
		// (re)start loop
		utils.asyncMethod(this.bindSafely('loop'));
	},
	rendered: function () {
		this.setupBalls();
	},
	destroy: function () {
		if (this.cancel) {
			animation.cancelAnimationFrame(this.cancel);
		}
		this.inherited(arguments);
	},
	loop: function () {
		this.frame++;
		// update ball positions
		for (var i = 0, b; (b = this.$.ballpit.children[i]); i++) {
			if (b.bounds.t + b.bounds.w > this.$.rectangle.bounds.t) {
				// hits the ground, bounce back with X% of velocity
				b.vel = -b.vel * b.bounce;
				b.bounds.t = this.$.rectangle.bounds.t - b.bounds.w;
			} else if (b.bounds.t < b.bounds.w) {
				// prevent balls from shooting over the ceiling
				b.bounds.t = b.bounds.w;
				b.vel = 0;
			}
			b.vel += this.accel * (Date.now() - this.start);
			// make the distances rather large
			b.bounds.t += (b.vel / 10000);
		}
		this.$.canvas.update();
		this.start = Date.now();
		this.cancel = animation.requestAnimationFrame(this.bindSafely('loop'));
		// draw the framerate
		this.$.fpsCounter.setText(Math.floor(this.frame / ((Date.now() - this.loopStart) / 1000)));
	},
	reset: function () {
		var inode = this.$.balls.hasNode();
		var newballs = inode ? parseInt(inode.value,0) : this.balls;
		if (isFinite(newballs) && newballs >= 0 && newballs != this.balls) {
			// update the number of balls
			this.setBalls(newballs);
		} else {
			// reset the current balls without destroying / recreating them
			for (var i = 0, b; (b = this.$.ballpit.children[i]); i++) {
				b.bounds.t = utils.irand(375);
				b.vel = 0;
			}
		}
	},
	ballsChanged: function (oldBalls) {
		this.setupBalls();
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

},{'../Link':'../strawman/Link'}],'../strawman/SampleList':[function (module,exports,global,require,request){
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
	Canvas = require('canvas');

var
	ScrollingSampleList = require('../strawman/ScrollingSampleList');

var
	samples = {
		CanvasBallsSample: require('./src/CanvasBallsSample')
		// CanvasPrimitivesSample: require('./src/CanvasPrimitivesSample')
	};

var Sample = kind({
	kind: ScrollingSampleList,
	title: 'Canvas Samples',
	version: Canvas.version,
	libraryName: 'Canvas',
	samples: samples
});

ready(function() {
	new Sample().renderInto(document.body);
});


},{'../strawman/ScrollingSampleList':'../strawman/ScrollingSampleList','./src/CanvasBallsSample':'src/CanvasBallsSample'}]
	};

});
//# sourceMappingURL=canvas-samples.js.map