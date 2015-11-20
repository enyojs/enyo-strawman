require('garnet');

var
	kind = require('enyo/kind'),
	Button = require('garnet/Button'),
	Scroller = require('garnet/Scroller'),
	Panel = require('garnet/Panel'),
	Title = require('garnet/Title');

var TitlePanel = kind({
	name: 'g.sample.TitlePanel',
	kind: Panel,
	events: {
		onResult: ''
	},
	components: [
		{
			name: 'scroller',
			kind: Scroller,
			classes: 'enyo-fit g-layout-text-center',
			scrollIndicatorEnabled: true,
			components: [
				{name: 'title', kind: Title, content: 'Title: long text will fade out', ontap: 'tapTitle', onclick: 'clickTitle'},
				{classes: 'g-sample-title-content', content: 'Garnet is a UI library built for wearable devices and is based on Enyo. Garnet supports LG smart watch as well as the emulator provided. Browser-wise, Garnet supports the browser on LG smart watch, Firefox 16, Opera 15, Safari 3.1, Chrome 27 and their higher versions.'},
				{kind: Button, content: 'OK!!!', ontap: 'tapButton', classes: 'g-sample-title-button'}
			]
		}
	],
	tapButton: function(inSender, inEvent) {
		this.doResult({msg: 'Button tapped !!'});
		this.$.title.stopMarquee();
	},
	tapTitle: function(inSender, inEvent) {
		this.doResult({msg: 'Title tapped !!'});
		this.$.title.startMarquee();
	},
	clickTitle: function(inSender, inEvent) {
		this.doResult({msg: 'Title clicked !!'});
	}
});

module.exports = kind({
	name: 'g.sample.TitleSample',
	classes: 'enyo-unselectable garnet g-sample',
	components: [
		{content: '< Title ( + BodyText ) Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Title with a scrollable content area', classes: 'g-sample-subheader'},
		{kind: TitlePanel, classes: 'g-sample-panel', onResult: 'result'},

		{src: '@../assets/btn_command_next.svg', classes: 'g-sample-result', components: [
			{content: 'Result', classes: 'g-sample-subheader'},
			{name: 'result', allowHtml: true, content: 'No tapped yet.', classes: 'g-sample-description'}
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
