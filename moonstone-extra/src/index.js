var
	kind = require('enyo/kind');

var
	oldSampler = require('../../src/moonstone-samples/lib/All');

// Define all of the extras samples
var samples = {
	AudioPlaybackSample                  : require('./AudioPlaybackSample'),
	AudioPlaybackPlaylistSupportSample   : require('./AudioPlaybackPlaylistSupportSample'),
	ActivityPanelsSample                 : require('./ActivityPanelsSample'),
	ActivityPanelsWithVideoSample        : require('./ActivityPanelsWithVideoSample'),
	AlwaysViewingPanelsSample            : require('./AlwaysViewingPanelsSample'),
	AlwaysViewingPanelsWithVideoSample   : require('./AlwaysViewingPanelsWithVideoSample'),
	DaySelectorSample                    : require('./DaySelectorSample'),
	DrawerSample                         : require('./DrawerSample'),
	DynamicPanelsSample                  : require('./DynamicPanelsSample'),
	HeaderAutoCollapsingSample           : require('./HeaderAutoCollapsingSample'),
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
	AccessibilitySample                  : require('../../src/moonstone-samples/lib/AccessibilitySample'),
	AccordionSample                      : require('../../src/moonstone-samples/lib/AccordionSample'),
	// ActivityPanelsSample                 : require('../../src/moonstone-samples/lib/ActivityPanelsSample'),
	// ActivityPanelsWithVideoSample        : require('../../src/moonstone-samples/lib/ActivityPanelsWithVideoSample'),
	// AlwaysViewingPanelsSample            : require('../../src/moonstone-samples/lib/AlwaysViewingPanelsSample'),
	// AlwaysViewingPanelsWithVideoSample   : require('../../src/moonstone-samples/lib/AlwaysViewingPanelsWithVideoSample'),
	BodyTextSample                       : require('../../src/moonstone-samples/lib/BodyTextSample'),
	ButtonSample                         : require('../../src/moonstone-samples/lib/ButtonSample'),
	CalendarSample                       : require('../../src/moonstone-samples/lib/CalendarSample'),
	CheckboxItemSample                   : require('../../src/moonstone-samples/lib/CheckboxItemSample'),
	ClockSample                          : require('../../src/moonstone-samples/lib/ClockSample'),
	ContextualPopupSample                : require('../../src/moonstone-samples/lib/ContextualPopupSample'),
	DataGridListSample                   : require('../../src/moonstone-samples/lib/DataGridListSample'),
	DataListSample                       : require('../../src/moonstone-samples/lib/DataListSample'),
	DatePickerSample                     : require('../../src/moonstone-samples/lib/DatePickerSample'),
	DialogSample                         : require('../../src/moonstone-samples/lib/DialogSample'),
	DividerSample                        : require('../../src/moonstone-samples/lib/DividerSample'),
	// DrawerSample                         : require('../../src/moonstone-samples/lib/DrawerSample'),
	// DynamicPanelsSample                  : require('../../src/moonstone-samples/lib/DynamicPanelsSample'),
	ExpandableDataPickerSample           : require('../../src/moonstone-samples/lib/ExpandableDataPickerSample'),
	ExpandableInputSample                : require('../../src/moonstone-samples/lib/ExpandableInputSample'),
	ExpandableListItemSample             : require('../../src/moonstone-samples/lib/ExpandableListItemSample'),
	ExpandablePickerSample               : require('../../src/moonstone-samples/lib/ExpandablePickerSample'),
	ExpandableTextSample                 : require('../../src/moonstone-samples/lib/ExpandableTextSample'),
	FontSample                           : require('../../src/moonstone-samples/lib/FontSample'),
	FormCheckboxSample                   : require('../../src/moonstone-samples/lib/FormCheckboxSample'),
	// HeaderAutoCollapsingSample           : require('../../src/moonstone-samples/lib/HeaderAutoCollapsingSample'),
	HeaderSample                         : require('../../src/moonstone-samples/lib/HeaderSample'),
	HighlightTextSample                  : require('../../src/moonstone-samples/lib/HighlightTextSample'),
	// HistorySample                        : require('../../src/moonstone-samples/lib/HistorySample'),
	IconButtonSample                     : require('../../src/moonstone-samples/lib/IconButtonSample'),
	IconSample                           : require('../../src/moonstone-samples/lib/IconSample'),
	ImageBadgeSample                     : require('../../src/moonstone-samples/lib/ImageBadgeSample'),
	ImageItemSample                      : require('../../src/moonstone-samples/lib/ImageItemSample'),
	ImageSample                          : require('../../src/moonstone-samples/lib/ImageSample'),
	InputHeaderSample                    : require('../../src/moonstone-samples/lib/InputHeaderSample'),
	InputSample                          : require('../../src/moonstone-samples/lib/InputSample'),
	IntegerPickerSample                  : require('../../src/moonstone-samples/lib/IntegerPickerSample'),
	ItemSample                           : require('../../src/moonstone-samples/lib/ItemSample'),
	ItemOverlaySample                    : require('../../src/moonstone-samples/lib/ItemOverlaySample'),
	LabeledTextItemSample                : require('../../src/moonstone-samples/lib/LabeledTextItemSample'),
	LightPanelsSample                    : require('../../src/moonstone-samples/lib/LightPanelsSample'),
	// ListActionsSample                    : require('../../src/moonstone-samples/lib/ListActionsSample'),
	MarqueeSample                        : require('../../src/moonstone-samples/lib/MarqueeSample'),
	NewDataListSample                    : require('../../src/moonstone-samples/lib/NewDataListSample'),
	ObjectActionHorizontalTypeSample     : require('../../src/moonstone-samples/lib/ObjectActionHorizontalTypeSample'),
	ObjectActionVerticalTypeSample       : require('../../src/moonstone-samples/lib/ObjectActionVerticalTypeSample'),
	OverlaySample                        : require('../../src/moonstone-samples/lib/OverlaySample'),
	// PanelsVideoPlayerSample              : require('../../src/moonstone-samples/lib/PanelsVideoPlayerSample'),
	// PanelsWithCardArrangerSample         : require('../../src/moonstone-samples/lib/PanelsWithCardArrangerSample'),
	// PanelsWithCarouselArrangerSample     : require('../../src/moonstone-samples/lib/PanelsWithCarouselArrangerSample'),
	PopupSample                          : require('../../src/moonstone-samples/lib/PopupSample'),
	ProgressButtonSample                 : require('../../src/moonstone-samples/lib/ProgressButtonSample'),
	ProgressSample                       : require('../../src/moonstone-samples/lib/ProgressSample'),
	RadioItemSample                      : require('../../src/moonstone-samples/lib/RadioItemSample'),
	Scroller2dSample                     : require('../../src/moonstone-samples/lib/Scroller2dSample'),
	ScrollerHorizontalSample             : require('../../src/moonstone-samples/lib/ScrollerHorizontalSample'),
	ScrollerTextSample                   : require('../../src/moonstone-samples/lib/ScrollerTextSample'),
	ScrollerVerticalSample               : require('../../src/moonstone-samples/lib/ScrollerVerticalSample'),
	SelectableItemSample                 : require('../../src/moonstone-samples/lib/SelectableItemSample'),
	SimpleIntegerPickerSample            : require('../../src/moonstone-samples/lib/SimpleIntegerPickerSample'),
	SimplePickerSample                   : require('../../src/moonstone-samples/lib/SimplePickerSample'),
	SliderSample                         : require('../../src/moonstone-samples/lib/SliderSample'),
	SpinnerSample                        : require('../../src/moonstone-samples/lib/SpinnerSample'),
	TableSample                          : require('../../src/moonstone-samples/lib/TableSample'),
	TimePickerSample                     : require('../../src/moonstone-samples/lib/TimePickerSample'),
	ToggleButtonSample                   : require('../../src/moonstone-samples/lib/ToggleButtonSample'),
	ToggleItemSample                     : require('../../src/moonstone-samples/lib/ToggleItemSample'),
	TooltipSample                        : require('../../src/moonstone-samples/lib/TooltipSample')
	// VideoPlayerInlineSample              : require('../../src/moonstone-samples/lib/VideoPlayerInlineSample'),
	// VideoPlayerSample                    : require('../../src/moonstone-samples/lib/VideoPlayerSample')
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
	samples: samples
});

module.exports = newSampler;
