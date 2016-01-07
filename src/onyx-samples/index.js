var
	kind = require('enyo/kind');

var
	SampleList = require('../strawman/SampleList');

var
	samples = {
		ButtonGroupSample		: require('./lib/ButtonGroupSample'),
		ButtonSample			: require('./lib/ButtonSample'),
		CheckboxSample			: require('./lib/CheckboxSample'),
		ContextualPopupSample	: require('./lib/ContextualPopupSample'),
		DatePickerSample		: require('./lib/DatePickerSample'),
		GroupboxSample			: require('./lib/GroupboxSample'),
		IconButtonSample		: require('./lib/IconButtonSample'),
		InputSample				: require('./lib/InputSample'),
		MenuSample				: require('./lib/MenuSample'),
		MoreToolbarSample		: require('./lib/MoreToolbarSample'),
		PickerSample			: require('./lib/PickerSample'),
		PopupSample				: require('./lib/PopupSample'),
		ProgressSample			: require('./lib/ProgressSample'),
		SliderSample			: require('./lib/SliderSample'),
		SpinnerSample			: require('./lib/SpinnerSample'),
		SubmenuSample			: require('./lib/SubmenuSample'),
		TabBarSample			: require('./lib/TabBarSample'),
		TabPanelSample			: require('./lib/TabPanelSample'),
		TimePickerSample		: require('./lib/TimePickerSample'),
		ToggleButtonSample		: require('./lib/ToggleButtonSample'),
		ToolbarSample			: require('./lib/ToolbarSample'),
		TooltipSample			: require('./lib/TooltipSample')
	};

module.exports = kind({
	kind: SampleList,
	title: 'Onyx Samples',
	libraryName: 'Onyx',
	samples: samples
});
