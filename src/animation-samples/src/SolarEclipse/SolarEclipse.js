/*jslint white: true*/
var kind = require('enyo/kind'),
	control = require("enyo/Control");

module.exports = kind({
	name: "sampleApplication",
	classes: "enyo-fit eclipse-sample",
	kind: control,
	components: [
		{classes: "container", components:[{
			name: "redInsideGreen",
			scene: {"box-shadow": "200, 0, rgb(255, 255, 255)", duration: 5000},
			classes: "eclipse"
		}] 
	}],

	create: kind.inherit(function (sup) {
        return function () {
            sup.apply(this, arguments);
			this.$.redInsideGreen.scene.play();
        };
    })
});