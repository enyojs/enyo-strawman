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
	return {'../strawman/Title':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

module.exports = kind({
	tag: 'h1'
});

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

}],'src/AnimatorSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	animation = require('enyo/animation');

var
	Animator = require('enyo/Animator');

module.exports = kind({
	name: 'enyo.sample.AnimatorSample',
	components: [
		{content: 'Smooth Animation:', name: 'deferText', showing: false},
		{content: 'Choppy Animation:', name: 'nondeferText'},
		{name: 'dot', style: 'width: 10px; height: 10px; background-color: red;'},
		{kind: Animator, duration: 3000, startValue: 0, endValue: 10000, onStep: 'stepAnimation', onEnd: 'animationEnded', easingFunction: animation.easing.linear }
	],
	stepAnimation: function (sender, ev) {
		var v = sender.value/100;
		this.$.dot.applyStyle('width', v + '%');
	},
	/* an expensive operation: */
	expensive: function (){
		window.RANDSTRING = '';
		for (var i = 1; i < 100000; ++i) {
			window.RANDSTRING += Math.random();
		}
	},
	animationEnded: function () {
		this.doAnimation();
	},
	rendered: function () {
		this.inherited(arguments);
		this.doAnimation();
	},
	defer: false,
	doAnimation: function () {
		this.startJob('doAnimation', function () {
			if(this.defer){
				this.startJob('expensive', 'expensive', 1000, 1);
			} else {
				this.startJob('expensive', 'expensive', 1000);
			}
			this.$.deferText.setShowing(this.defer);
			this.$.nondeferText.setShowing(!this.defer);
			this.$.animator.play();
			this.defer = !this.defer;
		}, 500);
	}
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


}],'src/PageVisibilitySample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	pageVisibility = require('enyo/pageVisibility');

var
	Control = require('enyo/Control'),
	Signals = require('enyo/Signals');

module.exports = kind({
	name: 'enyo.sample.PageVisibilitySample',
	kind: Control,
	components: [
		{kind: Signals, onvisibilitychange: 'visibilitychanged'},
		{name: 'text', allowHtml: true}
	],
	rendered: function () {
		this.inherited(arguments);
		this.visibilitychanged();
	},
	visibilitychanged: function (){
		this.$.text.setContent(this.$.text.content + (Date().toString()) + (pageVisibility.hidden ? ': hidden' : ': visible') + '<br>');
	}
});

}],'src/PlatformSample':[function (module,exports,global,require,request){
var
	enyo = require('enyo'),
	kind = require('enyo/kind'),
	platform = require('enyo/platform');

var
	Control = require('enyo/Control');

module.exports = kind({
	name: 'enyo.sample.PlatformSample',
	kind: Control,
	classes: 'enyo-fit platform-sample',
	components: [
		{classes: 'platform-sample-divider', content: 'Enyo Platform Detection'},
		{components: [
			{content: 'User-Agent String'},
			{name: 'uaString', content: '', style: 'padding: 8px;'}
		]},
		{tag: 'br'},
		{components: [
			{content: 'Window'},
			{name: 'windowAttr', content: '', style: 'padding: 8px;'}
		]},
		{tag: 'br'},
		{components: [
			{content: 'enyo.platform'},
			{name: 'enyoPlatformJSON', content: '', style: 'padding: 8px;'}
		]},
		{tag: 'br'},
		{components: [
			{content: 'enyo.version'},
			{name: 'enyoVersionJSON', content: '', style: 'padding: 8px;'}
		]}
	],
	updateWindowSize: function () {
		var width = window.innerWidth;
		if (width === undefined) {
			width = document.documentElement.clientWidth;
		}
		var height = window.innerHeight;
		if (height === undefined) {
			height = document.documentElement.clientHeight;
		}
		this.$.windowAttr.setContent('size: ' + width + 'x' + height +
			', devicePixelRatio: ' + window.devicePixelRatio);
	},
	create: function () {
		this.inherited(arguments);
		this.$.uaString.setContent(navigator.userAgent);
		this.$.enyoPlatformJSON.setContent(JSON.stringify(platform, null, 1));
		this.$.enyoVersionJSON.setContent(JSON.stringify(enyo.version, null, 1));
		this.updateWindowSize();
	},
	handleResize: function () {
		this.inherited(arguments);
		this.updateWindowSize();
	}
});
}],'src/PositionSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	dispatcher = require('enyo/dispatcher');

var
	Control = require('enyo/Control');

var PositionSampleNested = kind({
	name: 'enyo.sample.PositionSampleNested',
	kind: Control,
	defaultProps: {style: 'padding: 10px; width: 100px; display: inline-block; text-align: right;'},
	text: '',
	create: function () {
		this.inherited(arguments);
		this.$.label.set('content', this.name);
	},
	components: [
		{name: 'label', tag: 'span'},
		{name: 'text', tag: 'span'}
	],
	bindings: [
		{from: '.text', to: '.$.text.content'}
	]
});

module.exports = kind({
	name: 'enyo.sample.PositionSample',
	defaultKind: PositionSampleNested,
	classes:'enyo-fit',
	components: [
		{name: 'clientX'},
		{name: 'clientY'},
		{name: 'pageX'},
		{name: 'pageY'},
		{name: 'screenX'},
		{name: 'screenY'}
	],
	handlers: {'onmove': 'moved'},
	moved: function () {
		var p = dispatcher.getPosition();
		for (var k in p) {
			this.$[k].set('text', p[k]);
		}
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

},{'../LinkSupport':'../strawman/LinkSupport'}],'src/AnchorSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Anchor = require('enyo/Anchor'),
	EnyoImage = require('enyo/Image'),
	Input = require('enyo/Input');

module.exports = kind({
	name: 'enyo.sample.AnchorSample',
	classes: 'anchor-sample',
	components: [
		{content: 'Text Anchor', classes: 'section'},
		{kind: Anchor, name: 'anchorText', href: 'http://www.enyojs.com', title: 'EnyoJS Framework Website', content: 'Visit the EnyoJS website'},
		{kind: Input, name: 'inputTextHref', type: 'text', placeholder: 'Anchor URL'},
		{kind: Input, name: 'inputTextTitle', type: 'text', placeholder: 'Anchor Title'},
		{kind: Input, name: 'inputTextContent', type: 'text', placeholder: 'Anchor Content'},
		{content: 'Image Anchor', classes: 'section'},
		{kind: Anchor, name: 'anchorImage', href: 'http://www.enyojs.com', title: 'EnyoJS Framework Website', components: [
			{kind: EnyoImage, name: 'anchorImageItem', src: 'http://enyojs.com/img/enyo-logo.png', alt: 'Enyo Logo'}
		]},
		{kind: Input, name: 'inputImageHref', type: 'text', placeholder: 'Anchor URL'},
		{kind: Input, name: 'inputImageTitle', type: 'text', placeholder: 'Anchor Title'},
		{kind: Input, name: 'inputImageSrc', type: 'text', placeholder: 'Anchor Image URL'}
	],
	bindings: [
		{from: '.$.anchorText.href', to: '.$.inputTextHref.value', oneWay: false},
		{from: '.$.anchorText.title', to: '.$.inputTextTitle.value', oneWay: false},
		{from: '.$.anchorText.content', to: '.$.inputTextContent.value', oneWay: false},
		{from: '.$.anchorImage.href', to: '.$.inputImageHref.value', oneWay: false},
		{from: '.$.anchorImage.title', to: '.$.inputImageTitle.value', oneWay: false},
		{from: '.$.anchorImageItem.src', to: '.$.inputImageSrc.value', oneWay: false}
	]
});

}],'src/ImageSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Control = require('enyo/Control'),
	EnyoImage = require('enyo/Image');

module.exports = kind({
	name: 'enyo.sample.ImageSample',
	classes: 'image-sample',
	kind: Control,
	components: [
		{content: 'Image - No Sizing', classes: 'section'},
		{
			kind: EnyoImage,
			/** style: 'width:165px; height:55px', */
			src: 'http://enyojs.com/img/enyo-logo.png',
			placeholder: EnyoImage.placeholder,
			alt: 'Enyo Logo'
		},
		{content: 'Sizing - Contain', classes: 'section'},
		{
			kind: EnyoImage,
			style: 'width:200px; height:100px; background-color:rgba(200,100,0,0.3); border: 1px dashed orange; margin-right: 1em;',
			sizing: 'contain',
			placeholder: EnyoImage.placeholder,
			//src: 'http://enyojs.com/img/enyo-logo.png',
			alt: 'Enyo Logo'
		},
		{
			kind: EnyoImage,
			style: 'width:200px; height:100px; background-color:rgba(0,200,0,0.3); border: 1px dashed green;',
			sizing: 'contain',
			position: 'left top',
			src: 'http://enyojs.com/img/enyo-logo.png',
			alt: 'Enyo Logo'
		},
		{content: 'Sizing - Cover', classes: 'section'},
		{
			kind: EnyoImage,
			style: 'width:200px; height:100px; background-color:rgba(0,0,200,0.3); border: 1px dashed blue; margin-right: 1em;',
			sizing: 'cover',
			src: 'http://enyojs.com/img/enyo-logo.png',
			alt: 'Enyo Logo'
		},
		{
			kind: EnyoImage,
			style: 'width:200px; height:100px; background-color:rgba(200,200,0,0.3); border: 1px dashed yellow;',
			sizing: 'cover',
			position: 'left top',
			src: 'http://enyojs.com/img/enyo-logo.png',
			alt: 'Enyo Logo'
		},
		{content: 'Placeholder Image', classes: 'section'},
		{kind: EnyoImage, src: EnyoImage.placeholder, alt: 'Placeholder Image', classes: 'placeholder'}
	]
});
}],'src/DataRepeaterSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Collection = require('enyo/Collection'),
	DataRepeater = require('enyo/DataRepeater');

var
	data = [
		{ classes: 'repeater-item class1', firstName: 'Alejandra', lastName: 'Walsh' },
		{ classes: 'repeater-item class2', firstName: 'Marquez', lastName: 'James' },
		{ classes: 'repeater-item class3', firstName: 'Barr', lastName: 'Lott' },
		{ classes: 'repeater-item class4', firstName: 'Everett', lastName: 'Maddox' },
		{ classes: 'repeater-item class5', firstName: 'Crane', lastName: 'Bryant' },
		{ classes: 'repeater-item class1', firstName: 'Raymond', lastName: 'Faulkner' },
		{ classes: 'repeater-item class2', firstName: 'Petersen', lastName: 'Murray' },
		{ classes: 'repeater-item class3', firstName: 'Kristina', lastName: 'Porter' },
		{ classes: 'repeater-item class4', firstName: 'Barbra', lastName: 'Barrett' },
		{ classes: 'repeater-item class5', firstName: 'Tracey', lastName: 'Melton' },
		{ classes: 'repeater-item class1', firstName: 'Effie', lastName: 'Pierce' },
		{ classes: 'repeater-item class2', firstName: 'Webb', lastName: 'Sloan' },
		{ classes: 'repeater-item class3', firstName: 'Diana', lastName: 'Castaneda' },
		{ classes: 'repeater-item class4', firstName: 'Gaines', lastName: 'Hampton' },
		{ classes: 'repeater-item class5', firstName: 'Ebony', lastName: 'Stanley' },
		{ classes: 'repeater-item class1', firstName: 'Anne', lastName: 'Moses' },
		{ classes: 'repeater-item class2', firstName: 'Mercer', lastName: 'Skinner' },
		{ classes: 'repeater-item class3', firstName: 'Williams', lastName: 'Booker' },
		{ classes: 'repeater-item class4', firstName: 'Pearson', lastName: 'Blevins' },
		{ classes: 'repeater-item class5', firstName: 'Pearl', lastName: 'Mcknight' },
		{ classes: 'repeater-item class1', firstName: 'Mcconnell', lastName: 'Jenkins' },
		{ classes: 'repeater-item class2', firstName: 'Ava', lastName: 'Deleon' },
		{ classes: 'repeater-item class3', firstName: 'Emily', lastName: 'Goodwin' },
		{ classes: 'repeater-item class4', firstName: 'Richmond', lastName: 'Hess' },
		{ classes: 'repeater-item class5', firstName: 'Pitts', lastName: 'Osborn' },
		{ classes: 'repeater-item class1', firstName: 'Lela', lastName: 'Page' },
		{ classes: 'repeater-item class2', firstName: 'Carmen', lastName: 'Maxwell' },
		{ classes: 'repeater-item class3', firstName: 'Dana', lastName: 'Thompson' },
		{ classes: 'repeater-item class4', firstName: 'Dominique', lastName: 'Jensen' },
		{ classes: 'repeater-item class5', firstName: 'Freda', lastName: 'Short' },
		{ classes: 'repeater-item class1', firstName: 'Cynthia', lastName: 'Bass' },
		{ classes: 'repeater-item class2', firstName: 'Laurie', lastName: 'Kim' },
		{ classes: 'repeater-item class3', firstName: 'Suarez', lastName: 'Jarvis' },
		{ classes: 'repeater-item class4', firstName: 'Esperanza', lastName: 'Camacho' },
		{ classes: 'repeater-item class5', firstName: 'Rachelle', lastName: 'Lynch' },
		{ classes: 'repeater-item class1', firstName: 'Sonja', lastName: 'Lowery' },
		{ classes: 'repeater-item class2', firstName: 'Nelda', lastName: 'Benton' },
		{ classes: 'repeater-item class3', firstName: 'Bernadine', lastName: 'Pratt' },
		{ classes: 'repeater-item class4', firstName: 'Welch', lastName: 'Russo' },
		{ classes: 'repeater-item class5', firstName: 'Eileen', lastName: 'Mays' },
		{ classes: 'repeater-item class1', firstName: 'Nell', lastName: 'Conner' },
		{ classes: 'repeater-item class2', firstName: 'Carolina', lastName: 'Hodges' },
		{ classes: 'repeater-item class3', firstName: 'Polly', lastName: 'Mueller' },
		{ classes: 'repeater-item class4', firstName: 'Jimenez', lastName: 'Goodman' },
		{ classes: 'repeater-item class5', firstName: 'Fowler', lastName: 'Haley' },
		{ classes: 'repeater-item class1', firstName: 'Rios', lastName: 'Watson' },
		{ classes: 'repeater-item class2', firstName: 'Kidd', lastName: 'Mcmahon' },
		{ classes: 'repeater-item class3', firstName: 'Audrey', lastName: 'Buchanan' },
		{ classes: 'repeater-item class4', firstName: 'Mcdonald', lastName: 'Miles' },
		{ classes: 'repeater-item class5', firstName: 'Marcia', lastName: 'Collins' },
		{ classes: 'repeater-item class1', firstName: 'Mason', lastName: 'Owens' },
		{ classes: 'repeater-item class2', firstName: 'Hopper', lastName: 'Hanson' },
		{ classes: 'repeater-item class3', firstName: 'Good', lastName: 'Jacobs' },
		{ classes: 'repeater-item class4', firstName: 'Bryan', lastName: 'Francis' },
		{ classes: 'repeater-item class5', firstName: 'Chris', lastName: 'Payne' },
		{ classes: 'repeater-item class1', firstName: 'Russo', lastName: 'Burgess' },
		{ classes: 'repeater-item class2', firstName: 'Carla', lastName: 'Burke' },
		{ classes: 'repeater-item class3', firstName: 'Herman', lastName: 'Stephenson' },
		{ classes: 'repeater-item class4', firstName: 'Garrison', lastName: 'Santana' },
		{ classes: 'repeater-item class5', firstName: 'Freida', lastName: 'Stevenson' },
		{ classes: 'repeater-item class1', firstName: 'Macias', lastName: 'Bright' },
		{ classes: 'repeater-item class2', firstName: 'Wiley', lastName: 'Simon' },
		{ classes: 'repeater-item class3', firstName: 'Cook', lastName: 'Farmer' },
		{ classes: 'repeater-item class4', firstName: 'Baldwin', lastName: 'Burch' },
		{ classes: 'repeater-item class5', firstName: 'Sabrina', lastName: 'Schwartz' },
		{ classes: 'repeater-item class1', firstName: 'Hudson', lastName: 'Medina' },
		{ classes: 'repeater-item class2', firstName: 'Jodi', lastName: 'Wells' },
		{ classes: 'repeater-item class3', firstName: 'Curry', lastName: 'Oneil' },
		{ classes: 'repeater-item class4', firstName: 'Mejia', lastName: 'Mcneil' },
		{ classes: 'repeater-item class5', firstName: 'Carrie', lastName: 'Rivas' },
		{ classes: 'repeater-item class1', firstName: 'Lowery', lastName: 'Murphy' },
		{ classes: 'repeater-item class2', firstName: 'Pace', lastName: 'Rivera' },
		{ classes: 'repeater-item class3', firstName: 'Gonzales', lastName: 'Ramos' },
		{ classes: 'repeater-item class4', firstName: 'Irwin', lastName: 'Rivers' },
		{ classes: 'repeater-item class5', firstName: 'Angelique', lastName: 'Hardy' },
		{ classes: 'repeater-item class1', firstName: 'Branch', lastName: 'Little' },
		{ classes: 'repeater-item class2', firstName: 'Yang', lastName: 'Case' },
		{ classes: 'repeater-item class3', firstName: 'Douglas', lastName: 'Marsh' },
		{ classes: 'repeater-item class4', firstName: 'Velma', lastName: 'Joyner' },
		{ classes: 'repeater-item class5', firstName: 'Susanna', lastName: 'Park' },
		{ classes: 'repeater-item class1', firstName: 'Billie', lastName: 'Kirk' },
		{ classes: 'repeater-item class2', firstName: 'Melendez', lastName: 'Fischer' },
		{ classes: 'repeater-item class3', firstName: 'Summer', lastName: 'Reeves' },
		{ classes: 'repeater-item class4', firstName: 'Contreras', lastName: 'Bradley' },
		{ classes: 'repeater-item class5', firstName: 'Taylor', lastName: 'Miller' },
		{ classes: 'repeater-item class1', firstName: 'Hopkins', lastName: 'Aguilar' },
		{ classes: 'repeater-item class2', firstName: 'Cleo', lastName: 'Sullivan' },
		{ classes: 'repeater-item class3', firstName: 'Vazquez', lastName: 'Flowers' },
		{ classes: 'repeater-item class4', firstName: 'Gibson', lastName: 'Gilliam' },
		{ classes: 'repeater-item class5', firstName: 'Zimmerman', lastName: 'Riggs' },
		{ classes: 'repeater-item class1', firstName: 'Mcintyre', lastName: 'Mcgee' },
		{ classes: 'repeater-item class2', firstName: 'Hall', lastName: 'Caldwell' },
		{ classes: 'repeater-item class3', firstName: 'Felicia', lastName: 'Fitzpatrick' },
		{ classes: 'repeater-item class4', firstName: 'Delgado', lastName: 'Cole' },
		{ classes: 'repeater-item class5', firstName: 'Burns', lastName: 'Summers' },
		{ classes: 'repeater-item class1', firstName: 'Durham', lastName: 'Dickerson' },
		{ classes: 'repeater-item class2', firstName: 'Lavonne', lastName: 'Robles' },
		{ classes: 'repeater-item class3', firstName: 'Roberts', lastName: 'Adams' },
		{ classes: 'repeater-item class4', firstName: 'Ayala', lastName: 'Lawson' },
		{ classes: 'repeater-item class5', firstName: 'Lori', lastName: 'Nolan' }
	];

