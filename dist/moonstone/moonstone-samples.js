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


}],'src/TableSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	Control = require('enyo/Control'),
	Divider = require('moonstone/Divider'),
	Table = require('moonstone/Table');

module.exports = kind({
	name: 'moon.sample.TableSample',
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Divider, content: 'Static Table'},
		{kind: Table, components: [
			{classes: 'header', components: [
				{content: 'Question'},
				{content: 'Agree'},
				{content: 'Indifferent'},
				{content: 'Disagree'}
			]},
			{classes: 'moon-body-text', components: [
				{content: 'When should tables be used?'},
				{content: 'Always'},
				{content: 'Sometimes'},
				{content: 'Never'}
			]},
			{classes: 'moon-body-text', components: [
				{content: 'How cool are tables?'},
				{content: 'Very'},
				{content: 'A little'},
				{content: 'Not at all'}
			]}
		]},
		{tag: 'br'},
		{kind: Divider, content: 'Generated Table'},
		{name: 'month', classes: 'section'},
		{name: 'calendarTable', kind: Table, components: [
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
		Control.prototype.create.apply(this, arguments);

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
		// the calendar to display a "full" table
		for (var i=0; i<lastDate+offset+(((lastDate+offset)%7)?7-((lastDate+offset)%7):0); i++) {
			if (i%7 === 0) {
				currentRow = this.$.calendarTable.createComponent({});
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

}],'src/DividerSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Divider = require('moonstone/Divider'),
	Item = require('moonstone/Item');

module.exports = kind({
	name: 'moon.sample.DividerSample',
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{classes:'moon-4h', components: [
			{kind: Divider, content: 'Divider 1'},
			{kind: Item, content: 'Item 1'},
			{kind: Item, content: 'Item 2'},
			{kind: Item, content: 'Item 3'},
			{kind: Item, content: 'Item 4'},

			{classes:'moon-1v'}, // Spacer

			{kind: Divider, content: 'Divider 2'},
			{kind: Item, content: 'Item 1'},
			{kind: Item, content: 'Item 2'},

			{classes:'moon-1v'}, // Spacer

			{kind: Divider, content: 'Very Long Divider with truncation'},
			{kind: Item, content: 'Item 1'},
			{kind: Item, content: 'Item 2'}
		]}
	]
});
}],'src/ProgressButtonSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('moonstone/Button'),
	CheckboxItem = require('moonstone/CheckboxItem'),
	Divider = require('moonstone/Divider'),
	Input = require('moonstone/Input'),
	InputDecorator = require('moonstone/InputDecorator'),
	ProgressButton = require('moonstone/ProgressButton');

module.exports = kind({
	name: 'moon.sample.ProgressButtonSample',
	classes: 'moon enyo-unselectable enyo-fit moon-progress-button-sample',
	contentChange: false,
	components: [
		{kind: Divider, content: 'Progress Button with Auto Download'},
		{name: 'autoDownload', kind: ProgressButton, content: 'Auto Download', postContent: 'Auto Launch', progress: 0, ontap: 'startDownloading'},
		{tag: 'br'},
		{tag: 'br'},
		{kind: Divider, content: 'Simple Progress Button'},
		{name: 'progressButton', kind: ProgressButton, progress: 0, content: 'Download', postContent: 'Launch', barClasses: 'blue', ontap: 'changeValue'},
		{tag: 'br'},
		{tag: 'br'},
		{kind: InputDecorator, style: 'margin-right:10px;', components: [
			{kind: Input, value: 10}
		]},
		{kind: Button, content: 'Set', small: true, classes: 'spaced-button', ontap: 'changeValue'},
		{kind: Button, content: '-', small: true, classes: 'spaced-button', ontap: 'decValue'},
		{kind: Button, content: '+', small: true, classes: 'spaced-button', ontap: 'incValue'},
		{tag: 'br'},
		{tag: 'br'},
		{style: 'width:240px;', components: [
			{name: 'animateSetting', kind: CheckboxItem, checked: true, content: 'Animated'}
		]}
	],
	bindings: [
		{from: '$.animateSetting.checked', to: '$.autoDownload.animated'},
		{from: '$.animateSetting.checked', to: '$.progressButton.animated'}
	],
	destroy: kind.inherit(function (sup) {
		return function () {
			this.resetTimer();
			sup.apply(this, arguments);
		};
	}),
	changeValue: function (sender, ev) {
		if (this.$.animateSetting.getChecked()) {
			this.$.progressButton.animateProgressTo(this.$.input.getValue());
		} else {
			this.$.progressButton.setProgress(this.$.input.getValue());
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
	resetTimer: function () {
		if (this._timerId) {
			clearInterval(this._timerId);
			this._timerId = null;
		}
	},
	startDownloading: function () {
		var _this = this;
		if (_this.contentChange === false) {
			_this.downloadProgress = 0;
			_this.contentChange = true;
			this._timerId = setInterval(function () {
				++_this.downloadProgress;
				_this.$.autoDownload.animateProgressTo(_this.downloadProgress);
				if (_this.downloadProgress >= 100) {
					_this.resetTimer();
				}
			}, 100);
		}
	}
});

module.exports.badgeClasses = 'new';

}],'src/ImageSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	BodyText = require('moonstone/BodyText'),
	Divider = require('moonstone/Divider'),
	Img = require('moonstone/Image');

module.exports = kind({
	name: 'moon.sample.ImageSample',
	classes: 'moon enyo-unselectable enyo-fit image-sample',
	components: [
		{kind: Divider, content: 'Image'},
		{kind: Img, src: 'http://lorempixel.com/64/64/city/1/', alt: 'HD'},
		{kind: Img, src: 'http://lorempixel.com/128/128/city/1/', alt: 'FHD'},
		{kind: Img, src: 'http://lorempixel.com/256/256/city/1/', alt: 'UHD'},
		{kind: Divider, content: 'Multi-res'},
		{kind: BodyText, content: 'The below image will change its source resolution based on the screen size at the time this sample is loaded.'},
		{kind: Img, src: {'hd': 'http://lorempixel.com/64/64/city/1/', 'fhd': 'http://lorempixel.com/128/128/city/1/', 'uhd': 'http://lorempixel.com/256/256/city/1/'}, alt: 'Large'}
	]
});
}],'src/DialogSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Divider = require('moonstone/Divider'),
	Button = require('moonstone/Button'),
	CheckboxItem = require('moonstone/CheckboxItem'),
	InputDecorator = require('moonstone/InputDecorator'),
	Input = require('moonstone/Input'),
	Dialog = require('moonstone/Dialog');

module.exports = kind({
	name: 'moons.sample.DialogSample',
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Divider, content: 'Dialog'},
		{kind: Button, content: 'Open Dialog', ontap: 'showDialog'},
		{classes: 'moon-1v'},
		{kind: Divider, content: 'Options'},
		{kind: CheckboxItem, content: 'Tap outside to close (autoDismiss)', name: 'autoDismissToggle'},
		{kind: CheckboxItem, content: 'Modal', name: 'modalToggle'},
		{kind: CheckboxItem, content: 'Show Close Button', name: 'showCloseButtonToggle'},
		{kind: CheckboxItem, content: 'Animate', name: 'animateToggle'},
		{kind: CheckboxItem, content: 'Lock 5-way inside popup (spotlightModal)', name: 'spotlightModalToggle'},
		{kind: CheckboxItem, content: 'Close by back key (allowBackKey)', name: 'allowBackKeyToggle'},
		{kind: CheckboxItem, content: 'Use divider to separate title from body', name: 'useDivider'},
		{classes: 'moon-1v'},
		{kind: Divider, content: 'Set a custom title, or remove the titles'},
		{kind: InputDecorator, components: [
			{kind: Input, placeholder: 'Title', value: 'Dialog Title', name: 'inputTitle'}
		]},
		{kind: InputDecorator, components: [
			{kind: Input, placeholder: 'Sub-Title', value: 'A subtitle for dialog.', name: 'inputSubTitle'}
		]},
		{
			name: 'dialog',
			kind: Dialog,
			title: 'You\'ve been watching TV for a very long time so let\'s do a quick check-in.',
			subTitle: 'This TV has been active for 10 hours.',
			message: 'Perhaps it is time to take a break and get some fresh air. There is a nice coffee shop around the corner',
			// message: [
			// 	{kind: Button, content: 'Fancy button'}
			// ],
			components: [
				{kind: Button, content: 'Go get a coffee', ontap: 'hideDialog'},
				{kind: Button, content: 'Keep watching TV', ontap: 'addMessage'}
			]
		}
	],
	bindings: [
		{from: '$.dialog.autoDismiss', to: '$.autoDismissToggle.checked', oneWay: false},
		{from: '$.dialog.modal', to: '$.modalToggle.checked', oneWay: false},
		{from: '$.dialog.showCloseButton', to: '$.showCloseButtonToggle.checked', oneWay: false},
		{from: '$.dialog.animate', to: '$.animateToggle.checked', oneWay: false},
		{from: '$.dialog.spotlightModal', to: '$.spotlightModalToggle.checked', oneWay: false},
		{from: '$.dialog.allowBackKey', to: '$.allowBackKeyToggle.checked', oneWay: false},
		{from: '$.dialog.useDivider', to: '$.useDivider.checked', oneWay: false},
		{from: '$.dialog.title', to: '$.inputTitle.value', oneWay: false},
		{from: '$.dialog.subTitle', to: '$.inputSubTitle.value', oneWay: false}
	],
	showDialog: function (sender) {
		this.$.dialog.show();
	},
	hideDialog: function (sender, ev) {
		this.$.dialog.hide();
	},
	addMessage: function () {
		this.$.dialog.setMessage(this.$.dialog.getMessage() + '<br> No, seriously, you should probably take a break.');
	}
});
}],'src/AccessibilitySample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	FittableRows = require('layout/FittableRows');

var
	BodyText = require('moonstone/BodyText'),
	Checkbox = require('moonstone/Checkbox'),
	Divider = require('moonstone/Divider'),
	Icon = require('moonstone/Icon'),
	Item = require('moonstone/Item'),
	Button = require('moonstone/Button'),
	Header = require('moonstone/Header'),
	ToggleButton = require('moonstone/ToggleButton'),
	IconButton = require('moonstone/IconButton'),
	Scroller = require('moonstone/Scroller');

var CustomCheckboxItem = kind({
	kind: Item,
	checked: true,
	classes: 'moon-hspacing',
	bindings: [
		{from: 'content', to: '$.client.content'},
		{from: 'checked', to: '$.checkbox.checked'}
	],
	components: [
		{name: 'client'},
		{name: 'checkbox', kind: Checkbox, spotlight: false, checked: true}
	],
	tap: function () {
		var ret = Item.prototype.tap.apply(this, arguments),
			checked = this.$.checkbox.checked;

		if (!ret) {
			this.set('checked', !checked);
		}

		return ret;
	},

	// Accessibility

	accessibilityRole: 'checkbox',
	ariaObservers: [
		{from: 'checked', to: 'aria-checked'}
	]
});

var UserItem = kind({
	kind: Item,
	classes: 'moon-hspacing',
	bindings: [
		{from: 'content', to: '$.client.content'}
	],
	components: [
		{name: 'client'},
		{kind: Icon, src: 'assets/icon-list.png'}
	]
});

module.exports = kind({
	name: 'moon.sample.AccessibilitySample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit',
	labelText : 'Label',
	hintText : 'Hint',
	components: [
		{kind: Header, name: 'header', content: 'Accessibility', titleBelow: 'Unusual case sample for Accessibility', type: 'small', components: [
			{name: 'labelButton', kind: Button, small: true, minWidth: false, content: 'Set Label', ontap: 'labelButtonTapped'},
			{name: 'hintButton', kind: Button, small: true, minWidth: false, content: 'Set Hint', ontap: 'hintButtonTapped'},
			{name: 'toggle', kind: ToggleButton, small: true, content: 'disabled', ontap: 'disabledTapped'}
		]},
		{name: 'container', kind: Scroller, fit: true, components: [
			{classes: 'moon-1v'},
			{kind: Control, tag: 'br'},
			{kind: Divider, content: 'Case 1: Non spotlight'},
			{name: 'playIcon', kind: Icon, icon: 'play', small: false, ontap: 'buttonTapped'},
			{name: 'listIcon', kind: Icon, src: 'assets/icon-list.png', ontap: 'buttonTapped'},
			{classes: 'moon-1v'},
			{kind: Control, tag: 'br'},
			{kind: Divider, content: 'Case 2: User defined'},
			{name: 'userItem', kind: UserItem, content: 'Content and Icon', ontap: 'buttonTapped'},
			{name: 'checkItem', kind: CustomCheckboxItem, content: 'Content and Checkbox', ontap: 'buttonTapped'},
			{classes: 'moon-1v'},
			{kind: Control, tag: 'br'},
			{kind: Divider, content: 'Case 3: Non content'},
			{name: 'drawerIconButton', kind: IconButton, icon: 'drawer', small: false, ontap: 'buttonTapped'},
			{name: 'listIconButton', kind: IconButton, src: 'assets/icon-list.png', small: false, ontap: 'buttonTapped'}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'console', content: 'No changes yet'}
	],
	buttonTapped: function (sender, ev) {
		var result;
		if (sender.get('accessibilityDisabled')) {
			result = 'accessibility disabled';
		} else if (sender.getAttribute('aria-label')) {
			result = sender.getAttribute('aria-label') + ' tapped.';
		} else {
			result = sender.getContent();
		}
		this.$.console.setContent(result);
	},
	labelButtonTapped: function (sender, ev) {
		this.$.header.setTitleBelow('Set all control\'s accessibilityLabel to \'Label\'');
		var i,
			control = this.$.container.components;
		for (i = 0; i < control.length; ++i) {
			if (control[i].name) {
				this.$[control[i].name].set('accessibilityLabel', this.labelText);
			}
		}
	},
	hintButtonTapped: function (sender, ev) {
		this.$.header.setTitleBelow('Set all control\'s accessibilityHint to \'Hint\'');
		var i,
			control = this.$.container.components;
		for (i = 0; i < control.length; ++i) {
			if (control[i].name) {
				this.$[control[i].name].set('accessibilityHint', this.hintText);
			}
		}
	},
	disabledTapped: function (sender, ev) {
		this.$.header.setTitleBelow('Set all control\'s accessibilityDisabled to ' + sender.value);
		var i,
			control = this.$.container.components;
		for (i = 0; i < control.length; ++i) {
			if (control[i].name) {
				this.$[control[i].name].set('accessibilityDisabled', sender.value ? true : false);
			}
		}
	}
});

}],'src/AnimatedButtonSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	FittableRows = require('layout/FittableRows');

var
	Scroller = require('moonstone/Scroller'),
	Divider = require('moonstone/Divider'),
	Icon = require('moonstone/Icon'),
	BodyText = require('moonstone/BodyText');

var
	AnimatedButton = require('moonstone/AnimatedButton');

module.exports = kind({
	name: 'moon.sample.AnimatedButtonSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit moon-button-animated-sample',
	components: [
		{kind: Scroller, fit: true, components: [
			{kind: Control, classes: 'moon-button-animated-sample-wrapper', components: [
				{kind: Divider, content: 'Animated Buttons:'},
				{name: 'animButton', kind: AnimatedButton, minWidth: false, content: 'Animated!', ontap: 'buttonTapped'},
				{name: 'animButton2', kind: AnimatedButton, minWidth: false, content: 'Animated!', ontap: 'buttonTapped', components: [
					{kind: Icon, icon: 'play'},
					{content: 'animation'}
				]},
				{name: 'animButton3', kind: AnimatedButton, ontap: 'buttonTapped', components: [
					{content: 'Expand!'},
					{kind: Icon, icon: 'fullscreen'}
				]},
				{name: 'animButton4', kind: AnimatedButton, minWidth: false, content: 'The most longest AnimatedButton everest!', ontap: 'buttonTapped'}
			]}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'result', allowHtml: true, content: 'No button pressed yet.'}
	],
	buttonTapped: function(sender, ev) {
		this.$.result.setContent('&quot;' + sender.name + '&quot; pressed.');
	}
});

module.exports.badgeClasses = 'new wip';

}],'src/AudioPlaybackSample':[function (module,exports,global,require,request){
require('moonstone');

var
	kind = require('enyo/kind'),
	Model = require('enyo/Model');

var
	Drawers = require('moonstone/Drawers'),
	Button = require('moonstone/Button'),
	IconButton = require('moonstone/IconButton'),
	Scroller = require('moonstone/Scroller');

var
	AudioPlayback = require('moonstone/AudioPlayback');

module.exports = kind({
	name: 'moon.sample.AudioPlaybackSample',
	classes: 'enyo-unselectable moon sample-audio-playback enyo-fit',
	data: [
		{src: 'http://enyojs.com/_media/thunder.mp3', trackName: 'Thunder', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', albumArt: 'assets/storm-100.png', duration: '0:22'},
		{src: 'http://enyojs.com/_media/engine.mp3', trackName: 'Engine', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', albumArt: 'assets/engine-100.png', duration: '0:04'}
	],
	components: [
		{kind: Drawers, drawers:[
			{
				kind: AudioPlayback,
				name: 'audioPlayback',
				components: [
					{content: 'Playlist'}
				],
				moreComponents: [
					{kind: IconButton, icon: 'circle', small: false, ontap: 'setAudio1'},
					{kind: IconButton, icon: 'stop', small: false, ontap: 'setAudio2'},
					{kind: IconButton, icon: 'trash', small: false, ontap: 'unload'}
				],
				playbackRateHash: {
					fastForward: ['2', '4'],
					rewind: ['-2', '-4'],
					slowForward: ['1/4', '1/2', '1'],
					slowRewind: ['-1/2', '-1']
				}
			}
		],
		components: [
			// Fixme: If we are not using wrapper like scroller inside of drawer,
			// drawer will not close itself when click blank area under the drawer.
			{kind: Scroller, classes: 'enyo-fit', components: [
				{tag: 'br'},{tag: 'br'},
				{kind: Button, content: 'set audio #1', ontap: 'setAudio1'},
				{kind: Button, content: 'set audio #2', ontap: 'setAudio2'},
				{kind: Button, content: 'unload audio', ontap: 'unload'}
			]}
		]}
	],
	create: function () {
		this.inherited(arguments);
		this.model1 = new Model(this.data[0]);
		this.model2 = new Model(this.data[1]);
	},
	setAudio1: function () {
		this.$.audioPlayback.set('model', this.model1);
	},
	setAudio2: function () {
		this.$.audioPlayback.set('model', this.model2);
	},
	unload: function () {
		this.$.audioPlayback.set('model', null);
	}
});

module.exports.badgeClasses = 'new wip';

}],'src/BodyTextSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	BodyText = require('moonstone/BodyText'),
	Divider = require('moonstone/Divider'),
	Scroller = require('moonstone/Scroller'),
	ToggleButton = require('moonstone/ToggleButton');

module.exports = kind({
	name: 'moon.sample.BodyLargeTextSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Scroller, fit: true, components: [
			{kind: Divider, content: 'Options'},
			{kind: ToggleButton, small: true, content: 'Large Body Text', ontap: 'largeTapped'},

			{kind: Divider, content: 'BodyText', style: 'margin-top: 1rem'},
			{kind: BodyText, content: 'Pixar genius reigns in this funny romantic comedy, which stars a robot who says absolutely nothing for a full 25 minutes yet somehow completely transfixes and endears himself to the audience within the first few minutes of the film. As the last robot left on earth, Wall-E (voiced by Ben Burtt) is one small robot--with a big, big heart--who holds the future of earth and mankind squarely in the palm of his metal hand. He\'s outlasted all the \'Waste Allocation Load Lifter Earth-Class\' robots that were assigned some 700 years ago to clean up the environmental mess that man made of earth while man vacationed aboard the <a href=\'\'>luxury spaceship Axiom</a>.'},
			{kind: BodyText, content: 'Pixar genius reigns in this funny romantic comedy, which stars a robot who says absolutely nothing for a full 25 minutes yet somehow completely transfixes and endears himself to the audience within the first few minutes of the film. As the last robot left on earth, Wall-E (voiced by Ben Burtt) is one small robot--with a big, big heart--who holds the future of earth and mankind squarely in the palm of his metal hand. He\'s outlasted all the \'Waste Allocation Load Lifter Earth-Class\' robots that were assigned some 700 years ago to clean up the environmental mess that man made of earth while man vacationed aboard the luxury spaceship Axiom.'},
			{kind: BodyText, centered: true, content: 'Pixar genius reigns in this funny romantic comedy, which stars a robot who says absolutely nothing for a full 25 minutes yet somehow completely transfixes and endears himself to the audience within the first few minutes of the film. As the last robot left on earth, Wall-E (voiced by Ben Burtt) is one small robot--with a big, big heart--who holds the future of earth and mankind squarely in the palm of his metal hand. He\'s outlasted all the \'Waste Allocation Load Lifter Earth-Class\' robots that were assigned some 700 years ago to clean up the environmental mess that man made of earth while man vacationed aboard the luxury spaceship Axiom.'},
			{kind: BodyText, content: 'גאון פיקסאר שולט בקומדיה הרומנטית המצחיק הזה, שמככב רובוט שאומר דבר וחצי דבר לעשרים וחמש דקות מלאים עדיין מתחברת איכשהו לחלוטין ומרתק את עצמו לקהל בכמה מסרטי דקות הראשונות. כמו הרובוט האחרון שנותר על פני כדור הארץ, וול-E (קולו של בן בארט) היא רובוט קטן אחד - עם לב גדול, גדול - מי מחזיק את עתידו של כדור הארץ והאנושות ישר בכף יד המתכת שלו. הוא שרד את כל \'טען ההקצאה פסולת מרים כדור הארץ הכיתה\' הרובוטים שחולקו לפני כשבע מאה שנים כדי לנקות את הבלגן הסביבתי שאדם עשוי מאדמה ואילו אדם נפש על סיפונה של חללית אקסיומת יוקרה.'},
			{kind: BodyText, content: 'بيكسار عبقرية يسود في هذه الكوميديا ​​الرومانسية مضحك، التي النجوم الروبوت الذي يقول شيئا على الإطلاق للحصول على كامل خمسة وعشرين دقيقة بعد تولي بطريقة أو بأخرى تماما ويسحر نفسه للجمهور في غضون الدقائق القليلة الأولى من الفيلم. عندما خرج الروبوت الماضي على وجه الأرض، الحائط-E (التي عبر عنها بن بيرت) هو روبوت صغير واحد - مع كبير، القلب الكبير - الذي يخبئه المستقبل من الأرض والجنس البشري بشكل مباشر في كف يده المعدنية. انه تغلب جميع \'تحميل النفايات تخصيص كهربائية الدرجة الأرض الروبوتات التي تم تعيينها قبل بعض سبعمائة سنوات لتنظيف الفوضى البيئية التي من صنع الإنسان من الأرض في حين اجازتها رجل على متن سفينة الفضاء اكسيوم الفاخرة.'}
		]}
	],
	largeTapped: function (sender, ev) {
		var enabled = sender.value;
		this.$.scroller.getClientControls().forEach(function (control) {
			if (control.kind === BodyText) {
				control.addRemoveClass('moon-body-large-text', enabled);
			}
		});
	}
});
}],'src/ButtonSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	Group = require('enyo/Group');

var
	FittableRows = require('layout/FittableRows');

var
	Scroller = require('moonstone/Scroller'),
	Divider = require('moonstone/Divider'),
	TooltipDecorator = require('moonstone/TooltipDecorator'),
	Tooltip = require('moonstone/Tooltip'),
	Button = require('moonstone/Button'),
	CaptionDecorator = require('moonstone/CaptionDecorator'),
	ToggleItem = require('moonstone/ToggleItem'),
	BodyText = require('moonstone/BodyText'),
	Group = require('enyo/Group'),
	FittableRows = require('layout/FittableRows');

module.exports = kind({
	name: 'moon.sample.ButtonSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit moon-button-sample',
	components: [
		{kind: Scroller, fit: true, components: [
			{classes: 'moon-button-sample-wrapper', components: [

				{kind: Divider, content: 'Buttons:'},
				{kind: TooltipDecorator, components: [
					{name: 'aButton', kind: Button, minWidth: false, content: 'A', ontap: 'buttonTapped'},
					{kind: Tooltip, content: 'minWidth: false'}
				]},
				{kind: TooltipDecorator, components: [
					{name: 'bButton', kind: Button, content: 'B', ontap: 'buttonTapped'},
					{kind: Tooltip, content: 'minWidth: true'}
				]},
				{name: 'button', kind: Button, content: 'Button', uppercase : false, ontap: 'buttonTapped'},
				{name: 'disabledButton', kind: Button, disabled: true, content: 'Disabled Button', ontap: 'buttonTapped'},
				{name: 'longButton', kind: Button, content: 'Looooooooooooooooong Button', ontap: 'buttonTapped'},
				{name: 'spacesButton', kind: Button, content: 'Button   with   extra   spaces', ontap: 'buttonTapped'},
				{classes: 'moon-2v'},

				{kind: Divider, content: 'Small Buttons:'},
				{name: 'smallAButton', kind: Button, small: true, minWidth: false, content: 'A', ontap: 'buttonTapped'},
				{name: 'smallBButton', kind: Button, small: true, content: 'B', ontap: 'buttonTapped'},
				{name: 'smallButton', kind: Button, small: true, content: 'Button', ontap: 'buttonTapped'},
				{name: 'smallDisabledButton', kind: Button, small: true, disabled: true, content: 'Disabled Button', ontap: 'buttonTapped'},
				{name: 'smallLongButton', kind: Button, small: true, content: 'Loooooooooooooooooooooooong Button', ontap: 'buttonTapped'},
				{name: 'smallSpacesButton', kind: Button, small:true, content: 'Button   with   extra   spaces', ontap: 'buttonTapped'},
				{kind: ToggleItem, classes: 'tap-area-toggle-container', content: 'Show Tap Area', onActivate: 'showSmallButtonTapArea'},
				{classes: 'moon-2v'},

				{kind: Divider, content: 'Captioned Buttons:'},
				{kind: CaptionDecorator, side: 'top', content: 'Pow', components: [
					{name: 'captionedAButton', kind: Button, content: 'A', ontap: 'buttonTapped'}
				]},
				{kind: CaptionDecorator, side: 'right', content: 'Boom', components: [
					{name: 'captionedBButton', kind: Button, content: 'B', ontap: 'buttonTapped'}
				]},
				{kind: CaptionDecorator, side: 'bottom', content: 'Crash', components: [
					{name: 'captionedCButton', kind: Button, content: 'C', ontap: 'buttonTapped'}
				]},
				{kind: CaptionDecorator, side: 'left', content: 'Bang', components: [
					{name: 'captionedDButton', kind: Button, content: 'D', ontap: 'buttonTapped'}
				]},
				{classes: 'moon-2v'},

				{kind: Divider, content: 'Captioned Buttons with showOnFocus option:'},
				{kind: CaptionDecorator, side: 'top', showOnFocus: true, content: 'Pow', components: [
					{name: 'showOnFocusCaptionTopButton', kind: Button, content: 'Top', ontap: 'buttonTapped'}
				]},
				{kind: CaptionDecorator, side: 'bottom', showOnFocus: true, content: 'Crash', components: [
					{name: 'showOnFocusCaptionBottomButton', kind: Button, content: 'Bottom', ontap: 'buttonTapped'}
				]},
				{style: 'display:inline-block;', classes: 'moon-2h'},
				{kind: CaptionDecorator, side: 'left', showOnFocus: true, content: 'Bang', components: [
					{name: 'showOnFocusCaptionLeftButton', kind: Button, content: 'Left', ontap: 'buttonTapped'}
				]},
				{kind: CaptionDecorator, side: 'right', showOnFocus: true, content: 'Boom', components: [
					{name: 'showOnFocusCaptionRightButton', kind: Button, content: 'Right', ontap: 'buttonTapped'}
				]},
				{classes: 'moon-2v'},

				{kind: Divider, content: 'Grouped Buttons:'},
				{kind: Group, classes: 'moon-button-sample-group', components: [
					{name: 'appleButton', kind: Button, content: 'Apple', ontap: 'buttonTapped'},
					{name: 'bananaButton', kind: Button, content: 'Banana', ontap: 'buttonTapped'},
					{name: 'saskatoonberryButton', kind: Button, content: 'Saskatoonberry', ontap: 'buttonTapped'}
				]},
				{classes: 'moon-2v'},

				{kind: Divider, content: 'Hidden Buttons:'},
				{name: 'hiddenButton', kind: Button, content: 'Hidden Button', renderOnShow: true, ontap: 'buttonTapped'},
				{name: 'showButton', kind: Button, content: 'Show Hidden Button', ontap: 'showButtonTapped'},

				{classes: 'moon-2v'},
				{kind: Divider, content: 'Translucent Background Buttons:'},
				{classes: 'image-background', components: [
					{name: 'opaqueButton', kind: Button, minWidth: false, content: 'Normal Opaque', ontap: 'buttonTapped'},
					{name: 'translucentButton', kind: Button, minWidth: false, backgroundOpacity: 'translucent', content: 'Translucent', ontap: 'buttonTapped'},
					{name: 'disabledTranslucentButton', kind: Button, minWidth: false, backgroundOpacity: 'translucent', disabled: true, content: 'Disabled Translucent', ontap: 'buttonTapped'},
					{name: 'transparentButton', kind: Button, minWidth: false, backgroundOpacity: 'transparent', content: 'Transparent',  ontap: 'buttonTapped'},
					{name: 'disabledTransparentButton', kind: Button, minWidth: false, backgroundOpacity: 'transparent', disabled: true, content: 'Disabled Transparent',  ontap: 'buttonTapped'},
					{classes: 'moon-1v'},
					{kind: Divider, content: 'Grouped Buttons:'},
					{kind: Group, classes: 'moon-button-sample-group', components: [
						{name: 'appleButton2', kind: Button, content: 'Apple', backgroundOpacity: 'translucent', ontap: 'buttonTapped'},
						{name: 'bananaButton2', kind: Button, content: 'Banana', backgroundOpacity: 'translucent', ontap: 'buttonTapped'},
						{name: 'saskatoonberryButton2', kind: Button, content: 'Saskatoonberry', backgroundOpacity: 'translucent', ontap: 'buttonTapped'}
					]}
				]}
			]}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'result', allowHtml: true, content: 'No button pressed yet.'}
	],
	buttonTapped: function (sender, ev) {
		this.$.result.setContent('&quot;' + sender.name + '&quot; pressed.');
	},
	showButtonTapped: function () {
		this.$.hiddenButton.show();
	},
	showSmallButtonTapArea: function (sender, ev) {
		if (ev.checked) {
			this.addClass('visible-tap-area');
		} else {
			this.removeClass('visible-tap-area');
		}
	}
});
}],'src/CheckboxItemSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	Scroller = require('moonstone/Scroller'),
	CheckboxItem = require('moonstone/CheckboxItem'),
	Divider = require('moonstone/Divider'),
	BodyText = require('moonstone/BodyText'),
	Group = require('enyo/Group');

module.exports = kind({
	name: 'smoon.sample.CheckboxItemSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Scroller, fit: true, components: [
			{classes: 'moon-hspacing', controlClasses: 'moon-5h', components: [
				{components: [
					{kind: Divider, content: 'Checkbox Items'},
					{kind: CheckboxItem, content: 'Option 1', checked: true, onchange: 'itemChanged'},
					{kind: CheckboxItem, content: 'Option 2', onchange: 'itemChanged'},
					{kind: CheckboxItem, disabled: true, content: 'Disabled', onchange: 'itemChanged'},
					{kind: CheckboxItem, content: 'Option 4', checked: true, onchange: 'itemChanged'},
					{kind: CheckboxItem, content: 'This is a verrry long option 5 with a custom checkmark', icon: '', src: 'assets/icon-button-enyo-logo.png', onchange: 'itemChanged'},
					{kind: CheckboxItem, content: 'هناك حقيقة مثبتة منذ زمن طويل وهي', onchange: 'itemChanged'}
				]},
				{components: [
					{kind: Divider, content: 'Right-Handed Checkbox Items'},
					{kind: CheckboxItem, content: 'Option 1', checked: true, checkboxOnRight: true, onchange: 'itemChanged'},
					{kind: CheckboxItem, content: 'Option 2', checkboxOnRight: true, onchange: 'itemChanged'},
					{kind: CheckboxItem, disabled: true, content: 'Disabled', checkboxOnRight: true, onchange: 'itemChanged'},
					{kind: CheckboxItem, content: 'Option 4', checked: true, checkboxOnRight: true, onchange: 'itemChanged'},
					{kind: CheckboxItem, content: 'This is a verrry long option 5', checkboxOnRight: true, onchange: 'itemChanged'},
					{kind: CheckboxItem, content: 'هناك حقيقة مثبتة منذ زمن طويل وهي', checkboxOnRight: true, onchange: 'itemChanged'}
				]},
				{components: [
					{kind: Divider, content: 'Checkbox Item Group'},
					{kind: Group, onActivate: 'groupChanged', components: [
						{kind: CheckboxItem, content: 'Group Option 1'},
						{kind: CheckboxItem, content: 'Group Option 2', checked: true},
						{kind: CheckboxItem, disabled: true, content: 'Disabled'},
						{kind: CheckboxItem, content: 'Group Option 4'},
						{kind: CheckboxItem, content: 'Group Option 5'}
					]}
				]}
			]}
		]},
		{components: [
			{kind: Divider, content: 'Result'},
			{kind: BodyText, name: 'result', content: 'Nothing selected'}
		]}
	],
	itemChanged: function (sender, ev) {
		this.$.result.setContent(sender.getContent() + ' was ' + (sender.getChecked() ? ' selected.' : 'deselected.'));
	},
	groupChanged: function (sender, ev) {
		if (ev.toggledControl.getChecked()) {
			var selected = ev.toggledControl.getContent();
			this.$.result.setContent(selected + ' was selected.');
		}
	}
});
}],'src/ExpandableTextSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	BodyText = require('moonstone/BodyText'),
	Divider = require('moonstone/Divider'),
	ExpandableText = require('moonstone/ExpandableText'),
	Scroller = require('moonstone/Scroller');

module.exports = kind({
	name: 'moon.sample.ExpandableTextSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Scroller, fit: true,  components: [
			{kind: Divider, content: '#1: Basic, No Expansion Needed'},
			{kind: ExpandableText, onExpandCollapse: 'collapsedChanged', content: 'Pixar genius reigns in this funny romantic comedy.'},
			{tag: 'br'},

			{kind: Divider, content: '#2: Basic'},
			{kind: ExpandableText, onExpandCollapse: 'collapsedChanged', content: 'Pixar genius reigns in this funny romantic comedy, which stars a robot who says absolutely nothing for a full 25 minutes yet somehow completely transfixes and endears himself to the audience within the first few minutes of the film. As the last robot left on earth, Wall-E (voiced by Ben Burtt) is one small robot--with a big, big heart--who holds the future of earth and mankind squarely in the palm of his metal hand. He\'s outlasted all the \'Waste Allocation Load Lifter Earth-Class\' robots that were assigned some 700 years ago to clean up the environmental mess that man made of earth while man vacationed aboard the luxury spaceship Axiom.'},
			{tag: 'br'},

			{kind: Divider, content: '#3: Collapsed: false'},
			{kind: ExpandableText, onExpandCollapse: 'collapsedChanged', collapsed: false, content: 'Pixar genius reigns in this funny romantic comedy, which stars a robot who says absolutely nothing for a full 25 minutes yet somehow completely transfixes and endears himself to the audience within the first few minutes of the film. As the last robot left on earth, Wall-E (voiced by Ben Burtt) is one small robot--with a big, big heart--who holds the future of earth and mankind squarely in the palm of his metal hand. He\'s outlasted all the \'Waste Allocation Load Lifter Earth-Class\' robots that were assigned some 700 years ago to clean up the environmental mess that man made of earth while man vacationed aboard the luxury spaceship Axiom.'},
			{tag: 'br'},

			{kind: Divider, content: '#4: MaxLines: 1'},
			{kind: ExpandableText, onExpandCollapse: 'collapsedChanged', maxLines: 1, content: 'Pixar genius reigns in this funny romantic comedy, which stars a robot who says absolutely nothing for a full 25 minutes yet somehow completely transfixes and endears himself to the audience within the first few minutes of the film. As the last robot left on earth, Wall-E (voiced by Ben Burtt) is one small robot--with a big, big heart--who holds the future of earth and mankind squarely in the palm of his metal hand. He\'s outlasted all the \'Waste Allocation Load Lifter Earth-Class\' robots that were assigned some 700 years ago to clean up the environmental mess that man made of earth while man vacationed aboard the luxury spaceship Axiom.'}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'console', content: 'No change yet'}
	],
	collapsedChanged: function (sender, ev) {
		this.$.console.setContent(sender.name + (sender.collapsed ? ' Collapsed' : ' Expanded'));
	}
});
}],'src/FontSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Scroller = require('moonstone/Scroller'),
	Divider = require('moonstone/Divider'),
	Table = require('enyo/Table');

module.exports = kind({
	name: 'moon.sample.FontSample',
	kind: Scroller,
	classes: 'moon enyo-unselectable enyo-fit moon-font-sample',
	components: [
		{kind: Divider, content: 'Latin Font'},
		{kind: Table, components: [
			{classes: 'moon-header-text', components: [
				{content: 'HEADER'},
				{content: '텔레비전'},
				{content: 'M혼I합X된ED'}
			]},
			{classes: 'moon-large-text', components: [
				{content: 'Large Text'},
				{content: '텔레비전'},
				{content: 'M혼i합x된ed'}
			]},
			{classes: 'moon-sub-header-text', components: [
				{content: 'Sub-header'},
				{content: '텔레비전'},
				{content: 'M혼i합x된ed'}
			]},
			{classes: 'moon-large-button-text', components: [
				{content: 'LARGE BUTTON'},
				{content: '텔레비전'},
				{content: 'M혼I합X된ED'}
			]},
			{classes: 'moon-small-button-text', components: [
				{content: 'SMALL BUTTON'},
				{content: '텔레비전'},
				{content: 'M혼I합X된ED'}
			]},
			{classes: 'moon-body-text', components: [
				{content: 'Body Text'},
				{content: '텔레비전'},
				{content: 'M혼i합x된ed'}
			]},
			{classes: 'moon-divider-text', components: [
				{content: 'Divider'},
				{content: '텔레비전'},
				{content: 'M혼i합x된ed'}
			]},
			{classes: 'moon-superscript', components: [
				{content: 'Superscript'},
				{content: '텔레비전'},
				{content: 'M혼i합x된ed'}
			]},
			{classes: 'moon-pre-text', components: [
				{content: 'Pre Text'},
				{content: '텔레비전'},
				{content: 'M혼i합x된ed'}
			]}
		]},
		{tag: 'br'},
		{kind: Divider, content: 'Non-latin Font'},
		{kind: Table, classes: 'enyo-locale-non-latin', components: [
			{classes: 'moon-header-text', components: [
				{content: 'HEADER'},
				{content: '텔레비전'},
				{content: 'M혼I합X된ED'}
			]},
			{classes: 'moon-large-text', components: [
				{content: 'Large Text'},
				{content: '텔레비전'},
				{content: 'M혼i합x된ed'}
			]},
			{classes: 'moon-sub-header-text', components: [
				{content: 'Sub-header'},
				{content: '텔레비전'},
				{content: 'M혼i합x된ed'}
			]},
			{classes: 'moon-large-button-text', components: [
				{content: 'LARGE BUTTON'},
				{content: '텔레비전'},
				{content: 'M혼I합X된ED'}
			]},
			{classes: 'moon-small-button-text', components: [
				{content: 'SMALL BUTTON'},
				{content: '텔레비전'},
				{content: 'M혼I합X된ED'}
			]},
			{classes: 'moon-body-text', components: [
				{content: 'Body Text'},
				{content: '텔레비전'},
				{content: 'M혼i합x된ed'}
			]},
			{classes: 'moon-divider-text', components: [
				{content: 'Divider'},
				{content: '텔레비전'},
				{content: 'M혼i합x된ed'}
			]},
			{classes: 'moon-superscript', components: [
				{content: 'Superscript'},
				{content: '텔레비전'},
				{content: 'M혼i합x된ed'}
			]},
			{classes: 'moon-pre-text', components: [
				{content: 'Pre Text'},
				{content: '텔레비전'},
				{content: 'M혼i합x된ed'}
			]}
		]}
	]
});

// moon-header-text
// moon-superscript
// moon-pre-text
// moon-large-text
// moon-sub-header-text
// moon-divider-text
// moon-body-text
// moon-large-button-text
// moon-small-button-text

}],'src/FormCheckboxSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	BodyText = require('moonstone/BodyText'),
	Divider = require('moonstone/Divider'),
	FormCheckbox = require('moonstone/FormCheckbox'),
	Scroller = require('moonstone/Scroller'),
	Group = require('enyo/Group');

module.exports = kind({
	name: 'moon.sample.FormCheckboxSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Scroller, fit: true, components: [
			{classes: 'moon-hspacing', controlClasses: 'moon-5h', components: [
				{components: [
					{kind: Divider, content: 'FormCheckbox Items (Default)'},
					{kind: FormCheckbox, content: 'Option 1', checked: true, onchange: 'itemChanged'},
					{kind: FormCheckbox, content: 'Option 2', onchange: 'itemChanged'},
					{kind: FormCheckbox, disabled: true, content: 'Disabled', onchange: 'itemChanged'},
					{kind: FormCheckbox, content: 'Option 4', checked: true, onchange: 'itemChanged'},
					{kind: FormCheckbox, content: 'This is a verrry long option 5', onchange: 'itemChanged'}
				]},
				{components: [
					{kind: Divider, content: 'FormCheckbox Item (Group)'},
					{kind: Group, onActivate: 'groupChanged', components: [
						{kind: FormCheckbox, content: 'Group Option 1'},
						{kind: FormCheckbox, content: 'Group Option 2', checked: true},
						{kind: FormCheckbox, disabled: true, content: 'Disabled'},
						{kind: FormCheckbox, content: 'Group Option 4'},
						{kind: FormCheckbox, content: 'Group Option 5'}
					]}
				]}
			]}
		]},
		{components: [
			{kind: Divider, content: 'Result'},
			{kind: BodyText, name: 'result', content: 'Nothing selected'}
		]}
	],
	itemChanged: function (sender, ev) {
		this.$.result.setContent(sender.getContent() + ' was ' + (sender.getChecked() ? ' selected.' : 'deselected.'));
	},
	groupChanged: function (sender, ev) {
		if (ev.toggledControl.getChecked()) {
			var selected = ev.toggledControl.getContent();
			this.$.result.setContent(selected + ' was selected.');
		}
	}
});
}],'src/HeaderSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	Button = require('moonstone/Button'),
	Header = require('moonstone/Header'),
	Scroller = require('moonstone/Scroller'),
	ToggleButton = require('moonstone/ToggleButton');

module.exports = kind({
	name: 'moon.sample.HeaderSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit moon-header-sample',
	components: [
		{kind: Scroller, fit:true, components: [
			{kind: Header, name: 'largeHeader', content: 'Large Header', titleAbove: '02', titleBelow: 'Sub Header', subTitleBelow: 'Sub-sub Header', components: [
				{kind: Button, small: true, content: 'Description', ontap: 'describeLarge'},
				{kind: Button, small: true, content: 'How to use', ontap: 'howToUseLarge'}
			]},
			{classes: 'moon-1v'},
			{kind: Header, name: 'mediumHeader', content: 'Medium Header', type: 'medium', titleAbove: '03', titleBelow: 'Sub Header', subTitleBelow: '', components: [
				{kind: Button, small: true, content: 'Description', ontap: 'describeMedium'},
				{kind: Button, small: true, content: 'How to use', ontap: 'howToUseMedium'}
			]},
			{classes: 'moon-1v'},
			{kind: Header, name: 'smallHeader', content: 'Small Header', type: 'small', titleAbove: '04', subTitle: 'Sub Title', titleBelow: 'Sub Header', subTitleBelow: 'Sub-sub Header', components: [
				{kind: Button, content: 'Description', ontap: 'describeSmall'},
				{kind: Button, small: true, content: 'How to use', ontap: 'howToUseSmall'},
				{kind: Button, small: true, content: 'RTL content', ontap: 'rtlSmall'}
			]},
			{classes: 'moon-1v'},
			{kind: Header, content: 'Varied Alignment', titleAbove: '02', titleBelow: 'Panel actions can be positioned on left or right', components: [
				{kind: Button, small:true, content: 'Left', classes: 'moon-header-left'},
				{kind: Button, small:true, content: 'aligned', classes: 'moon-header-left'},
				{kind: Button, small:true, content: 'Right'},
				{kind: Button, small:true, content: 'Aligned'}
			]},
			{classes: 'moon-1v'},
			{kind: Header, name: 'switchHeader', content: 'Static Title', placeholder: 'Type Here', titleAbove: '03', titleBelow: 'Header title can be changed to an input', subTitleBelow: 'Press \'Switch Mode\' button, which sets `inputMode:true`.', components: [
				{kind: Button, small:true, content: 'Switch Mode', ontap: 'switchMode', header: 'switchHeader'}
			]},
			{kind: Header, name: 'inputHeaderDismiss', inputMode: true, dismissOnEnter: true, content: 'Input-style Header', placeholder: 'Dismiss on Enter', titleAbove: '03', titleBelow: 'InputHeader blurs-focus when pressing Enter.', subTitleBelow: '', onchange: 'handleChange'},
			{classes: 'moon-1v'},
			{kind: Header, name: 'imageHeader', content: 'Header with Image', subTitle: 'Sub title can be seen only in small header. And can flow with title when marquee starts.', titleAbove: '02', titleBelow: 'Sub Header', subTitleBelow: 'Sub-sub Header', fullBleedBackground: false, backgroundSrc: 'http://lorempixel.com/g/1920/360/abstract/2/', components: [
				{kind: ToggleButton, small: true, toggleOnLabel: 'Full Bleed: true', toggleOffLabel: 'Full Bleed: false', ontap: 'handleToggle', classes: 'moon-header-left'},
				{kind: Button, small: true, content: 'large', ontap: 'resizeImageHeader'},
				{kind: Button, small: true, content: 'medium', ontap: 'resizeImageHeader'},
				{kind: Button, small: true, content: 'small', ontap: 'resizeImageHeader'}
			]},
			{classes: 'moon-1v'},
			{kind: Header, name: 'marqueeHeader', content: 'Header   헤더    ヘッダ    ylätunniste    כותרת    رأس    Kopfzeile  ẫ Ẫ گ Ů <span style=\'text-transform:none\'>j p q g</span>', allowHtml:true, titleAbove: '02', titleBelow: 'Header   헤더    ヘッダ    ylätunniste    כותרת    رأس    Kopfzeile  ẫ Ẫ گ Ů <span style=\'text-transform:none\'>j p q g</span> Header   헤더    ヘッダ    ylätunniste    כותרת    رأس    Kopfzeile  ẫ Ẫ گ Ů <span style=\'text-transform:none\'>j p q g</span>   Header   헤더    ヘッダ    ylätunniste    כותרת    رأس    Kopfzeile  ẫ Ẫ گ Ů <span style=\'text-transform:none\'>j p q g</span>   Header   헤더    ヘッダ    ylätunniste    כותרת    رأس    Kopfzeile  ẫ Ẫ گ Ů <span style=\'text-transform:none\'>j p q g</span>', subTitleBelow: 'Titles will truncate/marquee', components: [
				{kind: Button, small:true, content: 'Switch Mode', ontap: 'switchMode', header: 'marqueeHeader'}
			]},
			{classes: 'moon-1v'},
			{kind: Header, name: 'marqueeHeaderSmall', small:true, content: 'Header   헤더    ヘッダ    ylätunniste    כותרת    رأس    Kopfzeile  ẫ Ẫ گ Ů <span style=\'text-transform:none\'>j p q g</span>', allowHtml:true, titleAbove: '02', titleBelow: 'Header   헤더    ヘッダ    ylätunniste    כותרת    رأس    Kopfzeile  ẫ Ẫ گ Ů <span style=\'text-transform:none\'>j p q g</span> Header   헤더    ヘッダ    ylätunniste    כותרת    رأس    Kopfzeile  ẫ Ẫ گ Ů <span style=\'text-transform:none\'>j p q g</span>   Header   헤더    ヘッダ    ylätunniste    כותרת    رأس    Kopfzeile  ẫ Ẫ گ Ů <span style=\'text-transform:none\'>j p q g</span>   Header   헤더    ヘッダ    ylätunniste    כותרת    رأس    Kopfzeile  ẫ Ẫ گ Ů <span style=\'text-transform:none\'>j p q g</span>', subTitleBelow: 'Titles will truncate/marquee', components: [
				{kind: Button, small:true, content: 'Switch Mode', ontap: 'switchMode', header: 'marqueeHeaderSmall'}
			]}
		]}
	],
	describeLarge: function (sender, ev) {
		this.$.largeHeader.setTitleBelow('This is the default header.');
	},
	howToUseLarge: function (sender, ev) {
		this.$.largeHeader.setSubTitleBelow('Large (default) header will be used if you don\'t specify the `type` property.');
	},
	describeMedium: function (sender, ev) {
		this.$.mediumHeader.setTitleBelow('Medium header flattens the button area and the titleBelow areas together for a more compact header.');
	},
	howToUseMedium: function (sender, ev) {
		this.$.mediumHeader.setSubTitleBelow('Set `type` property to \'medium\' to use the medium header and long very subTitleBelow.');
	},
	describeSmall: function (sender, ev) {
		this.$.smallHeader.setTitle('Small header flattens the buttons down to the title area, uses a smaller title font, and has no `titleBelow`.');
	},
	howToUseSmall: function (sender, ev) {
		this.$.smallHeader.setTitle('Set `type` property to \'small\' to use the small header.');
	},
	rtlSmall: function (sender, ev) {
		this.$.smallHeader.set('title', 'כותרת Small Header');
		this.$.smallHeader.set('titleBelow', 'כתוביות למטה');
	},
	handleToggle: function (sender, ev) {
		this.$.imageHeader.setFullBleedBackground(sender.value);
	},
	resizeImageHeader: function (sender, ev) {
		this.$.imageHeader.setType(sender.content);
	},
	switchMode: function (sender, ev) {
		var header = this.$[sender.header];
		header.setInputMode(!header.getInputMode());
	},
	handleChange: function (sender, ev) {
		this.$.inputHeaderDismiss.set('subTitleBelow', 'Changed: ' + sender.getValue());
	}
});
}],'src/IconButtonSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	BodyText = require('moonstone/BodyText'),
	Divider = require('moonstone/Divider'),
	IconButton = require('moonstone/IconButton'),
	Scroller = require('moonstone/Scroller'),
	Group = require('enyo/Group');

module.exports = kind({
	name: 'moon.sample.IconButtonSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit moon-icon-button-sample',
	components: [
		{kind: Scroller, fit: true, components: [
			{fit:true, components: [
				{kind: Divider, content: 'Font-based Icon Buttons: '},
				{kind: IconButton, icon: 'drawer', small: false, ontap: 'buttonTapped'},
				{kind: IconButton, icon: 'search', small: false, ontap: 'buttonTapped'},
				{kind: IconButton, icon: 'drawer', ontap: 'buttonTapped'},
				{kind: IconButton, icon: 'search', ontap: 'buttonTapped'},
				{classes: 'moon-1v'},
				{kind: Divider, content: 'Image Asset Icon (Raster Image) Buttons: '},
				{kind: IconButton, src: 'assets/icon-list.png', small: false, ontap: 'buttonTapped'},
				{kind: IconButton, src: 'assets/icon-album.png', small: false, ontap: 'buttonTapped'},
				{kind: IconButton, src: 'assets/icon-list.png', ontap: 'buttonTapped'},
				{kind: IconButton, src: 'assets/icon-album.png', ontap: 'buttonTapped'},
				{classes: 'moon-1v'},
				{kind: Divider, content: 'Image Asset Icons (Vector Image) Buttons:'},
				{kind: IconButton, src: 'assets/magnify.svg', small: false, ontap: 'buttonTapped'},
				{kind: IconButton, src: 'assets/trash.svg', small: false, ontap: 'buttonTapped'},
				{kind: IconButton, src: 'assets/magnify.svg', ontap: 'buttonTapped'},
				{kind: IconButton, src: 'assets/trash.svg', ontap: 'buttonTapped'},
				{classes: 'moon-1v'},
				{kind: Divider, content: 'Disabled Icon Buttons: '},
				{kind: IconButton, icon: 'drawer', small: false, ontap: 'buttonTapped', disabled: true},
				{kind: IconButton, icon: 'search', ontap: 'buttonTapped', disabled: true},
				{kind: IconButton, src: 'assets/icon-list.png', small: false, ontap: 'buttonTapped', disabled: true},
				{kind: IconButton, src: 'assets/icon-album.png', ontap: 'buttonTapped', disabled: true},
				{classes: 'moon-1v'},
				{kind: Divider, content: 'Grouped Icon Buttons: '},
				{kind: Group, components: [
					{kind: IconButton, icon: 'drawer', active: true, ontap: 'buttonTapped'},
					{kind: IconButton, icon: 'search', ontap: 'buttonTapped'},
					{kind: IconButton, src: 'assets/icon-list.png', ontap: 'buttonTapped'},
					{kind: IconButton, src: 'assets/icon-album.png', ontap: 'buttonTapped'}
				]},
				{classes: 'moon-1v'},
				{kind: Divider, content: 'Translucent Background Buttons:'},
				{classes: 'image-background', components: [
					{kind: IconButton, icon: 'backward', backgroundOpacity: 'translucent', ontap: 'buttonTapped'},
					{kind: IconButton, icon: 'play', small: false, backgroundOpacity: 'translucent', ontap: 'buttonTapped'},
					{kind: IconButton, icon: 'forward', backgroundOpacity: 'translucent', ontap: 'buttonTapped'},
					{kind: IconButton, icon: 'exitfullscreen', small: false, backgroundOpacity: 'transparent', ontap: 'buttonTapped'},
					{kind: IconButton, icon: 'fullscreen', small: false, backgroundOpacity: 'transparent', ontap: 'buttonTapped'},
					{kind: IconButton, src: 'assets/icon-list.png', small: false, backgroundOpacity: 'translucent', ontap: 'buttonTapped'},
					{kind: IconButton, src: 'assets/icon-album.png', backgroundOpacity: 'transparent', ontap: 'buttonTapped'}
				]}
			]}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'console', content: 'No changes yet'}
	],
	buttonTapped: function (sender, ev) {
		this.$.console.setContent(sender.name + ' tapped.');
	}
});

}],'src/IconSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	BodyText = require('moonstone/BodyText'),
	Divider = require('moonstone/Divider'),
	Icon = require('moonstone/Icon'),
	Item = require('moonstone/Item'),
	Scroller = require('moonstone/Scroller');

module.exports = kind({
	name: 'moon.sample.IconSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Scroller, fit:true, components: [
			{kind: Divider, content: 'Moonstone Font-based Icons:'},
			{kind: Icon, icon: 'arrowlargeup', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'arrowlargedown', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'arrowlargeleft', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'arrowlargeright', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'arrowsmallup', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'arrowsmalldown', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'arrowsmallleft', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'arrowsmallright', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'arrowhookleft', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'arrowhookright', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'ellipsis', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'closex', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'check', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'search', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'drawer', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'list', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'bulletlist', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'denselist', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'rollforward', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'rollbackward', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'exitfullscreen', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'fullscreen', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'circle', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'stop', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'play', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'pause', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'forward', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'backward', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'skipforward', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'skipbackward', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'pauseforward', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'pausebackward', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'pausejumpforward', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'pausejumpbackward', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'jumpforward', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'jumpbackward', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'arrowshrink', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'arrowextend', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'flag', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'funnel', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'trash', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'plus', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'minus', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'star', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'hollowstar', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'halfstar', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'gear', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'plug', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: 'lock', small: false, ontap: 'buttonTapped'},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'Small Moonstone Font-based Icons:'},
			{kind: Icon, icon: 'arrowlargeup', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'arrowlargedown', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'arrowlargeleft', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'arrowlargeright', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'arrowsmallup', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'arrowsmalldown', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'arrowsmallleft', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'arrowsmallright', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'arrowhookleft', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'arrowhookright', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'ellipsis', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'closex', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'check', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'search', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'drawer', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'list', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'bulletlist', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'denselist', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'rollforward', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'rollbackward', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'exitfullscreen', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'fullscreen', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'circle', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'stop', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'play', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'pause', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'forward', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'backward', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'skipforward', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'skipbackward', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'pauseforward', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'pausebackward', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'pausejumpforward', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'pausejumpbackward', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'jumpforward', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'jumpbackward', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'arrowshrink', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'arrowextend', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'flag', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'funnel', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'trash', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'plus', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'minus', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'star', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'hollowstar', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'halfstar', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'gear', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'plug', ontap: 'buttonTapped'},
			{kind: Icon, icon: 'lock', ontap: 'buttonTapped'},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'Examples of LG (Dingbat) Icons:'},
			{kind: Icon, icon: '&#42276;', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: '&#42381;', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: '&#42391;', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: '&#42322;', small: false, ontap: 'buttonTapped'},
			{kind: Icon, icon: '&#42276;', ontap: 'buttonTapped'},
			{kind: Icon, icon: '&#42381;', ontap: 'buttonTapped'},
			{kind: Icon, icon: '&#42391;', ontap: 'buttonTapped'},
			{kind: Icon, icon: '&#42322;', ontap: 'buttonTapped'},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'Image Asset Icons (Raster Image) Buttons:'},
			{kind: Icon, src: 'assets/icon-list.png', ontap: 'buttonTapped'},
			{kind: Icon, src: 'assets/icon-album.png', ontap: 'buttonTapped'},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'Image Asset Icons (Vector Image) Buttons:'},
			{kind: Icon, src: 'assets/magnify.svg', small: false, ontap: 'buttonTapped'},
			{kind: Icon, src: 'assets/trash.svg', small: false, ontap: 'buttonTapped'},
			{kind: Icon, src: 'assets/magnify.svg', ontap: 'buttonTapped'},
			{kind: Icon, src: 'assets/trash.svg', ontap: 'buttonTapped'},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'Disabled Icons:'},
			{kind: Icon, icon: 'search', ontap: 'buttonTapped', disabled: true},
			{kind: Icon, icon: '&#42276;', ontap: 'buttonTapped', disabled: true},
			{kind: Icon, src: 'assets/icon-list.png', ontap: 'buttonTapped', disabled: true},
			{kind: Icon, src: 'assets/icon-album.png', ontap: 'buttonTapped', disabled: true},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'Icons inside a spottable Item:'},
			{kind: Item, classes: 'moon-hspacing', ontap: 'buttonTapped', components: [
				{content: 'Selectable Item'},
				{kind: Icon, icon: '&#42276;', ontap: 'buttonTapped'},
				{kind: Icon, src: 'assets/icon-list.png', ontap: 'buttonTapped'}
			]}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'console', content: 'No changes yet'}
	],
	buttonTapped: function (sender, ev) {
		this.$.console.setContent(sender.name + ' tapped.');
	}
});

}],'src/ImageBadgeSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	Divider = require('moonstone/Divider'),
	Icon = require('moonstone/Icon'),
	Img = require('moonstone/Image'),
	Item = require('moonstone/Item'),
	Scroller = require('moonstone/Scroller');

module.exports = kind({
	name: 'moon.sample.ImageBadgeSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit image-badge-sample',
	components: [
		{kind: Scroller, fit: true, components: [
			{kind: Divider, content: 'Image Badges:'},
			{kind: Img, src: 'http://placehold.it/342x360&text=Image+One', alt: 'Image One', overlayShowing: true, overlayPosition: 'bottom', overlayComponents: [
				{kind:Icon, icon: 'skipbackward'},
				{kind:Icon, icon: 'play'},
				{kind:Icon, icon: 'skipforward'},
				{kind:Icon, icon: 'search', classes: 'float-right'}
			]},
			{kind: Img, src: {
				'hd' : 'http://placehold.it/228x240&text=Image+Two',
				'fhd': 'http://placehold.it/342x360&text=Image+Two'
			}, alt: 'Image Two', overlayShowing: true, overlayPosition: 'bottom', overlayComponents: [
				{kind:Icon, icon: 'check'},
				{kind:Icon, icon: 'closex'},
				{kind:Icon, icon: 'drawer', classes: 'float-right'}
			]},
			{kind: Img, src: {
				'hd' : 'http://placehold.it/120x160&text=Image+Three',
				'fhd': 'http://placehold.it/180x240&text=Image+Three'
			}, alt: 'Image Three', overlayShowing: true, overlayPosition: 'bottom', overlayComponents: [
				{kind:Icon, icon: 'closex'}
			]},
			
			{kind: Divider, classes: 'image-badge-sample-divider', content: 'Image Badges - Show on Spotlight:'},
			{kind: Item, components: [
				{kind: Img, src: 'http://placehold.it/342x360&text=Image+One', alt: 'Image One', overlayShowing: 'spotlight', overlayPosition: 'bottom', overlayComponents: [
					{kind:Icon, icon: 'skipbackward'},
					{kind:Icon, icon: 'play'},
					{kind:Icon, icon: 'skipforward'},
					{kind:Icon, icon: 'search', classes: 'float-right'}
				]}
			]},
			{kind: Item, components: [
				{kind: Img, src: {
					'hd' : 'http://placehold.it/228x240&text=Image+Two',
					'fhd': 'http://placehold.it/342x360&text=Image+Two'
				}, alt: 'Image Two', overlayShowing: 'spotlight', overlayPosition: 'bottom', overlayComponents: [
					{kind:Icon, icon: 'check'},
					{kind:Icon, icon: 'closex'},
					{kind:Icon, icon: 'drawer', classes: 'float-right'}
				]}
			]},
			{kind: Item, components: [
				{kind: Img, src: {
					'hd' : 'http://placehold.it/120x160&text=Image+Three',
					'fhd': 'http://placehold.it/180x240&text=Image+Three'
				}, alt: 'Image Three', overlayShowing: 'spotlight', overlayPosition: 'bottom', overlayComponents: [
					{kind:Icon, icon: 'closex'}
				]}
			]}
		]}
	]
});
}],'src/ImageItemSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Divider = require('moonstone/Divider'),
	ImageItem = require('moonstone/ImageItem'),
	Scroller = require('moonstone/Scroller'),
	Img = require('enyo/Image');

module.exports = kind({
	name: 'moon.sample.ImageItemSample',
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Scroller, classes: 'enyo-fill', components: [
			{
				components: [
					{kind: Divider, content: 'Left-aligned', spotlight: true},
					{
						components: [
							{
								kind: ImageItem,
								source: Img.placeholder,
								label: 'Breaking Bad',
								text: 'A struggling high school chemistry teacher who is diagnosed with inoperable lung cancer turns to a life of crime, producing and selling methamphetamine with a former student'
							},
							{
								kind: ImageItem,
								source: Img.placeholder,
								label: 'South Park',
								text: 'Follows the misadventures of four irreverent grade schoolers in the quiet, dysfunctional town of South Park, Colorado.'
							},
							{
								kind: ImageItem,
								source: Img.placeholder,
								label: 'Paulie',
								text: 'Life from a parrot\'s point of view.'
							}
						]
					}
				]
			},
			{tag: 'br'},
			{
				components: [
					{kind: Divider, content: 'Right-aligned'},
					{
						components: [
							{
								kind: ImageItem,
								source: Img.placeholder,
								label: 'Breaking Bad',
								imageAlignRight: true,
								text: 'A struggling high school chemistry teacher who is diagnosed with inoperable lung cancer turns to a life of crime, producing and selling methamphetamine with a former student'
							},
							{
								kind: ImageItem,
								source: Img.placeholder,
								label: 'South Park',
								imageAlignRight: true,
								text: 'Follows the misadventures of four irreverent grade schoolers in the quiet, dysfunctional town of South Park, Colorado.'
							},
							{
								kind: ImageItem,
								source: Img.placeholder,
								label: 'Paulie',
								imageAlignRight: true,
								text: 'Life from a parrot\'s point of view.'
							}
						]
					}
				]
			}
		]}
	]
});
}],'src/InputSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	BodyText = require('moonstone/BodyText'),
	Divider = require('moonstone/Divider'),
	Icon = require('moonstone/Icon'),
	Input = require('moonstone/Input'),
	InputDecorator = require('moonstone/InputDecorator'),
	RichText = require('moonstone/RichText'),
	Scroller = require('moonstone/Scroller'),
	TextArea = require('moonstone/TextArea');

module.exports = kind({
	name: 'moon.sample.InputSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit moon-input-sample',
	components: [
		{kind: Divider, content: 'Inputs'},
		{kind: Scroller, horizontal: 'hidden', fit: true, components: [
			{components: [
				{kind: InputDecorator, components: [
					{kind: Input, placeholder: 'JUST TYPE', oninput:'handleInput', onchange:'handleChange'}
				]},
				{kind: InputDecorator, components: [
					{kind: Input, placeholder: 'Search term', oninput:'handleInput', onchange:'handleChange'},
					{kind: Icon, icon: 'search'}
				]}
			]},
			{components: [
				{kind: InputDecorator, components: [
					{kind: Input, type:'password', placeholder: 'Enter password', oninput:'handleInput', onchange:'handleChange'}
				]},
				{kind: InputDecorator, components: [
					{kind: Input, type:'number', placeholder: 'Enter number', oninput:'handleInput', onchange:'handleChange'}
				]},
				{kind: InputDecorator, components: [
					{kind: Input, placeholder: 'Placeholder for initial value', value: 'This is the initial value', oninput:'handleInput', onchange:'handleChange'}
				]}
			]},
			{components: [
				{kind: InputDecorator, components: [
					{kind: Input, placeholder: 'Placeholder for value with ellipsis', value: 'This is the initial value that is of a certain length to display an ellipsis.', oninput:'handleInput', onchange:'handleChange'}
				]},
				{kind: InputDecorator, components: [
					{kind: Input, placeholder: 'Dismiss on Enter', dismissOnEnter:true, oninput:'handleInput', onchange:'handleChange'}
				]},
				{kind: InputDecorator, disabled: true, components: [
					{kind: Input, disabled: true, placeholder: 'Disabled input'}
				]}
			]},
			{kind: Divider, content: 'TextAreas'},
			{kind: InputDecorator, components: [
				{kind: TextArea, placeholder: 'Enter text here', oninput: 'handleInput', onchange: 'handleChange'}
			]},
			{kind: InputDecorator, components: [
				{kind: TextArea, placeholder: 'JUST TYPE', oninput: 'handleInput', onchange: 'handleChange'}
			]},
			{kind: InputDecorator, disabled: true, components: [
				{kind: TextArea, disabled: true, placeholder: 'Deactivated TextArea', oninput: 'handleInput', onchange: 'handleChange'}
			]},

			{kind: Divider, content: 'RichTexts'},
			{kind: InputDecorator, components: [
				{kind: RichText, oninput: 'handleInput', onchange: 'handleChange'}
			]},
			{kind: InputDecorator, components: [
				{kind: RichText, style: 'width: 240px;', oninput: 'handleInput', onchange: 'handleChange'},
				{kind: Icon, icon: 'search'}
			]},
			{kind: InputDecorator, disabled: true, components: [
				{kind: RichText, disabled: true, style: 'width: 240px;'}
			]},

			{kind: Divider, content: 'Range Inputs'},
			{classes: 'range-inputs', components: [
				{name: 'rangeInput', kind: InputDecorator, invalidMessage: 'Please enter a number between 25 and 100.', components: [
					{kind: Input, placeholder: 'Enter a number', type: 'number', attributes: { min: 25, max: 100 }, style: 'width: 300px;', onchange:'handleChange', oninput:'handleRangeInput'}
				]},
				{name: 'zipCodeInput', kind: InputDecorator, invalidMessage: 'Please enter a 5 digit zip code.', components: [
					{kind: Input, placeholder: 'Enter a zip code', type: 'number', style: 'width: 300px;', onchange:'handleChange', oninput:'handleZipInput'}
				]},
				{name: 'nameInput', kind: InputDecorator, invalid: true, invalidMessage: 'Please enter a name.', components: [
					{kind: Input, style: 'width: 300px;', onchange:'handleChange', oninput:'handleNameInput'}
				]}
			]}
		]},
		{kind: Divider, content: 'Result', classes: 'moon-input-sample-result'},
		{kind: BodyText, name: 'console', allowHtml: false, content: 'Input: '},
		{kind: Divider, content: 'Bottom-aligned inputs', classes: 'moon-input-sample-result'},
		{components: [
			{kind: InputDecorator, components: [
				{kind: Input, placeholder: 'Bottom', oninput: 'handleInput', onchange: 'handleChange'}
			]},
			{kind: InputDecorator, components: [
				{kind: Input, placeholder: 'Aligned', oninput: 'handleInput', onchange: 'handleChange'}
			]},
			{kind: InputDecorator, components: [
				{kind: Input, placeholder: 'Inputs', oninput: 'handleInput', onchange: 'handleChange'}
			]}
		]}
	],
	handleInput: function (sender, ev) {
		this.$.console.setContent('Input: ' + sender.getValue());
	},
	handleChange: function (sender, ev) {
		this.$.console.setContent('Changed: ' + sender.getValue());
	},
	handleRangeInput: function (sender, ev) {
		this.$.rangeInput.set('invalid', !ev.target.validity.valid);
	},
	handleZipInput: function (sender, ev) {
		var value = ev.target.value,
			length = value ? value.length : 0;
		this.$.zipCodeInput.set('invalid', length !== 0 && length !== 5);
	},
	handleNameInput: function (sender, ev) {
		var value = ev.target.value,
			length = value && value.length,
			control = this.$.nameInput;
		if (!value) {
			control.set('invalidMessage', 'Please enter a name.');
			control.set('invalid', true);
		} else if (length < 3) {
			control.set('invalidMessage', 'Please enter a name that is at least 3 characters.');
			control.set('invalid', true);
		} else {
			control.set('invalid', false);
		}
	}
});

}],'src/ItemSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	BodyText = require('moonstone/BodyText'),
	Divider = require('moonstone/Divider'),
	Icon = require('moonstone/Icon'),
	Img = require('moonstone/Image'),
	Item = require('moonstone/Item'),
	Marquee = require('moonstone/Marquee'),
	MarqueeText = Marquee.Text,
	Scroller = require('moonstone/Scroller');

module.exports = kind({
	name: 'moon.sample.ItemSample',
	classes: 'moon enyo-unselectable enyo-fit moon-item-sample-wrapper',
	components: [
		{kind: Scroller, classes: 'enyo-fill moon-7h', components: [
			{kind: Divider, content: 'Simple Item Samples'},
			{components: [
				{kind: Item, content: 'Item 1'},
				{kind: Item, content: 'Item 2 (Disabled)', disabled:true},
				{kind: Item, content: 'Item 3 (Disabled) with really long marqueed text', disabled:true},
				{kind: Item, content: 'Item 4'},
				{kind: Item, content: 'Item with very long text that should truncate'},
				{kind: Item, content: 'Item   with   extra   spaces   that   should   truncate'}
			]},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'Complex Item Samples'},
			{components: [
				{kind: Item, components: [
					{kind: Icon, icon: 'drawer'},
					{tag: 'span', content: 'Item with components'}
				]},
				{kind: Item, components: [
					{kind: MarqueeText, content: 'Item with more complex components'},
					{kind: Img, src: {
						'hd' : 'http://placehold.it/288x60&text=Image+One',
						'fhd': 'http://placehold.it/432x90&text=Image+One'
					}, alt: 'Image One'},
					{kind: Img, src: {
						'hd' : 'http://placehold.it/288x60&text=Image+Two',
						'fhd': 'http://placehold.it/432x90&text=Image+Two'
					}, alt: 'Img Two'}
				]},
				{kind: Item, components: [
					{kind: MarqueeText, content: 'Item with more complex components'},
					{kind: Img, src: {
						'hd' : 'http://placehold.it/100x100&text=Image+Three',
						'fhd': 'http://placehold.it/150x150&text=Image+Three'
					}, style: 'float: left; margin: 10px 10px 10px 0', alt: 'Image Two'},
					{kind: BodyText, style: 'margin: 10px 0', content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.'}
				]},
				{kind: Item, components: [
					{kind: MarqueeText, content: 'Item with more complex components'},
					{kind: Img, src: {
						'hd' : 'http://placehold.it/100x100&text=Image+Four',
						'fhd': 'http://placehold.it/150x150&text=Image+Four'
					}, style: 'float: right; margin: 10px 0px 10px 10px', alt: 'Image Two'},
					{kind: BodyText, style: 'margin: 10px 0', content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.'}
				]}
			]}
		]}
	]
});
}],'src/ItemOverlaySample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Divider = require('moonstone/Divider'),
	Icon = require('moonstone/Icon'),
	Item = require('moonstone/Item'),
	ItemOverlay = require('moonstone/ItemOverlay'),
	ItemOverlaySupport = ItemOverlay.ItemOverlaySupport,
	Marquee = require('moonstone/Marquee'),
	MarqueeText = Marquee.Text,
	Scroller = require('moonstone/Scroller');

module.exports = kind({
	name: 'moon.sample.ItemOverlaySample',
	classes: 'moon enyo-unselectable enyo-fit moon-item-overlay-sample-wrapper',
	components: [
		{kind: Scroller, classes: 'enyo-fill moon-7h', components: [
			{kind: Divider, content: 'Simple ItemOverlay Sample'},
			{components: [
				{kind: Item, mixins: [ItemOverlaySupport], beginningComponents: [
						{kind: Icon, icon: 'search', small: true}
					], components: [
						{kind: MarqueeText, content: 'Item with icon on the left side'}
					]
				},
				{kind: Item, mixins: [ItemOverlaySupport], endingComponents: [
						{kind: Icon, icon: 'check', small: true}
					], components: [
						{kind: MarqueeText, content: 'Item with icon on the right side'}
					]
				}
			]},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'ItemOverlay with multiple icons Sample'},
			{components: [
				{kind: Item, mixins: [ItemOverlaySupport], beginningComponents: [
						{kind: Icon, icon: 'arrowlargeup', small: true},
						{kind: Icon, icon: 'arrowlargedown', small: true},
						{kind: Icon, icon: 'arrowlargeleft', small: true},
						{kind: Icon, icon: 'arrowlargeright', small: true}
					], components: [
						{kind: MarqueeText, content: 'Multiple Icons can be used'}
					]
				},
				{kind: Item, mixins: [ItemOverlaySupport], endingComponents: [
						{kind: Icon, icon: 'arrowlargeup', small: true},
						{kind: Icon, icon: 'arrowlargedown', small: true},
						{kind: Icon, icon: 'arrowlargeleft', small: true},
						{kind: Icon, icon: 'arrowlargeright', small: true}
					], components: [
						{kind: MarqueeText, content: 'Multiple Icons can be used'}
					]
				},
				{kind: Item, mixins: [ItemOverlaySupport], beginningComponents: [
						{kind: Icon, icon: 'arrowextend', small: true}
					], endingComponents: [
						{kind: Icon, icon: 'arrowshrink', small: true}
					], components: [
						{kind: MarqueeText, content: 'Use left and right overlay at the same time'}
					]
				}
			]},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'ItemOverlay Auto Hide Sample'},
			{components: [
				{kind: Item, mixins: [ItemOverlaySupport], autoHideBeginning: true, beginningComponents: [
						{kind: Icon, src: 'assets/icon-list.png', small: true}
					], components: [
						{kind: MarqueeText, content: 'These text are flow when item is getting focused'}
					]
				},
				{kind: Item, mixins: [ItemOverlaySupport], autoHideEnding: true, endingComponents: [
						{kind: Icon, src: 'assets/icon-album.png', small: true}
					], components: [
						{kind: MarqueeText, content: 'These text are flow when item is getting focused'}
					]
				}
			]},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'Combine both autoHide true and false'},
			{components: [
				{kind: Item, mixins: [ItemOverlaySupport], autoHideEnding: true, beginningComponents: [
						{kind: Icon, icon: 'search', small: true}
					], endingComponents: [
						{kind: Icon, icon: 'backward', small: true},
						{kind: Icon, icon: 'play', small: true},
						{kind: Icon, icon: 'forward', small: true}
					], components: [
						{kind: MarqueeText, content: 'Both static and autoHiding ItemOverlays'}
					]
				}
			]}
		]}
	]
});
}],'src/LabeledTextItemSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Scroller = require('moonstone/Scroller'),
	LabeledTextItem = require('moonstone/LabeledTextItem');

module.exports = kind({
	name: 'moon.sample.LabeledTextItemSample',
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Scroller, classes: 'enyo-fill', components: [
			{
				kind: LabeledTextItem,
				label: 'Breaking Bad',
				text: 'A struggling high school chemistry teacher who is diagnosed with inoperable lung cancer turns to a life of crime, producing and selling methamphetamine with a former student'
			},
			{
				kind: LabeledTextItem,
				label: 'South Park',
				text: 'Follows the misadventures of four irreverent grade schoolers in the quiet, dysfunctional town of South Park, Colorado.'
			},
			{
				kind: LabeledTextItem,
				label: 'Paulie',
				text: 'Life from a parrot\'s point of view.'
			}
		]}
	]
});
}],'src/MarqueeSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	Button = require('moonstone/Button'),
	Divider = require('moonstone/Divider'),
	Input = require('moonstone/Input'),
	InputDecorator = require('moonstone/InputDecorator'),
	Marquee = require('moonstone/Marquee'),
	MarqueeDecorator = Marquee.Decorator,
	MarqueeItem = Marquee.Item,
	MarqueeSupport = Marquee.Support,
	MarqueeText = Marquee.Text,
	Scroller = require('moonstone/Scroller');

module.exports = kind({
	name: 'moon.sample.MarqueeSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit moon-marquee-sample',
	components: [
		{kind: Scroller, fit: true, components: [
			{classes: 'moon-marquee-sample-wrapper', components: [

				{kind: Divider, content: 'Marquee on start:'},
				{kind: MarqueeDecorator, marqueeOnRender: true, components: [
					{name: 'marqueeStartOnRender1', kind: MarqueeText, classes: 'moon-marquee-start-on-render', content: 'This first long text for the marquee test starts the marquee on page render'},
					{name: 'marqueeStartOnRender2', kind: MarqueeText, classes: 'moon-marquee-start-on-render', content: 'This second long text for the marquee test is synchronized with the first marquee text'}
				]},
				{name: 'marqueeStartOnRender3', marqueeOnRender: true, mixins: [MarqueeSupport, MarqueeItem], classes: 'moon-marquee-start-on-render', content: 'This third long text for the marquee test is not synchronized with first and second marquee texts'},
				{tag: 'br'},

				{kind: Divider, content: 'Marquee on focus:'},
				{kind: MarqueeDecorator, marqueeOnSpotlight: true, components: [
					{name: 'marqueeStartOnFocus1', kind: MarqueeText, spotlight: true, classes: 'moon-marquee-start-on-focus', content: 'This first long text for the marquee test starts the marquee on focus'},
					{name: 'marqueeStartOnFocus2', kind: MarqueeText, spotlight: true, classes: 'moon-marquee-start-on-focus', content: 'This second long text for the marquee test is synchronized with the first marquee text'}
				]},
				{name: 'marqueeStartOnFocus3', marqueeOnSpotlight: true, mixins: [MarqueeSupport, MarqueeItem], spotlight: true, classes: 'moon-marquee-start-on-focus', content: 'This third long text for the marquee test is not synchronized with first and second marquee texts'},
				{tag: 'br'},

				{kind: Divider, content: 'Marquee on Hover:'},
				{kind: MarqueeDecorator, marqueeOnHover: true, marqueeOnSpotlight: false, components: [
					{name: 'marqueeStartOnHover1', kind: MarqueeText, classes: 'moon-marquee-start-on-hover', content: 'This first long text for the marquee test starts the marquee on mouse hover'},
					{name: 'marqueeStartOnHover2', kind: MarqueeText, classes: 'moon-marquee-start-on-hover', content: 'This second long text for the marquee test is synchronized with the first marquee text'}
				]},
				{name: 'marqueeStartOnHover3', marqueeOnHover: true, marqueeOnSpotlight: false, mixins: [MarqueeSupport, MarqueeItem], classes: 'moon-marquee-start-on-hover', content: 'This third long text for the marquee test is not synchronized with first and second marquee texts'},
				{tag: 'br'},


				{kind: Divider, content: 'Marquee on content changed:'},
				{kind: InputDecorator, components: [
					{kind: Input, placeholder: 'JUST TYPE', oninput: 'contentChange'}

				]},
				{kind: Button, content: 'Start marquee', ontap: 'start'},
				{kind: Button, content: 'Stop marquee', ontap: 'stop'},
				{name: 'marqueeContent1', marqueeOnRender: true, mixins: [MarqueeSupport, MarqueeItem], classes: 'moon-marquee-start-on-render', content: 'This long text is for marquee content change test for the separate marquee case'},
				{name: 'marqueeContent2', marqueeOnRender: true, mixins: [MarqueeSupport, MarqueeItem], classes: 'moon-marquee-start-on-render', centered: true, content: 'Centered text for separate marquee case'},
				{name: 'marqueeContainer1', mixins: [MarqueeSupport], marqueeOnRender: true, components: [
					{name: 'marqueeContent3', mixins: [MarqueeItem], classes: 'moon-marquee-start-on-render', content: 'This is long text for marquee content change test for synchronized case'},
					{name: 'marqueeContent4', mixins: [MarqueeItem], classes: 'moon-marquee-start-on-render', content: 'This is short text for marquee'},
					{name: 'marqueeContent5', mixins: [MarqueeItem], classes: 'moon-marquee-start-on-render', centered: true, content: 'This is centered text for marquee'}
				]},
				{tag: 'br'},

				{kind: Divider, content: 'Marquee speed:'},
				{name: 'marqueeSpeed', marqueeOnRender: true, marqueeSpeed: 180, mixins: [MarqueeSupport, MarqueeItem], classes: 'moon-marquee-start-on-render', content: 'This is long text for fast marquee speed test, which is twice as fast as normal marquee'},
				{tag: 'br'},

				{kind: Divider, content: 'Marquee pause:'},
				{name: 'marqueePause1', marqueeOnRender: true, mixins: [MarqueeSupport, MarqueeItem], classes: 'moon-marquee-start-on-render', content: 'This long text for marquee has a 1000ms pause time'},
				{name: 'marqueePause2', marqueeOnRender: true, marqueePause: 2000, mixins: [MarqueeSupport, MarqueeItem], classes: 'moon-marquee-start-on-render', content: 'This long text for marquee has a 2000ms pause time'},
				{tag: 'br'},

				{kind: Divider, content: 'Disabled Text marquee:'},
				{name: 'marqueeDisabled', marqueeOnRender: true, disabled: true, mixins: [MarqueeSupport, MarqueeItem], classes: 'moon-marquee-start-on-render', content: 'This is long text for the marquee test with a disabled property'},
				{tag: 'br'},

				{kind: Divider, content: 'Disabled Wrap Instead Of Marquee:'},
				{name: 'marqueeDisabledWrap', wrapInsteadOfMarquee: true, disabled: true, mixins: [MarqueeSupport, MarqueeItem], classes: 'moon-marquee-start-on-render', content: 'This is long text for disabled text which wraps because wrapInsteadOfMarquee is set to true'},
				{tag: 'br'},

				{kind: Divider, content: 'LTR Languages:'},
				{mixins: [MarqueeSupport], marqueeOnRender: true, components: [
					{marqueeOnRender: true, mixins: [MarqueeItem], classes: 'moon-marquee-start-on-render', content: 'The quick brown fox jumped over the lazy dog.  The bean bird flies at sundown.'},
					{marqueeOnRender: true, mixins: [MarqueeItem], classes: 'moon-marquee-start-on-render', content: 'Η γρήγορη καφέ αλεπού πήδηξε πάνω από το μεσημέρι. Το πουλί πετά σε φασολιών δύση του ηλίου.'},
					{marqueeOnRender: true, mixins: [MarqueeItem], classes: 'moon-marquee-start-on-render', content: 'ਤੁਰੰਤ ਭੂਰਾ Fox ਆਲਸੀ ਕੁੱਤੇ ਨੂੰ ਵੱਧ ਗਈ. ਬੀਨ ਪੰਛੀ ਸੂਰਜ ਡੁੱਬਣ \'ਤੇ ਉਡਾਣ ਭਰਦੀ ਹੈ.'},
					{marqueeOnRender: true, mixins: [MarqueeItem], classes: 'moon-marquee-start-on-render', content: '速い茶色のキツネは、怠け者の犬を飛び越えた。豆の鳥は日没で飛ぶ。'},
					{marqueeOnRender: true, mixins: [MarqueeItem], classes: 'moon-marquee-start-on-render', content: '那只敏捷的棕色狐狸跃过那只懒狗。豆鸟飞日落。'},
					{marqueeOnRender: true, mixins: [MarqueeItem], classes: 'moon-marquee-start-on-render', content: '빠른 갈색 여우가 게으른 개를 뛰어 넘었다.콩 조류 일몰에 파리.'}
				]},
				{tag: 'br'},

				{kind: Divider, content: 'RTL Languages:'},
				{mixins: [MarqueeSupport], marqueeOnRender: true, components: [
					{marqueeOnRender: true, mixins: [MarqueeItem], classes: 'moon-marquee-start-on-render', content: 'שועל החום הזריז קפץ מעל הכלב העצלן.ציפור עפה השעועית עם שקיעה.'},
					{marqueeOnRender: true, mixins: [MarqueeItem], classes: 'moon-marquee-start-on-render', content: 'قفز الثعلب البني السريع فوق الكلب الكسول. الطيور تطير في الفول عند غروب الشمس.'},
					{marqueeOnRender: true, mixins: [MarqueeItem], classes: 'moon-marquee-start-on-render', content: 'فوری بھوری لومڑی سست کتے پر چھلانگ لگا. بین پرندوں سوریاست میں پرواز.'}
				]}
			]}
		]}
	],
	contentChange: function (sender, ev) {
		this.$.marqueeContent1.setContent(sender.getValue());
		this.$.marqueeContent2.setContent(sender.getValue());
		this.$.marqueeContent3.setContent(sender.getValue());
	},
	start: function (sender, ev) {
		this.$.marqueeContent1.startMarquee();
		this.$.marqueeContent2.startMarquee();
		this.$.marqueeContainer1.startMarquee();
	},
	stop: function (sender, ev) {
		this.$.marqueeContent1.stopMarquee();
		this.$.marqueeContent2.stopMarquee();
		this.$.marqueeContainer1.stopMarquee();
	}
});

}],'src/ObjectActionHorizontalTypeSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Repeater = require('enyo/Repeater'),
	FittableRows = require('layout/FittableRows'),
	BodyText = require('moonstone/BodyText'),
	Divider = require('moonstone/Divider'),
	IconButton = require('moonstone/IconButton'),
	ImageItem = require('moonstone/ImageItem'),
	ObjectActionDecorator = require('moonstone/ObjectActionDecorator'),
	Scroller = require('moonstone/Scroller');

module.exports = kind({
	name: 'moon.sample.ObjectActionHorizontalTypeSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit',
	handlers: {
		ontap: 'ontap'
	},
	components: [
		{kind: Divider, content: 'Object Action: horizontal Type Sample'},
		{kind: Scroller, fit: true, components: [
			{kind: Repeater, count:20, onSetupItem: 'setupItem', components: [
				{kind: ObjectActionDecorator, orientation: 'horizontal', components: [
					{kind: ImageItem, source: 'assets/default-music.png'}
				], actionComponents: [
					{kind: IconButton, name: 'Icon1'},
					{kind: IconButton, name: 'Icon2'},
					{kind: IconButton, name: 'Icon3'}
				]}
			]}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'result', content: 'No item tapped yet.'}
	],
	setupItem: function (sender, ev) {
		ev.item.$.imageItem.setSource('http://placehold.it/200x300/' + Math.floor(Math.random()*0x1000000).toString(16) + '/ffffff&text=Image ' + ev.index);
		ev.item.$.imageItem.setLabel('label ' + ev.index);
		ev.item.$.imageItem.setText('Item ' + ev.index + ': Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
	},
	ontap: function (sender, ev) {
		this.$.result.setContent(ev.originator.name + ' tapped.');
	}
});



}],'src/ObjectActionVerticalTypeSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	Img = require('enyo/Image'),
	Repeater = require('enyo/Repeater'),
	FittableRows = require('layout/FittableRows'),
	Divider = require('moonstone/Divider'),
	Scroller = require('moonstone/Scroller'),
	Item = require('moonstone/Item'),
	Button = require('moonstone/Button'),
	ObjectActionDecorator = require('moonstone/ObjectActionDecorator'),
	BodyText = require('moonstone/BodyText');

module.exports = kind({
	name: 'moon.sample.ObjectActionVerticalTypeSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit',
	handlers: {
		ontap: 'ontap'
	},
	components: [
		{kind: Divider, content: 'Object Action: vertical Type Sample'},
		{kind: Scroller, fit: true, components: [
			{kind: Repeater, count: 20, classes: 'moon-hspacing', onSetupItem: 'setupItem', components: [
				{
					kind: ObjectActionDecorator,
					orientation: 'vertical',
					components: [
						{kind: Item, components: [
							{name: 'image', kind: Img}
						]}
					],
					actionComponents: [
						{kind: Button, name: 'Play', small: true, content: 'PLAY'},
						{kind: Button, name: 'Favorite', small: true, content: 'FAVORITE'},
						{kind: Button, name: 'Share', small: true, content: 'SHARE'}
					]
				}
			]}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'result', content: 'No item tapped yet.'}
	],
	setupItem: function (sender, ev) {
		var imageUrl = 'http://placehold.it/%./' + Math.floor(Math.random()*0x1000000).toString(16) + '/ffffff&text=Image ' + ev.index;
		ev.item.$.image.setSrc({
			'hd' : utils.format(imageUrl, '132x132'),
			'fhd': utils.format(imageUrl, '198x198')
		});
	},
	ontap: function (sender, ev) {
		this.$.result.setContent(ev.originator.name + ' tapped.');
	}
});



}],'src/OverlaySample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Img = require('enyo/Image'),
	FittableRows = require('layout/FittableRows'),
	Button = require('moonstone/Button'),
	Divider = require('moonstone/Divider'),
	ClampedText = require('moonstone/ClampedText'),
	GridListImageItem = require('moonstone/GridListImageItem'),
	Icon = require('moonstone/Icon'),
	IconButton = require('moonstone/IconButton'),
	Input = require('moonstone/Input'),
	InputDecorator = require('moonstone/InputDecorator'),
	Overlay = require('moonstone/Overlay'),
	Scroller = require('moonstone/Scroller');

function img (w, h, text, color) {
	text = text || 'Image';
	color = color || ('00000' + Math.floor(Math.random()*16777216).toString(16)).slice(-6);
	return 'http://placehold.it/' + w + 'x' + h + '/' + color + '/ffffff&text=' + text;
}

module.exports = kind({
	name: 'moon.sample.OverlaySupportSample',
	kind: FittableRows,
	classes: 'moon enyo-fit samples-moon-overlay moon-overlay-enabled',
	components: [
		{kind: Scroller, fit: true, components: [
			{kind: Divider, content: 'Action Overlay'},
			{kind: GridListImageItem, source: img(300, 300), placeholder: Img.placeholder, caption: 'position-bottom', ontap: 'itemTapped',
				overlayShowing: 'spotlight', overlayPosition: 'bottom', overlayComponents: [
					{kind: Icon, icon: 'play', ontap: 'badgeTapped'}
				]
			},
			{kind: GridListImageItem, source: img(300, 300), placeholder: Img.placeholder, caption: 'position-top', ontap: 'itemTapped',
				overlayShowing: 'spotlight', overlayPosition: 'top', overlayComponents: [
					{kind: Icon, icon: 'play', ontap: 'badgeTapped'}
				]
			},
			{kind: GridListImageItem, source: img(300, 300), placeholder: Img.placeholder, caption: 'position-bottom', subCaption: 'align-right', ontap: 'itemTapped',
				overlayShowing: 'spotlight', overlayPosition: 'bottom', overlayAlign: 'right', overlayComponents: [
					{kind: Icon, icon: 'play', ontap: 'badgeTapped'}
				]
			},
			{kind: GridListImageItem, source: img(300, 300), placeholder: Img.placeholder, caption: 'position-top', subCaption: 'align-right', ontap: 'itemTapped',
				overlayShowing: 'spotlight', overlayPosition: 'top', overlayAlign: 'right', overlayComponents: [
					{kind: Icon, icon: 'play', ontap: 'badgeTapped'}
				]
			},
			{kind: GridListImageItem, source: img(300, 300), placeholder: Img.placeholder, caption: 'Multiple Icons', ontap: 'itemTapped',
				overlayShowing: 'spotlight', overlayPosition: 'bottom', overlayAlign: 'right', overlayComponents: [
					{kind: Icon, icon: 'flag', ontap: 'badgeTapped'},
					{kind: Icon, icon: 'star', ontap: 'badgeTapped'},
					{kind: Icon, icon: 'play', ontap: 'badgeTapped'}
				]
			},
			{kind: GridListImageItem, source: img(300, 300), placeholder: Img.placeholder, caption: 'Icon Button', subCaption: 'Transparent BG', ontap: 'itemTapped',
				overlayShowing: 'spotlight', overlayPosition: 'bottom', overlayAlign: 'right', overlayTransparent: true, overlayComponents: [
					{kind: IconButton, icon: 'play', spotlight: false, backgroundOpacity: 'translucent', style: 'margin: 0;', ontap: 'badgeTapped'}
				]
			},
			{kind: GridListImageItem, source: img(300, 300), placeholder: Img.placeholder, caption: 'Centered Icon Button', ontap: 'itemTapped',
				overlayShowing: 'spotlight', overlayPosition: 'centered', overlayComponents: [
					{kind: IconButton, icon: 'play', spotlight: false, small: false, backgroundOpacity: 'translucent', style: 'margin: 12px;', ontap: 'badgeTapped'}
				]
			},


			{kind: Divider, content: 'Selection Overlay'},
			// enyo/DataRepeater adds the `selection-enabled` class when selection is enabled
			// (appropriately enough). Simulating the same here.
			{classes: 'selection-enabled', components: [
				{kind: GridListImageItem, source: 'http://lorempixel.com/640/480/city/9/', placeholder: Img.placeholder, caption: 'Unselected', subCaption: 'Scrimmed', ontap: 'toggleSelected',
					mixins: [Overlay.Selection], overlayTransparent: false
				},
				{kind: GridListImageItem, source: 'http://lorempixel.com/640/480/city/9/', placeholder: Img.placeholder, caption: 'Unselected', subCaption: 'Transparent', ontap: 'toggleSelected',
					mixins: [Overlay.Selection]
				},
				{kind: GridListImageItem, selected: true, source: 'http://lorempixel.com/640/480/nature/5/', placeholder: Img.placeholder, caption: 'Selected', subCaption: 'Scrimmed', ontap: 'toggleSelected',
					mixins: [Overlay.Selection], overlayTransparent: false
				},
				{kind: GridListImageItem, selected: true, source: 'http://lorempixel.com/640/480/nature/5/', placeholder: Img.placeholder, caption: 'Selected', subCaption: 'Transparent', ontap: 'toggleSelected',
					mixins: [Overlay.Selection]
				}
			]},


			{kind: Divider, content: 'Text Overlay'},
			{kind: GridListImageItem, source: 'http://lorempixel.com/300/300/technics', placeholder: Img.placeholder, caption: 'Text Only', ontap: 'itemTapped',
				mixins: [Overlay.Text], overlayShowing: 'spotlight', overlayTitle: 'Technics', overlaySubtitle: '12'
			},
			{kind: GridListImageItem, source: 'http://lorempixel.com/300/300/people', placeholder: Img.placeholder, caption: 'Clamped Title', ontap: 'itemTapped',
				mixins: [Overlay.Text], overlayShowing: 'spotlight', overlayComponents: [
					// overlayComponents provided by Overlay.Text can be overridden for custom
					// behavior like clamping the text to 3 lines. If the overlay is not always
					// visible, clamped must be set to 'always' because the dimensions cannot be
					// accurately calculated when the ClampedText control isn't showing.
					{kind: ClampedText, maxLines: 3, clamped: 'always', classes: 'moon-overlay-text-title', content: 'This is probably too long to put in a text overlay but let\'s say you wanted to anyway'},
					{classes: 'moon-overlay-text-subtitle', content: '3 lines'}
				]
			},
			{kind: GridListImageItem, source: 'http://lorempixel.com/300/300/city', placeholder: Img.placeholder, caption: 'Marquee Title', ontap: 'itemTapped',
				mixins: [Overlay.Marquee], overlayShowing: 'spotlight', overlayTitle: 'Some Important Information To Share', overlaySubtitle: '15'
			},
			{kind: GridListImageItem, source: 'http://lorempixel.com/300/300/abstract', placeholder: Img.placeholder, caption: 'Marquee Both', subCaption: 'Will marquee with the overlay text', ontap: 'itemTapped',
				mixins: [Overlay.Marquee], overlayShowing: 'spotlight', overlayTitle: 'Some Important Information To Share', overlaySubtitle: '1,000,000,000,000'
			},


			{kind: Divider, content: 'More Complex Overlays'},
			{name: 'tapOverlay', mixins: [Overlay.Support], ontap: 'showOverlay', style: 'width: 500px; height: 300px;', components: [
				{kind: Img, src: img(500, 300, 'Tap to Show')}
			], overlayShowing: false, overlayComponents: [
				// overlayComponents can contain any controls and will be laid out within an
				// absolutely-positioned container matching the size of the mixing control
				{kind: InputDecorator, components: [
					{kind: Input, placeholder: 'Full Name'}
				]},
				{kind: Button, content: 'Continue', style: 'position: absolute; right: 0px; bottom: 12px;', ontap: 'hideOverlay'}
			]}
		]},
		{name: 'result', style: 'height: 50px;'}
	],
	itemTapped: function (sender, ev) {
		this.$.result.set('content', 'Item Tapped: ' + sender.id);
	},
	badgeTapped: function (sender, ev) {
		this.$.result.set('content', 'Badge Tapped: ' + sender.id);
		return true;
	},
	toggleSelected: function (sender, ev) {
		sender.set('selected', !sender.selected);
	},
	showOverlay: function (sender, ev) {
		this.$.tapOverlay.set('overlayShowing', true);
	},
	hideOverlay: function (sender, ev) {
		this.$.tapOverlay.set('overlayShowing', false);
		return true;
	}
});


}],'src/ProgressSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('moonstone/Button'),
	CheckboxItem = require('moonstone/CheckboxItem'),
	Divider = require('moonstone/Divider'),
	Input = require('moonstone/Input'),
	InputDecorator = require('moonstone/InputDecorator'),
	Scroller = require('moonstone/Scroller'),
	ProgressBar = require('moonstone/ProgressBar');

module.exports = kind({
	name: 'moon.sample.ProgressSample',
	classes: 'moon enyo-unselectable enyo-fit moon-progress-sample',
	components: [
		{kind: Scroller, classes: "enyo-fit", components: [
			{kind: Divider, content: 'Progress Bars'},
			{kind: ProgressBar, progress: 25},
			{kind: ProgressBar, progress: 25, bgProgress: 75},
			{kind: ProgressBar, progress: 50, barClasses: 'moon-progress-bar-bar green'},
			{kind: ProgressBar, progress: 50, barClasses: 'moon-progress-bar-bar red'},

			{kind: Divider, content: 'Progress Bars with Popup'},
			{kind: ProgressBar, progress: 25, popup: true},

			{kind: Divider, content: 'Vertical Orientation Progress Bars'},
			{classes: 'moon-hspacing', components: [
				{kind: ProgressBar, progress: 25, orientation: 'vertical', popup: true},
				{classes: 'moon-3h'},
				{kind: ProgressBar, progress: 25, orientation: 'vertical', style: 'height: 200px'},
				{classes: 'moon-3h'},
				{kind: ProgressBar, progress: 25, orientation: 'vertical', popup: true, popupSide: 'left', style: 'width: 60px; '}
			]},
			{classes: 'moon-1v'},

			{kind: InputDecorator, style: 'margin-right:10px;', components: [
				{kind: Input, placeholder: 'Value'}
			]},
			{kind: Button, content: 'Set', small: true, classes: 'spaced-button', ontap: 'changeValue'},
			{kind: Button, content: '-', small: true, classes: 'spaced-button', ontap: 'decValue'},
			{kind: Button, content: '+', small: true, classes: 'spaced-button', ontap: 'incValue'},
			{classes: 'moon-1v'},

			{style: 'width:240px;', components: [
				{name: 'animateSetting', kind: CheckboxItem, checked: true, content: 'Animated'}
			]}
		]}
	],
	changeValue: function (sender, ev) {
		for (var i in this.$) {
			if (this.$[i].kind == ProgressBar) {
				if (this.$.animateSetting.getChecked()) {
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
	}
});

}],'src/Scroller2dSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('moonstone/Button'),
	Scroller = require('moonstone/Scroller');

module.exports = kind({
	name: 'moon.sample.Scroller2dSample',
	classes: 'moon enyo-unselectable enyo-fit',
	components:[
		{
			kind: Scroller,
			classes: 'moon-scroller-sample-2d-scroller enyo-fill',
			components: [
				{style: 'width: 2350px; height: 1300px;', components: [
					{kind: Button, content: 'Button 1'},
					{kind: Button, content: 'Button 2'},
					{kind: Button, content: 'Button 3'},
					{kind: Button, content: 'Button 4'},
					{kind: Button, content: 'Button 5'},
					{kind: Button, content: 'Button 6'},
					{kind: Button, content: 'Button 7'},
					{kind: Button, content: 'Button 8'},
					{kind: Button, content: 'Button 9'},
					{kind: Button, content: 'Button 10'},
					{kind: Button, content: 'Button 11'},
					{kind: Button, content: 'Button 12'}
				]}
			]
		}
	]
});

}],'src/ScrollerHorizontalSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Img = require('enyo/Image'),
	Repeater = require('enyo/Repeater'),
	Divider = require('moonstone/Divider'),
	Item = require('moonstone/Item'),
	Scroller = require('moonstone/Scroller');

module.exports = kind({
	name: 'moon.sample.ScrollerHorizontalSample',
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Divider, content: 'Horizontal Scroller'},
		{kind: Scroller, vertical: 'hidden', spotlight: 'container', style: 'white-space: nowrap;', components: [
			{kind: Repeater, count: '50', components: [
				{kind: Item, classes: 'moon-scroller-sample-item enyo', style: 'display:inline-block;', components: [
					{kind: Img, src: 'moonstone/images/enyo-icon.png'}
				]}
			]}
		]}
	]
});

}],'src/ScrollerTextSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableColumns = require('layout/FittableColumns'),
	BodyText = require('moonstone/BodyText'),
	Button = require('moonstone/Button'),
	Divider = require('moonstone/Divider'),
	IconButton = require('moonstone/IconButton'),
	Panel = require('moonstone/Panel'),
	Scroller = require('moonstone/Scroller'),
	ToggleButton = require('moonstone/ToggleButton');

module.exports = kind({
	name: 'moon.sample.ScrollerTextSample',
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Panel, classes: 'enyo-fit', title: 'Text Scrolling Sample', titleBelow: 'Scroller buttons are focusable', headerComponents: [
			{kind: IconButton}
		], components: [
			{kind: Divider, content: 'Terms of Service'},
			{kind: Scroller, fit:true, horizontal: 'hidden', style: 'margin-bottom:20px;', components: [
				{kind: BodyText, name: 'text'}
			]},
			{kind: FittableColumns, noStretch:true, components: [
				{fit:true, components: [
					{kind: ToggleButton, name: 'lengthToggle', content: 'Long Text', value:true},
					{kind: ToggleButton, name: 'spotToggle', content: 'Spot Paging Controls', value:false},
					{kind: ToggleButton, name: 'hideToggle', content: 'Hide Paging Controls when fit', value:false}
				]},
				{kind: Button, content: 'Sign me Up!'}
			]}
		]}
	],
	longText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	shortText: 'The quick brown fox jumped over the lazy dog.',
	bindings: [
		{from: '$.lengthToggle.value', to: '$.text.content', transform: function (val) { return val ? this.longText : this.shortText; } },
		{from: '$.spotToggle.value', to: '$.scroller.spotlightPagingControls' },
		{from: '$.hideToggle.value', to: '$.scroller.hideScrollColumnsWhenFit' }
	]
});

}],'src/SelectableItemSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	Scroller = require('moonstone/Scroller'),
	Divider = require('moonstone/Divider'),
	SelectableItem = require('moonstone/SelectableItem'),
	Group = require('enyo/Group');

module.exports = kind({
	name: 'moon.sample.SelectableItemSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Scroller, fit: true, components: [
			{classes: 'moon-hspacing', controlClasses: 'moon-5h', components: [
				{components: [
					{kind: Divider, content: 'Selectable Items'},
					{kind: SelectableItem, content: 'Option 1', selected: true, onActivate: 'itemChanged'},
					{kind: SelectableItem, content: 'Option 2', onActivate: 'itemChanged'},
					{kind: SelectableItem, disabled: true, content: 'Disabled', onActivate: 'itemChanged'},
					{kind: SelectableItem, content: 'Option 4', selected: true, onActivate: 'itemChanged'},
					{kind: SelectableItem, content: 'Option 5 is very very very long', onActivate: 'itemChanged'}
				]},
				{components: [
					{kind: Divider, content: 'Selectable Item Group'},
					{kind: Group, onActivate: 'groupChanged', components: [
						{kind: SelectableItem, content: 'Group Option 1'},
						{kind: SelectableItem, content: 'Group Option 2'},
						{kind: SelectableItem, disabled: true, content: 'Disabled'},
						{kind: SelectableItem, content: 'Group Option 4'},
						{kind: SelectableItem, content: 'Group Option 5', selected: true}
					]}
				]},
				{components: [
					{kind: Group, onActivate: 'groupChanged', components: [
						{kind: Divider, content: 'Selectable Items with long text truncation'},
						{kind: SelectableItem, content: 'Option 1 with long text truncation', onActivate: 'itemChanged'},
						{kind: SelectableItem, content: 'Option 2 with long text truncation', onActivate: 'itemChanged'},
						{kind: SelectableItem, disabled: true, content: 'Disabled', onActivate: 'itemChanged'},
						{kind: SelectableItem, content: 'Option 4 with long text truncation', selected: true, onActivate: 'itemChanged'},
						{kind: SelectableItem, content: 'Option 5 with long text truncation', onActivate: 'itemChanged'}
					]}
				]}
			]}
		]},
		{components: [
			{kind: Divider, content: 'Result'},
			{name: 'result', content: 'Nothing selected'}
		]}
	],
	itemChanged: function (sender, ev) {
		if (!this.hasNode()) {
			return;
		}
		this.$.result.setContent(sender.getContent() + ' was ' + (sender.getActive() ? ' selected.' : 'deselected.'));
	},
	groupChanged: function (sender, ev) {
		if (ev.originator.getActive()) {
			var selected = ev.originator.getContent();
			this.$.result.setContent(selected + ' was selected.');
		}
	}
});
}],'src/SimplePickerSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	BodyText = require('moonstone/BodyText'),
	Button = require('moonstone/Button'),
	Divider = require('moonstone/Divider'),
	Input = require('moonstone/Input'),
	InputDecorator = require('moonstone/InputDecorator'),
	Scroller = require('moonstone/Scroller'),
	SimplePicker = require('moonstone/SimplePicker');

module.exports = kind({
	name: 'moon.sample.SimplePickerSample',
	kind: FittableRows,
	classes: 'moon moon-sample-padded enyo-unselectable enyo-fit',
	components:[
		{kind: Scroller, fit: true, components: [
			{kind: Divider, content: 'Picker 1 & 2: Animated'},
			{kind: SimplePicker, name: 'picker1', onChange: 'changed', components: [
				{content: 'San Francisco Airport Terminal Gate 1', active: true},
				{content: 'Boston Airport Terminal Gate 2'},
				{content: 'Tokyo Airport Terminal Gate 3'},
				{content: 'נמל התעופה בן גוריון טרמינל הבינלאומי'}
			]},
			{kind: SimplePicker, name: 'picker2', onChange: 'changed', components: [
				{content: 'Level 1'},
				{content: 'Level 2', active: true},
				{content: 'Level 3'},
				{content: 'Level 4'}
			]},
			{classes: 'moon-1v'},

			{kind: Divider, content: 'Picker 3: Non-animated'},
			{kind: SimplePicker, block: true, name: 'picker3', animate: false, onChange: 'changed', components: [
				{content: 'Hotmail'},
				{content: 'GMail'},
				{content: 'Yahoo Mail', active: true},
				{content: 'AOL Mail'},
				{content: 'Custom IMAP'}
			]},
			{classes: 'moon-1v'},

			{kind: Divider, content: 'Picker 4: Wrapping'},
			{kind: SimplePicker, block: true, name: 'picker4', animate: false, wrap: true, onChange: 'changed', components: [
				{content: 'Mars'},
				{content: 'Venus'},
				{content: 'Earth'},
				{content: 'Mercury'},
				{content: 'Jupiter'},
				{content: 'Saturn'},
				{content: 'Uranus'},
				{content: 'Neptune'},
				{content: 'Pluto'}
			]},
			{classes: 'moon-1v'},

			{kind: Divider, content: 'Picker 5: Disabled'},
			{kind: SimplePicker, block: true, name: 'picker5', disabled: true, components: [
				{content: 'Enyo'},
				{content: 'Sencha'}
			]},
			{classes: 'moon-1v'},

			{kind: Divider, content: 'Picker 6: Hidden'},
			{kind: SimplePicker, name: 'picker6', onChange: 'changed', showing: false, components: [
				{content: 'San Francisco Airport Terminal Gate 1'},
				{content: 'Boston Airport Terminal Gate 2', active: true},
				{content: 'Tokyo Airport Terminal Gate 3'}
			]},
			{kind: Button, content: 'Toggle Showing', small: true, ontap: 'toggleShowing'}
		]},
		{classes: 'moon-1v'},
		{classes: 'moon-hspacing', components: [
			{components: [
				{kind: Divider, content: 'Modify picker: '},
				{kind: SimplePicker, name: 'which', components: [
					{content: '1'},
					{content: '2'},
					{content: '3'},
					{content: '4'},
					{content: '5'},
					{content: '6'}
				]}
			]},
			{components: [
				{kind: Divider, content: 'Add item: '},
				{classes: 'moon-hspacing', components: [
					{kind: InputDecorator, components: [
						{kind: Input, name: 'addInput', placeholder: 'content', classes: 'moon-2h'}
					]},
					{kind: Button, content: 'Add', small: true, ontap: 'addItem'}
				]}
			]},
			{components: [
				{kind: Divider, content: 'Set index: '},
				{classes: 'moon-hspacing', components: [
					{kind: InputDecorator, components: [
						{kind: Input, name: 'changeInput', placeholder: 'index', classes: 'moon-1h'}
					]},
					{kind: Button, content: 'Go', small: true, ontap: 'changeItem'}
				]}
			]},
			{components: [
				{kind: Divider, content: 'Delete current item: '},
				{kind: Button, content: 'Delete', small: true, ontap: 'destroyItem'}
			]}
		]},
		{components: [
			{kind: Divider, content: 'Result'},
			{kind: BodyText, name: 'result', content: 'No change yet'}
		]}
	],
	toggleShowing: function () {
		this.$.picker6.setShowing(!this.$.picker6.showing);
	},
	changed: function (sender, ev) {
		this.$.result.setContent(sender.name + ' changed to ' + ev.content + ' (' + ev.index + ')');
	},
	changeItem: function (sender, ev) {
		var picker = this.$['picker' + (this.$.which.getSelectedIndex()+1)];
		var val = parseInt(this.$.changeInput.getValue(),10);
		var len = picker.getClientControls().length - 1;
		if (isNaN(val) || val < 0 || val > len) {
			this.$.result.setContent(picker.name + ' value must be an integer between 0-' + len);
		} else {
			picker.setSelectedIndex(val);
		}
	},
	addItem: function (sender, ev) {
		if (!this.$.addInput.getValue()) {
			this.$.result.setContent('Please insert content value.');
			return;
		}
		var picker = this.$['picker' + (this.$.which.getSelectedIndex()+1)];
		picker.createComponent({content:this.$.addInput.getValue()}).render();
		this.$.result.setContent('\'' + this.$.addInput.getValue() + '\' is added to ' + picker.name);
	},
	destroyItem: function (sender, ev) {
		var picker = this.$['picker' + (this.$.which.getSelectedIndex()+1)];
		var sel = picker.getSelected();
		if (sel) {
			sel.destroy();
		}
	}
});
}],'src/SliderSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	Button = require('moonstone/Button'),
	CheckboxItem = require('moonstone/CheckboxItem'),
	Divider = require('moonstone/Divider'),
	Input = require('moonstone/Input'),
	InputDecorator = require('moonstone/InputDecorator'),
	Scroller = require('moonstone/Scroller'),
	Slider = require('moonstone/Slider');

module.exports = kind({
	kind: FittableRows,
	name: 'moon.sample.SliderSample',
	classes: 'moon enyo-unselectable enyo-fit',
	bindings: [
		{from: '.$.slider1.value', to: '.$.slider2.value'},
		{from: '.$.slider1.bgProgress', to: '.$.slider2.bgProgress'}
	],
	components: [
		{kind: Scroller, fit: true, components: [
			{classes: 'moon-1v'},
			{kind: Divider, content: 'Slider 1: Default'},
			{name: 'slider1', kind: Slider, showPercentage: false, value: 25, bgProgress: 35, onChanging: 'sliderChanging', onChange: 'sliderChanged'},

			{kind: Divider, content: 'Slider 2: Disabled, Bound to Slider 1'},
			{name: 'slider2', kind: Slider, disabled: true},

			{kind: Divider, content: 'Slider 3: Enable JumpIncrement'},
			{name: 'slider3', kind: Slider, showPercentage: false, enableJumpIncrement: true, value: 25, bgProgress: 35, onChanging: 'sliderChanging', onChange: 'sliderChanged'},

			{kind: Divider, content: 'Slider 4: Custom Popup Content'},
			{name: 'slider4', kind: Slider, classes: 'rgb-sample-slider',
				popupColor: 'rgb(0, 0, 25)', value: 25, bgProgress: 150, min: 0, max: 255,
				onChanging: 'customChanging', onChange: 'customChanged', onAnimateFinish: 'customAnimateFinish'
			},

			{kind: Divider, content: 'Slider 5: Negative Values'},
			{name: 'slider5', kind: Slider,
				value: 0, min: -100, max: 100, showPercentage: false, enableJumpIncrement: true, onChanging: 'sliderChanging', onChange: 'sliderChanged'
			},

			{kind: Divider, content: 'Slider 6, 7, 8, 9: Vertical Orientation'},
			{classes: 'moon-hspacing', components: [
				{name: 'slider6', kind: Slider, orientation: 'vertical', style: 'height: 300px', onChanging: 'sliderChanging', onChange: 'sliderChanged'},
				{classes: 'moon-2h'},
				{name: 'slider7', kind: Slider,
					value: 0, min: -100, max: 100, orientation: 'vertical', style: 'height: 300px', enableJumpIncrement: true, decrementIcon: 'arrowlargedown', incrementIcon: 'arrowlargeup', showPercentage: false, onChanging: 'sliderChanging', onChange: 'sliderChanged'
				},
				{classes: 'moon-2h'},
				{name: 'slider8', kind: Slider,
					value: 5, min: 1, max: 10, orientation: 'vertical', style: 'height: 300px', enableJumpIncrement: true, jumpIncrement: '10%', decrementIcon: 'minus', incrementIcon: 'plus', popupSide: 'left', showPercentage: false, onChanging: 'sliderChanging', onChange: 'sliderChanged'
				},
				{classes: 'moon-2h'},
				{name: 'slider9', kind: Slider,
					value: 5, min: 0, max: 7, orientation: 'vertical', style: 'height: 300px', enableJumpIncrement: true, jumpIncrement: 2, decrementIcon: 'minus', incrementIcon: 'plus', onChanging: 'sliderChanging', onChange: 'sliderChanged'
				}
			]},

			{kind: Divider, content: 'Change Value'},
			{classes: 'moon-hspacing', components: [
				{kind: InputDecorator, components: [
					{name: 'valueInput', kind: Input, placeholder: 'Value', classes: 'moon-1h', value: 20}
				]},
				{kind: Button, small:true, content: 'Set', ontap: 'changeValue'},
				{kind: Button, small:true, content: '-', ontap: 'decValue'},
				{kind: Button, small:true, content: '+', ontap: 'incValue'}
			]},
			{classes: 'moon-1v'},

			{kind: Divider, content: 'Change Background Progress'},
			{classes: 'moon-hspacing', components: [
				{kind: InputDecorator, components: [
					{name: 'progressInput', kind: Input, placeholder: 'Progress', classes: 'moon-1h', value: 30}
				]},
				{kind: Button, small:true, content: 'Set', ontap: 'changeProgress'},
				{kind: Button, small:true, content: '-', ontap: 'decProgress'},
				{kind: Button, small:true, content: '+', ontap: 'incProgress'}
			]},
			{classes: 'moon-1v'},

			{kind: Divider, content: 'Change Increment (applies only to dragging, 0 for disable)'},
			{classes: 'moon-hspacing', components: [
				{kind: InputDecorator, components: [
					{name: 'incrementInput', kind: Input, placeholder: 'Increment', classes: 'moon-1h', value: 0}
				]},
				{kind: Button, small:true, content: 'Set', ontap: 'changeIncrement'}
			]},
			{classes: 'moon-1v'},

			{kind: Divider, content: 'Options'},
			{classes: 'moon-8h', defaultKind: CheckboxItem, components: [
				{name: 'lockBarSetting',        checked: true,     content: 'Lock Bar to Knob', onchange: 'changeLockbar'},
				{name: 'animateSetting',        checked: true,     content: 'Animated',        onchange: 'animateActivate'},
				{name: 'popupSetting',          checked: true,     content: 'Show Popup',      onchange: 'changeStatusBubble'},
				{name: 'tappableSetting',        checked: true,     content: 'Tappable',         onchange: 'changeTappable'},
				{name: 'constrainSetting',      checked: false,    content: 'Constrain to Background Progress', onchange: 'changeConstrain'},
				{name: 'elasticSetting',        checked: false,    content: 'Elastic Effect',  onchange: 'changeElastic'},
				{name: 'showPercentageSetting', checked: false,    content: 'Show Percentage', onchange: 'changePercentage'}
			]}
		]},
		{kind: Divider, content: 'Result'},
		{name: 'result', content: 'No slider moved yet.'}
	],
	create: function () {
		FittableRows.prototype.create.apply(this, arguments);
		this.changeLockbar();
		this.animateActivate();
		this.changeStatusBubble();
		this.changeTappable();
		this.changeConstrain();
		this.changeElastic();
	},
	rendered: function () {
		FittableRows.prototype.rendered.apply(this, arguments);
		this.updateSlider4Popup(this.$.slider4.getValue());
	},
	//* @protected
	changeValue: function (sender, ev) {
		var v = this.$.valueInput.getValue();

		for (var i in this.$) {
			if (this.$[i].kind == Slider) {
				this.$[i].setValue(v);
			}
		}
	},
	incValue: function () {
		this.$.valueInput.setValue(Math.min(parseInt(this.$.valueInput.getValue() || 0, 10) + 10, 100));
		this.changeValue();
	},
	decValue: function () {
		this.$.valueInput.setValue(Math.max(parseInt(this.$.valueInput.getValue() || 0, 10) - 10, 0));
		this.changeValue();
	},
	changeProgress: function (sender, ev) {
		var v = parseInt(this.$.progressInput.getValue(), 10);

		for (var i in this.$) {
			if (this.$[i].kind == Slider) {
				this.$[i].setBgProgress(v);
			}
		}
	},
	changeIncrement: function (sender, ev) {
		var v = parseInt(this.$.incrementInput.getValue(), 10);

		for (var i in this.$) {
			if (this.$[i].kind == Slider) {
				this.$[i].setIncrement(v);
			}
		}
	},
	incProgress: function () {
		this.$.progressInput.setValue(Math.min(parseInt(this.$.progressInput.getValue() || 0, 10) + 10, 100));
		this.changeProgress();
	},
	decProgress: function () {
		this.$.progressInput.setValue(Math.max(parseInt(this.$.progressInput.getValue() || 0, 10) - 10, 0));
		this.changeProgress();
	},
	sliderChanging: function (sender, ev) {
		this.$.result.setContent(sender.name + ' changing: ' + Math.round(ev.value));
	},
	sliderChanged: function (sender, ev) {
		this.$.result.setContent(sender.name + ' changed to ' + Math.round(sender.getValue()) + '.');
	},
	customChanging: function (sender, ev) {
		this.updateSlider4Popup(ev.value);
		this.sliderChanging(sender, ev);
	},
	customChanged: function (sender, ev) {
		this.updateSlider4Popup(sender.getValue());
		this.sliderChanged(sender, ev);
	},
	customAnimateFinish: function (sender, ev) {
		this.updateSlider4Popup(ev.value);
	},
	updateSlider4Popup: function (inValue) {
		var color = 'rgb(0, 0, ' + Math.round(inValue) + ')';
		this.$.slider4.setPopupContent(color);
		this.$.slider4.setPopupColor(color);
	},
	changeLockbar: function (sender, ev) {
		var ck = this.$.lockBarSetting.getChecked();

		for (var i in this.$) {
			if (this.$[i].kind == Slider) {
				this.$[i].setLockBar(ck);
			}
		}
		return true;
	},
	animateActivate: function (sender, ev) {
		var ck = this.$.animateSetting.getChecked();

		for (var i in this.$) {
			if (this.$[i].kind == Slider) {
				this.$[i].setAnimate(ck);
			}
		}
		return true;
	},
	changeStatusBubble: function (sender, ev) {
		var ck = this.$.popupSetting.getChecked();

		for (var i in this.$) {
			if (this.$[i].kind == Slider) {
				this.$[i].set('popup', ck);
			}
		}
		return true;
	},
	changeTappable: function (sender, ev) {
		var ck = this.$.tappableSetting.getChecked();

		for (var i in this.$) {
			if (this.$[i].kind == Slider) {
				this.$[i].setTappable(ck);
			}
		}
		return true;
	},
	changeConstrain: function (sender, ev) {
		var ck = this.$.constrainSetting.getChecked();

		for (var i in this.$) {
			if (this.$[i].kind == Slider) {
				this.$[i].setConstrainToBgProgress(ck);
			}
		}
		return true;
	},
	changeElastic: function (sender, ev) {
		var ck = this.$.elasticSetting.getChecked();

		for (var i in this.$) {
			if (this.$[i].kind == Slider) {
				this.$[i].setElasticEffect(ck);
			}
		}
		return true;
	},
	changePercentage: function (sender, ev) {
		var ck = this.$.showPercentageSetting.getChecked();

		for (var i in this.$) {
			if (this.$[i].kind == Slider) {
				this.$[i].setShowPercentage(ck);
			}
		}
		return true;
	}
});

}],'src/SpinnerSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Divider = require('moonstone/Divider'),
	Icon = require('moonstone/Icon'),
	Scroller = require('moonstone/Scroller'),
	Spinner = require('moonstone/Spinner');

module.exports = kind({
	name: 'moon.sample.SpinnerSample',
	classes: 'moon enyo-unselectable enyo-fit moon-spinner-sample',
	kind: Scroller,
	components: [
		{kind: Divider, content: 'Spinner'},
		{kind: Spinner},
		{kind: Divider, content: 'Spinner with Content'},
		{kind: Spinner, content: 'Loading...'},
		{kind: Divider, content: 'Spinner Centered in its Container'},
		{style: 'text-align: center', components: [
			{kind: Spinner, content: 'Loading...'}
		]},
		{kind: Divider, content: 'Spinner Centered Horizontally and Vertically in its Container'},
		{classes: 'absolute-container', components: [
			{kind: Spinner, content: 'Loading...', center: true}
		]},
		{classes: 'moon-1v'},
		{kind: Divider, content: 'Spinner Only Centered Horizontally in its Container'},
		{classes: 'absolute-container', components: [
			{kind: Spinner, content: 'Loading...', center: true, middle: false}
		]},
		{classes: 'moon-1v'},
		{kind: Divider, content: 'Spinner with Looooong Content'},
		{kind: Spinner, content: 'Loading so much content... This might take some arbitrary amount of time. Could be long, could be short. Who knows?'},
		{kind: Divider, content: 'Spinner with Components Inside'},
		{kind: Spinner, components: [
			{kind: Icon, icon: 'fullscreen'},
			{content: 'Fullscreen mode is loading'},
			{kind: Icon, icon: 'exitfullscreen'}
		]}
	]
});

}],'src/ToggleButtonSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	FittableRows = require('layout/FittableRows'),
	BodyText = require('moonstone/BodyText'),
	CaptionDecorator = require('moonstone/CaptionDecorator'),
	Divider = require('moonstone/Divider'),
	Scroller = require('moonstone/Scroller'),
	ToggleButton = require('moonstone/ToggleButton'),
	Group = require('enyo/Group');

module.exports = kind({
	name: 'moon.sample.ToggleButtonSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit moon-toggle-button-sample',
	components: [
		{kind: Scroller, fit: true, components: [
			{classes: 'moon-toggle-button-sample-wrapper', components: [
				{kind: Divider, content: 'Toggle Buttons: '},
				{kind: ToggleButton, toggleOnLabel: 'wifi is on', toggleOffLabel: 'wifi is off', ontap: 'buttonTapped'},
				{kind: ToggleButton, uppercase: false, toggleOnLabel: 'Internet connected', toggleOffLabel: 'Internet disconnected', ontap: 'buttonTapped'},
				{kind: ToggleButton, disabled: true, toggleOnLabel: 'Disabled Active Button', toggleOffLabel: 'Disabled Inactive Button', ontap: 'buttonTapped'},
				{kind: ToggleButton, disabled: true, value: true, content: 'Disabled Active Button', ontap: 'buttonTapped'},
				{kind: ToggleButton, content: 'Set-top box', ontap: 'buttonTapped'},
				{kind: ToggleButton, small: true, content: 'Small Toggle', ontap: 'buttonTapped'},
				{kind: ToggleButton, small: true, disabled: true, toggleOnLabel: 'Small Disabled Active Button', toggleOffLabel: 'Small Disabled Inactive Button', ontap: 'buttonTapped'},
				{classes: 'moon-1v'},
				{kind: Divider, content: 'Toggle Buttons are set on programmically by default: '},
				{kind: ToggleButton, value: true, toggleOnLabel: 'English', toggleOffLabel: 'Spanish', ontap: 'buttonTapped'},
				{kind: ToggleButton, value: true, content: 'Notifications', ontap: 'buttonTapped'},
				{kind: ToggleButton, small: true, value: true, content: 'Small Button', ontap: 'buttonTapped'},
				{classes: 'moon-1v'},
				{kind: Divider, content: 'Captioned Buttons: '},
				{kind: CaptionDecorator, side: 'top', content: 'Pow', components: [
					{kind: ToggleButton, toggleOnLabel: 'is A', toggleOffLabel: 'not A', ontap: 'buttonTapped'}
				]},
				{kind: CaptionDecorator, side: 'right', content: 'Boom', components: [
					{kind: ToggleButton, toggleOnLabel: 'is B', toggleOffLabel: 'not B', ontap: 'buttonTapped'}
				]},
				{kind: CaptionDecorator, side: 'bottom', content: 'Crash', components: [
					{kind: ToggleButton, toggleOnLabel: 'is C', toggleOffLabel: 'not C', ontap: 'buttonTapped'}
				]},
				{kind: CaptionDecorator, side: 'left', content: 'Bang', components: [
					{kind: ToggleButton, toggleOnLabel: 'is D', toggleOffLabel: 'not D', ontap: 'buttonTapped'}
				]},
				{classes: 'moon-1v'},
				{kind: Divider, content: 'Grouped Buttons: '},
				{kind: Group, classes: 'moon-toggle-button-sample-group', components: [
					{kind: ToggleButton, content: 'Apple', ontap: 'buttonTapped'},
					{kind: ToggleButton, toggleOnLabel: 'Ripened Banana', toggleOffLabel: 'Raw Banana', value: true, ontap: 'buttonTapped'},
					{kind: ToggleButton, toggleOnLabel: 'Sweet Saskatoonberry', toggleOffLabel: 'Bitter Saskatoonberry', ontap: 'buttonTapped'},
					{kind: ToggleButton, small: true, toggleOnLabel: 'Blue Blueberry', toggleOffLabel: 'Red Raspberry', ontap: 'buttonTapped'}
				]}
			]}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'notice', content: 'No action yet.'}
	],
	buttonTapped: function (sender, ev) {
		var labeltext = sender.get('uppercase') ? utils.toUpperCase(sender.getContent()) : sender.getContent();
		var postString = sender.value ? ' is selected' : ' is unselected';
		if (!sender.toggleOnLabel || !sender.toggleOffLabel) {
			labeltext='\''+labeltext+'\'' + postString;
		} else {
			labeltext='\''+labeltext+'\' selected.';
		}
		this.$.notice.setContent(labeltext);
	}
});

}],'src/ToggleItemSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	BodyText = require('moonstone/BodyText'),
	Divider = require('moonstone/Divider'),
	Scroller = require('moonstone/Scroller'),
	ToggleItem = require('moonstone/ToggleItem'),
	Group = require('enyo/Group');

module.exports = kind({
	name: 'moon.sample.ToggleItemSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Scroller, fit: true, components: [
			{classes: 'moon-hspacing', controlClasses: 'moon-5h', components: [
				{components: [
					{kind: Divider, content: 'Toggle Items'},
					{kind: ToggleItem, content: 'Option 1', checked: true, onchange: 'itemChanged'},
					{kind: ToggleItem, content: 'Option 2', onchange: 'itemChanged'},
					{kind: ToggleItem, disabled: true, content: 'Disabled', onchange: 'itemChanged'},
					{kind: ToggleItem, disabled: true, checked: true, content: 'Disabled Checked'},
					{kind: ToggleItem, content: 'Option 4', checked: true, onchange: 'itemChanged'},
					{kind: ToggleItem, content: 'This is a verrry long option 5', onchange: 'itemChanged'}
				]},
				{components: [
					{kind: Divider, content: 'Toggle Item Group'},
					{kind: Group, onActivate: 'groupChanged', components: [
						{kind: ToggleItem, content: 'Group Option 1'},
						{kind: ToggleItem, content: 'Group Option 2', checked: true},
						{kind: ToggleItem, disabled: true, content: 'Disabled'},
						{kind: ToggleItem, content: 'Group Option 4'},
						{kind: ToggleItem, content: 'Group Option 5'}
					]}
				]}
			]}
		]},
		{components: [
			{kind: Divider, content: 'Result'},
			{kind: BodyText, name: 'result', content: 'Nothing selected'}
		]}
	],
	itemChanged: function (sender, ev) {
		this.$.result.setContent(sender.getContent() + ' is ' + (sender.getChecked() ? ' selected.' : 'deselected.'));
	},
	groupChanged: function (sender, ev) {
		if (ev.toggledControl.getChecked()) {
			var selected = ev.toggledControl.getContent();
			this.$.result.setContent(selected + ' is selected.');
		}
	}
});
}],'src/IntegerPickerSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	BodyText = require('moonstone/BodyText'),
	Divider = require('moonstone/Divider'),
	FormCheckbox = require('moonstone/FormCheckbox'),
	IntegerPicker = require('moonstone/IntegerPicker'),
	Scroller = require('moonstone/Scroller');

module.exports = kind({
	name: 'moon.sample.IntegerPickerSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Scroller, fit: true, components: [
			{kind: Divider, content: 'Integer Picker'},
			{name: 'picker', kind: IntegerPicker, value: 2016, min: 1900, max: 2100, minWidth: 84, onChange: 'changed'},

			{kind: Divider, content: 'Options'},
			{kind: FormCheckbox, content: 'Animate', checked: true, prop: 'animate', onchange: 'checked'},
			{kind: FormCheckbox, content: 'Wrap', prop: 'wrap', onchange: 'checked'},
			{kind: FormCheckbox, content: 'Padding (5 digits)', onchange: 'paddingChecked'},
			{kind: FormCheckbox, content: 'Disabled', prop: 'disabled', onchange: 'checked'}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'value', content: 'No change yet'}
	],
	changed: function (sender, ev) {
		if (this.$.value) {
			this.$.value.setContent(ev.name + ' changed to ' + ev.value);
		}
	},
	checked: function (sender, ev) {
		this.$.picker.set(sender.prop, sender.checked);
	},
	paddingChecked: function (sender, ev) {
		this.$.picker.set('digits', sender.checked? 5 : null);
		this.$.picker.render();
	}
});
}],'src/VideoPlayerInlineSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	ChannelInfo = require('moonstone/ChannelInfo'),
	Clock = require('moonstone/Clock'),
	IconButton = require('moonstone/IconButton'),
	VideoFullscreenToggleButton = require('moonstone/VideoFullscreenToggleButton'),
	VideoInfoBackground = require('moonstone/VideoInfoBackground'),
	VideoInfoHeader = require('moonstone/VideoInfoHeader'),
	VideoPlayer = require('moonstone/VideoPlayer');

var sources = [
	{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', type: 'video/mp4'},
	{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv', type: 'video/ogg'},
	{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm', type: 'video/webm'}
];

module.exports = kind({
	name: 'moon.sample.VideoPlayerInlineSample',
	classes: 'moon enyo-fit enyo-unselectable moon-video-player-sample',
	fit: true,
	components: [
		{
			name: 'player',
			kind: VideoPlayer,
			sources: sources,
			poster: 'assets/video-poster.png',
			inline: true,
			classes: 'moon-8h',
			autoplay: true,
			infoComponents: [
				{kind: VideoInfoBackground, orient: 'left', fit: true, components: [
					{
						kind: ChannelInfo,
						channelNo: '13',
						channelName: 'AMC',
						components: [
							{content: 'DTV'},
							{content: 'Cinema'},
							{content: '3D'}
						]
					},
					{
						kind: VideoInfoHeader,
						title: 'Downton Abbey',
						subTitle: 'Mon June 21, 7:00 - 8:00pm',
						subSubTitle: 'R - TV 14, V, L, SC',
						description: 'The series, set in the Yorukshire country estate of Downton Abbey, depicts the lives of the aristocratic Crawley famiry and'
					}
				]},
				{kind: VideoInfoBackground, orient: 'right', components: [
					{kind: Clock}
				]}
			],
			components: [
				{kind: VideoFullscreenToggleButton, backgroundOpacity: 'translucent'},
				{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
				{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
				{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
				{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
				{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
				{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
				{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
				{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
				{kind: IconButton, small: false, backgroundOpacity: 'translucent'}
			]
		}
	]
});

module.exports.badgeClasses = 'new';

}],'src/VideoPlayerSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('moonstone/Button'),
	ChannelInfo = require('moonstone/ChannelInfo'),
	Clock = require('moonstone/Clock'),
	ContextualPopup = require('moonstone/ContextualPopup'),
	ContextualPopupDecorator = require('moonstone/ContextualPopupDecorator'),
	Dialog = require('moonstone/Dialog'),
	IconButton = require('moonstone/IconButton'),
	Item = require('moonstone/Item'),
	ToggleButton = require('moonstone/ToggleButton'),
	Tooltip = require('moonstone/Tooltip'),
	TooltipDecorator = require('moonstone/TooltipDecorator'),
	VideoInfoBackground = require('moonstone/VideoInfoBackground'),
	VideoInfoHeader = require('moonstone/VideoInfoHeader'),
	VideoPlayer = require('moonstone/VideoPlayer');

var sources = [
	{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', type: 'video/mp4'},
	{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv', type: 'video/ogg'},
	{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm', type: 'video/webm'}
];

module.exports = kind({
	name: 'moon.sample.VideoPlayerSample',
	classes: 'moon enyo-fit enyo-unselectable moon-video-player-sample',
	fit: true,
	components: [
		{
			name: 'player',
			kind: VideoPlayer,
			sources: sources,
			poster: 'assets/video-poster.png',
			autoplay: true,
			onPlaybackControlsTapped: 'controlsTapped',
			infoComponents: [
				{kind: VideoInfoBackground, orient: 'left', background: true, fit: true, components: [
					{
						kind: ChannelInfo,
						channelNo: '789-123',
						channelName: 'AMC',
						channelDesc: 'KRON-HD',
						channelMoreDesc: '4:30 - 5:30PM',
						components: [
							{content: 'DTV'},
							{content: 'Cinema'},
							{content: '3D'}
						]
					},
					{
						kind: VideoInfoHeader,
						title: 'Downton Abbey',
						uppercase: false,
						// Todo, we can remove below comment out after policy of samples is decided.
						// In latest tag like 2.6.0-pre.5, we don't have samples.
						// src: '$lib/moonstone/samples/assets/default-music.png',
						description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
					}
				]},
				{kind: VideoInfoBackground, orient: 'right', background: true, components: [
					{kind: Clock}
				]}
			],
	   		components: [
				{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
				{kind: ToggleButton, name: 'controlsToggleButton', content: 'Controls', backgroundOpacity: 'translucent'},
				{kind: Button, content: 'Unload', backgroundOpacity: 'translucent', ontap: 'unload'},
				{kind: Button, content: 'Reload', backgroundOpacity: 'translucent', ontap: 'load'},
				{kind: ToggleButton, content: 'FF/Rewind', name: 'ffrewToggleButton', backgroundOpacity: 'translucent'},
				{kind: ContextualPopupDecorator, components: [
					{kind: TooltipDecorator, components: [
						{kind: Button, content: 'Popup', backgroundOpacity: 'translucent'},
						{kind: Tooltip, floating: true, content: 'I\'m a tooltip for a button.'}
					]},
					{
						kind: ContextualPopup,
						classes: 'moon-3h moon-6v',
						backgroundOpacity: 'translucent',
						components: [
							{kind: Item, content: 'Item 1'},
							{kind: Item, content: 'Item 2'},
							{kind: Item, content: 'Item 3'}
						]
					}
				]},
				{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
				{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
				{kind: IconButton, small: false, backgroundOpacity: 'translucent'}
			]
		},
		{kind: Dialog, name: 'tapDialog', title: 'The controls were tapped.', message: 'Press OK to dismiss', components: [
			{kind: Button, content: 'OK', ontap: 'dismissTapDialog'}
		]}
	],
	bindings: [
		{from: '$.player.disablePlaybackControls', to: '$.controlsToggleButton.value', oneWay:false},
		{from: '$.player.showFFRewindControls', to: '$.ffrewToggleButton.value', oneWay:false}
	],
	controlsTapped: function () {
		this.$.tapDialog.show();
	},
	dismissTapDialog: function () {
		this.$.tapDialog.hide();
	},
	unload: function () {
		this.$.player.unload();
	},
	load: function () {
		this.$.player.unload();
		// We can set source by sources array
		this.sources = sources;
		this.$.player.setSources(this.sources);
	}
});

module.exports.badgeClasses = 'new';

}],'src/LightPanelsSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	Button = require('moonstone/Button'),
	IconButton = require('moonstone/IconButton'),
	Item = require('moonstone/Item'),
	LightPanels = require('moonstone/LightPanels'),
	Scroller = require('moonstone/Scroller');

var controls = [
	{kind: Item, content: 'Control Item 1'},
	{kind: Item, content: 'Control Item 2'},
	{kind: Item, content: 'Control Item 3'},
	{kind: Item, content: 'Control Item 4'},
	{kind: Item, content: 'Control Item 5'},
	{kind: Item, content: 'Control Item 6'},
	{kind: Item, content: 'Control Item 7'},
	{kind: Item, content: 'Control Item 8'},
	{kind: Item, content: 'Control Item 9'}
];

var ControlPanel = kind({
	kind: LightPanels,
	cacheViews: false,
	popOnBack: false,
	wrap: true,
	orientation: LightPanels.Orientation.VERTICAL,
	direction: LightPanels.Direction.BACKWARDS,
	components: controls
});

var ControlContainer = kind({
	kind: Control,
	classes: 'control-container',
	panelId: 0,
	components: [
		{kind: Control, components: [
			{kind: IconButton, icon: 'arrowlargedown', ontap: 'prevIconTapped'},
			{kind: IconButton, icon: 'arrowlargeup', ontap: 'nextIconTapped'}
		]},
		{kind: ControlPanel, name: 'controlPanel', classes: 'control-panel'}
	],
	bindings: [
		{from: 'panelId', to: '$.controlPanel.index', transform: function (id) {
			// clamping id such that we have a valid value
			return id < controls.length ? id : controls.length - 1;
		}}
	],
	prevIconTapped: function (sender, ev) {
		this.$.controlPanel.previous();
		return true;
	},
	nextIconTapped: function (sender, ev) {
		this.$.controlPanel.next();
		return true;
	}
});

module.exports = kind({
	name: 'moon.sample.LightPanelsSample',
	classes: 'moon enyo-fit enyo-unselectable moon-light-panels-sample',
	kind: Control,
	components: [
		{kind: LightPanels, name: 'panels'}
	],
	create: kind.inherit(function (sup) {
		return function () {
			var startIndex = 0,
				info;

			sup.apply(this, arguments);

			info = this.generatePanelInfo(startIndex);
			this.$.panels.createComponent(info, {owner: this});
			this.$.panels.set('index', startIndex);
		};
	}),
	generatePanelInfo: function (id) {
		return {
			classes: 'light-panel',
			panelId: 'panel-' + id,
			title: 'This is the extended and long title of panel ' + id,
			headerComponents: [
				{
					kind: Button,
					content: 'Back',
					small: true,
					ontap: 'prevTapped'
				}
			],
			clientComponents: [
				{kind: ControlContainer, panelId: id},
				{kind: Scroller, classes: 'panel-scroller', components: [
					{kind: Item, content: 'Item One', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Two', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Three', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Four', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Five', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Six', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Seven', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Eight', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Nine', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Ten', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Eleven', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Twelve', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Thirteen', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Fourteen', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Fifteen', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Sixteen', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Seventeen', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Eighteen', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Nineteen', ontap: 'nextTapped'},
					{kind: Item, content: 'Item Twenty', ontap: 'nextTapped'}
				]}
			]
		};
	},
	pushSinglePanel: function (direct) {
		var panels = this.$.panels,
			id = panels.getPanels().length,
			info = this.generatePanelInfo(id);

		this.$.panels.pushPanel(info, {owner: this}, {direct: direct});
	},
	prevTapped: function (sender, ev) {
		this.$.panels.previous();
		return true;
	},
	nextTapped: function (sender, ev) {
		this.pushSinglePanel();
		return true;
	}
});

module.exports.badgeClasses = 'new wip';

}],'src/ActivityPanelsSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Item = require('moonstone/Item'),
	Panels = require('moonstone/Panels'),
	Scroller = require('moonstone/Scroller'),
	ToggleButton = require('moonstone/ToggleButton');

module.exports = kind({
	name: 'moon.sample.ActivityPanelsSample',
	classes: 'moon enyo-fit enyo-unselectable',
	components: [
		{name: 'panels', kind: Panels, pattern: 'activity', components: [
			{title: 'First Panel', titleBelow:'Sub-title', subTitleBelow:'Sub-sub title', headerComponents: [
				{kind: ToggleButton, small:true, content:'Medium', name:'mediumHeaderToggle', ontap: 'typeTapped'},
				{kind: ToggleButton, small:true, content:'Small', name:'smallHeaderToggle', ontap: 'typeTapped'}
			], components: [
				{kind: Scroller, fit:true, components: [
					{kind: Item, content: 'Item One', ontap: 'next1'},
					{kind: Item, content: 'Item Two', ontap: 'next1'},
					{kind: Item, content: 'Item Three', ontap: 'next1'},
					{kind: Item, content: 'Item Four', ontap: 'next1'},
					{kind: Item, content: 'Item Five', ontap: 'next1'},
					{kind: Item, content: 'Item Six', ontap: 'next1'},
					{kind: Item, content: 'Item Seven', ontap: 'next1'},
					{kind: Item, content: 'Item Eight', ontap: 'next1'},
					{kind: Item, content: 'Item Nine', ontap: 'next1'},
					{kind: Item, content: 'Item Eleven', ontap: 'next1'},
					{kind: Item, content: 'Item Twelve', ontap: 'next1'},
					{kind: Item, content: 'Item Thirteen', ontap: 'next1'},
					{kind: Item, content: 'Item Fourteen', ontap: 'next1'},
					{kind: Item, content: 'Item Fifteen', ontap: 'next1'},
					{kind: Item, content: 'Item Sixteen', ontap: 'next1'},
					{kind: Item, content: 'Item Seventeen', ontap: 'next1'},
					{kind: Item, content: 'Item Eighteen', ontap: 'next1'},
					{kind: Item, content: 'Item Nineteen', ontap: 'next1'},
					{kind: Item, content: 'Item Twenty', ontap: 'next1'}
				]}
			]},
			{title: 'Second Panel', defaultSpotlightControl: 'defaultControl', components: [
				{kind: Item, content: 'Item One', ontap: 'next2'},
				{kind: Item, content: 'Item Two', ontap: 'next2'},
				{name: 'defaultControl', kind: Item, content: 'Item Three (default focus for panel)', ontap: 'next2'},
				{kind: Item, content: 'Item Four', ontap: 'next2'},
				{kind: Item, content: 'Item Five', ontap: 'next2'}
			]},
			{title: 'Third Panel', titleBelow:'Type \'go\' to transition', headerOptions: {inputMode:true}, onInputHeaderChange:'inputChanged', subTitleBelow:'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next3'},
				{kind: Item, content: 'Item Two', ontap: 'next3'},
				{kind: Item, content: 'Item Three', ontap: 'next3'},
				{kind: Item, content: 'Item Four', ontap: 'next3'},
				{kind: Item, content: 'Item Five', ontap: 'next3'}
			]},
			{title: 'Fourth', titleBelow:'Sub-title', subTitleBelow:'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next4'},
				{kind: Item, content: 'Item Two', ontap: 'next4'},
				{kind: Item, content: 'Item Three', ontap: 'next4'},
				{kind: Item, content: 'Item Four', ontap: 'next4'},
				{kind: Item, content: 'Item Five', ontap: 'next4'}
			]},
			{title: 'Fifth', titleBelow:'Sub-title', subTitleBelow:'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next5'},
				{kind: Item, content: 'Item Two', ontap: 'next5'},
				{kind: Item, content: 'Item Three', ontap: 'next5'},
				{kind: Item, content: 'Item Four', ontap: 'next5'},
				{kind: Item, content: 'Item Five', ontap: 'next5'}
			]},
			{title: 'Sixth Panel with a very long title', titleBelow:'Sub-title', subTitleBelow:'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next6'},
				{kind: Item, content: 'Item Two', ontap: 'next6'},
				{kind: Item, content: 'Item Three', ontap: 'next6'},
				{kind: Item, content: 'Item Four', ontap: 'next6'},
				{kind: Item, content: 'Item Five', ontap: 'next6'}
			]},
			{title: 'Seventh', titleBelow:'Sub-title', subTitleBelow:'Sub-sub title', components: [
				{kind: Item, content: 'Item One'},
				{kind: Item, content: 'Item Two'},
				{kind: Item, content: 'Item Three'},
				{kind: Item, content: 'Item Four'},
				{kind: Item, content: 'Item Five'}
			]}
		]}
	],
	// custom next handler for each panel to avoid switching from one active panel
	// to another with no visible change for demo
	next1: function (sender, ev) {
		this.$.panels.setIndex(1);
		return true;
	},
	next2: function (sender, ev) {
		this.$.panels.setIndex(2);
		return true;
	},
	next3: function (sender, ev) {
		this.$.panels.setIndex(3);
		return true;
	},
	next4: function (sender, ev) {
		this.$.panels.setIndex(4);
		return true;
	},
	next5: function (sender, ev) {
		this.$.panels.setIndex(5);
		return true;
	},
	next6: function (sender, ev) {
		this.$.panels.setIndex(6);
		return true;
	},
	inputChanged: function (sender, ev) {
		if (ev.originator.getValue() == 'go') {
			this.next3();
		}
	},
	typeTapped: function (sender, ev) {
		var i,
			val = sender.get('value'),
			buttonType = sender.content.toLowerCase(),
			types = ['large', 'medium', 'small'];

		// If our button was `true`, use that type, otherwise revert to large.
		this.$.panel.set('headerType', val ? buttonType.toLowerCase() : types[0]);
		// Unset all other buttons
		for (i = 0; i < types.length; i++) {
			if (buttonType != types[i] && this.$[types[i] + 'HeaderToggle']) {
				this.$[types[i] + 'HeaderToggle'].set('value', false);
			}
		}
	}
});

module.exports.badgeClasses = 'new';

}],'src/ActivityPanelsWithVideoSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Spotlight = require('spotlight');

var
	ChannelInfo = require('moonstone/ChannelInfo'),
	Clock = require('moonstone/Clock'),
	IconButton = require('moonstone/IconButton'),
	Item = require('moonstone/Item'),
	Panels = require('moonstone/Panels'),
	ToggleItem = require('moonstone/ToggleItem'),
	VideoInfoBackground = require('moonstone/VideoInfoBackground'),
	VideoInfoHeader = require('moonstone/VideoInfoHeader'),
	VideoPlayer = require('moonstone/VideoPlayer');

var sources = [
	{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', type: 'video/mp4'},
	{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv', type: 'video/ogg'},
	{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm', type: 'video/webm'}
];

module.exports = kind({
	name: 'moon.sample.ActivityPanelsWithVideoSample',
	classes: 'moon enyo-fit enyo-unselectable',
	components: [
		{name: 'player', kind: VideoPlayer, sources: sources, poster: 'assets/video-poster.png', autoplay: true, showing: false, infoComponents: [
			{kind: VideoInfoBackground, orient: 'left', background: true, fit: true, components: [
				{
					kind: ChannelInfo,
					channelNo: '13',
					channelName: 'AMC',
					components: [
						{content: '3D'},
						{content: 'Live'},
						{content: 'REC 08:22', classes: 'redicon'}
					]
				},
				{
					kind: VideoInfoHeader,
					title: 'Downton Abbey - Extra Title',
					subTitle: 'Mon June 21, 7:00 - 8:00pm',
					subSubTitle: 'R - TV 14, V, L, SC',
					description: 'The series, set in the Youkshire country estate of Downton Abbey, depicts the lives of the aristocratic Crawley famiry and'
				}
			]},
			{kind: VideoInfoBackground, orient: 'right', background: true, components: [
				{kind: Clock}
			]}
		], components: [
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'}
		]},
		{name: 'panels', kind: Panels, pattern: 'activity', classes: 'enyo-fit', useHandle: true, onShowingChanged: 'panelsShowingChanged', components: [
			{title: 'First Panel', titleBelow:'Sub-title', subTitleBelow:'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next1'},
				{kind: Item, content: 'Item Two', ontap: 'next1'},
				{kind: Item, content: 'Item Three', ontap: 'next1'},
				{kind: Item, content: 'Item Four', ontap: 'next1'},
				{kind: ToggleItem, content: 'Show/Hide Side Handle', checked: true,  onchange: 'handleShowingChanged'}
			]},
			{title: 'Second Panel',
				joinToPrev: true, components: [
				{kind: Item, content: 'Item One', ontap: 'next2'},
				{kind: Item, content: 'Item Two', ontap: 'next2'},
				{kind: Item, content: 'Item Three', ontap: 'next2'},
				{kind: Item, content: 'Item Four', ontap: 'next2'},
				{kind: Item, content: 'Item Five', ontap: 'next2'}
			]},
			{title: 'Third Panel', titleBelow:'Sub-title', subTitleBelow:'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next3'},
				{kind: Item, content: 'Item Two', ontap: 'next3'},
				{kind: Item, content: 'Item Three', ontap: 'next3'},
				{kind: Item, content: 'Item Four', ontap: 'next3'},
				{kind: Item, content: 'Item Five', ontap: 'next3'}
			]},
			{title: 'Fourth', titleBelow:'Sub-title', subTitleBelow:'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next4'},
				{kind: Item, content: 'Item Two', ontap: 'next4'},
				{kind: Item, content: 'Item Three', ontap: 'next4'},
				{kind: Item, content: 'Item Four', ontap: 'next4'},
				{kind: Item, content: 'Item Five', ontap: 'next4'}
			]},
			{title: 'Fifth', titleBelow:'Sub-title', subTitleBelow:'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next5'},
				{kind: Item, content: 'Item Two', ontap: 'next5'},
				{kind: Item, content: 'Item Three', ontap: 'next5'},
				{kind: Item, content: 'Item Four', ontap: 'next5'},
				{kind: Item, content: 'Item Five', ontap: 'next5'}
			]},
			{title: 'Sixth', titleBelow:'Sub-title', subTitleBelow:'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next6'},
				{kind: Item, content: 'Item Two', ontap: 'next6'},
				{kind: Item, content: 'Item Three', ontap: 'next6'},
				{kind: Item, content: 'Item Four', ontap: 'next6'},
				{kind: Item, content: 'Item Five', ontap: 'next6'}
			]},
			{title: 'Seventh', titleBelow:'Sub-title', subTitleBelow:'Sub-sub title', components: [
				{kind: Item, content: 'Item One'},
				{kind: Item, content: 'Item Two'},
				{kind: Item, content: 'Item Three'},
				{kind: Item, content: 'Item Four'},
				{kind: Item, content: 'Item Five'}
			]}
		]}
	],
	rendered: function () {
		this.inherited(arguments);
		Spotlight.spot(this.$.panels);
	},
	// custom next handler for each panel to avoid switching from one active panel
	// to another with no visible change for demo
	next1: function (sender, ev) {
		this.$.panels.setIndex(1);
		return true;
	},
	next2: function (sender, ev) {
		this.$.panels.setIndex(2);
		return true;
	},
	next3: function (sender, ev) {
		this.$.panels.setIndex(3);
		return true;
	},
	next4: function (sender, ev) {
		this.$.panels.setIndex(4);
		return true;
	},
	next5: function (sender, ev) {
		this.$.panels.setIndex(5);
		return true;
	},
	next6: function (sender, ev) {
		this.$.panels.setIndex(6);
		return true;
	},
	handleShowingChanged: function (sender, ev) {
		this.$.panels.setHandleShowing(sender.getChecked());
	},
	panelsShowingChanged: function (sender, ev) {
		// Hiding the VideoPlayer when it would be obscured by the Panels avoids UI performance
		// issues caused by the GPU being occupied rendering video frames that aren't visible.
		this.$.player.set('showing', !ev.showing);
	}
});

module.exports.badgeClasses = 'new';

}],'src/AlwaysViewingPanelsSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	IconButton = require('moonstone/IconButton'),
	Item = require('moonstone/Item'),
	Panels = require('moonstone/Panels'),
	Tooltip = require('moonstone/Tooltip'),
	TooltipDecorator = require('moonstone/TooltipDecorator');

module.exports = kind({
	name: 'moon.sample.AlwaysViewingPanelsSample',
	classes: 'moon enyo-fit enyo-unselectable',
	style: 'background: gray url(\'http://lorempixel.com/1920/1080/\')',
	components: [
		{name: 'panels', kind: Panels, pattern: 'alwaysviewing', useHandle: false, components: [
			{title: 'First Panel', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Second Panel', titleBelow: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', subTitleBelow: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', headerComponents: [
				{kind: TooltipDecorator, components: [
					{kind: Tooltip, content: 'Tooltip', position: 'above'},
					{kind: IconButton}
				]}
			], components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Third Panel', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Fourth', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Fifth', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Sixth', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Seventh', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
				{kind: Item, content: 'Item One'},
				{kind: Item, content: 'Item Two'},
				{kind: Item, content: 'Item Three'},
				{kind: Item, content: 'Item Four'},
				{kind: Item, content: 'Item Five'}
			]}
		]}
	],
	next: function (sender, ev) {
		this.$.panels.next();
		return true;
	}
});

module.exports.badgeClasses = 'new';

}],'src/AlwaysViewingPanelsWithVideoSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('moonstone/Button'),
	ChannelInfo = require('moonstone/ChannelInfo'),
	Clock = require('moonstone/Clock'),
	ContextualPopup = require('moonstone/ContextualPopup'),
	ContextualPopupDecorator = require('moonstone/ContextualPopupDecorator'),
	IconButton = require('moonstone/IconButton'),
	Item = require('moonstone/Item'),
	Panels = require('moonstone/Panels'),
	ToggleItem = require('moonstone/ToggleItem'),
	Tooltip = require('moonstone/Tooltip'),
	TooltipDecorator = require('moonstone/TooltipDecorator'),
	VideoInfoBackground = require('moonstone/VideoInfoBackground'),
	VideoInfoHeader = require('moonstone/VideoInfoHeader'),
	VideoPlayer = require('moonstone/VideoPlayer');

var sources = [
	{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', type: 'video/mp4'},
	{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv', type: 'video/ogg'},
	{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm', type: 'video/webm'}
];

module.exports = kind({
    name: 'moon.sample.AlwaysViewingPanelsWithVideoSample',
    classes: 'moon enyo-fit enyo-unselectable',
    components: [
        {name: 'player', kind: VideoPlayer, sources: sources, poster: 'assets/video-poster.png', autoplay: true, infoComponents: [
			{kind: VideoInfoBackground, orient: 'left', background: true, fit: true, components: [
				{
					kind: ChannelInfo,
					channelNo: '13',
					channelName: 'AMC',
					components: [
						{content: '3D'},
						{content: 'Live'},
						{content: 'REC 08:22', classes: 'redicon'}
					]
				},
				{
					kind: VideoInfoHeader,
					title: 'Downton Abbey - Extra Title',
					subTitle: 'Mon June 21, 7:00 - 8:00pm',
					subSubTitle: 'R - TV 14, V, L, SC',
					description: 'The series, set in the Youkshire country estate of Downton Abbey, depicts the lives of the aristocratic Crawley famiry and'
				}
			]},
			{kind: VideoInfoBackground, orient: 'right', background: true, components: [
				{kind: Clock}
			]}
		], components: [
			{kind: IconButton, icon: 'list', small: false, backgroundOpacity: 'translucent'},
			{kind: TooltipDecorator, components: [
				{kind: ContextualPopupDecorator, components: [
					{kind: Button, content: 'Popup'},
					{
						kind: ContextualPopup,
						classes: 'moon-3h moon-6v',
						components: [
							{kind: Item, content: 'Item 1'},
							{kind: Item, content: 'Item 2'},
							{kind: Item, content: 'Item 3'}
						]
					}
				]},
				{kind: Tooltip, floating:true, content: 'I\'m a tooltip for a button.'}
			]},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'}
		]},
        {name: 'panels', kind: Panels, pattern: 'alwaysviewing', classes: 'enyo-fit', showing: false, components: [
            {title: 'First Panel', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: ToggleItem, content: 'Show/Hide Side Handle', checked: true,  onchange: 'handleShowingChanged'}
			]},
			{title: 'Second Panel', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
            {title: 'Third Panel', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
            {title: 'Fourth', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
            {title: 'Fifth', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
            {title: 'Sixth', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
            {title: 'Seventh', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]}
		]}
	],
	next: function (sender, ev) {
		this.$.panels.next();
		return true;
	},
	handleShowingChanged: function (sender, ev) {
		this.$.panels.setHandleShowing(sender.getChecked());
	}
});

module.exports.badgeClasses = 'new';

}],'src/DynamicPanelsSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	Repeater = require('enyo/Repeater');

var
	Divider = require('moonstone/Divider'),
	Item = require('moonstone/Item'),
	ListActions = require('moonstone/ListActions'),
	Panels = require('moonstone/Panels'),
	Scroller = require('moonstone/Scroller'),
	Tooltip = require('moonstone/Tooltip'),
	TooltipDecorator = require('moonstone/TooltipDecorator');

module.exports = kind({
	name: 'moon.sample.DynamicPanelsSample',
	classes: 'moon enyo-fit enyo-unselectable',
	components: [
		{name: 'panels', kind: Panels, popOnBack:true, wrap: true, pattern: 'activity'}
	],
	rendered: function () {
		this.inherited(arguments);
		this.pushSinglePanel();
	},
	pushSinglePanel: function () {
		this.$.panels.pushPanels([
			{title: 'Panel ' + this.$.panels.getPanels().length, titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
				{kind: Scroller, fit:true, components: [
					{kind: Repeater, count: 30, components: [
						{kind: Item, content: 'Dummy Item', ontap: 'next'}
					]}
				]}
			], headerComponents: [
				{kind: TooltipDecorator, components: [
					{kind: Tooltip, position: 'above', content: 'Test Dynamic Lists'},
					{kind: ListActions, icon: 'drawer', listActions: [
						{action: 'category3', components: [
							{kind: Divider, content: 'Dynamic List Action'},
							{kind: Item, content: 'Dummy Item 1'},
							{kind: Item, content: 'Dummy Item 2'}
						]}
					]}
				]}
			]}
		], {owner: this});
	},
	pushJoinedPanels: function () {
		this.$.panels.pushPanels([
			{title: 'Panel ' + this.$.panels.getPanels().length, titleBelow: 'Joined Panel 1', subTitleBelow: 'Sub-sub title', components: [
				{kind: Scroller, fit:true, components: [
					{kind: Repeater, count: 30, components: [
						{kind: Item, content: 'Dummy Item', ontap: 'next'}
					]}
				]}
			]},
			{joinToPrev:true, title: 'Panel ' + (this.$.panels.getPanels().length+1), titleBelow: 'Joined Panel 2', subTitleBelow: 'Sub-sub title', components: [
				{kind: Scroller, fit:true, components: [
					{kind: Repeater, count: 30, components: [
						{kind: Item, content: 'Dummy Item', ontap: 'next'}
					]}
				]}
			]}
		], {owner: this});
	},
	pushSeveralPanels: function () {
		this.$.panels.pushPanels([
			{title: 'Panel ' + this.$.panels.getPanels().length, titleBelow: '1 of 3 Panels', subTitleBelow: 'Sub-sub title', components: [
				{kind: Scroller, fit:true, components: [
					{kind: Repeater, count: 5, components: [
						{kind: Item, content: 'Dummy Item', ontap: 'next'}
					]}
				]}
			]},
			{title: 'Panel ' + (this.$.panels.getPanels().length+1), titleBelow: '2 of 3 Panels', subTitleBelow: 'Sub-sub title', components: [
				{kind: Scroller, fit:true, components: [
					{kind: Repeater, count: 10, components: [
						{kind: Item, content: 'Dummy Item', ontap: 'next'}
					]}
				]}
			]},
			{title: 'Panel ' + (this.$.panels.getPanels().length+2), titleBelow: '3 of 3 Panels', subTitleBelow: 'Sub-sub title', components: [
				{kind: Scroller, fit:true, components: [
					{kind: Repeater, count: 15, components: [
						{kind: Item, content: 'Dummy Item', ontap: 'next'}
					]}
				]}
			]}
			// targetIndex with a negative value works in conjunction with the wrap:true property.
			// Negative values count backward from the end while indices greater than the length
			// wrap around and start counting again from the beginning.
		], {owner: this}, {targetIndex: -1});
	},
	next: function () {
		var index = this.$.panels.getIndex();
		var length = this.$.panels.getPanels().length;
		if (index < (length-1)) {
			this.$.panels.next();
		} else if (length % 5 === 0) {
			this.pushSeveralPanels();
		} else if (length % 3 === 0) {
			this.pushJoinedPanels();
		} else {
			this.pushSinglePanel();
		}
	}
});

module.exports.badgeClasses = 'new';

}],'src/InputHeaderSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

 var
 	FittableRows = require('layout/FittableRows'),
 	BodyText = require('moonstone/BodyText'),
 	Divider = require('moonstone/Divider'),
 	Item = require('moonstone/Item'),
 	IconButton = require('moonstone/IconButton'),
 	InputHeader = require('moonstone/InputHeader'),
 	Panel = require('moonstone/Panel'),
 	Panels = require('moonstone/Panels');

module.exports = kind({
	name: 'moon.sample.InputHeaderSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit moon-input-header-sample',
	components: [
		{name: 'panels', kind: Panels, pattern: 'activity', fit: true, components: [
			{
				kind: Panel,
				headerOptions: {kind: InputHeader, components: [
					{kind: IconButton, icon: 'check'},
					{kind: IconButton, icon: 'arrowlargeright'}
				]},
				onInputHeaderInput: 'handleInput',
				onInputHeaderChange: 'handleChange',
				title:'Input Header',
				titleAbove: '01',
				titleBelow: 'Sub Header',
				subTitleBelow: 'Sub-sub Header',
				components: [
					{kind: Item, content: 'Small Header Panel', ontap: 'nextPanel'}
				]
			},
			{
				kind: Panel,
				headerOptions: {kind: InputHeader, components: [
					{kind: IconButton, icon: 'check'},
					{kind: IconButton, icon: 'arrowlargeright'}
				]},
				onInputHeaderInput: 'handleInput',
				onInputHeaderChange: 'handleChange',
				headerType: 'medium',
				title:'Small Input Header',
				titleAbove: '02',
				titleBelow: 'Sub Header',
				subTitleBelow: 'Sub-sub Header'
			}
		]},
		{classes: 'moon-input-header-sample-result', components: [
			{kind: Divider, content: 'Result'},
			{kind: BodyText, name: 'console', content: 'Input: '}
		]}
	],
	nextPanel: function () {
		this.$.panels.next();
	},
	handleInput: function (sender, ev) {
		this.$.console.setContent('Input: ' + ev.originator.getValue());
		return true;
	},
	handleChange: function (sender, ev) {
		this.$.console.setContent('Change: ' + ev.originator.getValue());
		return true;
	}
});

module.exports.badgeClasses = 'deprecated';

}],'src/PanelsVideoPlayerSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	Group = require('enyo/Group');

var
	FittableLayout = require('layout/FittableLayout'),
	FittableColumnsLayout = FittableLayout.Columns;

var
	Button = require('moonstone/Button'),
	ChannelInfo = require('moonstone/ChannelInfo'),
	Clock = require('moonstone/Clock'),
	Divider = require('moonstone/Divider'),
	IconButton = require('moonstone/IconButton'),
	Panel = require('moonstone/Panel'),
	Panels = require('moonstone/Panels'),
	SelectableItem = require('moonstone/SelectableItem'),
	ToggleButton = require('moonstone/ToggleButton'),
	VideoFullscreenToggleButton = require('moonstone/VideoFullscreenToggleButton'),
	VideoInfoBackground = require('moonstone/VideoInfoBackground'),
	VideoInfoHeader = require('moonstone/VideoInfoHeader'),
	VideoPlayer = require('moonstone/VideoPlayer');

module.exports = kind({
	name: 'moon.sample.PanelsVideoPlayerSample',
	classes: 'moon enyo-fit enyo-unselectable',
	components: [
		{name: 'panels', kind: Panels, pattern: 'activity', classes: 'enyo-fit', components: [
			{kind: Panel, title: 'Video Player', layoutKind: FittableColumnsLayout, components: [
				{
					classes: 'moon-4h',
					components: [
						{kind: Divider, content: 'Select video content'},
						{name: 'vidContents', kind: Group, style: 'margin-top: 20px;', components: [
							{kind: SelectableItem, content: 'Counter', onActivate: 'webMovieCounter'},
							{kind: SelectableItem, selected: true, content: 'Bunny', onActivate: 'webMovieBunny'},
							{kind: SelectableItem, content: 'Sintel', onActivate: 'webMovieSintel'},
							{kind: SelectableItem, content: 'Error URL', onActivate: 'error'}
						]},
						{classes: 'moon-vspacing-m', components: [
							{kind: Button, content: 'Unload', ontap: 'unload'},
							{kind: Button, content: 'Reload', ontap: 'load'},
							{kind: ToggleButton, name: 'autoplayToggle', content: 'AutoPlay'}
						]}
					]
				},
				{
					fit: true,
					components: [
						{kind: Divider, content: 'Inline video player'},
						{
							name: 'player',
							kind: VideoPlayer,
							inline:true,
							classes: 'moon-8h',
							poster: 'assets/video-poster.png',
							infoComponents: [{
								kind: VideoInfoBackground,
								orient: 'left',
								fit: true,
								components: [
									{
										kind: ChannelInfo,
										channelNo: '13',
										channelName: 'AMC',
										components: [
											{content: '3D'},
											{content: 'Live'},
											{content: 'REC 08:22', classes: 'redicon'}
										]
									},
									{
										kind: VideoInfoHeader,
										title: 'Downton Abbey',
										subTitle: 'Mon June 21, 7:00 - 8:00pm',
										subSubTitle: 'R - TV 14, V, L, SC',
										description: 'The series, set in the Youkshire country estate of Downton Abbey, depicts the lives of the aristocratic Crawley famiry and'
									}
								]
							}, {
								kind: VideoInfoBackground,
								orient: 'right',
								components: [
									{kind: Clock}
								]
							}],
							components: [
								{kind: VideoFullscreenToggleButton, backgroundOpacity: 'translucent'},
								{kind: IconButton, backgroundOpacity: 'translucent'},
								{kind: IconButton, backgroundOpacity: 'translucent'},
								{kind: IconButton, backgroundOpacity: 'translucent'},
								{kind: IconButton, backgroundOpacity: 'translucent'},
								{kind: IconButton, backgroundOpacity: 'translucent'},
								{kind: IconButton, backgroundOpacity: 'translucent'},
								{kind: IconButton, backgroundOpacity: 'translucent'},
								{kind: IconButton, backgroundOpacity: 'translucent'},
								{kind: IconButton, backgroundOpacity: 'translucent'}
							]
						}
					]
				}
			]}
		]}
	],
	bindings: [
		{from: '$.autoplayToggle.value', to: '$.player.autoplay'}
	],
	unload: function () {
		this.$.player.unload();
	},
	load: function () {
		this.$.player.unload();
		this.$.player.setSources(this.sources);
	},
	webMovieCounter: function (sender, ev) {
		if (!ev.originator.active) {
			return;
		}
		// Set source by sources array
		this.sources = [
			{src: 'http://media.w3.org/2010/05/video/movie_300.mp4', type: 'video/mp4'},
			{src: 'http://media.w3.org/2010/05/video/movie_300.ogv', type: 'video/ogg'},
			{src: 'http://media.w3.org/2010/05/video/movie_300.webm', type: 'video/webm'}
		];
		this.$.player.setSources(this.sources);
		this.$.videoInfoHeader.setTitle('Ticking Counter Video');
	},
	webMovieBunny: function (sender, ev) {
		if (!ev.originator.active) {
			return;
		}
		// Set source by sources array
		this.sources = [
			{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', type: 'video/mp4'},
			{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv', type: 'video/ogg'},
			{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm', type: 'video/webm'}
		];
		this.$.player.setSources(this.sources);
		this.$.videoInfoHeader.setTitle('Bunny Video');
	},
	webMovieSintel: function (sender, ev) {
		if (!ev.originator.active) {
			return;
		}
		// Set source by sources array
		this.sources = [
			{src: 'http://media.w3.org/2010/05/sintel/trailer.mp4', type: 'video/mp4'},
			{src: 'http://media.w3.org/2010/05/sintel/trailer.ogv', type: 'video/ogg'},
			{src: 'http://media.w3.org/2010/05/sintel/trailer.webm', type: 'video/webm'}
		];
		this.$.player.setSources(this.sources);
		this.$.videoInfoHeader.setTitle('The Sintel Video');
	},
	error: function (sender, ev) {
		if (!ev.originator.active) {
			return;
		}
		this.src = 'http://foo.bar';
		this.$.player.setSrc(this.src);
		this.$.videoInfoHeader.setTitle('Error video');
	}
});

module.exports.badgeClasses = 'new';

}],'src/PanelsWithCardArrangerSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	CardArranger = require('layout/CardArranger');

var
	Panels = require('moonstone/Panels'),
	Item = require('moonstone/Item');

module.exports = kind({
	name: 'moon.sample.PanelsWithCardArrangerSample',
	classes: 'moon enyo-fit',
	components: [
		{name: 'panels', kind: Panels, arrangerKind: CardArranger, animate: false, classes: 'enyo-fit', components: [
			{title: 'First', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Second', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Third', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Fourth', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Fifth', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Sixth Panel with a very long title', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Seventh', components: [
				{kind: Item, content: 'Item One'},
				{kind: Item, content: 'Item Two'},
				{kind: Item, content: 'Item Three'},
				{kind: Item, content: 'Item Four'},
				{kind: Item, content: 'Item Five'}
			]}
		]}
	],
	next: function (sender, ev) {
		this.$.panels.next();
		return true;
	}
});

module.exports.badgeClasses = 'new';

}],'src/PanelsWithCarouselArrangerSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	CarouselArranger = require('layout/CarouselArranger');

var
	Panels = require('moonstone/Panels'),
	Item = require('moonstone/Item');

module.exports = kind({
	name: 'moon.sample.PanelsWithCarouselArrangerSample',
	classes: 'moon enyo-fit',
	components: [
		{name: 'panels', kind: Panels, arrangerKind: CarouselArranger, classes: 'enyo-arranger-fit', components: [
			{title: 'First', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Second', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Third', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Fourth', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Fifth', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Sixth', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Seventh', components: [
				{kind: Item, content: 'Item One'},
				{kind: Item, content: 'Item Two'},
				{kind: Item, content: 'Item Three'},
				{kind: Item, content: 'Item Four'},
				{kind: Item, content: 'Item Five'}
			]}
		]}
	],
	next: function (sender, ev) {
		this.$.panels.next();
		return true;
	}
});

module.exports.badgeClasses = 'new';

}],'src/PopupSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	CardArranger = require('layout/CardArranger'),
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows'),
	BodyText = require('moonstone/BodyText'),
	Button = require('moonstone/Button'),
	Divider = require('moonstone/Divider'),
	CheckboxItem = require('moonstone/CheckboxItem'),
	FormCheckbox = require('moonstone/FormCheckbox'),
	Item = require('moonstone/Item'),
	Panels = require('moonstone/Panels'),
	Popup = require('moonstone/Popup'),
	Scroller = require('moonstone/Scroller');

module.exports = kind({
	name: 'moon.sample.PopupSample',
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Divider, content: 'Popups'},

		{classes: 'moon-hspacing moon-vspacing-s', components: [
			{kind: Button, content: 'Basic Popup', ontap: 'showPopup', popup: 'basicPopup'},
			{kind: Button, content: 'Direct Popup', ontap: 'showPopup', popup: 'directPopup', direct: true},
			{kind: Button, content: 'Long Popup', ontap: 'showPopup', popup: 'longPopup'}
		]},
		{classes: 'moon-hspacing moon-vspacing-s', components: [
			{kind: Button, content: 'Scroller Popup', ontap: 'showPopup', popup: 'scrollerPopup'},
			{kind: Button, content: 'Button in Popup', ontap: 'showPopup', popup: 'buttonPopup'},
			{kind: Button, content: 'Panels in Popup', ontap: 'showPopup', popup: 'panelsPopup'},
			{kind: Button, content: 'Test Popup', ontap: 'showPopup', popup: 'testPopup'}
		]},
		{classes: 'moon-1v'},
		{kind: Divider, content: 'Options (these apply to Test Popup)'},
		{kind: CheckboxItem, content: 'Tap outside to close (autoDismiss)', name: 'autoDismissToggle'},
		{kind: CheckboxItem, content: 'Modal', name: 'modalToggle'},
		{kind: CheckboxItem, content: 'Show Close Button', name: 'showCloseButtonToggle'},
		{kind: CheckboxItem, content: 'Animate', name: 'animateToggle'},
		{kind: CheckboxItem, content: 'Lock 5-way inside popup (spotlightModal)', name: 'spotlightModalToggle'},
		{kind: CheckboxItem, content: 'Close by back key (allowBackKey)', name: 'allowBackKeyToggle'},

		{name: 'basicPopup', kind: Popup, content: 'Popup...'},
		// The directPopup only works when we programmatically call 'showDirect' or 'hideDirect'. So, we set autoDismiss as false here.
		{name: 'directPopup', kind: Popup, autoDismiss: false, components: [
			{content: 'Direct Popup'},
			{kind: Button, content: 'Hide Direct', ontap: 'hidePopup', popup: 'directPopup', direct: true}
		]},
		{name: 'longPopup', kind: Popup, allowHtml: true, content: 'Don\'t go changing, to try and please me  <br>You never let me down before  <br>Don\'t imagine you\'re too familiar  <br>And I don\'t see you anymore  <br>I wouldn\'t leave you in times of trouble  <br>We never could have come this far I took the good times, I\'ll take the bad times I\'ll take you just the way you are Don\'t go trying some new fashion Don\'t change the color of your hair You always have my unspoken passion Although I might not seem to care I don\'t want clever conversation I never want to work that hard I just want someone that I can talk to I want you just the way you are. I need to know that you will always be The same old someone that I knew What will it take till you believe in me The way that I believe in you.'},
		{name: 'scrollerPopup', kind: Popup, components: [
			{kind: Button, content: 'Button Outside Scroller'},
			{kind: Scroller, style: 'height:170px;margin-top:10px;', components: [
				{kind: Item, content: 'Test Item 1'},
				{kind: Item, content: 'Test Item 2'},
				{kind: Item, content: 'Test Item 3'},
				{kind: Item, content: 'Test Item 4'},
				{kind: Item, content: 'Test Item 5'},
				{kind: Item, content: 'Test Item 6'},
				{kind: Item, content: 'Test Item 7'},
				{kind: Item, content: 'Test Item 8'},
				{kind: Item, content: 'Test Item 9'},
				{kind: Item, content: 'Test Item 10'}
			]}
		]},
		{name: 'buttonPopup', kind: Popup, components: [
			{kind: Divider, content: 'Buttons in popup example'},
			{classes: 'moon-hspacing', components: [
				{kind: Button, content: 'Hello'},
				{kind: Button, content: 'Goodbye'}
			]}
		]},
		{name: 'panelsPopup', kind: Popup, showCloseButton: true, classes: 'moon-12v', components: [
			{kind: Panels, name: 'panels', defaultKind: FittableRows, arrangerKind: CardArranger, animate:false, hasCloseButton: false, components: [
				{components: [
					{kind: Divider, content: 'Step 1: Terms of Service'},
					{kind: Scroller, fit: true, spotlightPagingControls: true, horizontal: 'hidden', style: 'margin-bottom:20px;', components: [
						{kind: BodyText, content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
					]},
					{kind: FittableColumns, components: [
						{fit: true, components: [
							{kind: FormCheckbox, content: 'I agree', style: 'display:inline-block;'}
						]},
						{kind: Button, content: 'Sign me Up!', ontap: 'panelNext'}
					]}
				]},
				{components: [
					{kind: Divider, content: 'Step 2'},
					{kind: BodyText, fit: true, content: 'All done.  Thanks for signing up!'},
					{kind: Button, content: 'Previous', ontap: 'panelPrev'}
				]}
			]}
		]},
		{name: 'testPopup', kind: Popup, components: [
			{kind: Button, content: 'Hide', ontap: 'hidePopup', popup: 'testPopup'}
		]}
	],
	bindings: [
		{from: '$.testPopup.autoDismiss', to: '$.autoDismissToggle.checked', oneWay: false},
		{from: '$.testPopup.modal', to: '$.modalToggle.checked', oneWay: false},
		{from: '$.testPopup.showCloseButton', to: '$.showCloseButtonToggle.checked', oneWay: false},
		{from: '$.testPopup.animate', to: '$.animateToggle.checked', oneWay: false},
		{from: '$.testPopup.spotlightModal', to: '$.spotlightModalToggle.checked', oneWay: false},
		{from: '$.testPopup.allowBackKey', to: '$.allowBackKeyToggle.checked', oneWay: false},
		{from: '$.testPopup.useDivider', to: '$.useDivider.checked', oneWay: false},
		{from: '$.testPopup.title', to: '$.inputTitle.value', oneWay: false},
		{from: '$.testPopup.subTitle', to: '$.inputSubTitle.value', oneWay: false}
	],
	showPopup: function (sender) {
		this.hidePopups();
		var p = this.$[sender.popup];
		if (p) {
			if(sender.direct) {
				p.showDirect();
			} else {
				p.show();
			}
		}
	},
	hidePopup: function (sender) {
		var p = this.$[sender.popup];
		if(p) {
			if(sender.direct) {
				p.hideDirect();
			} else {
				p.hide();
			}
		}
	},
	hidePopups: function () {
		this.$.basicPopup.hide();
		this.$.longPopup.hide();
		this.$.buttonPopup.hide();
	},
	panelNext: function () {
		this.$.panels.next();
	},
	panelPrev: function () {
		this.$.panels.previous();
	}
});

}],'src/ExpandableListItemSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Group = require('enyo/Group'),
	FittableRows = require('layout/FittableRows'),
	BodyText = require('moonstone/BodyText'),
	Divider = require('moonstone/Divider'),
	ExpandableListItem = require('moonstone/ExpandableListItem'),
	Scroller = require('moonstone/Scroller');

module.exports = kind({
	name: 'moon.sample.ExpandableListItemSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit',
	handlers: {
		onActivate: 'activateHandler'
	},
	components: [
		{kind: Scroller, horizontal: 'hidden', fit: true, components: [
			{classes: 'moon-5h', components: [
				{kind: ExpandableListItem, content: 'Expandable ListItem', components: [
					{content: 'Item 1'},
					{content: 'Item 2'},
					{content: 'Item 3'}
				]},
				{kind: ExpandableListItem, disabled:true, content: 'Disabled ListItem', components: [
					{content: 'Item 1'},
					{content: 'Item 2'},
					{content: 'Item 3'}
				]},
				{kind: ExpandableListItem, content: 'Pre-expanded ListItem', open: true, components: [
					{content: 'Item 1'},
					{content: 'Item 2'},
					{content: 'Item 3'}
				]},
				{kind: ExpandableListItem, content: 'Bottom-locking', lockBottom: true, open: true, components: [
					{content: 'Item 1'},
					{content: 'Item 2'},
					{content: 'Item 3'}
				]},
				{kind: ExpandableListItem, content: 'Auto-collapsing', autoCollapse: true, components: [
					{content: 'Item 1'},
					{content: 'Item 2'},
					{content: 'Item 3'}
				]},
				{kind: Group, highlander: true, components: [
					{kind: ExpandableListItem,  open: true,
						content: 'This is a grouped ExpandableListItem', components: [
							{content: 'Item One'},
							{content: 'Item Two'}
						]
					},
					{kind: ExpandableListItem,
						content: 'This is another grouped ExpandableListItem', components: [
							{content: 'Item Three'},
							{content: 'Item Four'}
						]
					},
					{kind: ExpandableListItem,
						content: 'This is yet another grouped ExpandableListItem', components: [
							{content: 'Item Five'},
							{content: 'Item Six'}
						]
					}
				]}
			]}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'console', content: 'Event'}
	],
	activateHandler: function (sender, ev) {
		if (this.generated && ev.originator instanceof ExpandableListItem) {
			this.$.console.setContent(ev.originator.getContent() + ' is now ' + (ev.originator.getActive() ? 'open' : 'closed'));
		}
	}
});

}],'src/ContextualPopupSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('moonstone/Button'),
	ContextualPopup = require('moonstone/ContextualPopup'),
	ContextualPopupDecorator = require('moonstone/ContextualPopupDecorator'),
	Divider = require('moonstone/Divider'),
	Input = require('moonstone/Input'),
	InputDecorator = require('moonstone/InputDecorator'),
	Item = require('moonstone/Item'),
	CheckboxItem = require('moonstone/CheckboxItem'),
	RadioItem = require('moonstone/RadioItem'),
	RadioItemGroup = require('moonstone/RadioItemGroup'),
	Scroller = require('moonstone/Scroller'),
	ToggleButton = require('moonstone/ToggleButton');

module.exports = kind({
	name: 'moon.sample.ontextualPopupSample',
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{
			kind: ContextualPopupDecorator,
			style: 'position: absolute; left: 0px; top: 0px;',
			components:
			[
				{content: 'Average'},
				{
					kind: ContextualPopup,
					classes: 'moon-2h moon-8v',
					components: [
						{content: 'Item 1'},
						{content: 'Item 2'},
						{content: 'Item 3'}
					]
				}
			]
		},
		{kind: ContextualPopupDecorator, style: 'position: absolute; right: 0px; top: 0px;', components: [
			{content: 'Small', small:true},
			{kind: ContextualPopup}
		]},
		{kind: ContextualPopupDecorator, style: 'position: absolute; right: 0px; top: 13%;', components: [
			{content: 'Nested Radio', small:true},
				{name: 'nestedRadioPopup', kind: ContextualPopup, components:[
					{name: 'nestedRadioGroup', kind: RadioItemGroup, components: [
						{content: 'Creek', selected: true},
						{content: 'River'},
						{content: 'Ocean'}
					]},
					{components:[
						{content: 'Radio Group Value'},
						{name: 'nestedRadioValue'}
					]},
					{name: 'nestedRadioDismissButton',
					 kind: ToggleButton,
					 style: 'margin-top:5px',
					 small: true,
					 toggleOnLabel: 'select dismiss on',
					 toggleOffLabel: 'select dismiss off'
					}
				]}
			]
		},
		{kind: ContextualPopupDecorator, style: 'position: absolute; left: 0px; top: 25%;', components: [
			{content: 'Left'},
			{
				kind: ContextualPopup,
				classes: 'moon-3h moon-4v',
				components: [
					{content: 'Item 1'},
					{content: 'Item 2'},
					{content: 'Item 3'}
				]
			}
		]},
		{kind: ContextualPopupDecorator, style: 'position: absolute; right: 0px; top: 25%;', components: [
			{content: 'Right', small:true},
			{kind: ContextualPopup, components: [
				{content: 'Outside scroller', kind: Item},
				{classes: 'moon-8h moon-6v', components: [
					{kind: Scroller, classes: 'enyo-fill', components: [
						{content: 'testing 1', kind: Item},
						{content: 'testing 2', kind: Item},
						{content: 'testing 3', kind: Item},
						{content: 'testing 4', kind: Item},
						{content: 'testing 5', kind: Item},
						{content: 'testing 6', kind: Item},
						{content: 'testing 7', kind: Item},
						{content: 'testing 8', kind: Item},
						{content: 'testing 9', kind: Item},
						{content: 'testing 10', kind: Item},
						{content: 'testing 12', kind: Item},
						{content: 'testing 13', kind: Item},
						{content: 'testing 14', kind: Item},
						{content: 'testing 15', kind: Item},
						{content: 'testing 16', kind: Item},
						{content: 'testing 17', kind: Item},
						{content: 'testing 18', kind: Item},
						{content: 'testing 19', kind: Item}
					]}

				]}
			]}
		]},
		{kind: ContextualPopupDecorator, style: 'position: absolute; left: 0px; top: 45%;', components: [
			{content: 'Wide'},
			{kind: ContextualPopup, classes: 'moon-6h moon-4v', components: [
				{kind: Scroller, classes: 'enyo-fill', components:[
					{content: 'testing 1'},
					{content: 'testing 2'}
				]}
			]}
		]},
		{kind: ContextualPopupDecorator, style: 'position: absolute; right: 0px; top: 45%;', components: [
			{content: 'Long but Small Button with truncation', small:true},
			{kind: ContextualPopup, components: [
				{content: 'Outside scroller', kind: Item},
				{classes: 'moon-16v', components: [
					{kind: Scroller, classes: 'enyo-fill', components: [
						{content: 'testing 1', kind: Item},
						{content: 'testing 2', kind: Item},
						{content: 'testing 3', kind: Item},
						{content: 'testing 4', kind: Item},
						{content: 'testing 5', kind: Item},
						{content: 'testing 6', kind: Item},
						{content: 'testing 7', kind: Item},
						{content: 'testing 8', kind: Item},
						{content: 'testing 9', kind: Item},
						{content: 'testing 10', kind: Item},
						{content: 'testing 12', kind: Item},
						{content: 'testing 13', kind: Item},
						{content: 'testing 14', kind: Item},
						{content: 'testing 15', kind: Item},
						{content: 'testing 16', kind: Item},
						{content: 'testing 17', kind: Item},
						{content: 'testing 18', kind: Item},
						{content: 'testing 19', kind: Item}
					]}

				]}
			]}
		]},
		{kind: ContextualPopupDecorator, style: 'position: absolute; left: 0px; top: 65%;', components: [
			{content: 'Deactivated', disabled:true},
			{kind: ContextualPopup, classes: 'moon-6h moon-4v', components: [
				{kind: Scroller, classes: 'enyo-fill', components:[
					{content: 'testing 1'},
					{content: 'testing 2'}
				]}
			]}
		]},
		{kind: ContextualPopupDecorator, style: 'position: absolute; right: 0px; top: 65%;', components: [
			{content: 'Small Deactivated', small:true, disabled:true},
			{kind: ContextualPopup, classes: 'moon-6h moon-4v', components: [
				{kind: Scroller, classes: 'enyo-fill', components:[
					{content: 'testing 1'},
					{content: 'testing 2'}
				]}
			]}
		]},
		{kind: ContextualPopupDecorator, style: 'position: absolute; left: 0px; bottom: 0px;', components: [
			{content: 'Spotlight Modal'},
			{
				kind: ContextualPopup,
				name: 'buttonPopup',
				classes: 'moon-10h moon-8v',
				spotlightModal: true,
				showCloseButton: true,
				components: [
					{kind: Scroller, horizontal: 'auto', classes: 'enyo-fill', components: [
						{kind: Button, content: 'Button'},
						{name: 'spotlightModalToggle', kind: ToggleButton, content: 'SpotlightModal'},
						{tag: 'br'},
						{tag: 'br'},
						{kind: InputDecorator, spotlight: true, components: [
							{kind: Input, placeholder: 'USERNAME'}
						]}
					]}
				]
			}
		]},
		{kind: ContextualPopupDecorator, style: 'position: absolute; right: 0px; bottom: 0px;', components: [
			{content: 'Spottable', small:true},
			{
				kind: ContextualPopup,
				classes: 'moon-10h moon-4v',
				components: [
					{kind: Scroller, horizontal: 'auto', classes: 'enyo-fill', components: [
						{kind: Button, content: 'Button 1'},
						{kind: Button, content: 'Button 2'},
						{kind: Button, content: 'Button 3'}
					]}
				]
			}
		]},
		{style: 'position: absolute; left: 30%; top: 5%;', components: [
			{kind: Divider, content: 'Popup Options'},
			{kind: CheckboxItem, content: 'Tap outside to close (autoDismiss)', name: 'autoDismissCheck'},
			{kind: CheckboxItem, content: 'Lock 5-way inside popup (spotlightModal)', name: 'spotlightModalCheck'},
			{kind: CheckboxItem, content: 'Show Close Button', name: 'showCloseButtonCheck'}
		]},
		{style: 'position: absolute; left: 30%; top: 30%;', components: [
			{kind: Divider, content: 'Button Position'},
			{kind: InputDecorator, components: [
				{kind: Input, style: 'width: 120px', name: 'leftInput', placeholder: 'left (px or %)'}
			]},
			{kind: InputDecorator, components: [
				{kind: Input, style: 'width: 120px', name: 'topInput', placeholder: 'top (px or %)'}
			]},
			{kind: Button, small: true, content: 'Set Position', ontap: 'setPosition'}
		]},
		{style: 'position: absolute; left: 30%; top: 50%; ', components: [
			{kind: Divider, content: 'Popup Direction'},
			{kind: RadioItemGroup, onActivate: 'groupChanged', components: [
				{content: 'none'},
				{content: 'left'},
				{content: 'right'},
				{content: 'top'},
				{content: 'bottom'}
			]}
		]},
		{kind: ContextualPopupDecorator, name: 'directionButton', style: 'position: absolute; left: 40%; top: 70%;', components: [
			{content: 'Direction'},
			{
				kind: ContextualPopup,
				name: 'directionContext',
				classes: 'moon-4v',
				components: [
					{kind: Button, content: 'Button 1'},
					{kind: Button, content: 'Button 2'}
				]
			}
		]}
	],
	bindings: [
		{from: '.$.nestedRadioGroup.active.content', to: '.$.nestedRadioValue.content', transform: function(val){
			this.dismissRadioSelection();
			return val;
		}},
		{from: '$.buttonPopup.spotlightModal', to: '$.spotlightModalToggle.value', oneWay: false},
		{from: '$.directionContext.autoDismiss', to: '$.autoDismissCheck.checked', oneWay: false},
		{from: '$.directionContext.spotlightModal', to: '$.spotlightModalCheck.checked', oneWay: false},
		{from: '$.directionContext.showCloseButton', to: '$.showCloseButtonCheck.checked', oneWay: false}
	],
	dismissRadioSelection: function () {
		if(this.$.nestedRadioDismissButton.value) this.$.nestedRadioPopup.hide();
	},
	setPosition: function () {
		this.$.directionButton.applyStyle('left', this.$.leftInput.getValue() === '' ? '40%' : this.$.leftInput.getValue());
		this.$.directionButton.applyStyle('top', this.$.topInput.getValue() === '' ? '70%' : this.$.topInput.getValue());
	},
	groupChanged: function (sender, ev) {
		if(ev.originator.getActive() && ev.originator.kind === RadioItem) {
			var selected = ev.originator.getContent();
			this.$.directionContext.set('direction', selected);
		}
	}
});
}],'src/RadioItemSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	BodyText = require('moonstone/BodyText'),
	Divider = require('moonstone/Divider'),
	RadioItem = require('moonstone/RadioItem'),
	RadioItemGroup = require('moonstone/RadioItemGroup');

module.exports = kind({
	name: 'moon.sample.RadioItemSample',
	classes: 'moon enyo-unselectable enyo-fit moon-radio-item-sample',
	kind: FittableRows,
	components: [
		{fit: true, components: [
			{kind: Divider, content: 'Radio Items'},
			{style: 'margin: 0 10px', onActivate: 'buttonActivated', components: [
				{kind: RadioItem, content: 'Cat'},
				{kind: RadioItem, content: 'Dog'},
				{kind: RadioItem, content: 'Whale', disabled: true},
				{kind: RadioItem, content: 'Monte Verde Golden Toad'}
			]},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'Radio Item Group'},
			{kind: RadioItemGroup, onActivate: 'buttonActivated', components: [
				{content: 'Raspberry'},
				{content: 'Blackberry'},
				{content: 'Strawberry', disabled: true},
				{content: 'Persimmon is botanical berries'}
			]},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'Pre-selected Radio Item Group'},
			{kind: RadioItemGroup, onActivate: 'buttonActivated', components: [
				{content: 'Creek'},
				{content: 'River', selected: true},
				{content: 'Waterfall', disabled: true},
				{content: 'Ocean is big big big water'}
			]}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'result', content: 'No action yet.'}
	],
	buttonActivated: function (sender, ev) {
		var originator = ev.originator,
			str = 'The \'';

		if (!originator || !this.hasNode()) {
			return;
		}

		str += (ev.originator.getActive() && ev.originator.kind === 'moon.RadioItem') ? originator.getContent() : originator.name;
		str +=  '\' item is selected.';

		this.$.result.setContent(str);
	}
});
}],'src/All':[function (module,exports,global,require,request){
var
	i18n = require('enyo/i18n'),
	kind = require('enyo/kind');

var
	Enyo_iLib = require('enyo-ilib');

var
	Moonstone = require('moonstone');

var
	Button = require('moonstone/Button'),
	ContextualPopup = require('moonstone/ContextualPopup'),
	ContextualPopupDecorator = require('moonstone/ContextualPopupDecorator'),
	DataList = require('moonstone/DataList'),
	Divider = require('moonstone/Divider'),
	Item = require('moonstone/Item'),
	Panel = require('moonstone/Panel'),
	Panels = require('moonstone/Panels'),
	Scroller = require('moonstone/Scroller'),
	ToggleItem = require('moonstone/ToggleItem'),
	Collection = require('enyo/Collection'),
	DataRepeater = require('enyo/DataRepeater');

var
	AppRouter = require('../../../strawman/AppRouter'),
	LinkSupport = require('../../../strawman/LinkSupport');

var locales = [
	{locale: 'local', title: '', selected: true},
	{locale: 'en-US', title: '<span class="light">- US English</span>'},
	{locale: 'ko-KR', title: '<span class="light">- Korean</span>'},
	{locale: 'th-TH', title: '<span class="light">- Thai, with tall characters</span>'},
	{locale: 'ar-SA', title: '<span class="light">- Arabic, RTL and standard font</span>'},
	{locale: 'ur-PK', title: '<span class="light">- Urdu, RTL and custom Urdu font</span>'},
	{locale: 'zh-Hant-HK', title: '<span class="light">- Traditional Chinese, custom Hant font</span>'},
	{locale: 'ja-JP', title: '<span class="light">- Japanese, custom Japanese font</span>'},
	{locale: 'en-JP', title: '<span class="light">- English, custom Japanese font</span>'}
];

var LocaleItem = kind({
	kind: ToggleItem,
	handleTapEvent: false,
	observers: {
		updateTitle: ['locale', 'title']
	},
	updateTitle: function () {
		this.set('content', this.locale + ' ' + this.title);
	}
});

var SampleListItem = kind({
	kind: Item,
	classes: 'moon-sample-list-item enyo-border-box',
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

/**
* _Moonstone Sample_ is a tool for displaying and interacting with sample code in the Moonstone
* user interface library. This tool can display a list of all samples and load individual
* samples. The URL to access samples accepts a sample-name and an optional internationalization
* locale to load the sample in. When browsing through and running the samples, the URL will
* automatically update as necessary.
*
* Some example URLs:
* * Sample.html
* * Sample.html#ButtonSample
* * Sample.html#ButtonSample/ar-SA
*
* If you'd like to add a sample to the list, you'll need to include it, and any related files,
* in the _package.js_ file in this directory. Be sure to name your file the same as your
* sample's kind.
*
* **Example:** _ContextualPopupSample.js_
* ```
* kind({
*     name: 'moon.sample.ContextualPopupSample',
*     ...
* });
* ```
*
*/
module.exports = kind({
	name: 'moon.sample.All',
	title: 'Moonstone Samples',
	version: Moonstone.version,
	classes: 'moon enyo-unselectable enyo-fit',
	published: {
		sample: null,
		samples: null,
		locale: 'local',
		location: function () {
			var s = this.get('sample') || ''	,
				locale = this.get('locale');
			return s + ((!locale || locale == 'local') ? '' : '/' + locale);
		}
	},
	components: [
		{classes: 'moon-sample-persistent-hotspot', components: [
			{classes: 'moon-sample-persistent-frame', spotlight: 'container', components: [
				{kind: Button, content: 'Reload', small: true, spotlight: false, classes: 'moon-sample-persistent-locale-button', ontap: 'reload'},
				{kind: Button, content: 'Back to List', small: true, spotlight: false, classes: 'moon-sample-persistent-locale-button', ontap: 'backToList'},
				{kind: ContextualPopupDecorator, components: [
					{kind: Button, content: 'Set Locale', small: true, spotlight: false, classes: 'moon-sample-persistent-locale-button'},
					{name: 'localePopup', kind: ContextualPopup, classes: 'moon-sample-locale-popup', components: [
						{content: 'Set Locale', kind: Divider},
						{name: 'localeRepeater', kind: DataRepeater, ontap: 'localeListTapped', selection: true, groupSelection: true, selectionProperty: 'selected', containerOptions: {kind: Scroller, classes: 'enyo-fill'}, fit: true, components: [
							{kind: LocaleItem, allowHtml: true, bindings: [
								{from:'model.locale', to: 'locale'},
								{from:'model.title', to: 'title'},
								{from:'model.selected', to: 'checked'}
							]}
						]}
					]}
				]}
			]}
		]},
		{name: 'home'},
		{name: 'router', kind: AppRouter, history: true, triggerOnStart: true}
	],
	bindings: [
		{from: 'locales', to: '$.localeRepeater.collection'},
		{from: 'title', to: '$.listpanel.title'}
	],
	listTools: [
		{kind: Panels, pattern: 'activity', components: [
			{kind: Panel, name: 'listpanel', headerType: 'small',
				headerComponents: [
					{kind: Button, content: 'Back', small: true, href: '../index.html', mixins: [LinkSupport]}
				],
				components: [
					{name: 'list', kind: DataList, components: [
						{kind: SampleListItem, bindings: [
							{from: 'model.badgeClasses', to: 'badgeClasses'},
							{from: 'model.label', to: 'content'},
							{from: 'model.href', to: 'href'}
						]}
					]}
				]
			}
		]}
	],
	handlers: {
		onRouteChange: 'handleRoute'
	},
	computed: {
		location: ['sample', 'locale']
	},
	create: kind.inherit(function (sup) {
		return function () {
			this.locales = new Collection(locales);
			this.samples = this.samples || this.ctor.samples;
			console.log('%cMoonstone: %s', 'color:blue', this.version);
			sup.apply(this, arguments);
		};
	}),
	createList: function () {
		var samples = this.get('samples'),
			sorted = Object.keys(samples).sort(),
			dataList = [],
			loc = this.get('locale'),
 			ext = ((!loc || loc==='local') ? '' : ('/' + loc));
		for (var i = 0; i < sorted.length; i++) {
			var sampleName = sorted[i],
				sample = samples[sampleName];
			dataList.push({
 				sample: sample,
 				name: sampleName,
 				label: sampleName.replace(/(.*)Sample$/i, '$1'),
 				badgeClasses: sample.badgeClasses,
 				href: '#' + sampleName + ext
 			});
		}
		if (!this.$.list) {
			this.$.home.createComponents(this.listTools, {owner: this});
		}
		this.render();
		if (dataList.length) {
			var c = new Collection(dataList);
			this.$.list.set('collection', c);
		}
	},
	localeListTapped: function (sender, ev) {
		var locale = ev.model.get('locale');
		if (locale) {
			this.set('locale', locale);
			this.$.router.trigger({location: this.get('location'), change: true});
		}
	},
	handleRoute: function (sender, ev) {
		this.set('locale', ev.locale);
		this.set('sample', ev.sampleName);
	},
	updateTitle: function (title) {
		document.title = (title ? title + ' - ' : '') + this.get('title');
	},
	localeChanged: function (oldLocale, newLocale) {
		console.log('Setting Locale:', newLocale);
		if (this.$.localePopup && this.$.localePopup.get('showing')) {
			this.$.localePopup.hide();
		}
		this.locales.find(function(elem) { return elem.get('locale') == newLocale; }).set('selected', true);
		i18n.updateLocale(newLocale == 'local' ? null : newLocale);
		this.createList();
	},
	sampleChanged: function (was, is) {
		if (was) {
			this.$[was].destroy();
		}

		if (this.get('sample')) {
			this.openSample();
		} else {
			// We have no sample, just render out the list.
			this.activateList();
		}
	},
	activateList: function () {
		console.log('%cList all of the Samples', 'color:green');
		this.updateTitle();

		this.disableAllStylesheets();
		if (this.$.sample) {
			this.$.sample.destroy();
		}
		this.$.home.show();
		if (!this.$.home.hasNode() || !this.$.home.hasNode().children.length) {
			// We've never been generated, lets fix that.
			this.createList();
		}
		this.render();
	},
	backToList: function () {
		if (this.get('sample')) {
			this.set('sample', null);
			this.$.router.trigger({location: this.get('location'), change: true});
			this.checkLocale();
		} else {
			window.location.href = '../index.html';
		}
	},
	reload: function () {
		window.location.reload();
	},
	chooseSample: function (sender, ev) {
		this.set('sample', ev.model.get('name'));
		this.checkLocale();
	},
	openSample: function () {
		var s = this.get('sample');

		// this.disableAllStylesheets();

		if (s) {
			// Enable the stylesheet
			// this.enableStylesheet(s);

			this.$.home.hide();
			global.sample = this.createComponent({name: s, kind: this.samples[s], _locale:this.get('locale')}).render();
			console.log('%c%s Created and Launched', 'color:green;', s);
			this.updateTitle(s);

		} else {
			this.createList();
		}
	},
	enableStylesheet: function (name) {
		var i, sheets = document.getElementsByClassName(name);
		for (i = 0; i < sheets.length; i++) {
			sheets[i].disabled = false;
		}
		return sheets.length;
	},
	disableAllStylesheets: function () {
		var sheets = document.getElementsByClassName('sample-style');
		for (var i = 0; i < sheets.length; i++) {
			sheets[i].disabled = true;
		}
	},
	createNode: function (tagName, attrs) {
		var key, node = document.createElement(tagName);
		if (attrs && Object.keys(attrs)) {
			for (key in attrs) {
				if (key.match(/^on\w/) || key == 'disabled') {
					node[key] = attrs[key];
				} else if (key == 'content') {
					node.innerHTML = attrs[key];
				} else {
					node.setAttribute(key, attrs[key]);
				}
			}
		}
		return node;
	},
	appendToHead: function (node) {
		if (typeof node == 'string') {
			document.head.insertAdjacentHTML('beforeend', node );
		} else {
			document.head.appendChild( node );
		}
	},
	checkLocale: function () {
		// Reset locale in the event one of the samples changes it
		if (Enyo_iLib && Enyo_iLib.getLocale() != this.locale) {
			this.localeChanged(Enyo_iLib.getLocale(), this.locale);
		}
	}
});

},{'../../../strawman/AppRouter':'../strawman/AppRouter','../../../strawman/LinkSupport':'../strawman/LinkSupport'}],'src/AudioPlaybackPlaylistSupportSample':[function (module,exports,global,require,request){
require('moonstone');

var
	kind = require('enyo/kind'),
	Collection = require('enyo/Collection');

var
	Drawers = require('moonstone/Drawers'),
	Panel = require('moonstone/Panel'),
	Button = require('moonstone/Button'),
	IconButton = require('moonstone/IconButton'),
	ImageItem = require('moonstone/ImageItem'),
	DataList = require('moonstone/DataList'),
	Scroller = require('moonstone/Scroller');

var
	AudioPlayback = require('moonstone/AudioPlayback'),
	PlaylistSupport = require('moonstone/PlaylistSupport');

var audioQueue = kind({
	name: 'sample.AudioQueue',
	kind: Panel,
	headerType: 'medium',
	title: 'Current Playing List',
	titleBelow: '0 Tracks',
	classes: 'sample-audio-playback-queue enyo-fit',
	components: [
		{classes: 'sample-audio-playback-queue-body', fit: true, components: [
			{classes: 'sample-audio-playback-queue-list', components: [
				{name: 'datalist', kind: DataList, scrollerOptions: { kind: Scroller, horizontal: 'hidden', spotlightPagingControls: true}, components: [
					{kind: ImageItem, ontap: 'play', bindings: [
						{from: 'model.albumArt', to: 'source'},
						{from: 'model.trackName', to: 'label'},
						{from: 'model.artistName', to: 'text'},
						{from: 'model.playing', to: 'playing'}
					], observers: [
						{method: 'playingHandler', path: ['playing']}
					],
					playingHandler: function (sender, ev) {
						this.addRemoveClass('playing', this.get('playing'));
					}}
				]}
			]},
			{kind: Scroller, horizontal: 'hidden', spotlightPagingControls: true, classes: 'sample-audio-playback-queue-detail', components: [
				{classes: 'sample-audio-playback-queue-detail-content', components: [
					{content: 'Lyrics'},
					{classes: 'moon-1v'},
					{content: 'The Time Has Come One Way What The World Will Never Take Til I See You Take All Of Me The Stand You ll Come Break Free Look To You Where The Love Lasts Forever Forever There Is Nothing Like Tell The World All Day Take It All My Future Decided All I Need Is You Mighty To Save Nothing But The Blood'}
				]}
			]}
		]}
	],
	bindings: [
		{from: 'collection', to: '$.datalist.collection'},
		{from: 'collection.length', to: 'titleBelow', transform: 'tracks'}
	],
	tracks: function (value) {
		return value + ' Tracks';
	},
	play: function (sender, event) {
		this.bubble('onPlayAudio', {model: sender.model, openPlayback: true});
	}
});

module.exports = kind({
	name: 'moon.sample.AudioPlaybackPlaylistSupportSample',
	classes: 'enyo-unselectable moon sample-audio-playback enyo-fit',
	data: [
		{src: 'http://enyojs.com/_media/thunder1.mp3', trackName: 'Thunder 1', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', albumArt: 'assets/storm-100.png', duration: '0:22'},
		{src: 'http://enyojs.com/_media/engine1.mp3', trackName: 'Engine 1', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', albumArt: 'assets/engine-100.png', duration: '0:04'},
		{src: 'http://enyojs.com/_media/thunder2.mp3', trackName: 'Thunder 2', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', albumArt: 'assets/storm-100.png', duration: '0:22'},
		{src: 'http://enyojs.com/_media/engine2.mp3', trackName: 'Engine 2', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', albumArt: 'assets/engine-100.png', duration: '0:04'},
		{src: 'http://enyojs.com/_media/thunder3.mp3', trackName: 'Thunder 3', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', albumArt: 'assets/storm-100.png', duration: '0:22'},
		{src: 'http://enyojs.com/_media/engine3.mp3', trackName: 'Engine 3', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', albumArt: 'assets/engine-100.png', duration: '0:04'},
		{src: 'http://enyojs.com/_media/thunder4.mp3', trackName: 'Thunder 4', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', albumArt: 'assets/storm-100.png', duration: '0:22'},
		{src: 'http://enyojs.com/_media/engine4.mp3', trackName: 'Engine 4', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', albumArt: 'assets/engine-100.png', duration: '0:04'}
	],
	handlers: {
		onPlayAudio: 'playAudio'
	},
	components: [
		{kind: Drawers, drawers:[
			{name: 'audioPlayback', kind: AudioPlayback, mixins: [ PlaylistSupport ], components: [
				{name: 'queue', kind: audioQueue}
			], moreComponents: [
				{name: 'btnShuffle', kind: Button, ontap: 'toggleShuffle'},
				{name: 'btnRepeat', kind: Button, ontap: 'toggleRepeat'},
				{name: 'btnOpen', kind: IconButton, icon: 'list', small: false, ontap: 'toggleOpen'}
			], playbackRateHash: {
				fastForward: ['2', '4'],
				rewind: ['-2', '-4'],
				slowForward: ['1/4', '1/2', '1'],
				slowRewind: ['-1/2', '-1']
			}}
		],
		components: [
			// Fixme: If we are not using wrapper like scroller inside of drawer,
			// drawer will not close itself when click blank area under the drawer.
			{kind: Scroller, classes: 'enyo-fit', components: [
				{classes: 'moon-2v'},
				{kind: Button, content: 'Set audio #1', ontap: 'setAudio1'},
				{kind: Button, content: 'Set audio #2', ontap: 'setAudio2'},
				{kind: Button, content: 'Set audio list', ontap: 'setAudioList'},
				{kind: Button, content: 'unload audio', ontap: 'unload'},
				{kind: Button, content: 'unload audio list', ontap: 'unloadList'}
			]}
		]}
	],
	bindings: [
		{from: '$.audioPlayback.collection', to: '$.queue.collection'},
		{from: '$.audioPlayback.repeat', to: '$.btnRepeat.content'},
		{from: '$.audioPlayback.shuffle', to: '$.btnShuffle.content', transform: 'shuffleTransform'}
	],
	create: function () {
		this.inherited(arguments);
		this.collection = new Collection(this.data);
		this.model1 = this.collection.at(0);
		this.model2 = this.collection.at(1);
	},
	playAudio: function (sender, ev) {
		this.$.audioPlayback.set('model', ev.model);
	},
	setAudio1: function () {
		this.$.audioPlayback.set('model', this.model1);
	},
	setAudio2: function () {
		this.$.audioPlayback.set('model', this.model2);
	},
	setAudioList: function () {
		this.$.audioPlayback.set('collection', this.collection);
	},
	unload: function () {
		this.$.audioPlayback.set('model', null);
	},
	unloadList: function () {
		// Note: set collection as null doesn't empty list
		this.$.audioPlayback.set('collection', new Collection());
	},
	toggleShuffle: function () {
		this.$.audioPlayback.toggleShuffle(true);
	},
	toggleRepeat: function () {
		this.$.audioPlayback.toggleRepeat();
	},
	toggleOpen: function () {
		this.$.audioPlayback.set('open', !this.$.audioPlayback.get('open'));
	},
	shuffleTransform: function (shuffle) {
		return shuffle ? 'shuffle' : 'normal';
	}
});

module.exports.badgeClasses = 'new wip';

}],'src/HighlightTextSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	$L = require('enyo/i18n').$L;

var
	FittableColumns = require('layout/FittableColumns');

var
	Collection = require('enyo/Collection'),
	ProgressiveFilter = require('enyo/ProgressiveFilter'),
	Button = require('moonstone/Button'),
	DataList = require('moonstone/DataList'),
	Divider = require('moonstone/Divider'),
	HighlightText = require('moonstone/HighlightText'),
	InputHeader = require('moonstone/InputHeader'),
	Item = require('moonstone/Item'),
	Marquee = require('moonstone/Marquee'),
	MarqueeItem	= Marquee.Item,
	MarqueeSupport = Marquee.Support,
	Panel = require('moonstone/Panel'),
	Scroller = require('moonstone/Scroller');

// FIXME. RE-IMPLEMENT FILTERING.
// Removed the old Enyo 2.3.0 implementation of collection filters from this sample that was removed
// before 2.4.0 went final. We'll restore filtering to this sample once we have the new filter
// implementation as part of post-2.4.0 work.
module.exports = kind({
	name: 'moon.sample.HighlightTextSample',
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: FittableColumns, classes: 'enyo-fit', style: 'padding: 0', components: [
			{kind: Panel, title: 'STATIC', titleBelow: 'Simple items', subTitleBelow: 'Case insensitive', classes: 'moon-6h', components: [
				{kind: Scroller, fit: true, components: [
					{kind: Divider, content: 'Standard highlight'},
					{kind: Item, components: [
						{kind: HighlightText, content: 'Very long text to see highlight with marquee', highlight: 'text', mixins: [MarqueeItem]}
					]},
					{kind: Item, components: [
						{kind: HighlightText, content: 'Text to highlight', highlight: 'to'}
					]},
					{kind: Item, components: [
						{kind: HighlightText, content: 'Text to highlight', highlight: 'highlight'}
					]},
					{kind: Divider, content: 'Custom highlight classes'},
					{kind: Item, components: [
						{kind: HighlightText, content: 'Text to highlight', highlight: 'text', highlightClasses: 'highlight-text-sample-red'}
					]},
					{kind: Item, components: [
						{kind: HighlightText, content: 'Text to highlight', highlight: 'to', highlightClasses: 'highlight-text-sample-blue'}
					]},
					{kind: Item, components: [
						{kind: HighlightText, content: 'Text to highlight', highlight: 'highlight', highlightClasses: 'highlight-text-sample-fancy'}
					]},
					{kind: Divider, content: 'Custom control with marquee'},
					{tag: 'div', style: 'border: 2px dotted grey; margin: 5px 10px;', marqueeOnSpotlight: false, marqueeOnRender: true, mixins: [MarqueeSupport], components: [
						{name: 'dynamic', kind: HighlightText, highlight: 'text', mixins: [MarqueeItem], content:$L('Very long text to see highlight with marquee but not using item')}
					]},
					{kind: Button, content: 'Dynamic Content Change', ontap: 'changeContent'}
				]}
			]},
			{name: 'inputPanel', kind: Panel, headerOptions: {kind: InputHeader}, fit: true, oninput: 'search', components: [
				{kind: DataList, fit: true, name: 'list', components: [
					{kind: Item, bindings: [
						{from: '.model.text', to: '.$.text.content'},
						{from: '.controller.text', to: '.$.text.highlight'}
					], components: [
						{kind: HighlightText, name: 'text'}
					]}
				]}
			], title: 'SEARCH', titleBelow: 'Highlighted text in DataList', subTitleBelow: 'Case sensitive'}
		]}
	],
	bindings: [
		{from: '.filteredController', to: '.$.list.collection'},
		{from: '.$.inputPanel.$.header.value', to: '.controller.text'}
	],
	create: function () {
		this.controller = new Collection(this.data);
		this.filteredController = new ProgressiveFilter({
			collection: this.controller,
			method: function (model) {
				return model.get('text').indexOf(this.text) >= 0;
			}
		});
		this.inherited(arguments);
	},
	search: function (sender, ev) {
		this.filteredController.reset();
		this.filteredController.text = ev.originator.getValue();
		this.filteredController.filter();

		sender.waterfall('onHighlight', {highlight: ev.originator.getValue()});
	},
	changeContent: function () {
		this.$.dynamic.setContent('Dynamic content change test, this text should be highlighted.');
	},
	data: [
		{ text: 'proident irure nostrud', isFolder: false },
		{ text: 'adipisicing veniam officia',isFolder: true },
		{ text: 'culpa adipisicing Lorem', isFolder: false },
		{ text: 'dolor ut excepteur', isFolder: false },
		{ text: 'elit veniam nulla', isFolder: true },
		{ text: 'irure laboris irure', isFolder: false },
		{ text: 'non do consectetur', isFolder: false },
		{ text: 'irure dolor laborum', isFolder: true },
		{ text: 'nulla aliqua laborum', isFolder: false },
		{ text: 'elit ad sit', isFolder: false },
		{ text: 'aliqua voluptate nulla', isFolder: false },
		{ text: 'non eiusmod nostrud', isFolder: true },
		{ text: 'elit est ullamco', isFolder: true },
		{ text: 'magna tempor minim', isFolder: true },
		{ text: 'excepteur Lorem id', isFolder: true },
		{ text: 'quis eiusmod aute', isFolder: false },
		{ text: 'proident cillum elit', isFolder: false },
		{ text: 'commodo dolor dolor', isFolder: false },
		{ text: 'amet laborum officia', isFolder: false },
		{ text: 'aute do enim', isFolder: false },
		{ text: 'ut proident elit', isFolder: false },
		{ text: 'ea reprehenderit velit', isFolder: false },
		{ text: 'ipsum aliqua deserunt', isFolder: true },
		{ text: 'ea minim incididunt', isFolder: false },
		{ text: 'reprehenderit amet dolore', isFolder: false },
		{ text: 'velit sunt enim', isFolder: false },
		{ text: 'sunt amet esse', isFolder: false },
		{ text: 'irure laboris voluptate', isFolder: false },
		{ text: 'sit est dolore', isFolder: false },
		{ text: 'eu sit sint', isFolder: true },
		{ text: 'voluptate in ad', isFolder: false },
		{ text: 'dolore ullamco in', isFolder: true },
		{ text: 'incididunt mollit reprehenderit', isFolder: true },
		{ text: 'cupidatat eiusmod deserunt', isFolder: false },
		{ text: 'minim labore veniam', isFolder: false },
		{ text: 'commodo reprehenderit irure', isFolder: false },
		{ text: 'voluptate eiusmod labore', isFolder: true },
		{ text: 'irure sint ullamco', isFolder: true },
		{ text: 'qui cillum fugiat', isFolder: true },
		{ text: 'ex ut do', isFolder: false },
		{ text: 'Lorem Lorem amet', isFolder: true },
		{ text: 'elit commodo consectetur', isFolder: false },
		{ text: 'sit enim nisi', isFolder: false },
		{ text: 'ipsum fugiat voluptate', isFolder: true },
		{ text: 'nisi commodo labore', isFolder: false },
		{ text: 'dolor cillum elit', isFolder: true },
		{ text: 'nisi do exercitation', isFolder: true },
		{ text: 'adipisicing mollit sint', isFolder: true },
		{ text: 'ipsum exercitation ex', isFolder: true },
		{ text: 'duis voluptate do', isFolder: false },
		{ text: 'in do tempor', isFolder: true },
		{ text: 'amet id anim', isFolder: true },
		{ text: 'culpa voluptate sunt', isFolder: true },
		{ text: 'amet do do', isFolder: true },
		{ text: 'sunt fugiat consectetur', isFolder: false },
		{ text: 'in sit consequat', isFolder: true },
		{ text: 'voluptate dolore deserunt', isFolder: true },
		{ text: 'elit sit duis', isFolder: false },
		{ text: 'consectetur laboris in', isFolder: false },
		{ text: 'ipsum aliquip quis', isFolder: true },
		{ text: 'consectetur non ad', isFolder: true },
		{ text: 'id voluptate et', isFolder: false },
		{ text: 'ullamco labore ullamco', isFolder: true },
		{ text: 'ipsum pariatur enim', isFolder: false },
		{ text: 'ea excepteur magna', isFolder: false },
		{ text: 'ullamco enim tempor', isFolder: false },
		{ text: 'ex ex mollit', isFolder: false },
		{ text: 'sunt aliqua cillum', isFolder: true },
		{ text: 'nostrud incididunt commodo', isFolder: false },
		{ text: 'officia quis ut', isFolder: false },
		{ text: 'officia ipsum ipsum', isFolder: false },
		{ text: 'non qui amet', isFolder: true },
		{ text: 'duis quis pariatur', isFolder: false },
		{ text: 'enim dolor incididunt', isFolder: true },
		{ text: 'laboris Lorem anim', isFolder: false },
		{ text: 'pariatur eiusmod non', isFolder: true },
		{ text: 'anim commodo pariatur', isFolder: true },
		{ text: 'veniam anim tempor', isFolder: false },
		{ text: 'quis minim ex', isFolder: false },
		{ text: 'eu aliquip adipisicing', isFolder: false },
		{ text: 'labore est eiusmod', isFolder: true },
		{ text: 'Lorem et eiusmod', isFolder: false },
		{ text: 'voluptate est voluptate', isFolder: false },
		{ text: 'et mollit pariatur', isFolder: true },
		{ text: 'voluptate sunt tempor', isFolder: false },
		{ text: 'enim culpa ad', isFolder: true },
		{ text: 'non duis in', isFolder: true },
		{ text: 'consectetur mollit deserunt', isFolder: true },
		{ text: 'eiusmod laborum eu', isFolder: true },
		{ text: 'nisi nulla consequat', isFolder: false },
		{ text: 'voluptate qui amet', isFolder: false },
		{ text: 'laborum cupidatat in', isFolder: false },
		{ text: 'incididunt dolor dolore', isFolder: false },
		{ text: 'irure sint sunt', isFolder: true },
		{ text: 'elit duis sit', isFolder: false },
		{ text: 'cillum quis commodo', isFolder: true },
		{ text: 'ut elit aliqua', isFolder: false },
		{ text: 'amet ipsum in', isFolder: true },
		{ text: 'minim et pariatur', isFolder: false },
		{ text: 'ea officia nisi', isFolder: false }
	]
});

}],'src/ListActionsSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	Collection = require('enyo/Collection'),
	DataRepeater = require('enyo/DataRepeater'),
	Group = require('enyo/Group');

var
	BodyText = require('moonstone/BodyText'),
	Button = require('moonstone/Button'),
	CheckboxItem = require('moonstone/CheckboxItem'),
	DataList = require('moonstone/DataList'),
	Divider = require('moonstone/Divider'),
	ListActions = require('moonstone/ListActions'),
	Panel = require('moonstone/Panel'),
	Panels = require('moonstone/Panels'),
	Scroller = require('moonstone/Scroller'),
	SelectableItem = require('moonstone/SelectableItem'),
	ToggleButton = require('moonstone/ToggleButton'),
	ToggleItem = require('moonstone/ToggleItem'),
	Tooltip = require('moonstone/Tooltip'),
	TooltipDecorator = require('moonstone/TooltipDecorator');

module.exports = kind({
	name: 'moon.sample.ListActionsSample',
	kind: Panels,
	pattern: 'activity',
	classes: 'moon enyo-unselectable enyo-fit',
	handlers: {
		onActivate: 'activateHandler'
	},
	components: [
		{kind: Panel, headerType: 'medium', title: 'List Actions Sample', headerComponents: [
			{kind: TooltipDecorator, components: [
				{kind: Tooltip, position: 'above', content: 'Test Dynamic Lists'},

				//* List actions with default width
				{name: 'disabledListAction', kind: ListActions, disabled: true, icon: 'drawer', listActions: [
					{action: 'category3', components: [
						{kind: Divider, content: 'Category 3 (DataList)'},
						{kind: DataList, renderDelay: null, name: 'list', components: [
							{kind: CheckboxItem, bindings: [
								{from: 'model.name', to: 'content'},
								{from: 'model.checked', to: 'checked'}
							]}
						]}
					]},
					{action: 'category2', components: [
						{kind: Divider, content: 'Category 2 (DataRepeater)'},
						{kind: DataRepeater, containerOptions:{kind: Scroller, classes: 'enyo-fill'}, name: 'repeater', components: [
							{kind: ToggleItem, bindings: [{from: 'model.name', to: 'content'}]}
						]}
					]},
					{action: 'category1', components: [
						{kind: Divider, content: 'Category 1 (Static)'},
						{kind: Scroller, components: [
							{kind: Group, name: 'group', highlander: true, defaultKind: SelectableItem, components: [
								{content: 'Just Released'},
								{content: 'Recommended'},
								{content: 'Top Rated'}
							]}
						]}
					]}
				]}
			]},
			{kind: ListActions, icon: 'denselist', listActions: [
				{action: 'Cost', components: [
					{kind: Divider, content: 'Cost'},
					{kind: Scroller, defaultKind: ToggleItem, components: [
						{content: '$'},
						{content: '$$'},
						{content: '$$$'}
					]}
				]},
				{action: 'Flavor', components: [
					{kind: Divider, content: 'Flavor'},
					{kind: Scroller, defaultKind: CheckboxItem, components: [
						{content: 'Spicy'},
						{content: 'Sweet'},
						{content: 'Sour'},
						{content: 'Salty', checked: true},
						{content: 'Savory'},
						{content: 'Bland'},
						{content: 'Umami'},
						{content: 'Bitter'}
					]}
				]}
			]},
			{kind: TooltipDecorator, components: [
				{kind: Tooltip, position: 'above', content: 'Test Auto Collapse'},

				//* List actions with auto-collapsing
				{kind: ListActions, autoCollapse: true, iconSrc: 'assets/icon-list.png', listActions: [
					{action: 'AutoCollapseTest', components: [
						{kind: Divider, content: 'Try Auto-collapse'},
						{kind: Scroller, components: [
							{kind: Group, highlander: true, defaultKind: CheckboxItem, components: [
								{content: 'Select'},
								{content: 'One'},
								{content: 'To'},
								{content: 'Auto'},
								{content: 'Collapse'},
								{content: 'This'},
								{content: 'List'},
								{content: 'Actions'},
								{content: 'Menu'}
							]}
						]}
					]}
				]}
			]}
		], components: [
			{components: [
				{kind: Divider, content: 'Add Option to:'},
				{kind: Button, small:true, content: 'Category 1', ontap: 'addToStatic'},
				{kind: Button, small:true, content: 'Category 2', ontap: 'addToRepeater'},
				{kind: Button, small:true, content: 'Category 3', ontap: 'addToList'},
				{classes: 'moon-2v'},
				{kind: Divider, content: 'ListActions Modifications'},
				{kind: Button, small:true, content: 'Breadcrumb Panel', ontap: 'toggleBreadcrumb'},
				{kind: ToggleButton, small: true, toggleOnLabel: 'Header Type: Small', toggleOffLabel: 'Header Type: Medium', ontap: 'toggleHeaderSize'},
				{name: 'toggleDisabledListActions', kind: ToggleButton, small: true, toggleOnLabel: 'ListActions: Disabled', toggleOffLabel: 'ListActions: Enabled', value: true}
			]},
			{fit: true},
			{kind: Divider, content: 'List Action Event'},
			{kind: BodyText, name: 'console', content: 'Event'}
		]},
		{kind: Panel, title: 'Header', components: [
			{kind: Button, small:true, content: 'Go Back', ontap: 'toggleBreadcrumb'}
		]}
	],
	bindings: [
		{from: '$.toggleDisabledListActions.value', to: '$.disabledListAction.disabled'}
	],
	activateHandler: function (sender, ev) {
		if (ev && ev.action) {
			if (ev.originator instanceof SelectableItem) {
				this.$.console.setContent(
					ev.action + ': ' +
					ev.originator.getContent() + ' was ' +
					(ev.originator.getSelected() ? 'selected' : 'unselected')
				);
			} else {	// moon.CheckboxItem or moon.ToggleItem
				this.$.console.setContent(
					ev.action + ': ' +
					ev.toggledControl.getContent() + ' was ' +
					(ev.originator.getChecked() ? 'selected' : 'unselected')
				);
			}
		}

		// Log the active state of the ListAction drawer
		if (ev.originator instanceof ListActions) {
			this.$.console.setContent(ev.originator.name + ' is now ' + (ev.originator.getOpen() ? 'open' : 'closed'));
		}
	},
	addToStatic: function () {
		this.optionNumber = (this.optionNumber || 0) + 1;
		this.$.group.createComponent({content: 'Option ' + this.optionNumber}).render();
	},
	addToList: function () {
		this.optionNumber = (this.optionNumber || 0) + 1;
		this.$.list.collection.add({name: 'Option ' + this.optionNumber});
	},
	addToRepeater: function () {
		this.optionNumber = (this.optionNumber || 0) + 1;
		this.$.repeater.collection.add({name: 'Option ' + this.optionNumber});
	},
	toggleBreadcrumb: function () {
		this.setIndex(this.getIndex() > 0 ? 0 : 1);
	},
	toggleHeaderSize: function () {
		this.getActive().setHeaderType(this.getActive().getHeaderType() == 'small' ? 'medium': 'small');
	},
	create: function () {
		Panels.prototype.create.apply(this, arguments);
		this.$.list.set('collection', new Collection([
			{name: 'SAT 1', checked: true},
			{name: 'SAT 2'},
			{name: 'SAT 3'},
			{name: 'OTHER S1'},
			{name: 'OTHER S2'}
		]));
		this.$.repeater.set('collection', new Collection([
			{name: 'Comedy'},
			{name: 'Action'},
			{name: 'Drama'},
			{name: 'Family'},
			{name: 'Fantasy'},
			{name: 'Science Fiction'}
		]));
	}
});

module.exports.badgeClasses = 'new';

}],'src/SimpleIntegerPickerSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	dom = require('enyo/dom');

var
	FittableRows = require('layout/FittableRows'),
	Control = require('enyo/Control'),
	BodyText = require('moonstone/BodyText'),
	Divider = require('moonstone/Divider'),
	FormCheckbox = require('moonstone/FormCheckbox'),
	Scroller = require('moonstone/Scroller'),
	SimpleIntegerPicker = require('moonstone/SimpleIntegerPicker'),
	ToggleButton = require('moonstone/ToggleButton');

module.exports = kind({
	name: 'moon.sample.SimpleIntegerPickerSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit',
	components:[
		{kind: Scroller, fit: true, components: [
			{kind: Divider, content: 'Simple Integer Picker'},
			{kind: SimpleIntegerPicker, name: 'picker1', value:3, min:-10, max:10, step: 1, unit: 'sec', onChange: 'change'},

			{kind: Divider, content: 'Options'},
			{kind: FormCheckbox, content: 'Animate', checked: true, prop: 'animate', onchange: 'checked'},
			{kind: FormCheckbox, content: 'Wrap', prop: 'wrap', onchange: 'checked'},
			{kind: FormCheckbox, content: 'Padding (3 digits)', onchange: 'paddingChecked'},
			{kind: FormCheckbox, content: 'Labeled (sec)', checked: true, onchange: 'labelChecked'},
			{kind: FormCheckbox, content: 'Disabled', prop: 'disabled', onchange: 'checked'}
		]},
		{kind: ToggleButton, content: 'Toggle RTL', ontap: 'buttonTapped'},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'result', content: 'No action yet.'}
	],
	change: function (sender, ev) {
		this.$.result.setContent(sender.name + ' changed to ' + ev.content + ' (' + ev.value + ')');
	},
	buttonTapped: function (sender, ev) {
		if (sender.getActive()) {
			Control.prototype.rtl = true;
			dom.addBodyClass('enyo-locale-right-to-left');
		} else {
			Control.prototype.rtl = false;
			dom.removeClass(document.body, 'enyo-locale-right-to-left');
		}
	},
	checked: function (sender, ev) {
		this.$.picker1.set(sender.prop, sender.checked);
	},
	paddingChecked: function (sender, ev) {
		this.$.picker1.set('digits', sender.checked? 3 : null);
		this.$.picker1.render();
	},
	labelChecked: function (sender, ev) {
		this.$.picker1.set('unit', sender.checked? 'sec' : null);
		this.$.picker1.render();
	}
});
}],'src/AccordionSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Scroller = require('moonstone/Scroller'),
	Divider = require('moonstone/Divider'),
	Accordion = require('moonstone/Accordion'),
	SelectableItem = require('moonstone/SelectableItem'),
	Group = require('enyo/Group');

module.exports = kind({
	name: 'moon.sample.AccordionSample',
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Scroller, classes: 'enyo-fill moon-8h', components: [
			{kind: Divider, content: 'Not In Group'},
			{components: [
				{kind: Accordion, content: 'This is an accordion', components: [
					{content: 'Item One'},
					{content: 'Item Two'}
				]},
				{kind: Accordion, content: 'Pre-expanded accordion', open:true, components: [
					{content: 'Item Three'},
					{content: 'Item Four'}
				]},
				{kind: Accordion, content: 'This is an lonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnng title accordion', components: [
					{content: 'Looooooooooooooooooooooooooooooooooooong Item One'},
					{content: 'Loooooooooooooooooooooooooooooong Item Two'}
				]},
				{kind: Accordion, content: 'Disabled accordion', disabled: true, components: [
					{content: 'Item One'},
					{content: 'Item Two'}
				]}
			]},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'In Group'},
			{kind: Group, highlander:true, components: [
				{kind: Accordion, content: 'This is a grouped accordion', components: [
					{content: 'Item One'},
					{content: 'Item Two'}
				]},
				{kind: Accordion, open:true, content: 'This is another grouped accordion', components: [
					{content: 'Item Three'},
					{content: 'Item Four'}
				]},
				{kind: Accordion, content: 'This is another grouped accordion', components: [
					{content: 'Item Five'},
					{content: 'Item Six'}
				]},
				{kind: Accordion, content: 'This is another lonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnng title accordion', components: [
					{content: 'Looooooooooooooooooooooooooooooooooooong Item Three'},
					{content: 'Loooooooooooooooooooooooooooooong Item Four'}
				]}
			]},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'In Group using Grouped Selectable Items'},
			{kind: Group, groupName: 'menuItems', components: [
				{kind: Group, groupName: 'accordions', highlander:true, components: [
					{kind: Accordion, groupName: 'accordions', content: 'This is a grouped accordion', defaultKind: SelectableItem, components: [
						{content: 'Item One', groupName: 'menuItems'},
						{content: 'Item Two', groupName: 'menuItems'}
					]},
					{kind: Accordion, groupName: 'accordions', open:true, content: 'This is another grouped accordion', defaultKind: SelectableItem, components: [
						{content: 'Item Three', groupName: 'menuItems'},
						{content: 'Item Four', groupName: 'menuItems'}
					]},
					{kind: Accordion, groupName: 'accordions', content: 'This is another grouped accordion', defaultKind: SelectableItem, components: [
						{content: 'Item Five', groupName: 'menuItems'},
						{content: 'Item Six', groupName: 'menuItems'}
					]},
					{kind: Accordion, groupName: 'accordions', content: 'This is another lonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnng title accordion', defaultKind: SelectableItem, components: [
						{content: 'Looooooooooooooooooooooooooooooooooooong Item Three', groupName: 'menuItems'},
						{content: 'Loooooooooooooooooooooooooooooong Item Four', groupName: 'menuItems'}
					]}
				]}
			]}
		]}
	]
});
}],'src/ClockSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	i18n = require('enyo/i18n'),
	updateLocale = i18n.updateLocale,
	$L = i18n.$L;

var
	FittableRows = require('layout/FittableRows');

var
	ilib = require('enyo-ilib');

var
	Button = require('moonstone/Button'),
	Clock = require('moonstone/Clock'),
	ExpandablePicker = require('moonstone/ExpandablePicker'),
	Input = require('moonstone/Input'),
	InputDecorator = require('moonstone/InputDecorator'),
	Scroller = require('moonstone/Scroller');

module.exports = kind({
	name: 'moon.sample.ClockSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Clock, name: 'clock'},
		{classes: 'moon-1v'},
		{classes: 'moon-hspacing', components: [
			{kind: InputDecorator, components: [
				{kind: Input, name: 'input', value: 'Jan 01 2013 11:22:59'}
			]},
			{kind: Button, small:true, content: 'Set Time', ontap: 'setTime'},
			{kind: Button, small:true, content: 'Set Static Time', ontap: 'setStaticTime'},
			{kind: Button, small:true, content: 'Reset to Current', ontap: 'resetTime'}
		]},
		{classes: 'moon-1v'},
		{kind: Scroller, fit: true, components: [
			{classes: 'moon-5h', components: [
				{name: 'localePicker', kind: ExpandablePicker, noneText: $L('No Locale Selected'), content: 'Choose Locale', onChange: 'setLocale', components: [
					{content: 'Use Default Locale', active: true},
					{content: 'en-US'},
					{content: 'ko-KR'},
					{content: 'zh-TW'},
					{content: 'fa-IR'},
					{content: 'th-TH'},	//Thailand
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
					{content: 'es-US'}
				]}
			]}
		]}
	],
	create: function () {
		this.inherited(arguments);
		if (!ilib) {
			this.$.localePicker.hide();
			this.log('iLib not present -- hiding locale picker');
		}
	},
	setLocale: function (sender, ev){
		var locale = ev.selected.content;
		locale = locale == 'Use Default Locale' ? null : locale;
		updateLocale(locale);
		return true;
	},
	setTime: function () {
		this.$.clock.setDate(new Date(this.$.input.getValue()));
	},
	setStaticTime: function () {
		var d = this.$.input.getValue() ? new Date(this.$.input.getValue()) : new Date();
		// We increment the JS month value so that it is 1-based
		this.$.clock.setDate({year: d.getFullYear(), month: d.getMonth()+1, day: d.getDate(), hour: d.getHours(), min: d.getMinutes(), sec: d.getSeconds()});
	},
	resetTime: function () {
		this.$.clock.setDate(null);
	}
});
}],'src/DrawerSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Button = require('moonstone/Button'),
	Drawers = require('moonstone/Drawers'),
	ExpandablePicker = require('moonstone/ExpandablePicker'),
	Item = require('moonstone/Item'),
	Panel = require('moonstone/Panel'),
	Panels = require('moonstone/Panels'),
	Scroller = require('moonstone/Scroller');

module.exports = kind({
	name: 'moons.sample.DrawerSample',
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{
			name: 'drawers',
			kind: Drawers,
			drawers: [
				{
					name: 'partialDrawer',
					classes: 'sample-drawers-partial',
					open: false,
					controlsOpen: false,
					onActivate: 'partialDrawerChanged',
					onDeactivate: 'partialDrawerChanged',
					handle: {name: 'handleButton', content: 'Partial drawer with long text truncation'},
					components: [
						{name: 'partialPanel', kind: Panel, classes: 'enyo-fit', renderOnShow: true, showing: false, title: 'Partial Drawer', components: [
							{kind: Item, content: 'Item One'},
							{kind: Item, content: 'Item Two'}
						]}
					],
					controlDrawerComponents: [
						{name: 'partialControls', renderOnShow: true, showing: false, classes: 'moon-hspacing', components: [
							{kind: Button, name: 'openMoreButton', content: 'Open More', ontap: 'openMainDrawer'},
							{kind: Button, content: 'Close', ontap: 'close'}
						]}
					]
				},
				{
					name: 'searchDrawer',
					handle: {content: 'Full drawer'},
					components: [
						{kind: Panel, classes: 'enyo-fit', title: 'Full Drawer', components: [
							{kind: Item, content: 'Item One'},
							{kind: Item, content: 'Item Two'}
						]}
					]
				}
			],
			components: [
				{
					name: 'panels',
					kind: Panels,
					pattern: 'activity',
					components: [
						{title: 'First Panel', components: [
							{kind: Scroller, horizontal: 'hidden', classes: 'enyo-fill', components: [
								{kind: ExpandablePicker, onChange: 'pickerChangedImg', content: 'Select Image', components: [
									{content: 'Music',value: 'assets/drawer_icon.png'},
									{content: 'LG', value: 'assets/lg.png'},
									{content: 'HTML5', value: 'assets/html5.png'},
									{content: 'CSS3', value: 'assets/css3.png'},
									{content: 'Default', value: '', active: true}
								]},
								{kind: ExpandablePicker, onChange: 'pickerChangedIcon', content: 'Select Icon', components: [
									{content: 'Drawer', value: 'drawer'},
									{content: 'FullScreen', value: 'fullscreen'},
									{content: 'Circle', value: 'circle'},
									{content: 'Stop', value: 'stop'},
									{content: 'Play', value: 'play'},
									{content: 'Pause', value: 'pause'},
									{content: 'Forward', value: 'forward'},
									{content: 'Default', value: '', active: true}
								]},
								{kind: Item, content: 'Item One', ontap: 'next'},
								{kind: Item, content: 'Item Two', ontap: 'next'}
							]}
						]},
						{title: 'Second Panel', components: [
							{kind: Item, content: 'Item One', ontap: 'next'},
							{kind: Item, content: 'Item Two', ontap: 'next'},
							{kind: Item, content: 'Item Three', ontap: 'next'},
							{kind: Item, content: 'Item Four', ontap: 'next'},
							{kind: Item, content: 'Item Five', ontap: 'next'}
						]},
						{title: 'Third Panel', components: [
							{kind: Item, content: 'Item One', ontap: 'next'},
							{kind: Item, content: 'Item Two', ontap: 'next'},
							{kind: Item, content: 'Item Three', ontap: 'next'},
							{kind: Item, content: 'Item Four', ontap: 'next'},
							{kind: Item, content: 'Item Five', ontap: 'next'}
						]},
						{title: 'Fourth Panel', components: [
							{kind: Item, content: 'Item One', ontap: 'next'},
							{kind: Item, content: 'Item Two', ontap: 'next'},
							{kind: Item, content: 'Item Three', ontap: 'next'},
							{kind: Item, content: 'Item Four', ontap: 'next'},
							{kind: Item, content: 'Item Five', ontap: 'next'}
						]},
						{title: 'Fifth Panel', components: [
							{kind: Item, content: 'Item One', ontap: 'next'},
							{kind: Item, content: 'Item Two', ontap: 'next'},
							{kind: Item, content: 'Item Three', ontap: 'next'},
							{kind: Item, content: 'Item Four', ontap: 'next'},
							{kind: Item, content: 'Item Five', ontap: 'next'}
						]}
					]
				}
			]
		}
	],
	next: function (sender, ev) {
		this.$.panels.next();
		return true;
	},
	openMainDrawer: function () {
		this.$.partialDrawer.set('open', true);
	},
	close: function () {
		if (this.$.partialDrawer.get('open')) {
			this.$.partialDrawer.set('open', false);
		} else {
			this.$.partialDrawer.set('controlsOpen', false);
		}
	},
	partialDrawerChanged: function () {
		var open = this.$.partialDrawer.get('open'),
			controlsOpen = this.$.partialDrawer.get('controlsOpen');

		// This sample defers the rendering of partial drawer components to illustrate that feature.
		// Explicitly show drawer controls to render it the first time. For the drawers to function
		// correctly, the height of the control drawer has to be set via CSS. In this sample, that
		// has been done via the moon-partial-drawer-client class. The height of the drawer content
		// need not be explicitly set as it will fill the remaining space.
		if (open || controlsOpen) this.$.partialControls.show();
		if (open) this.$.partialPanel.show();

		this.$.openMoreButton.set('showing', !open);
	},
	pickerChangedImg:function (sender, ev) {
		this.$.drawers.set('src', ev.selected.value);
	},
	pickerChangedIcon:function (sender, ev) {
		this.$.drawers.set('icon', ev.selected.value);
	}
});
}],'src/NewDataListSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableColumns = require('layout/FittableColumns');

var
	GridListImageItem = require('moonstone/GridListImageItem'),
	Button = require('moonstone/Button'),
	ExpandablePicker = require('moonstone/ExpandablePicker'),
	NewDataList = require('moonstone/NewDataList'),
	Overlay = require('moonstone/Overlay'),
	Panel = require('moonstone/Panel'),
	Scroller = require('moonstone/Scroller'),
	Collection = require('enyo/Collection'),
	Control = require('enyo/Control'),
	Img = require('enyo/Image');

var ImageItem = kind({
	kind: GridListImageItem,
	subCaption: 'Sub Caption',
	mixins: [Overlay.Selection],
	bindings: [
		{from: 'model.text', to: 'caption'},
		{from: 'model.subText', to: 'subCaption'},
		{from: 'model.url', to: 'source'}
	]
});

var NoImageItem = kind({
	kind: ImageItem,
	bindings: [
		{from: 'model.bgColor', to: 'bgColor'}
	],
	componentOverrides: {
		image: {kind: Control, mixins: [Overlay.Support, Overlay.Selection]}
	},
	imageSizingChanged: function () {},
	bgColorChanged: function () {
		this.$.image.applyStyle('background', this.bgColor);
	}
});

var
	buttonComponents = [
		{
			kind: Control,
			style: 'position: absolute;',
			bindings: [
				{from: 'model.text', to: '$.button.content'}
			],
			components: [
				{
					kind: Button,
					name: 'button',
					style: 'position: relative; height: 100%; width: 100%;',
					selectedClass: 'active'
				}
			]
		}
	],
	imageComponents = [
		{kind: ImageItem, style: 'position: absolute;'}
	],
	noImageComponents = [
		{kind: NoImageItem, style: 'position: absolute;'}
	],
	plainImageComponents = [
		{kind: Control, mixins: [Overlay.Support, Overlay.Selection], components: [
			{name: 'img', kind: Img, style: 'height: 100%; width: 100%;'}
		],bindings: [
			{from: 'model.url', to: '$.img.src'}
		]}
	];

function selectedValue (selected) {
	return selected && selected.value;
}

module.exports = kind({
	name: 'moon.sample.NewDataListSample',
	kind: FittableColumns,
	classes: 'moon enyo-fit enyo-unselectable',
	style: 'padding: 0', // offsetting margin added by .moon
	components: [
		{
			kind: Panel,
			classes:'moon-6h',
			title:'Menu',
			components: [
				{
					kind: Scroller,
					components: [
						{
							name: 'itemPicker',
							kind: ExpandablePicker,
							content: 'Items',
							components: [
								{content: 'Image Items', value: imageComponents, active: true},
								{content: 'No-Image Items', value: noImageComponents},
								{content: 'Plain Images', value: plainImageComponents},
								{content: 'Buttons', value: buttonComponents}
							]
						},
						{
							name: 'directionPicker',
							kind: ExpandablePicker,
							content: 'Direction',
							components: [
								{content: 'Vertical', value: 'vertical', active: true},
								{content: 'Horizontal', value: 'horizontal'}
							]
						},
						{
							name: 'dataTypePicker',
							kind: ExpandablePicker,
							content: 'Data',
							components: [
								{content: 'Collections/Models', value: 'EnyoData', active: true},
								{content: 'JS Arrays/Objects', value: 'JS'}
							]
						},
						{
							name: 'selectionPicker',
							kind: ExpandablePicker,
							content: 'Selection',
							components: [
								{content: 'On', value: true},
								{content: 'Off', value: false, active: true}
							]
						},
						{
							name: 'selectionTypePicker',
							kind: ExpandablePicker,
							content: 'Selection Type',
							components: [
								{content: 'Single', value: 'single', active: true},
								{content: 'Multiple', value: 'multi'},
								{content: 'Group', value: 'group'}
							]
						}
					]
				}
			]
		},
		{
			kind: Panel,
			fit: true,
			title:'New Data List',
			headerComponents: [
				{kind: Button, content:'Refresh', ontap:'refreshItems'}
			],
			components: [
				{
					name: 'list',
					kind: NewDataList,
					minItemHeight: 270,
					minItemWidth: 180,
					spacing: 20,
					columns: 6,
					rows: 1,
					components: imageComponents
				}
			]
		}
	],
	bindings: [
		{from: 'collection', to: '$.list.collection'},
		{from: '$.itemPicker.selected', to: '$.list.components', transform: selectedValue},
		{from: '$.directionPicker.selected', to: '$.list.direction', transform: selectedValue},
		{from: '$.dataTypePicker.selected', to: 'dataType', transform: selectedValue},
		{from: '$.selectionPicker.selected', to: '$.list.selection', transform: selectedValue},
		{from: '$.selectionPicker.selected', to: '$.selectionTypePicker.showing', transform: selectedValue},
		{from: '$.selectionTypePicker.selected', to: '$.list.selectionType', transform: selectedValue}
	],
	create: function () {
		FittableColumns.prototype.create.apply(this, arguments);
		this.refreshItems(500);
	},
	generateRecords: function () {
		var records = [],
			idx     = this.modelIndex || 0,
			title, subTitle, color;
		for (; records.length < 500; ++idx) {
			title = (idx % 8 === 0) ? ' with long title' : '';
			subTitle = (idx % 8 === 0) ? 'Lorem ipsum dolor sit amet' : 'Subtitle';
			color = Math.floor((Math.random()*(0x1000000-0x101010))+0x101010).toString(16);

			records.push({
				selected: false,
				text: 'Item ' + idx + title,
				subText: subTitle,
				// url: 'http://placehold.it/300x300/9037ab/ffffff&text=Image'
				url: 'http://placehold.it/300x300/' + color + '/ffffff&text=Image ' + idx,
				bgColor: '#' + color
			});
		}
		// update our internal index so it will always generate unique values
		this.modelIndex = idx;
		return records;
	},
	refreshItems: function (num) {
		var data;

		num = (typeof num === 'number') ? num : 100;
		data = this.generateRecords(num);

		if (this.collection && this.collection.destroy) {
			this.collection.destroy();
		}
		this.set('collection', this.dataType === 'JS' ? data : new Collection(data));
	},
	dataTypeChanged: function (prev) {
		if (prev) {
			this.refreshItems(500);
		}
	}
});

module.exports.badgeClasses = 'new wip';

}],'src/TooltipSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	Button = require('moonstone/Button'),
	Divider = require('moonstone/Divider'),
	IconButton = require('moonstone/IconButton'),
	ExpandablePicker = require('moonstone/ExpandablePicker'),
	Input = require('moonstone/Input'),
	InputDecorator = require('moonstone/InputDecorator'),
	Tooltip = require('moonstone/Tooltip'),
	TooltipDecorator = require('moonstone/TooltipDecorator');

module.exports = kind({
	name: 'moon.sample.TooltipSample',
	classes: 'moon enyo-unselectable moon-tooltip-sample',
	components: [
		{name: 'dragContainer', kind: TooltipDecorator, classes: 'draggable',
			ondragstart: 'dragstart', ondrag: 'drag', ondragfinish: 'dragfinish', components: [
				{name: 'dragBtn', kind: Button, content: 'Draggble Tooltip'},
				{name: 'dragTooltip', kind: Tooltip, position: 'above', components: [
					{name: 'dragTooltipText', style: 'white-space: normal'}
				]}
			]
		},
		{classes: 'column-center', components: [
			{kind: ExpandablePicker, content: 'Tooltip Position', onChange: 'changePosition', components: [
				{content: 'auto', active: true},
				{content: 'above'},
				{content: 'below'},
				{content: 'left top'},
				{content: 'left bottom'},
				{content: 'right top'},
				{content: 'right bottom'}
			]},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'Set Content'},
			{kind: InputDecorator, components: [
				{name: 'dragInput', kind: Input, value: 'Hey look, a tooltip!'}
			]},
			{classes: 'moon-1v'},
			{kind: Divider, content: 'Set Tooltip Width'},
			{kind: InputDecorator, components: [
				{name: 'widthInput', kind: Input, type: 'number', onchange: 'setWidth'}
			]}
		]},
		{kind: FittableRows, classes: 'enyo-fit',  components: [
			//Top row of buttons
			{classes: 'moon-5v', components:[
				{kind: TooltipDecorator, components: [
					{kind: Button, disabled: true, centered: true, content: 'Left Tooltip'},
					{kind: Tooltip, content: 'I\'m a left tooltip.', position: 'above'}
				]},

				{kind: TooltipDecorator, classes: 'right', components: [
					{kind: Button, content: 'Right Tooltip'},
					{name: 'toolTip', kind: Tooltip, uppercase: false, content: 'I\'m a right tooltip.'}
				]}
			]},
			//Second row of buttons
			{classes: 'moon-5v', components:[
				{kind: TooltipDecorator, components: [
					{kind: Button, small: true, content: 'Multiline Left Tooltip'},
					{kind: Tooltip, components: [
						{content: 'I\'m a left tooltip.'},
						{content: 'With a second line of content'}
					]}
				]},

				{kind: TooltipDecorator, classes: 'right', components: [
					{kind: Button, small: true, content: 'Multiline Right'},
					{kind: Tooltip, position: 'above', components: [
						{content: 'I\'m a right tooltip that is rather long and forces a line break.', style: 'width: 300px; white-space: normal'}
					]}
				]}
			]},
			//Third row of buttons
			{classes: 'moon-5v', components:[
				{kind: TooltipDecorator, components: [
					{kind: Button, small: true, content: 'Item with Left Floating Tooltip'},
					{kind: Tooltip, floating: true, content: 'I\'m a left floating tooltip.'}
				]},

				{kind: TooltipDecorator, classes: 'right', components: [
					{kind: Button, disabled: true, small: true, content: 'Item with Right Floating Tooltip'},
					{name: 'toolTipFloating', floating: true, kind: Tooltip, position: 'above', content: 'I\'m a right floating tooltip.'}
				]}
			]},
			//Fourth row of buttons
			{fit: true, components:[
				{kind: TooltipDecorator, components: [
					{kind: InputDecorator, components: [
						{kind: Input, style: 'width: 130px;', placeholder: 'Above'}
					]},
					{kind: Tooltip, floating: true, content: 'I\'m a tooltip for an input.', position: 'above'}
				]},

				{kind: TooltipDecorator, classes: 'right', components: [
					{kind: InputDecorator, components: [
						{kind: Input, style: 'width: 130px;', placeholder: 'Below'}
					]},
					{kind: Tooltip, content: 'I\'m a tooltip for an input.', position: 'below'}
				]}
			]},
			//Bottom row of buttons
			{components:[
				{kind: TooltipDecorator, components: [
					{kind: IconButton, src: 'assets/icon-button-enyo-logo.png'},
					{kind: Tooltip, floating: true, content: 'Floating tooltip for an IconButton.'}
				]},

				{kind: TooltipDecorator, classes: 'right', components: [
					{kind: IconButton, src: 'assets/icon-button-enyo-logo.png'},
					{kind: Tooltip, floating: false, content: 'I\'m a tooltip for an IconButton.'}
				]}
			]}
		]}
	],
	bindings: [
		{from: '$.dragInput.value', to: '$.dragTooltipText.content'}
	],
	changePosition: function (sender, ev) {
		this.$.dragTooltip.set('position', ev.content);
	},
	setWidth: function() {
		this.$.dragTooltipText.applyStyle('width', this.$.widthInput.getValue() + 'px');
	},
	dragstart: function() {
		this.$.dragBtn.spotlight = false;
	},
	drag: function(sender, ev) {
		this.$.dragContainer.setBounds({top: ev.pageY, left: ev.pageX});
	},
	dragfinish: function() {
		this.$.dragBtn.spotlight = true;
	}
});
}],'src/DataListSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	ExpandablePicker = require('moonstone/ExpandablePicker'),
	ExpandableInput = require('moonstone/ExpandableInput'),
	DataList = require('moonstone/DataList'),
	Panels = require('moonstone/Panels'),
	Button = require('moonstone/Button'),
	Drawers = require('moonstone/Drawers'),
	CaptionDecorator = require('moonstone/CaptionDecorator'),
	ToggleButton = require('moonstone/ToggleButton'),
	Collection = require('enyo/Collection'),
	Control = require('enyo/Control');

module.exports = kind({
	name: 'moons.sample.DataListSample',
	classes: 'moon enyo-fit enyo-unselectable',
	components: [
		{name: 'drawers', kind: Drawers, drawers: [
			{handle: {}, controlsOpen: true, controlDrawerComponents: [
				{classes: 'moon-hspacing', controlClasses: 'moon-5h', components: [
					{name: 'orientation', kind: ExpandablePicker, selectedIndex: 0, content: 'Orientation', components: [
						{content: 'vertical'},
						{content: 'horizontal'}
					], style: 'vertical-align: top;'},
					{name: 'recordCount', kind: ExpandableInput, content: 'Record Count', value: 1000, onchange: 'updateRecords', style: 'vertical-align: top;'},
					{name: 'scrollIndex', kind: ExpandableInput, value: 0, content: 'Scroll to Index', onblur: 'scrollToIndex', style: 'vertical-align: top;'},
					{name: 'debugging', kind: ExpandablePicker, selectedIndex: 0, content: 'Page Debugging', components: [
						{value: false, content: 'off'},
						{value: true, content: 'on'}
					], style: 'vertical-align: top;'},
					{kind: Button, content: 'Hide', ontap: 'toggleShowing'}
				]}
			]}
		], components: [
			{kind: Panels, pattern: 'activity', components: [
				{name: 'repeaterContainer', kind: Control}
			]}
		]},
		{name: 'collection', kind: Collection}
	],
	bindings: [
		{from: '.$.orientation.selected.content', to: '.orientation'},
		{from: '.$.debugging.selected.value', to: '.repeaterDebugging'},
		{from: '.$.recordCount.value', to: '.recordCount', debug: true, oneWay: false, transform: function (v) {return (v !== undefined && v !== null && !isNaN(v))? v: undefined;}},
		{from: '.$.collection', to: '.$.repeater.collection'},
		{from: '.side', to: '.$.repeater.side'}
	],
	generateRecords: function (amount) {
		var records = this.$.collection.models
			, add = []
			, i = records.length
			, len = (i + (!isNaN(amount)? amount: 0));

		for (; i<len; ++i) {
			add.push({
				on: false,
				disabled: Boolean(i % 10 === 0),
				caption: 'Caption ' + i,
				label: 'Label ' + i
			});
		}

		return add;
	},
	scrollToIndex: function (sender, ev) {
		var newIndex = sender.getValue();
		if (this.isScrolled || newIndex !== this.currentIndex) {
			this.currentIndex = newIndex;
			this.$.drawers.closeDrawers();
			this.$.repeater.scrollToIndex(newIndex);
			this.isScrolled = false;
		}
	},
	scrollStopped: function () {
		this.isScrolled = true;
	},
	toggleShowing: function (sender) {
		var showing = ! this.$.repeater.getShowing();
		this.$.repeater.setShowing(showing);
		sender.set('content', (showing? 'Hide': 'Show'));
	},
	repeaterDebuggingChanged: function () {
		if (this.$.repeater) {
			this.$.repeater.addRemoveClass('debug', this.repeaterDebugging);
		}
	},
	orientationChanged: function () {
		var props = utils.mixin({}, [this.repeaterDefaults, {orientation: this.orientation}]),
			cp    = this.controlParent,
			c;
		if (this.$.repeater) {
			this.$.repeater.destroy();
		}
		this.set('side', this.orientation == 'vertical'? 'left': 'bottom');
		this.controlParent = this.$.repeaterContainer;
		c = this.createComponent(props);
		c.render();
		this.controlParent = cp;
	},
	recordCountChanged: function () {
		var count   = this.get('recordCount'),
			num     = Math.min(Math.max(count, 0), 1000),
			records = this.$.collection.models;
		if (num != count) {
			this.set('recordCount', num);
		}
		if (records.length > num) {
			this.$.collection.remove(records.slice(num));
		} else if (records.length < num) {
			this.$.collection.add(this.generateRecords(Math.abs(records.length - num)));
		}
	},
	repeaterDefaults: {name: 'repeater', kind: DataList, components: [
		{classes: 'enyo-border-box', components: [
			{name: 'caption', kind: CaptionDecorator, components: [
				{name: 'button', kind: ToggleButton}
			]}
		], bindings: [
			{from: '.model.caption', to: '.$.caption.content'},
			{from: '.repeater.side', to: '.$.caption.side'},
			{from: '.model.label', to: '.$.button.content'},
			{from: '.model.disabled', to: '.$.button.disabled'},
			{from: '.model.on', to: '.$.button.value', oneWay: false}
		]}
	], onScrollStop: 'scrollStopped'}
});

}],'src/ExpandableInputSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	BodyText = require('moonstone/BodyText'),
	Divider = require('moonstone/Divider'),
	ExpandableInput = require('moonstone/ExpandableInput'),
	Scroller = require('moonstone/Scroller');

module.exports = kind({
	name: 'moon.sample.ExpandableInputSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Scroller, horizontal: 'hidden', fit: true, components: [
			{classes:'moon-5h', components: [
				{kind: ExpandableInput, oninput:'inputChanging', onChange:'inputChanged', content: 'Input', noneText: 'No Input'},
				{kind: ExpandableInput, oninput:'inputChanging', onChange:'inputChanged', content: 'Input with Placeholder', noneText: 'No Input', placeholder: 'Placeholder'},
				{kind: ExpandableInput, oninput:'inputChanging', onChange:'inputChanged', content: 'Input with Value', noneText: 'No Input', placeholder: 'Placeholder', value: 'Initial value'},
				{kind: ExpandableInput, oninput:'inputChanging', onChange:'inputChanged', content: 'Disabled Input', noneText: 'No Input', disabled: true, value: 'I am disabled.'},
				{kind: ExpandableInput, oninput:'inputChanging', onChange:'inputChanged', content: 'Input with loooooooooooooooong text truncation', noneText: 'No Input with loooooooooooooooooong text truncation'},
				{kind: ExpandableInput, oninput:'inputChanging', onChange:'inputChanged', content: 'Input with no value or noneText'},
				{kind: ExpandableInput, oninput:'inputChanging', onChange:'inputChanged', content: 'Input with password type', type: 'password'}
			]}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'console', content: 'Input:', allowHtml: true}
	],
	inputChanging: function (sender, ev) {
		this.$.console.setContent('<em>'+sender.getContent() + '</em> changing: \'' + ev.originator.getValue() + '\'');
	},
	inputChanged: function (sender, ev) {
		this.$.console.setContent('<em>'+sender.getContent() + '</em> changed to: \'' + sender.getValue() + '\'');
	}
});

}],'src/DataGridListSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	Collection = require('enyo/Collection'),
	EmptyBinding = require('enyo/EmptyBinding');

var
	CheckboxItem = require('moonstone/CheckboxItem'),
	ContextualPopup = require('moonstone/ContextualPopup'),
	ContextualPopupDecorator = require('moonstone/ContextualPopupDecorator'),
	DataList = require('moonstone/DataList'),
	DataGridList = require('moonstone/DataGridList'),
	GridListImageItem = require('moonstone/GridListImageItem'),
	IconButton = require('moonstone/IconButton'),
	MoonImage = require('moonstone/Image'),
	Item = require('moonstone/Item'),
	Panel = require('moonstone/Panel'),
	Panels = require('moonstone/Panels'),
	RadioItemGroup = require('moonstone/RadioItemGroup'),
	Scroller = require('moonstone/Scroller'),
	Overlay = require('moonstone/Overlay'),
	ToggleButton = require('moonstone/ToggleButton');

var GridSampleItem = kind({
	name: 'moon.sample.GridSampleItem',
	kind: GridListImageItem,
	mixins: [Overlay.Selection],
	subCaption: 'Sub Caption',
	bindings: [
		{from: 'model.text', to: 'caption'},
		{from: 'model.subText', to: 'subCaption'},
		{from: 'model.url', to: 'source'},
		{from: 'model.selected', to: 'selected', oneWay: false},
		{from: 'model.overlayTransparent', to: 'overlayTransparent', oneWay: false}
	]
});

var HorizontalGridListItem = kind({
	name: 'moon.HorizontalGridListItem',
	kind: Item,
	classes: 'moon-gridlist-imageitem horizontal-gridList-item',
	mixins: [Overlay.Support, Overlay.Selection],

	components: [
		{name: 'caption', classes: 'caption'},
		{name: 'subCaption', classes: 'sub-caption'}
	],

	published: {
		caption: '',
		subCaption: '',
		selected: false
	},

	bindings: [
		{from: 'caption', to: '$.caption.content'},
		{from: 'caption', to: '$.caption.showing', kind: EmptyBinding},
		{from: 'subCaption', to: '$.subCaption.content'},
		{from: 'subCaption', to: '$.subCaption.showing', kind: EmptyBinding}
	]
});

var HorizontalGridListImageItem = kind({
	name: 'moon.HorizontalGridListImageItem',
	kind: HorizontalGridListItem,
	classes: 'horizontal-gridList-image-item',
	components: [
		{name: 'img', kind: MoonImage},
		{name: 'caption', classes: 'caption'},
		{name: 'subCaption', classes: 'sub-caption'}
	],
	bindings: [
		{from: 'model.url', to: '$.img.src'}
	]
});

var itemTypes = [
	{content: 'ImageItem', value: 'GridListImageItem', selected: true},
	{content: 'HorizontalImageItem', value: 'HorizontalGridListImageItem'},
	{content: 'HorizontalItem', value: 'HorizontalGridListItem'}
];

var dataTypes = [
	{content: 'Collections/Models', value: 'EnyoData', selected: true},
	{content: 'JS Arrays/Objects', value: 'JS'}
];

module.exports = kind({
	name: 'moon.sample.DataGridListSample',
	kind: Panels,
	pattern: 'activity',
	classes: 'moon enyo-unselectable moon-datagridlist-sample',
	components: [
		{kind: Panel, name: 'listPanel', title: 'Data Grid List', headerComponents: [
			{kind: ToggleButton, content: 'Selection', name: 'selectionToggle', onChange: 'selectionChanged'},
			{kind: ToggleButton, content: 'Transparency', name: 'transparencyToggle', onChange: 'transparencyTypeChanged', value: true, disabled: true},
			{kind: ContextualPopupDecorator, components: [
				{content: 'Selection Type'},
				{kind: ContextualPopup, classes: 'moon-4h', components: [
					{kind: RadioItemGroup, name: 'selectionTypeGroup', onActiveChanged: 'selectionTypeChanged', components: [
						{content: 'Single', value: 'single', selected: true},
						{content: 'Multiple', value: 'multi'},
						{content: 'Group', value: 'group'}
					]}
				]}
			]},
			{kind: ContextualPopupDecorator, components: [
				{content:'Item Type'},
				{kind: ContextualPopup, classes:'moon-6h', components: [
					{kind: RadioItemGroup, name: 'itemTypeGroup', onActiveChanged: 'itemTypeChanged'}
				]}
			]},
			{kind: ContextualPopupDecorator, components: [
				{content:'Data Type'},
				{kind: ContextualPopup, classes:'moon-6h', components: [
					{kind: RadioItemGroup, name: 'dataTypeGroup', onActiveChanged: 'dataTypeMenuChanged'}
				]}
			]},
			{kind: ContextualPopupDecorator, components: [
				{content: 'Popup List'},
				{kind: ContextualPopup, classes: 'moon-6h moon-8v', components: [
					{kind:DataList, components: [
						{kind:CheckboxItem, bindings: [
							{from: 'model.text', to: 'content'},
							{from: 'model.selected', to: 'checked', oneWay: false}
						]}
					]}
				]}
			]},
			{kind: IconButton, icon: 'rollforward', ontap: 'refreshItems'}
		], components: [
			{name: 'gridList', fit: true, spacing: 20, minWidth: 180, minHeight: 270, kind: DataGridList, scrollerOptions: { kind: Scroller, vertical: 'scroll', horizontal: 'hidden', spotlightPagingControls: true }, components: [
				{ kind: GridSampleItem }
			]}
		]}
	],
	bindings: [
		{from: 'collection', to: '$.dataList.collection'},
		{from: 'collection', to: '$.gridList.collection'}
	],
	create: function () {
		Panels.prototype.create.apply(this, arguments);

		this.computeInitialValue(itemTypes, 'itemKind');
		this.computeInitialValue(dataTypes, 'dataType');
		this.$.itemTypeGroup.createComponents(itemTypes);
		this.$.dataTypeGroup.createComponents(dataTypes);
		this.itemKindChanged();
		this.transparency = true;
	},
	computeInitialValue: function (arr, prop) {
		var idx, elem;
		for (idx = 0; idx < arr.length; idx++) {
			elem = arr[idx];
			if (elem.selected) {
				this[prop] = elem.value;
				break;
			}
		}
	},
	itemKindChanged: function () {
		this.generateDataGridList(this.itemKind);
	},
	dataTypeChanged: function () {
		this.refreshItems();
	},
	transparencyChanged: function () {
		var isDataTypeJS = this.dataType === 'JS',
			item, len, idx;

		for (idx = 0, len = this.collection.length; idx < len; idx++) {
			item = this.collection.at(idx);
			if (isDataTypeJS) item.overlayTransparent = this.transparency;
			else item.set('overlayTransparent', this.transparency);
		}

		if (isDataTypeJS) this.$.gridList.syncChildBindings({all: true, force: true});
	},
	generateRecords: function (amount) {
		var records = [],
			idx     = this.modelIndex || 0;
		for (; records.length < amount; ++idx) {
			var title = (idx % 8 === 0) ? ' with long title' : '';
			var subTitle = (idx % 8 === 0) ? 'Lorem ipsum dolor sit amet' : 'Subtitle';
			records.push({
				selected: false,
				overlayTransparent: this.transparency,
				text: 'Item ' + idx + title,
				subText: subTitle,
				url: 'http://placehold.it/300x300/' + Math.floor((Math.random()*(0x1000000-0x101010))+0x101010).toString(16) + '/ffffff&text=Image ' + idx
			});
		}
		// update our internal index so it will always generate unique values
		this.modelIndex = idx;
		return records;
	},
	generateDataGridList: function (itemType) {
		if (this.$.gridList) {
			this.$.gridList.destroy();
		}
		var props = {
				name: 'gridList',
				kind: DataGridList,
				selection: false,
				fit: true,
				spacing: 20,
				minHeight: 270,
				minWidth: 180,
				scrollerOptions: {
					kind: Scroller,
					vertical:'scroll',
					horizontal: 'hidden',
					spotlightPagingControls: true
				},
				components: [
					{kind: GridSampleItem}
				]
			},
			createdComponent;

		switch (itemType) {
		case 'HorizontalGridListImageItem':
			props.minWidth = 600;
			props.minHeight = 100;
			props.components[0] = {
				kind: HorizontalGridListImageItem,
				bindings: [
					{from: 'model.text', to: 'caption'},
					{from: 'model.subText', to: 'subCaption'},
					{from: 'model.url', to: 'source'},
					{from: 'model.selected', to: 'selected', oneWay: false}
				]
			};
			break;
		case 'HorizontalGridListItem':
			props.minWidth = 600;
			props.minHeight = 100;
			props.components[0] = {
				kind: HorizontalGridListItem,
				bindings: [
					{from: 'model.text', to: 'caption'},
					{from: 'model.subText', to: 'subCaption'},
					{from: 'model.selected', to: 'selected', oneWay: false}
				]
			};
			break;
		}

		createdComponent = this.$.listPanel.createComponent(props, {owner: this});

		this.refreshItems(40);

		this.$.gridList.set('selection', this.$.selectionToggle.value);
		// this.$.gridList.set('overlayTransparent', this.$.transparencyToggle.value);
		if (this.$.selectionTypeGroup.active) {
			this.$.gridList.set('selectionType', this.$.selectionTypeGroup.active.value);
		}

		createdComponent.render();
	},
	selectionChanged: function (sender, ev) {
		this.$.transparencyToggle.set('disabled', !sender.value);
		this.$.gridList.set('selection', sender.value);
	},
	transparencyTypeChanged: function (sender, ev) {
		this.set('transparency', sender.value);
	},
	itemTypeChanged: function (sender, ev) {
		this.set('itemKind', sender.active.value);
	},
	dataTypeMenuChanged: function (sender, ev) {
		this.set('dataType', sender.active.value);
	},
	selectionTypeChanged: function (sender, ev) {
		this.$.gridList.set('selectionType', sender.active.value);
	},
	refreshItems: function (num) {
		var data;

		num = (typeof num === 'number') ? num : 100;
		data = this.generateRecords(num);

		if (this.collection && this.collection.destroy) {
			this.collection.destroy();
		}
		this.set('collection', this.dataType === 'JS' ? data : new Collection(data));
	}
});
}],'src/CalendarSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	i18n = require('enyo/i18n'),
	updateLocale = i18n.updateLocale;

var
	Locale = require('enyo-ilib/Locale');

var
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows');

var
	DateFmt = require('enyo-ilib/DateFmt');

var
	BodyText = require('moonstone/BodyText'),
	Button = require('moonstone/Button'),
	Calendar = require('moonstone/Calendar'),
	DatePicker = require('moonstone/DatePicker'),
	Divider = require('moonstone/Divider'),
	ExpandablePicker = require('moonstone/ExpandablePicker'),
	Input = require('moonstone/Input'),
	InputDecorator = require('moonstone/InputDecorator'),
	Scroller = require('moonstone/Scroller');

module.exports = kind({
	name: 'moon.sample.CalendarSample',
	classes: 'moon enyo-unselectable enyo-fit',
	kind: FittableColumns,
	_locale: 'local',
	components: [
		{components: [
			{kind: Calendar, name: 'calendar', onChange: 'changed'}
		]},
		{kind: FittableRows, fit: true, components: [
			{kind: Scroller, fit:true, components: [
				{kind: Divider, content: 'Set value: '},
				{classes: 'moon-hspacing', components: [
					{kind: InputDecorator, classes: 'moon-2h', components: [
						{kind: Input, name: 'yearInput', classes: 'moon-calendar-sample-input', placeholder: 'Year'}
					]},
					{kind: InputDecorator, classes: 'moon-2h', components: [
						{kind: Input, name: 'monthInput', classes: 'moon-calendar-sample-input', placeholder: 'Month'}
					]},
					{kind: InputDecorator, classes: 'moon-2h', components: [
						{kind: Input, name: 'dayInput', classes: 'moon-calendar-sample-input', placeholder: 'Day'}
					]}
				]},
				{classes: 'moon-hspacing', components: [
					{kind: Button, small:true, content: 'Set Date', ontap: 'setDate'},
					{kind: Button, small:true, content: 'Reset to Current', ontap: 'resetDate'}
				]},
				{classes: 'moon-1v'},
				{classes: 'moon-7h', components: [
					{kind: DatePicker, name: 'picker', noneText: 'Pick a Date', content: 'Pick a Date'},
					{kind: ExpandablePicker, name: 'localePicker', noneText: 'No Language Selected', content: 'Choose Locale', onChange: 'setLocale', components: [
						{content: 'Use Default Locale', active: true},
						{content: 'ko-KO'}, //Korea, firstDayOfWeek: 1
						{content: 'zh-TW'},
						{content: 'fa-IR'}, // Iran, persian calendar
						{content: 'th-TH'}, //Thailand
						{content: 'en-US'}, //United States, firstDayOfWeek: 0
						{content: 'und-AE'}, //United Arab Emirates, firstDayOfWeek: 6
						{content: 'und-AG'}, //Antigua and Barbuda, firstDayOfWeek: 0
						{content: 'und-CA'}, //Canada, firstDayOfWeek: 0
						{content: 'it-CH'}, //Italian
						{content: 'en-MX'},
						{content: 'de-DE'}, // Germany, firstDayOfWeek: 1
						{content: 'fr-FR'}, // France, firstDayOfWeek: 1
						{content: 'fr-CA'},
						{content: 'it-IT'}, // Italy, firstDayOfWeek: 1
						{content: 'es-ES'}, // Spain, firstDayOfWeek: 1
						{content: 'es-MX'},
 						{content: 'ar-SA'},
 						{content: 'ur-PK'},
 						{content: 'zh-Hant-HK'},
 						{content: 'ja-JP'},
 						{content: 'en-JP'}
					]},
					{name: 'dowLengthPicker', kind: ExpandablePicker, content: 'Choose DOW Label Length', onChange: 'setLabelLength', components: [
						{content: 'short', active: true},
						{content: 'medium'},
						{content: 'long'},
						{content: 'full'}
					]},
					{name: 'dowLabelClass', kind: ExpandablePicker, content: 'Choose DOW Label Class', onChange: 'setLabelStyle', components: [
						{content: 'Default', active: true, className: ''},
						{content: 'Divider', className: 'moon-divider moon-divider-text'},
						{content: 'Smaller font', className: 'moon-calendar-picker-day small'}
					]}
				]}
			]},
			{kind: Divider, content: 'Result'},
			{kind: BodyText, name: 'result', content: 'No change yet'}
		]}
	],
	bindings: [
		{from: '.$.calendar.value', to: '.$.picker.value', oneWay:false}
	],
	create: function () {
		this.inherited(arguments);
		this.df = new DateFmt({
			type: 'datetime',
			time: 'hmsa',
			date: 'dmy',
			useNative: false,
			length: 'short'
		});

		for(var i = 0; i < this.$.localePicker.components.length; i++) {
 			if(this.$.localePicker.components[i].content === this._locale) {
 				this.$.localePicker.setSelectedIndex(i);
 				break;
 			}
		}
	},

	updateCurrentString: function (date) {
		var formatted = this.df.format(date);
		this.$.result.setContent('Current Date' + ' changed to ' + formatted);
	},

	setLocale: function (sender, ev){
		var locale = ev.selected.content;
		locale = (locale == 'Use Default Locale' || locale === 'local') ? null : locale;
		// auto-triggers update to correctly configured/written widgets
		updateLocale(locale);
		// egregious misuse of now-deprecated widget/api to avoid needing to rewrite the entire
		// widget at this time
		this.$.calendar.set('locale', new Locale());

		this.df = new DateFmt({
			type: 'datetime',
			time: 'hmsa',
			date: 'dmy',
			useNative: false,
			length: this.$.dowLengthPicker.selected.content
		});
		this.updateCurrentString(this.$.calendar.getValue());
		return true;
	},
	setLabelLength: function (sender, ev) {
		if (ev.content){
			this.$.calendar.setDayOfWeekLength(ev.content);
			this.df = new DateFmt({
				type: 'datetime',
				time: 'hmsa',
				date: 'dmy',
				useNative: false,
				length: ev.content
			});
			this.updateCurrentString(this.$.calendar.getValue());
			this.removeLabelItem(this.$.dowLabelClass, ev, 'Divider', 'full');
		}
		return true;
	},
	setLabelStyle: function (sender, ev) {
		if (ev.content){
			this.$.calendar.setDayOfWeekClasses(ev.selected.className);
			this.removeLabelItem(this.$.dowLengthPicker, ev, 'full', 'Divider');
		}
		return true;
	},
	removeLabelItem: function (control, ev, labelName1, labelName2) {
		var i,
			c = control.getClientControls();
		for (i = 0; i < c.length; i++) {
			if (c[i].content == labelName1) {
				c[i].addRemoveClass('moon-calendar-dow-label-nodisplay', Boolean(ev.content == labelName2));
			}
		}
	},
	changed: function (sender, ev) {
		if (this.$.result && ev.value) {
			this.updateCurrentString(ev.value);
		}
	},
	setDate: function (sender, ev) {
		var year = isNaN(parseInt(this.$.yearInput.getValue(), 0)) ? this.$.picker.value.getFullYear() : parseInt(this.$.yearInput.getValue(), 0);
		var month = isNaN(parseInt(this.$.monthInput.getValue(), 0)) ? this.$.picker.value.getMonth() : parseInt(this.$.monthInput.getValue(), 0) - 1;
		var day = isNaN(parseInt(this.$.dayInput.getValue(), 0)) ? this.$.picker.value.getDate() : parseInt(this.$.dayInput.getValue(), 0);
		this.$.calendar.setValue(new Date(year, month, day));
	},
	resetDate: function () {
		this.$.calendar.setValue(null);
	}
});

module.exports.badgeClasses = 'deprecated';

}],'src/DatePickerSample':[function (module,exports,global,require,request){
var
	i18n = require('enyo/i18n'),
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows');

var
	ilib = require('enyo-ilib');

var
	Scroller = require('moonstone/Scroller'),
	DatePicker = require('moonstone/DatePicker'),
	Button = require('moonstone/Button'),
	Input = require('moonstone/Input'),
	InputDecorator = require('moonstone/InputDecorator'),
	ExpandablePicker = require('moonstone/ExpandablePicker'),
	Divider = require('moonstone/Divider'),
	BodyText = require('moonstone/BodyText');

module.exports = kind({
	name: 'moons.sample.DatePickerSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Scroller, fit: true, components: [
			{classes: 'moon-7h moon-vspacing-s', components: [
				{kind: DatePicker, name: 'picker', noneText: 'Pick a Date', content: 'Date', onChange: 'changed'},
				{kind: Button, name: 'buttonReset', content: 'Reset Date', small: true, ontap: 'resetTapped'},
				{kind: DatePicker, name: 'disabledPicker', disabled: true, noneText: 'Disabled Date Picker', content: 'Disabled Date'},
				{classes: 'moon-hspacing', components: [
					{kind: InputDecorator, classes: 'moon-2h', components: [
						{kind: Input, name: 'yearInput', classes: 'moon-date-picker-sample-input', placeholder: 'Year'}
					]},
					{kind: InputDecorator, classes: 'moon-2h', components: [
						{kind: Input, name: 'monthInput', classes: 'moon-date-picker-sample-input', placeholder: 'Month'}
					]},
					{kind: InputDecorator, classes: 'moon-2h', components: [
						{kind: Input, name: 'dayInput', classes: 'moon-date-picker-sample-input', placeholder: 'Day'}
					]}
				]},
				{classes: 'moon-hspacing', components: [
					{kind: Button, small: true, content: 'Set Date', ontap: 'setDate'},
					{kind: Button, small: true, content: 'Reset to Current', ontap: 'resetDate'}
				]},
				{name: 'localePicker', kind: ExpandablePicker, noneText: 'No Locale Selected', content: 'Choose Locale', onChange: 'setLocale', components: [
					{content: 'Use Default Locale', active: true},
					{content: 'am-ET'},
					{content: 'ko-KR'},
					{content: 'zh-TW'},
					{content: 'fa-IR'},
					{content: 'ar-SA'},
					{content: 'ur-IN'},
					{content: 'th-TH'},	//Thailand
					{content: 'en-US'},
					{content: 'jp-JP'},
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
					{content: 'es-US'}
				]}
			]}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'result', content: 'No change yet'}
	],
	create: function () {
		this.inherited(arguments);
		if (!ilib) {
			this.$.localePicker.hide();
			this.log('iLib not present -- hiding locale picker');
		}
	},
	setLocale: function (sender, ev){
		var locale = ev.selected.content;
		locale = locale == 'Use Default Locale' ? null : locale;
		i18n.updateLocale(locale);
		this.$.result.setContent(ev.originator.name + ' changed to ' + ilib.getLocale());
		return true;
	},
	setDate: function () {
		var current = this.$.picker.value || new Date();
		var year = isNaN(parseInt(this.$.yearInput.getValue(), 0)) ? current.getFullYear() : parseInt(this.$.yearInput.getValue(), 0);
		var month = isNaN(parseInt(this.$.monthInput.getValue(), 0)) ? current.getMonth() : parseInt(this.$.monthInput.getValue(), 0) - 1;
		var day = isNaN(parseInt(this.$.dayInput.getValue(), 0)) ? current.getDate() : parseInt(this.$.dayInput.getValue(), 0);
		this.$.picker.set('value', new Date(year, month, day));
	},
	resetDate: function () {
		this.$.picker.set('value', new Date());
	},
	changed: function (sender, ev) {
		this.$.result.setContent(ev.name + ' changed to ' + (ev.value && ev.value.toDateString()));
	},
	resetTapped: function (sender, ev) {
		this.$.picker.set('value', null);
		this.$.picker.set('open', false);
		return true;
	}
});
}],'src/ScrollerVerticalSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Accordion = require('moonstone/Accordion'),
	Button = require('moonstone/Button'),
	CheckboxItem = require('moonstone/CheckboxItem'),
	DatePicker = require('moonstone/DatePicker'),
	ExpandableInput = require('moonstone/ExpandableInput'),
	ExpandableIntegerPicker = require('moonstone/ExpandableIntegerPicker'),
	ExpandablePicker = require('moonstone/ExpandablePicker'),
	ExpandableText = require('moonstone/ExpandableText'),
	FormCheckbox = require('moonstone/FormCheckbox'),
	Input = require('moonstone/Input'),
	InputDecorator = require('moonstone/InputDecorator'),
	Item = require('moonstone/Item'),
	Panel = require('moonstone/Panel'),
	Scroller = require('moonstone/Scroller'),
	SelectableItem = require('moonstone/SelectableItem'),
	SimplePicker = require('moonstone/SimplePicker'),
	TimePicker = require('moonstone/TimePicker'),
	ToggleButton = require('moonstone/ToggleButton'),
	ToggleItem = require('moonstone/ToggleItem');

module.exports = kind({
	name: 'moon.sample.ScrollerVerticalSample',
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Panel, classes: 'enyo-fit', headerType: 'medium', title: 'Vertical Scroller', headerComponents: [
			{content: 'Spacing: ', classes: 'moon-header-client-text'},
			{kind: SimplePicker, name: 'spacingPicker', classes: 'moon-4h', onChange: 'spacingChanged', components: [
				{content: 'default', spacingClass: ''},
				{content: 'small', spacingClass: 'moon-vspacing-s', active:true},
				{content: 'medium', spacingClass: 'moon-vspacing-m'},
				{content: 'large', spacingClass: 'moon-vspacing-l'}
			]}
		], components: [
			{ kind: Scroller, classes: 'enyo-fill', components: [
				{name: 'wrapper', classes: 'moon-6h moon-vspacing-s', components: [
					{kind: ExpandablePicker, noneText: 'Select a language', autoCollapse: true, content: 'Expandable Picker', classes: 'moon-expandable-picker-wrapper', components: [
						{content: 'English'},
						{content: 'Spanish'},
						{content: 'French'},
						{content: 'German'},
						{content: 'Italian'},
						{content: 'Japanese'}
					]},
					{kind: ExpandableInput, content: 'Expandable Input', noneText: 'No Input'},
					{kind: ExpandableIntegerPicker, content: 'Expandable Integer Picker', value: 7, min: 3, max: 15, step: 1, unit: 'elephants'},
					{kind: DatePicker, noneText: 'Pick a Date', content: 'Date Picker'},
					{kind: TimePicker, noneText: 'Pick a Time', content: 'Time Picker'},
					{kind: CheckboxItem, content: 'Checkbox Item 1'},
					{kind: CheckboxItem, content: 'Checkbox Item 2'},
					{kind: CheckboxItem, content: 'Checkbox Item 3'},
					{kind: SelectableItem, content: 'Selectable Item 1'},
					{kind: SelectableItem, content: 'Selectable Item 2'},
					{kind: SelectableItem, content: 'Selectable Item 3'},
					{kind: CheckboxItem, content: 'Checkbox Item 4 (right)', checkboxOnRight:true},
					{kind: CheckboxItem, content: 'Checkbox Item 5 (right)', checkboxOnRight:true},
					{kind: CheckboxItem, content: 'Checkbox Item 6 (right)', checkboxOnRight:true},
					{kind: ToggleItem, content: 'Toggle Item 1'},
					{kind: ToggleItem, content: 'Toggle Item 2'},
					{kind: ToggleItem, content: 'Toggle Item 3'},
					{kind: FormCheckbox, content: 'Form Checkbox 1'},
					{kind: FormCheckbox, content: 'Form Checkbox 2'},
					{kind: FormCheckbox, content: 'Form Checkbox 3'},
					{kind: Item, content: 'Item 1'},
					{kind: Item, content: 'Item 1'},
					{kind: Button, content: 'Button 1'}, {tag: 'br'},
					{kind: Button, content: 'Button 2'}, {tag: 'br'},
					{kind: Button, content: 'Button 3'}, {tag: 'br'},
					{kind: Item, content: 'Item 1'},
					{kind: Item, content: 'Item 1'},
					{kind: ToggleButton, content: 'Toggle Button 1'}, {tag: 'br'},
					{kind: ToggleButton, content: 'Toggle Button 2'}, {tag: 'br'},
					{kind: ToggleButton, content: 'Toggle Button 3'}, {tag: 'br'},
					{kind: InputDecorator, components: [
						{kind: Input, placeholder: 'Input'}
					]},
					{kind: InputDecorator, components: [
						{kind: Input, placeholder: 'Input'}
					]},
					{kind: InputDecorator, components: [
						{kind: Input, placeholder: 'Input'}
					]},
					{kind: Accordion, content: 'Accordion 1', defaultKind: SelectableItem, components: [
						{content: 'Item One'},
						{content: 'Item Two'}
					]},
					{kind: Accordion, content: 'Accordion 2', defaultKind: SelectableItem, components: [
						{content: 'Item Three'},
						{content: 'Item Four'}
					]},
					{kind: Accordion, content: 'Accordion 3', defaultKind: SelectableItem, components: [
						{content: 'Item Five'},
						{content: 'Item Six'}
					]},
					{kind: Item, content: 'Item 1'},
					{kind: Item, content: 'Item 2'},
					{kind: Item, content: 'Item 3'},
					{kind: Item, content: 'Item 4'},
					{kind: ExpandableText, content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
					{kind: Item, content: 'Item 5'},
					{kind: Item, content: 'Item 6'},
					{kind: Item, content: 'Item 7'},
					{kind: Item, content: 'Item 8'},
					{kind: ExpandableText, content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
					{kind: Item, content: 'Item 9'},
					{kind: Item, content: 'Item 10'},
					{kind: Item, content: 'Item 11'},
					{kind: Item, content: 'Item 12'},
					{kind: ExpandableText, content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
					{kind: Item, content: 'Item 13'},
					{kind: Item, content: 'Item 14'},
					{kind: Item, content: 'Item 15'},
					{kind: Item, content: 'Item 16'},
					{kind: Item, content: 'Item 17'},
					{kind: Item, content: 'Item 18'},
					{kind: Item, content: 'Item 19'},
					{kind: Item, content: 'Item 20'},
					{kind: Item, content: 'Item 21'},
					{kind: Item, content: 'Item 22'},
					{kind: ExpandablePicker, noneText: 'Select a language', autoCollapse: true, content: 'Expandable Picker', classes: 'moon-expandable-picker-wrapper', components: [
						{content: 'English'},
						{content: 'Spanish'},
						{content: 'French'},
						{content: 'German'},
						{content: 'Italian'},
						{content: 'Japanese'}
					]},
					{kind: ExpandableInput, content: 'Expandable Input', noneText: 'No Input'},
					{kind: ExpandableIntegerPicker, content: 'Expandable Integer Picker', value: 7, min: 3, max: 15, step: 1, unit: 'elephants'},
					{kind: DatePicker, noneText: 'Pick a Date', content: 'Date Picker'},
					{kind: TimePicker, noneText: 'Pick a Time', content: 'Time Picker'},
					{kind: Accordion, content: 'Accordion 1', components: [
						{content: 'Item One'},
						{content: 'Item Two'}
					]},
					{kind: Accordion, content: 'Accordion 2', components: [
						{content: 'Item Three'},
						{content: 'Item Four'}
					]},
					{kind: Accordion, content: 'Accordion 3', components: [
						{content: 'Item Five'},
						{content: 'Item Six'}
					]}
				]}
			]}
		]}
	],
	create: function () {
		this.inherited(arguments);
		this.spacingChanged();
	},
	spacingChanged: function (sender, ev) {
		if (this.lastSpacingClass) {
			this.$.wrapper.removeClass(this.lastSpacingClass);
		}
		var c = this.$.spacingPicker.getSelected().spacingClass;
		this.$.wrapper.addClass(c);
		this.lastSpacingClass = c;
	}
});

}],'src/TimePickerSample':[function (module,exports,global,require,request){
var
	i18n = require('enyo/i18n'),
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows');

var
	ilib = require('enyo-ilib'),
	dateFactory = require('enyo-ilib/DateFactory');

var
	BodyText = require('moonstone/BodyText'),
	Button = require('moonstone/Button'),
	DatePicker = require('moonstone/DatePicker'),
	Divider = require('moonstone/Divider'),
	ExpandablePicker = require('moonstone/ExpandablePicker'),
	Scroller = require('moonstone/Scroller'),
	TimePicker = require('moonstone/TimePicker');

module.exports = kind({
	name: 'moon.sample.TimePickerSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Scroller, fit: true, components: [
			{classes: 'moon-7h moon-vspacing-s', components: [
				{kind: DatePicker, name: 'pickerDateLinked', noneText: 'Pick a Date', content: 'Linked Date', onChange: 'dateChanged'},
				{kind: TimePicker, name: 'pickerTimeLinked', noneText: 'Pick a Time', content: 'Linked Time', meridiemEnable: true, onChange: 'timeChanged'},
				{kind: TimePicker, name: 'pickerTime', noneText: 'Pick a Time', content: 'Time', meridiemEnable: true, onChange: 'timeChanged'},
				{kind: Button, name: 'buttonReset', content: 'Reset Time', small: true, ontap: 'resetTapped'},
				{kind: TimePicker, name: 'pickerDisabled', meridiemEnable: true, disabled: true, noneText: 'Disabled Time Picker', content: 'Disabled Time'},
				{kind: ExpandablePicker, name: 'localePicker', noneText: 'No Locale Selected', content: 'Choose Locale', onChange: 'setLocale', components: [
					{content: 'Use Default Locale', active: true},
					{content: 'am-ET'},
					{content: 'ko-KR'},
					{content: 'zh-TW'},
					{content: 'fa-IR'},
					{content: 'ar-SA'},
					{content: 'ur-IN'},
					{content: 'th-TH'},	//Thailand
					{content: 'en-US'},
					{content: 'jp-JP'},
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
					{content: 'es-US'}
				]}
			]}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'result', content: 'No change yet'}
	],
	bindings: [
		{from: 'value', to: '$.pickerDateLinked.value', oneWay:false},
		{from: 'value', to: '$.pickerTimeLinked.value', oneWay:false}
	],
	create: function () {
		FittableRows.prototype.create.apply(this, arguments);
		if (!ilib) {
			this.$.localePicker.hide();
			this.log('iLib not present -- hiding locale picker');
		}
		this.set('value', new Date('Mar 09 2014 01:59'));
	},
	setLocale: function (sender, ev) {
		if (ilib) {
			var locale = ev.selected.content,
				val = (locale == 'Use Default Locale') ? null : locale;
			i18n.updateLocale(val);
			this.$.pickerDateLinked.setLocale(val);
			this.$.pickerTimeLinked.setLocale(val);
			this.$.pickerTime.setLocale(val);
			this.$.pickerDisabled.setLocale(val);
			this.$.result.setContent(ev.originator.name + ' changed to ' + locale);
		}
		return true;
	},
	timeChanged: function (sender, ev) {
		var time;
		if (sender.localeValue) {
			time = sender._tf.format(dateFactory({unixtime: sender.localeValue.getTime(), timezone:'Etc/UTC'})).toString();
		} else {
			time = ev.value && ev.value.toTimeString();
		}
		this.$.result.setContent(ev.name + ' changed to ' + time);
	},
	dateChanged: function (sender, ev) {
		this.$.result.setContent(ev.name + ' changed to ' + (ev.value && ev.value.toDateString()));
	},
	resetTapped: function (sender, ev) {
		this.$.pickerTime.set('open', false);
		this.$.pickerTime.set('value', null);
		return true;
	}
});
}],'src/ExpandableDataPickerSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Collection = require('enyo/Collection'),
	Divider = require('moonstone/Divider'),
	ExpandableDataPicker = require('moonstone/ExpandableDataPicker'),
	FormCheckbox = require('moonstone/FormCheckbox'),
	Scroller = require('moonstone/Scroller'),
	FittableRows = require('layout/FittableRows');

module.exports = kind({
	name: 'moon.sample.ExpandableDataPickerSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit',
	components: [
		{kind: Scroller, fit: true, components: [
			{name: 'picker1', kind: ExpandableDataPicker, content: 'Expandable Data Picker', noneText: 'Nothing Selected', components: [
				{bindings: [
					{from: 'model.label', to: 'content'}
				]}
			]},
			{name: 'picker2', kind: ExpandableDataPicker, content: 'Pre-selected Data Picker', noneText: 'Nothing Selected', components: [
				{bindings: [
					{from: 'model.label', to: 'content'},
					{from: 'model.active', to: 'active'}
				]}
			]},
			{kind: Divider, content:'Options'},
			{kind: FormCheckbox, content: 'Multiple Selection', prop: 'multipleSelection', onchange: 'checked'},
			{kind: FormCheckbox, content: 'Auto Collapse', prop: 'autoCollapseOnSelect', checked: true, onchange: 'checked'}
		]}
	],
	create: function () {
		FittableRows.prototype.create.apply(this, arguments);

		var c = new Collection([
			{label: 'first'},
			{label: 'second', active: true},
			{label: 'third'}
		]);
		this.$.picker1.set('collection', c);
		this.$.picker2.set('collection', c);
	},
	checked: function (sender, ev) {
		this.$.picker1.set(sender.prop, sender.checked);
		this.$.picker2.set(sender.prop, sender.checked);
	}
});

}],'src/ExpandablePickerSample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	FittableColumns = require('layout/FittableColumns');

var
	DatePicker = require('moonstone/DatePicker'),
	ExpandableDataPicker = require('moonstone/ExpandableDataPicker'),
	ExpandableInput = require('moonstone/ExpandableInput'),
	ExpandableIntegerPicker = require('moonstone/ExpandableIntegerPicker'),
	ExpandablePicker = require('moonstone/ExpandablePicker'),
	Panel = require('moonstone/Panel'),
	Scroller = require('moonstone/Scroller'),
	TimePicker = require('moonstone/TimePicker'),
	DayPicker = require('moonstone/DayPicker'),
	Collection = require('enyo/Collection'),
	Control = require('enyo/Control'),
	Group = require('enyo/Group');

module.exports = kind({
	name: 'moon.sample.ExpandablePickerSample',
	kind: FittableColumns,
	classes: 'moon enyo-unselectable enyo-fit',
	style: 'padding: 0', // offsetting margin added by .moon
	components: [
		{kind: Panel, name: 'nonGroupedPanel', onChange: 'pickerChanged', title: 'Expandable', headerType: 'medium', titleBelow: 'Not grouped', style: 'width: 50%;', components: [
			{kind: Scroller, horizontal: 'hidden', classes: 'enyo-fill', components: [
				{style: 'max-width: 500px;', components: [
					{kind: ExpandablePicker, noneText: 'Nothing selected', content: 'Expandable Picker', allowHtml:true, components: [
						{content: 'English'},
						{content: 'Spanish'},
						{content: 'French'},
						{content: 'German'},
						{content: 'Italian'},
						{content: 'Japanese'},
						{content: 'Symbols <span style=\'color:orange;\'>&#x2620; &#x2764; &#x2619;</span>', allowHtml:true}
					]},
					{kind: ExpandablePicker, content: 'Pre-selected Picker', components: [
						{content: 'On', active: true},
						{content: 'Off'}
					]},
					{kind: ExpandablePicker, multipleSelection: true, noneText: 'Nothing selected', content: 'Non-auto-collapsing', autoCollapseOnSelect: false, components: [
						{content: 'Item 1'},
						{content: 'Item 2', active: true},
						{content: 'Item 3', active: true}
					]},
					{kind: ExpandablePicker, noneText: 'Nothing selected with loooooooooooooooooooooooooong text truncation', content: 'Expandable Picker with looooooooooooooooooooooooooong text truncation', components: [
						{content: 'Looooooooooooooooooooooooooooooooooooooooooooong Item 1'},
						{content: 'Looooooooooooooooooooooooooooooooooooooooooooong Item 2'},
						{content: 'Looooooooooooooooooooooooooooooooooooooooooooong Item 3'}
					]},
					{kind: ExpandablePicker, disabled:true, content: 'Disabled Picker', components: [
						{content: 'Item 1'},
						{content: 'Item 2', active: true},
						{content: 'Item 3'}
					]},
					{kind: ExpandablePicker, content: 'Pre-expanded picker', open: true, components: [
						{content: 'Item 1'},
						{content: 'Item 2', active: true},
						{content: 'Item 3'}
					]},
					{kind: ExpandableIntegerPicker, autoCollapse: true, content: 'Integer Picker', value: 7, min: 3, max: 15, step: 1, unit: 'elephants'},
					{kind: ExpandableIntegerPicker, disabled:true, autoCollapse: true, content: 'Disabled Integer Picker', value: 2, min: 1, max: 15, unit: 'sec'},
					{kind: DatePicker, noneText: 'Pick a Date', content: 'Date Picker'},
					{kind: TimePicker, noneText: 'Pick a Date', content: 'Time Picker'},
					{kind: DayPicker, noneText: 'Pick a Day', content: 'Day Picker'},
					{kind: ExpandableInput, noneText: 'Enter text', content: 'Expandable Input', placeholder: 'Enter text'},
					{kind: ExpandableDataPicker, content: 'Expandable Data Picker', noneText: 'Nothing Selected', components: [
						{bindings: [
							{from: '.model.label', to: '.content'}
						]}
					]},
					{kind: ExpandablePicker, content: 'Initially Hidden Items Picker', renderItemsOnShow: true, components: [
						{content: 'Item 1'},
						{content: 'Item 2', active: true},
						{content: 'Item 3'}
					]},
					{kind: ExpandablePicker, content: 'No None Text', noneText: '', components: [
						{content: 'Item 1'},
						{content: 'Item 2'},
						{content: 'Item 3'}
					]}
				]}
			]}
		]},
		{kind: Panel, name: 'groupedPanel', onChange: 'pickerChanged', title: 'Pickers', headerType: 'medium', titleBelow: 'Grouped', fit: true, components: [
			{kind: Group, tag:null, highlander: true, components: [
				{kind: Scroller, horizontal: 'hidden', classes: 'enyo-fill', components: [
					{style: 'max-width: 500px;', components: [
						{kind: ExpandablePicker, noneText: 'Nothing selected', content: 'Expandable Picker', allowHtml:true, components: [
							{content: 'English'},
							{content: 'Spanish'},
							{content: 'French'},
							{content: 'German'},
							{content: 'Italian'},
							{content: 'Japanese'},
							{content: 'Symbols <span style=\'color:orange;\'>&#x2620; &#x2764; &#x2619;</span>', allowHtml:true}
						]},
						{kind: ExpandablePicker, content: 'Pre-selected Picker', components: [
							{content: 'On', active: true},
							{content: 'Off'}
						]},
						{kind: ExpandablePicker, content: 'Non-auto-collapsing', autoCollapseOnSelect: false, components: [
							{content: 'Item 1'},
							{content: 'Item 2', active: true},
							{content: 'Item 3'}
						]},
						{kind: ExpandablePicker, noneText: 'Nothing selected with loooooooooooooooooooooooooong text truncation', content: 'Expandable Picker with looooooooooooooooooooooooooong text truncation', components: [
							{content: 'Looooooooooooooooooooooooooooooooooooooooooooong Item 1'},
							{content: 'Looooooooooooooooooooooooooooooooooooooooooooong Item 2'},
							{content: 'Looooooooooooooooooooooooooooooooooooooooooooong Item 3'}
						]},
						{kind: ExpandablePicker, disabled:true, content: 'Disabled Picker', components: [
							{content: 'Item 1'},
							{content: 'Item 2', active: true},
							{content: 'Item 3'}
						]},
						{kind: ExpandablePicker, content: 'Pre-expanded picker', open: true, components: [
							{content: 'Item 1'},
							{content: 'Item 2', active: true},
							{content: 'Item 3'}
						]},
						{kind: ExpandableIntegerPicker, autoCollapse: true, content: 'Integer Picker', value: 7, min: 3, max: 15, step: 1, unit: 'elephants'},
						{kind: ExpandableIntegerPicker, disabled:true, autoCollapse: true, content: 'Disabled Integer Picker', value: 2, min: 1, max: 15, unit: 'sec'},
						{kind: DatePicker, noneText: 'Pick a Date', content: 'Date Picker'},
						{kind: TimePicker, noneText: 'Pick a Date', content: 'Time Picker'},
						{kind: DayPicker, noneText: 'Pick a Day', content: 'Day Picker'},
						{kind: ExpandableInput, noneText: 'Enter text', content: 'Expandable Input', placeholder: 'Enter text'},
						{kind: ExpandableDataPicker, content: 'Expandable Data Picker', noneText: 'Nothing Selected', components: [
							{bindings: [
								{from: '.model.label', to: '.content'}
							]}
						]},
						{kind: ExpandablePicker, content: 'Initially Hidden Items Picker', renderItemsOnShow: true, components: [
							{content: 'Item 1'},
							{content: 'Item 2', active: true},
							{content: 'Item 3'}
						]},
						{kind: ExpandablePicker, content: 'No None Text', noneText: '', components: [
							{content: 'Item 1'},
							{content: 'Item 2'},
							{content: 'Item 3'}
						]}
					]}
				]}
			]}
		]}
	],
	create: function () {
		Control.prototype.create.apply(this, arguments);

		var c = new Collection([
			{label: 'Item 1'},
			{label: 'Item 2'},
			{label: 'Item 3'},
			{label: 'Item 4'},
			{label: 'Item 5'}
		]);

		this.$.expandableDataPicker.set('collection', c);
		this.$.expandableDataPicker2.set('collection', c);
	},
	pickerChanged: function (sender, ev) {
		var value,
			picker = ev.originator.getContent();
		if (ev.originator instanceof ExpandablePicker) {
			value = ev.content;
			sender.setSubTitleBelow(picker + ' changed to \'' + value + '\'');
		} else if ((ev.originator instanceof ExpandableIntegerPicker) ||
					(ev.originator instanceof DatePicker) ||
					(ev.originator instanceof TimePicker) ||
					(ev.originator instanceof ExpandableInput)) {
			value = ev.originator.getValue();
			sender.setSubTitleBelow(picker + ' changed to \'' + value + '\'');
		}
	},
	// when called, go into loop of opening/closing pickers every second
	stressTest: function () {
		var pickers = [
			'datePicker',
			'datePicker2',
			'expandableInput',
			'expandableInput2',
			'expandableIntegerPicker',
			// disabled 'expandableIntegerPicker2',
			'expandableIntegerPicker3',
			// disabled 'expandableIntegerPicker4',
			'expandablePicker',
			'expandablePicker2',
			'expandablePicker3',
			'expandablePicker4',
			// disabled 'expandablePicker5',
			'expandablePicker6',
			'expandablePicker7',
			'expandablePicker8',
			'expandablePicker9',
			'expandablePicker10',
			// disabled 'expandablePicker11',
			'expandablePicker12',
			'timePicker',
			'timePicker2',
			'expandableDataPicker',
			'expandableDataPicker2'
		];
		var index = 0;
		var opened = false;
		setInterval(this.bindSafely(function () {
			if (opened) {
				this.$[pickers[index++]].setOpen(false);
			} else {
				this.$[pickers[index]].setOpen(true);
			}
			opened = !opened;
			index = index % pickers.length;
		}), 1000);
	}
});

}],'src/HistorySample':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Collection = require('enyo/Collection'),
	Control = require('enyo/Control'),
	DataRepeater = require('enyo/DataRepeater'),
	Spotlight = require('spotlight'),
	Button = require('moonstone/Button'),
	ChannelInfo = require('moonstone/ChannelInfo'),
	CheckboxItem = require('moonstone/CheckboxItem'),
	Clock = require('moonstone/Clock'),
	ContextualPopup = require('moonstone/ContextualPopup'),
	ContextualPopupDecorator = require('moonstone/ContextualPopupDecorator'),
	DataList = require('moonstone/DataList'),
	DatePicker = require('moonstone/DatePicker'),
	DayPicker = require('moonstone/DayPicker'),
	Divider = require('moonstone/Divider'),
	Drawers = require('moonstone/Drawers'),
	ExpandableInput = require('moonstone/ExpandableInput'),
	ExpandableIntegerPicker = require('moonstone/ExpandableIntegerPicker'),
	ExpandableListItem = require('moonstone/ExpandableListItem'),
	ExpandablePicker = require('moonstone/ExpandablePicker'),
	IconButton = require('moonstone/IconButton'),
	Item = require('moonstone/Item'),
	ListActions = require('moonstone/ListActions'),
	Panel = require('moonstone/Panel'),
	Panels = require('moonstone/Panels'),
	Popup = require('moonstone/Popup'),
	Scroller = require('moonstone/Scroller'),
	TimePicker = require('moonstone/TimePicker'),
	ToggleItem = require('moonstone/ToggleItem'),
	VideoInfoBackground = require('moonstone/VideoInfoBackground'),
	VideoInfoHeader = require('moonstone/VideoInfoHeader'),
	VideoPlayer = require('moonstone/VideoPlayer');

module.exports = kind({
	name: 'dmoon.sample.HistorySample',
	kind: Control,
	classes: 'moon enyo-fit enyo-unselectable',
	components: [
		{
			name: 'drawers',
			kind: Drawers,
			drawers: [
				{
					name: 'partialDrawer',
					open: false,
					controlsOpen: false,
					onActivate: 'partialDrawerChanged',
					onDeactivate: 'partialDrawerChanged',
					handle: {name: 'handleButton', content: 'Partial drawer with long text truncation'},
					components: [
						{kind: Panel, classes: 'enyo-fit', title: 'Partial Drawer', components: [
							{kind: Item, content: 'Item One'},
							{kind: Item, content: 'Item Two'}
						]}
					],
					controlDrawerComponents: [
						{classes: 'moon-hspacing', components: [
							{kind: Button, name: 'openMoreButton', content: 'Open More', ontap: 'openMainDrawer'},
							{kind: Button, content: 'Close', ontap: 'close'}
						]}
					]
				},
				{
					name: 'searchDrawer',
					handle: {content: 'Full drawer'},
					components: [
						{kind: Panel, classes: 'enyo-fit', title: 'Full Drawer', components: [
							{kind: Item, content: 'Item One'},
							{kind: Item, content: 'Item Two'}
						]}
					]
				}
			],
			components: [
				{name: 'player', kind: VideoPlayer, src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', poster: 'assets/video-poster.png', autoplay: true, showing: false, infoComponents: [
					{kind: VideoInfoBackground, orient: 'left', background: true, fit: true, components: [
						{
							kind: ChannelInfo,
							channelNo: '789-123',
							channelName: 'AMC',
							channelDesc: 'KRON-HD',
							channelMoreDesc: '4:30 - 5:30PM',
							components: [
								{content: 'DTV'},
								{content: 'Cinema'},
								{content: '3D'}
							]
						},
						{
							kind: VideoInfoHeader,
							title: 'Downton Abbey',
							uppercase: false,
							// Todo, we can remove below comment out after policy of samples is decided.
							// In latest tag like 2.6.0-pre.5, we don't have samples.
							// src: '$lib/moonstone/samples/assets/default-music.png',
							description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
						}
					]},
					{kind: VideoInfoBackground, orient: 'right', background: true, components: [
						{kind: Clock}
					]}
				], components: [
					{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
					{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
					{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
					{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
					{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
					{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
					{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
					{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
					{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
					{kind: IconButton, small: false, backgroundOpacity: 'translucent'}
				]},
				{name: 'panels', kind: Panels, pattern: 'activity', classes: 'enyo-fit', useHandle: true, onShowingChanged: 'panelsShowingChanged', components: [
					{title: 'First Panel', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
						{kind: Item, content: 'Item One', ontap: 'next1'},
						{kind: Item, content: 'Item Two', ontap: 'next1'},
						{kind: Item, content: 'Item Three', ontap: 'next1'},
						{kind: Item, content: 'Item Four', ontap: 'next1'},
						{kind: DatePicker, noneText: 'Pick a Date', content: 'Date Picker'},
						{kind: ToggleItem, content: 'Show/Hide Side Handle', checked: true,  onchange: 'handleShowingChanged'}
					]},
					{title: 'Second Panel', components: [
						{kind: ExpandablePicker, noneText: 'Nothing selected', content: 'Expandable Picker', allowHtml:true, components: [
							{content: 'English'},
							{content: 'Spanish'},
							{content: 'French'},
							{content: 'German'},
							{content: 'Italian'},
							{content: 'Japanese'},
							{content: 'Symbols <span style=\'color:orange;\'>&#x2620; &#x2764; &#x2619;</span>', allowHtml:true}
						]},
						{kind: Item, content: 'Item One', ontap: 'next2'},
						{kind: Item, content: 'Item Two', ontap: 'next2'},
						{kind: Item, content: 'Item Three', ontap: 'next2'},
						{kind: Item, content: 'Item Four', ontap: 'next2'},
						{kind: Item, content: 'Item Five', ontap: 'next2'}
					]},
					{title: 'Third Panel', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
						{kind: Item, content: 'Item One', ontap: 'next3'},
						{kind: Item, content: 'Item Two', ontap: 'next3'},
						{kind: Item, content: 'Item Three', ontap: 'next3'},
						{kind: ExpandablePicker, content: 'Non-auto-collapsing', autoCollapseOnSelect: false, components: [
							{content: 'Item 1'},
							{content: 'Item 2', active: true},
							{content: 'Item 3'}
						]},
						{kind: ExpandableInput, noneText: 'Enter text', content: 'Expandable Input', placeholder: 'Enter text'},
						{kind: Item, content: 'Item Four', ontap: 'next3'},
						{kind: Item, content: 'Item Five', ontap: 'next3'}
					]},
					{title: 'Fourth', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', headerComponents: [
						{kind: Button, content: 'Basic Popup', ontap: 'showPopup', popup: 'basicPopup'},
						{kind: ContextualPopupDecorator, components: [
							{content: 'ContextualPopup'},
							{kind: ContextualPopup, classes: 'moon-2h moon-8v', components: [
								{content: 'Item 1'},
								{content: 'Item 2'},
								{content: 'Item 3'}
							]}
						]},
						{kind: ContextualPopupDecorator, components: [
							{content: 'ContextualPopup'},
							{kind: ContextualPopup, classes: 'moon-2h moon-8v', components: [
								{content: 'Item 1'},
								{content: 'Item 2'},
								{content: 'Item 3'}
							]}
						]}
					], components: [
						{kind: Item, content: 'Item One', ontap: 'next4'},
						{kind: Item, content: 'Item Two', ontap: 'next4'},
						{kind: Item, content: 'Item Three', ontap: 'next4'},
						{kind: Item, content: 'Item Four', ontap: 'next4'},
						{kind: Item, content: 'Item Five', ontap: 'next4'},
						{kind: DayPicker, noneText: 'Pick a Day', content: 'Day Picker'},
						{name: 'basicPopup', kind: Popup, content: 'Popup...'},
						{name: 'directPopup', kind: Popup, autoDismiss: false, components: [
							{content: 'Direct Popup'},
							{kind: Button, content: 'Hide Direct', ontap: 'hidePopup', popup: 'directPopup', direct: true}
						]}
					]},
					{title: 'Fifth', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
						{kind: Item, content: 'Item One', ontap: 'next5'},
						{kind: Item, content: 'Item Two', ontap: 'next5'},
						{kind: Item, content: 'Item Three', ontap: 'next5'},
						{kind: ExpandableListItem, content: 'Expandable ListItem', components: [
							{content: 'Item 1'},
							{content: 'Item 2'},
							{content: 'Item 3'}
						]},
						{kind: Item, content: 'Item Four', ontap: 'next5'},
						{kind: Item, content: 'Item Five', ontap: 'next5'}
					]},
					{title: 'Sixth', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', headerComponents: [
						//* List actions with default width
						{kind: ListActions, name: 'listActions', icon: 'drawer', proportionalWidth: true, listActions: [
							{action: 'category2', components: [
								{kind: Divider, content: 'Category 2 (DataList)'},
								{kind: DataList, name: 'list', fit: true, components: [
									{kind: CheckboxItem, bindings: [{from: '.model.name', to: '.content'}]}
								]}
							]},
							{action: 'category1', components: [
								{kind: Divider, content: 'Category 1 (DataRepeater)'},
								{kind: DataRepeater, containerOptions: {kind: Scroller, classes: 'enyo-fill'}, name: 'repeater', fit: true, components: [
									{kind: ToggleItem, bindings: [{from: '.model.name', to: '.content'}]}
								]}
							]}
						]}
					], components: [
						{kind: TimePicker, noneText: 'Pick a Date', content: 'Time Picker'},
						{kind: Item, content: 'Item One', ontap: 'next6'},
						{kind: Item, content: 'Item Two', ontap: 'next6'},
						{kind: Item, content: 'Item Three', ontap: 'next6'},
						{kind: Item, content: 'Item Four', ontap: 'next6'},
						{kind: Item, content: 'Item Five', ontap: 'next6'}
					]},
					{title: 'Seventh', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
						{kind: Item, content: 'Item One'},
						{kind: Item, content: 'Item Two'},
						{kind: Item, content: 'Item Three'},
						{kind: Item, content: 'Item Four'},
						{kind: Item, content: 'Item Five'},
						{kind: ExpandableIntegerPicker, autoCollapse: true, content: 'Integer Picker', value: 7, min: 3, max: 15, step: 1, unit: 'elephants'}
					]}
				]}
			]
		}
	],
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.$.list.set('collection', new Collection([
			{name: 'Red'},
			{name: 'White'},
			{name: 'Blue'},
			{name: 'Black'}
		]));
		this.$.repeater.set('collection', new Collection([
			{name: 'Santa Clara'},
			{name: 'San Francisco'},
			{name: 'Seoul'}
		]));
	},
	rendered: function () {
		Control.prototype.rendered.apply(this, arguments);
		Spotlight.spot(this.$.panels);
	},
	// custom next handler for each panel to avoid switching from one active panel
	// to another with no visible change for demo
	next1: function (sender, ev) {
		this.$.panels.setIndex(1);
		return true;
	},
	next2: function (sender, ev) {
		this.$.panels.setIndex(2);
		return true;
	},
	next3: function (sender, ev) {
		this.$.panels.setIndex(3);
		return true;
	},
	next4: function (sender, ev) {
		this.$.panels.setIndex(4);
		return true;
	},
	next5: function (sender, ev) {
		this.$.panels.setIndex(5);
		return true;
	},
	next6: function (sender, ev) {
		this.$.panels.setIndex(6);
		return true;
	},
	handleShowingChanged: function (sender, ev) {
		this.$.panels.setHandleShowing(sender.getChecked());
	},
	panelsShowingChanged: function (sender, ev) {
		// Hiding the VideoPlayer when it would be obscured by the Panels avoids UI performance
		// issues caused by the GPU being occupied rendering video frames that aren't visible.
		this.$.player.set('showing', !ev.showing);
	},
	showPopup: function (sender) {
		var p = this.$[sender.popup];
		if (p) {
			if(sender.direct) {
				p.showDirect();
			} else {
				p.show();
			}
		}
	},
	openMainDrawer: function () {
		this.$.openMoreButton.hide();
		this.$.partialDrawer.setOpen(true);
	},
	close: function () {
		if (this.$.partialDrawer.getOpen()) {
			this.$.openMoreButton.show();
			this.$.partialDrawer.setOpen(false);
		} else {
			this.$.partialDrawer.setControlsOpen(false);
		}
	}
});

module.exports.badgeClasses = 'new';

}],'index':[function (module,exports,global,require,request){
require('enyo/options').accessibility = true;

var
	ready = require('enyo/ready'),
	Sample = require('./src/All'),
	samples = {
		AccessibilitySample					: require('./src/AccessibilitySample'),
		AccordionSample						: require('./src/AccordionSample'),
		ActivityPanelsSample				: require('./src/ActivityPanelsSample'),
		ActivityPanelsWithVideoSample		: require('./src/ActivityPanelsWithVideoSample'),
		AlwaysViewingPanelsSample			: require('./src/AlwaysViewingPanelsSample'),
		AlwaysViewingPanelsWithVideoSample	: require('./src/AlwaysViewingPanelsWithVideoSample'),
		AnimatedButtonSample				: require('./src/AnimatedButtonSample'),
		AudioPlaybackSample					: require('./src/AudioPlaybackSample'),
		AudioPlaybackPlaylistSupportSample	: require('./src/AudioPlaybackPlaylistSupportSample'),
		BodyTextSample						: require('./src/BodyTextSample'),
		ButtonSample						: require('./src/ButtonSample'),
		CalendarSample						: require('./src/CalendarSample'),
		CheckboxItemSample					: require('./src/CheckboxItemSample'),
		ClockSample							: require('./src/ClockSample'),
		ContextualPopupSample				: require('./src/ContextualPopupSample'),
		DataGridListSample					: require('./src/DataGridListSample'),
		DataListSample						: require('./src/DataListSample'),
		DatePickerSample					: require('./src/DatePickerSample'),
		DialogSample						: require('./src/DialogSample'),
		DividerSample						: require('./src/DividerSample'),
		DrawerSample						: require('./src/DrawerSample'),
		DynamicPanelsSample					: require('./src/DynamicPanelsSample'),
		ExpandableDataPickerSample			: require('./src/ExpandableDataPickerSample'),
		ExpandableInputSample				: require('./src/ExpandableInputSample'),
		ExpandableListItemSample			: require('./src/ExpandableListItemSample'),
		ExpandablePickerSample				: require('./src/ExpandablePickerSample'),
		ExpandableTextSample				: require('./src/ExpandableTextSample'),
		FontSample							: require('./src/FontSample'),
		FormCheckboxSample					: require('./src/FormCheckboxSample'),
		HeaderSample						: require('./src/HeaderSample'),
		HighlightTextSample					: require('./src/HighlightTextSample'),
		HistorySample						: require('./src/HistorySample'),
		IconButtonSample					: require('./src/IconButtonSample'),
		IconSample							: require('./src/IconSample'),
		ImageBadgeSample					: require('./src/ImageBadgeSample'),
		ImageItemSample						: require('./src/ImageItemSample'),
		ImageSample							: require('./src/ImageSample'),
		InputHeaderSample					: require('./src/InputHeaderSample'),
		InputSample							: require('./src/InputSample'),
		IntegerPickerSample					: require('./src/IntegerPickerSample'),
		ItemSample							: require('./src/ItemSample'),
		ItemOverlaySample					: require('./src/ItemOverlaySample'),
		LabeledTextItemSample				: require('./src/LabeledTextItemSample'),
		LightPanelsSample					: require('./src/LightPanelsSample'),
		ListActionsSample					: require('./src/ListActionsSample'),
		MarqueeSample						: require('./src/MarqueeSample'),
		NewDataListSample					: require('./src/NewDataListSample'),
		ObjectActionHorizontalTypeSample	: require('./src/ObjectActionHorizontalTypeSample'),
		ObjectActionVerticalTypeSample		: require('./src/ObjectActionVerticalTypeSample'),
		OverlaySample						: require('./src/OverlaySample'),
		PanelsVideoPlayerSample				: require('./src/PanelsVideoPlayerSample'),
		PanelsWithCardArrangerSample		: require('./src/PanelsWithCardArrangerSample'),
		PanelsWithCarouselArrangerSample	: require('./src/PanelsWithCarouselArrangerSample'),
		PopupSample							: require('./src/PopupSample'),
		ProgressButtonSample				: require('./src/ProgressButtonSample'),
		ProgressSample						: require('./src/ProgressSample'),
		RadioItemSample						: require('./src/RadioItemSample'),
		Scroller2dSample					: require('./src/Scroller2dSample'),
		ScrollerHorizontalSample			: require('./src/ScrollerHorizontalSample'),
		ScrollerTextSample					: require('./src/ScrollerTextSample'),
		ScrollerVerticalSample				: require('./src/ScrollerVerticalSample'),
		SelectableItemSample				: require('./src/SelectableItemSample'),
		SimpleIntegerPickerSample			: require('./src/SimpleIntegerPickerSample'),
		SimplePickerSample					: require('./src/SimplePickerSample'),
		SliderSample						: require('./src/SliderSample'),
		SpinnerSample						: require('./src/SpinnerSample'),
		TableSample							: require('./src/TableSample'),
		TimePickerSample					: require('./src/TimePickerSample'),
		ToggleButtonSample					: require('./src/ToggleButtonSample'),
		ToggleItemSample					: require('./src/ToggleItemSample'),
		TooltipSample						: require('./src/TooltipSample'),
		VideoPlayerInlineSample				: require('./src/VideoPlayerInlineSample'),
		VideoPlayerSample					: require('./src/VideoPlayerSample')
	};

Sample.samples = samples;

ready(function() {
	new Sample().renderInto(document.body);
});


},{'./src/All':'src/All','./src/AccessibilitySample':'src/AccessibilitySample','./src/AccordionSample':'src/AccordionSample','./src/ActivityPanelsSample':'src/ActivityPanelsSample','./src/ActivityPanelsWithVideoSample':'src/ActivityPanelsWithVideoSample','./src/AlwaysViewingPanelsSample':'src/AlwaysViewingPanelsSample','./src/AlwaysViewingPanelsWithVideoSample':'src/AlwaysViewingPanelsWithVideoSample','./src/AnimatedButtonSample':'src/AnimatedButtonSample','./src/AudioPlaybackSample':'src/AudioPlaybackSample','./src/AudioPlaybackPlaylistSupportSample':'src/AudioPlaybackPlaylistSupportSample','./src/BodyTextSample':'src/BodyTextSample','./src/ButtonSample':'src/ButtonSample','./src/CalendarSample':'src/CalendarSample','./src/CheckboxItemSample':'src/CheckboxItemSample','./src/ClockSample':'src/ClockSample','./src/ContextualPopupSample':'src/ContextualPopupSample','./src/DataGridListSample':'src/DataGridListSample','./src/DataListSample':'src/DataListSample','./src/DatePickerSample':'src/DatePickerSample','./src/DialogSample':'src/DialogSample','./src/DividerSample':'src/DividerSample','./src/DrawerSample':'src/DrawerSample','./src/DynamicPanelsSample':'src/DynamicPanelsSample','./src/ExpandableDataPickerSample':'src/ExpandableDataPickerSample','./src/ExpandableInputSample':'src/ExpandableInputSample','./src/ExpandableListItemSample':'src/ExpandableListItemSample','./src/ExpandablePickerSample':'src/ExpandablePickerSample','./src/ExpandableTextSample':'src/ExpandableTextSample','./src/FontSample':'src/FontSample','./src/FormCheckboxSample':'src/FormCheckboxSample','./src/HeaderSample':'src/HeaderSample','./src/HighlightTextSample':'src/HighlightTextSample','./src/HistorySample':'src/HistorySample','./src/IconButtonSample':'src/IconButtonSample','./src/IconSample':'src/IconSample','./src/ImageBadgeSample':'src/ImageBadgeSample','./src/ImageItemSample':'src/ImageItemSample','./src/ImageSample':'src/ImageSample','./src/InputHeaderSample':'src/InputHeaderSample','./src/InputSample':'src/InputSample','./src/IntegerPickerSample':'src/IntegerPickerSample','./src/ItemSample':'src/ItemSample','./src/ItemOverlaySample':'src/ItemOverlaySample','./src/LabeledTextItemSample':'src/LabeledTextItemSample','./src/LightPanelsSample':'src/LightPanelsSample','./src/ListActionsSample':'src/ListActionsSample','./src/MarqueeSample':'src/MarqueeSample','./src/NewDataListSample':'src/NewDataListSample','./src/ObjectActionHorizontalTypeSample':'src/ObjectActionHorizontalTypeSample','./src/ObjectActionVerticalTypeSample':'src/ObjectActionVerticalTypeSample','./src/OverlaySample':'src/OverlaySample','./src/PanelsVideoPlayerSample':'src/PanelsVideoPlayerSample','./src/PanelsWithCardArrangerSample':'src/PanelsWithCardArrangerSample','./src/PanelsWithCarouselArrangerSample':'src/PanelsWithCarouselArrangerSample','./src/PopupSample':'src/PopupSample','./src/ProgressButtonSample':'src/ProgressButtonSample','./src/ProgressSample':'src/ProgressSample','./src/RadioItemSample':'src/RadioItemSample','./src/Scroller2dSample':'src/Scroller2dSample','./src/ScrollerHorizontalSample':'src/ScrollerHorizontalSample','./src/ScrollerTextSample':'src/ScrollerTextSample','./src/ScrollerVerticalSample':'src/ScrollerVerticalSample','./src/SelectableItemSample':'src/SelectableItemSample','./src/SimpleIntegerPickerSample':'src/SimpleIntegerPickerSample','./src/SimplePickerSample':'src/SimplePickerSample','./src/SliderSample':'src/SliderSample','./src/SpinnerSample':'src/SpinnerSample','./src/TableSample':'src/TableSample','./src/TimePickerSample':'src/TimePickerSample','./src/ToggleButtonSample':'src/ToggleButtonSample','./src/ToggleItemSample':'src/ToggleItemSample','./src/TooltipSample':'src/TooltipSample','./src/VideoPlayerInlineSample':'src/VideoPlayerInlineSample','./src/VideoPlayerSample':'src/VideoPlayerSample'}]
	};

});
//# sourceMappingURL=moonstone-samples.js.map