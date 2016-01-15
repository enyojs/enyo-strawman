var
	kind = require('enyo/kind');

var
	SampleList = require('../../src/strawman/SampleList');

// Define all of the extras samples
var samples = {
	ButtonSample                      : require('./ButtonSample'),
	CheckboxItemSample                : require('./CheckboxItemSample'),
	ContextualPopupSample             : require('./ContextualPopupSample'),
	DataGridListSample                : require('./DataGridListSample'),
	DataListSample                    : require('./DataListSample'),
	GridListSample                    : require('./GridListSample'),
	HeaderSample                      : require('./HeaderSample'),
	IconButtonSample                  : require('./IconButtonSample'),
	InputSample                       : require('./InputSample'),
	LightPanelsSample                 : require('./LightPanelsSample'),
	ListSample                        : require('./ListSample'),
	NewDataListSample                 : require('./NewDataListSample'),
	PanelSample                       : require('./PanelSample'),
	PopupSample                       : require('./PopupSample'),
	ProgressBarSample                 : require('./ProgressBarSample'),
	RadioItemSample                   : require('./RadioItemSample'),
	SliderSample                      : require('./SliderSample'),
	SpinnerSample                     : require('./SpinnerSample'),
	TabSample                         : require('./TabSample'),
	ToastPopupSample                  : require('./ToastPopupSample'),
	ToggleButtonSample                : require('./ToggleButtonSample'),
	PatternSample_Contacts            : require('./PatternSample_Contacts'),
	PatternSample_DeleteData          : require('./PatternSample_DeleteData'),
	PatternSample_GridListFlickr      : require('./PatternSample_GridListFlickr'),
	PatternSample_Profile             : require('./PatternSample_Profile'),
	PatternSample_WatchManager        : require('./PatternSample_WatchManager'),
	PatternSample_VolumeSetting       : require('./PatternSample_VolumeSetting')
};

module.exports = kind({
	kind: SampleList,
	title: 'Sunstone Samples',
	libraryName: 'Sunstone',
	samples: samples
});
