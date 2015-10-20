var
	i18n = require('enyo/i18n'),
	kind = require('enyo/kind'),
	Collection = require('enyo/Collection'),
	DataRepeater = require('enyo/DataRepeater'),
	Router = require('enyo/Router');

var
	ilib = require('enyo-ilib');

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
	ToggleButton = require('moonstone/ToggleButton'),
	ToggleItem = require('moonstone/ToggleItem');

var
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
	updateTitle: function() {
		this.set('content', this.locale + ' ' + this.title);
	}
});

var appRouter = kind({
	kind: Router,
	useHistory: true,
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
		this.handleRoute({sampleName: null, locale: locale});
	}
});

var SampleListItem = kind({
	kind: Item,
	classes: 'moon-sample-list-item enyo-border-box',
	'new': false,
	mixins: [LinkSupport],
	create: function () {
		this.inherited(arguments);
		this.newChanged();
	},
	newChanged: function () {
		this.addRemoveClass('new', this.get('new'));
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
* enyo.kind({
*     name: 'moon.sample.ContextualPopupSample',
*     ...
* });
* ```
*
* @namespace moon.sample
*/
module.exports = kind({
	name: 'moon.sample.All',
	title: 'Moonstone Samples',
	classes: 'moon enyo-unselectable enyo-fit',
	themes: {
		'dark': 'moonstone-dark.css',
		'light': 'moonstone-light.css'
	},
	published: {
		sample: null,
		samples: null,
		locale: 'local',
		theme: 'dark',
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
				]},
				{kind: ToggleButton, toggleOffLabel: 'Dark Theme', toggleOnLabel: 'Light Theme', small: true, spotlight: false, ontap: 'handleThemeTap'}
			]}
		]},
		{name: 'home'},
		{name: 'router', kind: appRouter, history: true, triggerOnStart: true}
	],
	bindings: [
		{from: 'locales', to: '$.localeRepeater.collection'},
		{from: 'title', to: '$.listpanel.title'}
	],
	listTools: [
		{kind: Panels, pattern: 'activity', classes: 'enyo-fit', components: [
			{kind: Panel, name: 'listpanel', headerType: 'small',
				headerComponents: [
					{kind: Button, content: 'Back', small: true, href: 'index.html', mixins: [LinkSupport]}
				],
				components: [
					{name: 'list', kind: DataList, fixedChildSize: 63, components: [
						{kind: SampleListItem, bindings: [
							{from: 'model.new', to: 'new'},
							{from: 'model.label', to: 'content'},
							{from: 'model.name', to: 'href', transform: function (v) {
								return '#' + v;
							}}
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
	initComponents: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.themeNodeStore = {};
		};
	}),
	create: kind.inherit(function (sup) {
		return function () {
			this.locales = new Collection(locales);
			this.samples = this.samples || this.ctor.samples;
			sup.apply(this, arguments);

			this.initializeThemes();
		};
	}),
	createList: function () {
		var samples = this.get('samples'),
			sorted = Object.keys(samples).sort(),
			dataList = [];
		for (var i = 0; i < sorted.length; i++) {
			var sampleName = sorted[i],
				sample = samples[sampleName];
			dataList.push({sample: sample, name: sampleName, label: sampleName.replace(/(.*)Sample$/i, '$1'), 'new': sample['new']});
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
			window.location.href = 'index.html';
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
			global.sample = this.createComponent({name: s, kind: this.samples[s]}).render();
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
	// Theme detection and acquisition is not presently working and must be refactored to allow
	// integration with the modular system, but is left in as a reminder and a starting point.
	initializeThemes: function () {
		var i,
			theme = this.get('theme'),
			cs = document.getElementsByTagName('link');

		for (i = 0; i < cs.length; i++) {
			if (cs[i].href.indexOf(this.themes[theme]) > 0) {
				// Save our current theme's node
				this.themeNodeStore[theme] = cs[i];
				// Setup the other themes' nodes
				for (var t in this.themes) {
					if (t != theme) {
						// Generate the new theme paths based on the existing (found) theme path
						var tn = this.createNode('link', {
							href: cs[i].href.replace(this.themes[theme], this.themes['light']),
							rel: 'stylesheet',
							disabled: true
						});
						// Add it to the store and append to the head, already disabled
						this.themeNodeStore[t] = tn;
						this.appendToHead(tn);
					}
				}
				return this.themeNodeStore[theme];
			}
		}
	},
	themeChanged: function (oldTheme, newTheme) {
		if (this.themeNodeStore[oldTheme]) { this.themeNodeStore[oldTheme].disabled = true; }
		if (this.themeNodeStore[newTheme]) { this.themeNodeStore[newTheme].disabled = false; }
	},
	handleThemeTap: function (sender, ev) {
		this.set('theme', ev.originator.owner.get('value') ? 'light' : 'dark');
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
		if (ilib && ilib.getLocale() != this.locale) {
			this.localeChanged(ilib.getLocale(), this.locale);
		}
	}
});