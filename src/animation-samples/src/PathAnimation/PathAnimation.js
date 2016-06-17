var
    kind = require('enyo/kind'),
    animate = require('enyo/scene'),
    Control = require('enyo/Control');

var path = {
    path: [
        [0, 0, 0],
        [0, -100, 0],
        [100, -100, 0],
        [100, 100, 0],
        [0, 100, 0],
        [0, 0, 0]
    ],
    duration: 1000
};

module.exports = kind({
    name: "pathsample",
    kind: Control,
    classes: "enyo-fit path-sample container",
    components: [
        { name: 'dot1', classes: "dot", style: "background:black;"},
        { name: 'dot2', classes: "dot", style: "background:blue;"},
        { name: 'dot3', classes: "dot", style: "background:red;"},
        { name: 'dot4', classes: "dot", style: "background:green;"}
    ],
    create: kind.inherit(function(sup) {
        return function() {
            sup.apply(this, arguments);
            animate(this.controls, path, { isSequence: true});
        };
    })
});
