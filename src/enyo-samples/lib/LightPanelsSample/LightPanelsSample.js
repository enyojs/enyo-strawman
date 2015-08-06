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
				{kind: Checkbox, name: 'animateHorizontal', content: 'Animate'}
			]},
			{classes: 'vertical-options', components: [
				{kind: Checkbox, name: 'cachingVertical', content: 'Cache'},
				{kind: Checkbox, name: 'multipleVertical', content: 'Multi'},
				{kind: Checkbox, name: 'animateVertical', content: 'Animate'}
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
		{from: '$.cachingVertical.checked', to: '$.lightVertical.cacheViews'},
		{from: '$.multipleVertical.checked', to: 'multipleVertical'},
		{from: '$.animateVertical.checked', to: '$.lightVertical.animate'}
	],
	rendered: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.pushSinglePanel(this.$.lightHorizontal);
			this.pushSinglePanel(this.$.lightVertical);
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
	pushMultiplePanels: function (panels) {
		panels.pushPanels([
			{
				classes: 'light-panel',
				panelId: 'panel-' + panels.getPanels().length,
				style: 'background-color: ' + this.bgcolors[Math.floor(Math.random() * this.bgcolors.length)],
				components: [
					{content: panels.getPanels().length, classes: 'label'},
					{content: 'Prev', kind: Button, classes: 'previous', ontap: 'prevTapped'},
					{content: 'Next', kind: Button, classes: 'next', ontap: 'nextTapped'}
				]
			},
			{
				classes: 'light-panel',
				panelId: 'panel-' + (panels.getPanels().length + 1),
				style: 'background-color: ' + this.bgcolors[Math.floor(Math.random() * this.bgcolors.length)],
				components: [
					{content: panels.getPanels().length + 1, classes: 'label'},
					{content: 'Prev', kind: Button, classes: 'previous', ontap: 'prevTapped'},
					{content: 'Next', kind: Button, classes: 'next', ontap: 'nextTapped'}
				]
			},
			{
				classes: 'light-panel',
				panelId: 'panel-' + (panels.getPanels().length + 2),
				style: 'background-color: ' + this.bgcolors[Math.floor(Math.random() * this.bgcolors.length)],
				components: [
					{content: panels.getPanels().length + 2, classes: 'label'},
					{content: 'Prev', kind: Button, classes: 'previous', ontap: 'prevTapped'},
					{content: 'Next', kind: Button, classes: 'next', ontap: 'nextTapped'}
				]
			}
		], {owner: this});
	},
	prevTapped: function (sender, ev) {
		var panels = ev.originator.parent.parent;
		panels.previous();
		return true;
	},
	nextTapped: function (sender, ev) {
		var panels = ev.originator.parent.parent;
		if ((panels.name == 'lightHorizontal' && this.multipleHorizontal) || (panels.name == 'lightVertical' && this.multipleVertical)) {
			this.pushMultiplePanels(panels);
		} else {
			this.pushSinglePanel(panels);
		}
		return true;
	},
	bgcolors: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
});
