var
	kind = require('enyo/kind');

var
	Collection = require('enyo/Collection'),
	Control = require('enyo/Control'),
	DataRepeater = require('enyo/DataRepeater'),
	Spotlight = require('spotlight'),
	Button = require('moonstone/Button'),
	ChannelInfo = require('moonstone/ChannelInfo'),
	CheckboxItem = require('moonstone/CheckboxItem'),
	Clock = require('moonstone/Clock'),
	ContextualPopup = require('moonstone/ContextualPopup'),
	ContextualPopupDecorator = require('moonstone/ContextualPopupDecorator'),
	DataList = require('moonstone/DataList'),
	DatePicker = require('moonstone/DatePicker'),
	DayPicker = require('moonstone/DayPicker'),
	Divider = require('moonstone/Divider'),
	Drawers = require('moonstone/Drawers'),
	ExpandableInput = require('moonstone/ExpandableInput'),
	ExpandableIntegerPicker = require('moonstone/ExpandableIntegerPicker'),
	ExpandableListItem = require('moonstone/ExpandableListItem'),
	ExpandablePicker = require('moonstone/ExpandablePicker'),
	IconButton = require('moonstone/IconButton'),
	Item = require('moonstone/Item'),
	ListActions = require('moonstone/ListActions'),
	Panel = require('moonstone/Panel'),
	Panels = require('moonstone/Panels'),
	Popup = require('moonstone/Popup'),
	Scroller = require('moonstone/Scroller'),
	TimePicker = require('moonstone/TimePicker'),
	ToggleItem = require('moonstone/ToggleItem'),
	VideoInfoBackground = require('moonstone/VideoInfoBackground'),
	VideoInfoHeader = require('moonstone/VideoInfoHeader'),
	VideoPlayer = require('moonstone-extra/VideoPlayer');

