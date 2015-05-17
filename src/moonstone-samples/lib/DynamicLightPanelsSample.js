var
	kind = require('enyo/kind'),
	Repeater = require('enyo/Repeater');

var
	Divider = require('moonstone/Divider'),
	Item = require('moonstone/Item'),
	ListActions = require('moonstone/ListActions'),
	Panels = require('moonstone/LightPanels'),
	Breadcrumb = require('moonstone-extra/BreadcrumbSupport'),
	Scroller = require('moonstone/Scroller'),
	Tooltip = require('moonstone/Tooltip'),
	TooltipDecorator = require('moonstone/TooltipDecorator');

module.exports = kind({
	name: 'moon.sample.DynamicLightPanelsSample',
	classes: 'moon enyo-fit enyo-unselectable',
	components: [
		{name: 'panels', kind: Panels, mixins: [Breadcrumb.Support], popOnForward:true, popOnBack:true, wrap: true, pattern: 'activity', classes: 'enyo-fit'}
	],
	rendered: function () {
		this.inherited(arguments);
		this.pushSinglePanel();
	},
	pushSinglePanel: function() {
		this.$.panels.pushPanels([
			{
				title: 'Panel ' + this.$.panels.getPanels().length, titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
				{kind: Scroller, fit:true, components: [
					{kind: Repeater, count: 30, components: [
						{kind: Item, content: 'Dummy Item', ontap: 'next'}
					]}
				]}
			], headerComponents: [
				{kind: TooltipDecorator, components: [
					{kind: Tooltip, position: 'above', content: 'Test Dynamic Lists'},
					{kind: ListActions, icon: 'drawer', listActions: [
						{action: 'category3', components: [
							{kind: Divider, content: 'Dynamic List Action'},
							{kind: Item, content: 'Dummy Item 1'},
							{kind: Item, content: 'Dummy Item 2'}
						]}
					]}
				]}
			]}
		], {owner: this});
	},
	next: function() {
		var index = this.$.panels.getIndex();
		var length = this.$.panels.getPanels().length;
		if (index < (length-1)) {
			this.$.panels.next();
		} else {
			this.pushSinglePanel();
		}
	}
});
