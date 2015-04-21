var
	kind = require('enyo/kind'),
	ready = require('enyo/ready'),
	Anchor = require('enyo/Anchor'),
	Collection = require('enyo/Collection'),
	Control = require('enyo/Control'),
	DataRepeater = require('enyo/DataRepeater');

var
	samples = {
		ButtonGroup			: require('./lib/ButtonGroupSample'),
		Button				: require('./lib/ButtonSample'),
		Checkbox			: require('./lib/CheckboxSample'),
		ContextualPopup		: require('./lib/ContextualPopupSample'),
		DatePicker			: require('./lib/DatePickerSample'),
		Groupbox			: require('./lib/GroupboxSample'),
		IconButton			: require('./lib/IconButtonSample'),
		Input				: require('./lib/InputSample'),
		Menu				: require('./lib/MenuSample'),
		MoreToolbar			: require('./lib/MoreToolbarSample'),
		Picker				: require('./lib/PickerSample'),
		Popup				: require('./lib/PopupSample'),
		Progress			: require('./lib/ProgressSample'),
		Slider				: require('./lib/SliderSample'),
		Spinner				: require('./lib/SpinnerSample'),
		Submenu				: require('./lib/SubmenuSample'),
		TabBar				: require('./lib/TabBarSample'),
		TabPanel			: require('./lib/TabPanelSample'),
		TimePicker			: require('./lib/TimePickerSample'),
		ToggleButton		: require('./lib/ToggleButtonSample'),
		Toolbar				: require('./lib/ToolbarSample'),
		Tooltip				: require('./lib/TooltipSample')
	};

var List = kind({
	kind: Control,
	components: [
		{name: 'list', kind: DataRepeater, components: [
			{style: 'margin: 10px;', components: [
				{name: 'a', kind: Anchor}
			], bindings: [
				{from: 'model.name', to: '$.a.href', transform: function (v) { return '?Onyx&' + v; }},
				{from: 'model.name', to: '$.a.content', transform: function (v) { return v + ' Sample'; }}
			]}
		]}
	],
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.$.list.set('collection', new Collection(Object.keys(samples).map(function (key) {
			return {name: key};
		})));
	}
});

module.exports = kind({
	create: function() {
		
		this.inherited(arguments);
		
		var names = window.document.location.search.substring(1).split('&');
		var name = names[1] || names[0];
		
		var sample = samples[name] || List;
		
		this.createComponent({kind:sample});
	}
});