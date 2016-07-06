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

},{'../LinkSupport':'../strawman/LinkSupport'}],'src/SpinnerSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Spinner = require('onyx/Spinner');

module.exports = kind({
	name: 'onyx.sample.SpinnerSample',
	classes: 'onyx onyx-sample',
	handlers: {
		onSelect: 'itemSelected'
	},
	components: [
		{classes: 'onyx-sample-divider', content: 'Light Spinner'},
		{style: 'background: black; border-radius: 5px; padding: 15px', components: [
			{kind: Spinner}
		]},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'Dark Spinner'},
		{style: 'background: white; border-radius: 5px; padding: 15px', components: [
			{kind: Spinner, classes: 'onyx-light'}
		]}
	]
});
}],'src/ToggleButtonSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Groupbox = require('onyx/Groupbox'),
	GroupboxHeader = require('onyx/GroupboxHeader'),
	ToggleButton = require('onyx/ToggleButton'),
	Group = require('enyo/Group');

module.exports = kind({
	name: 'onyx.sample.ToggleButtonSample',
	classes: 'onyx onyx-sample',
	components: [
		{classes: 'onyx-sample-divider', content: 'Toggle Buttons'},
		{classes: 'onyx-sample-tools', components: [
			{kind: ToggleButton, onChange: 'toggleChanged', value: true},
			{kind: ToggleButton, onChange: 'toggleChanged'},
			{kind: ToggleButton, onChange: 'toggleChanged'},
			{kind: ToggleButton, onChange: 'toggleChanged', value: true, disabled: true}
		]},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'Toggle Buttons Group'},
		{kind: Group, classes: 'onyx-sample-tools group', onActivate: 'groupActivated', highlander: true, components: [
			{kind: ToggleButton},
			{kind: ToggleButton, value: true},
			{kind: ToggleButton}
		]},
		{tag: 'br'},
		{kind: Groupbox, classes: 'onyx-sample-result-box', components: [
			{kind: GroupboxHeader, content: 'Result'},
			{name: 'result', classes: 'onyx-sample-result', content: 'No button tapped yet.'}
		]}
	],
	toggleChanged: function (sender, ev) {
		this.$.result.setContent(sender.name + ' was ' + (sender.getValue() ? ' selected.' : 'deselected.'));
	},
	ordinals: ['1st', '2nd', '3rd'],
	groupActivated: function (sender, ev) {
		if (ev.originator.getActive()) {
			var selected = ev.originator.indexInContainer();
			this.$.result.setContent('The ' + this.ordinals[selected] + ' toggle button in the group is selected.');
		}
	}
});

}],'src/IconButtonSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Groupbox = require('onyx/Groupbox'),
	GroupboxHeader = require('onyx/GroupboxHeader'),
	Icon = require('onyx/Icon'),
	IconButton = require('onyx/IconButton'),
	ToggleIconButton = require('onyx/ToggleIconButton'),
	Toolbar = require('onyx/Toolbar'),
	Control = require('enyo/Control'),
	Group = require('enyo/Group');

module.exports = kind({
	name: 'onyx.sample.IconButtonSample',
	classes: 'onyx onyx-sample',
	components: [
		{classes: 'onyx-sample-divider', content: 'Icon'},
		{kind: Icon, src: 'assets/menu-icon-bookmark.png' },
		{tag: 'br'},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'Icon Button'},
		{kind: IconButton, src: 'assets/menu-icon-bookmark.png', ontap: 'iconTapped'},
		{kind: IconButton, src: 'assets/menu-icon-bookmark.png', disabled: true, ontap: 'iconTapped'},
		{tag: 'br'},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'Grouped Icon Buttons'},
		{kind: Group, onActivate: 'iconGroupActivated', components: [
			{kind: IconButton, active: true, src: 'assets/menu-icon-bookmark.png'},
			{kind: IconButton, src: 'assets/menu-icon-bookmark.png'},
			{kind: IconButton, src: 'assets/menu-icon-bookmark.png'}
		]},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'Toggle Icon Buttons'},
		{kind: ToggleIconButton, onChange: 'toggleChanged', src: 'assets/menu-icon-bookmark.png'},
		{kind: ToggleIconButton, onChange: 'toggleChanged', value: true, src: 'assets/menu-icon-bookmark.png'},
		{kind: ToggleIconButton, onChange: 'toggleChanged', disabled: true, src: 'assets/menu-icon-bookmark.png'},
		{kind: ToggleIconButton, onChange: 'toggleChanged', value: true, disabled: true, src: 'assets/menu-icon-bookmark.png'},
		{tag: 'br'},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'Icon Buttons in Toolbar'},
		{kind: Toolbar, defaultKind: IconButton, components: [
			{src: 'assets/menu-icon-bookmark.png', ontap: 'iconTapped'},
			{src: 'assets/menu-icon-bookmark.png', ontap: 'iconTapped'},
			{src: 'assets/menu-icon-bookmark.png', ontap: 'iconTapped'},
			{kind: Control},
			{kind: Group, tag: null, onActivate: 'iconGroupActivated', defaultKind: IconButton, components: [
				{src: 'assets/menu-icon-bookmark.png', active: true},
				{src: 'assets/menu-icon-bookmark.png'},
				{src: 'assets/menu-icon-bookmark.png'}
			]}
		]},
		{tag: 'br'},
		{kind: Groupbox, classes: 'onyx-sample-result-box', components: [
			{kind: GroupboxHeader, content: 'Result'},
			{name: 'result', classes: 'onyx-sample-result', content: 'No button tapped yet.'}
		]}
	],
	iconTappedCounts: {},
	iconTapped: function (sender, ev) {
		this.iconTappedCounts[sender.name] = this.iconTappedCounts[sender.name] || 0;
		this.$.result.setContent('The icon button was tapped: ' + (++this.iconTappedCounts[sender.name]));
	},
	toggleChanged: function (sender, ev) {
		this.$.result.setContent(sender.name + ' was ' + (sender.getValue() ? ' selected.' : 'deselected.'));
	},
	ordinals: ['1st', '2nd', '3rd'],
	iconGroupActivated: function (sender, ev) {
		if (ev.originator.getActive()) {
			var selected = ev.originator.indexInContainer();
			this.$.result.setContent('The ' + this.ordinals[selected] + ' icon button in the group is selected.');
		}
	}
});
}],'src/GroupboxSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Groupbox = require('onyx/Groupbox'),
	GroupboxHeader = require('onyx/GroupboxHeader'),
	Input = require('onyx/Input'),
	InputDecorator = require('onyx/InputDecorator');

module.exports = kind({
	name: 'onyx.sample.GroupboxSample',
	classes: 'onyx onyx-sample',
	components: [
		{classes: 'onyx-sample-divider', content: 'Groupboxes'},
		{kind: Groupbox, components: [
			{kind: GroupboxHeader, content: 'Header'},
			{content: 'I\'m a group item!', style: 'padding: 8px;'},
			{content: 'I\'m a group item!', style: 'padding: 8px;'}
		]},
		{tag: 'br'},
		{kind: Groupbox, components: [
			{content: 'I\'m a group item!', style: 'padding: 8px;'}
		]},
		{tag: 'br'},
		{kind: Groupbox, components: [
			{kind: GroupboxHeader, content: 'Header'},
			{kind: InputDecorator, components: [
				{kind: Input, style: 'width: 100%', placeholder: 'Enter text here'}
			]},
			{kind: InputDecorator, components: [
				{kind: Input, style: 'width: 100%', value: 'Middle'}
			]},
			{kind: InputDecorator, style: 'background: lightblue;', components: [
				{kind: Input, style: 'width: 100%;', value: 'Last'}
			]}
		]},
		{tag: 'br'},
		{kind: Groupbox, components: [
			{kind: InputDecorator, components: [
				{kind: Input, style: 'width: 100%', placeholder: 'Enter text here'}
			]}
		]},
		{kind: Groupbox, components: [
			{kind: InputDecorator, components: [
				{kind: Input, type: 'password', style: 'width: 100%', placeholder: 'Enter Password'}
			]}
		]}
	]
});
}],'src/CheckboxSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Checkbox = require('onyx/Checkbox'),
	Groupbox = require('onyx/Groupbox'),
	GroupboxHeader = require('onyx/GroupboxHeader'),
	Group = require('enyo/Group');

module.exports = kind({
	name: 'onyx.sample.CheckboxSample',
	classes: 'onyx onyx-sample',
	components: [
		{classes: 'onyx-sample-divider', content: 'Checkboxes'},
		{classes: 'onyx-sample-tools', components: [
			{kind: Checkbox, onchange: 'checkboxChanged'},
			{kind: Checkbox, onchange: 'checkboxChanged'},
			{kind: Checkbox, onchange: 'checkboxChanged', checked: true}
		]},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'Checkboxes Group'},
		{kind: Group, classes: 'onyx-sample-tools group', onActivate: 'groupActivated', highlander: true, components: [
			{kind: Checkbox, checked: true},
			{kind: Checkbox},
			{kind: Checkbox}
		]},
		{tag: 'br'},
		{kind: Groupbox, classes: 'onyx-sample-result-box', components: [
			{kind: GroupboxHeader, content: 'Result'},
			{name: 'result', classes: 'onyx-sample-result', content: 'No button tapped yet.'}
		]}
	],
	checkboxChanged: function (sender, ev) {
		this.$.result.setContent(sender.name + ' was ' + (sender.getValue() ? ' selected.' : 'deselected.'));
	},
	ordinals: ['1st', '2nd', '3rd'],
	groupActivated: function (sender, ev) {
		if (ev.originator.getActive()) {
			var selected = ev.originator.indexInContainer();
			this.$.result.setContent('The ' + this.ordinals[selected] + ' checkbox in the group is selected.');
		}
	}
});

}],'src/InputSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	EnyoImage = require('enyo/Image');

