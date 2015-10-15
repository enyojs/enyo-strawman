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
