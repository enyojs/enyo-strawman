/*jslint white: true*/
var
	kind = require('enyo/kind'),
	Select = require('enyo/Select');

var colorCircle = kind({
	name: "circle",
	classes: "circle"
});

var commonAnimation = {
	"box-shadow": "200, 0, rgb(200, 200, 200)",
	translate: "150, 150,150",
	rotate: "150, 150, 0",
	duration: 3000
};
module.exports = kind({
	name: "sampleApplication",
	style: "background-color: black",
	components: [{
		name: "Description",
		style: "color:#fff;font-size:25px;font-weight:bold;",
		content: "Single component animation with parallel animation"
	}, {
		kind: Select,
		onchange: 'selectChanged',
		components: [
			{ content: 'Select anyone', value: null },
			{ content: 'Red', value: 'circle' },
			{ content: 'Green', value: 'circle2' },
			{ content: 'Blue', value: 'circle3' },
			{ content: 'Parallel', value: 'parallel' },
			{ content: 'Sequential', value: 'sequential' }
		]
	}, {
		name: "circle",
		kind: colorCircle,
		style: "height: 200px; width: 200px; left: 100px; position: absolute; background-color: rgb(255, 0, 0)"
	}, {
		name: "circle2",
		kind: colorCircle,
		style: "height: 200px; width: 200px; left: 300px; position: absolute; background-color: rgb(0, 255, 0)"
	}, {
		name: "circle3",
		kind: colorCircle,
		style: "height: 200px; width: 200px; left: 500px; position: absolute; background-color: rgb(0, 0, 255)"
	}],
	selectChanged: function(inSender, inEvent) {
		var ActorsList = [this.$.circle, this.$.circle2, this.$.circle3];
		var sceneGenerated =null;
		switch(inSender.selected){
			case 0:
				break;
			case 4:
				sceneGenerated = kind.animate(ActorsList, commonAnimation,{isSequence:false});
				sceneGenerated.play();
				break;
			case 5:
				//By default isSequence is true -no need to set
				sceneGenerated = kind.animate(ActorsList, commonAnimation);
				sceneGenerated.play();
				break;
			default:
				var Actor= this.$[inSender.getValue()];
				sceneGenerated = kind.animate(Actor, commonAnimation );
				sceneGenerated.play();
				break;
		}
	},
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
		};
	})
});
