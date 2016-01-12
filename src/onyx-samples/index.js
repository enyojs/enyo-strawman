var
	kind = require('enyo/kind');

var
	SampleList = require('../strawman/SampleList');

var
	samples = {
		ButtonGroup			: require('./src/ButtonGroupSample'),
		Button				: require('./src/ButtonSample'),
		Checkbox			: require('./src/CheckboxSample'),
		ContextualPopup		: require('./src/ContextualPopupSample'),
		DatePicker			: require('./src/DatePickerSample'),
		Groupbox			: require('./src/GroupboxSample'),
		IconButton			: require('./src/IconButtonSample'),
		Input				: require('./src/InputSample'),
		Menu				: require('./src/MenuSample'),
		MoreToolbar			: require('./src/MoreToolbarSample'),
		Picker				: require('./src/PickerSample'),
		Popup				: require('./src/PopupSample'),
		Progress			: require('./src/ProgressSample'),
		Slider				: require('./src/SliderSample'),
		Spinner				: require('./src/SpinnerSample'),
		Submenu				: require('./src/SubmenuSample'),
		TabBar				: require('./src/TabBarSample'),
		TabPanel			: require('./src/TabPanelSample'),
		TimePicker			: require('./src/TimePickerSample'),
		ToggleButton		: require('./src/ToggleButtonSample'),
		Toolbar				: require('./src/ToolbarSample'),
		Tooltip				: require('./src/TooltipSample')
	};

module.exports = kind({
	kind: SampleList,
	title: 'Onyx Samples',
	libraryName: 'Onyx',
	samples: samples
});