module.exports = kind({
	name: 'enyo.sample.DataRepeaterSample',
	classes: 'data-repeater-sample enyo-border-box',
	components: [
		{name: 'repeater', kind: DataRepeater, components: [
			{components: [
				{classes: 'name-wrapper', components: [
					{name: 'index', classes: 'index', tag: 'span'},
					{name: 'firstName', classes: 'name', tag: 'span'},
					{name: 'lastName', classes: 'name last', tag: 'span'},
					{name: 'lastNameLetter', classes: 'name last-letter', tag: 'span'}
				]}
			], bindings: [
				{from: 'index', to: '$.index.content'},
				{from: 'model.firstName', to: '$.firstName.content'},
				{from: 'model.lastName', to: '$.lastName.content'},
				{from: 'model.lastName', to: '$.lastNameLetter.content', transform: function (v) { return v.charAt(0); }},
				{from: 'model.classes', to: 'classes'}
			]}
		]}
	],
	bindings: [
		{from: 'collection', to: '$.repeater.collection'}
	],
	populateList: function () {
		this.collection = new Collection(data);
	},
	create: kind.inherit(function (sup) {
		return function () {
			this.populateList();
			sup.apply(this, arguments);
		};
	})
});

module.exports.data = data;

}],'src/DragAvatarSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	DragAvatar = require('enyo/DragAvatar'),
	EnyoImage = require('enyo/Image');

module.exports = kind({
	name: 'enyo.sample.DragAvatarSample',
	classes: 'drag-avatar-sample enyo-fit',
	components: [
		{content: 'Start dragging anywhere on the screen.'},
		{kind: DragAvatar, offsetX: 0, offsetY: 64, components: [
			{kind: EnyoImage, name: 'imageAvatar', src: 'http://enyojs.com/img/enyo-logo.png'}
		]}
	],
	handlers: {
		ondrag: 'drag',
		ondragfinish: 'dragFinish'
	},
	drag: function (sender, ev) {
		this.$.dragAvatar.drag(ev);
	},
	dragFinish: function (sender, ev) {
		this.$.dragAvatar.hide();
	}
});

}],'src/NestedRepeaterSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Control = require('enyo/Control'),
	Repeater = require('enyo/Repeater');

module.exports = kind({
	name: 'enyo.sample.NestedRepeaterSample',
	classes: 'enyo-fit nested-repeater-sample',
	kind: Control,
	components: [
		{kind: Repeater, name: 'outer', onSetupItem:'setupGroup', count: 3, components: [
			{kind: Repeater, name: 'inner', onSetupItem:'setupItem', components: [
				{name:'item', classes:'nested-repeater-sample-item', components: [
					{tag:'span', name: 'personNumber'},
					{tag:'span', name: 'personName'}
				]}
			]}
		]}
	],
	create: function () {
		this.inherited(arguments);
	},
	setupGroup: function (sender, ev) {
		var item = ev.item;
		item.$.inner.setCount(this.people.length);
		return true;
	},
	setupItem: function (sender, ev) {
		var group = ev.indices[1];
		var index = ev.index;
		var item = ev.item;
		var person = this.people[index];
		item.$.personNumber.setContent((group + 1) + ':' + (index+1) + '. ');
		item.$.personName.setContent(person.name);
		item.$.personName.applyStyle('color', person.sex == 'male' ? 'dodgerblue' : 'deeppink');
		/* stop propagation */
		return true;
	},
	people: [
		{name: 'Andrew', sex:'male'},
		{name: 'Betty', sex:'female'},
		{name: 'Christopher', sex:'male'},
		{name: 'Donna', sex:'female'},
		{name: 'Ephraim', sex:'male'},
		{name: 'Frankie', sex:'male'},
		{name: 'Gerald', sex:'male'},
		{name: 'Heather', sex:'female'},
		{name: 'Ingred', sex:'female'},
		{name: 'Jack', sex:'male'},
		{name: 'Kevin', sex:'male'},
		{name: 'Lucy', sex:'female'},
		{name: 'Matthew', sex:'male'},
		{name: 'Noreen', sex:'female'},
		{name: 'Oscar', sex:'male'},
		{name: 'Pedro', sex:'male'},
		{name: 'Quentin', sex:'male'},
		{name: 'Ralph', sex:'male'},
		{name: 'Steven', sex:'male'},
		{name: 'Tracy', sex:'female'},
		{name: 'Uma', sex:'female'},
		{name: 'Victor', sex:'male'},
		{name: 'Wendy', sex:'female'},
		{name: 'Xin', sex:'male'},
		{name: 'Yulia', sex:'female'},
		{name: 'Zoltan'}
	]
});

}],'src/RepeaterSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Control = require('enyo/Control'),
	Repeater = require('enyo/Repeater');

module.exports = kind({
	name: 'enyo.sample.RepeaterSample',
	classes: 'enyo-fit repeater-sample',
	kind: Control,
	components: [
		{kind: Repeater, onSetupItem:'setupItem', components: [
			{name:'item', classes:'repeater-sample-item', components: [
				{tag:'span', name: 'personNumber'},
				{tag:'span', name: 'personName'}
			]}
		]}
	],
	create: function () {
		this.inherited(arguments);
		this.$.repeater.setCount(this.people.length);
	},
	setupItem: function (sender, ev) {
		var index = ev.index;
		var item = ev.item;
		var person = this.people[index];
		item.$.personNumber.setContent((index+1) + '. ');
		item.$.personName.setContent(person.name);
		item.$.personName.applyStyle('color', person.sex == 'male' ? 'dodgerblue' : 'deeppink');
		/* stop propagation */
		return true;
	},
	people: [
		{name: 'Andrew', sex:'male'},
		{name: 'Betty', sex:'female'},
		{name: 'Christopher', sex:'male'},
		{name: 'Donna', sex:'female'},
		{name: 'Ephraim', sex:'male'},
		{name: 'Frankie', sex:'male'},
		{name: 'Gerald', sex:'male'},
		{name: 'Heather', sex:'female'},
		{name: 'Ingred', sex:'female'},
		{name: 'Jack', sex:'male'},
		{name: 'Kevin', sex:'male'},
		{name: 'Lucy', sex:'female'},
		{name: 'Matthew', sex:'male'},
		{name: 'Noreen', sex:'female'},
		{name: 'Oscar', sex:'male'},
		{name: 'Pedro', sex:'male'},
		{name: 'Quentin', sex:'male'},
		{name: 'Ralph', sex:'male'},
		{name: 'Steven', sex:'male'},
		{name: 'Tracy', sex:'female'},
		{name: 'Uma', sex:'female'},
		{name: 'Victor', sex:'male'},
		{name: 'Wendy', sex:'female'},
		{name: 'Xin', sex:'male'},
		{name: 'Yulia', sex:'female'},
		{name: 'Zoltan'}
	]
});
}],'src/NewDrawerSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Collection = require('enyo/Collection'),
	Control = require('enyo/Control'),
	NewDrawer = require('enyo/NewDrawer'),
	DataRepeater = require('enyo/DataRepeater');

module.exports = kind({
	name: 'enyo.sample.NewDrawerSample',
	kind: Control,
	components: [
		{
			kind: NewDrawer,
			components: [
				{
					name: 'r',
					kind: DataRepeater,
					components: [
						{
							bindings: [
								{from: 'model.label', to: 'content'}
							]
						}
					]
				}
			]
		},
		{content: 'foo'}
	],
	create: kind.inherit(function (sup) {
		return function () {
			var n = 50,
				d = [];

			sup.apply(this, arguments);

			for (var i = 0; i < n; i++) {
				d.push({label: 'Item ' + (i + 1)});
			}

			this.$.r.collection = new Collection(d);
		};
	})
});

module.exports.badgeClasses = 'wip';

}],'src/CheckboxSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Checkbox = require('enyo/Checkbox'),
	Group = require('enyo/Group');

module.exports = kind({
	name: 'enyo.sample.CheckboxSample',
	classes: 'checkbox-sample',
	components: [
		{content: 'Checkboxes', classes: 'section'},
		{kind: Checkbox, content: 'Checkbox 1', onchange: 'checkboxChanged'},
		{kind: Checkbox, content: 'Checkbox 2', onchange: 'checkboxChanged'},
		{kind: Checkbox, content: 'Checkbox 3', onchange: 'checkboxChanged'},
		{content: 'Grouped Checkboxes', classes: 'section'},
		{kind: Group, onActivate: 'groupActivated', components: [
			{kind: Checkbox, content: 'Grouped Checkbox 1'},
			{kind: Checkbox, content: 'Grouped Checkbox 2'},
			{kind: Checkbox, content: 'Grouped Checkbox 3'}
		]},
		{name: 'results', classes: 'results'}
	],
	checkboxChanged: function (sender, ev) {
		this.updateResult({content: 'The \'' + ev.originator.getContent() + '\' checkbox is ' + (sender.getChecked() ? 'checked': 'unchecked') + '.'});
	},
	groupActivated: function (sender, ev) {
		if (ev.originator.getActive()) {
			this.updateResult({content: 'The \'' + ev.originator.getContent() + '\' checkbox is selected.'});
		}
	},
	updateResult: function (comps) {
		this.$.results.destroyClientControls();
		this.$.results.createComponent(comps);
		this.$.results.render();
	}
});

}],'src/DrawerSample':[function (module,exports,global,require,request){
var	
	kind = require('enyo/kind');

var 
	Checkbox = require('enyo/Checkbox'),
	Drawer = require('enyo/Drawer');

module.exports = kind({
	name: 'enyo.sample.DrawerSample',
	classes: 'drawer-sample',
	components: [
		{content: 'Drawers', classes:'drawer-sample-divider'},
		{content: 'Activate (V)', classes: 'drawer-sample-box drawer-sample-mtb', ontap:'activateDrawer'},
		{name: 'drawer', kind: Drawer, components: [
			{content: 'Vertical Drawer<br>Vertical Drawer<br>Vertical Drawer<br>Vertical Drawer', allowHtml: true, classes: 'drawer-sample-box drawer-sample-mtb'},
			{components: [
				{kind: Checkbox, name: 'animateSetting', value: true},
				{content:'Animated', classes:'enyo-inline onyx-sample-animate-label'}
			]},
			{content: 'Activate (V) (Toggled Animation)', classes: 'drawer-sample-box drawer-sample-mtb', ontap:'activateDrawer2'},
			{name: 'drawer2', kind: Drawer, animated: true, components: [
				{content: 'Vertical Drawer<br>Vertical Drawer<br>Vertical Drawer<br>Vertical Drawer', allowHtml: true, classes: 'drawer-sample-box drawer-sample-mtb'}
			]},
			{content: 'Vertical Drawer<br>Vertical Drawer<br>Vertical Drawer<br>Vertical Drawer', allowHtml: true, classes: 'drawer-sample-box drawer-sample-mtb'}
		]},
		{content: 'Foo<br>Foo', allowHtml: true, classes: 'drawer-sample-box drawer-sample-mtb'},
		{classes: 'drawer-sample-box drawer-sample-mtb drawer-sample-o', components: [
			{content: 'Activate (H)', ontap: 'activateColumnsDrawer', classes: 'drawer-sample-box'},
			{name: 'columnsDrawer', orient: 'h', kind: Drawer, open: false, components: [
				{content: 'H-Drawer',  classes: 'drawer-sample-box'}
			]}
		]},
		{content: 'Foo', classes: 'drawer-sample-box drawer-sample-mtb'}
	],
	activateDrawer: function () {
		this.$.drawer.setOpen(!this.$.drawer.open);
	},
	activateDrawer2: function () {
		this.$.drawer2.setAnimated(this.$.animateSetting.getValue());
		this.$.drawer2.setOpen(!this.$.drawer2.open);
	},
	activateColumnsDrawer: function () {
		this.$.columnsDrawer.setOpen(!this.$.columnsDrawer.open);
		return true;
	}
});
}],'src/GestureSample':[function (module,exports,global,require,request){
var
	drag = require('enyo/gesture/drag'),
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	Animator = require('enyo/Animator'),
	Checkbox = require('enyo/Checkbox'),
	Group = require('enyo/Group'),
	Select = require('enyo/Select');

var
	EventItem = kind({
		name:'enyo.sample.EventItem',
		published: {
			event:'',
			truncate: true,
			persist: false
		},
		style:'padding:4px;',
		events: {
			onDone:''
		},
		components: [
			{name: 'eventProps', allowHtml:true},
			{kind: Animator, duration:1000, startValue:0, endValue:255, onStep:'stepAnimation', onEnd:'animationEnded'}
		],
		create: function () {
			this.inherited(arguments);
			this.eventChanged();
			this.truncateChanged();
		},
		truncateChanged: function () {
			this.$.eventProps.addRemoveClass('gesture-sample-truncate', this.truncate);
		},
		eventChanged: function (old) {
			if (this.event) {
				if (this.timeout) {
					clearTimeout(this.timeout);
					this.timeout = null;
				}
				this.$.animator.stop();
				this.$.eventProps.set('content', this.getPropsString());
				this.$.animator.play();
			}
		},
		stepAnimation: function (sender, ev) {
			var v = Math.floor(sender.value);
			this.applyStyle('background-color', 'rgb(' + v + ',255,' + v + ');');
			return true;
		},
		animationEnded: function () {
			if (!this.persist) {
				this.timeout = setTimeout(this.bindSafely(function() {
					this.doDone({type:this.event.type});
				}), 2000);
			}
			return true;
		},
		destroy: function () {
			if (this.timeout) {
				clearTimeout(this.timeout);
				this.timeout = null;
			}
			this.inherited(arguments);
		},
		getPropsString: function () {
			var props = [];
			for (var i in this.event) {
				if ((this.event[i] !== undefined) &&
					(this.event[i] !== null) &&
					!(this.event[i] instanceof Object) &&
					(i != 'type')) {
					props.push(i + ': ' + this.event[i]);
				}
			}
			if (this.event.srcEvent && this.event.srcEvent.type) {
				props.push('srcEvent.type: ' + this.event.srcEvent.type);
			}
			return '<b>' + this.event.type + '</b>: { ' + props.join(', ') + ' }';
		}
	});

var previousHoldPulseConfig;

function overrideHoldPulseConfig () {
	previousHoldPulseConfig = drag.holdPulseDefaultConfig;

	drag.configureHoldPulse({
		frequency: 100,
		events: [
		    {name: 'hold', time: 200},
		    {name: 'longpress', time: 500},
		    {name: 'longerpress', time: 1000}
		],
		endHold: 'onMove',
		moveTolerance: 16,
		resume: false
	});
}

function restoreHoldPulseConfig () {
	drag.configureHoldPulse(previousHoldPulseConfig);
}

module.exports = kind({
	name: 'enyo.sample.GestureSample',
	classes: 'gesture-sample enyo-fit enyo-unselectable',
	components: [
		{
			classes:'gesture-sample-pad',
			name: 'gestureSamplePad',
			fit:true,
			doubleTapEnabled: false,
			ondown: 'handleEvent',
			onup: 'handleEvent',
			ontap: 'handleEvent',
			onmove: 'handleEvent',
			onenter: 'handleEvent',
			onleave: 'handleEvent',
			ondragstart: 'handleEvent',
			ondrag: 'handleEvent',
			ondragover: 'handleEvent',
			onhold: 'handleEvent',
			onrelease: 'handleEvent',
			onholdpulse: 'handleEvent',
			onflick: 'handleEvent',
			ongesturestart: 'handleEvent',
			ongesturechange: 'handleEvent',
			ongestureend: 'handleEvent',
			ondoubletap: 'handleEvent',
			onlongpress: 'handleEvent',
			onlongerpress: 'handleEvent',
			components: [
				{content: 'Perform gestures here', style: 'pointer-events: none;'},
				{classes: 'gesture-sample-note', content:'(tap below for options)', style: 'pointer-events: none;'}
			]
		},
		{kind: Group, ontap:'toggleSettings', components: [
			{content: 'Events'},
			{name: 'eventList', style:'font-size:12px;', onDone:'removeEvent', components: [
				{name:'waiting', content: 'Waiting for events...', style:'padding:4px;font-style:italic;color:gray;'}
			]}
		]},
		{ontap:'toggleSettings', name:'settings', showing:false, components: [
			{content: 'Options'},
			{kind: Group, classes:'gesture-sample-padded', components: [
				{classes:'gesture-sample-setting', components: [
					{content:'Truncate detail on small screen: '},
					{name:'truncateDetail', onchange:'truncateChanged', ontap:'preventDefault', kind: Checkbox, checked:true}
				]},
				{classes:'gesture-sample-setting', components: [
					{content:'Enable Double Tap: '},
					{name:'enableDoubleTap', onchange:'doubleTapChanged', ontap:'preventDefault', kind: Checkbox, checked:false}
				]},
				{classes:'gesture-sample-setting', style:'min-height:40px;', components: [
					{content:'Monitor event: '},
					{content:'Select event', style:'width:140px; margin-bottom:5px;'},
					{name:'eventPicker', kind: Select, classes:'gesture-sample-left'}
				]}
			]}
		]}
	],
	create: function () {
		this.inherited(arguments);
		overrideHoldPulseConfig();
		this.eventList = {};
		this.eventCount = 0;
		utils.forEach(
			['All events','down','up','tap','move','enter','leave','dragstart','drag','dragover','hold','release',
				'holdpulse','flick','gesturestart','gesturechange','gestureend','doubletap', 'longpress', 'longerpress'],
			this.bindSafely(function(event) {
				this.$.eventPicker.createComponent({content:event, style:'text-align:left'});
			}));
	},
	destroy: function () {
		restoreHoldPulseConfig();
		this.inherited(arguments);
	},
	handleEvent: function(sender, ev) {
		var event = utils.clone(ev);
		if (this.monitorEvent && (event.type != this.monitorEvent)) {
			return true;
		}
		var eventItem = this.eventList[event.type];
		if (eventItem) {
			eventItem.set('event', event, true);
		} else {
			this.eventCount++;
			eventItem = this.$.eventList.createComponent({
				kind: EventItem,
				event:event,
				truncate: this.$.truncateDetail.get('value'),
				persist: this.monitorEvent
			});
			this.eventList[event.type] = eventItem;
		}
		eventItem.render();
		this.$.waiting.hide();
		this.reflow();
		return true;
	},
	truncateChanged: function () {
		for (var i in this.eventList) {
			this.eventList[i].set('truncate', this.$.truncateDetail.get('value'));
		}
		this.reflow();
		return false;
	},
	doubleTapChanged: function () {
		this.$.gestureSamplePad.doubleTapEnabled = this.$.enableDoubleTap.checked;
	},
	removeEvent: function (sender, ev) {
		this.eventCount--;
		this.eventList[ev.type].destroy();
		delete this.eventList[ev.type];
		if (this.eventCount === 0) {
			this.$.waiting.show();
		}
		this.reflow();
		return true;
	},
	removeAllEvents: function () {
		for (var i in this.eventList) {
			this.eventList[i].destroy();
			delete this.eventList[i];
		}
		this.eventCount = 0;
		this.$.waiting.show();
		this.reflow();
	},
	toggleSettings: function () {
		this.$.settings.set('showing', !this.$.settings.get('showing'));
		this.reflow();
	},
	preventDefault: function () {
		return true;
	},
	monitorEventSelected: function (sender, ev) {
		this.removeAllEvents();
		if (ev.originator.content == 'All events') {
			this.monitorEvent = null;
		} else {
			this.monitorEvent = ev.originator.content;
		}
	}
});
}],'src/DataRepeaterSampleWithJSData':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Binding = require('enyo/Binding');

