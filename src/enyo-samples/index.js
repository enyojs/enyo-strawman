var
	kind = require('enyo/kind'),
	ready = require('enyo/ready');

var
	Anchor = require('enyo/Anchor'),
	Collection = require('enyo/Collection'),
	Control = require('enyo/Control'),
	DataRepeater = require('enyo/DataRepeater'),
	Scroller = require('enyo/Scroller');
	
var	
	samples = {
		AccessibilitySample: require('./lib/AccessibilitySample'),
		AjaxSample: require('./lib/AjaxSample'),
		AnchorSample: require('./lib/AnchorSample'),
		AnimatorSample: require('./lib/AnimatorSample'),
		AudioSample: require('./lib/AudioSample'),
		ButtonSample: require('./lib/ButtonSample'),
		CheckboxSample: require('./lib/CheckboxSample'),
		ComponentOverrideSample: require('./lib/ComponentOverrideSample'),
		DataGridListSample: require('./lib/DataGridListSample'),
		DataListSample: require('./lib/DataListSample'),
		DataListScrollTestbed: require('./lib/DataListScrollTestbed'), //has test variations that don't work for list atm
		DataRepeaterSample: require('./lib/DataRepeaterSample'),
		DragAvatarSample: require('./lib/DragAvatarSample'),
		DrawerSample: require('./lib/DrawerSample'),
		FullscreenSample: require('./lib/FullscreenSample'),
		GestureSample: require('./lib/GestureSample'),
		GroupSample: require('./lib/GroupSample'),
		HoldSample: require('./lib/HoldSample'), 
		ImageSample: require('./lib/ImageSample'),
		InputSample: require('./lib/InputSample'),
		JsonpSample: require('./lib/JsonpSample'),
		LightPanelsSample: require('./lib/LightPanelsSample'),
		NestedRepeaterSample: require('./lib/NestedRepeaterSample'),
		NewDrawerSample: require('./lib/NewDrawerSample'),
		PageVisibilitySample: require('./lib/PageVisibilitySample'),
		PlatformSample: require('./lib/PlatformSample'),
		PopupSample: require('./lib/PopupSample'),
		PositionSample: require('./lib/PositionSample'),
		RepeaterSample: require('./lib/RepeaterSample'),
		RichTextSample: require('./lib/RichTextSample'),
		ScrollerSample: require('./lib/ScrollerSample'),
		SelectSample: require('./lib/SelectSample'),
		SpriteAnimationSample: require('./lib/SpriteAnimationSample'),
		StylesheetSupportSample: require('./lib/StylesheetSupportSample'),
		TableSample: require('./lib/TableSample'),
		TextAreaSample: require('./lib/TextAreaSample'),
		VideoSample: require('./lib/VideoSample'),
		WebServiceSample: require('./lib/WebServiceSample')
	};

var List = kind({
	kind: Scroller,
	classes: 'enyo-fit',
	components: [
		{name: 'list', kind: DataRepeater, components: [
			{style: 'margin: 10px;', components: [
				{name: 'a', kind: Anchor}
			], bindings: [
				{from: 'model.name', to: '$.a.href', transform: function (v) { return '?Enyo&' + v; }},
				{from: 'model.name', to: '$.a.content', transform: function (v) { return v + ' Sample'; }}
			]}
		]}
	],
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.$.list.set('collection', new Collection(Object.keys(samples).map(function (key) {
			return {name: key};
		})));
	}
});

module.exports = kind({
	create: function() {
		
		this.inherited(arguments);
		
		var names = window.document.location.search.substring(1).split('&');
		var name = names[1] || names[0];
		
		var sample = samples[name] || List;
		
		this.createComponent({kind:sample});
	}
});



