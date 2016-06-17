var
	kind = require('enyo/kind'),
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows'),
	Button = require('enyo/Button'),
	Input = require('enyo/Input'),
	animate = require('enyo/scene');

var controls= kind({
	name: "item",
	title: "",
	first:1,
	second: 1,
	third: 1,
	components: [
		{ name:"titleView", content:"sfdf" },
		{ name:"firstVal", kind :Input, value: 1,},
		{ name:"secondVal", kind :Input, value: 1, },
		{ name:"thirdVal", kind :Input, value: 1, }
	],
	bindings: [
		{ from: "title", to: "$.titleView.content"},
		{ from: "$.firstVal.value", to:"first" , oneWay:false},
		{ from: "$.secondVal.value", to:"second" , oneWay:false},
		{ from: "$.thirdVal.value", to:"third" , oneWay:false}
	],
	getValue: function () {
		return this.first + ','+ this.second +"," + this.third;
	}
});

var player = kind({
	events: {
		onPlay: "",
		onReset: "",
		onAdd: ""
	},
	components: [
		{ kind: Button, content: "Play", ontap: "doPlay" },
		{ kind: Button, content: "Reset", ontap: "doReset" },
		{ kind: Button, content: "Add", ontap: "doAdd" }
	]
});
module.exports = kind({
	name: "heartsample",
	classes: "enyo-fit basic-sample",
	kind: FittableColumns,
	scene:{},
	components: [
		{
			kind:FittableRows, components:[
				{ kind: player},
				{ name: "translateCtrl", kind: controls, title: "translate" },
				{ name: "rotateCtrl", kind: controls, title: "rotate" },
				{ name: "scaleCtrl", kind: controls, title: "scale" },
				{ name: "skewCtrl", kind: controls, title: "skew" },
				{ name: "backgroundColorCtrl", kind: controls, title: "background-color" },
				{ name: "borderradiusCtrl", kind: controls, title: "border-radius"}
			]
		},
		{
			name: "blockContainer", kind:FittableColumns, fit: true, components :[
				{ classes: "block"}
			]
		}
	],
	handlers: {
		onAdd: "addNewBlock",
		onReset: "resetAnimation",
		onPlay: "playAnimation"
	},
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
		};
	}),
	addNewBlock: function() {
		console.log("addNewBlock");
		this.$.blockContainer.createComponent({ classes: "block"}).render();
	},
	resetAnimation: function() {
		console.log("resetAnimation");
		if(this.scene)
			this.scene.stop();
		this.$.translateCtrl.set("first",1);
		this.$.translateCtrl.set("second",1);
		this.$.translateCtrl.set("third",1);
		this.$.rotateCtrl.set("first",1);
		this.$.rotateCtrl.set("second",1);
		this.$.rotateCtrl.set("third",1);
		this.$.scaleCtrl.set("first",1);
		this.$.scaleCtrl.set("second",1);
		this.$.scaleCtrl.set("third",1);
		this.$.skewCtrl.set("first",1);
		this.$.skewCtrl.set("second",1);
		this.$.skewCtrl.set("third",1);
		this.$.backgroundColorCtrl.set("first",1);
		this.$.backgroundColorCtrl.set("second",1);
		this.$.backgroundColorCtrl.set("third",1);
		this.$.borderradiusCtrl.set("first",1);
		this.$.borderradiusCtrl.set("second",1);
		this.$.borderradiusCtrl.set("third",1);
	},
	playAnimation: function() {
		var translate = this.$.translateCtrl,
			rotate = this.$.rotateCtrl,
			scale = this.$.scaleCtrl,
			skew = this.$.skewCtrl,
			bgcolor = this.$.backgroundColorCtrl,
			border = this.$.borderradiusCtrl,
			props={duration:3000};

		props[translate.title] = translate.getValue();
		props[rotate.title] = rotate.getValue();
		props[scale.title] = scale.getValue();
		props[skew.title] = skew.getValue();
		props[bgcolor.title] = "rgb("+bgcolor.getValue()+")";
		/*props[border.title] = border.getValue();*/
		this.scene=animate(this.$.blockContainer.controls, props, {
				isSequence: false
			});
	}
});