var
	Checkbox = require('onyx/Checkbox'),
	Groupbox = require('onyx/Groupbox'),
	GroupboxHeader = require('onyx/GroupboxHeader'),
	Input = require('onyx/Input'),
	InputDecorator = require('onyx/InputDecorator'),
	RichText = require('onyx/RichText'),
	TextArea = require('onyx/TextArea');

module.exports = kind({
	name: 'onyx.sample.InputSample',
	classes: 'onyx onyx-sample',
	components: [
		{classes: 'onyx-sample-divider', content: 'Inputs'},
		{classes: 'onyx-toolbar-inline', components: [
			{kind: InputDecorator, components: [
				{kind: Input, placeholder: 'Enter text here', onchange: 'inputChanged'}
			]},
			{kind: InputDecorator, components: [
				{kind: Input, placeholder: 'Search term', onchange: 'inputChanged'},
				{kind: EnyoImage, src: 'assets/search-input-search.png'}
			]},
			{kind: InputDecorator, components: [
				{kind: Input, type: 'password', placeholder: 'Enter password', onchange: 'inputChanged'}
			]},
			{content: 'alwaysLookFocused: '},
			{kind: Checkbox, onchange: 'changeFocus'}
		]},
		{classes: 'onyx-toolbar-inline', components: [
			{kind: InputDecorator, components: [
				{kind: Input, disabled: true, value: 'Disabled input'}
			]},
			{kind: InputDecorator, components: [
				{content: 'Left: '},
				{kind: Input, value: 'Input Area', onchange: 'inputChanged'},
				{content: ' :Right'}
			]}
		]},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'RichTexts'},
		{classes: 'onyx-toolbar-inline', components: [
			{kind: InputDecorator, components: [
				{kind: RichText, style: 'width: 200px;', placeholder: 'Enter text here', onchange: 'inputChanged'}
			]},
			{kind: InputDecorator, components: [
				{kind: RichText, style: 'width: 200px;', placeholder: 'Search term', onchange: 'inputChanged'},
				{kind: EnyoImage, src: 'assets/search-input-search.png'}
			]}
		]},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'TextAreas'},
		{classes: 'onyx-toolbar-inline', components: [
			{kind: InputDecorator, components: [
				{kind: TextArea, placeholder: 'Enter text here', onchange: 'inputChanged'}
			]},
			{kind: InputDecorator, components: [
				{kind: TextArea, placeholder: 'Search term', onchange: 'inputChanged'},
				{kind: EnyoImage, src: 'assets/search-input-search.png'}
			]}
		]},
		{tag: 'br'},
		{kind: Groupbox, classes: 'onyx-sample-result-box', components: [
			{kind: GroupboxHeader, content: 'Result'},
			{name: 'result', classes: 'onyx-sample-result', content: 'No input entered yet.'}
		]}
	],
	inputChanged: function (sender, ev) {
		this.$.result.setContent('Input: ' + sender.getValue());
	},
	changeFocus: function (sender, ev) {
		utils.forEach([this.$.inputDecorator, this.$.inputDecorator2, this.$.inputDecorator3], function(inItem) {
			inItem.setAlwaysLooksFocused(sender.getValue());
			// If disabling alwaysLooksFocused, we need to blur the
			// InputDecorator for the setting to go into effect
			if (!sender.getValue()) {
				inItem.triggerHandler('onblur');
			}
		});
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

},{'../Link':'../strawman/Link'}],'src/ButtonSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('onyx/Button'),
	Groupbox = require('onyx/Groupbox'),
	GroupboxHeader = require('onyx/GroupboxHeader'),
	Icon = require('onyx/Icon');

module.exports = kind({
	name: 'onyx.sample.ButtonSample',
	classes: 'onyx onyx-sample',
	components: [
		{classes: 'onyx-sample-divider', content: 'Buttons'},
		{classes: 'onyx-sample-tools', components: [
			{kind: Button, content: 'Button', ontap:'buttonTapped'}
		]},
		{classes: 'onyx-sample-tools', components: [
			{kind: Button, content: 'Affirmative', classes: 'onyx-affirmative', ontap:'buttonTapped'},
			{kind: Button, content: 'Negative', classes: 'onyx-negative', ontap:'buttonTapped'},
			{kind: Button, content: 'Blue', classes: 'onyx-blue', ontap:'buttonTapped'},
			{kind: Button, content: 'Dark', classes: 'onyx-dark', ontap:'buttonTapped'},
			{kind: Button, content: 'Custom', style: 'background-color: purple; color: #F1F1F1;', ontap:'buttonTapped'}
		]},
		{classes: 'onyx-sample-tools', components: [
			{kind: Button, content: 'Active', classes: 'active', ontap:'buttonTapped'},
			{kind: Button, content: 'Disabled', disabled: true, ontap:'buttonTapped'},
			{kind: Button, content: 'Active Disabled', classes: 'active', disabled: true, ontap:'buttonTapped'}
		]},
		{classes: 'onyx-sample-tools', components: [
			{kind: Button, content: 'Tall Button', style: 'height: 70px;', ontap:'buttonTapped'}
		]},
		{classes: 'onyx-sample-divider', content: 'Buttons with images'},
		{classes: 'onyx-sample-tools', components: [
			{kind: Button, name:'Image Button', ontap:'buttonTapped', components: [
				{tag: 'img', attributes: {src: 'assets/enyo-logo-small.png'}},
				{content: 'There is an image here'}
			]},
			{kind: Button, name:'Fishbowl Button', ontap:'buttonTapped', components: [
				{kind: Icon, src: 'assets/fish_bowl.png'}
			]}
		]},
		{kind: Groupbox, classes:'onyx-sample-result-box', components: [
			{kind: GroupboxHeader, content: 'Result'},
			{name:'result', classes:'onyx-sample-result', content:'No button tapped yet.'}
		]}
	],
	buttonTapped: function (sender, ev) {
		if (sender.content){
			this.$.result.setContent('The \'' + sender.getContent() + '\' button was tapped');
		} else {
			this.$.result.setContent('The \'' + sender.getName() + '\' button was tapped');
		}
	}
});
}],'src/PopupSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('onyx/Button'),
	Input = require('onyx/Input'),
	InputDecorator = require('onyx/InputDecorator'),
	Popup = require('onyx/Popup'),
	Spinner = require('onyx/Spinner');

