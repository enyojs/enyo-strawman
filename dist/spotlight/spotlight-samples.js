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

},{'../LinkSupport':'../strawman/LinkSupport'}],'src/ContainerSample':[function (module,exports,global,require,request){
require('spotlight');

var
	kind = require('enyo/kind'),
	Button = require('enyo/Button');

module.exports = kind({
	name    : 'enyo.Spotlight.ContainerSample',
	classes : 'spotlight-sample',
	fit     : true,

	handlers: {
		onSpotlightFocused: 'buttonFocused'
	},

	components: [
		{name: 'c1', spotlight: 'container', onSpotlightContainerEnter: 'enterContainer', onSpotlightContainerLeave: 'leaveContainer', components: [
			{name: 'c1b1', kind: Button, spotlight: true, content: 'c1b1'},
			{name: 'c1b2', kind: Button, spotlight: true, content: 'c1b2'}
		]},
		{name: 'c2', spotlight: 'container', onSpotlightContainerEnter: 'enterContainer', onSpotlightContainerLeave: 'leaveContainer', components: [
			{name: 'c2b1', kind: Button, spotlight: true, content: 'c2b1'},
			{name: 'c2b2', kind: Button, spotlight: true, content: 'c2b2'},
			{name: 'c2c1', spotlight: 'container', onSpotlightContainerEnter: 'enterContainer', onSpotlightContainerLeave: 'leaveContainer', components: [
				{name: 'c2c1b1', kind: Button, spotlight: true, content: 'c2c1b1'},
				{name: 'c2c1b2', kind: Button, spotlight: true, content: 'c2c1b1'}
			]}
		]}
	],

	buttonFocused: function (sender, ev) {
		this.log('Button Focused', ev.originator.id);
	},

	enterContainer: function (sender, ev) {
		this.log('Container Entered:', ev.originator.id);
		sender.applyStyle('border', '2px solid red');
	},

	leaveContainer: function (sender, ev) {
		this.log('Container Left:', ev.originator.id);
		sender.applyStyle('border', null);
	}
});
}],'src/DisappearSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button');

require('spotlight');

module.exports = kind({
	name    : 'enyo.Spotlight.DisappearSample',
	classes : 'spotlight-sample',
	fit     : true,

	handlers: {
		onSpotlightFocus: 'onSpotlightFocus'
	},

	components: [
		{name: 'c1', spotlight: 'container', classes: 'container', components: [
			{name: 'button01', spotlight: true, kind: Button, content: 'I am first spottable of the app'},
			{name: 'button02', spotlight: true, kind: Button, content: 'I am defaultSpotlightDisappear for "Destroy My Ansestor"'},
			{name: 'button03', spotlight: true, kind: Button, content: 'Restore disappeared buttons', ontap: 'restore'},
			{name: 'c11', spotlight: 'container', classes: 'container', components: [
				{name: 'c111', spotlight: 'container', classes: 'container', components: [
					{components: [
						{name: 'button1', spotlight: true, kind: Button, content: 'Disable Me', ontap: 'disableButton1'},
						{name: 'button2', spotlight: true, kind: Button, content: 'Destroy Me', ontap: 'destroyButton2'},
						{name: 'button3', spotlight: true, kind: Button, content: 'Hide Me',    ontap: 'hideButton3'   }
					]},
					{components: [
						{name: 'button4', spotlight: true, kind: Button, content: 'Destroy My Ansestor', ontap: 'destroyAnsestor', defaultSpotlightDisappear: 'button02'},
						{name: 'button5', spotlight: true, kind: Button, content: 'Hide My Ansestor',    ontap: 'hideAnsestor'   }
					]}
				]}
			]}
		]}
	],

	restore         : function() { location.reload(); },
	disableButton1  : function() { this.$.button1.setDisabled(true); },
	destroyButton2  : function() { this.$.button2.destroy(); },
	hideButton3     : function() { this.$.button3.hide(); },
	disableAnsestor : function() { this.$.c11.setDisabled(true); },
	destroyAnsestor : function() { this.$.c11.destroy(); },
	hideAnsestor    : function() { this.$.c11.hide(); }
});

}],'src/HoldSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Spotlight = require('spotlight'),
	Button = require('enyo/Button'),
	Control = require('enyo/Control');