var
	DataRepeaterSample = require('../DataRepeaterSample');

module.exports = kind({
	kind: DataRepeaterSample,
	populateList: function () {
		this.collection = DataRepeaterSample.data;
	},
	create: kind.inherit(function (sup) {
		return function () {
			Binding.defaultBindingKind = Binding.PassiveBinding;
			sup.apply(this, arguments);
		};
	}),
	destroy: kind.inherit(function (sup) {
		return function () {
			Binding.defaultBindingKind = Binding;
			sup.apply(this ,arguments);
		};
	})

});

module.exports.badgeClasses = 'new';

},{'../DataRepeaterSample':'src/DataRepeaterSample'}],'src/AccessibilitySample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	Button = require('enyo/Button'),
	Control = require('enyo/Control'),
	Checkbox = require('enyo/Checkbox'),
	Input = require('enyo/Input'),
	Popup = require('enyo/Popup');
var
	VoiceReadout = require('enyo-webos/VoiceReadout');

module.exports = kind({
	kind: Control,
	classes: 'accessibility-sample',
	components: [
		{tag: 'h3', content: 'Fixed Examples'},
		{classes: 'aria-samples', components: [
			// only content
			{name: 'c', content: 'content'},
			// content + label
			{name: 'cl', content: 'content', accessibilityLabel: 'the label'},
			// content + hint
			{name: 'ch', content: 'content', accessibilityHint: 'the hint'},
			// content + label + hint
			{name: 'clh', content: 'content', accessibilityLabel: 'the label', accessibilityHint: 'the hint'},
			// label + hint
			{name: 'lh', accessibilityLabel: 'the label', accessibilityHint: 'the hint'},
			// only label
			{name: 'l', accessibilityLabel: 'the label'},
			// only hint
			{name: 'h', accessibilityHint: 'the hint'}
		]},
		{tag: 'h3', content: 'Dynamic Example'},
		{classes: 'aria-samples', components: [
			{name: 'dyn', content: 'Content'}
		]},
		{kind: Button, content: 'Toggle Content', ontap: 'toggleContent'},
		{kind: Button, content: 'Toggle Label', ontap: 'toggleLabel'},
		{kind: Button, content: 'Toggle Hint', ontap: 'toggleHint'},
		{name: 'toggle1', kind: Button, content: 'Toggle Disabled', ontap: 'toggleDynDisabled'},
		{tag: 'h3', content: 'UI control accessibilityDisabled Example'},
		{components: [
			{kind: Popup, name: 'popup', autoDismiss: false, classes: 'popup', content: 'popup'},
			{tag: 'br'},
			{tag: 'br'},
			{classes: 'result', name: 'popup_result'},
			{tag: 'br'},
			{name: 'checkbox', kind: Checkbox, disabled: true, checked: true, content: 'simple checkbox'},
			{classes: 'result', name: 'checkbox_result'},
			{tag: 'br'},
			{name: 'btn', kind: Button, disabled: true, content: 'button'},
			{classes: 'result', name: 'btn_result'},
			{tag: 'br'}
		]},
		{name: 'toggle2', kind: Button, content: 'Toggle Disabled', ontap: 'toggleDisabled'},
		{tag: 'h3', content: 'readAlert API Example'},
		{kind: Input, name: "inputText", type: "text", value: "Initial Value"},
		{kind: Button, content: 'readAlert', ontap: 'readAlertText'}
	],
	/**
	* @private
	*/
	rendered: kind.inherit(function (sup) {
		return function (props) {
			sup.apply(this, arguments);
			this.$.popup.show();
			this.showAriaAttributes();
		};
	}),
	toggleContent: function () {
		this.$.dyn.set('content', this.$.dyn.content ? '' : 'Content');
	},
	toggleLabel: function () {
		this.$.dyn.set('accessibilityLabel', this.$.dyn.accessibilityLabel ? '' : 'Label');
	},
	toggleHint: function () {
		this.$.dyn.set('accessibilityHint', this.$.dyn.accessibilityHint ? '' : 'Hint');
	},
	toggleDynDisabled: function (sender, ev) {
		this.$.dyn.set('accessibilityDisabled', !this.$.dyn.accessibilityDisabled);
	},
	toggleDisabled: function (sender, ev) {
		this.$.popup.set('accessibilityDisabled', !this.$.popup.accessibilityDisabled);
		this.$.checkbox.set('accessibilityDisabled', !this.$.checkbox.accessibilityDisabled);
		this.$.btn.set('accessibilityDisabled', !this.$.btn.accessibilityDisabled);
		this.showAriaAttributes();
	},
	showAriaAttributes: function () {
		var role, label, checked, disabled, tabindex;

		label = this.$.popup.getAttribute('aria-label');
		role = this.$.popup.getAttribute('role');
		tabindex = this.$.popup.getAttribute('tabindex');
		this.$.popup_result.set('content', ' :: tabindex = ' + tabindex + ' :: role = ' + role + ' :: aria-label = ' + label);

		label = this.$.checkbox.getAttribute('aria-label');
		role = this.$.checkbox.getAttribute('role');
		checked = this.$.checkbox.getAttribute('aria-checked');
		disabled = this.$.checkbox.getAttribute('aria-disabled');
		tabindex = this.$.checkbox.getAttribute('tabindex');
		this.$.checkbox_result.set('content', ' :: tabindex = ' + tabindex + ' :: role = ' + role + ' :: aria-label = ' + label + ' :: aria-checked = ' + checked + ' :: aria-disabled = ' + disabled);

		label = this.$.btn.getAttribute('aria-label');
		role = this.$.btn.getAttribute('role');
		disabled = this.$.btn.getAttribute('aria-disabled');
		tabindex = this.$.btn.getAttribute('tabindex');
		this.$.btn_result.set('content', ' :: tabindex = ' + tabindex + ' :: role = ' + role + ' :: aria-label = ' + label + ' :: aria-disabled = ' + disabled);
	},
	readAlertText: function () {
		VoiceReadout.readAlert(this.$.inputText.getValue());
	}
});

module.exports.badgeClasses = 'new';

}],'src/AjaxSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Ajax = require('enyo/Ajax'),
	Button = require('enyo/Button'),
	Input = require('enyo/Input'),
	Popup = require('enyo/Popup'),
	TextArea = require('enyo/TextArea');

module.exports = kind({
	name: 'enyo.sample.AjaxSample',
	classes: 'enyo-fit ajax-sample',
	components: [
		{classes:'onyx-toolbar-inline', components: [
			{content: 'YQL: '},
			{kind: Input, name:'query', fit:true, value:'select * from weather.forecast where woeid in (select woeid from geo.places where text=\'san francisco, ca\')'},
			{kind: Button, content:'Fetch', ontap:'fetch'}
		]},
		{classes:'onyx-toolbar-inline', components: [
			{content: 'URL: '},
			{kind: Input, name:'baseUrl', fit:true, value:'http://query.yahooapis.com/v1/public/yql?format=json'}
		]},
		{kind: TextArea, fit:true, classes:'ajax-sample-source'},
		{name: 'basicPopup', kind: Popup, centered: true, floating: true, classes:'onyx-sample-popup', style: 'padding: 10px;', content: 'Popup...'}
	],
	fetch: function () {

		var ajax = new Ajax({
			url: this.$.baseUrl.getValue()
		});
		// send parameters the remote service using the 'go()' method
		ajax.go({
			q: this.$.query.getValue()
		});
		// attach responders to the transaction object
		ajax.response(this, 'processResponse');
		// handle error
		ajax.error(this, 'processError');
	},
	processResponse: function (sender, res) {
		// do something with it
		this.$.textArea.setValue(JSON.stringify(res, null, 2));
	},
	processError: function (sender, res) {
		var errorLog = 'Error' + ': ' + res + '! ' + (JSON.parse(sender.xhrResponse.body)).error.description;
		this.$.textArea.setValue(JSON.stringify(sender.xhrResponse, null, 2));
		this.$.basicPopup.setContent(errorLog);
		this.$.basicPopup.show();
	}
});
}],'src/AudioSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	job = require('enyo/job'),
	utils = require('enyo/utils');

var
	EnyoAudio = require('enyo/Audio'),
	Button = require('enyo/Button'),
	Popup = require('enyo/Popup'),
	Select = require('enyo/Select');


module.exports = kind({
	name: 'enyo.sample.AudioSample',
	classes: 'audio-sample',
	components: [
		{
			kind: EnyoAudio,
			onratechange: 'rateChanged',
			ontimeupdate: 'timeChanged',
			onFastforward: 'playbackChanged',
			onRewind: 'playbackChanged',
			onPlay: 'playbackChanged',
			onPause: 'playbackChanged',
			onLoadedMetaData: 'metaDataLoaded'
		},
		{content: 'Audio', classes: 'section'},
		{kind: Select, name: 'selectAudio', onchange: 'selectChanged', components: [
			{content: 'Andre Agassi - Farewell To Tennis', active: true},
			{content: 'Fight Club Rules'},
			{content: 'Hail to the Chief'},
			{content: 'Winston Churchill: Blood, Toil, Tears, and Sweat'}
		]},
		{content: 'Playback', classes: 'section'},
		{kind: Button, content: 'Play', ontap: 'togglePlay'},
		{kind: Button, content: '<< Rewind', ontap: 'buttonRewindTapped'},
		{kind: Button, content: 'Fast Forward >>', ontap: 'buttonFastForwardTapped'},
		{kind: Button, content: '< Jump Backward', ontap: 'buttonJumpBackwardTapped'},
		{kind: Button, content: 'Jump Forward >', ontap: 'buttonJumpForwardTapped'},
		{kind: Button, content: 'Loop', ontap: 'buttonLoopTapped'},
		{name: 'results', classes: 'results'},
		{kind: Popup, name: 'popupStatus', floating: true, centered: true, classes: 'popup'}
	],
	sounds: [
		'http://www.noiseaddicts.com/samples_1w72b820/3828.mp3',
		'http://www.noiseaddicts.com/samples_1w72b820/2514.mp3',
		'http://www.noiseaddicts.com/samples_1w72b820/4353.mp3',
		'http://www.noiseaddicts.com/samples_1w72b820/134.mp3'
	],
	rendered: function () {
		this.inherited(arguments);
		this.loadAudio(this.$.selectAudio.getSelected());
	},
	metaDataLoaded: function (sender, ev) {
		this.timeChanged(sender, utils.mixin(ev, {duration: this.$.audio.getDuration(), currentTime: this.$.audio.getCurrentTime()}));
	},
	playbackChanged: function (sender, ev) {
		if (ev.type === 'onPause') {
			this.displayPopup('Pause');
		} else if (ev.originator.playbackRate > 1) {
			this.displayPopup('Fast-Forward');
		} else if (ev.originator.playbackRate < -1) {
			this.displayPopup('Rewind');
		} else if (ev.originator.playbackRate == 1) {
			this.displayPopup('Play');
		}
	},
	loadAudio: function (index) {
		this.$.audio.setSrc(this.sounds[index]);
		this.$.button.setContent('Play');
	},
	playAudio: function () {
		this.$.audio.play();
		this.$.button.setContent('Pause');
	},
	pauseAudio: function () {
		this.$.audio.pause();
		this.$.button.setContent('Play');
	},
	togglePlay: function (sender, res) {
		if (this.$.audio.getPaused()) {
			this.playAudio();
		} else {
			this.pauseAudio();
		}
	},
	buttonRewindTapped: function (sender, ev) {
		this.$.audio.rewind();
	},
	buttonFastForwardTapped: function (sender, ev) {
		this.$.audio.fastForward();
	},
	buttonJumpBackwardTapped: function (sender, ev) {
		this.$.audio.jumpBackward();
		this.displayPopup('Jump Backward ' + this.$.audio.getJumpSec() + 's');
	},
	buttonJumpForwardTapped: function (sender, ev) {
		this.$.audio.jumpForward();
		this.displayPopup('Jump Forward ' + this.$.audio.getJumpSec() + 's');
	},
	buttonLoopTapped: function (sender, ev) {
		this.$.audio.setLoop(!this.$.audio.getLoop());
		this.displayPopup('Looping ' + (this.$.audio.getLoop() ? 'Enabled' : 'Disabled'));
	},
	rateChanged: function (sender, ev) {
		this.displayPopup('Playback ' + ev.playbackRate + 'x');
	},
	timeChanged: function (sender, ev) {
		this.$.results.setContent('Duration: ' + Math.floor(ev.duration) + 's, Current Position: ' + Math.floor(ev.currentTime) + 's');
	},
	selectChanged: function (sender, ev) {
		this.loadAudio(sender.selected);
	},
	displayPopup: function (content) {
		var popup = this.$.popupStatus;
		popup.setContent(content);
		popup.setShowing(true);
		job('autoHidePopup', function() {
			popup.hide();
		}, 1000);
	}
});
}],'src/BackgroundTaskManagerSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	cap = require('enyo/utils').cap;

var
	BackgroundTaskManager = require('enyo/BackgroundTaskManager'),
	Button = require('enyo/Button'),
	Control = require('enyo/Control'),
	Popup = require('enyo/Popup'),
	Priorities = require('enyo/PriorityQueue').Priorities,
	TaskManagerSupport = require('enyo/TaskManagerSupport');

var
	screenHeight = dom.getWindowHeight();

var Tower = kind({
	kind: Control,
	classes: 'tower',
	mixins: [TaskManagerSupport],
	height: 0,
	towerIndex: 0,
	towerIncrement: 50,
	addBlock: function (important) {
		if (this.height + this.towerIncrement > screenHeight) { // no more room in the current tower
			if (this.nextTower) { // let's try adding blocks to the next tower
				return BackgroundTaskManager.getCustomer(this.nextTower).addBlock(important);
			} else { // no more towers = no more space for blocks!
				return false;
			}
		} else { // we still have room in the current tower
			this.createComponent({
				kind: Control,
				classes: 'block' + (important ? ' important' : ''),
				style: 'height:' + this.towerIncrement + 'px; bottom:' + this.height + 'px',
				content: important ? 'Support Beam' : ''
			});
			this.height += this.towerIncrement;
			this.render();

			return true;
		}
	},
	clear: function () {
		this.destroyClientControls();
		this.height = 0;
	}
});

var TowerA = kind({
	kind: Tower,
	classes: 'left',
	managerName: 'towerA',
	nextTower: 'towerB'
});

var TowerB = kind({
	kind: Tower,
	classes: 'middle',
	managerName: 'towerB',
	nextTower: 'towerC'
});

var TowerC = kind({
	kind: Tower,
	classes: 'right',
	managerName: 'towerC'
});