module.exports = kind({
	name: 'onyx.sample.PopupSample',
	classes: 'onyx onyx-sample',
	components: [
		{classes: 'onyx-sample-divider', content: 'Popups'},
		{classes: 'onyx-sample-tools', components: [
			{kind: Button, content: 'Basic Popup', ontap: 'showPopup', popup: 'basicPopup'},
			{name: 'basicPopup', kind: Popup, centered: true, floating: true, classes:'onyx-sample-popup', style: 'padding: 10px;', content: 'Popup...'},
			{tag: 'br'},
			{kind: Button, content: 'Popup w/Spinner (Dark)', ontap: 'showPopup', popup: 'spinnerPopup'},
			{name: 'spinnerPopup', classes: 'onyx-sample-popup', kind: Popup, centered: true, floating: true, onHide: 'popupHidden', scrim: true, components: [
				{kind: Spinner},
				{content: 'Popup'}
			]},
			{tag: 'br'},
			{kind: Button, content: 'Popup w/Spinner (Light)', ontap: 'showPopup', popup: 'lightPopup'},
			{name: 'lightPopup', classes: 'onyx-sample-popup', style: 'background: #eee;color: black;', kind: Popup, centered: true, floating: true, onHide: 'popupHidden', scrim: true, components: [
				{kind: Spinner, classes: 'onyx-light'},
				{content: 'Popup'}
			]},
			{tag: 'br'},
			{kind: Button, content: 'Modal Popup with Input', ontap: 'showPopup', popup: 'modalPopup'},
			{name: 'modalPopup', classes: 'onyx-sample-popup', kind: Popup, centered: true, modal: true, floating: true, onShow: 'popupShown', onHide: 'popupHidden', components: [
				{kind: InputDecorator, components: [
					{kind: Input}
				]},
				{tag: 'br'},
				{kind: Button, content: 'Close', ontap: 'closeModalPopup'},
				{kind: Button, content: 'Another!', ontap: 'showPopup', popup: 'lightPopup'}
			]},
			{tag: 'br'},
			{kind: Button, content: 'Popup at Event (right)', ontap: 'showPopupAtEvent', popup: 'rightEventPopup', style: 'float: right;'},
			{kind: Button, content: 'Popup at Event', ontap: 'showPopupAtEvent', popup: 'leftEventPopup'},
			{name: 'leftEventPopup', classes: 'onyx-sample-popup', kind: Popup, modal: true, floating: true, content: 'Anchor defaults<br/>to top left corner', allowHtml: true},
			{name: 'rightEventPopup', classes: 'onyx-sample-popup', kind: Popup, modal: true, floating: true, content: 'Adjusts anchor to<br/>stay in viewport', allowHtml: true},
			{tag: 'br'},
			{kind: Button, content: 'Two Popups', ontap: 'showTwoPopups'},
			{name: 'firstPopup', classes: 'onyx-sample-popup', kind: Popup, modal: false, floating: true, content: 'Popup 1', style: 'top: 20px; left: 20px'},
			{name: 'secondPopup', classes: 'onyx-sample-popup', kind: Popup, modal: false, floating: true, content: 'Popup 2', style: 'top: 20px; left: 200px'}
		]}
	],
	showPopup: function (sender) {
		var p = this.$[sender.popup];
		if (p) {
			p.show();
		}
	},
	showPopupAtEvent: function (sender, ev) {
		var p = this.$[sender.popup];
		if (p) {
			p.showAtEvent(ev);
		}
	},
	popupHidden: function () {
		// FIXME: needed to hide ios keyboard
		document.activeElement.blur();
		if(this.$.modalPopup.showing) {   // Refocus input on modal
			this.startJob('focus', function () { this.$.input.focus(); }, 500);
		}
	},
	popupShown: function () {
		// FIXME: does not focus input on android.
		this.$.input.focus();
		this.startJob('focus', function () { this.$.input.focus(); }, 500);
	},
	closeModalPopup: function () {
		this.$.modalPopup.hide();
	},
	showTwoPopups: function () {
		this.$.firstPopup.show();
		this.$.secondPopup.show();
		this.startJob('clearSecond', function () { this.$.secondPopup.hide(); }, 2000);
	}
});
}],'src/ProgressSample':[function (module,exports,global,require,request){
var
	animation = require('enyo/animation'),
	kind = require('enyo/kind');

var
	Button = require('onyx/Button'),
	Checkbox = require('onyx/Checkbox'),
	Input = require('onyx/Input'),
	InputDecorator = require('onyx/InputDecorator'),
	ProgressBar = require('onyx/ProgressBar'),
	ProgressButton = require('onyx/ProgressButton'),
	Slider = require('onyx/Slider');

module.exports = kind({
	name: 'onyx.sample.ProgressSample',
	classes: 'onyx onyx-sample',
	components: [
		{classes: 'onyx-sample-divider', content: 'Progress Bars'},
		{kind: ProgressBar, progress: 25},
		{kind: ProgressBar, animateStripes: false, progress: 25},
		{kind: ProgressBar, progress: 25, barClasses: 'onyx-green'},
		{kind: ProgressBar, progress: 25, barClasses: 'onyx-red'},
		{kind: ProgressBar, progress: 25, barClasses: 'onyx-dark'},
		{kind: ProgressBar, animateStripes: false, barClasses: 'onyx-light', progress: 50},
		{kind: ProgressBar, showStripes: false, progress: 75},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'Progress Buttons'},
		{kind: ProgressButton, progress: 25, onCancel:'clearValue', components: [
			{content: '0'},
			{content: '100', style: 'float: right;'}
		]},
		{kind: ProgressButton, animateStripes: false, barClasses: 'onyx-dark', progress: 50, onCancel:'clearValue'},
		{kind: ProgressButton, showStripes: false, progress: 75, onCancel:'clearValue'},
		{tag: 'br'},
		{kind: InputDecorator, style:'margin-right:10px;', components: [
			{kind: Input, placeholder: 'Value', style:'width:50px;'}
		]},
		{kind: Button, content:'Set', classes:'onyx-sample-spaced-button', ontap:'changeValue'},
		{kind: Button, content:'-', classes:'onyx-sample-spaced-button', ontap:'decValue'},
		{kind: Button, content:'+', classes:'onyx-sample-spaced-button', ontap:'incValue'},
		{tag: 'br'},
		{tag: 'br'},
		{kind: Checkbox, name:'animateSetting', checked:true},
		{content:'Animated', classes:'enyo-inline onyx-sample-animate-label'},
		{tag: 'br'},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'Sliders'},
		{kind: Slider, min: 10, max: 50, value: 30},
		{tag: 'br'},
		{kind: Slider, lockBar: false, progress: 20, value: 75},
		{tag: 'br'},
		{name: 'progressSlider', kind: Slider, lockBar: false, value: 75},
		{kind: Button, content: 'Toggle Progress', ontap: 'toggleProgress'}
	],
	changeValue: function (sender, ev) {
		for (var i in this.$) {
			if (this.$[i].kind == ProgressBar || this.$[i].kind == ProgressButton) {
				if (this.$.animateSetting.getValue()) {
					this.$[i].animateProgressTo(this.$.input.getValue());
				} else {
					this.$[i].setProgress(this.$.input.getValue());
				}
			}
		}
	},
	incValue: function () {
		this.$.input.setValue(Math.min(parseInt(this.$.input.getValue() || 0, 10) + 10, 100));
		this.changeValue();
	},
	decValue: function () {
		this.$.input.setValue(Math.max(parseInt(this.$.input.getValue() || 0, 10) - 10, 0));
		this.changeValue();
	},
	clearValue: function (sender, ev) {
		sender.setProgress(0);
	},
	toggleProgress: function () {
		this._progressing = !this._progressing;
		this.nextProgress();
	},
	nextProgress: function () {
		if (this._progressing) {
			animation.requestAnimationFrame(this.bindSafely(function () {
				this.incrementProgress();
				setTimeout(this.bindSafely('nextProgress'), 500);
			}), this.hasNode());
		}
	},
	incrementProgress: function () {
		var p = this.$.progressSlider;
		var i = p.min + ((p.progress - p.min + 5) % (p.max - p.min + 1));
		p.animateProgressTo(i);
	}
});
}],'src/SliderSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	Control = require('enyo/Control');

var
	Slider = require('onyx/Slider'),
	InputDecorator = require('onyx/InputDecorator'),
	Input = require('onyx/Input'),
	Groupbox = require('onyx/Groupbox'),
	GroupboxHeader = require('onyx/GroupboxHeader'),
	RangeSlider = require('onyx/RangeSlider'),
	Checkbox = require('onyx/Checkbox'),
	Button = require('onyx/Button');

module.exports = kind({
	name: 'onyx.sample.SliderSample',
	kind: Control,
	classes: 'onyx onyx-sample',
	components: [
		{classes: 'onyx-sample-divider', content: 'Sliders'},
		{kind: Slider, value: 50, onChanging: 'sliderChanging', onChange: 'sliderChanged'},
		{tag: 'br'},
		{kind: Slider, lockBar: false, value: 50, onChanging: 'sliderChanging', onChange: 'sliderChanged'},

		{tag: 'br'},
		{kind: InputDecorator, style: 'margin-right: 10px;', components: [
			{kind: Input, placeholder: 'Value', style: 'width: 50px;'}
		]},
		{kind: Button, content: 'Set', classes: 'onyx-sample-spaced-button', ontap: 'changeValue'},
		{kind: Button, content: '-', classes: 'onyx-sample-spaced-button', ontap: 'decValue'},
		{kind: Button, content: '+', classes: 'onyx-sample-spaced-button', ontap: 'incValue'},
		{tag: 'br'},
		{tag: 'br'},
		{kind: Checkbox, name: 'animateSetting', value: true},
		{content: 'Animated', classes: 'enyo-inline onyx-sample-animate-label'},
		{name : 'incrementSetting', kind: Checkbox, onchange: 'sliderIncrementChanged', checked: false},
		{content: 'increment by 7', classes: 'enyo-inline'},
		{tag: 'br'},
		{tag: 'br'},
		{kind: Groupbox, classes: 'onyx-sample-result-box', components: [
			{kind: GroupboxHeader, content: 'Result'},
			{name: 'result', classes: 'onyx-sample-result', content: 'No slider moved yet.'}
		]},
		{tag: 'br'},
		{tag: 'br'},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'RangeSlider'},
		{tag: 'br'},
		{kind: RangeSlider, rangeMin: 100, rangeMax: 500, rangeStart: 200, rangeEnd: 400, increment: 20, showLabels: true, onChanging: 'rangeSliderChanging', onChange: 'rangeSliderChanged'},
		{components: [
			{style: 'width: 20%; display: inline-block; text-align: left;', content: '$100'},
			{style: 'width: 60%; display: inline-block; text-align: center;', content: '$300'},
			{style: 'width: 20%; display: inline-block; text-align: right;', content: '$500'}
		]},
		{tag: 'br'},
		{kind: Checkbox, onchange: 'rangeSliderIncrementChanged', checked: true},
		{content: 'increment by 20', classes: 'enyo-inline'},
		{tag: 'br'},
		{tag: 'br'},
		{kind: Groupbox, classes: 'onyx-sample-result-box', components: [
			{kind: GroupboxHeader, content: 'Result'},
			{name: 'rangeSliderResult', classes: 'onyx-sample-result', content: 'RangeSlider not moved yet.'}
		]},
		{tag: 'br'},
		{tag: 'br'},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'Slider (Bound Value)'},
		{tag: 'br'},
		{kind: Slider, name: 'boundSlider', value: 50},
		{tag: 'br'},
		{tag: 'br'},
		{kind: Groupbox, classes: 'onyx-sample-result-box', components: [
			{kind: GroupboxHeader, content: 'Result'},
			{name: 'boundResult', classes: 'onyx-sample-result'}
		]}
	],
	bindings: [
		{from: '$.boundSlider.value', to: '$.boundResult.content', transform: function (val) {
			return utils.format('Current value: %.', val);
		}}
	],
	changeValue: function (sender, event) {
		for (var i in this.$) {
			if (this.$[i].kind == Slider) {
				if (this.$.animateSetting.getValue()) {
					this.$[i].animateTo(this.$.input.getValue());
				} else {
					this.$[i].setValue(this.$.input.getValue());
				}
			}
		}
	},
	incValue: function () {
		var tGap = (this.$.incrementSetting.getChecked()) ? 7 : 10;
		this.$.input.setValue(Math.min(parseInt(this.$.input.getValue() || 0, 10) + tGap, 100));
		this.changeValue();
	},
	decValue: function () {
		var tGap = (this.$.incrementSetting.getChecked()) ? 7 : 10;
		this.$.input.setValue(Math.max(parseInt(this.$.input.getValue() || 0, 10) - tGap, 0));
		this.changeValue();
	},
	sliderChanging: function (sender, ev) {
		this.$.result.setContent(sender.name + ' changing: ' + Math.round(sender.getValue()));
	},
	sliderChanged: function (sender, ev) {
		this.$.result.setContent(sender.name + ' changed to ' + Math.round(sender.getValue()) + '.');
	},
	rangeSliderIncrementChanged: function (sender, ev) {
		this.$.rangeSlider.setIncrement(sender.getValue() ? 20 : 0);
	},
	sliderIncrementChanged: function (sender, ev) {
		this.$.slider2.setIncrement(sender.getValue() ? 7 : 0);
		this.$.slider.setIncrement(sender.getValue() ? 7 : 0);
	},
	updateRangeLabels: function (slider) {
		slider.setStartLabel('--> ' + Math.floor(slider.getRangeStart()));
		slider.setEndLabel(Math.ceil(slider.getRangeEnd()) + '<--');
	},
	rangeSliderChanging: function (sender, ev) {
		this.updateRangeLabels(sender);
		this.$.rangeSliderResult.setContent('Range changing: $' + Math.round(sender.getRangeStart()) + ' - $' + Math.round(sender.getRangeEnd()));
	},
	rangeSliderChanged: function (sender, ev) {
		this.updateRangeLabels(sender);
		this.$.rangeSliderResult.setContent('Range changed to $' + Math.round(sender.getRangeStart()) + ' - $' + Math.round(sender.getRangeEnd()) + '.');
	},
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.updateRangeLabels(this.$.rangeSlider);
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

},{'../Link':'../strawman/Link','../List':'../strawman/List','../Title':'../strawman/Title','../AppRouter':'../strawman/AppRouter'}],'src/ButtonGroupSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('onyx/Button'),
	Groupbox = require('onyx/Groupbox'),
	GroupboxHeader = require('onyx/GroupboxHeader'),
	RadioGroup = require('onyx/RadioGroup'),
	Group = require('enyo/Group');