var h = {
	ontap: 'tapped',
	onSpotlightKeyDown: 'setConfigSpotlight',
	onhold: 'held',
	onholdpulse: 'pulse',
	onrelease: 'released'
};

module.exports = kind({
	name: 'HoldSample',
	kind: Control,
	components: [
		{kind: Button, content: 'Select and Hold Me', mixins: [h]},
		{tag: 'ul', components: [
			{tag: 'li', name: 'd', allowHtml: true, idleContent: '<i>waiting for hold events...</i>'},
			{tag: 'li', name: 'd2', allowHtml: true, idleContent: '<i>waiting for pulse events...</i>'},
			{tag: 'li', name: 'd3', allowHtml: true, idleContent: '<i>waiting for other events...</i>'}
		]}
	],
	setConfigSpotlight: function (sender, ev) {
		if (ev.keyCode === 13 && !Spotlight.Accelerator.isAccelerating()) {
			ev.configureHoldPulse({
				frequency: 200, resume: true, endHold: 'onLeave',
				events: [
					{name: 'hold', time: 200},
					{name: 'longpress', time: 1000},
					{name: 'reallylongpress', time: 2000}
				]
			});
		}
	},
	report: function (actor, action, display) {
		this.$[display].setContent(actor.content + ': ' + action);
		this.resetSoon(display);
	},
	resetSoon: function (display) {
		this.startJob('reset_' + display, function() {
			this.reset(display);
		}, 2000);
	},
	reset: function (display) {
		var d = this.$[display];
		d.set('content', d.get('idleContent'));
	},
	tapped: function (sender, ev) {
		this.report(sender, 'tapped', 'd3');
	},
	pulse: function (sender, ev) {
		this.report(sender, 'pulsing (' + ev.holdTime + ')', 'd2');
	},
	held: function (sender, ev) {
		this.report(sender, ev.type, 'd');
	},
	released: function (sender, ev) {
		this.report(sender, 'released', 'd');
	}
});

}],'src/SpotlightSandboxSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	Button = require('enyo/Button'),
	Control = require('enyo/Control'),
	Spotlight = require('spotlight');

var Barracuda = kind({
	name     : 'Barracuda',
	kind     : Control,
	classes  : 'barracuda',
	spotlight: true,

	handlers: {
		ondown : 'mousedown',
		onup   : 'mouseup',
		ondrag : 'drag'
	},

	components: [
		{name: 'corner', classes: 'barracuda-corner'}
	],

	index       : null,
	resizing    : false,
	cornerWidth : 20,
	initY       : null,
	initX       : null,
	initHeight  : null,
	initWidth   : null,

	rendered: function () {
		Control.prototype.rendered.apply(this, arguments);
		this.$.corner.addStyles('height:' + this.cornerWidth + 'px;width:' + this.cornerWidth + 'px;');
		this.index = this.parent.children.length;
	},

	mousedown: function (sender, ev) {
		Spotlight.TestMode.disable();
		// check if resizing
		this.resizing = this.isResizing(ev);

		// save initial values
		var bounds = this.getBounds();
		this.initY = bounds.top;
		this.initX = bounds.left;
		this.initWidth = bounds.width;
		this.initHeight = bounds.height;
	},

	mouseup: function (sender, ev) {
		Spotlight.TestMode.enable();
	},

	drag: function (sender, ev) {
		if(this.resizing) {
			this.doResize(ev);
		} else {
			this.doDrag(ev);
		}
	},

	isResizing: function (ev) {
		var bounds = this.getAbsoluteBounds(),
			relativeTop = ev.clientY - bounds.top,
			relativeLeft = ev.clientX - bounds.left,
			relativeBottom = bounds.height - relativeTop,
			relativeRight = bounds.width - relativeLeft;

		this.resizingX = (relativeLeft < this.cornerWidth)
			? -1
			: (relativeRight < this.cornerWidth)
				? 1
				: 0;

		this.resizingY = (relativeTop < this.cornerWidth)
			? -1
			: (relativeBottom < this.cornerWidth)
				? 1
				: 0;

		//	TODO - only pay attention to bottom right for resizing for now
		return (relativeRight < this.cornerWidth && relativeBottom < this.cornerWidth);
		// return this.resizingX !== 0 && this.resizingY !== 0;
	},

	doResize: function (ev) {
		this.addStyles('width:' + (ev.dx + this.initWidth) + 'px;height:' + (ev.dy + this.initHeight)+'px;');
	},

	doDrag: function (ev) {
		this.addStyles('left:' + (ev.dx + this.initX) + 'px;top:' + (ev.dy + this.initY)+'px;');
	}
});

