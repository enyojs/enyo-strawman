var
	dispatcher = require('enyo/dispatcher'),
	i18n = require('enyo/i18n'),
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

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
		{name: 'channelId', classes: 'channel-id'},
    	{name: 'cursor', classes: 'cursor', tag: 'img', attributes: {src: 'https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/43894/cursor-1421191312@2x.png'}},
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
			this.startPairing();
			sup.apply(this, arguments);
		};
	}),
	startPairing: function () {
	  var tvPeer = new Peer(String(utils.irand(9000)+1000), {key: 's2iygrooxakedn29'});
	  tvPeer.on('open', function (id) {
	    this.$.channelId.set('content', id);
	    this.log('ready to connnect to', id);
	  }.bind(this));
	  
	  // Wait for a connection from the second peer.
	  tvPeer.on('connection', function (connection) {
	    // This `connection` is a DataConnection object with which we can send
	    // data.
	    // The `open` event firing means that the connection is now ready to
	    // transmit data.
	    connection.on('open', function() {
	      this.$.channelId.hide();
	    }.bind(this));
	    
	    var px = null, py = null;


		function dispatch (name, ev, t) {
			var target, e;
			if (px !== null && py !== null) {
				target = t || document.elementFromPoint(px-1, py-1) || document;

				e = utils.mixin(ev || {}, {
					target: target,
					type: name,
					clientX: px,
					clientY: py,
					preventDefault: function () {}
				});

				dispatcher.dispatch(e);

				return target;
			}
		}


    	function isInput (active) {
    		var control;
			if (active) {
				control = dispatcher.$[active.id];
				if (control && control.value !== undefined) {
					return control;
				}
			}
		}

	    // The `data` event is fired when data is received on the connection.
	    connection.on('data', function(data) {
	    	var control,
	    		active = document.activeElement,
	    		cursor = this.$.cursor;

			if(data.type == 'cursor') {
				px = data.px;
				py = data.py;
				cursor.applyStyle('top', py + 'px');
				cursor.applyStyle('left', px + 'px');
				dispatch('mousemove');
			}
			else if (data.type == 'click') {
				dispatch('mousedown', {which: 1});
				active = dispatch('mouseup', {which: 1});

				if (isInput(active)) active.focus();
			}
			else if (data.type == 'text') {
				control = isInput(active);
				if (control) {
					control.set('value', data.text);
					dispatch('input', null, active);
				}
			}
	    }.bind(this));
	  }.bind(this));
	},

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
})