module.exports = kind({
	name: 'onyx.sample.ButtonGroupSample',
	classes: 'onyx onyx-sample',
	components: [
		{classes: 'onyx-sample-divider', content: 'RadioGroup'},
		{kind: RadioGroup, onActivate: 'radioActivated', components: [
			{content: 'Alpha', active: true},
			{content: 'Beta'},
			{content: 'Gamma'}
		]},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'TabGroup'},
		{kind: RadioGroup, onActivate: 'tabActivated', controlClasses: 'onyx-tabbutton', components: [
			{content: 'Alpha', active: true},
			{content: 'Beta'}
		]},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'Button Group'},
		{kind: Group, onActivate: 'buttonActivated', classes: 'onyx-sample-tools group', defaultKind: Button, highlander: true, components: [
			{content: 'Button A', active: true, classes: 'onyx-affirmative'},
			{content: 'Button B', classes: 'onyx-negative'},
			{content: 'Button C', classes: 'onyx-blue'}
		]},
		{tag: 'br'},
		{kind: Groupbox, classes: 'onyx-sample-result-box', components: [
			{kind: GroupboxHeader, content: 'Result'},
			{name: 'result', classes: 'onyx-sample-result', content: 'No button tapped yet.'}
		]}
	],
	radioActivated: function (sender, ev) {
		if (ev.originator.getActive()) {
			this.$.result.setContent('The \'' + ev.originator.getContent() + '\' radio button is selected.');
		}
	},
	tabActivated: function (sender, ev) {
		if (ev.originator.getActive()) {
			this.$.result.setContent('The \'' + ev.originator.getContent() + '\' tab button is selected.');
		}
	},
	buttonActivated: function (sender, ev) {
		if (ev.originator.getActive()) {
			this.$.result.setContent('The \'' + ev.originator.getContent() + '\' button is selected.');
		}
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

},{'./SampleList':'../strawman/SampleList'}],'src/ContextualPopupSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	FittableColumns = require('layout/FittableColumns'),
	ContextualPopup = require('onyx/ContextualPopup'),
	IconButton = require('onyx/IconButton'),
	MenuDecorator = require('onyx/MenuDecorator'),
	Toolbar = require('onyx/Toolbar'),
	Scroller = require('enyo/Scroller');

module.exports = kind({
	name: 'onyx.sample.ContextualPopupSample',
	kind: FittableRows,
	classes: 'onyx enyo-fit',
	handlers: {
		ontap: 'tapHandler'
	},
	components: [
		{kind: Toolbar, name: 'topToolbar', classes: 'onyx-menu-toolbar', style: 'background-color:lightgray', components: [
			{kind: FittableColumns, style: 'width:100%;', components: [
				{kind: MenuDecorator, components: [
					{kind: IconButton, src: 'assets/menu-icon-bookmark.png'},
					{kind: ContextualPopup, title: 'Toolbar Button', floating: true, actionButtons: [
						{content: 'test1',	classes: 'onyx-button-warning'},
						{content: 'test2'}
					], components: [
						{content: 'testing 1'},
						{content: 'testing 2'}
					]}
				]},
				{kind: MenuDecorator, fit: true, style: 'position:absolute;right:0;', components: [
					{kind: IconButton, src: 'assets/menu-icon-bookmark.png'},
					{kind: ContextualPopup, title: 'Toolbar Button', floating: true, actionButtons: [
						{content: 'test1', classes: 'onyx-button-warning'},
						{content: 'test2'}
					], components: [
						{content: 'testing 1'},
						{content: 'testing 2'},
						{content: 'testing 3'},
						{content: 'testing 4'},
						{content: 'testing 5'},
						{content: 'testing 6'}
					]}
				]}
			]}
		]},
		{kind: Scroller, fit: true, thumb: false, components: [
			{name: 'buttonContainer', kind: FittableRows, classes: 'onyx-contextualpopup-button-container enyo-fit', components: [
				//Top row of buttons
				{components: [
					{kind: MenuDecorator, style: 'display:inline-block', components: [
						{content: 'Average'},
						{kind: ContextualPopup, title: 'Average', floating: true, actionButtons: [
							{content: 'Press Me'}
						], components: [
							{content: 'Item 1'},
							{content: 'Item 2'},
							{content: 'Item 3'},
							{content: 'Item 4'},
							{content: 'Item 5'}
						]}
					]},
					{kind: MenuDecorator, style: 'display:inline-block;float:right', components: [
						{content: 'Small'},
						{kind: ContextualPopup, title: 'Small', floating: true}
					]}
				]},
				//Center row of buttons
				{fit: true, style: 'padding-top:15%;padding-bottom:15%;', components: [
					{kind: MenuDecorator, style: 'display:inline-block;', components: [
						{content: 'Wide'},
						{kind: ContextualPopup, title: 'Wide', style: 'width:300px', floating: true, actionButtons: [
							{content: 'test1', classes: 'onyx-button-warning'},
							{content: 'test2'}
						], components: [
							{kind: Scroller, style: 'min-width:150px;', horizontal: 'auto', touch: true, thumb: false, components: [
								{content: 'testing 1'},
								{content: 'testing 2'}
							]}
						]}
					]},
					{kind: MenuDecorator, style: 'display:inline-block;float:right', components: [
						{content: 'Long'},
						{kind: ContextualPopup, maxHeight: '200', title: 'Long', floating: true, actionButtons: [
							{content: 'Press Me'}
						], components: [
							{content: 'testing 1'},
							{content: 'testing 2'},
							{content: 'testing 3'},
							{content: 'testing 4'},
							{content: 'testing 5'},
							{content: 'testing 6'},
							{content: 'testing 7'},
							{content: 'testing 8'},
							{content: 'testing 9'},
							{content: 'testing 10'},
							{content: 'testing 11'},
							{content: 'testing 12'},
							{content: 'testing 13'},
							{content: 'testing 14'},
							{content: 'testing 15'},
							{content: 'testing 16'},
							{content: 'testing 17'},
							{content: 'testing 18'},
							{content: 'testing 19'},
							{content: 'testing 20'},
							{content: 'testing 21'},
							{content: 'testing 22'},
							{content: 'testing 23'},
							{content: 'testing 24'},
							{content: 'testing 25'},
							{content: 'testing 26'},
							{content: 'testing 27'},
							{content: 'testing 28'},
							{content: 'testing 29'},
							{content: 'testing 30'}
						]}
					]}
				]},
				//Bottom row of buttons
				{components: [
					{kind: MenuDecorator, style: 'display:inline-block;', components: [
						{content: 'Press Me'},
						{kind: ContextualPopup, title: 'Press Me', floating: true, style: 'width:200px', actionButtons: [
							{content: 'test1', classes: 'onyx-button-warning'},
							{content: 'test2'}
						], components: [
							{content: 'testing 1'},
							{content: 'testing 2'},
							{content: 'testing 3'},
							{content: 'testing 4'},
							{content: 'testing 5'},
							{content: 'testing 6'},
							{content: 'testing 7'},
							{content: 'testing 8'},
							{content: 'testing 9'},
							{content: 'testing 10'}
						]}
					]},
					{kind: MenuDecorator, style: 'display:inline-block;float:right', components: [
						{content: 'Try Me'},
						{kind: ContextualPopup, style: 'width:250px', title: 'Try Me', floating: true, actionButtons: [
							{content: 'Do Nothing', classes: 'onyx-button-warning'},
							{content: 'Dismiss', ontap: 'dismissTap'}
						], components: [
							{content: 'Item 1'},
							{content: 'Item 2'},
							{content: 'Item 3'},
							{content: 'Item 4'},
							{content: 'Item 5'}
						]}
					]}
				]}
			]}
		]},
		{kind: Toolbar, name: 'bottomToolbar', classes: 'onyx-menu-toolbar', style: 'background-color:lightgray', components: [
			{kind: FittableColumns, style: 'width:100%;', components: [
				{kind: MenuDecorator, components: [
					{kind: IconButton, src: 'assets/menu-icon-bookmark.png'},
					{kind: ContextualPopup, title: 'Toolbar Button', floating: true, actionButtons: [
						{content: 'test1', classes: 'onyx-button-warning'},
						{content: 'test2'}
					], components: [
						{content: 'testing 1'},
						{content: 'testing 2'},
						{content: 'testing 3'},
						{content: 'testing 4'},
						{content: 'testing 5'},
						{content: 'testing 6'}
					]}
				]},
				{kind: MenuDecorator, fit: true, style: 'position:absolute;right:0;', components: [
					{kind: IconButton, src: 'assets/menu-icon-bookmark.png'},
					{kind: ContextualPopup, name: 'facebook', title: 'Toolbar Button', floating: true, actionButtons: [
						{content: 'test1', classes: 'onyx-button-warning'},
						{content: 'Dismiss', name: 'dismiss_button'}
					], components: [
						{content: 'testing 1'},
						{content: 'testing 2'},
						{content: 'testing 3'},
						{content: 'testing 4'},
						{content: 'testing 5'},
						{content: 'testing 6'}
					]}
				]}
			]}
		]}
	],
	dismissTap: function (sender, ev) {
		this.log(sender.name, 'action button tapped');
		sender.popup.hide();
		return true;
	},
	tapHandler: function (sender, ev) {
		if (ev.originator.actionButton) {
			this.log(ev.originator.popup); //info about popup it's coming from
			this.log('action button name: ' + ev.originator.name); //name of action button (you can set this - see example use below)

			if (ev.originator.name == 'dismiss_button') {
				ev.originator.popup.hide();
			}
		}
	}
});

}],'src/MenuSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('onyx/Button'),
	Groupbox = require('onyx/Groupbox'),
	GroupboxHeader = require('onyx/GroupboxHeader'),
	IconButton = require('onyx/IconButton'),
	Menu = require('onyx/Menu'),
	MenuDecorator = require('onyx/MenuDecorator'),
	MenuItem = require('onyx/MenuItem'),
	Toolbar = require('onyx/Toolbar'),
	Scroller = require('enyo/Scroller'),
	TouchScrollStrategy = require('enyo/TouchScrollStrategy');