module.exports = kind({
	classes: 'background-task-manager-sample',
	queuedBlocks: 0,
	queuedBeams: 0,
	queuedBlockLimit: 5,
	wastedBlocks: 0,
	wastedBeams: 0,
	components: [
		{kind: Popup, name: 'popupModal', classes: 'tower-popup', modal: true, autoDismiss: false, centered: true, floating: true, scrim: true, components: [
			{content: 'Add blocks to build the towers. Each block to be added will be placed into a queue, '
				+ 'so that the tower building process is not interrupted. Don\'t forget to add support beams '
				+ 'once in a while. If you forget and have queued up a number of blocks to be added, adding '
				+ 'a support beam will take priority over adding blocks.'},
			{kind: Button, content: 'Got it!', ontap: 'closeModalTapped'}
		]},
		{kind: Popup, name: 'popupWarning', classes: 'tower-popup', centered: true, components: [
			{content: 'Your tower is becoming structurally compromised! Add a support beam now.'},
			{kind: Button, content: 'Add Support', ontap: 'addBeamPopupTapped'}
		]},
		{name: 'towerA', kind: TowerA},
		{name: 'towerB', kind: TowerB},
		{name: 'towerC', kind: TowerC},
		{name: 'info', kind: Control, classes: 'info', components: [
			{name: 'actions', kind: Control, components: [
				{name: 'buttonAddTask', kind: Button, content: 'Add Block', ontap: 'addBlockTapped'},
				{name: 'buttonAddImportantTask', kind: Button, content: 'Add Support', ontap: 'addBeamTapped'},
				{name: 'buttonClear', kind: Button, content: 'Clear', ontap: 'clearTapped'}
			]},
			{kind: Control, components: [
				{name: 'queuedBlocks', kind: Control},
				{name: 'queuedBeams', kind: Control}
			]},
			{kind: Control, components: [
				{name: 'wastedBlocks', kind: Control},
				{name: 'wastedBeams', kind: Control}
			]}
		]}
	],
	bindings: [
		{from: 'queuedBlocks', to: '$.queuedBlocks.content', unit: 'queued block', transform: 'transformWithUnits'},
		{from: 'queuedBeams', to: '$.queuedBeams.content', unit: 'queued beam', transform: 'transformWithUnits'},
		{from: 'wastedBlocks', to: '$.wastedBlocks.content', unit: 'wasted block', transform: 'transformWithUnits'},
		{from: 'wastedBeams', to: '$.wastedBeams.content', unit: 'wasted beam', transform: 'transformWithUnits'}
	],
	rendered: kind.inherit(function (sup) {
		return function () {
			this.$.popupModal.set('showing', true);
		};
	}),
	handleResize: function () {
		screenHeight = dom.getWindowHeight();
	},
	addBlockTapped: function () {
		this.addElement('block');

		if (this.queuedBlocks >= this.queuedBlockLimit) {
			this.$.popupWarning.set('showing', true);
		}

		return true;
	},
	addBeamTapped: function () {
		this.addElement('beam', true);
		return true;
	},
	addBeamPopupTapped: function () {
		this.addBeamTapped();
		this.$.popupWarning.set('showing', false);
	},
	addElement: function (type, important) {
		var cappedType = cap(type) + 's',
			decrementQueued = this.bindSafely(this['decrementQueued' + cappedType]),
			incrementWasted = this.bindSafely(this['incrementWasted' + cappedType]);

		this.set('queued' + cappedType, this['queued' + cappedType] + 1);

		this.$.towerA.addTask(function () {
			if (!this.addBlock(important)) {
				incrementWasted();
			}
			decrementQueued();
		}, important ? Priorities.SOON : null);
	},
	closeModalTapped: function(inSender, inEvent) {
		this.$.popupModal.set('showing', false);
		return true;
	},
	transformWithUnits: function (value, direction, binding) {
		return value + ' ' + binding.unit + (value == 1 ? '' : 's');
	},
	decrementQueuedBlocks: function () {
		this.set('queuedBlocks', this.queuedBlocks - 1);
	},
	decrementQueuedBeams: function () {
		this.set('queuedBeams', this.queuedBeams - 1);
	},
	incrementWastedBlocks: function () {
		this.set('wastedBlocks', this.wastedBlocks + 1);
	},
	incrementWastedBeams: function () {
		this.set('wastedBeams', this.wastedBeams + 1);
	},
	clearTapped: function () {
		this.$.towerA.clear();
		this.$.towerB.clear();
		this.$.towerC.clear();
	}
});

module.exports.badgeClasses = 'new wip';

}],'src/ButtonSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	Group = require('enyo/Group'),
	EnyoImage = require('enyo/Image');


/*
	Implementation notes:
	-	We are utilizing sender (as opposed to ev.originator) in our button tap handler
		as we need to normalize for the case of the image button that has a child component, and
		we are concerned with the top-level button itself.
*/
module.exports = kind({
	name: 'enyo.sample.ButtonSample',
	classes: 'button-sample',
	components: [
		{content: 'Buttons', classes: 'section'},
		{kind: Button, content: 'Action Button', ontap: 'buttonToggleTapped'},
		{kind: Button, name: 'toggleButton', disabled: true, content: 'Disabled Button', ontap: 'buttonTapped'},
		{content: 'Grouped Buttons', classes: 'section'},
		{kind: Group, onActivate: 'groupButtonsActivated', components: [
			{kind: Button, content: 'Grouped Button 1'},
			{kind: Button, content: 'Grouped Button 2'},
			{kind: Button, content: 'Grouped Button 3'}
		]},
		{content: 'Image Button', classes: 'section'},
		{kind: Button, content: 'Image Button', classes: 'image-button', ontap: 'buttonTapped', components: [
			{kind: EnyoImage, src: 'http://enyojs.com/img/enyo-logo.png', alt: 'Enyo Logo'}
		]},
		{name: 'results', classes: 'results'}
	],
	buttonTapped: function (sender, ev) {
		this.updateResult({content: 'The \'' + sender.getContent() + '\' button is tapped.'});
	},
	buttonToggleTapped: function (sender, ev) {
		this.buttonTapped(sender, ev);
		this.$.toggleButton.setDisabled(!this.$.toggleButton.getDisabled()).setContent(this.$.toggleButton.getDisabled() ? 'Disabled Button' : 'Enabled Button');
	},
	groupButtonsActivated: function (sender, ev) {
		if (ev.originator.getParent().getActive()) {
			this.updateResult({content: 'The \'' + ev.originator.getParent().getActive().getContent() + '\' button is selected.'});
		}
	},
	updateResult: function (comp) {
		this.$.results.destroyClientControls();
		this.$.results.createComponent(comp);
		this.$.results.render();
	}
});

}],'src/ComponentOverrideSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button');

var samplekind = kind({
	name: 'enyo.sample.SampleKind',
	components: [
		{name: 'title'},
		{name:'red', style:'background:red; color:white; padding:10px;', content:'Red', components: [
			{name:'orange', style:'background:orange; color:white; padding:10px;', content:'Orange', components: [
				{name:'green', style:'background:green; color:white; padding:10px; border-radius:10px;', content:'Green'}
			]}
		]},
		{name:'purple', style:'background:purple; color:white; padding:10px;', content:'Purple'},
		{name:'blue', style:'background:blue; color:white; padding:10px;', content:'Blue'}
	],
	create: function() {
		this.inherited(arguments);
		this.$.title.setContent(this.kindName);
	}
});

var subsamplekind = kind({
	name: 'enyo.sample.SubSampleKind',
	kind: samplekind,
	componentOverrides: {
		purple: {kind: Button, content:'Purple shmurple!', style:'border-radius:30px;'},
		green: {kind: Button, content:'Now I\'m a Pink button!', style:'background-color:pink;'}
	}
});

module.exports = kind({
	name: 'enyo.sample.ComponentOverrideSample',
	components: [
		{kind: samplekind},
		{style:'height:50px;'},
		{kind: subsamplekind},
		{style:'height:50px;'},
		{kind: samplekind}
	]
});

}],'src/GroupSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	Checkbox = require('enyo/Checkbox'),
	Control = require('enyo/Control'),
	Group = require('enyo/Group');

module.exports = kind({
	name: 'enyo.sample.GroupSample',
	classes: 'group-sample',
	kind: Control,
	components: [
		{content: 'Grouped Buttons', classes: 'section'},
		{kind: Group, onActiveChanged: 'handleActiveChanged', classes: 'grouping', components: [
			{kind: Button, content: 'Button 1'},
			{kind: Button, content: 'Button 2'},
			{kind: Button, content: 'Button 3'}
		]},
		{content: 'Grouped Checkboxes', classes: 'section'},
		{kind: Group, onActiveChanged: 'handleActiveChanged', classes: 'grouping', components: [
			{tag: 'label', components: [
				{kind: Checkbox, content: 'Checkbox 1'}
			]},
			{tag: 'label', components: [
				{kind: Checkbox, content: 'Checkbox 2'}
			]},
			{tag: 'label', components: [
				{kind: Checkbox, content: 'Checkbox 3'}
			]}
		]},
		{content: 'Named Grouped Buttons', classes: 'section'},
		{kind: Group, onActiveChanged: 'handleActiveChanged', classes: 'grouping', groupName: 'buttonGroup', components: [
			{kind: Button, content: 'Named Button 1', groupName: 'buttonGroup'},
			{kind: Button, content: 'Named Button 2 (excluded)'},
			{kind: Button, content: 'Named Button 3', groupName: 'buttonGroup'}
		]},
		{content: 'Multiple Active Grouped Checkboxes', classes: 'section'},
		{kind: Group, onActivate: 'handleActivate', classes: 'grouping', highlander: false, components: [
			{tag: 'label', components: [
				{kind: Checkbox, content: 'Multi Checkbox 1'}
			]},
			{tag: 'label', components: [
				{kind: Checkbox, content: 'Multi Checkbox 2'}
			]},
			{tag: 'label', components: [
				{kind: Checkbox, content: 'Multi Checkbox 3'}
			]}
		]},
		{content: 'Multiple Active Grouped Buttons', classes: 'section'},
		{kind: Group, onActivate: 'handleActivate', classes: 'grouping', highlander: false, components: [
			{kind: Button, content: 'Multi Button 1'},
			{kind: Button, content: 'Multi Button 2'},
			{kind: Button, content: 'Multi Button 3'}
		]},
		{name: 'results', classes: 'results'}
	],
	handleActiveChanged: function (sender, ev) {
		this.updateResults([
			{content: 'The \'' + ev.active.getContent() + '\' control is active.'}
		]);
		return true;
	},
	handleActivate: function (sender, ev) {
		if (ev.originator.getActive()) {
			this.updateResults([
				{content: 'The \'' + ev.originator.getContent() + '\' control is newly active in the group.'}
			]);
		}
		return true;
	},
	updateResults: function (comps) {
		this.$.results.destroyClientControls();
		this.$.results.createComponents(comps);
		this.$.results.render();
	}
});

}],'src/HoldSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	Control = require('enyo/Control'),
	TextArea = require('enyo/TextArea');

var h = {
	ontap: 'tapped',
	ondown: 'setConfig',
	onhold: 'held',
	onholdpulse: 'pulse',
	onrelease: 'released'
};

module.exports = kind({
	name: 'enyo.sample.HoldSample',
	kind: Control,
	components: [
		{tag: 'h2', content: 'Configuration'},
		{name: 'config', kind: TextArea, style: 'display: block; width: 100%; height: 25em;'},
		{tag: 'h2', content: 'Hold This...'},
		{name: 'aButton', mixins: [h], kind: Button, minWidth: false, content: 'Button A'},
		{tag: 'h2', content: 'Display'},
		{tag: 'ul', components: [
			{tag: 'li', name: 'd', allowHtml: true, idleContent: '<i>waiting for hold events...</i>'},
			{tag: 'li', name: 'd2', allowHtml: true, idleContent: '<i>waiting for pulse events...</i>'},
			{tag: 'li', name: 'd3', allowHtml: true, idleContent: '<i>waiting for other events...</i>'}
		]}
	],
	bindings: [
		{from: '$.config.value', to: 'config', transform: 'parseConfig'}
	],
	parseConfig: function (str) {
		var cfg;
		try {
			cfg = JSON.parse(str);
			this.setHandlers(cfg);
		} catch (e) {
			this.log('oops');
			cfg = this.config1;
		}
		return cfg;
	},
	setHandlers: function (cfg) {
		var evts = cfg.events,
			i,
			evt;
		if (evts) {
			for (i = 0; (evt = evts[i]) && evt; i++) {
				this.handlers['on' + evt.name] = 'held';
			}
		}
	},
	create: function () {
		this.inherited(arguments);
		['d', 'd2', 'd3'].forEach(this.bindSafely(function(d) {
			this.reset(d);
		}));
		this.$.config.set('value', JSON.stringify(this.config1, undefined, 2));
	},
	reset: function (display) {
		var d = this.$[display];
		d.set('content', d.get('idleContent'));
	},
	resetSoon: function (display) {
		this.startJob('reset_' + display, function() {
			this.reset(display);
		}, 2000);
	},
	report: function (actor, action, display) {
		this.$[display].setContent(actor.content + ': ' + action);
		this.resetSoon(display);
	},
	setConfig: function (sender, ev) {
		ev.configureHoldPulse(this.config);
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
	},
	config1: {
		frequency: 200,
		resume: true,
		endHold: 'onLeave',
		events: [
			{name: 'hold', time: 200},
			{name: 'longpress', time: 1000},
			{name: 'reallylongpress', time: 2000}
		]
	}
});

}],'src/InputSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	Control = require('enyo/Control'),
	Input = require('enyo/Input');

module.exports = kind({
	name: 'enyo.sample.InputSample',
	classes: 'input-sample',
	kind: Control,
	components: [
		{tag: 'label', content: 'Text Input', classes: 'section', attributes: [{'for': 'inputText'}]},
		{kind: Input, name: 'inputText', type: 'text', placeholder: 'Text', value: 'Initial Value', onchange: 'inputChanged', oninput: 'inputOccurred'},
		{tag: 'label', content: 'Select On Focus Input', classes: 'section', attributes: [{'for': 'inputSelectOnFocus'}]},
		{kind: Input, name: 'inputSelectOnFocus', type: 'text', placeholder: 'Select On Focus', value: 'This text will be selected when focused', selectOnFocus: true, onchange: 'inputChanged', oninput: 'inputOccurred'},
		{tag: 'label', content: 'Password Input', classes: 'section', attributes: [{'for': 'inputPassword'}]},
		{kind: Input, name: 'inputPassword', type: 'password', placeholder: 'Password', onchange: 'inputChanged', oninput: 'inputOccurred'},
		{tag: 'label', content: 'Email Input', classes: 'section', attributes: [{'for': 'inputEmail'}]},
		{kind: Input, name: 'inputEmail', type: 'email', placeholder: 'Email', onchange: 'inputChanged', oninput: 'inputOccurred'},
		{tag: 'label', content: 'Search Input', classes: 'section', attributes: [{'for': 'inputSearch'}]},
		{kind: Input, name: 'inputSearch', type: 'search', placeholder: 'Search', onchange: 'inputChanged', oninput: 'inputOccurred'},
		{tag: 'label', content: 'Number Input', classes: 'section', attributes: [{'for': 'inputNumber'}]},
		{kind: Input, name: 'inputNumber', type: 'number', placeholder: 'Number', onchange: 'inputChanged', oninput: 'inputOccurred'},
		{tag: 'label', content: 'Disabled Input', classes: 'section', attributes: [{'for': 'inputDisabled'}]},
		{kind: Input, name: 'inputDisabled', disabled: true, value: 'Disabled', onchange: 'inputChanged', oninput: 'inputOccurred'},
		{kind: Button, name: 'buttonInputToggle', ontap: 'buttonInputToggleTapped', content: 'Toggle Input State'},
		{name: 'results', classes: 'results'}
	],
	inputChanged: function (sender, ev) {
		this.$.results.setContent('The value of \'' + sender.getName() + '\' has been changed to: \'' + sender.getValue() + '\'.');
	},
	inputOccurred: function (sender, ev) {
		this.$.results.setContent('The current value of \'' + sender.getName() + '\' is: \'' + sender.getValue() + '\'.');
	},
	buttonInputToggleTapped: function (sender, ev) {
		this.$.inputDisabled.setDisabled(!this.$.inputDisabled.getDisabled()).setValue(this.$.inputDisabled.getDisabled() ? 'Disabled' : 'Enabled');
		this.$.results.setContent('The current state of \'inputDisabled\' is \'' + (this.$.inputDisabled.getDisabled() ? 'disabled' : 'enabled') + '\'.');
	}
});

}],'src/JsonpSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	Control = require('enyo/Control'),
	Input = require('enyo/Input'),
	JsonpRequest = require('enyo/Jsonp'),
	TextArea = require('enyo/TextArea');

module.exports = kind({
	name: 'enyo.sample.JsonpSample',
	kind: Control,
	classes: 'enyo-fit jsonp-sample',
	components: [
		{classes:'onyx-toolbar-inline', components: [
			{content: 'YQL: '},
			{kind: Input, name:'query', fit:true, value:'select * from weather.forecast where woeid in (select woeid from geo.places where text=\'san francisco, ca\')'},
			{kind: Button, content:'Fetch', ontap:'fetch'}
		]},
		{kind: TextArea, fit:true, classes:'jsonp-sample-source'}
	],
	fetch: function () {
		var jsonp = new JsonpRequest({
			url: 'http://query.yahooapis.com/v1/public/yql?format=json',
			callbackName: 'callback'
		});
		// send parameters the remote service using the 'go()' method
		jsonp.go({
			q: this.$.query.getValue()
		});
		// attach responders to the transaction object
		jsonp.response(this, 'processResponse');
	},
	processResponse: function (sender, res) {
		// do something with it
		this.$.textArea.setValue(JSON.stringify(res, null, 2));
	}
});

}],'src/LightPanelsSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	Checkbox = require('enyo/Checkbox'),
	Control = require('enyo/Control'),
	LightPanels = require('enyo/LightPanels'),
	Orientation = LightPanels.Orientation;

module.exports = kind({
	name: 'enyo.sample.LightPanelsSample',
	classes: 'light-panels-sample enyo-unselectable',
	kind: Control,
	components: [
		{classes: 'light-panels-options', components: [
			{classes: 'horizontal-options', components: [
				{kind: Checkbox, name: 'cachingHorizontal', content: 'Cache'},
				{kind: Checkbox, name: 'multipleHorizontal', content: 'Multi'},
				{kind: Checkbox, name: 'animateHorizontal', content: 'Ani'},
				{kind: Checkbox, name: 'popOnBackHorizontal', content: 'Pop'}
			]},
			{classes: 'vertical-options', components: [
				{kind: Checkbox, name: 'cachingVertical', content: 'Cache'},
				{kind: Checkbox, name: 'multipleVertical', content: 'Multi'},
				{kind: Checkbox, name: 'animateVertical', content: 'Ani'},
				{kind: Checkbox, name: 'popOnBackVertical', content: 'Pop'}
			]}
		]},
		{classes: 'light-panels-set', components: [
			{kind: LightPanels, name: 'lightHorizontal'},
			{kind: LightPanels, name: 'lightVertical', orientation: Orientation.VERTICAL}
		]}
	],
	bindings: [
		{from: '$.cachingHorizontal.checked', to: '$.lightHorizontal.cacheViews'},
		{from: '$.multipleHorizontal.checked', to: 'multipleHorizontal'},
		{from: '$.animateHorizontal.checked', to: '$.lightHorizontal.animate'},
		{from: '$.popOnBackHorizontal.checked', to: '$.lightHorizontal.popOnBack'},
		{from: '$.cachingVertical.checked', to: '$.lightVertical.cacheViews'},
		{from: '$.multipleVertical.checked', to: 'multipleVertical'},
		{from: '$.animateVertical.checked', to: '$.lightVertical.animate'},
		{from: '$.popOnBackVertical.checked', to: '$.lightVertical.popOnBack'}
	],
	rendered: kind.inherit(function (sup) {
		return function () {
			var startIndex = 0,
				infoHorizontal, infoVertical;

			sup.apply(this, arguments);

			infoHorizontal = this.generatePanelInfo(startIndex);
			infoVertical = this.generatePanelInfo(startIndex);

			this.$.lightHorizontal.createComponent(infoHorizontal, {owner: this});
			this.$.lightVertical.createComponent(infoVertical, {owner: this});

			this.$.lightHorizontal.set('index', startIndex);
			this.$.lightVertical.set('index', startIndex);
		};
	}),
	generatePanelInfo: function (id) {
		return {
			classes: 'light-panel',
			panelId: 'panel-' + id,
			style: 'background-color: ' + this.bgcolors[Math.floor(Math.random() * this.bgcolors.length)],
			components: [
				{content: id, classes: 'label'},
				{content: 'Prev', kind: Button, classes: 'previous', ontap: 'prevTapped'},
				{content: 'Next', kind: Button, classes: 'next', ontap: 'nextTapped'}
			]
		};
	},
	pushSinglePanel: function (panels) {
		var info = this.generatePanelInfo(panels.getPanels().length);
		panels.pushPanel(info, {owner: this});
	},
	pushMultiplePanels: function (panels) {
		var panelLength = panels.getPanels().length,
			info1 = this.generatePanelInfo(panelLength),
			info2 = this.generatePanelInfo(panelLength + 1),
			info3 = this.generatePanelInfo(panelLength + 2);

		panels.pushPanels([info1, info2, info3], {owner: this});
	},
	prevTapped: function (sender, ev) {
		var panels = ev.originator.isDescendantOf(this.$.lightHorizontal) ? this.$.lightHorizontal : this.$.lightVertical;
		panels.previous();
		return true;
	},
	nextTapped: function (sender, ev) {
		var panels = ev.originator.isDescendantOf(this.$.lightHorizontal) ? this.$.lightHorizontal : this.$.lightVertical;
		if ((panels.name == 'lightHorizontal' && this.multipleHorizontal) || (panels.name == 'lightVertical' && this.multipleVertical)) {
			this.pushMultiplePanels(panels);
		} else {
			this.pushSinglePanel(panels);
		}
		return true;
	},
	bgcolors: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
});

