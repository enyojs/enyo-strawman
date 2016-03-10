var
	kind = require('enyo/kind'),
	i18n = require('enyo/i18n'),
	$L = i18n.$L;

var
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows');

var
	DateFmt = require('enyo-ilib/DateFmt');

var
	Button = require('onyx/Button'),
	Groupbox = require('onyx/Groupbox'),
	GroupboxHeader = require('onyx/GroupboxHeader'),
	Picker = require('onyx/Picker'),
	PickerDecorator = require('onyx/PickerDecorator'),
	TimePicker = require('onyx/i18n/TimePicker'),
	Toolbar = require('onyx/Toolbar');

module.exports = kind({
	name: 'onyx.sample.TimePickerSample',
	kind: FittableRows,
	classes: 'onyx enyo-fit',
	handlers: {
		onSelect: 'updateTimeValues'
	},
	components: [
		{kind: Toolbar, content:$L('Times')},
		{kind: FittableColumns, style: 'padding: 10px', components:[
			{components: [
				{content: $L('Choose Locale: '), classes: 'onyx-sample-divider'},
				{kind: PickerDecorator, style: 'padding: 10px;', onSelect: 'localeChanged', components: [
					{content: 'Pick One...', style: 'width: 200px'},
					{kind: Picker, name: 'localePicker', components: [
						{content: 'en-US', active: true},
						{content: 'en-CA'},
						{content: 'en-IE'},
						{content: 'en-GB'},
						{content: 'en-MX'},
						{content: 'de-DE'},
						{content: 'fr-FR'},
						{content: 'fr-CA'},
						{content: 'it-IT'},
						{content: 'es-ES'},
						{content: 'es-MX'},
						{content: 'es-US'},
						{content: 'ko-KR'},
						{content: 'ja-JP'},
						{content: 'zh-HK'}
					]}
				]}
			]}
		]},

		{kind: Button, content: 'Reset Times', ontap: 'resetTimes'},

		{style: 'width: 100%;height: 5px;background-color: black;margin-bottom: 5px;'},
		{caption: 'Dates', style: 'padding: 10px', components:
		[
			{content: 'TIME', classes: 'onyx-sample-divider'},
			{classes: 'onyx-toolbar-inline', components: [
				{name: 'timePicker1', kind: TimePicker}
			]},
			{kind: Groupbox, style: 'padding: 5px;', components: [
				{kind: GroupboxHeader, content: 'Value'},
				{name: 'timePicker1Value', style: 'padding: 15px;'}
			]},
			{content: 'TIME 24 HOUR MODE',classes: 'onyx-sample-divider'},
			{classes: 'onyx-toolbar-inline', components: [
				{name: 'timePicker2', kind: TimePicker, is24HrMode: true}
			]},
			{kind: Groupbox, style: 'padding: 5px;', components: [
				{kind: GroupboxHeader, content: 'Localized Value'},
				{name: 'timePicker2Value', style: 'padding: 15px;'}
			]},
			{content: 'DISABLED', classes: 'onyx-sample-divider'},
			{classes: 'onyx-toolbar-inline', components: [
				{name: 'timePicker3', kind: TimePicker, disabled: true}
			]}
		]}
	],
	rendered: function () {
		FittableRows.prototype.rendered.apply(this, arguments);
		this.localeChanged();
	},
	localeChanged: function () {
		this.fmt = null;
		i18n.updateLocale(this.$.localePicker.get('selected').content);
		this.$.timePicker2.set('is24HrMode', true);
		this.getTimes();
		return true;
	},
	resetTimes: function (date) {
		var d = new Date();
		this.$.timePicker1.setValue(d);
		this.$.timePicker2.setValue(d);
		this.$.timePicker3.setValue(d);

		this.getTimes();
	},
	getTimes: function () {
		this.updateTimeValue(this.$.timePicker1);
		this.updateTimeValue(this.$.timePicker2);
	},
	updateTimeValues: function (sender, ev) {
		this.updateTimeValue(ev);
	},
	updateTimeValue: function (picker) {
		var fmt = this.fmt || new DateFmt({
			type: 'time',
			length: 'short',
			timezone: 'local'
		});

		this.$[picker.name + 'Value'].set('content', fmt.format(picker.value));
	}
});
