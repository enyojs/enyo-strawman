require('garnet');

var
	kind = require('enyo/kind'),
	GarnetTimePickerPanel = require('garnet/TimePickerPanel');

var TimePicker12Panel = kind({
	name: 'g.sample.TimePicker12Panel',
	kind: GarnetTimePickerPanel,
	hourValue: 12,
	minuteValue: 30,
	meridiemValue: 'PM'
});

var TimePicker24Panel = kind({
	name: 'g.sample.TimePicker24Panel',
	kind: GarnetTimePickerPanel,
	hourValue: 17,
	minuteValue: 45,
	meridiemValue: '24'
});

module.exports = kind({
	name: 'g.sample.TimePickerPanelSample',
	handlers: {
		onResult: 'result'
	},
	classes: 'enyo-unselectable enyo-fit garnet g-sample g-sample-time-picker-panel',
	components: [
		{content: '< Time Picker Panel Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Time Picker Panel', classes: 'g-sample-subheader'},
		{classes: 'g-sample-panels', components: [
			{
				name: 'timePicker12Panel',
				kind: TimePicker12Panel,
				classes: 'g-sample-panel-margin'
			},
			{
				name: 'timePicker24Panel',
				kind: TimePicker24Panel,
				classes: 'g-sample-panel-margin'
			}
		]},

		{src: '@../assets/btn_command_next.svg', classes: 'g-sample-result', components: [
			{content: 'Result', classes: 'g-sample-subheader'},
			{name: 'result', allowHtml: true, content: 'No button pressed yet.', classes: 'g-sample-description'}
		]}
	],
	bindings: [
		{from: '.$.timePicker12Panel.value', to: '.$.result.content', transform: function(val) {
			return 'Time is ' + val.hour + ':' + val.minute + ' ' + val.meridiem;
		}}
	],
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});
