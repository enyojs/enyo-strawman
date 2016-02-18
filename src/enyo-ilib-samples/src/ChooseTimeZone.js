var
	kind = require('enyo/kind'),
	Select = require('enyo/Select');

var
	TimePicker = require('onyx/TimePicker');

var
	TimeZone = require('enyo-ilib/TimeZone');

var
	rb = require('./ResBundle');

module.exports = kind({
	name: 'ilib.sample.ChooseTimeZone',

	published: {
		'value': 'default',
		label: rb.getString('Time Zone')
	},

	components: [
		{name: 'tzheader', content: '', classes: 'ilib-onyx-sample-divider'},
		{name: 'timeZones', kind: Select, onselect: 'setTimeZone', components: [
			{content: rb.getString('local'), active: true}
		]},
		{kind: TimePicker, name: 'timePickerFake', content: rb.getString('Time'), showing: false}
	],

	create: function () {
		this.inherited(arguments);
		this.initTimeZones();
		this.$.tzheader.setContent(this.label.toString());
	},

	initTimeZones: function () {
		var timeZones = TimeZone.getAvailableIds();
		for (var i = 0; i < timeZones.length; ++i)
			this.$.timeZones.createComponent({content: timeZones[i]});
	},

	setTimeZone: function (sender, ev) {
		this.setValue(ev.selected.content);
		this.bubble('onSelectedTimeZone', {content: ev.selected.content});
	}
});
