var
	kind = require('enyo/kind'),
	IMG = require('enyo/Image'),
	Button = require('enyo/Button'),
	Input = require('enyo/Input'),
	CheckBox = require('enyo/Checkbox'),
	Slider = require('onyx/Slider'),
	scene = require('enyo/AnimationSupport/Scene');

/*
 Scene added here to create a fly animation for motion
 along a curved path i.e. a shape of reverse S.
*/
var flyScene = scene({
	//Path added as an animation, other animations can be added here.
	animation: {
		path:[[0,0,0], [400,-100,0],[-400,-200,0], [0,-300,0]]
	},
	duration: 2000,
	showPath: false,
	completed: function () {
		console.log("Completed scene");
	},
	step: function(actor) {
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
	}
});


module.exports = kind({
	name: "heartsample",
	classes: "enyo-fit heart-sample",
	components: [
		{
			name: 'heartFlyIcon',
			kind: IMG,
			classes: 'heart-icon heart-tick-icon heart-fly-icon',
			src: '@../../assets/heart-fly.png',
			ontap: "fly"
		},
		{
			name: 'heartFlyIcon2',
			kind: IMG,
			classes: 'heart-icon heart-tick-icon heart-fly-icon',
			style: 'left: 60%;',
			src: '@../../assets/heart-fly.png',
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
			this.createFlyAnimation();
			this.$.slider.set('max', flyScene.totalSpan());
		};
	}),
	createFlyAnimation: function (argument) {
		scene.link(this.$.heartFlyIcon, flyScene);
		scene.link(this.$.heartFlyIcon2, flyScene);
	},
	playAnimation: function(sender, ev) {
		flyScene.play();
	},
	resumeAnimation: function (sender, ev){
		flyScene.resume();
	},
	pauseAnimation: function(sender, ev) {
		flyScene.pause();
	},
	stopAnimation: function(sender, ev) {
		flyScene.stop();
	},
	reverseAnimation: function(sender, ev) {
		flyScene.reverse();
	},
	seekAnimation: function(sender, ev) {
		flyScene.timeline = parseInt(this.$.seekInput.value, 10);
	},
	fastAnimation: function(sender, ev) {
		flyScene.fast(2);
	},
	slowAnimation: function(sender, ev) {
		flyScene.slow(0.2);
	},
	sliderChanging: function(inSender, inEvent) {
		flyScene.timeline = parseInt(inSender.getValue(), 10);
	},
	pathChanged: function () {
		flyScene.showPath = this.$.showPath.checked;
	}
});