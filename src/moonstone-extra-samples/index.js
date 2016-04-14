require('enyo/options').accessibility = true;

var
	kind = require('enyo/kind'),
	ready = require('enyo/ready');

var
	MoonstoneExtra = require('moonstone-extra');

var
	oldSampler = require('../moonstone-samples/src/All');

// Define all of the extras samples
var samples = {
	// ActivityPanelsWithVideoSample        : require('./src/ActivityPanelsWithVideoSample'),
	// AlwaysViewingPanelsWithVideoSample   : require('./src/AlwaysViewingPanelsWithVideoSample'),
	// HistorySample                        : require('./src/HistorySample'),
	// PanelsVideoPlayerSample              : require('./src/PanelsVideoPlayerSample'),
	// VideoPlayerInlineSample              : require('./src/VideoPlayerInlineSample'),
	// VideoPlayerSample                    : require('./src/VideoPlayerSample')
};

// Add in all of the moonstone samples
var moonstoneSamples = {
	AccessibilitySample                  : require('../moonstone-samples/src/AccessibilitySample'),
	AccordionSample                      : require('../moonstone-samples/src/AccordionSample'),
	// ActivityPanelsSample                 : require('../moonstone-samples/src/ActivityPanelsSample'),
	// // ActivityPanelsWithVideoSample        : require('../moonstone-samples/src/ActivityPanelsWithVideoSample'),
	// AlwaysViewingPanelsSample            : require('../moonstone-samples/src/AlwaysViewingPanelsSample'),
	// // AlwaysViewingPanelsWithVideoSample   : require('../moonstone-samples/src/AlwaysViewingPanelsWithVideoSample'),
	// AnimatedButtonSample                 : require('../moonstone-samples/src/AnimatedButtonSample'),
	// AudioPlaybackSample                  : require('../moonstone-samples/src/AudioPlaybackSample'),
	// AudioPlaybackPlaylistSupportSample   : require('../moonstone-samples/src/AudioPlaybackPlaylistSupportSample'),
	// BodyTextSample                       : require('../moonstone-samples/src/BodyTextSample'),
	// ButtonSample                         : require('../moonstone-samples/src/ButtonSample'),
	// CalendarSample                       : require('../moonstone-samples/src/CalendarSample'),
	// CheckboxItemSample                   : require('../moonstone-samples/src/CheckboxItemSample'),
	// ClockSample                          : require('../moonstone-samples/src/ClockSample'),
	// ContextualPopupSample                : require('../moonstone-samples/src/ContextualPopupSample'),
	// DataGridListSample                   : require('../moonstone-samples/src/DataGridListSample'),
	// DataListSample                       : require('../moonstone-samples/src/DataListSample'),
	// DatePickerSample                     : require('../moonstone-samples/src/DatePickerSample'),
	// DialogSample                         : require('../moonstone-samples/src/DialogSample'),
	// DividerSample                        : require('../moonstone-samples/src/DividerSample'),
	// DrawerSample                         : require('../moonstone-samples/src/DrawerSample'),
	// DynamicPanelsSample                  : require('../moonstone-samples/src/DynamicPanelsSample'),
	// ExpandableDataPickerSample           : require('../moonstone-samples/src/ExpandableDataPickerSample'),
	// ExpandableInputSample                : require('../moonstone-samples/src/ExpandableInputSample'),
	// ExpandableListItemSample             : require('../moonstone-samples/src/ExpandableListItemSample'),
	// ExpandablePickerSample               : require('../moonstone-samples/src/ExpandablePickerSample'),
	// ExpandableTextSample                 : require('../moonstone-samples/src/ExpandableTextSample'),
	// FontSample                           : require('../moonstone-samples/src/FontSample'),
	// FormCheckboxSample                   : require('../moonstone-samples/src/FormCheckboxSample'),
	// HeaderSample                         : require('../moonstone-samples/src/HeaderSample'),
	// HighlightTextSample                  : require('../moonstone-samples/src/HighlightTextSample'),
	// HistorySample                        : require('../moonstone-samples/src/HistorySample'),
	IconButtonSample                     : require('../moonstone-samples/src/IconButtonSample'),
	IconSample                           : require('../moonstone-samples/src/IconSample'),
	ImageBadgeSample                     : require('../moonstone-samples/src/ImageBadgeSample'),
	ImageItemSample                      : require('../moonstone-samples/src/ImageItemSample'),
	ImageSample                          : require('../moonstone-samples/src/ImageSample'),
	// InputHeaderSample                    : require('../moonstone-samples/src/InputHeaderSample'),
	InputSample                          : require('../moonstone-samples/src/InputSample'),
	// IntegerPickerSample                  : require('../moonstone-samples/src/IntegerPickerSample'),
	// ItemSample                           : require('../moonstone-samples/src/ItemSample'),
	// ItemOverlaySample                    : require('../moonstone-samples/src/ItemOverlaySample'),
	// LabeledTextItemSample                : require('../moonstone-samples/src/LabeledTextItemSample'),
	// LightPanelsSample                    : require('../moonstone-samples/src/LightPanelsSample'),
	// ListActionsSample                    : require('../moonstone-samples/src/ListActionsSample'),
	// MarqueeSample                        : require('../moonstone-samples/src/MarqueeSample'),
	// NewDataListSample                    : require('../moonstone-samples/src/NewDataListSample'),
	// ObjectActionHorizontalTypeSample     : require('../moonstone-samples/src/ObjectActionHorizontalTypeSample'),
	// ObjectActionVerticalTypeSample       : require('../moonstone-samples/src/ObjectActionVerticalTypeSample'),
	// OverlaySample                        : require('../moonstone-samples/src/OverlaySample'),
	// // PanelsVideoPlayerSample              : require('../moonstone-samples/src/PanelsVideoPlayerSample'),
	// PanelsWithCardArrangerSample         : require('../moonstone-samples/src/PanelsWithCardArrangerSample'),
	// PanelsWithCarouselArrangerSample     : require('../moonstone-samples/src/PanelsWithCarouselArrangerSample'),
	PopupSample                          : require('../moonstone-samples/src/PopupSample'),
	// ProgressButtonSample                 : require('../moonstone-samples/src/ProgressButtonSample'),
	// ProgressSample                       : require('../moonstone-samples/src/ProgressSample'),
	// RadioItemSample                      : require('../moonstone-samples/src/RadioItemSample'),
	// Scroller2dSample                     : require('../moonstone-samples/src/Scroller2dSample'),
	// ScrollerHorizontalSample             : require('../moonstone-samples/src/ScrollerHorizontalSample'),
	// ScrollerTextSample                   : require('../moonstone-samples/src/ScrollerTextSample'),
	// ScrollerVerticalSample               : require('../moonstone-samples/src/ScrollerVerticalSample'),
	// SelectableItemSample                 : require('../moonstone-samples/src/SelectableItemSample'),
	// SimpleIntegerPickerSample            : require('../moonstone-samples/src/SimpleIntegerPickerSample'),
	// SimplePickerSample                   : require('../moonstone-samples/src/SimplePickerSample'),
	// SliderSample                         : require('../moonstone-samples/src/SliderSample'),
	// SpinnerSample                        : require('../moonstone-samples/src/SpinnerSample'),
	// TableSample                          : require('../moonstone-samples/src/TableSample'),
	// TimePickerSample                     : require('../moonstone-samples/src/TimePickerSample'),
	// ToggleButtonSample                   : require('../moonstone-samples/src/ToggleButtonSample'),
	// ToggleItemSample                     : require('../moonstone-samples/src/ToggleItemSample'),
	// TooltipSample                        : require('../moonstone-samples/src/TooltipSample')
	// VideoPlayerInlineSample              : require('../moonstone-samples/src/VideoPlayerInlineSample'),
	// VideoPlayerSample                    : require('../moonstone-samples/src/VideoPlayerSample')
};

// Merge old samples with new samples
for (var s in moonstoneSamples) {
	if (!samples[s]) {
		samples[s] = moonstoneSamples[s];
	}
}

var NewSampler = kind({
	kind: oldSampler,
	title: 'Moonstone Extra Samples',
	samples: samples,
	create: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			console.log('%cMoonstone-Extra: %s', 'color:blue', MoonstoneExtra.version);
		};
	})
});

ready(function() {
	new NewSampler().renderInto(document.body);
});
