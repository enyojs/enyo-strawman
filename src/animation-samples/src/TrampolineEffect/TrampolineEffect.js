var
    kind = require("enyo/kind"),
    Control = require("enyo/Control"),
    sceneSupport = require('enyo/sceneSupport'),
    ease = require("enyo/easing");

var smallerBox = [
    { translate: "0,300,0", rotate: "0,0,180", ease: ease.easeInQuad, duration: 1000 },
    { translate: "0,425,0", scale: "2,0.5,1", duration: 500 },
    { translate: "0,300,0", scale: "1,1,1", duration: 500 },
    { translate: "0,0,0", rotate: "0,0,405", ease: ease.easeOutQuad, duration: 1000 }
];

var biggerBox = [
    { translate: "0,200,0", rotate: "0,0,180", ease: ease.easeInQuad, duration: 1000 },
    { translate: "0,250,0", scale: "2,0.5,1", duration: 500 },
    { translate: "0,200,0", scale: "1,1,1", duration: 500 },
    { translate: "0,0,0", rotate: "0,0,360", ease: ease.easeOutQuad, duration: 1000 }
];
module.exports = kind({
    name: "outer",
    kind: Control,
    classes: "trampoline-sample",
    components: [
        { name: "smaller", classes: "smaller", scene: smallerBox, mixins: [sceneSupport] },
        { name: "bigger", classes: "bigger", scene: biggerBox, mixins: [sceneSupport] }
    ],
    create: kind.inherit(function(sup) {
        return function() {
            sup.apply(this, arguments);
            // kind.animate(this.$.smaller, smallerBox).play().repeat = true;
            this.$.smaller.scene.play().repeat = true;
            this.$.bigger.scene.play().repeat = true;
        };
    })
});
