var kind = require('enyo/kind');

var
	Garnet = require('garnet');

var
	SampleList = require('../../src/strawman/SampleList');

// Define all of the extras samples
var samples = {
	ArcSample                       : require('./ArcSample'),
	ButtonSample                    : require('./ButtonSample'),
	CheckboxSample                  : require('./CheckboxSample'),
	CommandBarSample                : require('./CommandBarSample'),
	ConfirmPanelSample              : require('./ConfirmPanelSample'),
	ConfirmToastPanelSample         : require('./ConfirmToastPanelSample'),
	ContextualPanelSample           : require('./ContextualPanelSample'),
	DataGridListSample              : require('./DataGridListSample'),
	DataGridListwithCardsSample     : require('./DataGridListwithCardsSample'),
	DataListSample                  : require('./DataListSample'),
	DataListwithCardsSample         : require('./DataListwithCardsSample'),
	DataListwithCheckboxesSample    : require('./DataListwithCheckboxesSample'),
	DataListwithIconBadgeSample     : require('./DataListwithIconBadgeSample'),
	DataListwithRadioButtonsSample  : require('./DataListwithRadioButtonsSample'),
	DatePickerPanelSample           : require('./DatePickerPanelSample'),
	FormSample                      : require('./FormSample'),
	IconButtonSample                : require('./IconButtonSample'),
	IconSample                      : require('./IconSample'),
	MultiPickerPanelSample          : require('./MultiPickerPanelSample'),
	PanelManagerSample              : require('./PanelManagerSample'),
	PickerPanelSample               : require('./PickerPanelSample'),
	PreventTapOnDragSample          : require('./PreventTapOnDragSample'),
	ProgressBarSample               : require('./ProgressBarSample'),
	SpinnerSample                   : require('./SpinnerSample'),
	TimePickerPanelSample           : require('./TimePickerPanelSample'),
	TitleSample                     : require('./TitleSample'),
	ToastPanelSample                : require('./ToastPanelSample'),
	ToggleButtonSample              : require('./ToggleButtonSample'),
	ToggleIconButtonSample          : require('./ToggleIconButtonSample'),
	WheelSliderPanelSample          : require('./WheelSliderPanelSample')
};

module.exports = kind({
	kind: SampleList,
	title: 'Garnet Samples',
	version: Garnet.version,
	libraryName: 'Garnet',
	samples: samples
});