module.exports = kind({
	name: 'onyx.sample.MenuSample',
	classes: 'onyx onyx-sample',
	components: [
		{classes: 'onyx-sample-divider', content: 'Menus in Toolbars'},
		{kind: Toolbar, classes: 'onyx-menu-toolbar', components: [
			{kind: MenuDecorator, onSelect: 'itemSelected', components: [
				{kind: IconButton, src: 'assets/menu-icon-bookmark.png'},
				{kind: Menu, components: [
					{components: [
						{kind: IconButton, src: 'assets/menu-icon-bookmark.png'},
						{content: 'Bookmarks'}
					]},
					{content: 'Favorites'},
					{classes: 'onyx-menu-divider'},
					{content: 'Recents'}
				]}
			]},
			{kind: MenuDecorator, onSelect: 'itemSelected', components: [
				{content: 'Bookmarks menu'},
				{kind: Menu, components: [
					{components: [
						{kind: IconButton, src: 'assets/menu-icon-bookmark.png'},
						{content: 'Bookmarks'}
					]},
					{content: 'Favorites'},
					{classes: 'onyx-menu-divider'},
					{content: 'Recents'}
				]}
			]}
		]},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'Menus from Buttons'},
		{kind: MenuDecorator, onSelect: 'itemSelected', components: [
			{content: 'Popup menu (floating)'},
			{kind: Menu, floating: true, components: [
				{content: '1'},
				{content: '2'},
				{classes: 'onyx-menu-divider'},
				{content: '3'}
			]}
		]},
		{tag: 'br'},
		{kind: MenuDecorator, onSelect: 'itemSelected', components: [
			{content: 'Scrolling Popup menu'},
			{kind: Menu, components: [
				{name: 'menuScroller', kind: Scroller, defaultKind: MenuItem, vertical: 'auto', classes: 'enyo-unselectable', maxHeight: '200px', strategyKind: TouchScrollStrategy, components: [
					{content: '1'},
					{content: '2'},
					{classes: 'onyx-menu-divider'},
					{content: '3'},
					{content: '4'},
					{content: '5'},
					{classes: 'onyx-menu-divider'},
					{content: '6'},
					{content: '7'}
				]}
			]}
		]},
		{tag: 'br'},
		{kind: MenuDecorator, onSelect: 'itemSelected', components: [
			{content: 'Split Popup menu', kind: Button, onActivate: 'preventMenuActivate', style: 'border-radius: 3px 0 0 3px;'},
			{content: 'v', allowHtml: true, style: 'border-radius: 0 3px 3px 0;'},
			{kind: Menu, components: [
				{content: '1'},
				{content: '2'},
				{classes: 'onyx-menu-divider'},
				{content: '3'}
			]}
		]},
		{tag: 'br'},
		{kind: Groupbox, classes: 'onyx-sample-result-box', components: [
			{kind: GroupboxHeader, content: 'Result'},
			{name: 'menuSelection', classes: 'onyx-sample-result', content: 'No menu selection yet.'}
		]}
	],
	showPopup: function (sender) {
		var p = this.$[sender.popup];
		if (p) {
			p.show();
		}
	},
	preventMenuActivate: function () {
		return true;
	},
	itemSelected: function (sender, ev) {
		// Menu items send an onSelect event with a reference to themselves & any directly displayed content
		if (ev.originator.content) {
			this.$.menuSelection.setContent(ev.originator.content + ' Selected');
		} else if (ev.selected) {
			//	Since some of the menu items do not have directly displayed content (they are kinds with subcomponents),
			//	we have to handle those items differently here.
			this.$.menuSelection.setContent(ev.selected.controlAtIndex(1).content + ' Selected');
		}
	}
});
}],'src/SubmenuSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Groupbox = require('onyx/Groupbox'),
	GroupboxHeader = require('onyx/GroupboxHeader'),
	Menu = require('onyx/Menu'),
	MenuDecorator = require('onyx/MenuDecorator'),
	Submenu = require('onyx/Submenu');

module.exports = kind({
	name: 'onyx.sample.SubmenuSample',
	classes: 'onyx onyx-sample',
	components: [
		{classes: 'onyx-sample-divider', content: 'Submenu'},
		{kind: MenuDecorator, onSelect: 'itemSelected', components:[
			{content: 'Contact actions'},
			{kind: Menu, components:[
				{content: 'Add contact'},
				{kind: Submenu, content: 'Sort by...', components:[
					{content: 'First Name'},
					{content: 'Last Name'},
					{content: 'Company'}
				]},
				{content: 'Sync'}
			]}
		]},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'Nested Submenu'},
		{kind: MenuDecorator, onSelect: 'itemSelected', components: [
			{content: 'Email actions'},
			{kind: Menu, components: [
				{content: 'Reply'},
				{content: 'Forward'},
				{kind: Submenu, content: 'Move to...', components:[
					{kind: Submenu, content: 'Personal...', components:[
						{content: 'Games'},
						{content: 'Recpies'}
					]},
					{kind: Submenu, content: 'Work...', components:[
						{content: 'Primary project'},
						{content: 'Super secret project'}
					]}
				]},
				{content: 'Delete'}
			]}
		]},
		{tag: 'br'},
		{kind: Groupbox, classes: 'onyx-sample-result-box', components: [
			{kind: GroupboxHeader, content: 'Result'},
			{name: 'menuSelection', classes: 'onyx-sample-result', content: 'No menu selection yet.'}
		]}
	],
	itemSelected: function (sender, ev) {
		this.$.menuSelection.setContent(ev.originator.content + ' Selected');
	}
});

}],'src/TooltipSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('onyx/Button'),
	IconButton = require('onyx/IconButton'),
	Input = require('onyx/Input'),
	InputDecorator = require('onyx/InputDecorator'),
	Menu = require('onyx/Menu'),
	MenuDecorator = require('onyx/MenuDecorator'),
	Toolbar = require('onyx/Toolbar'),
	Tooltip = require('onyx/Tooltip'),
	TooltipDecorator = require('onyx/TooltipDecorator');

module.exports = kind({
	name: 'onyx.sample.TooltipSample',
	classes: 'onyx onyx-sample',
	handlers: {
		onSelect: 'itemSelected'
	},
	components: [
		{classes: 'onyx-sample-divider', content: 'Tooltips on Toolbar'},
		{kind: Toolbar, classes: 'onyx-menu-toolbar', components: [
			{kind: TooltipDecorator, components: [
				{kind: Button, content: 'Tooltip'},
				{kind: Tooltip, content: 'I\'m a tooltip for a button.'}
			]},
			{kind: TooltipDecorator, components: [
				{kind: InputDecorator, components: [
					{kind: Input, style: 'width: 130px;', placholder: 'Just an input...'}
				]},
				{kind: Tooltip, content: 'I\'m a tooltip for an input.'}
			]}
		]},
		{tag: 'br'},
		{kind: Toolbar, classes: 'onyx-menu-toolbar', components: [
			{kind: MenuDecorator, components: [
				{kind: IconButton, src: 'assets/menu-icon-bookmark.png'},
				{kind: Tooltip, content: 'Bookmarks menu'},
				{kind: Menu, components: [
					{components: [
						{kind: IconButton, src: 'assets/menu-icon-bookmark.png'},
						{content: 'Bookmarks'}
					]},
					{content: 'Favorites'},
					{classes: 'onyx-menu-divider'},
					{content: 'Recents'}
				]}
			]},
			{kind: MenuDecorator, components: [
				{content: 'Bookmarks menu'},
				{kind: Tooltip, content: 'Tap to open...'},
				{kind: Menu, components: [
					{components: [
						{kind: IconButton, src: 'assets/menu-icon-bookmark.png'},
						{content: 'Bookmarks'}
					]},
					{content: 'Favorites'},
					{classes: 'onyx-menu-divider'},
					{content: 'Recents'}
				]}
			]}
		]},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'Tooltips on items'},
		{kind: TooltipDecorator, components: [
			{kind: Button, content: 'Tooltip'},
			{kind: Tooltip, content: 'I\'m a tooltip for a button.'}
		]},
		{tag: 'br'},
		{kind: TooltipDecorator, components: [
			{kind: InputDecorator, components: [
				{kind: Input, style: 'width: 130px;', placholder: 'Just an input...'}
			]},
			{kind: Tooltip, content: 'I\'m a tooltip for an input.'}
		]},
		{tag: 'br'},
		{kind: MenuDecorator, components: [
			{kind: IconButton, src: 'assets/menu-icon-bookmark.png'},
			{kind: Tooltip, content: 'Bookmarks menu'},
			{kind: Menu, components: [
				{components: [
					{kind: IconButton, src: 'assets/menu-icon-bookmark.png'},
					{content: 'Bookmarks'}
				]},
				{content: 'Favorites'},
				{classes: 'onyx-menu-divider'},
				{content: 'Recents'}
			]}
		]},
		{tag: 'br'},
		{kind: MenuDecorator, components: [
			{content: 'Bookmarks menu'},
			{kind: Tooltip, content: 'Tap to open...'},
			{kind: Menu, components: [
				{components: [
					{kind: IconButton, src: 'assets/menu-icon-bookmark.png'},
					{content: 'Bookmarks'}
				]},
				{content: 'Favorites'},
				{classes: 'onyx-menu-divider'},
				{content: 'Recents'}
			]}
		]}
	]
});
}],'src/MoreToolbarSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	Button = require('onyx/Button'),
	Input = require('onyx/Input'),
	InputDecorator = require('onyx/InputDecorator'),
	MoreToolbar = require('onyx/MoreToolbar');

