require('garnet');

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),
	Spinner = require('garnet/Spinner'),
	Panel = require('garnet/Panel');

var SpinnerPanel = kind({
	name: 'g.sample.SpinnerPanel',
	kind: Panel,
	components: [
		{classes: 'g-sample-spinner-container g-layout-absolute-center', components: [
			{kind: Spinner, classes: 'g-sample-spinner-width', content: 'Connecting to the server'}
		]}
	]
});

var TextSpinnerPanel = kind({
	name: 'g.sample.TextSpinnerPanel',
	kind: Panel,
	components: [
		{kind: Spinner, classes: 'g-layout-absolute-center', classes: 'g-sample-spinner-text-spinner'}
	]
});

module.exports = kind({
	name: 'g.sample.SpinnerSample',
	classes: 'enyo-unselectable garnet g-sample',
	components: [
		{content: '< Spinner Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Spinners', classes: 'g-sample-subheader'},
		{classes: 'g-sample-panels', components: [
			{
				name: 'spinnerPanel',
				kind: SpinnerPanel,
				classes: 'g-sample-circle-panel-margin'
			},
			{
				name: 'textSpinnerPanel',
				kind: TextSpinnerPanel,
				classes: 'g-sample-circle-panel-margin'
			}
		]}
	],
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});
