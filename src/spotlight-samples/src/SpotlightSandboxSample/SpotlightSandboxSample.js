var
	kind = require('enyo/kind'),
	Button = require('enyo/Button'),
	Control = require('enyo/Control'),
	Spotlight = require('spotlight');

var Barracuda = kind({
	name     : 'Barracuda',
	kind     : Control,
	classes  : 'barracuda',
	spotlight: true,

	handlers: {
		ondown : 'mousedown',
		onup   : 'mouseup',
		ondrag : 'drag'
	},

	components: [
		{name: 'corner', classes: 'barracuda-corner'}
	],

	index       : null,
	resizing    : false,
	cornerWidth : 20,
	initY       : null,
	initX       : null,
	initHeight  : null,
	initWidth   : null,

	rendered: function () {
		Control.prototype.rendered.apply(this, arguments);
		this.$.corner.addStyles('height:' + this.cornerWidth + 'px;width:' + this.cornerWidth + 'px;');
		this.index = this.parent.children.length;
	},

	mousedown: function (sender, ev) {
		Spotlight.TestMode.disable();
		// check if resizing
		this.resizing = this.isResizing(ev);

		// save initial values
		var bounds = this.getBounds();
		this.initY = bounds.top;
		this.initX = bounds.left;
		this.initWidth = bounds.width;
		this.initHeight = bounds.height;
	},

	mouseup: function (sender, ev) {
		Spotlight.TestMode.enable();
	},

	drag: function (sender, ev) {
		if(this.resizing) {
			this.doResize(ev);
		} else {
			this.doDrag(ev);
		}
	},

	isResizing: function (ev) {
		var bounds = this.getAbsoluteBounds(),
			relativeTop = ev.clientY - bounds.top,
			relativeLeft = ev.clientX - bounds.left,
			relativeBottom = bounds.height - relativeTop,
			relativeRight = bounds.width - relativeLeft;

		this.resizingX = (relativeLeft < this.cornerWidth)
			? -1
			: (relativeRight < this.cornerWidth)
				? 1
				: 0;

		this.resizingY = (relativeTop < this.cornerWidth)
			? -1
			: (relativeBottom < this.cornerWidth)
				? 1
				: 0;

		//	TODO - only pay attention to bottom right for resizing for now
		return (relativeRight < this.cornerWidth && relativeBottom < this.cornerWidth);
		// return this.resizingX !== 0 && this.resizingY !== 0;
	},

	doResize: function (ev) {
		this.addStyles('width:' + (ev.dx + this.initWidth) + 'px;height:' + (ev.dy + this.initHeight)+'px;');
	},

	doDrag: function (ev) {
		this.addStyles('left:' + (ev.dx + this.initX) + 'px;top:' + (ev.dy + this.initY)+'px;');
	}
});

module.exports = kind({
	name: 'enyo.sample.SpotlightSandboxSample',
	classes: 'spotlight-sample',
	fit: false,
	components:[
		{components: [
			{kind: Button, spotlight: true, content: 'Add Control', ontap: 'addBarracuda'}
		]},
		{name: 'container', style: 'position:relative;'}
	],
	rendered: function () {
		this.inherited(arguments);
		Spotlight.TestMode.enable();
		for (var y=0; y<2; y++) {
			for (var x=0; x<4; x++) {
				var b = this.$.container.createComponent({kind: Barracuda}).render();
				b.applyStyle('top', (100*(y+1)) + 'px');
				b.applyStyle('left', (100 + x * 100) + 'px');
			}
		}
	},
	destroy: function () {
		Spotlight.TestMode.disable();
		this.inherited(arguments);
	},
	addBarracuda: function () {
		var b = this.$.container.createComponent({kind: Barracuda}).render();
		b.applyStyle('z-index:'+this.$.container.getClientControls().length+';');
	}
});