module.exports = kind({
	name: 'onyx.sample.MoreToolbarSample',
	classes: 'onyx onyx-sample',
	kind: FittableRows,
	fit: true,
	components: [
		{kind: MoreToolbar, components: [
			{content: 'More Toolbar', unmoveable: true},
			{kind: Button, content: 'Alpha'},
			{kind: Button, content: 'Beta'},
			{kind: Button, content: 'Gamma', unmoveable: true},
			{kind: Button, content: 'Epsilon'},
			{kind: Button, content: 'Othercon'},
			{kind: InputDecorator, components: [
				{kind: Input, placeholder: 'pulez'}
			]},
			{kind: Button, content: 'Maxizon'}
		]},
		{fit: true, style: 'background: lightpurple;padding:25px;', components: [
			{content: 'The \'More Toolbar\' label and the Gamma button have the unmoveable property set to true.'}
		]},
		{kind: MoreToolbar, components: [
			{content: 'More Toolbar', unmoveable: true},
			{kind: Button, content: 'Alpha'},
			{kind: Button, content: 'Beta'},
			{kind: Button, content: 'Gamma', unmoveable: true},
			{kind: Button, content: 'Epsilon'},
			{kind: Button, content: 'Othercon'},
			{kind: InputDecorator, components: [
				{kind: Input, placeholder: 'pulez'}
			]},
			{kind: Button, content: 'Maxizon'}
		]}
	]
});
}],'src/ToolbarSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('onyx/Button'),
	Grabber = require('onyx/Grabber'),
	Input = require('onyx/Input'),
	InputDecorator = require('onyx/InputDecorator'),
	MoreToolbar = require('onyx/MoreToolbar'),
	Toolbar = require('onyx/Toolbar'),
	Scroller = require('enyo/Scroller');

module.exports = kind({
	name: 'onyx.sample.ToolbarSample',
	classes: 'onyx onyx-sample',
	components: [
		{classes: 'onyx-sample-divider', content: 'ToolBar'},
		{kind: Toolbar, components: [
			{kind: Grabber},
			{content: 'Header'},
			{kind: Button, content: 'Button'},
			{kind: Button, content: 'Down', classes: 'active'},
			{kind: Button, content: 'Button'},
			{kind: InputDecorator, components: [
				{kind: Input, placeholder: 'Input'}
			]},
			{kind: Button, content: 'Right'},
			{kind: InputDecorator, components: [
				{kind: Input, placeholder: 'Right Input'}
			]},
			{kind: Button, content: 'More Right'},
			{content: 'There\'s more'},
			{kind: Button, content: 'Far Right'}
		]},
		{tag: 'br'},

		{classes: 'onyx-sample-divider', content: 'Scrolling ToolBar'},
		{kind: Scroller, classes: 'onyx-toolbar', touchOverscroll: false, touch: true, vertical: 'hidden', style: 'margin: 0px;', thumb: false, components: [
			{classes: 'onyx-toolbar-inline', style: 'white-space: nowrap;', components: [
				{kind: Grabber},
				{content: 'Header'},
				{kind: Button, content: 'Button'},
				{kind: Button, content: 'Down', classes: 'active'},
				{kind: Button, content: 'Button'},
				{kind: InputDecorator, components: [
					{kind: Input, placeholder: 'Input'}
				]},
				{kind: Button, content: 'Right'},
				{kind: InputDecorator, components: [
					{kind: Input, placeholder: 'Right Input'}
				]},
				{kind: Button, content: 'More Right'},
				{content: 'There\'s more'},
				{kind: Button, content: 'Far Right'}
			]}
		]},
		{tag: 'br'},

		{classes: 'onyx-sample-divider', content: 'More ToolBar'},
		{kind: MoreToolbar, components: [
			{kind: Grabber},
			{content: 'Header'},
			{kind: Button, content: 'Button'},
			{kind: Button, content: 'Down', classes: 'active'},
			{kind: Button, content: 'Button'},
			{kind: InputDecorator, components: [
				{kind: Input, placeholder: 'Input'}
			]},
			{kind: Button, content: 'Right'},
			{kind: InputDecorator, components: [
				{kind: Input, placeholder: 'Right Input'}
			]},
			{kind: Button, content: 'More Right'},
			{content: 'There\'s more'},
			{kind: Button, content: 'Far Right'}
		]}
	]
});
}],'src/TabBarSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	Button = require('onyx/Button'),
	Popup = require('onyx/Popup'),
	TabBar = require('onyx/TabBar'),
	Control = require('enyo/Control');

var SimpleTabBar = kind({
	name: 'SimpleTabBar',
	kind: Control,
	fit: true,
	components: [
		{name: 'bar',kind: TabBar},
		{style: 'border: 2px solid grey; ', components: [
			{content: 'Only the content of this kind is changed', style: 'padding: 1em'},
			{name: 'stuff', content: 'empty', style: 'padding: 1em'}
		]}
	],

	handlers: {
		onTabChanged: 'switchStuff'
	},

	rendered: function () {
		Control.prototype.rendered.apply(this, arguments);
		this.$.bar.addTab(
			{'caption': 'English', 'tooltipMsg': 'English/Anglais', 'data': {'msg': 'Hello World !'}}
		);
		this.$.bar.addTab(
			{'caption': 'Français', 'tooltipMsg': 'French/Français', 'data': {'msg': 'Bonjour tout le monde !'}}
		);
	},

	switchStuff: function (sender, ev) {
		this.log('Tapped tab with caption ' + ev.caption + ' and message ' + ev.data.msg);
		this.$.stuff.setContent(ev.data.msg);
	}
});

var DynamicTabBar = kind({
		name: 'DynamicTabBar',
		kind: Control,
		fit: true,
		components: [
			{name: 'bar', kind: TabBar, maxMenuHeight: 200},
			{style: 'border: 2px solid grey; ', components: [
				{content: 'create many tabs and reduce the width of the browser'},
				{name: 'stuff', content: 'empty', style: 'padding: 1em'},
				{kind: Button, content: 'create tab', ontap: 'addATab', style: 'margin: 0.5em'},
				{kind: Button, content: 'kill last tab', ontap: 'killTab'}
			]}
		],

		handlers: {
			onTabChanged: 'switchStuff'
		},

		number: 1,
		rendered: function () {
			Control.prototype.rendered.apply(this, arguments);
			var date = new Date();
			this.creationTime = date.getTime();
			this.addATab() ;
		},

		addATab: function (sender, ev) {
			this.log('adding a tab');
			var date = new Date();
			var delta = (date.getTime() - this.creationTime) / 1000;
			this.$.bar.addTab({'caption': 'Tab label ' + this.number, data: {
				msg: 'tab ' + this.number++ + ' created after ' + delta + ' seconds'
			}});
		},

		switchStuff: function (sender, ev) {
			this.log('Tapped tab with caption ' + ev.caption + ' and message ' + ev.data.msg );
			this.$.stuff.setContent( ev.data.msg);
		},
		killTab: function (sender, ev) {
			this.log('killing tab');
			this.$.bar.removeTab({index: this.number-- - 2});
		}
	}
);

// This class shows how actual switch or actual close can be controlled
// from the application. In the example below, these are controlled by a
// 500ms timer.

var DelayedTabBar = kind({
	name: 'DelayedTabBar',
	kind: Control,
	fit: true,
	components: [
		{name: 'bar', kind: TabBar, checkBeforeChanging: true, checkBeforeClosing: true},
		{style: 'border: 2px solid grey;', components: [
			{content: 'Only the content of this kind is changed', style: 'padding: 1em'},
			{name: 'stuff', content: 'empty', style: 'padding: 1em'}
		]},
		{name: 'delayPopup', kind: Popup, modal: true, floating: true, centered: true, content: 'delayed'}
	],

	handlers: {
		// for convenienve, the same delay is applied to tabChange and close
		// Of course, different handlers can be used.
		onTabChangeRequested: 'delayAction',
		onTabChanged:         'updateContent',
		onTabRemoveRequested: 'delayAction'
	},

	rendered: function () {
		Control.prototype.rendered.apply(this, arguments);
		// With apologies to Morris and Goscinny
		var names = ['Joe', 'Jack', 'William', 'Averell'];

		var add = function (name) {
			this.$.bar.addTab({
				'caption': name,
				'data' : { 'msg': 'Hello ' + name } // arbitrary user data
			});
		};
		utils.forEach(names, add, this);
	},

	delayAction: function (sender, ev) {
		this.log('Tapped tab with caption ' + ev.caption + ' and message ' + ev.data.msg );
		this.$.delayPopup.show();
		setTimeout(this.bindSafely(this.resumeAction, sender, ev), 500);
	},
	resumeAction: function (sender, ev) {
		this.$.delayPopup.hide();
		this.$.stuff.setContent(ev.data.msg);
		ev.next(); // call ev.next(error) is abort is needed
	},
	updateContent: function (sender, ev) {
		this.$.stuff.setContent( ev.data.msg);
	}
});