module.exports.badgeClasses = 'new wip';

}],'src/PopupSample':[function (module,exports,global,require,request){
/*
	Implementation notes:
	-	The Popup At Event Position popup has property floating:true to mitigate the sampler's
		horizontal scroll offset (the control that allows the side navigation to be dragged
		closed and open).
*/

var
	kind = require('enyo/kind'),
	job = require('enyo/job');

var
	Button = require('enyo/Button'),
	Control = require('enyo/Control'),
	Popup = require('enyo/Popup');

module.exports = kind({
	name: 'enyo.sample.PopupSample',
	kind: Control,
	classes: 'popup-sample',
	components: [
		{content: 'Popups', classes: 'section'},
		{kind: Button, name: 'buttonBasicAuto', content: 'Basic Popup (Auto Dismiss)', ontap: 'showPopup', popup: 'popupBasicAuto'},
		{kind: Popup, name: 'popupBasicAuto', classes: 'popup', content: 'Tap Outside Popup To Dismiss'},
		{classes: 'divider'},
		{kind: Button, name: 'buttonBasic', content: 'Basic Popup', ontap: 'showPopup', popup: 'popupBasic'},
		{kind: Popup, name: 'popupBasic', autoDismiss: false, classes: 'popup', content: 'Press Basic Popup Button To Dismiss (Tapping Outside Registers Event)'},
		{classes: 'divider'},
		{kind: Button, name: 'buttonModal', content: 'Modal Popup', ontap: 'showPopup', popup: 'popupModal'},
		{kind: Popup, name: 'popupModal', modal: true, autoDismiss: false, classes: 'popup', components: [
			{content: 'Modal Popup (Tapping Outside Does Not Register Event)'},
			{kind: Button, name: 'buttonCloseModal', content: 'Close', ontap: 'closeModal'}
		]},
		{classes: 'divider'},
		{kind: Button, name: 'buttonCentered', content: 'Centered Popup', ontap: 'showPopup', popup: 'popupCentered'},
		{kind: Popup, name: 'popupCentered', centered: true, classes: 'popup', content: 'Centered Popup'},
		{classes: 'divider'},
		{kind: Button, name: 'buttonScrim', content: 'Popup With Scrim', ontap: 'showPopup', popup: 'popupScrim'},
		{kind: Popup, name: 'popupScrim', centered: true, floating: true, scrim: true, classes: 'popup', content: 'Popup With Scrim'},
		{classes: 'divider'},
		{kind: Button, name: 'buttonAtEventPosition', content: 'Popup At Event Position', ontap: 'showPopupAtEventPosition', popup: 'popupEventPosition'},
		{kind: Popup, name: 'popupEventPosition', floating: true, classes: 'popup', content: 'Popup At Event Position'},
		{classes: 'divider'},
		{kind: Button, name: 'buttonAtPosition', content: 'Popup At Specific Position', ontap: 'showPopupAtPosition', popup: 'popupPosition'},
		{kind: Popup, name: 'popupPosition', classes: 'popup', content: 'Popup In Upper Right'},
		{classes: 'divider'},
		{kind: Button, name: 'buttonAutoHide', content: 'Auto Hide Popup', ontap: 'showPopupAutoHide', popup: 'popupAutoHide'},
		{kind: Popup, name: 'popupAutoHide', classes: 'popup', content: 'This Popup Will Disappear In 2s'},
		{classes: 'divider'},
		{kind: Button, name: 'buttonFloating', content: 'Floating Popup', ontap: 'showPopupFloating', popup: 'popupFloating'},
		{kind: Popup, name: 'popupFloating', floating: true, centered: true, classes: 'popup floating', content: 'This Popup Will Not Scroll', onHide: 'hideFloating'},
		{name: 'priority', classes: 'priority', showing: false, content: 'This Content Is Scrollable'},
		{name: 'results', classes: 'results'}
	],
	handlers: {
		ontap: 'tap'
	},
	tap: function (sender, ev) {
		this.$.results.destroyClientControls();
		this.$.results.createComponent({
			content: 'Event  \'' + ev.type + '\' from \'' + ev.originator.getName() + '\'.'
		});
		this.$.results.render();
	},
	closeModal: function (sender, ev) {
		this.$.popupModal.setShowing(false);
	},
	hideFloating: function (sender, ev) {
		this.$.priority.hide();
	},
	showPopup: function (sender, ev) {
		var p = this.$[sender.popup];
		if (p) {
			// toggle the visibility of the popup
			p.setShowing(!p.getShowing());
		}
	},
	showPopupAtEventPosition: function (sender, ev) {
		var p = this.$[sender.popup];
		if (p) {
			p.showAtEvent(ev);
		}
	},
	showPopupAtPosition: function (sender, ev) {
		var p = this.$[sender.popup];
		if (p) {
			p.showAtPosition({right: 0, top: 0});
		}
	},
	showPopupAutoHide: function (sender, ev) {
		var p = this.$[sender.popup];
		if (p) {
			p.setShowing(true);
			job('autoHidePopup', function() {
				p.hide();
			}, 2000);
		}
	},
	showPopupFloating: function (sender, ev) {
		this.$.priority.setShowing(true);
		var p = this.$[sender.popup];
		if (p) {
			p.showAtEvent(ev);
		}
	}
});

}],'src/RichTextSample':[function (module,exports,global,require,request){
/*
	Implementation notes:
	-	The RichText methods involving selection (HTML5 selection object) require
		that the RichText object have focus first.
*/

var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	Control = require('enyo/Control'),
	RichText = require('enyo/RichText');

module.exports = kind({
	name: 'enyo.sample.RichTextSample',
	classes: 'rich-text-sample',
	kind: Control,
	components: [
		{content: 'Rich Text', classes: 'section'},
		{kind: Button, ontap: 'buttonFormatTapped', action: 'bold', components: [
			{tag: 'strong', content: 'b'}
		]},
		{kind: Button, ontap: 'buttonFormatTapped', action: 'italic', components: [
			{tag: 'em', content: 'i'}
		]},
		{kind: Button, ontap: 'buttonFormatTapped', action: 'underline', components: [
			{tag: 'u', content: 'u'}
		]},
		{kind: Button, content: 'Select All', ontap: 'buttonSelectAllTapped'},
		{kind: Button, content: 'Deselect All', ontap: 'buttonDeselectAllTapped'},
		{kind: RichText, value: 'Input <em>any</em> text (HTML tags will be preserved)'},
		{kind: Button, content: 'Show RichText Value', classes: 'button-value', ontap: 'buttonValueTapped'},
		{name: 'results', classes: 'results'}
	],
	buttonSelectAllTapped: function (sender, ev) {
		this.$.richText.focus();
		this.$.richText.selectAll();
	},
	buttonDeselectAllTapped: function (sender, ev) {
		this.$.richText.focus();
		this.$.richText.removeSelection();
	},
	buttonFormatTapped: function (sender, ev) {
		this.$.richText.focus();
		document.execCommand(sender.action, false, this.$.richText.getSelection());
		this.$.richText.updateValue();
	},
	buttonValueTapped: function (sender, ev) {
		this.$.results.setContent(this.$.richText.getValue());
	}
});
}],'src/SelectSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	Control = require('enyo/Control'),
	OptionGroup = require('enyo/OptionGroup'),
	Select = require('enyo/Select');

module.exports = kind({
	name: 'enyo.sample.SelectSample',
	classes: 'select-sample',
	kind: Control,
	bindings: [
		{from: '$.selectTransitionTiming.selected', to: 'timingIndex'},
		{from: '$.selectTransitionTiming.value', to: 'timingValue'},
		{from: '$.selectTransitionDuration.selected', to: 'durationIndex'},
		{from: '$.selectTransitionDuration.value', to: 'durationValue'},
		{from: '$.selectColor.selected', to: 'colorIndex'},
		{from: '$.selectColor.value', to: 'colorValue'}
	],
	observers: {
		'logSelectChanged': ['timingIndex', 'timingValue', 'durationIndex', 'durationValue',
							'colorIndex', 'colorValue']
	},
	components: [
		{content: 'Transition Timing Function', classes: 'section'},
		{kind: Select, name: 'selectTransitionTiming', onchange: 'selectChanged', components: [
			{content: 'None', value: ''},
			{kind: OptionGroup, label: 'Easing', components: [
				{content: 'Ease-In', value: 'ease-in'},
				{content: 'Ease-Out', value: 'ease-out'},
				{content: 'Ease-In-Out', value: 'ease-in-out'}
			]},
			{kind: OptionGroup, label: 'Linear', components: [
				{content: 'Linear', value: 'linear'}
			]},
			{kind: OptionGroup, label: 'Cubic-Bezier', components: [
				{content: 'Cubic-Bezier(0.1, 0.7, 1.0, 0.1)', value: 'cubic-bezier(0.1, 0.7, 1.0, 0.1)'},
				{content: 'Cubic-Bezier(0.5, 0.1, 0.1, 1.0)', value: 'cubic-bezier(0.5, 0.1, 0.1, 1.0)'},
				{content: 'Cubic-Bezier(1.0, 0.7, 0.3, 0.5)', value: 'cubic-bezier(1.0, 0.7, 0.3, 0.5)'}
			]},
			{kind: OptionGroup, label: 'Step', components: [
				{content: 'Step-Start', value: 'step-start'},
				{content: 'Step-End', value: 'step-end'},
				{content: 'Steps(4, end)', value: 'steps(4, end)'}
			]}
		]},
		{content: 'Transition Duration', classes: 'section'},
		{kind: Select, name: 'selectTransitionDuration', onchange: 'selectChanged', components: [
			{content: '1s', value: '1s'},
			{content: '2s', value: '2s'},
			{content: '3s', value: '3s'},
			{content: '4s', value: '4s'},
			{content: '5s', value: '5s'},
			{content: '6s', value: '6s'},
			{content: '7s', value: '7s'},
			{content: '8s', value: '8s'},
			{content: '9s', value: '9s'},
			{content: '10s', value: '10s'}
		]},
		{content: 'Background Color', classes: 'section'},
		{kind: Select, name: 'selectColor', onchange: 'selectChanged', components: [
			{content: 'None', value: 'transparent'},
			{content: 'Red', value: 'red'},
			{content: 'Green', value: 'green'},
			{content: 'Blue', value: 'blue'},
			{content: 'Yellow', value: 'yellow'},
			{content: 'Purple', value: 'purple'},
			{content: 'Orange', value: 'orange'},
			{content: 'White', value: 'white'},
			{content: 'Gray', value: 'gray'},
			{content: 'Black', value: 'black'}
		]},
		{kind: Button, name: 'buttonApply', content: 'Change Background Color', classes: 'button-apply', ontap: 'buttonApplyTapped'},
		{name: 'results', classes: 'results'}
	],
	buttonApplyTapped: function (sender, ev) {
		this.$.results.destroyClientControls();
		this.applyStyle('transition-timing-function', this.$.selectTransitionTiming.getValue());
		this.applyStyle('transition-duration', this.$.selectTransitionDuration.getValue());
		this.applyStyle('background-color', this.$.selectColor.getValue());
		this.$.results.createComponents([
			{content: 'The \'transition-timing-function\' property has value \'' + this.$.selectTransitionTiming.getValue() + '\' applied.'},
			{content: 'The \'transition-duration\' property has value \'' + this.$.selectTransitionDuration.getValue() + '\' applied.'},
			{content: 'The \'background-color\' property has value \'' + this.$.selectColor.getValue() + '\' applied.'}
		]);
		this.$.results.render();
	},
	selectChanged: function (sender, ev) {
		this.$.results.setContent('The \'' + sender.getName() + '\' value is \'' + sender.getValue() + '\'.');
	},
	logSelectChanged: function (was, is, prop) {
		this.log(prop, 'was', was, 'and is now', is);
	}
});
}],'src/StylesheetSupportSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	StyleSheetSupport = require('enyo/StylesheetSupport'),
	TextArea  = require('enyo/TextArea');

module.exports = kind({
	name: 'enyo.sample.StylesheetSupportSample',
	classes: 'stylesheet-support-sample',
	components: [
		{content: 'Styled Container', classes: 'section'},
		{
			name: 'myContainer',
			classes: 'hipster-ipsum',
			mixins: [StyleSheetSupport],
			stylesheetContent: '.hipster-ipsum { background-color: #8563AC; }',
			content: 'Sustainable four loko whatever McSweeney\'s 3 wolf moon butcher. Gluten-free messenger bag fashion axe fixie. Selfies asymmetrical occupy, cardigan tousled flexitarian Portland bitters. Whatever before they sold out paleo locavore, Pitchfork beard YOLO deep v viral. Master cleanse synth flannel, post-ironic pour-over salvia occupy raw denim Williamsburg brunch yr vinyl. Tote bag YOLO fingerstache ethnic shabby chic yr, Portland church-key. Mixtape Odd Future 90\'s drinking vinegar, tote bag sartorial gentrify Schlitz post-ironic +1 sustainable cray tousled.\n\nFap aesthetic ethical authentic bicycle rights Pitchfork selvage jean shorts plaid deep v ugh cardigan. Portland Neutra cred, gluten-free meggings leggings Odd Future kitsch church-key. Art party scenester hoodie tote bag, Neutra vinyl vegan Tonx put a bird on it. Vegan Godard Vice mlkshk Schlitz Etsy Tonx, artisan Pitchfork drinking vinegar McSweeney\'s asymmetrical narwhal synth kale chips. Pop-up flexitarian jean shorts PBR&B, cardigan brunch lo-fi gentrify. Thundercats typewriter semiotics, viral gluten-free mlkshk hashtag lomo disrupt polaroid freegan locavore four loko. Fixie paleo tattooed swag tousled Helvetica Schlitz, roof party mixtape hashtag slow-carb bespoke.'
		},
		{content: 'Customize Style', classes: 'section'},
		{kind: TextArea, name: 'inputTextArea', type: 'text', placeholder: 'stylesheetContent Here - Write CSS as if you were working with a stylesheet file.'},
		{kind: Button, content: 'Erase Stylesheet Contents', ontap: 'clearStylesheet'}
	],
	bindings: [
		{from: '.$.inputTextArea.value', to: '.$.myContainer.stylesheetContent', oneWay: false}
	],
	create: function () {
		this.inherited(arguments);

		this.$.myContainer.addStylesheetContent('.hipster-ipsum { border-radius: 50%; overflow: hidden; }');

		this.$.inputTextArea.set('value', this.$.myContainer.get('stylesheetContent'));
	},
	clearStylesheet: function () {
		this.$.myContainer.set('stylesheetContent', '');
	}
});

module.exports.badgeClasses = 'new';

}],'src/TextAreaSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	TextArea = require('enyo/TextArea');

module.exports = kind({
	name: 'enyo.sample.TextAreaSample',
	classes: 'text-area-sample',
	components: [
		{tag: 'label', content: 'Text Area', classes: 'section', attributes: [{'for': 'inputTextArea'}]},
		{kind: TextArea, name: 'inputTextArea', type: 'text', placeholder: 'TextArea', value: 'Initial TextArea Value', onchange: 'inputChanged', oninput: 'inputOccurred'},
		{tag: 'label', content: 'Disabled Text Area', classes: 'section', attributes: [{'for': 'textAreaDisabled'}]},
		{kind: TextArea, name: 'textAreaDisabled', disabled: true, value: 'Disabled', onchange: 'inputChanged', oninput: 'inputOccurred'},
		{kind: Button, name: 'buttonTextAreaToggle', ontap: 'buttonTextAreaToggleTapped', content: 'Toggle Text Area State'},
		{name: 'results', classes: 'results'}
	],
	inputChanged: function (sender, ev) {
		this.$.results.setContent('The value of \'' + sender.getName() + '\' has been changed to: \'' + sender.getValue() + '\'.');
	},
	inputOccurred: function (sender, ev) {
		this.$.results.setContent('The current value of \'' + sender.getName() + '\' is: \'' + sender.getValue() + '\'.');
	},
	buttonTextAreaToggleTapped: function (sender, ev) {
		this.$.textAreaDisabled.setDisabled(!this.$.textAreaDisabled.getDisabled()).setValue(this.$.textAreaDisabled.getDisabled() ? 'Disabled' : 'Enabled');
		this.$.results.setContent('The current state of \'textAreaDisabled\' is \'' + (this.$.textAreaDisabled.getDisabled() ? 'disabled' : 'enabled') + '\'.');
	}
});
}],'src/VideoSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Anchor = require('enyo/Anchor'),
	Button = require('enyo/Button'),
	Video = require('enyo/Video');

