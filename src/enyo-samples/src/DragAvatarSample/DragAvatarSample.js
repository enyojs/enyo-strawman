var
	kind = require('enyo/kind');

var
	DragAvatar = require('enyo/DragAvatar'),
	EnyoImage = require('enyo/Image');

module.exports = kind({
	name: 'enyo.sample.DragAvatarSample',
	classes: 'drag-avatar-sample enyo-fit',
	components: [
		{content: 'Start dragging anywhere on the screen.'},
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
