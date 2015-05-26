var
	kind = require('enyo/kind');

var
	List = require('../List');
	
var	
	samples = {
		AjaxSample: request('./lib/AjaxSample'),
		AnchorSample: request('./lib/AnchorSample'),
		AnimatorSample: request('./lib/AnimatorSample'),
		AudioSample: request('./lib/AudioSample'),
		ButtonSample: request('./lib/ButtonSample'),
		CheckboxSample: request('./lib/CheckboxSample'),
		ComponentOverrideSample: request('./lib/ComponentOverrideSample'),
		DataGridListSample: request('./lib/DataGridListSample'),
		DataListSample: request('./lib/DataListSample'),
		DataListScrollTestbed: request('./lib/DataListScrollTestbed'),
		DataRepeaterSample: request('./lib/DataRepeaterSample'),
		DragAvatarSample: request('./lib/DragAvatarSample'),
		DrawerSample: request('./lib/DrawerSample'),
		FullscreenSample: request('./lib/FullscreenSample'),
		GestureSample: request('./lib/GestureSample'),
		GroupSample: request('./lib/GroupSample'),
		HoldSample: request('./lib/HoldSample'), 
		ImageSample: request('./lib/ImageSample'),
		InputSample: request('./lib/InputSample'),
		JsonpSample: request('./lib/JsonpSample'),
		LightPanelsSample: request('./lib/LightPanelsSample'),
		NestedRepeaterSample: request('./lib/NestedRepeaterSample'),
		NewDrawerSample: request('./lib/NewDrawerSample'),
		PageVisibilitySample: request('./lib/PageVisibilitySample'),
		PlatformSample: request('./lib/PlatformSample'),
		PopupSample: request('./lib/PopupSample'),
		PositionSample: request('./lib/PositionSample'),
		RepeaterSample: request('./lib/RepeaterSample'),
		RichTextSample: request('./lib/RichTextSample'),
		ScrollerSample: request('./lib/ScrollerSample'),
		SelectSample: request('./lib/SelectSample'),
		SpriteAnimationSample: request('./lib/SpriteAnimationSample'),
		StylesheetSupportSample: request('./lib/StylesheetSupportSample'),
		TableSample: request('./lib/TableSample'),
		TextAreaSample: request('./lib/TextAreaSample'),
		VideoSample: request('./lib/VideoSample'),
		WebServiceSample: request('./lib/WebServiceSample')
	};

module.exports = kind({
	baseHref: 'Enyo',
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