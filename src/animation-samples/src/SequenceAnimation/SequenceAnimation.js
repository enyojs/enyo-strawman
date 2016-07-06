/*jslint white: true*/
var kind = require('enyo/kind'),
    animate = require('enyo/scene'),
    Image = require('enyo/Image');

var declaredAnimation = [{
    translate: "150, 150,150",
    rotate: "150, 150, 0",
    duration: 500
}, {
    translate: "1000, 100, 300",
    rotate: "100, 100, 10",
    duration: 500
}, {
    translate: "150, 150,150",
    rotate: "150, 150, 0",
    duration: 500
}];


module.exports = kind({
    name: "sampleApplication",
    style: "background-color: #fff;padding:1%;",
    components: [{
        name: "Description",
        classes: "description",
        content: "Sequence Animation"
    }, {
        name: "circle",
        classes: "cardContainer jack",
        components: [{
            kind: Image,
            classes: "imageClass introImage",
            src: "assets/jack.png",
            alt: "Enyo Logo"
        }]
    }, {
        name: "circle2",
        classes: "cardContainer queen",
        components: [{
            kind: Image,
            classes: "imageClass introImage",
            src: "assets/queen.png",
            alt: "Enyo Logo"
        }]
    }, {
        name: "circle3",
        classes: "cardContainer king",
        components: [{
            kind: Image,
            classes: "imageClass introImage",
            src: "assets/king.png",
            alt: "Enyo Logo"
        }]
    }],
    create: kind.inherit(function(sup) {
        return function() {
            sup.apply(this, arguments);
            var ActorsList = [this.$.circle, this.$.circle2, this.$.circle3];
            var that = this;
            animate(ActorsList, declaredAnimation, { completed: completeFirst, autoPlay: true, isSequence: true });

            function completeFirst() {
                animate(ActorsList, {
                    translate: "0,0,0",
                    rotate: "0,0,0",
                    duration: 500
                }, { completed: completedDeclare, autoPlay: true, isSequence: true });
            }

            function completedDeclare() {
                animate([that.$.circle], { translate: "0px,0,0", duration: 1000 }, { autoPlay: true, isSequence: false });
                animate([that.$.circle2], { translate: "300px,0,0", duration: 1000 }, { autoPlay: true, isSequence: false });
                animate([that.$.circle3], { translate: "600px,0,0", duration: 1000 }, { autoPlay: true, isSequence: false });
            }
        };
    })
});
