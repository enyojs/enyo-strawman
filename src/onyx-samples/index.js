var
	kind = require('enyo/kind');

var
	SampleList = require('../strawman/SampleList');

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

module.exports = kind({
	kind: SampleList,
	title: 'Onyx Samples',
	libraryName: 'Onyx',
	samples: samples
});
