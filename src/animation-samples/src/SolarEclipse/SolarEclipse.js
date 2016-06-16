/*jslint white: true*/
var kind = require('enyo/kind'),
    animate = require('enyo/scene'),
    control = require("enyo/Control");

module.exports = kind({
    name: "sampleApplication",
    classes: "enyo-fit eclipse-sample",
    kind: control,
    components: [{
        classes: "container",
        components: [{
            name: "redInsideGreen",
            classes: "eclipse"
        }]
    }],

    create: kind.inherit(function(sup) {
        return function() {
            sup.apply(this, arguments);
            animate([this.$.redInsideGreen], { "box-shadow": "200, 0, rgb(255, 255, 255)", duration: 5000 }, { autoPlay: true });
        };
    })
});