module.exports = kind({
	name: 'onyx.sample.TabBarSample',
	classes: 'onyx onyx-sample',
	components: [
		{classes: 'onyx-sample-divider', content: 'Simple Tab Bar'},
		{kind: SimpleTabBar},
		{classes: 'onyx-sample-divider', content: 'Dynamic Tab Bar', style: 'padding-top: 4em;'},
		{kind: DynamicTabBar},
		{classes: 'onyx-sample-divider', content: 'Delayed Tab Bar', style: 'padding-top: 4em;'},
		{kind: DelayedTabBar}
	]
});

module.exports.badgeClasses = 'wip';

}],'src/PickerSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	Button = require('onyx/Button'),
	FlyweightPicker = require('onyx/FlyweightPicker'),
	Groupbox = require('onyx/Groupbox'),
	GroupboxHeader = require('onyx/GroupboxHeader'),
	IntegerPicker = require('onyx/IntegerPicker'),
	Picker = require('onyx/Picker'),
	PickerDecorator = require('onyx/PickerDecorator');

module.exports = kind({
	name: 'onyx.sample.PickerSample',
	kind: FittableRows,
	classes: 'onyx onyx-sample',
	handlers: {
		onSelect: 'itemSelected'
	},
	components: [
		{content: 'Default Picker', classes:'onyx-sample-divider'},
		{kind: PickerDecorator, components: [
			{},
			{kind: Picker, components: [
				{content: 'Gmail', active: true},
				{content: 'Yahoo'},
				{content: 'Outlook'},
				{content: 'Hotmail'}
			]}
		]},
		{tag: 'br'},
		{content: 'Picker with Static Button', classes:'onyx-sample-divider'},
		{kind: PickerDecorator, components: [
			{kind: Button, content: 'Pick One...', style: 'width: 200px'},
			{kind: Picker, components: [
				{content: 'Hello!'},
				{content: 'I am busy.'},
				{content: 'Good Bye.'}
			]}
		]},
		{tag: 'br'},
		{content: 'Integer Picker', classes:'onyx-sample-divider'},
		{classes: 'onyx-toolbar-inline', components: [
			{kind: PickerDecorator, components: [
				{style: 'min-width: 60px;'},
				{kind: IntegerPicker, min: 0, max: 25, value: 5}
			]}
		]},
		{tag: 'br'},
		{content: 'Other Pickers', classes:'onyx-sample-divider'},
		{classes: 'onyx-toolbar-inline', components: [
			{content: 'JS Library', classes: 'onyx-sample-label'},
			{kind: PickerDecorator, components: [
				{name:'libPickerButton', style: 'min-width: 160px;'},
				{name: 'libPicker', kind: FlyweightPicker, count: 200, onSetupItem: 'setupLibs', components: [
					{name: 'lib'}
				]}
			]}
		]},
		{tag: 'br'},
		{classes: 'onyx-toolbar-inline', components: [
			{kind: PickerDecorator, components: [
				{},
				{kind: Picker, components: [
					{content: 'Gmail'},
					{content: 'Yahoo'},
					{content: 'Outlook'},
					{content: 'Hotmail', active: true}
				]}
			]}
		]},
		{tag: 'br'},
		{kind: Groupbox, classes:'onyx-sample-result-box', components: [
			{kind: GroupboxHeader, content: 'Selection'},
			{name:'pickerSelection', classes:'onyx-sample-result', content: 'Nothing picked yet.'}
		]}
	],
	libs: ['Enyo', 'AngularJS', 'Backbone.js', 'Dojo', 'Ember.js', 'Ext JS', 'Google Web Toolkit', 'Knockout', 'SproutCore', 'Spine', 'Yahoo! Mojito', 'AccDC', 'Dojo Toolkit', 'Glow', 'jQuery', 'jQuery Mobile', 'midori', 'MooTools', 'Prototype JavaScript Framework', 'YUI Library', 'Ample SDK', 'DHTMLX', 'iX Framework', 'jQuery UI', 'Lively Kernel', 'qooxdoo', 'Script.aculo.us', 'SmartClient', 'D3.js', 'JavaScript InfoVis Toolkit', 'Kinetic.js', 'Processing.js', 'Raphael', 'SWFObject', 'Three.js', 'EaseIJS', 'Chaplin.js', 'Echo', 'JavaScriptMVC', 'Rialto Toolkit', 'Web Atoms JS', 'FuncJS', 'Google Closure Library', 'Joose', 'jsPHP', 'MochiKit', 'PDF.js', 'Rico', 'Socket.IO', 'Spry framework', 'Underscore.js', 'Wakanda Framework', 'Cascade Framework', 'Handlebars', 'Mustache', 'Twitter Bootstrap', 'ZURB Foundation', 'Modernizr'],
	create: function () {
		FittableRows.prototype.create.apply(this, arguments);
		this.$.libPicker.setSelected(0);
		this.$.libPickerButton.setContent(this.libs[this.$.libPicker.getSelected()]);
	},
	setupLibs: function (sender, ev) {
		this.$.lib.setContent(this.libs.length > ev.index ? this.libs[ev.index] : 'JS Library ' + (ev.index-this.libs.length));
		return true;
	},
	itemSelected: function (sender, ev) {
		this.$.pickerSelection.setContent(ev.selected.content);
	}
});
}],'src/TabPanelSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('onyx/Button'),
	TabPanels = require('onyx/TabPanels'),
	Control = require('enyo/Control');

var SimpleTabPanel = kind({
	kind: TabPanels,
	style: 'height: 150px;',
	fit: true,
	components: [
		{name: 'Blue welcome', 'caption': 'Blue', style: 'height: 100px; border: 2px solid grey; padding: 20px; color: blue', content: 'The whole kind is changed: Blue Hello World !'},
		{name: 'Red welcome', 'caption': 'Red', style: 'height: 100px; border: 2px solid grey; padding: 20px; color: red', content: 'The whole kind is changed: Red Hello World !'}
	]
});

var DynamicTabPanel = kind({
	kind: TabPanels,
	style: 'height: 150px;',
	components: [{
		'caption': 'Tab label 1' ,
		style: 'border: 2px solid grey; padding: 20px;',
		content: 'tab created at startup'
	}]
});

module.exports = kind({
	name: 'onyx.sample.TabPanelSample',
	kind: Control,
	classes: 'onyx onyx-sample',
	components: [
		{classes: 'onyx-sample-divider', content: 'Simple Tab Panel'},
		{kind: SimpleTabPanel},
		{classes: 'onyx-sample-divider', content: 'Dynamic Tab Panel', style: 'padding-top: 4em;'},
		{kind: DynamicTabPanel, name: 'dynamicTP', maxMenuHeight: 200},
		{kind: Button, content: 'create tab', style: 'margin-top: 2em;', ontap: 'addATab'},
		{kind: Button, content: 'kill last tab', ontap: 'killTab', style: 'margin-left: 10px'}
	],

	number: 2, // because 1 tab is create at startup
	create: function () {
		Control.prototype.create.apply(this, arguments);
		var date = new Date();
		this.creationTime = date.getTime();
	},

	addATab: function (sender, ev) {
		this.log('adding a tab');
		var date = new Date();
		var delta = (date.getTime() - this.creationTime) / 1000 ;
		var tooltipMessage = '';
		var contentForTooltip = ' and doesn\'t have a tooltip';
		if (this.number % 2){
			tooltipMessage = 'I\'m a odd tab => ' + this.number;
			contentForTooltip = ' and has a tooltip';
		}
		var added = this.$.dynamicTP.createComponent({
			caption: 'Tab label ' + this.number++,
			tooltipMsg: tooltipMessage,
			style: 'border: 2px solid grey; padding: 20px;',
			content: 'tab created after ' + delta + ' seconds' + contentForTooltip
		});
		this.render();
		this.$.dynamicTP.addTab(added);
	},
	killTab: function (sender, ev) {
		this.log('killing tab');
		this.$.dynamicTP.removeTab({index: this.number-- - 2});
	}
});

module.exports.badgeClasses = 'wip';

}],'src/TimePickerSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	i18n = require('enyo/i18n'),
	$L = i18n.$L;

var
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows');

var
	DateFmt = require('enyo-ilib/DateFmt');

var
	Button = require('onyx/Button'),
	Groupbox = require('onyx/Groupbox'),
	GroupboxHeader = require('onyx/GroupboxHeader'),
	Picker = require('onyx/Picker'),
	PickerDecorator = require('onyx/PickerDecorator'),
	TimePicker = require('onyx/i18n/TimePicker'),
	Toolbar = require('onyx/Toolbar');

