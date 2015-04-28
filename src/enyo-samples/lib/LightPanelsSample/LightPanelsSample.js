var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	Control = require('enyo/Control'),
	LightPanels = require('enyo/LightPanels');

module.exports = kind({
	name: 'enyo.sample.LightPanelsSample',
	classes: 'light-panels-sample',
	kind: Control,
	components: [
		{kind: LightPanels, name: 'lightHorizontal'},
		{kind: LightPanels, name: 'lightVertical', orientation: 'vertical'}
	],
	rendered: function () {
		this.inherited(arguments);
		this.pushSinglePanel(this.$.lightHorizontal);
		this.pushSinglePanel(this.$.lightVertical);
	},
	pushSinglePanel: function (panels) {
		panels.pushPanels([{
			classes: 'light-panel',
			style: 'background-color: ' + this.bgcolors[Math.floor(Math.random() * this.bgcolors.length)],
			components: [
				{content: panels.getPanels().length, classes: 'label'},
				{content: 'Prev', kind: Button, classes: 'previous', ontap: 'prevTapped'},
				{content: 'Next', kind: Button, classes: 'next', ontap: 'nextTapped'}
			]
		}], {owner: this});
	},
	prevTapped: function (sender, ev) {
		ev.originator.parent.parent.previous();
		return true;
	},
	nextTapped: function (sender, ev) {
		this.pushSinglePanel(ev.originator.parent.parent);
		return true;
	},
	bgcolors: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
});
