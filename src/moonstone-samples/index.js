var
	Sampler = require('./lib/All'),
	samples = {
		AccessibilitySample					: require('./lib/AccessibilitySample'),
		AccordionSample						: require('./lib/AccordionSample'),
		// ActivityPanelsSample				: require('./lib/ActivityPanelsSample'),
		// ActivityPanelsWithVideoSample		: require('./lib/ActivityPanelsWithVideoSample'),
		// AlwaysViewingPanelsSample			: require('./lib/AlwaysViewingPanelsSample'),
		// AlwaysViewingPanelsWithVideoSample	: require('./lib/AlwaysViewingPanelsWithVideoSample'),
		BodyTextSample						: require('./lib/BodyTextSample'),
		ButtonSample						: require('./lib/ButtonSample'),
		CalendarSample						: require('./lib/CalendarSample'),
		CheckboxItemSample					: require('./lib/CheckboxItemSample'),
		ClockSample							: require('./lib/ClockSample'),
		ContextualPopupSample				: require('./lib/ContextualPopupSample'),
		DataGridListSample					: require('./lib/DataGridListSample'),
		DataListSample						: require('./lib/DataListSample'),
		DatePickerSample					: require('./lib/DatePickerSample'),
		DialogSample						: require('./lib/DialogSample'),
		DividerSample						: require('./lib/DividerSample'),
		// DrawerSample						: require('./lib/DrawerSample'),
		// DynamicPanelsSample					: require('./lib/DynamicPanelsSample'),
		ExpandableDataPickerSample			: require('./lib/ExpandableDataPickerSample'),
		ExpandableInputSample				: require('./lib/ExpandableInputSample'),
		ExpandableListItemSample			: require('./lib/ExpandableListItemSample'),
		ExpandablePickerSample				: require('./lib/ExpandablePickerSample'),
		ExpandableTextSample				: require('./lib/ExpandableTextSample'),
		FontSample							: require('./lib/FontSample'),
		FormCheckboxSample					: require('./lib/FormCheckboxSample'),
		// HeaderAutoCollapsingSample			: require('./lib/HeaderAutoCollapsingSample'),
		HeaderSample						: require('./lib/HeaderSample'),
		HighlightTextSample					: require('./lib/HighlightTextSample'),
		// HistorySample						: require('./lib/HistorySample'),
		IconButtonSample					: require('./lib/IconButtonSample'),
		IconSample							: require('./lib/IconSample'),
		ImageBadgeSample					: require('./lib/ImageBadgeSample'),
		ImageItemSample						: require('./lib/ImageItemSample'),
		ImageSample							: require('./lib/ImageSample'),
		InputHeaderSample					: require('./lib/InputHeaderSample'),
		InputSample							: require('./lib/InputSample'),
		IntegerPickerSample					: require('./lib/IntegerPickerSample'),
		ItemSample							: require('./lib/ItemSample'),
		ItemOverlaySample					: require('./lib/ItemOverlaySample'),
		LabeledTextItemSample				: require('./lib/LabeledTextItemSample'),
		LightPanelsSample					: require('./lib/LightPanelsSample'),
		// ListActionsSample					: require('./lib/ListActionsSample'),
		MarqueeSample						: require('./lib/MarqueeSample'),
		NewDataListSample					: require('./lib/NewDataListSample'),
		NotificationSample					: require('./lib/NotificationSample'),
		ObjectActionHorizontalTypeSample	: require('./lib/ObjectActionHorizontalTypeSample'),
		ObjectActionVerticalTypeSample		: require('./lib/ObjectActionVerticalTypeSample'),
		OverlaySample						: require('./lib/OverlaySample'),
		// PanelsVideoPlayerSample				: require('./lib/PanelsVideoPlayerSample'),
		// PanelsWithCardArrangerSample		: require('./lib/PanelsWithCardArrangerSample'),
		// PanelsWithCarouselArrangerSample	: require('./lib/PanelsWithCarouselArrangerSample'),
		PopupSample							: require('./lib/PopupSample'),
		ProgressButtonSample				: require('./lib/ProgressButtonSample'),
		ProgressSample						: require('./lib/ProgressSample'),
		RadioItemSample						: require('./lib/RadioItemSample'),
		Scroller2dSample					: require('./lib/Scroller2dSample'),
		ScrollerHorizontalSample			: require('./lib/ScrollerHorizontalSample'),
		ScrollerTextSample					: require('./lib/ScrollerTextSample'),
		ScrollerVerticalSample				: require('./lib/ScrollerVerticalSample'),
		SelectableItemSample				: require('./lib/SelectableItemSample'),
		SimpleIntegerPickerSample			: require('./lib/SimpleIntegerPickerSample'),
		SimplePickerSample					: require('./lib/SimplePickerSample'),
		SliderSample						: require('./lib/SliderSample'),
		SpinnerSample						: require('./lib/SpinnerSample'),
		TableSample							: require('./lib/TableSample'),
		TimePickerSample					: require('./lib/TimePickerSample'),
		ToggleButtonSample					: require('./lib/ToggleButtonSample'),
		ToggleItemSample					: require('./lib/ToggleItemSample'),
		TooltipSample						: require('./lib/TooltipSample')
		// VideoPlayerInlineSample				: require('./lib/VideoPlayerInlineSample'),
		// VideoPlayerSample					: require('./lib/VideoPlayerSample')
	};

Sampler.samples = samples;

module.exports = Sampler;