var sources = [
	{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', type: 'video/mp4'},
	{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv', type: 'video/ogg'},
	{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm', type: 'video/webm'}
];

module.exports = kind({
	name: 'enyo.sample.VideoSample',
	classes: 'video-sample',
	components: [
		{content: 'Video', classes: 'section'},
		{classes: 'container-video', components: [
			{
				kind: Video,
				poster: 'http://media.w3.org/2010/05/bunny/poster.png',
				preload: 'auto',
				src: sources[0].src,
				onratechange: 'rateChanged',
				ontimeupdate: 'timeChanged',
				ondurationchange: 'durationChanged',
				onFastforward: 'playbackChanged',
				onRewind: 'playbackChanged',
				onPlay: 'playbackChanged',
				ontap: 'togglePlayback'
			},
			{kind: Anchor, name: 'playOverlay', ontap: 'playVideo'}
		]},
		{kind: Button, content: 'Play', ontap: 'playVideo'},
		{kind: Button, content: 'Pause', ontap: 'pauseVideo'},
		{kind: Button, content: '<< RW', ontap: 'buttonRewindTapped'},
		{kind: Button, content: 'FF >>', ontap: 'buttonFastForwardTapped'},
		{kind: Button, content: '< Jump', ontap: 'buttonJumpBackwardTapped'},
		{kind: Button, content: 'Jump >', ontap: 'buttonJumpForwardTapped'},
		{kind: Button, content: 'Loop', ontap: 'buttonToggleLoopTapped'},
		{kind: Button, content: 'Use src', ontap: 'buttonUseSrcTapped'},
		{kind: Button, content: 'Use sourceComponents', ontap: 'buttonUseSourceComponentsTapped'},
		{name: 'results', classes: 'results', components: [
			{classes: 'result-section', components: [
				{classes: 'result-label', content: 'Position:'},
				{name: 'videoPosition'}
			]},
			{classes: 'result-section', components: [
				{classes: 'result-label', content: 'Duration:'},
				{name: 'videoDuration'}
			]},
			{classes: 'result-section', components: [
				{classes: 'result-label', content: 'Action:'},
				{name: 'videoAction'}
			]}
		]}
	],
	bindings: [
		{from: '.isPlaying', to: '.$.playOverlay.showing', transform: function(value) {
			return !value;
		}}
	],
	playbackChanged: function (sender, ev) {
		if (ev.playbackRate > 1) {
			this.$.videoAction.setContent('Fast-Forward');
		} else if (ev.playbackRate < -1) {
			this.$.videoAction.setContent('Rewind');
		} else if (ev.playbackRate == 1) {
			this.$.videoAction.setContent('Play');
		}
		return true;
	},
	togglePlayback: function (sender, ev) {
		if (this.get('isPlaying')) {
			this.pauseVideo(arguments);
		} else {
			this.playVideo(arguments);
		}
		return true;
	},
	playVideo: function (sender, ev) {
		this.set('isPlaying', true);
		this.$.video.play();
		this.$.videoAction.setContent('Play');
		return true;
	},
	pauseVideo: function (sender, ev) {
		this.set('isPlaying', false);
		this.$.video.pause();
		this.$.videoAction.setContent('Pause');
		return true;
	},
	buttonRewindTapped: function(sender, ev) {
		this.set('isPlaying', true);
		this.$.video.rewind();
		return true;
	},
	buttonFastForwardTapped: function(sender, ev) {
		this.set('isPlaying', true);
		this.$.video.fastForward();
		return true;
	},
	buttonJumpBackwardTapped: function (sender, ev) {
		this.$.video.jumpBackward();
		this.$.videoAction.setContent('Jump Backward ' + this.$.video.getJumpSec() + 's');
		return true;
	},
	buttonJumpForwardTapped: function (sender, ev) {
		this.$.video.jumpForward();
		this.$.videoAction.setContent('Jump Forward ' + this.$.video.getJumpSec() + 's');
		return true;
	},
	buttonToggleLoopTapped: function (sender, ev) {
		this.$.video.setLoop(!this.$.video.getLoop());
		this.$.videoAction.setContent('Looping ' + (this.$.video.getLoop() ? 'Enabled' : 'Disabled'));
		return true;
	},
	buttonUseSrcTapped: function (sender, ev) {
		this.pauseVideo();
		this.$.video.set('src', sources[0].src);
	},
	buttonUseSourceComponentsTapped: function (sender, ev) {
		this.pauseVideo();
		this.$.video.set('sourceComponents', sources);
	},
	rateChanged: function (sender, ev) {
		this.$.videoAction.setContent('Playback ' + ev.playbackRate + 'x');
		return true;
	},
	timeChanged: function (sender, ev) {
		this.$.videoPosition.setContent(Math.floor(ev.currentTime) + 's');
		return true;
	},
	durationChanged: function (sender, ev) {
		this.$.videoDuration.setContent((ev.target && ev.target.duration ? Math.floor(ev.target.duration) : 0) + 's');
		return true;
	}
});

}],'src/WebServiceSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	Input = require('enyo/Input'),
	Popup = require('enyo/Popup'),
	Select = require('enyo/Select'),
	TextArea = require('enyo/TextArea'),
	WebService = require('enyo/WebService');

module.exports = kind({
	name: 'enyo.sample.WebServiceSample',
	classes: 'enyo-fit webservice-sample',
	components: [
		{kind: WebService, name:'yql', url: 'http://query.yahooapis.com/v1/public/yql?format=json', onResponse:'processResponse', onError: 'processError', callbackName: 'callback'},
		{classes:'onyx-toolbar-inline', components: [
			{content: 'YQL: '},
			{kind: Input, name:'query', fit:true, value:'select * from weather.forecast where woeid in (select woeid from geo.places where text=\'san francisco, ca\')'},
			{content:'Choose Scroller', style:'width:100px;'},
			{name: 'picker', kind: Select, components: [
				{content:'AJAX', active:true},
				{content:'JSON-P'}
			]},
			{kind: Button, content:'Fetch', ontap:'fetch'}
		]},
		{kind: TextArea, fit:true, classes:'webservice-sample-source'},
		{name: 'basicPopup', kind: Popup, centered: true, floating: true, classes:'onyx-sample-popup', style: 'padding: 10px;', content: 'Popup...'}
	],
	fetch: function () {
		// send parameters the remote service using the 'send()' method
		this.$.yql.send({
			q: this.$.query.getValue(),
			jsonp: (this.$.picker.getSelected()=='JSON-P')
		});
	},
	processResponse: function (sender, ev) {
		// do something with it
		this.$.textArea.setValue(JSON.stringify(ev.data, null, 2));
	},
	processError: function (sender, ev) {
		var errorLog = 'Error' + ': ' + ev.data + '! ' + (JSON.parse(ev.ajax.xhrResponse.body)).error.description;
		this.$.textArea.setValue(JSON.stringify(ev.ajax.xhrResponse, null, 2));
		this.$.basicPopup.setContent(errorLog);
		this.$.basicPopup.show();
	}
});
}],'src/SpriteAnimationSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	logger = require('enyo/logger');

var
	Select = require('enyo/Select'),
	SpriteAnimation = require('enyo/SpriteAnimation');

module.exports = kind({
	name: 'enyo.sample.SpriteAnimationSample',
	classes: 'sprite-animation-sample',
	handlers: {
		onSpriteAnimationEnds: 'animationEndHandler'
	},
	components: [
		{content: 'Sprite Animation (Horizontally Sprited)', classes: 'section'},
		{kind: SpriteAnimation, name: 'sprite1', classes: 'animation', src: 'http://www.polybeast.de/portfolio/SkybusterExplosion.jpg', width: 320, height: 240, rows: 5, columns: 4, duration: 2000},
		{kind: SpriteAnimation, name: 'sprite3', classes: 'animation', useCssAnimation: false, src: 'http://www.polybeast.de/portfolio/SkybusterExplosion.jpg', width: 320, height: 240, rows: 5, columns: 4, duration: 2000},
		{components: [
			{tag: 'label', content: 'Animation Duration:'},
			{kind: Select, name: 'sprite1Picker', onchange: 'select1Changed', components: [
				{content: '0.5s', value: 500},
				{content: '1s', value: 1000},
				{content: '2s', value: 2000, selected: true},
				{content: '3s', value: 3000},
				{content: '4s', value: 4000},
				{content: '5s', value: 5000},
				{content: '6s', value: 6000},
				{content: '7s', value: 7000},
				{content: '8s', value: 8000},
				{content: '9s', value: 9000},
				{content: '10s', value: 10000}
			]}
		]},
		{components: [
			{tag: 'label', content: ' Loop count:'},
			{kind: Select, name: 'iterationPicker', onchange: 'iterationChanged', components: [
				{content: 'Infinite', value: null},
				{content: '1', value: 1},
				{content: '2', value: 2},
				{content: '3', value: 3},
				{content: '4', value: 4},
				{content: '5', value: 5, selected: true},
				{content: '6', value: 6},
				{content: '7', value: 7},
				{content: '8', value: 8},
				{content: '9', value: 9},
				{content: '10', value: 10}
			]}
		]},
		{content: 'Sprite Animation (Vertically Sprited)', classes: 'section'},
		{kind: SpriteAnimation, name: 'sprite2', classes: 'animation', src: 'http://media.pyweek.org/dl/3/RoeBros/herring-sub.png', cellOrientation: 'vertical', width: 50, height: 50, rows: 3, columns: 16, duration: 6000},
		{kind: SpriteAnimation, name: 'sprite4', classes: 'animation', useCssAnimation: false, src: 'http://media.pyweek.org/dl/3/RoeBros/herring-sub.png', cellOrientation: 'vertical', width: 50, height: 50, rows: 3, columns: 16, duration: 6000},
		{components: [
			{tag: 'label', content: 'Animation Duration:'},
			{kind: Select, name: 'sprite2Picker', onchange: 'select2Changed', components: [
				{content: '0.5s', value: 500},
				{content: '1s', value: 1000},
				{content: '2s', value: 2000},
				{content: '3s', value: 3000},
				{content: '4s', value: 4000},
				{content: '5s', value: 5000},
				{content: '6s', value: 6000, selected: true},
				{content: '7s', value: 7000},
				{content: '8s', value: 8000},
				{content: '9s', value: 9000},
				{content: '10s', value: 10000}
			]}
		]}
	],
	bindings: [
		{from: '$.sprite1Picker.value', to: '$.sprite1.duration'},
		{from: '$.sprite1Picker.value', to: '$.sprite3.duration'},
		{from: '$.sprite2Picker.value', to: '$.sprite2.duration'},
		{from: '$.sprite2Picker.value', to: '$.sprite4.duration'},
		{from: '$.iterationPicker.value', to: '$.sprite3.iterationCount'},
		{from: '$.iterationPicker.value', to: '$.sprite1.iterationCount'}
	],
	animationEndHandler: function (sender, ev) {
		logger.log('onEnd', sender.id, sender.useCssAnimation, sender.iterationCount);
	}
});

module.exports.badgeClasses = 'new';

}],'src/TableSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	Table = require('enyo/Table');

module.exports = kind({
	name: 'enyo.sample.TableSample',
	classes: 'table-sample enyo-fit',
	components: [
		{name: 'month', classes: 'section'},
		{kind: Table, components: [
			{classes: 'header', components: [
				{content: 'Sun'},
				{content: 'Mon'},
				{content: 'Tue'},
				{content: 'Wed'},
				{content: 'Thu'},
				{content: 'Fri'},
				{content: 'Sat'}
			]}
		]}
	],
	monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	create: function () {
		this.inherited(arguments);

		var currentRow,
			dateObj = new Date();

		// calculate current date
		var currentDate = dateObj.getDate();

		// calculate date of first day of the month
		dateObj.setDate(1);
		var offset = dateObj.getDay();

		// calculate date of last day of the month
		var lastDate = this.getDaysInMonth(dateObj.getMonth(), dateObj.getYear());

		// this calculation can probably be simplified, but allows for padding blank spaces in
		// the calendar to display a 'full' table
		for (var i=0; i<lastDate+offset+(((lastDate+offset)%7)?7-((lastDate+offset)%7):0); i++) {
			if (i%7 === 0) {
				currentRow = this.$.table.createComponent({});
			}
			if (i<offset || i>=lastDate+offset) {
				currentRow.createComponent({});
			} else {
				var cellDay = {content: (i-offset+1)};
				if ((i-offset+1) === currentDate) {
					cellDay = utils.mixin(cellDay, {classes: 'current'});
				}
				currentRow.createComponent(cellDay);
			}
		}

		// set month display
		this.$.month.setContent(this.monthNames[dateObj.getMonth()] + ' ' + dateObj.getFullYear());
	},
	// adapted from http://stackoverflow.com/questions/1810984/number-of-days-in-any-month
	getDaysInMonth: function (m, y) {
		return (/8|3|5|10/).test(m)?30:m==1?((y%4===0)&&y%100)||(y%400===0)?29:28:31;
	}
});
}],'src/FullscreenSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	Scroller = require('enyo/Scroller');

module.exports = kind({
	name: 'enyo.sample.FullscreenSample',
	classes: 'fullscreen-sample enyo-fit enyo-unselectable',
	components: [
		{name: 'sampleContent', classes: 'fullscreen-sample-container', components: [
			{content: 'Fullscreen Sample'},
			{kind: Scroller, classes: 'fullscreen-sample-scroller', components: [
				{content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'}
			]},
			{kind: Button, content: 'Toggle Fullscreen', ontap: 'toggleFullscreen'}
		]}
	],
	//* Set/unset _this.$.sampleContent_ as fullscreen control
	toggleFullscreen: function (sender, ev) {
		var targetControl = this.$.sampleContent;

		// If _targetControl_ is currently fullscreen, cancel fullscreen
		if (targetControl.isFullscreen()) {
			targetControl.cancelFullscreen();

		// If _targetControl_ is not currently fullscreen, request fullscreen
		} else {
			targetControl.requestFullscreen();
		}
	}
});

}],'src/ScrollerSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Control = require('enyo/Control'),
	Scroller = require('enyo/Scroller'),
	Select = require('enyo/Select'),
	TranslateScrollStrategy = require('enyo/TranslateScrollStrategy'),
	TransitionScrollStrategy = require('enyo/TransitionScrollStrategy'),
	TouchScrollStrategy = require('enyo/TouchScrollStrategy');

var text =  'Foo<br>Bar<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>Boom boom pow<br>' +
			'Foo<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>Boom boom pow. Boom boom pow. ' +
			'Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. ' +
			'Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. ' +
			'Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. <br>Foo<br>Bar<br>Bar<br>' +
			'Boom boom pow<br>Foo<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>Boom boom pow<br>' +
			'Foo<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. ' +
			'Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. ' +
			'Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. ' +
			'Boom boom pow. Boom boom pow. Boom boom pow. <br>Foo<br>Bar<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>' +
			'Boom boom pow<br>Foo<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>Boom boom pow<br>' +
			'Foo<br>Bar<br>Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. ' +
			'Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. ' +
			'Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. ' +
			'Boom boom pow. <br>Foo<br>Bar<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>' +
			'Boom boom pow<br>Foo<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>Boom boom pow<br>Foo<br>Bar<br>Boom boom pow. ' +
			'Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. ' +
			'Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. ' +
			'Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. Boom boom pow. <br>';

module.exports = kind({
	name: 'enyo.sample.ScrollerSample',
	kind: Control,
	classes: 'enyo-fit enyo-unselectable',
	components: [
		{classes: 'scroller-sample-menu', components: [
			{content: 'Choose Scroller', style: 'width: 250px;'},
			{kind: Select, floating: true, maxHeight: 300, onchange: 'sampleChanged', components: [
				{value: '_default', content: 'Default scroller', active: true},
				{value: '_force', content: 'Force touch scroller'},
				{value: '_horizontal', content: 'Horizontal only'},
				{value: '_vertical', content: 'Vertical only'},
				{value: '_touchscroll', content: 'Force TouchScrollStrategy'},
				{value: '_transitionscroll', content: 'Force TransitionScrollStrategy'},
				{value: '_translatescroll', content: 'Force TranslateScrollStrategy'}
			]}
		]},
		{name: 'default', kind: Scroller, classes: 'scroller-sample-scroller', components: [
			{classes: 'scroller-sample-content', content: text, allowHtml: true}
		]},
		// Forces touch scrolling, even on desktop
		{name: 'force', kind: Scroller, touch: true, classes: 'scroller-sample-scroller', components: [
			{classes: 'scroller-sample-content', content: text, allowHtml: true}
		]},
		// Horizontal-only scrolling
		{name: 'horizontal', kind: Scroller, vertical: 'hidden', classes: 'scroller-sample-scroller', components: [
			{classes: 'scroller-sample-content', content: text, allowHtml: true}
		]},
		// Vertical-only scrolling
		{name: 'vertical', kind: Scroller, horizontal: 'hidden', classes: 'scroller-sample-scroller', onmousedown: 'mouseDown', ondragstart: 'dragStart', components: [
			{classes: 'scroller-sample-content', content: text, allowHtml: true}
		]},
		// Force specific strategies
		{name: 'touchscroll', kind: Scroller, classes: 'scroller-sample-scroller', strategyKind: TouchScrollStrategy, components: [
			{classes: 'scroller-sample-content', content: text, allowHtml: true}
		]},
		{name: 'transitionscroll', kind: Scroller, classes: 'scroller-sample-scroller', strategyKind: TransitionScrollStrategy, components: [
			{classes: 'scroller-sample-content', content: text, allowHtml: true}
		]},
		{name: 'translatescroll', kind: Scroller, classes: 'scroller-sample-scroller', strategyKind: TranslateScrollStrategy, components: [
			{classes: 'scroller-sample-content', content: text, allowHtml: true}
		]}
	],
	create: function () {
		this.inherited(arguments);

		//hide other scrollers
		this.$.force.hide();
		this.$.horizontal.hide();
		this.$.vertical.hide();
		this.$.touchscroll.hide();
		this.$.transitionscroll.hide();
		this.$.translatescroll.hide();
		this.lastScroller = 'default';
	},
	sampleChanged: function (sender, ev) {
		var lastScroller = this.lastScroller;
		var scrollerName = sender.getValue().substr(1);
		this.$[scrollerName].show();
		this.$[lastScroller].hide();
		this.lastScroller = scrollerName;
	},
	// The following are used when this sample is called from the Sampler app
	mouseDown: function (sender, ev) {
		ev.preventDefault();
	},
	dragStart: function (sender, ev) {
		if (ev.horizontal) {
			// Prevent drag propagation on horizontal drag events
			return true;
		}
	}
});
}],'src/ShowingTransitionSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	Img = require('enyo/Image');

