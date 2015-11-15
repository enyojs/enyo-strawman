require('garnet');

// dafult commandBar sample
var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),
	Button = require('garnet/Button'),
	Panel = require('garnet/Panel'),
	Scroller = require('garnet/Scroller'),
	Title = require('garnet/Title');

var DefaultCommandBarPanel = kind({
	name: 'g.sample.DefaultCommandBarPanel',
	kind: Panel,
	events: {
		onResult: ''
	},
	components: [
		{
			name: 'defaultScroller',
			kind: Scroller,
			classes: 'enyo-fit g-layout-text-center',
			components: [
				{kind: Title, content: 'Title'},
				{classes: 'g-sample-commandbar-content', content: 'Garnet is a UI library built for wearable devices and is based on Enyo. Garnet supports LG smart watch as well as the emulator provided. Browser-wise, Garnet supports the browser on LG smart watch, Firefox 16, Opera 15, Safari 3.1, Chrome 27 and their higher versions.'},
				{kind: Button, classes: 'g-sample-commandbar-button', content: 'OK!!!'}
			]
		}
	],
	commandBarComponents: [
		{name: 'cancel', classes: 'g-common-cancel', ontap: 'tapButton'},
		{name: 'ok', classes: 'g-common-ok', disabled: true}
	],
	tapButton: function(inSender, inEvent) {
		this.doResult({msg: inSender.name});
	}
});

// single commandBar sample
var SingleCommandBarPanel = kind({
	name: 'g.sample.SingleCommandBarPanel',
	kind: Panel,
	events: {
		onResult: ''
	},
	components: [
		{
			name: 'singleScroller',
			kind: Scroller,
			classes: 'enyo-fit g-layout-text-center',
			components: [
				{kind: Title, content: 'Title'},
				{classes: 'g-sample-commandbar-content', content: 'Garnet is a UI library built for wearable devices and is based on Enyo. Garnet supports LG smart watch as well as the emulator provided. Browser-wise, Garnet supports the browser on LG smart watch, Firefox 16, Opera 15, Safari 3.1, Chrome 27 and their higher versions.'},
				{kind: Button, classes: 'g-sample-commandbar-button', content: 'OK!!!'}
			]
		}
	],
	commandBarComponents: [
		{name: 'done', classes: 'g-common-ok', ontap: 'tapButton'}
	],
	tapButton: function(inSender, inEvent) {
		this.doResult({msg: inSender.name});
	}
});

// custom commandBar sample
var CustomCommandBarPanel = kind({
	name: 'g.sample.CustomCommandBarPanel',
	kind: Panel,
	events: {
		onResult: ''
	},
	components: [
		{
			name: 'singleScroller',
			kind: Scroller,
			classes: 'enyo-fit g-layout-text-center',
			components: [
				{kind: Title, content: 'Title'},
				{classes: 'g-sample-commandbar-content', content: 'Garnet is a UI library built for wearable devices and is based on Enyo. Garnet supports LG smart watch as well as the emulator provided. Browser-wise, Garnet supports the browser on LG smart watch, Firefox 16, Opera 15, Safari 3.1, Chrome 27 and their higher versions.'},
				{kind: Button, classes: 'g-sample-commandbar-button', content: 'OK!!!'}
			]
		}
	],
	commandBarComponents: [
		// TODO: Update this legacy example to work
		{name: 'previous', src: '@../assets/btn_command_previous.svg', ontap: 'previousTap'},
		{name: 'next', src: '@../assets/btn_command_next.svg', ontap: 'nextTap'}
	],
	previousTap: function(inSender, inEvent) {
		this.doResult({msg: inSender.name});
	},
	nextTap: function(inSender, inEvent) {
		this.doResult({msg: inSender.name});
	}
});

module.exports = kind({
	name: 'g.sample.CommandBarSample',
	handlers: {
		onResult: 'result'
	},
	classes: 'enyo-unselectable garnet g-sample',
	components: [
		{content: '< CommandBar Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Default / Single / Custom', classes: 'g-sample-subheader'},
		{classes: 'g-sample-panels', components: [
			{
				name: 'commandBar1',
				kind: DefaultCommandBarPanel,
				classes: 'g-sample-panel-margin'
			},
			{
				name: 'commandBar2',
				kind: SingleCommandBarPanel,
				classes: 'g-sample-panel-margin'
			},
			{
				name: 'commandBar3',
				kind: CustomCommandBarPanel,
				classes: 'g-sample-panel-margin'
			}
		]},

		{classes: 'g-sample-result', components: [
			{content: 'Result', classes: 'g-sample-subheader'},
			{name: 'result', allowHtml: true, content: 'No button pressed yet.', classes: 'g-sample-description'}
		]}
	],
	result: function(inSender, inEvent) {
		this.$.result.setContent(inEvent.msg);
	},
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});
