var
	kind = require('enyo/kind'),
	IMG = require('enyo/Image'),
	Button = require('enyo/Button'),
	Input = require('enyo/Input'),
	CheckBox = require('enyo/Checkbox'),
	Slider = require('onyx/Slider');

module.exports = kind({
	name: "heartsample",
	classes: "enyo-fit heart-sample",
	components: [
		{
			name: 'heartFlyIcon',
			kind: IMG,
			classes: 'heart-icon heart-tick-icon heart-fly-icon',
			src: '@../../assets/heart-fly.png',
			scene: {
				path:[[0,0,0], [400,-100,0],[-400,-200,0], [0,-300,0]],
				duration: 2000
			},
			ontap: "fly"
		},
		{name:"playButton", kind:Button, content: "Start", ontap: "playAnimation"},
		{name:"pauseButton", kind:Button, content: "Pause", ontap: "pauseAnimation"},
		{name:"resumeButton", kind:Button, content: "Resume", ontap: "resumeAnimation"},
		{name:"reverseButton", kind: Button, content: "Reverse", ontap: "reverseAnimation"},
		{name:"stopButton", kind: Button, content: "Stop", ontap: "stopAnimation"},
		{name:"fastButton", kind: Button, content: "Fast", ontap: "fastAnimation"},
		{name:"slowButton", kind: Button, content: "Slow", ontap: "slowAnimation"},
		{name:"showPath", kind: CheckBox, content: "Show Animation Path", onchange: "pathChanged"},
		{components:[
			{name: "seekInput", kind: Input, placeholder: "Seek"},
			{name: "seekButton", kind: Button, content: "Jump to", ontap: "seekAnimation"}
		]},
		{name: "slider", kind: Slider, onChanging:"sliderChanging"}
	],
	binding: [
		{ from: "$.slider.value", to: "flyScene.timeline", transform: function(v) { return parseInt(v, 10);}}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.$.slider.set('max', 2000);
			this.$.heartFlyIcon.scene.step = function(actor) {
				var parent = actor.parent;
				if (this.showPath) {
					var mat = actor.currentState.matrix,
						s = actor.name == 'heartFlyIcon' ? "left: 30%;" : "left: 60%;";
					parent.createComponent({
						classes: "heart-dot",
						style: "transform: matrix3d(" + mat + ");" + s
					}).render();
				}
				parent.$.slider.set('value', this.timeline);
			};
		};
	}),
	playAnimation: function(sender, ev) {
		this.$.heartFlyIcon.scene.play();
	},
	resumeAnimation: function (sender, ev){
		this.$.heartFlyIcon.scene.resume();
	},
	pauseAnimation: function(sender, ev) {
		this.$.heartFlyIcon.scene.pause();
	},
	stopAnimation: function(sender, ev) {
		this.$.heartFlyIcon.scene.stop();
	},
	reverseAnimation: function(sender, ev) {
		this.$.heartFlyIcon.scene.reverse();
	},
	seekAnimation: function(sender, ev) {
		this.$.heartFlyIcon.scene.timeline = parseInt(this.$.seekInput.value, 10);
	},
	fastAnimation: function(sender, ev) {
		this.$.heartFlyIcon.scene.fast(2);
	},
	slowAnimation: function(sender, ev) {
		this.$.heartFlyIcon.scene.slow(0.2);
	},
	sliderChanging: function(inSender, inEvent) {
		this.$.heartFlyIcon.scene.timeline = parseInt(inSender.getValue(), 10);
	},
	pathChanged: function () {
		this.$.heartFlyIcon.scene.showPath = this.$.showPath.checked;
	}
});