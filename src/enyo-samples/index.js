var
	kind = require('enyo/kind');

var
	Enyo = require('enyo');

var
	ScrollingSampleList = require('../strawman/ScrollingSampleList');

var
	samples = {
		AccessibilitySample				: require('./src/AccessibilitySample'),
		AjaxSample						: require('./src/AjaxSample'),
		AnchorSample					: require('./src/AnchorSample'),
		AnimatorSample					: require('./src/AnimatorSample'),
		AudioSample						: require('./src/AudioSample'),
		BackgroundTaskManagerSample		: require('./src/BackgroundTaskManagerSample'),
		ButtonSample					: require('./src/ButtonSample'),
		CheckboxSample					: require('./src/CheckboxSample'),
		ComponentOverrideSample			: require('./src/ComponentOverrideSample'),
		DataGridListSample				: require('./src/DataGridListSample'),
		DataGridListSampleWithJSData	: require('./src/DataGridListSampleWithJSData'),
		DataListSample					: require('./src/DataListSample'),
		DataListSampleWithJSData		: require('./src/DataListSampleWithJSData'),
		DataListScrollTestbed			: require('./src/DataListScrollTestbed'), //has test variations that don't work for list atm
		DataRepeaterSample				: require('./src/DataRepeaterSample'),
		DataRepeaterSampleWithJSData	: require('./src/DataRepeaterSampleWithJSData'),
		DragAvatarSample				: require('./src/DragAvatarSample'),
		DrawerSample					: require('./src/DrawerSample'),
		FullscreenSample				: require('./src/FullscreenSample'),
		GestureSample					: require('./src/GestureSample'),
		GroupSample						: require('./src/GroupSample'),
		HoldSample						: require('./src/HoldSample'),
		ImageSample						: require('./src/ImageSample'),
		InputSample						: require('./src/InputSample'),
		JsonpSample						: require('./src/JsonpSample'),
		LightPanelsSample				: require('./src/LightPanelsSample'),
		NestedRepeaterSample			: require('./src/NestedRepeaterSample'),
		NewDrawerSample					: require('./src/NewDrawerSample'),
		PageVisibilitySample			: require('./src/PageVisibilitySample'),
		PlatformSample					: require('./src/PlatformSample'),
		PopupSample						: require('./src/PopupSample'),
		PositionSample					: require('./src/PositionSample'),
		RepeaterSample					: require('./src/RepeaterSample'),
		RichTextSample					: require('./src/RichTextSample'),
		ScrollerSample					: require('./src/ScrollerSample'),
		SelectSample					: require('./src/SelectSample'),
		ShowingTransitionSample			: require('./src/ShowingTransitionSample'),
		SpriteAnimationSample			: require('./src/SpriteAnimationSample'),
		StylesheetSupportSample			: require('./src/StylesheetSupportSample'),
		TableSample						: require('./src/TableSample'),
		TextAreaSample					: require('./src/TextAreaSample'),
		VideoSample						: require('./src/VideoSample'),
		WebServiceSample				: require('./src/WebServiceSample')
	};

module.exports = kind({
	kind: ScrollingSampleList,
	title: 'Enyo Samples',
	version: Enyo.version,
	libraryName: 'Enyo',
	samples: samples
});
