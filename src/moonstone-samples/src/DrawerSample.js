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
									{content: 'Music',value: '@../assets/drawer_icon.png'},
									{content: 'LG', value: '@../assets/lg.png'},
									{content: 'HTML5', value: '@../assets/html5.png'},
									{content: 'CSS3', value: '@../assets/css3.png'},
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