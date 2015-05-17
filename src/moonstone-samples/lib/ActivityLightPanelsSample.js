var
	kind = require('enyo/kind');

var
	Item = require('moonstone/Item'),
	Panels = require('moonstone/LightPanels'),
	Breadcrumb = require('moonstone-extra/BreadcrumbSupport'),
	Scroller = require('moonstone/Scroller'),
	ToggleButton = require('moonstone/ToggleButton');

module.exports = kind({
	name: 'moon.sample.ActivityLightPanelsSample',
	classes: 'moon enyo-fit enyo-unselectable',
	components: [
		{name: 'panels', kind: Panels, pattern: 'activity', mixins: [Breadcrumb.Support], popOnBack: false, popOnForward: false, classes: 'enyo-fit', components: [
			{title: 'First Panel', titleBelow:'Sub-title', subTitleBelow:'Sub-sub title', headerComponents: [
				{kind: ToggleButton, small:true, content:'Medium', name:'mediumHeaderToggle', ontap: 'typeTapped'},
				{kind: ToggleButton, small:true, content:'Small', name:'smallHeaderToggle', ontap: 'typeTapped'}
			], components: [
				{kind: Scroller, fit:true, components: [
					{kind: Item, content: 'Item One', ontap: 'next'},
					{kind: Item, content: 'Item Two', ontap: 'next'},
					{kind: Item, content: 'Item Three', ontap: 'next'},
					{kind: Item, content: 'Item Four', ontap: 'next'},
					{kind: Item, content: 'Item Five', ontap: 'next'},
					{kind: Item, content: 'Item Six', ontap: 'next'},
					{kind: Item, content: 'Item Seven', ontap: 'next'},
					{kind: Item, content: 'Item Eight', ontap: 'next'},
					{kind: Item, content: 'Item Nine', ontap: 'next'},
					{kind: Item, content: 'Item Eleven', ontap: 'next'},
					{kind: Item, content: 'Item Twelve', ontap: 'next'},
					{kind: Item, content: 'Item Thirteen', ontap: 'next'},
					{kind: Item, content: 'Item Fourteen', ontap: 'next'},
					{kind: Item, content: 'Item Fifteen', ontap: 'next'},
					{kind: Item, content: 'Item Sixteen', ontap: 'next'},
					{kind: Item, content: 'Item Seventeen', ontap: 'next'},
					{kind: Item, content: 'Item Eighteen', ontap: 'next'},
					{kind: Item, content: 'Item Nineteen', ontap: 'next'},
					{kind: Item, content: 'Item Twenty', ontap: 'next'}
				]}
			]},
			{title: 'Second Panel', defaultSpotlightControl: 'defaultControl', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{name: 'defaultControl', kind: Item, content: 'Item Three (default focus for panel)', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Third Panel', titleBelow:'Type \'go\' to transition', headerOptions: {inputMode:true}, onInputHeaderChange:'inputChanged', subTitleBelow:'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Fourth', titleBelow:'Sub-title', subTitleBelow:'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Fifth', titleBelow:'Sub-title', subTitleBelow:'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
			{title: 'Sixth Panel with a very long title', titleBelow:'Sub-title', subTitleBelow:'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
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
	next: function(inSender, inEvent) {
		this.$.panels.next();
		return true;
	},
	inputChanged: function(inSender, inEvent) {
		if (inEvent.originator.getValue() == 'go') {
			this.next();
		}
	},
	typeTapped: function(inSender, inEvent) {
		var i,
			val = inSender.get('value'),
			buttonType = inSender.content.toLowerCase(),
			types = ['large', 'medium', 'small'];

		// If our button was `true`, use that type, otherwise revert to large.
		this.$.panels.getPanels()[0].set('headerType', val ? buttonType.toLowerCase() : types[0]);
		// Unset all other buttons
		for (i = 0; i < types.length; i++) {
			if (buttonType != types[i] && this.$[types[i] + 'HeaderToggle']) {
				this.$[types[i] + 'HeaderToggle'].set('value', false);
			}
		}
	}
});