module.exports = kind({
	name: 'dmoon.sample.HistorySample',
	kind: Control,
	classes: 'moon enyo-fit enyo-unselectable',
	components: [
		{
			name: 'drawers',
			kind: Drawers,
			drawers: [
				{
					name: 'partialDrawer',
					open: false,
					controlsOpen: false,
					onActivate: 'partialDrawerChanged',
					onDeactivate: 'partialDrawerChanged',
					handle: {name: 'handleButton', content: 'Partial drawer with long text truncation'},
					components: [
						{kind: Panel, classes: 'enyo-fit', title: 'Partial Drawer', components: [
							{kind: Item, content: 'Item One'},
							{kind: Item, content: 'Item Two'}
						]}
					],
					controlDrawerComponents: [
						{classes: 'moon-hspacing', components: [
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
				{name: 'player', kind: VideoPlayer, src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', poster: '@../assets/video-poster.png', autoplay: true, showing: false, infoComponents: [
					{kind: VideoInfoBackground, orient: 'left', background: true, fit: true, components: [
						{
							kind: ChannelInfo,
							channelNo: '789-123',
							channelName: 'AMC',
							channelDesc: 'KRON-HD',
							channelMoreDesc: '4:30 - 5:30PM',
							components: [
								{content: 'DTV'},
								{content: 'Cinema'},
								{content: '3D'}
							]
						},
						{
							kind: VideoInfoHeader,
							title: 'Downton Abbey',
							uppercase: false,
							// Todo, we can remove below comment out after policy of samples is decided.
							// In latest tag like 2.6.0-pre.5, we don't have samples.
							// src: '$lib/moonstone/samples/assets/default-music.png',
							description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
						}
					]},
					{kind: VideoInfoBackground, orient: 'right', background: true, components: [
						{kind: Clock}
					]}
				], components: [
					{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
					{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
					{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
					{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
					{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
					{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
					{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
					{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
					{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
					{kind: IconButton, small: false, backgroundOpacity: 'translucent'}
				]},
				{name: 'panels', kind: Panels, pattern: 'activity', classes: 'enyo-fit', useHandle: true, onShowingChanged: 'panelsShowingChanged', components: [
					{title: 'First Panel', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
						{kind: Item, content: 'Item One', ontap: 'next1'},
						{kind: Item, content: 'Item Two', ontap: 'next1'},
						{kind: Item, content: 'Item Three', ontap: 'next1'},
						{kind: Item, content: 'Item Four', ontap: 'next1'},
						{kind: DatePicker, noneText: 'Pick a Date', content: 'Date Picker'},
						{kind: ToggleItem, content: 'Show/Hide Side Handle', checked: true,  onchange: 'handleShowingChanged'}
					]},
					{title: 'Second Panel', components: [
						{kind: ExpandablePicker, noneText: 'Nothing selected', content: 'Expandable Picker', allowHtml:true, components: [
							{content: 'English'},
							{content: 'Spanish'},
							{content: 'French'},
							{content: 'German'},
							{content: 'Italian'},
							{content: 'Japanese'},
							{content: 'Symbols <span style=\'color:orange;\'>&#x2620; &#x2764; &#x2619;</span>', allowHtml:true}
						]},
						{kind: Item, content: 'Item One', ontap: 'next2'},
						{kind: Item, content: 'Item Two', ontap: 'next2'},
						{kind: Item, content: 'Item Three', ontap: 'next2'},
						{kind: Item, content: 'Item Four', ontap: 'next2'},
						{kind: Item, content: 'Item Five', ontap: 'next2'}
					]},
					{title: 'Third Panel', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
						{kind: Item, content: 'Item One', ontap: 'next3'},
						{kind: Item, content: 'Item Two', ontap: 'next3'},
						{kind: Item, content: 'Item Three', ontap: 'next3'},
						{kind: ExpandablePicker, content: 'Non-auto-collapsing', autoCollapseOnSelect: false, components: [
							{content: 'Item 1'},
							{content: 'Item 2', active: true},
							{content: 'Item 3'}
						]},
						{kind: ExpandableInput, noneText: 'Enter text', content: 'Expandable Input', placeholder: 'Enter text'},
						{kind: Item, content: 'Item Four', ontap: 'next3'},
						{kind: Item, content: 'Item Five', ontap: 'next3'}
					]},
					{title: 'Fourth', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', headerComponents: [
						{kind: Button, content: 'Basic Popup', ontap: 'showPopup', popup: 'basicPopup'},
						{kind: ContextualPopupDecorator, components: [
							{content: 'ContextualPopup'},
							{kind: ContextualPopup, classes: 'moon-2h moon-8v', components: [
								{content: 'Item 1'},
								{content: 'Item 2'},
								{content: 'Item 3'}
							]}
						]},
						{kind: ContextualPopupDecorator, components: [
							{content: 'ContextualPopup'},
							{kind: ContextualPopup, classes: 'moon-2h moon-8v', components: [
								{content: 'Item 1'},
								{content: 'Item 2'},
								{content: 'Item 3'}
							]}
						]}
					], components: [
						{kind: Item, content: 'Item One', ontap: 'next4'},
						{kind: Item, content: 'Item Two', ontap: 'next4'},
						{kind: Item, content: 'Item Three', ontap: 'next4'},
						{kind: Item, content: 'Item Four', ontap: 'next4'},
						{kind: Item, content: 'Item Five', ontap: 'next4'},
						{kind: DayPicker, noneText: 'Pick a Day', content: 'Day Picker'},
						{name: 'basicPopup', kind: Popup, content: 'Popup...'},
						{name: 'directPopup', kind: Popup, autoDismiss: false, components: [
							{content: 'Direct Popup'},
							{kind: Button, content: 'Hide Direct', ontap: 'hidePopup', popup: 'directPopup', direct: true}
						]}
					]},
					{title: 'Fifth', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
						{kind: Item, content: 'Item One', ontap: 'next5'},
						{kind: Item, content: 'Item Two', ontap: 'next5'},
						{kind: Item, content: 'Item Three', ontap: 'next5'},
						{kind: ExpandableListItem, content: 'Expandable ListItem', components: [
							{content: 'Item 1'},
							{content: 'Item 2'},
							{content: 'Item 3'}
						]},
						{kind: Item, content: 'Item Four', ontap: 'next5'},
						{kind: Item, content: 'Item Five', ontap: 'next5'}
					]},
					{title: 'Sixth', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', headerComponents: [
						//* List actions with default width
						{kind: ListActions, name: 'listActions', icon: 'drawer', proportionalWidth: true, listActions: [
							{action: 'category2', components: [
								{kind: Divider, content: 'Category 2 (DataList)'},
								{kind: DataList, name: 'list', fit: true, components: [
									{kind: CheckboxItem, bindings: [{from: '.model.name', to: '.content'}]}
								]}
							]},
							{action: 'category1', components: [
								{kind: Divider, content: 'Category 1 (DataRepeater)'},
								{kind: DataRepeater, containerOptions: {kind: Scroller, classes: 'enyo-fill'}, name: 'repeater', fit: true, components: [
									{kind: ToggleItem, bindings: [{from: '.model.name', to: '.content'}]}
								]}
							]}
						]}
					], components: [
						{kind: TimePicker, noneText: 'Pick a Date', content: 'Time Picker'},
						{kind: Item, content: 'Item One', ontap: 'next6'},
						{kind: Item, content: 'Item Two', ontap: 'next6'},
						{kind: Item, content: 'Item Three', ontap: 'next6'},
						{kind: Item, content: 'Item Four', ontap: 'next6'},
						{kind: Item, content: 'Item Five', ontap: 'next6'}
					]},
					{title: 'Seventh', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
						{kind: Item, content: 'Item One'},
						{kind: Item, content: 'Item Two'},
						{kind: Item, content: 'Item Three'},
						{kind: Item, content: 'Item Four'},
						{kind: Item, content: 'Item Five'},
						{kind: ExpandableIntegerPicker, autoCollapse: true, content: 'Integer Picker', value: 7, min: 3, max: 15, step: 1, unit: 'elephants'}
					]}
				]}
			]
		}
	],
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.$.list.set('collection', new Collection([
			{name: 'Red'},
			{name: 'White'},
			{name: 'Blue'},
			{name: 'Black'}
		]));
		this.$.repeater.set('collection', new Collection([
			{name: 'Santa Clara'},
			{name: 'San Francisco'},
			{name: 'Seoul'}
		]));
	},
	rendered: function () {
		Control.prototype.rendered.apply(this, arguments);
		// set delay in order to read focused item after reading a panel title
		setTimeout(this.bindSafely(function () {
			Spotlight.spot(this.$.panels);
		}), 200);
	},
	// custom next handler for each panel to avoid switching from one active panel
	// to another with no visible change for demo
	next1: function (sender, ev) {
		this.$.panels.setIndex(1);
		return true;
	},
	next2: function (sender, ev) {
		this.$.panels.setIndex(2);
		return true;
	},
	next3: function (sender, ev) {
		this.$.panels.setIndex(3);
		return true;
	},
	next4: function (sender, ev) {
		this.$.panels.setIndex(4);
		return true;
	},
	next5: function (sender, ev) {
		this.$.panels.setIndex(5);
		return true;
	},
	next6: function (sender, ev) {
		this.$.panels.setIndex(6);
		return true;
	},
	handleShowingChanged: function (sender, ev) {
		this.$.panels.setHandleShowing(sender.getChecked());
	},
	panelsShowingChanged: function (sender, ev) {
		// Hiding the VideoPlayer when it would be obscured by the Panels avoids UI performance
		// issues caused by the GPU being occupied rendering video frames that aren't visible.
		this.$.player.set('showing', !ev.showing);
	},
	showPopup: function (sender) {
		var p = this.$[sender.popup];
		if (p) {
			if(sender.direct) {
				p.showDirect();
			} else {
				p.show();
			}
		}
	},
	openMainDrawer: function () {
		this.$.openMoreButton.hide();
		this.$.partialDrawer.setOpen(true);
	},
	close: function () {
		if (this.$.partialDrawer.getOpen()) {
			this.$.openMoreButton.show();
			this.$.partialDrawer.setOpen(false);
		} else {
			this.$.partialDrawer.setControlsOpen(false);
		}
	}
});

module.exports.badgeClasses = 'new';
