/*jslint white: true*/
var
    kind = require('enyo/kind'),
    animate = require('enyo/scene'),
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
    style: "background-color: #fff; padding: 1%;",
    components: [{
        name: "Description",
        style: "color:#000;font-size:25px;font-weight:bold;",
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
        style: "height: 200px; width: 200px; left:20%; position: absolute; background-color: rgb(255, 0, 0)" /*left: 100px;*/
    }, {
        name: "circle2",
        kind: colorCircle,
        style: "height: 200px; width: 200px;  left:35%; position: absolute; background-color: rgb(0, 255, 0)" /*left: 300px;*/
    }, {
        name: "circle3",
        kind: colorCircle,
        style: "height: 200px; width: 200px;  left:50%; position: absolute; background-color: rgb(0, 0, 255)" /*left: 500px; */
    }],
    selectChanged: function(inSender, inEvent) {
        var ActorsList = [this.$.circle, this.$.circle2, this.$.circle3];
        switch (inSender.selected) {
            case 0:
                break;
            case 4:
                animate(ActorsList, commonAnimation, { isSequence: false, autoPlay: true });
                break;
            case 5:
                //By default isSequence is true -no need to set
                animate(ActorsList, commonAnimation, { autoPlay: true });
                break;
            default:
                var Actor = this.$[inSender.getValue()];
                animate([Actor], commonAnimation, { autoPlay: true });
                break;
        }
    },
    create: kind.inherit(function(sup) {
        return function() {
            sup.apply(this, arguments);
        };
    })
});