module.exports = kind({
	name: 'onyx.sample.TimePickerSample',
	kind: FittableRows,
	classes: 'onyx enyo-fit',
	handlers: {
		onSelect: 'updateTimeValues'
	},
	components: [
		{kind: Toolbar, content:$L('Times')},
		{kind: FittableColumns, style: 'padding: 10px', components:[
			{components: [
				{content: $L('Choose Locale: '), classes: 'onyx-sample-divider'},
				{kind: PickerDecorator, style: 'padding: 10px;', onSelect: 'localeChanged', components: [
					{content: 'Pick One...', style: 'width: 200px'},
					{kind: Picker, name: 'localePicker', components: [
						{content: 'en-US', active: true},
						{content: 'en-CA'},
						{content: 'en-IE'},
						{content: 'en-GB'},
						{content: 'en-MX'},
						{content: 'de-DE'},
						{content: 'fr-FR'},
						{content: 'fr-CA'},
						{content: 'it-IT'},
						{content: 'es-ES'},
						{content: 'es-MX'},
						{content: 'es-US'},
						{content: 'ko-KR'},
						{content: 'ja-JP'},
						{content: 'zh-HK'}
					]}
				]}
			]}
		]},

		{kind: Button, content: 'Reset Times', ontap: 'resetTimes'},

		{style: 'width: 100%;height: 5px;background-color: black;margin-bottom: 5px;'},
		{caption: 'Dates', style: 'padding: 10px', components:
		[
			{content: 'TIME', classes: 'onyx-sample-divider'},
			{classes: 'onyx-toolbar-inline', components: [
				{name: 'timePicker1', kind: TimePicker}
			]},
			{kind: Groupbox, style: 'padding: 5px;', components: [
				{kind: GroupboxHeader, content: 'Value'},
				{name: 'timePicker1Value', style: 'padding: 15px;'}
			]},
			{content: 'TIME 24 HOUR MODE',classes: 'onyx-sample-divider'},
			{classes: 'onyx-toolbar-inline', components: [
				{name: 'timePicker2', kind: TimePicker, is24HrMode: true}
			]},
			{kind: Groupbox, style: 'padding: 5px;', components: [
				{kind: GroupboxHeader, content: 'Localized Value'},
				{name: 'timePicker2Value', style: 'padding: 15px;'}
			]},
			{content: 'DISABLED', classes: 'onyx-sample-divider'},
			{classes: 'onyx-toolbar-inline', components: [
				{name: 'timePicker3', kind: TimePicker, disabled: true}
			]}
		]}
	],
	rendered: function () {
		FittableRows.prototype.rendered.apply(this, arguments);
		this.localeChanged();
	},
	localeChanged: function () {
		this.fmt = null;
		i18n.updateLocale(this.$.localePicker.get('selected').content);
		this.$.timePicker2.set('is24HrMode', true);
		this.getTimes();
		return true;
	},
	resetTimes: function (date) {
		var d = new Date();
		this.$.timePicker1.setValue(d);
		this.$.timePicker2.setValue(d);
		this.$.timePicker3.setValue(d);

		this.getTimes();
	},
	getTimes: function () {
		this.updateTimeValue(this.$.timePicker1);
		this.updateTimeValue(this.$.timePicker2);
	},
	updateTimeValues: function (sender, ev) {
		this.updateTimeValue(ev);
	},
	updateTimeValue: function (picker) {
		var fmt = this.fmt || new DateFmt({
			type: 'time',
			length: 'short',
			timezone: 'local'
		});

		this.$[picker.name + 'Value'].set('content', fmt.format(picker.value));
	}
});

}],'src/DatePickerSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	i18n = require('enyo/i18n'),
	$L = i18n.$L;

var
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows');

var
	DateFmt = require('enyo-ilib/DateFmt');

var
	Button = require('onyx/Button'),
	DatePicker = require('onyx/i18n/DatePicker'),
	Groupbox = require('onyx/Groupbox'),
	GroupboxHeader = require('onyx/GroupboxHeader'),
	Picker = require('onyx/Picker'),
	PickerDecorator = require('onyx/PickerDecorator'),
	Toolbar = require('onyx/Toolbar');

module.exports = kind({
	name: 'onyx.sample.DatePickerSample',
	kind: FittableRows,
	classes: 'onyx',
	handlers: {
		onSelect: 'updateDateValues'
	},
	components: [
		{kind: Toolbar, content:$L('Dates')},
		{kind: FittableColumns, style: 'padding: 10px', components:[
			{components: [
				{content:$L('Choose Locale: '), classes: 'onyx-sample-divider'},
				{kind: PickerDecorator, style: 'padding: 10px;', onSelect: 'localeChanged', components: [
					{content: 'Pick One...', style: 'width: 200px'},
					{kind: Picker, name: 'localePicker', components: [
						{content: 'en-US', active: true},
						{content: 'en-CA'},
						{content: 'en-IE'},
						{content: 'en-GB'},
						{content: 'en-MX'},
						{content: 'de-DE'},
						{content: 'fr-FR'},
						{content: 'fr-CA'},
						{content: 'it-IT'},
						{content: 'es-ES'},
						{content: 'es-MX'},
						{content: 'es-US'},
						{content: 'ko-KR'},
						{content: 'ja-JP'},
						{content: 'zh-HK'}
					]}
				]}
			]}
		]},
		{kind: Button, content: 'Reset Dates', ontap: 'resetDates'},
		{style: 'width: 100%;height: 5px;background-color: black;margin-bottom: 5px;'},
		{caption: 'Dates', style: 'padding: 10px', components: [
			{content: 'DATE',classes: 'onyx-sample-divider'},
			{classes: 'onyx-toolbar-inline', components: [
				{name: 'datePicker1', kind: DatePicker}
			]},
			{kind: Groupbox, style: 'padding: 5px;', components: [
				{kind: GroupboxHeader, content: 'Value'},
				{name: 'datePicker1Value', style: 'padding: 15px;'}
			]},
			{content: 'DATE W/MIN & MAX YEARS',classes: 'onyx-sample-divider'},
			{classes: 'onyx-toolbar-inline', components: [
				{name: 'datePicker2', kind: DatePicker, minYear: 2010, maxYear: 2020}
			]},
			{kind: Groupbox, style: 'padding: 5px;', components: [
				{kind: GroupboxHeader, content: 'Value'},
				{name: 'datePicker2Value', style: 'padding: 15px;'}
			]},
			{content: 'DATE W/DAYS HIDDEN',classes: 'onyx-sample-divider'},
			{classes: 'onyx-toolbar-inline', components: [
				{name: 'datePicker3', kind: DatePicker, dayHidden: true}
			]},
			{kind: Groupbox, style: 'padding: 5px;', components: [
				{kind: GroupboxHeader, content: 'Value'},
				{name: 'datePicker3Value', style: 'padding: 15px;'}
			]},
			{content: 'DISABLED',classes: 'onyx-sample-divider'},
			{classes: 'onyx-toolbar-inline', components: [
				{name: 'datePicker4', kind: DatePicker, disabled: true}
			]}
		]}
	],
	rendered: function () {
		this.inherited(arguments);
		this.localeChanged();
	},
	localeChanged: function () {
		i18n.updateLocale(this.$.localePicker.get('selected').content);
		this.getDates();
		return true;
	},
	resetDates: function (date) {
		var d = new Date();
		this.$.datePicker1.setValue(d);
		this.$.datePicker2.setValue(d);
		this.$.datePicker3.setValue(d);
		this.$.datePicker4.setValue(d);
		this.getDates();
	},
	getDates: function () {
		this.updateDateValue(this.$.datePicker1);
		this.updateDateValue(this.$.datePicker2);
		this.updateDateValue(this.$.datePicker3);
	},
	updateDateValues: function (sender, ev) {
		this.updateDateValue(ev);
	},
	updateDateValue: function (picker) {
		var fmt = picker.name != 'datePicker3' ? this.format() :  this.format('my');
		this.$[picker.name + 'Value'].setContent(fmt.format(picker.value));
	},
	format: function (dateComponents) {
		var fmt = new DateFmt({
			dateComponents: dateComponents || undefined,
			date: 'short',
			timezone: 'local'
		});
		return fmt;
	}
});

}],'index':[function (module,exports,global,require,request){
require('enyo/options').accessibility = true;

var
	kind = require('enyo/kind'),
	ready = require('enyo/ready'),
	dom = require('enyo/dom');

var
	Onyx = require('onyx');

var
	ScrollingSampleList = require('../strawman/ScrollingSampleList');

var
	samples = {
		ButtonGroupSample		: require('./src/ButtonGroupSample'),
		ButtonSample			: require('./src/ButtonSample'),
		CheckboxSample			: require('./src/CheckboxSample'),
		ContextualPopupSample	: require('./src/ContextualPopupSample'),
		DatePickerSample		: require('./src/DatePickerSample'),
		GroupboxSample			: require('./src/GroupboxSample'),
		IconButtonSample		: require('./src/IconButtonSample'),
		InputSample				: require('./src/InputSample'),
		MenuSample				: require('./src/MenuSample'),
		MoreToolbarSample		: require('./src/MoreToolbarSample'),
		PickerSample			: require('./src/PickerSample'),
		PopupSample				: require('./src/PopupSample'),
		ProgressSample			: require('./src/ProgressSample'),
		SliderSample			: require('./src/SliderSample'),
		SpinnerSample			: require('./src/SpinnerSample'),
		SubmenuSample			: require('./src/SubmenuSample'),
		TabBarSample			: require('./src/TabBarSample'),
		TabPanelSample			: require('./src/TabPanelSample'),
		TimePickerSample		: require('./src/TimePickerSample'),
		ToggleButtonSample		: require('./src/ToggleButtonSample'),
		ToolbarSample			: require('./src/ToolbarSample'),
		TooltipSample			: require('./src/TooltipSample')
	};

var Sample = kind({
	kind: ScrollingSampleList,
	title: 'Onyx Samples',
	version: Onyx.version,
	libraryName: 'Onyx',
	samples: samples
});

ready(function() {
	new Sample().renderInto(document.body);
	dom.removeClass(document.body, 'onyx');
});


},{'../strawman/ScrollingSampleList':'../strawman/ScrollingSampleList','./src/ButtonGroupSample':'src/ButtonGroupSample','./src/ButtonSample':'src/ButtonSample','./src/CheckboxSample':'src/CheckboxSample','./src/ContextualPopupSample':'src/ContextualPopupSample','./src/DatePickerSample':'src/DatePickerSample','./src/GroupboxSample':'src/GroupboxSample','./src/IconButtonSample':'src/IconButtonSample','./src/InputSample':'src/InputSample','./src/MenuSample':'src/MenuSample','./src/MoreToolbarSample':'src/MoreToolbarSample','./src/PickerSample':'src/PickerSample','./src/PopupSample':'src/PopupSample','./src/ProgressSample':'src/ProgressSample','./src/SliderSample':'src/SliderSample','./src/SpinnerSample':'src/SpinnerSample','./src/SubmenuSample':'src/SubmenuSample','./src/TabBarSample':'src/TabBarSample','./src/TabPanelSample':'src/TabPanelSample','./src/TimePickerSample':'src/TimePickerSample','./src/ToggleButtonSample':'src/ToggleButtonSample','./src/ToolbarSample':'src/ToolbarSample','./src/TooltipSample':'src/TooltipSample'}]
	};

});
//# sourceMappingURL=onyx-samples.js.map