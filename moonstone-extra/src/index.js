var
	kind = require('enyo/kind'),
	moonstone_extra = require('moonstone-extra');

var
	oldSampler = require('../../src/moonstone-samples/src/All');

// Define all of the extras samples
var samples = {
	AnimatedButtonSample                 : require('./AnimatedButtonSample'),
	AudioPlaybackSample                  : require('./AudioPlaybackSample'),
	AudioPlaybackPlaylistSupportSample   : require('./AudioPlaybackPlaylistSupportSample'),
	ActivityPanelsSample                 : require('./ActivityPanelsSample'),
	ActivityPanelsWithVideoSample        : require('./ActivityPanelsWithVideoSample'),
	AlwaysViewingPanelsSample            : require('./AlwaysViewingPanelsSample'),
	AlwaysViewingPanelsWithVideoSample   : require('./AlwaysViewingPanelsWithVideoSample'),
	DrawerSample                         : require('./DrawerSample'),
	DynamicPanelsSample                  : require('./DynamicPanelsSample'),
	HistorySample                        : require('./HistorySample'),
	ListActionsSample                    : require('./ListActionsSample'),
	PanelsVideoPlayerSample              : require('./PanelsVideoPlayerSample'),
	PanelsWithCardArrangerSample         : require('./PanelsWithCardArrangerSample'),
	PanelsWithCarouselArrangerSample     : require('./PanelsWithCarouselArrangerSample'),
	VideoPlayerInlineSample              : require('./VideoPlayerInlineSample'),
	VideoPlayerSample                    : require('./VideoPlayerSample')
};

// Mark all of the above samples as "new"
for (var s in samples) {
	samples[s]['new'] = true;
}

