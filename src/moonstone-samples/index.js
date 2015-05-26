var
	kind = require('enyo/kind'),
	// ready = require('enyo/ready'),
	// Sampler = require('./lib/All'),
	samples = {
		AccordionSample						: request('./lib/AccordionSample'),
		ActivityPanelsSample				: request('./lib/ActivityPanelsSample'),
		ActivityPanelsWithVideoSample		: request('./lib/ActivityPanelsWithVideoSample'),
		AlwaysViewingPanelsSample			: request('./lib/AlwaysViewingPanelsSample'),
		AlwaysViewingPanelsWithVideoSample	: request('./lib/AlwaysViewingPanelsWithVideoSample'),
		BodyTextSample						: request('./lib/BodyTextSample'),
		ButtonSample						: request('./lib/ButtonSample'),
		CalendarSample						: request('./lib/CalendarSample'),
		CheckboxItemSample					: request('./lib/CheckboxItemSample'),
		ClockSample							: request('./lib/ClockSample'),
		ContextualPopupSample				: request('./lib/ContextualPopupSample'),
		DataGridListSample					: request('./lib/DataGridListSample'),
		DataListSample						: request('./lib/DataListSample'),
		DatePickerSample					: request('./lib/DatePickerSample'),
		DialogSample						: request('./lib/DialogSample'),
		DividerSample						: request('./lib/DividerSample'),
		DrawerSample						: request('./lib/DrawerSample'),
		DynamicPanelsSample					: request('./lib/DynamicPanelsSample'),
		ExpandableDataPickerSample			: request('./lib/ExpandableDataPickerSample'),
		ExpandableInputSample				: request('./lib/ExpandableInputSample'),
		ExpandableListItemSample			: request('./lib/ExpandableListItemSample'),
		ExpandablePickerSample				: request('./lib/ExpandablePickerSample'),
		ExpandableTextSample				: request('./lib/ExpandableTextSample'),
		FontSample							: request('./lib/FontSample'),
		FormCheckboxSample					: request('./lib/FormCheckboxSample'),
		HeaderAutoCollapsingSample			: request('./lib/HeaderAutoCollapsingSample'),
		HeaderSample						: request('./lib/HeaderSample'),
		HighlightTextSample					: request('./lib/HighlightTextSample'),
		HistorySample						: request('./lib/HistorySample'),
		IconButtonSample					: request('./lib/IconButtonSample'),
		IconSample							: request('./lib/IconSample'),
		ImageBadgeSample					: request('./lib/ImageBadgeSample'),
		ImageItemSample						: request('./lib/ImageItemSample'),
		ImageSample							: request('./lib/ImageSample'),
		InputHeaderSample					: request('./lib/InputHeaderSample'),
		InputSample							: request('./lib/InputSample'),
		IntegerPickerSample					: request('./lib/IntegerPickerSample'),
		ItemSample							: request('./lib/ItemSample'),
		ItemOverlaySample					: request('./lib/ItemOverlaySample'),
		LabeledTextItemSample				: request('./lib/LabeledTextItemSample'),
		ListActionsSample					: request('./lib/ListActionsSample'),
		MarqueeSample						: request('./lib/MarqueeSample'),
		NewDataListSample					: request('./lib/NewDataListSample'),
		ObjectActionHorizontalTypeSample	: request('./lib/ObjectActionHorizontalTypeSample'),
		ObjectActionVerticalTypeSample		: request('./lib/ObjectActionVerticalTypeSample'),
		PanelsVideoPlayerSample				: request('./lib/PanelsVideoPlayerSample'),
		PanelsWithCardArrangerSample		: request('./lib/PanelsWithCardArrangerSample'),
		PanelsWithCarouselArrangerSample	: request('./lib/PanelsWithCarouselArrangerSample'),
		PopupSample							: request('./lib/PopupSample'),
		ProgressButtonSample				: request('./lib/ProgressButtonSample'),
		ProgressSample						: request('./lib/ProgressSample'),
		RadioItemSample						: request('./lib/RadioItemSample'),
		Scroller2dSample					: request('./lib/Scroller2dSample'),
		ScrollerHorizontalSample			: request('./lib/ScrollerHorizontalSample'),
		ScrollerTextSample					: request('./lib/ScrollerTextSample'),
		ScrollerVerticalSample				: request('./lib/ScrollerVerticalSample'),
		SelectableItemSample				: request('./lib/SelectableItemSample'),
		SimpleIntegerPickerSample			: request('./lib/SimpleIntegerPickerSample'),
		SimplePickerSample					: request('./lib/SimplePickerSample'),
		SliderSample						: request('./lib/SliderSample'),
		SpinnerSample						: request('./lib/SpinnerSample'),
		TableSample							: request('./lib/TableSample'),
		TimePickerSample					: request('./lib/TimePickerSample'),
		ToggleButtonSample					: request('./lib/ToggleButtonSample'),
		ToggleItemSample					: request('./lib/ToggleItemSample'),
		TooltipSample						: request('./lib/TooltipSample'),
		VideoPlayerInlineSample				: request('./lib/VideoPlayerInlineSample'),
		VideoPlayerSample					: request('./lib/VideoPlayerSample')
	};

var
	List = require('../List');

// Sampler.samples = samples;
//
// module.exports = Sampler;

module.exports = kind({
	baseHref: 'Moonstone',
	kind: List,
	classes: 'enyo-fit',
	samples: Object.keys(samples),
	sampleChanged: function () {
		this.log(this.sample);
	
		var app = this.app;
		samples[this.sample].then(function (Sample) {
			app.setupView(Sample, function () { app.reRender(); });
		});
	}
});