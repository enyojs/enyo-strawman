var
	kind = require('enyo/kind');

var
	SampleList = require('../strawman/SampleList');

var
	samples = {
		AccessibilitySample				: require('./lib/AccessibilitySample'),
		AjaxSample						: require('./lib/AjaxSample'),
		AnchorSample					: require('./lib/AnchorSample'),
		AnimatorSample					: require('./lib/AnimatorSample'),
		AudioSample						: require('./lib/AudioSample'),
		BackgroundTaskManagerSample		: require('./lib/BackgroundTaskManagerSample'),
		ButtonSample					: require('./lib/ButtonSample'),
		CheckboxSample					: require('./lib/CheckboxSample'),
		ComponentOverrideSample			: require('./lib/ComponentOverrideSample'),
		DataGridListSample				: require('./lib/DataGridListSample'),
		DataGridListSampleWithJSData	: require('./lib/DataGridListSampleWithJSData'),
		DataListSample					: require('./lib/DataListSample'),
		DataListSampleWithJSData		: require('./lib/DataListSampleWithJSData'),
		DataListScrollTestbed			: require('./lib/DataListScrollTestbed'), //has test variations that don't work for list atm
		DataRepeaterSample				: require('./lib/DataRepeaterSample'),
		DataRepeaterSampleWithJSData	: require('./lib/DataRepeaterSampleWithJSData'),
		DragAvatarSample				: require('./lib/DragAvatarSample'),
		DrawerSample					: require('./lib/DrawerSample'),
		FullscreenSample				: require('./lib/FullscreenSample'),
		GestureSample					: require('./lib/GestureSample'),
		GroupSample						: require('./lib/GroupSample'),
		HoldSample						: require('./lib/HoldSample'),
		ImageSample						: require('./lib/ImageSample'),
		InputSample						: require('./lib/InputSample'),
		JsonpSample						: require('./lib/JsonpSample'),
		LightPanelsSample				: require('./lib/LightPanelsSample'),
		NestedRepeaterSample			: require('./lib/NestedRepeaterSample'),
		NewDrawerSample					: require('./lib/NewDrawerSample'),
		PageVisibilitySample			: require('./lib/PageVisibilitySample'),
		PlatformSample					: require('./lib/PlatformSample'),
		PopupSample						: require('./lib/PopupSample'),
		PositionSample					: require('./lib/PositionSample'),
		RepeaterSample					: require('./lib/RepeaterSample'),
		RichTextSample					: require('./lib/RichTextSample'),
		ScrollerSample					: require('./lib/ScrollerSample'),
		SelectSample					: require('./lib/SelectSample'),
		SpriteAnimationSample			: require('./lib/SpriteAnimationSample'),
		StylesheetSupportSample			: require('./lib/StylesheetSupportSample'),
		TableSample						: require('./lib/TableSample'),
		TextAreaSample					: require('./lib/TextAreaSample'),
		VideoSample						: require('./lib/VideoSample'),
		WebServiceSample				: require('./lib/WebServiceSample')
	};

module.exports = kind({
	kind: SampleList,
	title: 'Enyo Samples',
	libraryName: 'Enyo',
	samples: samples
});
