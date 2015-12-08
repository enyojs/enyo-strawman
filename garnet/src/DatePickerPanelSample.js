require('garnet');

var
	kind = require('enyo/kind'),
	GarnetDatePickerPanel = require('garnet/DatePickerPanel');

var SampleDatePickerPanel = kind({
	name: 'g.sample.DatePickerPanel',
	kind: GarnetDatePickerPanel,
	locale: 'en-US',
	mode: 'year'
});

module.exports = kind({
	name: 'g.sample.DatePickerPanelSample',
	classes: 'enyo-unselectable enyo-fit garnet g-sample g-sample-date-picker-panel',
	components: [
		{content: '< Date Picker Panel Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Date Picker Panel', classes: 'g-sample-subheader'},
		{name: 'datepicker', kind: SampleDatePickerPanel, classes: 'g-sample-panel'},

		{classes: 'g-sample-result', components: [
			{content: 'Result', classes: 'g-sample-subheader'},
			{name: 'result', allowHtml: true, content: 'No button pressed yet.', classes: 'g-sample-description'}
		]}
	],
	bindings: [
		{from: '.$.datepicker.value', to: '.$.result.content', transform: function(val) {
			return 'Date is ' + val;
		}}
	],
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});
