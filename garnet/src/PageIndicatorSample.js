require('garnet');

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),
	Panel = require('garnet/Panel'),
	PanelSet = require('garnet/PanelSet');

module.exports = kind({
	name: 'g.sample.PageIndicatorSample',
	classes: 'enyo-unselectable garnet g-sample',
	components: [
		{content: '< Page Indicator Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'auto page indicator value', classes: 'g-sample-subheader'},
		{
			name: 'panelSet',
			kind: PanelSet,
			pageIndicator: true,
			effect: 'depth-transition',
			style: 'position: relative; background-color: #000000; height: ' + ri.scale(320) + 'px;',
			components: [
				{name: 'panel1', kind: Panel, title : true, titleContent: 'One', components: [
					{content: 'Panel 1', classes: 'enyo-fit g-layout-text-center',style: 'padding-top: ' + ri.scale(150) + 'px;  margin: auto;'}
				]},
				{name: 'panel2', kind: Panel, title : true, titleContent: 'Two', components: [
					{content: 'Panel 2', classes: 'enyo-fit g-layout-text-center',style: 'padding-top: ' + ri.scale(150) + 'px;  margin: auto;'}
				]},
				{name: 'panel3', kind: Panel, title : true, titleContent: 'Three', components: [
					{content: 'Panel 3', classes: 'enyo-fit g-layout-text-center',style: 'padding-top: ' + ri.scale(150) + 'px;  margin: auto;'}
				]},
				{name: 'panel4', kind: Panel, title : true, titleContent: 'Four', components: [
					{content: 'Panel 4', classes: 'enyo-fit g-layout-text-center',style: 'padding-top: ' + ri.scale(150) + 'px;  margin: auto;'}
				]}
			]
		},

		{content: 'manual page indicator value', classes: 'g-sample-subheader'},
		{
			name: 'panelSet2',
			kind: PanelSet,
			pageIndicator: true,
			pageIndicatorValue: 0,
			pageIndicatorMax: 2,
			autoPageIndicatorControl: false,
			effect: 'depth-transition',
			style: 'position: relative; background-color: #000000; height: ' + ri.scale(320) + 'px;',
			handlers: {
				ondragfinish: 'back'
			},
			components: [
				{name: 'panel5', kind: Panel, enablePanelMoveEvent: false, title : true, titleContent: 'One',components: [
					{content: 'Panel 1', classes: 'enyo-fit g-layout-text-center',style: 'padding-top: ' + ri.scale(150) + 'px;  margin: auto;'}
				]},
				{name: 'panel6', kind: Panel, enablePanelMoveEvent: false, title : true, titleContent: 'Two',components: [
					{content: 'Panel 2', classes: 'enyo-fit g-layout-text-center',style: 'padding-top: ' + ri.scale(150) + 'px;  margin: auto;'}
				]},
				{name: 'panel7', kind: Panel, enablePanelMoveEvent: false, pageIndicatorDisable: true, title : true, titleContent: 'No indicator', components: [
					{content: 'Panel 3', classes: 'enyo-fit g-layout-text-center',style: 'padding-top: ' + ri.scale(150) + 'px;  margin: auto;'}
				]}
			],
			back: function(inSender, inEvent) {
				if (this.index < 2 && inEvent.xDirection === -1) { // previous
					this.setIndex(this.index + 1);
					this.setPageIndicatorValue(1);
				} else if (this.index > 0 && inEvent.xDirection === 1) { // next
					this.setIndex(this.index - 1);
					this.setPageIndicatorValue(this.index);
				}
			}
		},

		{content: ': Drag a panel to the left or to the right.', classes: 'g-sample-description'}
	],
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});
