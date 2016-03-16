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
	DatePicker = require('onyx/i18n/DatePicker'),
	Groupbox = require('onyx/Groupbox'),
	GroupboxHeader = require('onyx/GroupboxHeader'),
	Picker = require('onyx/Picker'),
	PickerDecorator = require('onyx/PickerDecorator'),
	Toolbar = require('onyx/Toolbar');

module.exports = kind({
	name: 'onyx.sample.DatePickerSample',
	kind: FittableRows,
	classes: 'onyx',
	handlers: {
		onSelect: 'updateDateValues'
	},
	components: [
		{kind: Toolbar, content:$L('Dates')},
		{kind: FittableColumns, style: 'padding: 10px', components:[
			{components: [
				{content:$L('Choose Locale: '), classes: 'onyx-sample-divider'},
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
		{kind: Button, content: 'Reset Dates', ontap: 'resetDates'},
		{style: 'width: 100%;height: 5px;background-color: black;margin-bottom: 5px;'},
		{caption: 'Dates', style: 'padding: 10px', components: [
			{content: 'DATE',classes: 'onyx-sample-divider'},
			{classes: 'onyx-toolbar-inline', components: [
				{name: 'datePicker1', kind: DatePicker}
			]},
			{kind: Groupbox, style: 'padding: 5px;', components: [
				{kind: GroupboxHeader, content: 'Value'},
				{name: 'datePicker1Value', style: 'padding: 15px;'}
			]},
			{content: 'DATE W/MIN & MAX YEARS',classes: 'onyx-sample-divider'},
			{classes: 'onyx-toolbar-inline', components: [
				{name: 'datePicker2', kind: DatePicker, minYear: 2010, maxYear: 2020}
			]},
			{kind: Groupbox, style: 'padding: 5px;', components: [
				{kind: GroupboxHeader, content: 'Value'},
				{name: 'datePicker2Value', style: 'padding: 15px;'}
			]},
			{content: 'DATE W/DAYS HIDDEN',classes: 'onyx-sample-divider'},
			{classes: 'onyx-toolbar-inline', components: [
				{name: 'datePicker3', kind: DatePicker, dayHidden: true}
			]},
			{kind: Groupbox, style: 'padding: 5px;', components: [
				{kind: GroupboxHeader, content: 'Value'},
				{name: 'datePicker3Value', style: 'padding: 15px;'}
			]},
			{content: 'DISABLED',classes: 'onyx-sample-divider'},
			{classes: 'onyx-toolbar-inline', components: [
				{name: 'datePicker4', kind: DatePicker, disabled: true}
			]}
		]}
	],
	rendered: function () {
		this.inherited(arguments);
		this.localeChanged();
	},
	localeChanged: function () {
		i18n.updateLocale(this.$.localePicker.get('selected').content);
		this.getDates();
		return true;
	},
	resetDates: function (date) {
		var d = new Date();
		this.$.datePicker1.setValue(d);
		this.$.datePicker2.setValue(d);
		this.$.datePicker3.setValue(d);
		this.$.datePicker4.setValue(d);
		this.getDates();
	},
	getDates: function () {
		this.updateDateValue(this.$.datePicker1);
		this.updateDateValue(this.$.datePicker2);
		this.updateDateValue(this.$.datePicker3);
	},
	updateDateValues: function (sender, ev) {
		this.updateDateValue(ev);
	},
	updateDateValue: function (picker) {
		var fmt = picker.name != 'datePicker3' ? this.format() :  this.format('my');
		this.$[picker.name + 'Value'].setContent(fmt.format(picker.value));
	},
	format: function (dateComponents) {
		var fmt = new DateFmt({
			dateComponents: dateComponents || undefined,
			date: 'short',
			timezone: 'local'
		});
		return fmt;
	}
});
