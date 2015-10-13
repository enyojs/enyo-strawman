var
	kind = require('enyo/kind');

var
	Control = require('enyo/Control');

var
	Button = require('sunstone/Button'),
	CheckboxItem = require('sunstone/CheckboxItem'),
	LightPanels = require('sunstone/LightPanels');

module.exports = kind({
	name: 'sun.sample.LightPanelsSample',
	classes: 'sun-light-panels-sample enyo-unselectable',
	kind: Control,
	components: [
		{classes: 'sun-light-panels-options', components: [
			{classes: 'options', components: [
				{kind: CheckboxItem, name: 'cachingHorizontal', content: "Cache"},
				{kind: CheckboxItem, name: 'animateHorizontal', content: "Animate"}
			]}
		]},
		{classes: 'light-panels-set', components: [
			{kind: LightPanels, name: 'lightHorizontal'}
		]}
	],
	bindings: [
		{from: '$.cachingHorizontal.checked', to: '$.lightHorizontal.cacheViews'},
		{from: '$.animateHorizontal.checked', to: '$.lightHorizontal.animate'}
	],
	rendered: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.pushSinglePanel(this.$.lightHorizontal);
		};
	}),
	pushSinglePanel: function (panels) {
		panels.pushPanel({
			classes: 'light-panel',
			panelId: 'panel-' + panels.getPanels().length,
			style: 'background-color: ' + this.bgcolors[Math.floor(Math.random() * this.bgcolors.length)],
			components: [
				{content: panels.getPanels().length, classes: 'label'},
				{content: 'Prev', kind: Button, classes: 'previous', ontap: 'prevTapped'},
				{content: 'Next', kind: Button, classes: 'next', ontap: 'nextTapped'}
			]
		}, {owner: this});
	},
	prevTapped: function (sender, ev) {
		var panels = this.$.lightHorizontal;
		panels.previous();
		return true;
	},
	nextTapped: function (sender, ev) {
		var panels = this.$.lightHorizontal;
		this.pushSinglePanel(panels);
		return true;
	},
	bgcolors: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
});
