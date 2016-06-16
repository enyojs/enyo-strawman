var
	kind = require('enyo/kind'),
	IMG = require('enyo/Image'),
	Button = require('enyo/Button'),
	Input = require('enyo/Input'),
	CheckBox = require('enyo/Checkbox'),
	animate = require('enyo/scene'),
	Slider = require('onyx/Slider');

var flyPath = {
	path: [
		[0, 0, 0],
		[400, -100, 0],
		[-400, -200, 0],
		[0, -300, 0]
	],
	duration: 2000
};

module.exports = kind({
	name: "heartsample",
	classes: "enyo-fit heart-sample",
	flyScene: {},
	components: [
		{
			name: 'heartFlyIcon',
			kind: IMG,
			classes: 'heart-icon heart-tick-icon heart-fly-icon',
			src: '@../../assets/heart-fly.png',
			ontap: "fly"
		},
		{ name: "playButton", kind: Button, content: "Start", ontap: "playAnimation" },
		{ name: "pauseButton", kind: Button, content: "Pause", ontap: "pauseAnimation" },
		{ name: "resumeButton", kind: Button, content: "Resume", ontap: "resumeAnimation" },
		{ name: "reverseButton", kind: Button, content: "Reverse", ontap: "reverseAnimation" },
		{ name: "stopButton", kind: Button, content: "Stop", ontap: "stopAnimation" },
		{ name: "fastButton", kind: Button, content: "Fast", ontap: "fastAnimation" },
		{ name: "slowButton", kind: Button, content: "Slow", ontap: "slowAnimation" },
		{ name: "repeatButton", kind: Button, content: "Repeat", ontap: "repeatAnimation" },
		{ name: "showPath", kind: CheckBox, content: "Show Animation Path", onchange: "pathChanged" },
		{
			components: [
				{ name: "seekInput", kind: Input, placeholder: "Seek" },
				{ name: "seekButton", kind: Button, content: "Jump to", ontap: "seekAnimation" }
			]
		},
		{ name: "slider", kind: Slider, onChanging: "sliderChanging" }
	],
	binding: [
		{ from: "$.slider.value", to: "flyScene.timeline", transform: function(v) { return parseInt(v, 10);}}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.$.slider.set('max', 2000);
			this.flyScene = animate(this.$.heartFlyIcon, flyPath, {
				isSequence: false,
				autoPlay: false,
				completed: this.completedAnimation,
				step: this.showPath
			});
		};
	}),
	showPath: function(actor) {
		var parent = actor.parent;

		if(!parent) return;
		if (this.showPath) {
			var mat = this.poses[0].currentState.matrix,
				s = actor.name == 'heartFlyIcon' ? "left: 45%;" : "left: 60%;";
			parent.createComponent({
				classes: "heart-dot",
				style: "transform: matrix3d(" + mat + ");" + s
			}).render();
		}
		parent.$.slider.set('value', this.timeline);
	},
	completedAnimation: function() {
		console.log("completed");
	},
	playAnimation: function() {
		this.flyScene.play();
	},
	resumeAnimation: function() {
		this.flyScene.resume();
	},
	pauseAnimation: function() {
		this.flyScene.pause();
	},
	stopAnimation: function() {
		this.flyScene.stop();
		this.flyScene.repeat = false;
	},
	reverseAnimation: function() {
		this.flyScene.reverse();
	},
	seekAnimation: function() {
		this.flyScene.timeline = parseInt(this.$.seekInput.value, 10);
	},
	fastAnimation: function() {
		this.flyScene.speed = 2;
	},
	slowAnimation: function() {
		this.flyScene.speed = 0.2;
	},
	repeatAnimation: function() {
		this.flyScene.repeat = true;
	},
	sliderChanging: function(inSender) {
		this.flyScene.timeline = parseInt(inSender.getValue(), 10);
	},
	pathChanged: function() {
		this.flyScene.showPath = this.$.showPath.checked;
	}
});
