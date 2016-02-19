require('enyo/options').accessibility = true;

var
	kind = require('enyo/kind'),
	ready = require('enyo/ready');

var
	Garnet = require('garnet');

var
	SampleList = require('../strawman/SampleList');

// Define all of the extras samples
var samples = {
	ArcSample                       : require('./src/ArcSample'),
	ButtonSample                    : require('./src/ButtonSample'),
	CheckboxSample                  : require('./src/CheckboxSample'),
	CommandBarSample                : require('./src/CommandBarSample'),
	ConfirmPanelSample              : require('./src/ConfirmPanelSample'),
	ConfirmToastPanelSample         : require('./src/ConfirmToastPanelSample'),
	ContextualPanelSample           : require('./src/ContextualPanelSample'),
	DataGridListSample              : require('./src/DataGridListSample'),
	DataGridListwithCardsSample     : require('./src/DataGridListwithCardsSample'),
	DataListSample                  : require('./src/DataListSample'),
	DataListwithCardsSample         : require('./src/DataListwithCardsSample'),
	DataListwithCheckboxesSample    : require('./src/DataListwithCheckboxesSample'),
	DataListwithIconBadgeSample     : require('./src/DataListwithIconBadgeSample'),
	DataListwithRadioButtonsSample  : require('./src/DataListwithRadioButtonsSample'),
	DatePickerPanelSample           : require('./src/DatePickerPanelSample'),
	FormSample                      : require('./src/FormSample'),
	IconButtonSample                : require('./src/IconButtonSample'),
	IconSample                      : require('./src/IconSample'),
	MultiPickerPanelSample          : require('./src/MultiPickerPanelSample'),
	PanelManagerSample              : require('./src/PanelManagerSample'),
	PickerPanelSample               : require('./src/PickerPanelSample'),
	PreventTapOnDragSample          : require('./src/PreventTapOnDragSample'),
	ProgressBarSample               : require('./src/ProgressBarSample'),
	SpinnerSample                   : require('./src/SpinnerSample'),
	TimePickerPanelSample           : require('./src/TimePickerPanelSample'),
	TitleSample                     : require('./src/TitleSample'),
	ToastPanelSample                : require('./src/ToastPanelSample'),
	ToggleButtonSample              : require('./src/ToggleButtonSample'),
	ToggleIconButtonSample          : require('./src/ToggleIconButtonSample'),
	WheelSliderPanelSample          : require('./src/WheelSliderPanelSample')
};

var Sample = kind({
	kind: SampleList,
	title: 'Garnet Samples',
	version: Garnet.version,
	libraryName: 'Garnet',
	samples: samples
});

ready(function() {
	new Sample().renderInto(document.body);
});

