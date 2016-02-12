require('enyo/options').accessibility = true;

var
	kind = require('enyo/kind'),
	ready = require('enyo/ready');

var
	Sunstone = require('sunstone');

var
	SampleList = require('../strawman/SampleList');

// Define all of the extras samples
var samples = {
	ButtonSample                      : require('./src/ButtonSample'),
	CheckboxItemSample                : require('./src/CheckboxItemSample'),
	ContextualPopupSample             : require('./src/ContextualPopupSample'),
	DataGridListSample                : require('./src/DataGridListSample'),
	DataListSample                    : require('./src/DataListSample'),
	GridListSample                    : require('./src/GridListSample'),
	HeaderSample                      : require('./src/HeaderSample'),
	IconButtonSample                  : require('./src/IconButtonSample'),
	InputSample                       : require('./src/InputSample'),
	LightPanelsSample                 : require('./src/LightPanelsSample'),
	ListSample                        : require('./src/ListSample'),
	NewDataListSample                 : require('./src/NewDataListSample'),
	PanelSample                       : require('./src/PanelSample'),
	PopupSample                       : require('./src/PopupSample'),
	ProgressBarSample                 : require('./src/ProgressBarSample'),
	RadioItemSample                   : require('./src/RadioItemSample'),
	SliderSample                      : require('./src/SliderSample'),
	SpinnerSample                     : require('./src/SpinnerSample'),
	TabSample                         : require('./src/TabSample'),
	ToastPopupSample                  : require('./src/ToastPopupSample'),
	ToggleButtonSample                : require('./src/ToggleButtonSample'),
	PatternSample_Contacts            : require('./src/PatternSample_Contacts'),
	PatternSample_DeleteData          : require('./src/PatternSample_DeleteData'),
	PatternSample_GridListFlickr      : require('./src/PatternSample_GridListFlickr'),
	PatternSample_Profile             : require('./src/PatternSample_Profile'),
	PatternSample_WatchManager        : require('./src/PatternSample_WatchManager'),
	PatternSample_VolumeSetting       : require('./src/PatternSample_VolumeSetting')
};

var Sample = kind({
	kind: SampleList,
	title: 'Sunstone Samples',
	version: Sunstone.version,
	libraryName: 'Sunstone',
	samples: samples
});

ready(function() {
	new Sample().renderInto(document.body);
});
