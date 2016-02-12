require('enyo/options').accessibility = true;

var
	kind = require('enyo/kind'),
	ready = require('enyo/ready'),
	dom = require('enyo/dom');

var
	Onyx = require('onyx');

var
	SampleList = require('../strawman/SampleList');

var
	samples = {
		ButtonGroupSample		: require('./src/ButtonGroupSample'),
		ButtonSample			: require('./src/ButtonSample'),
		CheckboxSample			: require('./src/CheckboxSample'),
		ContextualPopupSample	: require('./src/ContextualPopupSample'),
		DatePickerSample		: require('./src/DatePickerSample'),
		GroupboxSample			: require('./src/GroupboxSample'),
		IconButtonSample		: require('./src/IconButtonSample'),
		InputSample				: require('./src/InputSample'),
		MenuSample				: require('./src/MenuSample'),
		MoreToolbarSample		: require('./src/MoreToolbarSample'),
		PickerSample			: require('./src/PickerSample'),
		PopupSample				: require('./src/PopupSample'),
		ProgressSample			: require('./src/ProgressSample'),
		SliderSample			: require('./src/SliderSample'),
		SpinnerSample			: require('./src/SpinnerSample'),
		SubmenuSample			: require('./src/SubmenuSample'),
		TabBarSample			: require('./src/TabBarSample'),
		TabPanelSample			: require('./src/TabPanelSample'),
		TimePickerSample		: require('./src/TimePickerSample'),
		ToggleButtonSample		: require('./src/ToggleButtonSample'),
		ToolbarSample			: require('./src/ToolbarSample'),
		TooltipSample			: require('./src/TooltipSample')
	};

var Sample = kind({
	kind: SampleList,
	title: 'Onyx Samples',
	version: Onyx.version,
	libraryName: 'Onyx',
	samples: samples
});

ready(function() {
	new Sample().renderInto(document.body);
	dom.removeClass(document.body, 'onyx');
});
