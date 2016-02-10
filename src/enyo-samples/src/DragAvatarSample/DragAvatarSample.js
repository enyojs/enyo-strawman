var
	kind = require('enyo/kind');

var
	DragAvatar = require('enyo/DragAvatar'),
	EnyoImage = require('enyo/Image');

module.exports = kind({
	name: 'enyo.sample.DragAvatarSample',
	classes: 'drag-avatar-sample',
	components: [
		{content: 'Start dragging anywhere on the screen (open sample in new tab).'},
		{kind: DragAvatar, offsetX: 0, offsetY: 64, components: [
			{kind: EnyoImage, name: 'imageAvatar', src: 'http://enyojs.com/img/enyo-logo.png'}
		]}
	],
	handlers: {
		ondrag: 'drag',
		ondragfinish: 'dragFinish'
	},
	drag: function (sender, ev) {
		this.$.dragAvatar.drag(ev);
	},
	dragFinish: function (sender, ev) {
		this.$.dragAvatar.hide();
	}
});
