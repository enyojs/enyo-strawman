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
				{style: 'padding-top: 60px; width: 200px; margin: auto;', content: 'Garnet is a UI library built for wearable devices and is based on Enyo. Garnet supports LG smart watch as well as the emulator provided. Browser-wise, Garnet supports the browser on LG smart watch, Firefox 16, Opera 15, Safari 3.1, Chrome 27 and their higher versions.'},
				{kind: Button, style: 'margin: ' + ri.scale(20) + 'px 0 ' + ri.scale(116) + 'px;', content: 'OK!!!'}
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
				{style: 'padding-top: 60px; width: 200px; margin: auto;', content: 'Garnet is a UI library built for wearable devices and is based on Enyo. Garnet supports LG smart watch as well as the emulator provided. Browser-wise, Garnet supports the browser on LG smart watch, Firefox 16, Opera 15, Safari 3.1, Chrome 27 and their higher versions.'},
				{kind: Button, style: 'margin: ' + ri.scale(20) + 'px 0 ' + ri.scale(116) + 'px;', content: 'OK!!!'}
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
				{style: 'padding-top: 60px; width: 200px; margin: auto;', content: 'Garnet is a UI library built for wearable devices and is based on Enyo. Garnet supports LG smart watch as well as the emulator provided. Browser-wise, Garnet supports the browser on LG smart watch, Firefox 16, Opera 15, Safari 3.1, Chrome 27 and their higher versions.'},
				{kind: Button, style: 'margin: ' + ri.scale(20) + 'px 0 ' + ri.scale(116) + 'px;', content: 'OK!!!'}
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
		{style: 'position: relative; height: 100%;', components: [
			{
				name: 'commandBar1',
				kind: DefaultCommandBarPanel,
				style: 'background-color: #000000; position: relative; display: inline-block; overflow: hidden;'
			},
			{
				name: 'commandBar2',
				kind: SingleCommandBarPanel,
				style: 'background-color: #000000; position: relative; display: inline-block; margin-left: ' + ri.scale(10) + 'px; overflow: hidden;'
			},
			{
				name: 'commandBar3',
				kind: CustomCommandBarPanel,
				style: 'background-color: #000000; position: relative; display: inline-block; margin-left: ' + ri.scale(10) + 'px; overflow: hidden;'
			}
		]},

		{style: 'position: fixed; width: 100%; min-height: ' + ri.scale(160)+ 'px; bottom: 0; z-index: 9999; background-color: #EDEDED; opacity: 0.8;', classes: 'g-sample-result', components: [
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