var
	Scroller = require('enyo/Scroller'),
	Button = require('enyo/Button'),
	ShowingTransitionSupport = require('enyo/ShowingTransitionSupport');

var Pane = kind({
	name: 'Pane',
	classes: 'pane',
	showingDuration: 1000,
	hidingDuration: 500,
	shownMethod: 'paneIsShown',
	hiddenMethod: 'paneIsHidden',
	mixins: [ ShowingTransitionSupport ],
	components: [
		{name: 'client', classes: 'glass'}
	]
});

var PopupMockup = kind({
	name: 'PopupMockup',
	classes: 'popup-mockup',
	showingDuration: 500,
	hidingDuration: 500,
	showing: false,
	showingClass: 'shown',
	shownClass: 'shown',
	hiddenMethod: 'popupIsHidden',
	mixins: [ ShowingTransitionSupport ],
	popupIsHidden: function () {
		console.log('Popup finished hidden!');
	}
});

module.exports = kind({
	name: 'enyo.sample.ShowingTransitionSample',
	classes: 'enyo-unselectable enyo-fit showing-transition-sample',
	components: [
		{kind: Scroller, classes: 'enyo-fill', components: [
			{tag: 'h1', content: 'Showing Transitions'},
			{components: [
				{kind: Button, content: 'Toggle Pane', ontap: 'togglePane'},
				{kind: Button, content: 'Toggle Popup', ontap: 'togglePopup'}
			]},
			{components: [
				{name: 'pane', kind: Pane, components: [{content: 'This card has different out and in transitions.'}]}
			]},
			{name: 'results', classes: 'results'}
		]},
		{name: 'popup', kind: PopupMockup, shownMethod: 'popupIsShown', components: [
			{tag: 'h1', content: 'Commence the jiggling!'},
			{kind: Img, src: 'http://static.fjcdn.com/gifs/Shake+it_945873_5126044.gif'}
		]}
	],
	togglePane: function (sender, ev) {
		this.$.pane.set('showing', !this.$.pane.get('showing'));
	},
	togglePopup: function (sender, ev) {
		this.$.results.set('content', 'Popup started ' + (!this.$.popup.get('showing') ? 'showing' : 'hiding') + '.');
		this.$.popup.set('showing', !this.$.popup.get('showing'));
	},
	popupIsShown: function () {
		this.$.results.set('content', 'Popup finished showing.');
	}
});

module.exports.badgeClasses = 'new wip';

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

},{'../Link':'../strawman/Link'}],'src/DataListSample':[function (module,exports,global,require,request){
var 
	kind = require('enyo/kind');

var 
	Collection = require('enyo/Collection'),
	Control = require('enyo/Control'),
	DataList = require('enyo/DataList');

var data = [
	{ classes: 'repeater-item class1', firstName: 'Alejandra', lastName: 'Walsh' },
	{ classes: 'repeater-item class2', firstName: 'Marquez', lastName: 'James' },
	{ classes: 'repeater-item class3', firstName: 'Barr', lastName: 'Lott' },
	{ classes: 'repeater-item class4', firstName: 'Everett', lastName: 'Maddox' },
	{ classes: 'repeater-item class5', firstName: 'Crane', lastName: 'Bryant' },
	{ classes: 'repeater-item class1', firstName: 'Raymond', lastName: 'Faulkner' },
	{ classes: 'repeater-item class2', firstName: 'Petersen', lastName: 'Murray' },
	{ classes: 'repeater-item class3', firstName: 'Kristina', lastName: 'Porter' },
	{ classes: 'repeater-item class4', firstName: 'Barbra', lastName: 'Barrett' },
	{ classes: 'repeater-item class5', firstName: 'Tracey', lastName: 'Melton' },
	{ classes: 'repeater-item class1', firstName: 'Effie', lastName: 'Pierce' },
	{ classes: 'repeater-item class2', firstName: 'Webb', lastName: 'Sloan' },
	{ classes: 'repeater-item class3', firstName: 'Diana', lastName: 'Castaneda' },
	{ classes: 'repeater-item class4', firstName: 'Gaines', lastName: 'Hampton' },
	{ classes: 'repeater-item class5', firstName: 'Ebony', lastName: 'Stanley' },
	{ classes: 'repeater-item class1', firstName: 'Anne', lastName: 'Moses' },
	{ classes: 'repeater-item class2', firstName: 'Mercer', lastName: 'Skinner' },
	{ classes: 'repeater-item class3', firstName: 'Williams', lastName: 'Booker' },
	{ classes: 'repeater-item class4', firstName: 'Pearson', lastName: 'Blevins' },
	{ classes: 'repeater-item class5', firstName: 'Pearl', lastName: 'Mcknight' },
	{ classes: 'repeater-item class1', firstName: 'Mcconnell', lastName: 'Jenkins' },
	{ classes: 'repeater-item class2', firstName: 'Ava', lastName: 'Deleon' },
	{ classes: 'repeater-item class3', firstName: 'Emily', lastName: 'Goodwin' },
	{ classes: 'repeater-item class4', firstName: 'Richmond', lastName: 'Hess' },
	{ classes: 'repeater-item class5', firstName: 'Pitts', lastName: 'Osborn' },
	{ classes: 'repeater-item class1', firstName: 'Lela', lastName: 'Page' },
	{ classes: 'repeater-item class2', firstName: 'Carmen', lastName: 'Maxwell' },
	{ classes: 'repeater-item class3', firstName: 'Dana', lastName: 'Thompson' },
	{ classes: 'repeater-item class4', firstName: 'Dominique', lastName: 'Jensen' },
	{ classes: 'repeater-item class5', firstName: 'Freda', lastName: 'Short' },
	{ classes: 'repeater-item class1', firstName: 'Cynthia', lastName: 'Bass' },
	{ classes: 'repeater-item class2', firstName: 'Laurie', lastName: 'Kim' },
	{ classes: 'repeater-item class3', firstName: 'Suarez', lastName: 'Jarvis' },
	{ classes: 'repeater-item class4', firstName: 'Esperanza', lastName: 'Camacho' },
	{ classes: 'repeater-item class5', firstName: 'Rachelle', lastName: 'Lynch' },
	{ classes: 'repeater-item class1', firstName: 'Sonja', lastName: 'Lowery' },
	{ classes: 'repeater-item class2', firstName: 'Nelda', lastName: 'Benton' },
	{ classes: 'repeater-item class3', firstName: 'Bernadine', lastName: 'Pratt' },
	{ classes: 'repeater-item class4', firstName: 'Welch', lastName: 'Russo' },
	{ classes: 'repeater-item class5', firstName: 'Eileen', lastName: 'Mays' },
	{ classes: 'repeater-item class1', firstName: 'Nell', lastName: 'Conner' },
	{ classes: 'repeater-item class2', firstName: 'Carolina', lastName: 'Hodges' },
	{ classes: 'repeater-item class3', firstName: 'Polly', lastName: 'Mueller' },
	{ classes: 'repeater-item class4', firstName: 'Jimenez', lastName: 'Goodman' },
	{ classes: 'repeater-item class5', firstName: 'Fowler', lastName: 'Haley' },
	{ classes: 'repeater-item class1', firstName: 'Rios', lastName: 'Watson' },
	{ classes: 'repeater-item class2', firstName: 'Kidd', lastName: 'Mcmahon' },
	{ classes: 'repeater-item class3', firstName: 'Audrey', lastName: 'Buchanan' },
	{ classes: 'repeater-item class4', firstName: 'Mcdonald', lastName: 'Miles' },
	{ classes: 'repeater-item class5', firstName: 'Marcia', lastName: 'Collins' },
	{ classes: 'repeater-item class1', firstName: 'Mason', lastName: 'Owens' },
	{ classes: 'repeater-item class2', firstName: 'Hopper', lastName: 'Hanson' },
	{ classes: 'repeater-item class3', firstName: 'Good', lastName: 'Jacobs' },
	{ classes: 'repeater-item class4', firstName: 'Bryan', lastName: 'Francis' },
	{ classes: 'repeater-item class5', firstName: 'Chris', lastName: 'Payne' },
	{ classes: 'repeater-item class1', firstName: 'Russo', lastName: 'Burgess' },
	{ classes: 'repeater-item class2', firstName: 'Carla', lastName: 'Burke' },
	{ classes: 'repeater-item class3', firstName: 'Herman', lastName: 'Stephenson' },
	{ classes: 'repeater-item class4', firstName: 'Garrison', lastName: 'Santana' },
	{ classes: 'repeater-item class5', firstName: 'Freida', lastName: 'Stevenson' },
	{ classes: 'repeater-item class1', firstName: 'Macias', lastName: 'Bright' },
	{ classes: 'repeater-item class2', firstName: 'Wiley', lastName: 'Simon' },
	{ classes: 'repeater-item class3', firstName: 'Cook', lastName: 'Farmer' },
	{ classes: 'repeater-item class4', firstName: 'Baldwin', lastName: 'Burch' },
	{ classes: 'repeater-item class5', firstName: 'Sabrina', lastName: 'Schwartz' },
	{ classes: 'repeater-item class1', firstName: 'Hudson', lastName: 'Medina' },
	{ classes: 'repeater-item class2', firstName: 'Jodi', lastName: 'Wells' },
	{ classes: 'repeater-item class3', firstName: 'Curry', lastName: 'Oneil' },
	{ classes: 'repeater-item class4', firstName: 'Mejia', lastName: 'Mcneil' },
	{ classes: 'repeater-item class5', firstName: 'Carrie', lastName: 'Rivas' },
	{ classes: 'repeater-item class1', firstName: 'Lowery', lastName: 'Murphy' },
	{ classes: 'repeater-item class2', firstName: 'Pace', lastName: 'Rivera' },
	{ classes: 'repeater-item class3', firstName: 'Gonzales', lastName: 'Ramos' },
	{ classes: 'repeater-item class4', firstName: 'Irwin', lastName: 'Rivers' },
	{ classes: 'repeater-item class5', firstName: 'Angelique', lastName: 'Hardy' },
	{ classes: 'repeater-item class1', firstName: 'Branch', lastName: 'Little' },
	{ classes: 'repeater-item class2', firstName: 'Yang', lastName: 'Case' },
	{ classes: 'repeater-item class3', firstName: 'Douglas', lastName: 'Marsh' },
	{ classes: 'repeater-item class4', firstName: 'Velma', lastName: 'Joyner' },
	{ classes: 'repeater-item class5', firstName: 'Susanna', lastName: 'Park' },
	{ classes: 'repeater-item class1', firstName: 'Billie', lastName: 'Kirk' },
	{ classes: 'repeater-item class2', firstName: 'Melendez', lastName: 'Fischer' },
	{ classes: 'repeater-item class3', firstName: 'Summer', lastName: 'Reeves' },
	{ classes: 'repeater-item class4', firstName: 'Contreras', lastName: 'Bradley' },
	{ classes: 'repeater-item class5', firstName: 'Taylor', lastName: 'Miller' },
	{ classes: 'repeater-item class1', firstName: 'Hopkins', lastName: 'Aguilar' },
	{ classes: 'repeater-item class2', firstName: 'Cleo', lastName: 'Sullivan' },
	{ classes: 'repeater-item class3', firstName: 'Vazquez', lastName: 'Flowers' },
	{ classes: 'repeater-item class4', firstName: 'Gibson', lastName: 'Gilliam' },
	{ classes: 'repeater-item class5', firstName: 'Zimmerman', lastName: 'Riggs' },
	{ classes: 'repeater-item class1', firstName: 'Mcintyre', lastName: 'Mcgee' },
	{ classes: 'repeater-item class2', firstName: 'Hall', lastName: 'Caldwell' },
	{ classes: 'repeater-item class3', firstName: 'Felicia', lastName: 'Fitzpatrick' },
	{ classes: 'repeater-item class4', firstName: 'Delgado', lastName: 'Cole' },
	{ classes: 'repeater-item class5', firstName: 'Burns', lastName: 'Summers' },
	{ classes: 'repeater-item class1', firstName: 'Durham', lastName: 'Dickerson' },
	{ classes: 'repeater-item class2', firstName: 'Lavonne', lastName: 'Robles' },
	{ classes: 'repeater-item class3', firstName: 'Roberts', lastName: 'Adams' },
	{ classes: 'repeater-item class4', firstName: 'Ayala', lastName: 'Lawson' },
	{ classes: 'repeater-item class5', firstName: 'Lori', lastName: 'Nolan' }
];

module.exports = kind({
	name: 'enyo.sample.DataListSample',
	kind: Control,
	classes: 'data-list-sample data-repeater-sample enyo-fit',
	components: [
		{name: 'repeater', kind: DataList, components: [
			{components: [
				{classes: 'name-wrapper', components: [
					{name: 'firstName', classes: 'name', tag: 'span'},
					{name: 'lastName', classes: 'name last', tag: 'span'},
					{name: 'lastNameLetter', classes: 'name last-letter', tag: 'span'}
				]}
			], bindings: [
				{from: '.model.firstName', to: '.$.firstName.content'},
				{from: '.model.lastName', to: '.$.lastName.content'},
				{from: '.model.lastName', to: '.$.lastNameLetter.content', transform: function (v) { return v && v.charAt(0); }},
				{from: '.model.classes', to: '.classes'}
			]}
		]}
	],
	bindings: [
		{from: '.collection', to: '.$.repeater.collection'}
	],
	populateList: function () {
		this.collection = new Collection(data);
	},
	create: kind.inherit(function (sup) {
		return function () {
			this.populateList();
			sup.apply(this, arguments);
		};
	})
});

module.exports.data = data;
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

},{'../Link':'../strawman/Link','../List':'../strawman/List','../Title':'../strawman/Title','../AppRouter':'../strawman/AppRouter'}],'src/DataGridListSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Collection = require('enyo/Collection'),
	DataGridList = require('enyo/DataGridList');

