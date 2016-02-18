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