var
    kind = require('enyo/kind'),
    animate = require('enyo/scene'),
    easing = require('enyo/easing'),
    image = require('enyo/Image');

var duration = 150,
    counter = 0;

var kindRef;

module.exports = kind({
    name: "equalizer",
    classes: "enyo-fit equalizer",
    components: [
        { name: "container1", classes: "container container-background" },
        { name: "container2", classes: "container" }
    ],

    create: kind.inherit(function(sup) {
        return function() {
            sup.apply(this, arguments);
            for (var i = 0; i < 10; i++) {
                this.$.container1.createComponent({ classes: "bar" });
                this.$.container2.createComponent({ classes: "bar" });
            }
        };
    }),

    rendered: kind.inherit(function(sup) {
        return function() {
            sup.apply(this, arguments);
            kindRef = this;
            this.startAnimation();
        };
    }),
    startAnimation: function() {
        var children = this.$.container2.children;
        var i, len = children.length;

        for (i = 0; i < len; i++) {
            this.animateElem(children[i]);
        }
    },
    animateElem: function(elem) {
        var randomVal = this.getRandom(),
            randCol = this.randomColor(),
            propsObj = {
                scale: "1," + randomVal + ",1",
                "background-color": randCol,
                duration: duration,
                ease: easing.quadOut
            };
        animate([elem], propsObj, { autoPlay: true, completed: this.completedAnim });
    },

    completedAnim: function() {
        ++counter;
        if (counter === 10) {
            kindRef && kindRef.startAnimation();
            counter = 0;
        }
    },
    getRandom: function() {
        return Math.floor(30 + (Math.random() * 40));
    },
    randomColor: function() {
        return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    },
    destroy: kind.inherit(function(sup) {
        return function() {
            sup.apply(this, arguments);
            kindRef = undefined;
        };
    })
});