var data = [
	{ classes: 'repeater-item class1 item', firstName: 'Alejandra', lastName: 'Walsh' },
	{ classes: 'repeater-item class2 item', firstName: 'Marquez', lastName: 'James' },
	{ classes: 'repeater-item class3 item', firstName: 'Barr', lastName: 'Lott' },
	{ classes: 'repeater-item class4 item', firstName: 'Everett', lastName: 'Maddox' },
	{ classes: 'repeater-item class5 item', firstName: 'Crane', lastName: 'Bryant' },
	{ classes: 'repeater-item class1 item', firstName: 'Raymond', lastName: 'Faulkner' },
	{ classes: 'repeater-item class2 item', firstName: 'Petersen', lastName: 'Murray' },
	{ classes: 'repeater-item class3 item', firstName: 'Kristina', lastName: 'Porter' },
	{ classes: 'repeater-item class4 item', firstName: 'Barbra', lastName: 'Barrett' },
	{ classes: 'repeater-item class5 item', firstName: 'Tracey', lastName: 'Melton' },
	{ classes: 'repeater-item class1 item', firstName: 'Effie', lastName: 'Pierce' },
	{ classes: 'repeater-item class2 item', firstName: 'Webb', lastName: 'Sloan' },
	{ classes: 'repeater-item class3 item', firstName: 'Diana', lastName: 'Castaneda' },
	{ classes: 'repeater-item class4 item', firstName: 'Gaines', lastName: 'Hampton' },
	{ classes: 'repeater-item class5 item', firstName: 'Ebony', lastName: 'Stanley' },
	{ classes: 'repeater-item class1 item', firstName: 'Anne', lastName: 'Moses' },
	{ classes: 'repeater-item class2 item', firstName: 'Mercer', lastName: 'Skinner' },
	{ classes: 'repeater-item class3 item', firstName: 'Williams', lastName: 'Booker' },
	{ classes: 'repeater-item class4 item', firstName: 'Pearson', lastName: 'Blevins' },
	{ classes: 'repeater-item class5 item', firstName: 'Pearl', lastName: 'Mcknight' },
	{ classes: 'repeater-item class1 item', firstName: 'Mcconnell', lastName: 'Jenkins' },
	{ classes: 'repeater-item class2 item', firstName: 'Ava', lastName: 'Deleon' },
	{ classes: 'repeater-item class3 item', firstName: 'Emily', lastName: 'Goodwin' },
	{ classes: 'repeater-item class4 item', firstName: 'Richmond', lastName: 'Hess' },
	{ classes: 'repeater-item class5 item', firstName: 'Pitts', lastName: 'Osborn' },
	{ classes: 'repeater-item class1 item', firstName: 'Lela', lastName: 'Page' },
	{ classes: 'repeater-item class2 item', firstName: 'Carmen', lastName: 'Maxwell' },
	{ classes: 'repeater-item class3 item', firstName: 'Dana', lastName: 'Thompson' },
	{ classes: 'repeater-item class4 item', firstName: 'Dominique', lastName: 'Jensen' },
	{ classes: 'repeater-item class5 item', firstName: 'Freda', lastName: 'Short' },
	{ classes: 'repeater-item class1 item', firstName: 'Cynthia', lastName: 'Bass' },
	{ classes: 'repeater-item class2 item', firstName: 'Laurie', lastName: 'Kim' },
	{ classes: 'repeater-item class3 item', firstName: 'Suarez', lastName: 'Jarvis' },
	{ classes: 'repeater-item class4 item', firstName: 'Esperanza', lastName: 'Camacho' },
	{ classes: 'repeater-item class5 item', firstName: 'Rachelle', lastName: 'Lynch' },
	{ classes: 'repeater-item class1 item', firstName: 'Sonja', lastName: 'Lowery' },
	{ classes: 'repeater-item class2 item', firstName: 'Nelda', lastName: 'Benton' },
	{ classes: 'repeater-item class3 item', firstName: 'Bernadine', lastName: 'Pratt' },
	{ classes: 'repeater-item class4 item', firstName: 'Welch', lastName: 'Russo' },
	{ classes: 'repeater-item class5 item', firstName: 'Eileen', lastName: 'Mays' },
	{ classes: 'repeater-item class1 item', firstName: 'Nell', lastName: 'Conner' },
	{ classes: 'repeater-item class2 item', firstName: 'Carolina', lastName: 'Hodges' },
	{ classes: 'repeater-item class3 item', firstName: 'Polly', lastName: 'Mueller' },
	{ classes: 'repeater-item class4 item', firstName: 'Jimenez', lastName: 'Goodman' },
	{ classes: 'repeater-item class5 item', firstName: 'Fowler', lastName: 'Haley' },
	{ classes: 'repeater-item class1 item', firstName: 'Rios', lastName: 'Watson' },
	{ classes: 'repeater-item class2 item', firstName: 'Kidd', lastName: 'Mcmahon' },
	{ classes: 'repeater-item class3 item', firstName: 'Audrey', lastName: 'Buchanan' },
	{ classes: 'repeater-item class4 item', firstName: 'Mcdonald', lastName: 'Miles' },
	{ classes: 'repeater-item class5 item', firstName: 'Marcia', lastName: 'Collins' },
	{ classes: 'repeater-item class1 item', firstName: 'Mason', lastName: 'Owens' },
	{ classes: 'repeater-item class2 item', firstName: 'Hopper', lastName: 'Hanson' },
	{ classes: 'repeater-item class3 item', firstName: 'Good', lastName: 'Jacobs' },
	{ classes: 'repeater-item class4 item', firstName: 'Bryan', lastName: 'Francis' },
	{ classes: 'repeater-item class5 item', firstName: 'Chris', lastName: 'Payne' },
	{ classes: 'repeater-item class1 item', firstName: 'Russo', lastName: 'Burgess' },
	{ classes: 'repeater-item class2 item', firstName: 'Carla', lastName: 'Burke' },
	{ classes: 'repeater-item class3 item', firstName: 'Herman', lastName: 'Stephenson' },
	{ classes: 'repeater-item class4 item', firstName: 'Garrison', lastName: 'Santana' },
	{ classes: 'repeater-item class5 item', firstName: 'Freida', lastName: 'Stevenson' },
	{ classes: 'repeater-item class1 item', firstName: 'Macias', lastName: 'Bright' },
	{ classes: 'repeater-item class2 item', firstName: 'Wiley', lastName: 'Simon' },
	{ classes: 'repeater-item class3 item', firstName: 'Cook', lastName: 'Farmer' },
	{ classes: 'repeater-item class4 item', firstName: 'Baldwin', lastName: 'Burch' },
	{ classes: 'repeater-item class5 item', firstName: 'Sabrina', lastName: 'Schwartz' },
	{ classes: 'repeater-item class1 item', firstName: 'Hudson', lastName: 'Medina' },
	{ classes: 'repeater-item class2 item', firstName: 'Jodi', lastName: 'Wells' },
	{ classes: 'repeater-item class3 item', firstName: 'Curry', lastName: 'Oneil' },
	{ classes: 'repeater-item class4 item', firstName: 'Mejia', lastName: 'Mcneil' },
	{ classes: 'repeater-item class5 item', firstName: 'Carrie', lastName: 'Rivas' },
	{ classes: 'repeater-item class1 item', firstName: 'Lowery', lastName: 'Murphy' },
	{ classes: 'repeater-item class2 item', firstName: 'Pace', lastName: 'Rivera' },
	{ classes: 'repeater-item class3 item', firstName: 'Gonzales', lastName: 'Ramos' },
	{ classes: 'repeater-item class4 item', firstName: 'Irwin', lastName: 'Rivers' },
	{ classes: 'repeater-item class5 item', firstName: 'Angelique', lastName: 'Hardy' },
	{ classes: 'repeater-item class1 item', firstName: 'Branch', lastName: 'Little' },
	{ classes: 'repeater-item class2 item', firstName: 'Yang', lastName: 'Case' },
	{ classes: 'repeater-item class3 item', firstName: 'Douglas', lastName: 'Marsh' },
	{ classes: 'repeater-item class4 item', firstName: 'Velma', lastName: 'Joyner' },
	{ classes: 'repeater-item class5 item', firstName: 'Susanna', lastName: 'Park' },
	{ classes: 'repeater-item class1 item', firstName: 'Billie', lastName: 'Kirk' },
	{ classes: 'repeater-item class2 item', firstName: 'Melendez', lastName: 'Fischer' },
	{ classes: 'repeater-item class3 item', firstName: 'Summer', lastName: 'Reeves' },
	{ classes: 'repeater-item class4 item', firstName: 'Contreras', lastName: 'Bradley' },
	{ classes: 'repeater-item class5 item', firstName: 'Taylor', lastName: 'Miller' },
	{ classes: 'repeater-item class1 item', firstName: 'Hopkins', lastName: 'Aguilar' },
	{ classes: 'repeater-item class2 item', firstName: 'Cleo', lastName: 'Sullivan' },
	{ classes: 'repeater-item class3 item', firstName: 'Vazquez', lastName: 'Flowers' },
	{ classes: 'repeater-item class4 item', firstName: 'Gibson', lastName: 'Gilliam' },
	{ classes: 'repeater-item class5 item', firstName: 'Zimmerman', lastName: 'Riggs' },
	{ classes: 'repeater-item class1 item', firstName: 'Mcintyre', lastName: 'Mcgee' },
	{ classes: 'repeater-item class2 item', firstName: 'Hall', lastName: 'Caldwell' },
	{ classes: 'repeater-item class3 item', firstName: 'Felicia', lastName: 'Fitzpatrick' },
	{ classes: 'repeater-item class4 item', firstName: 'Delgado', lastName: 'Cole' },
	{ classes: 'repeater-item class5 item', firstName: 'Burns', lastName: 'Summers' },
	{ classes: 'repeater-item class1 item', firstName: 'Durham', lastName: 'Dickerson' },
	{ classes: 'repeater-item class2 item', firstName: 'Lavonne', lastName: 'Robles' },
	{ classes: 'repeater-item class3 item', firstName: 'Roberts', lastName: 'Adams' },
	{ classes: 'repeater-item class4 item', firstName: 'Ayala', lastName: 'Lawson' },
	{ classes: 'repeater-item class5 item', firstName: 'Lori', lastName: 'Nolan' }
];

module.exports = kind({
	name: 'enyo.sample.DataGridListSample',
	classes: 'data-grid-list-sample data-repeater-sample enyo-fit',
	components: [
		{name: 'repeater', kind: DataGridList, components: [
			{components: [
				{classes: 'name-wrapper', components: [
					{name: 'firstName', classes: 'name', tag: 'span'},
					{name: 'lastName', classes: 'name last', tag: 'span'},
					{name: 'lastNameLetter', classes: 'name last-letter', tag: 'span'}
				]}
			], bindings: [
				{from: '.model.firstName', to: '.$.firstName.content'},
				{from: '.model.lastName', to: '.$.lastName.content'},
				{from: '.model.lastName', to: '.$.lastNameLetter.content', transform: function (v) { return v && v.charAt(0); }},
				{from: '.model.classes', to: '.classes'}
			]}
		], minWidth: 320, minHeight: 100, spacing: 10}
	],
	bindings: [
		{from: '.collection', to: '.$.repeater.collection'}
	],
	populateList: function () {
		this.collection = new Collection(data);
	},
	create: kind.inherit(function (sup) {
		return function () {
			this.populateList();
			sup.apply(this, arguments);
		};
	})
});

module.exports.data = data;

}],'src/DataListSampleWithJSData':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Binding = require('enyo/Binding');

var
	DataListSample = require('../DataListSample');

module.exports = kind({
	kind: DataListSample,
	populateList: function () {
		this.collection = DataListSample.data;
	},
	create: kind.inherit(function (sup) {
		return function () {
			Binding.defaultBindingKind = Binding.PassiveBinding;
			sup.apply(this, arguments);
		};
	}),
	destroy: kind.inherit(function (sup) {
		return function () {
			Binding.defaultBindingKind = Binding;
			sup.apply(this, arguments);
		};
	})

});

module.exports.badgeClasses = 'new';

},{'../DataListSample':'src/DataListSample'}],'../strawman/ScrollingSampleList':[function (module,exports,global,require,request){
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

},{'./SampleList':'../strawman/SampleList'}],'src/DataGridListSampleWithJSData':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Binding = require('enyo/Binding');

var
	DataGridListSample = require('../DataGridListSample');

module.exports = kind({
	kind: DataGridListSample,
	populateList: function () {
		this.collection = DataGridListSample.data;
	},
	create: kind.inherit(function (sup) {
		return function () {
			Binding.defaultBindingKind = Binding.PassiveBinding;
			sup.apply(this, arguments);
		};
	}),
	destroy: kind.inherit(function (sup) {
		return function () {
			Binding.defaultBindingKind = Binding;
			sup.apply(this, arguments);
		};
	})

});

module.exports.badgeClasses = 'new';

},{'../DataGridListSample':'src/DataGridListSample'}],'src/DataListScrollTestbed':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	Component = require('enyo/Component'),
	Control = require('enyo/Control'),
	ScrollStrategy = require('enyo/ScrollStrategy'),
	TouchScrollStrategy = require('enyo/TouchScrollStrategy'),
	TranslateScrollStrategy = require('enyo/TranslateScrollStrategy'),
	TransitionScrollStrategy = require('enyo/TransitionScrollStrategy'),
	Select = require('enyo/Select');

var
	DataListSample = require('./DataListSample'),
	DataGridListSample = require('./DataGridListSample');

var samples = {
	'DataList' : null,
	'DataGridList' : null
};

var strategies = {
	'Native' : {strategyKind: ScrollStrategy},
	'Touch' : {strategyKind: TouchScrollStrategy},
	'Translate' : {strategyKind: TranslateScrollStrategy},
	'Translate (Optimized)' : {strategyKind: TranslateScrollStrategy, translateOptimized: true},
	'Transition' : {strategyKind: TransitionScrollStrategy}
};

var TestMixin = {
	classes: 'enyo-unselectable',
	strategy: 'Native',
	addTestControls: function() {
		this.createComponent({
			style: 'position: absolute; top: 0; left: 0; right: 0; padding: 0.5em',
			defaultKind: Button,
			components: [
				{kind: Select, onchange: 'sampleChanged', components: this.buildMenu(samples, 'sample')},
				{kind: Select, onchange: 'strategyChanged', components: this.buildMenu(strategies, 'strategy')},
				{content: 'Scroll to Random Pos', ontap: 'scrollToRandomPos'},
				{content: 'Scroll to Top', ontap: 'scrollToTop'},
				{content: 'Scroll to Bottom', ontap: 'scrollToBottom'},
				{content: 'Scroll to Random Item', ontap: 'scrollToRandomItem'}
			]
		});
	},
	scrollToRandomPos: function () {
		var max = this.s.getScrollBounds().maxTop,
			pos = Math.random() * max;
		this.s.scrollTo(0, pos);
	},
	scrollToTop: function () {
		this.s.scrollToTop();
	},
	scrollToBottom: function () {
		this.s.scrollToBottom();
	},
	scrollToRandomItem: function () {
		var n = this.r.collection.length,
			i = Math.floor(Math.random() * n);
		this.r.scrollToIndex(i);
	},
	create: kind.inherit(function (sup) {
		return function () {
			var ov = {repeater: {scrollerOptions: strategies[this.strategy]}};
			this.kindComponents = Component.overrideComponents(this.kindComponents, ov, Control);
			sup.apply(this, arguments);
			this.r = this.$.repeater;
			this.s = this.r.$.scroller;
			// global reference for easier console testing
			global._sample = this;
			//hack
			if (this.strategy == 'Translate (Optimized)') {
				this.s.$.strategy.translateOptimized = true;
			}
			this.addTestControls();
		};
	}),
	strategyChanged: function (sender, ev) {
		this.rebuild({strategy: ev.originator.value}, samples[this.sample]);
	},
	sampleChanged: function (sender, ev) {
		this.rebuild({strategy: this.strategy}, samples[ev.originator.value]);
	},
	rebuild: function (props, Ctor) {
		var pn = this.hasNode().parentNode;
		this.destroy();
		new Ctor(props).renderInto(pn);
	},
	buildMenu: function (opts, val) {
		var ss = Object.keys(opts), c = [], i, s;
		for (i = 0; !!(s = ss[i]); i++) {
			c.push({content: s, selected: s == this[val]});
		}
		return c;
	}
};

samples.DataList = kind({
	name: 'enyo.sample.DataListScrollTestbed',
	kind: DataListSample,
	sample: 'DataList',
	mixins: [TestMixin]
});

samples.DataGridList = kind({
	name: 'enyo.sample.DataGridListScrollTestbed',
	kind: DataGridListSample,
	sample: 'DataGridList',
	mixins: [TestMixin]
});

module.exports = samples.DataList;

},{'./DataListSample':'src/DataListSample','./DataGridListSample':'src/DataGridListSample'}],'index':[function (module,exports,global,require,request){
require('enyo/options').accessibility = true;

var
	kind = require('enyo/kind'),
	ready = require('enyo/ready');

var
	Enyo = require('enyo');

var
	ScrollingSampleList = require('../strawman/ScrollingSampleList');

var
	samples = {
		AccessibilitySample				: require('./src/AccessibilitySample'),
		AjaxSample						: require('./src/AjaxSample'),
		AnchorSample					: require('./src/AnchorSample'),
		AnimatorSample					: require('./src/AnimatorSample'),
		AudioSample						: require('./src/AudioSample'),
		BackgroundTaskManagerSample		: require('./src/BackgroundTaskManagerSample'),
		ButtonSample					: require('./src/ButtonSample'),
		CheckboxSample					: require('./src/CheckboxSample'),
		ComponentOverrideSample			: require('./src/ComponentOverrideSample'),
		DataGridListSample				: require('./src/DataGridListSample'),
		DataGridListSampleWithJSData	: require('./src/DataGridListSampleWithJSData'),
		DataListSample					: require('./src/DataListSample'),
		DataListSampleWithJSData		: require('./src/DataListSampleWithJSData'),
		DataListScrollTestbed			: require('./src/DataListScrollTestbed'), //has test variations that don't work for list atm
		DataRepeaterSample				: require('./src/DataRepeaterSample'),
		DataRepeaterSampleWithJSData	: require('./src/DataRepeaterSampleWithJSData'),
		DragAvatarSample				: require('./src/DragAvatarSample'),
		DrawerSample					: require('./src/DrawerSample'),
		FullscreenSample				: require('./src/FullscreenSample'),
		GestureSample					: require('./src/GestureSample'),
		GroupSample						: require('./src/GroupSample'),
		HoldSample						: require('./src/HoldSample'),
		ImageSample						: require('./src/ImageSample'),
		InputSample						: require('./src/InputSample'),
		JsonpSample						: require('./src/JsonpSample'),
		LightPanelsSample				: require('./src/LightPanelsSample'),
		NestedRepeaterSample			: require('./src/NestedRepeaterSample'),
		NewDrawerSample					: require('./src/NewDrawerSample'),
		PageVisibilitySample			: require('./src/PageVisibilitySample'),
		PlatformSample					: require('./src/PlatformSample'),
		PopupSample						: require('./src/PopupSample'),
		PositionSample					: require('./src/PositionSample'),
		RepeaterSample					: require('./src/RepeaterSample'),
		RichTextSample					: require('./src/RichTextSample'),
		ScrollerSample					: require('./src/ScrollerSample'),
		SelectSample					: require('./src/SelectSample'),
		ShowingTransitionSample			: require('./src/ShowingTransitionSample'),
		SpriteAnimationSample			: require('./src/SpriteAnimationSample'),
		StylesheetSupportSample			: require('./src/StylesheetSupportSample'),
		TableSample						: require('./src/TableSample'),
		TextAreaSample					: require('./src/TextAreaSample'),
		VideoSample						: require('./src/VideoSample'),
		WebServiceSample				: require('./src/WebServiceSample')
	};

var Sample = kind({
	kind: ScrollingSampleList,
	title: 'Enyo Samples',
	version: Enyo.version,
	libraryName: 'Enyo',
	samples: samples
});

ready(function() {
	new Sample().renderInto(document.body);
});


},{'../strawman/ScrollingSampleList':'../strawman/ScrollingSampleList','./src/AccessibilitySample':'src/AccessibilitySample','./src/AjaxSample':'src/AjaxSample','./src/AnchorSample':'src/AnchorSample','./src/AnimatorSample':'src/AnimatorSample','./src/AudioSample':'src/AudioSample','./src/BackgroundTaskManagerSample':'src/BackgroundTaskManagerSample','./src/ButtonSample':'src/ButtonSample','./src/CheckboxSample':'src/CheckboxSample','./src/ComponentOverrideSample':'src/ComponentOverrideSample','./src/DataGridListSample':'src/DataGridListSample','./src/DataGridListSampleWithJSData':'src/DataGridListSampleWithJSData','./src/DataListSample':'src/DataListSample','./src/DataListSampleWithJSData':'src/DataListSampleWithJSData','./src/DataListScrollTestbed':'src/DataListScrollTestbed','./src/DataRepeaterSample':'src/DataRepeaterSample','./src/DataRepeaterSampleWithJSData':'src/DataRepeaterSampleWithJSData','./src/DragAvatarSample':'src/DragAvatarSample','./src/DrawerSample':'src/DrawerSample','./src/FullscreenSample':'src/FullscreenSample','./src/GestureSample':'src/GestureSample','./src/GroupSample':'src/GroupSample','./src/HoldSample':'src/HoldSample','./src/ImageSample':'src/ImageSample','./src/InputSample':'src/InputSample','./src/JsonpSample':'src/JsonpSample','./src/LightPanelsSample':'src/LightPanelsSample','./src/NestedRepeaterSample':'src/NestedRepeaterSample','./src/NewDrawerSample':'src/NewDrawerSample','./src/PageVisibilitySample':'src/PageVisibilitySample','./src/PlatformSample':'src/PlatformSample','./src/PopupSample':'src/PopupSample','./src/PositionSample':'src/PositionSample','./src/RepeaterSample':'src/RepeaterSample','./src/RichTextSample':'src/RichTextSample','./src/ScrollerSample':'src/ScrollerSample','./src/SelectSample':'src/SelectSample','./src/ShowingTransitionSample':'src/ShowingTransitionSample','./src/SpriteAnimationSample':'src/SpriteAnimationSample','./src/StylesheetSupportSample':'src/StylesheetSupportSample','./src/TableSample':'src/TableSample','./src/TextAreaSample':'src/TextAreaSample','./src/VideoSample':'src/VideoSample','./src/WebServiceSample':'src/WebServiceSample'}]
	};

});
//# sourceMappingURL=enyo-samples.js.map