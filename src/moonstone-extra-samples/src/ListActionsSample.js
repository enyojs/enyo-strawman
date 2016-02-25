var
	kind = require('enyo/kind'),
	Collection = require('enyo/Collection'),
	DataRepeater = require('enyo/DataRepeater'),
	Group = require('enyo/Group');

var
	BodyText = require('moonstone/BodyText'),
	Button = require('moonstone/Button'),
	CheckboxItem = require('moonstone/CheckboxItem'),
	DataList = require('moonstone/DataList'),
	Divider = require('moonstone/Divider'),
	ListActions = require('moonstone/ListActions'),
	Panel = require('moonstone-extra/Panel'),
	Panels = require('moonstone-extra/Panels'),
	Scroller = require('moonstone/Scroller'),
	SelectableItem = require('moonstone/SelectableItem'),
	ToggleButton = require('moonstone/ToggleButton'),
	ToggleItem = require('moonstone/ToggleItem'),
	Tooltip = require('moonstone/Tooltip'),
	TooltipDecorator = require('moonstone/TooltipDecorator');

module.exports = kind({
	name: 'moon.sample.ListActionsSample',
	kind: Panels,
	pattern: 'activity',
	classes: 'moon enyo-unselectable enyo-fit',
	handlers: {
		onActivate: 'activateHandler'
	},
	components: [
		{kind: Panel, headerType: 'medium', title: 'List Actions Sample', headerComponents: [
			{name: 'disabledListAction', kind: ListActions, iconSrc: '@../../src/moonstone-samples/assets/icon-list.png', listActions: [
				{components: [
					{kind: Divider, content: 'divider 1'},
					{kind: Scroller, defaultKind: CheckboxItem, components: [
						{content: 'item 1'},
						{content: 'item 2'},
						{content: 'item 3'}
					]}
				]}
			]},
			{kind: TooltipDecorator, components: [
				{kind: Tooltip, position: 'above', content: 'Test Dynamic Lists'},

				//* List actions with default width
				{kind: ListActions, name: 'listActions', icon: 'drawer', listActions: [
					{action: 'category3', components: [
						{kind: Divider, content: 'Category 3 (DataList)'},
						{kind: DataList, name: 'list', fit:true, components: [
							{kind: CheckboxItem, bindings: [{from: '.model.name', to: '.content'}]}
						]}
					]},
					{action: 'category2', components: [
						{kind: Divider, content: 'Category 2 (DataRepeater)'},
						{kind: DataRepeater, containerOptions:{kind: Scroller, classes: 'enyo-fill'}, name: 'repeater', fit:true, components: [
							{kind: ToggleItem, bindings: [{from: '.model.name', to: '.content'}]}
						]}
					]},
					{action: 'category1', components: [
						{kind: Divider, content: 'Category 1 (Static)'},
						{kind: Scroller, fit: true, components: [
							{kind: Group, name: 'group', highlander: true, defaultKind: SelectableItem, components: [
								{content: 'Just Released'},
								{content: 'Recommended'},
								{content: 'Top Rated'}
							]}
						]}
					]}
				]}
			]},
			{kind: ListActions, icon: 'search', backgroundOpacity: 'translucent', listActions: [
				{action: 'one', components: [
					{kind: Divider, content: 'divider 1 (7 items)'},
					{kind: Scroller, fit: true, defaultKind: CheckboxItem, components: [
						{content: 'item 1'},
						{content: 'item 2'},
						{content: 'item 3'},
						{content: 'item 4'},
						{content: 'item 5'},
						{content: 'item 6'},
						{content: 'item 7'}
					]}
				]},
				{action: 'two', components: [
					{kind: Divider, content: 'divider 2'},
					{kind: Scroller, fit: true, defaultKind: SelectableItem, components: [
						{content: 'item 1'},
						{content: 'item 2'},
						{content: 'item 3'},
						{content: 'item 4'},
						{content: 'item 5'}
					]}
				]},
				{action: 'three', components: [
					{kind: Divider, content: 'divider 3'},
					{kind: Scroller, fit: true, defaultKind: ToggleItem, components: [
						{content: 'item 1'},
						{content: 'item 2'}
					]}
				]}
			]},
			{kind: ListActions, icon: 'denselist', actionWidthClasses: 'moon-4h', listActions: [
				{action: 'Cost', components: [
					{kind: Divider, content: 'Cost'},
					{kind: Scroller, defaultKind: ToggleItem, fit: true, components: [
						{content: '$'},
						{content: '$$'},
						{content: '$$$'}
					]}
				]},
				{action: 'Flavor', components: [
					{kind: Divider, content: 'Flavor'},
					{kind: Scroller, defaultKind: CheckboxItem, fit: true, components: [
						{content: 'Spicy'},
						{content: 'Sweet'},
						{content: 'Sour'},
						{content: 'Salty', checked: true},
						{content: 'Savory'},
						{content: 'Bland'},
						{content: 'Umami'},
						{content: 'Bitter'}
					]}
				]}
			]}
		], components: [
			{components: [
				{kind: Divider, content: 'Add Option to:'},
				{kind: Button, small:true, content: 'Category 1', ontap: 'addToStatic'},
				{kind: Button, small:true, content: 'Category 2', ontap: 'addToRepeater'},
				{kind: Button, small:true, content: 'Category 3', ontap: 'addToList'},
				{classes: 'moon-2v'},
				{kind: Divider, content: 'ListActions Modifications'},
				{kind: Button, small:true, content: 'Breadcrumb Panel', ontap: 'toggleBreadcrumb'},
				{kind: ToggleButton, small: true, toggleOnLabel: 'Header Type: Small', toggleOffLabel: 'Header Type: Medium', ontap: 'toggleHeaderSize'},
				{name: 'toggleDisabledListActions', kind: ToggleButton, small: true, toggleOnLabel: 'ListActions: Disabled', toggleOffLabel: 'ListActions: Enabled', value: true}
			]},
			{fit: true},
			{kind: Divider, content: 'List Action Event'},
			{kind: BodyText, name: 'console', content: 'Event'}
		]},
		{kind: Panel, title: 'Header', components: [
			{kind: Button, small:true, content: 'Go Back', ontap: 'toggleBreadcrumb'}
		]}
	],
	bindings: [
		{from: '$.toggleDisabledListActions.value', to: '$.disabledListAction.disabled'}
	],
	activateHandler: function (sender, ev) {
		if (ev && ev.action) {
			if (ev.originator instanceof SelectableItem) {
				this.$.console.setContent(
					ev.action + ': ' +
					ev.originator.getContent() + ' was ' +
					(ev.originator.getSelected() ? 'selected' : 'unselected')
				);
			} else {	// moon.CheckboxItem or moon.ToggleItem
				this.$.console.setContent(
					ev.action + ': ' +
					ev.toggledControl.getContent() + ' was ' +
					(ev.originator.getChecked() ? 'selected' : 'unselected')
				);
			}
		}

		// Log the active state of the ListAction drawer
		if (ev.originator instanceof ListActions) {
			this.$.console.setContent(ev.originator.name + ' is now ' + (ev.originator.getOpen() ? 'open' : 'closed'));
		}
	},
	addToStatic: function () {
		this.optionNumber = (this.optionNumber || 0) + 1;
		this.$.group.createComponent({content: 'Option ' + this.optionNumber}).render();
	},
	addToList: function () {
		this.optionNumber = (this.optionNumber || 0) + 1;
		this.$.list.collection.add({name: 'Option ' + this.optionNumber});
	},
	addToRepeater: function () {
		this.optionNumber = (this.optionNumber || 0) + 1;
		this.$.repeater.collection.add({name: 'Option ' + this.optionNumber});
	},
	toggleBreadcrumb: function () {
		this.setIndex(this.getIndex() > 0 ? 0 : 1);
	},
	toggleHeaderSize: function () {
		this.getActive().setHeaderType(this.getActive().getHeaderType() == 'small' ? 'medium': 'small');
	},
	create: function () {
		Panels.prototype.create.apply(this, arguments);
		this.$.list.set('collection', new Collection([
			{name: 'SAT 1'},
			{name: 'SAT 2'},
			{name: 'SAT 3'},
			{name: 'OTHER S1'},
			{name: 'OTHER S2'}
		]));
		this.$.repeater.set('collection', new Collection([
			{name: 'Comedy'},
			{name: 'Action'},
			{name: 'Drama'},
			{name: 'Family'},
			{name: 'Fantasy'},
			{name: 'Science Fiction'}
		]));
	}
});

module.exports.badgeClasses = 'new';