// Add in all of the moonstone samples
var moonstoneSamples = {
	AccessibilitySample                  : require('../../src/moonstone-samples/src/AccessibilitySample'),
	AccordionSample                      : require('../../src/moonstone-samples/src/AccordionSample'),
	// ActivityPanelsSample                 : require('../../src/moonstone-samples/src/ActivityPanelsSample'),
	// ActivityPanelsWithVideoSample        : require('../../src/moonstone-samples/src/ActivityPanelsWithVideoSample'),
	// AlwaysViewingPanelsSample            : require('../../src/moonstone-samples/src/AlwaysViewingPanelsSample'),
	// AlwaysViewingPanelsWithVideoSample   : require('../../src/moonstone-samples/src/AlwaysViewingPanelsWithVideoSample'),
	BodyTextSample                       : require('../../src/moonstone-samples/src/BodyTextSample'),
	ButtonSample                         : require('../../src/moonstone-samples/src/ButtonSample'),
	CalendarSample                       : require('../../src/moonstone-samples/src/CalendarSample'),
	CheckboxItemSample                   : require('../../src/moonstone-samples/src/CheckboxItemSample'),
	ClockSample                          : require('../../src/moonstone-samples/src/ClockSample'),
	ContextualPopupSample                : require('../../src/moonstone-samples/src/ContextualPopupSample'),
	DataGridListSample                   : require('../../src/moonstone-samples/src/DataGridListSample'),
	DataListSample                       : require('../../src/moonstone-samples/src/DataListSample'),
	DatePickerSample                     : require('../../src/moonstone-samples/src/DatePickerSample'),
	DialogSample                         : require('../../src/moonstone-samples/src/DialogSample'),
	DividerSample                        : require('../../src/moonstone-samples/src/DividerSample'),
	// DrawerSample                         : require('../../src/moonstone-samples/src/DrawerSample'),
	// DynamicPanelsSample                  : require('../../src/moonstone-samples/src/DynamicPanelsSample'),
	ExpandableDataPickerSample           : require('../../src/moonstone-samples/src/ExpandableDataPickerSample'),
	ExpandableInputSample                : require('../../src/moonstone-samples/src/ExpandableInputSample'),
	ExpandableListItemSample             : require('../../src/moonstone-samples/src/ExpandableListItemSample'),
	ExpandablePickerSample               : require('../../src/moonstone-samples/src/ExpandablePickerSample'),
	ExpandableTextSample                 : require('../../src/moonstone-samples/src/ExpandableTextSample'),
	FontSample                           : require('../../src/moonstone-samples/src/FontSample'),
	FormCheckboxSample                   : require('../../src/moonstone-samples/src/FormCheckboxSample'),
	HeaderSample                         : require('../../src/moonstone-samples/src/HeaderSample'),
	HighlightTextSample                  : require('../../src/moonstone-samples/src/HighlightTextSample'),
	// HistorySample                        : require('../../src/moonstone-samples/src/HistorySample'),
	IconButtonSample                     : require('../../src/moonstone-samples/src/IconButtonSample'),
	IconSample                           : require('../../src/moonstone-samples/src/IconSample'),
	ImageBadgeSample                     : require('../../src/moonstone-samples/src/ImageBadgeSample'),
	ImageItemSample                      : require('../../src/moonstone-samples/src/ImageItemSample'),
	ImageSample                          : require('../../src/moonstone-samples/src/ImageSample'),
	InputHeaderSample                    : require('../../src/moonstone-samples/src/InputHeaderSample'),
	InputSample                          : require('../../src/moonstone-samples/src/InputSample'),
	IntegerPickerSample                  : require('../../src/moonstone-samples/src/IntegerPickerSample'),
	ItemSample                           : require('../../src/moonstone-samples/src/ItemSample'),
	ItemOverlaySample                    : require('../../src/moonstone-samples/src/ItemOverlaySample'),
	LabeledTextItemSample                : require('../../src/moonstone-samples/src/LabeledTextItemSample'),
	LightPanelsSample                    : require('../../src/moonstone-samples/src/LightPanelsSample'),
	// ListActionsSample                    : require('../../src/moonstone-samples/src/ListActionsSample'),
	MarqueeSample                        : require('../../src/moonstone-samples/src/MarqueeSample'),
	NewDataListSample                    : require('../../src/moonstone-samples/src/NewDataListSample'),
	ObjectActionHorizontalTypeSample     : require('../../src/moonstone-samples/src/ObjectActionHorizontalTypeSample'),
	ObjectActionVerticalTypeSample       : require('../../src/moonstone-samples/src/ObjectActionVerticalTypeSample'),
	OverlaySample                        : require('../../src/moonstone-samples/src/OverlaySample'),
	// PanelsVideoPlayerSample              : require('../../src/moonstone-samples/src/PanelsVideoPlayerSample'),
	// PanelsWithCardArrangerSample         : require('../../src/moonstone-samples/src/PanelsWithCardArrangerSample'),
	// PanelsWithCarouselArrangerSample     : require('../../src/moonstone-samples/src/PanelsWithCarouselArrangerSample'),
	PopupSample                          : require('../../src/moonstone-samples/src/PopupSample'),
	ProgressButtonSample                 : require('../../src/moonstone-samples/src/ProgressButtonSample'),
	ProgressSample                       : require('../../src/moonstone-samples/src/ProgressSample'),
	RadioItemSample                      : require('../../src/moonstone-samples/src/RadioItemSample'),
	Scroller2dSample                     : require('../../src/moonstone-samples/src/Scroller2dSample'),
	ScrollerHorizontalSample             : require('../../src/moonstone-samples/src/ScrollerHorizontalSample'),
	ScrollerTextSample                   : require('../../src/moonstone-samples/src/ScrollerTextSample'),
	ScrollerVerticalSample               : require('../../src/moonstone-samples/src/ScrollerVerticalSample'),
	SelectableItemSample                 : require('../../src/moonstone-samples/src/SelectableItemSample'),
	SimpleIntegerPickerSample            : require('../../src/moonstone-samples/src/SimpleIntegerPickerSample'),
	SimplePickerSample                   : require('../../src/moonstone-samples/src/SimplePickerSample'),
	SliderSample                         : require('../../src/moonstone-samples/src/SliderSample'),
	SpinnerSample                        : require('../../src/moonstone-samples/src/SpinnerSample'),
	TableSample                          : require('../../src/moonstone-samples/src/TableSample'),
	TimePickerSample                     : require('../../src/moonstone-samples/src/TimePickerSample'),
	ToggleButtonSample                   : require('../../src/moonstone-samples/src/ToggleButtonSample'),
	ToggleItemSample                     : require('../../src/moonstone-samples/src/ToggleItemSample'),
	TooltipSample                        : require('../../src/moonstone-samples/src/TooltipSample')
	// VideoPlayerInlineSample              : require('../../src/moonstone-samples/src/VideoPlayerInlineSample'),
	// VideoPlayerSample                    : require('../../src/moonstone-samples/src/VideoPlayerSample')
};

// Merge old samples with new samples
for (var s in moonstoneSamples) {
	if (!samples[s]) {
		samples[s] = moonstoneSamples[s];
	}
}

var newSampler = kind({
	kind: oldSampler,
	title: 'Moonstone Extra Samples',
	samples: samples,
	create: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			console.log("Enyo Strawman - Moonstone-Extra: " + moonstone_extra.version);
		};
	})
});

module.exports = newSampler;