module.exports = kind({
	name: 'enyo.sample.SpotlightSandboxSample',
	classes: 'spotlight-sample',
	fit: false,
	components:[
		{components: [
			{kind: Button, spotlight: true, content: 'Add Control', ontap: 'addBarracuda'}
		]},
		{name: 'container', style: 'position:relative;'}
	],
	rendered: function () {
		this.inherited(arguments);
		Spotlight.TestMode.enable();
		for (var y=0; y<2; y++) {
			for (var x=0; x<4; x++) {
				var b = this.$.container.createComponent({kind: Barracuda}).render();
				b.applyStyle('top', (100*(y+1)) + 'px');
				b.applyStyle('left', (100 + x * 100) + 'px');
			}
		}
	},
	destroy: function () {
		Spotlight.TestMode.disable();
		this.inherited(arguments);
	},
	addBarracuda: function () {
		var b = this.$.container.createComponent({kind: Barracuda}).render();
		b.applyStyle('z-index:'+this.$.container.getClientControls().length+';');
	}
});

}],'src/TestPage':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button');

module.exports = kind({
	name: 'enyo.sample.SpotlightTest',
	classes: 'spotlight-sample',
	fit: false,
	components:[
		{style: 'position:relative;', components: [
			{kind: Button, spotlight: true, content: 'A', style: 'top:20px; left:140px; width:300px;'},
			{name: 'bigItem', kind: Button, spotlight: true, content: 'B', classes: 'big-item', style: 'top:100px; left:40px; width:1000px; height:40px;'},
			{kind: Button, spotlight: true, content: 'C', style: 'top:200px; left:140px;'}
		]},
		{style: 'position:relative;top:300px;left:100px;', components: [
			{kind: Button, spotlight: true, content: 'D', style: 'top:140px; left:40px; width:40px; height:300px;'},
			{name: 'bigItem2', kind: Button, spotlight: true, content: 'E', classes: 'big-item', style: 'top:40px; left:140px; width:40px; height:1000px;'},
			{kind: Button, spotlight: true, content: 'F', style: 'top:140px; left:240px; width:40px; height:300px;'}
		]}
	]
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
	ready = require('enyo/ready'),
	Spotlight = require('spotlight');

var
	ScrollingSampleList = require('../strawman/ScrollingSampleList');

var
	samples = {
		ContainerSample			: require('./src/ContainerSample'),
		DisappearSample			: require('./src/DisappearSample'),
		HoldSample				: require('./src/HoldSample'),
		SandboxSample			: require('./src/SpotlightSandboxSample'),
		TestPage				: require('./src/TestPage')
	};

var Sample = kind({
	kind: ScrollingSampleList,
	title: 'Spotlight Samples',
	version: Spotlight.version,
	libraryName: 'Spotlight',
	samples: samples
});

ready(function() {
	new Sample().renderInto(document.body);
});


},{'../strawman/ScrollingSampleList':'../strawman/ScrollingSampleList','./src/ContainerSample':'src/ContainerSample','./src/DisappearSample':'src/DisappearSample','./src/HoldSample':'src/HoldSample','./src/SpotlightSandboxSample':'src/SpotlightSandboxSample','./src/TestPage':'src/TestPage'}]
	};

});
//# sourceMappingURL=spotlight-samples.js.map