var
	kind = require('enyo/kind');

var
	SampleList = require('../../src/strawman/SampleList');

// Define all of the extras samples
var samples = {
	ArcSample                       : require('./ArcSample'),
	ButtonSample                    : require('./ButtonSample'),
	CheckboxSample                  : require('./CheckboxSample'),
	CommandBarSample                : require('./CommandBarSample'),
	ConfirmPopupSample              : require('./ConfirmPopupSample'),
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
	IconMenuPopupSample             : require('./IconMenuPopupSample'),
	IconSample                      : require('./IconSample'),
	MenuScrollerSample              : require('./MenuScrollerSample'),
	MultiPickerPanelSample          : require('./MultiPickerPanelSample'),
	PageIndicatorSample             : require('./PageIndicatorSample'),
	PanelSetDepthInMoveSample       : require('./PanelSetDepthInMoveSample'),
	PanelSetDepthtInDepthSample     : require('./PanelSetDepthtInDepthSample'),
	PanelSetMoveInDepthSample       : require('./PanelSetMoveInDepthSample'),
	PanelSetMoveInMoveSample        : require('./PanelSetMoveInMoveSample'),
	PanelSetPanelSample             : require('./PanelSetPanelSample'),
	PanelSetSample                  : require('./PanelSetSample'),
	PickerPanelSample               : require('./PickerPanelSample'),
	PopupSample                     : require('./PopupSample'),
	PreventTapOnDragSample          : require('./PreventTapOnDragSample'),
	ProgressBarSample               : require('./ProgressBarSample'),
	SpinnerSample                   : require('./SpinnerSample'),
	TimePickerPanelSample           : require('./TimePickerPanelSample'),
	TitleSample                     : require('./TitleSample'),
	ToastSample                     : require('./ToastSample'),
	ToggleButtonSample              : require('./ToggleButtonSample'),
	ToggleIconButtonSample          : require('./ToggleIconButtonSample'),
	ViewManagerSample               : require('./ViewManagerSample'),
	WheelSliderControllerSample     : require('./WheelSliderControllerSample')
};

module.exports = kind({
	kind: SampleList,
	title: 'Garnet Samples',
	libraryName: 'Garnet',
	samples: samples
});
