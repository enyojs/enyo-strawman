require('garnet');

var
	kind = require('enyo/kind'),
	Icon = require('garnet/Icon'),
	Panel = require('garnet/Panel');

var IconPanel = kind({
	name: 'g.sample.IconPanel',
	kind: Panel,
	classes: 'g-layout-absolute-wrapper',
	components: [
		{classes: 'g-sample-icon-container g-layout-absolute-center', components: [
			{content: 'Icons : ', classes: 'g-sample-text'},
			{tag: 'br'},
			{kind: Icon, src: '@../assets/btn_cancel.svg', classes: 'g-common-button-size-small'},
			{kind: Icon, src: '@../assets/btn_cancel.svg', classes: 'g-common-button-size-normal'},
			{kind: Icon, src: '@../assets/btn_cancel.svg', classes: 'g-common-button-size-large'},
			{tag: 'br'},
			{kind: Icon, src: '@../assets/btn_cancel.svg', classes: 'g-common-button-size-large', disabled: true},
			{kind: Icon, src: '@../assets/ic_warning.svg', classes: 'g-sample-button-warning'}
		]}
	]
});

module.exports = kind({
	name: 'g.sample.IconSample',
	classes: 'enyo-unselectable garnet g-sample g-sample-icon',
	components: [
		{content: '< Icon Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Icons', classes: 'g-sample-subheader'},
		{kind: IconPanel, classes: 'g-sample-circle-panel'}
	],
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});
