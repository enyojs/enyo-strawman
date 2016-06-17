(function (scope, bundled) {
	
	var   enyo     = scope.enyo || (scope.enyo = {})
		, manifest = enyo.__manifest__ || (defineProperty(enyo, '__manifest__', {value: {}}) && enyo.__manifest__)
		, exported = enyo.__exported__ || (defineProperty(enyo, '__exported__', {value: {}}) && enyo.__exported__)
		, require  = enyo.require || (defineProperty(enyo, 'require', {value: enyoRequire}) && enyo.require)
		, local    = bundled()
		, entries;

	// below is where the generated entries list will be assigned if there is one
	entries = ['index'];


	if (local) {
		Object.keys(local).forEach(function (name) {
			var value = local[name];
			if (manifest.hasOwnProperty(name)) {
				if (!value || !(value instanceof Array)) return;
			}
			manifest[name] = value;
		});
	}

	function defineProperty (o, p, d) {
		if (Object.defineProperty) return Object.defineProperty(o, p, d);
		o[p] = d.value;
		return o;
	}
	
	function enyoRequire (target) {
		if (!target || typeof target != 'string') return undefined;
		if (exported.hasOwnProperty(target))      return exported[target];
		var   request = enyo.request
			, entry   = manifest[target]
			, exec
			, map
			, ctx
			, reqs
			, reqr;
		if (!entry) throw new Error('Could not find module "' + target + '"');
		if (!(entry instanceof Array)) {
			if (typeof entry == 'object' && (entry.source || entry.style)) {
				throw new Error('Attempt to require an asynchronous module "' + target + '"');
			} else if (typeof entry == 'string') {
				throw new Error('Attempt to require a bundle entry "' + target + '"');
			} else {
				throw new Error('The shared module manifest has been corrupted, the module is invalid "' + target + '"');
			}
		}
		exec = entry[0];
		map  = entry[1];
		if (typeof exec != 'function') throw new Error('The shared module manifest has been corrupted, the module is invalid "' + target + '"');
		ctx  = {exports: {}};
		if (request) {
			if (map) {
				reqs = function (name) {
					return request(map.hasOwnProperty(name) ? map[name] : name);
				};
				defineProperty(reqs, 'isRequest', {value: request.isRequest});
			} else reqs = request;
		}
		reqr = !map ? require : function (name) {
			return require(map.hasOwnProperty(name) ? map[name] : name);
		};
		exec(
			ctx,
			ctx.exports,
			scope,
			reqr,
			reqs
		);
		return exported[target] = ctx.exports;
	}

	// in occassions where requests api are being used, below this comment that implementation will
	// be injected
	

	// if there are entries go ahead and execute them
	if (entries && entries.forEach) entries.forEach(function (name) { require(name); });
})(this, function () {
	// this allows us to protect the scope of the modules from the wrapper/env code
	return {'src/PerspectiveCube':[function (module,exports,global,require,request){
/*jslint white: true*/
var kind = require('enyo/kind'),
    animate = require('enyo/scene'),
    Easings = require('enyo/easing');

var spincubeFace1 = {
    translate: "0, 0, 60",
    duration: 17
};

var spincubeFace2 = {
    rotate: "0, -90, 0",
    translate: "60, 0, 0",
    duration: 17
};

var spincubeFace3 = {
    rotate: "0, -90, 90",
    translate: "0, -60, 0",
    duration: 17
};

var spincubeFace4 = {
    rotate: "0, -180, 90",
    translate: "0, 0, -60",
    duration: 17
};

var spincubeFace5 = {
    rotate: "0, -270, 0",
    translate: "-60, 0, 0",
    duration: 17
};

var spincubeFace6 = {
    rotate: "-90, 0, 90",
    translate: "0, 60, 0",
    duration: 17
};

var spincube = [{
    rotate: "0, 90, 0",
    ease: Easings.quadInOut,
    duration: 1920
}, {
    rotate: "90, 90, 0",
    ease: Easings.quadInOut,
    duration: 2040
}, {
    rotate: "0, 180, 90",
    ease: Easings.quadInOut,
    duration: 2040
}, {
    rotate: "0, 270, 0",
    ease: Easings.quadInOut,
    duration: 1920
}, {
    rotate: "-90, 270, 0",
    ease: Easings.quadInOut,
    duration: 2040
}, {
    rotate: "0, 360, 0",
    ease: Easings.quadInOut,
    duration: 2040
}];

module.exports = kind({
    name: "stage",
    classes: "stage",
    style: "position: absolute; width: 500px; height: 500px; top: 120px; left: 120px;",
    components: [{
        name: "cubespinner",
        classes: "cubespinner",
        components: [{
            name: "face1",
            content: 1
        }, {
            name: "face2",
            content: 2
        }, {
            name: "face3",
            content: 3
        }, {
            name: "face4",
            content: 4
        }, {
            name: "face5",
            content: 5
        }, {
            name: "face6",
            content: 6
        }]
    }],

    rendered: kind.inherit(function(sup) {
        return function() {
            sup.apply(this, arguments);
            this.startAnimation();
        };
    }),

    startAnimation: function() {

        animate([this.$.face1], spincubeFace1);
        animate([this.$.face2], spincubeFace2);
        animate([this.$.face3], spincubeFace3);
        animate([this.$.face4], spincubeFace4);
        animate([this.$.face5], spincubeFace5);
        animate([this.$.face6], spincubeFace6);
        var cubeSpin = animate([this.$.cubespinner], spincube);
        // cubeSpin.repeat = true;
    }
});

}],'../strawman/Title':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

module.exports = kind({
	tag: 'h1'
});

}],'../strawman/LinkSupport':[function (module,exports,global,require,request){
/*
 * LinkSupport
 *
 * Add automatic on-tap support for controls with a href attribute
 */

require('enyo');

var
	kind = require('enyo/kind');

module.exports = {
	name: 'LinkSupport',
	tap: kind.inherit(function (sup) {
		return function (sender, ev) {
			sup.apply(this, arguments);
			var link = this.get('href') || ev.originator.get('href') || ev.originator.parent.get('href');
			if (link) {
				ev.preventDefault();
				window.location.href = link;
			}
		};
	})
};

}],'../strawman/AppRouter':[function (module,exports,global,require,request){
/*
 * AppRouter
 *
 * Hash sample routing for Enyo Strawman samples.
 */

require('enyo');

var
	kind = require('enyo/kind'),
	Router = require('enyo/Router');

module.exports = kind({
	kind: Router,
	useHistory: true,
	triggerOnStart: true,
	routes: [
		{path: ':sampleName/:locale', handler: 'handleRoute'},
		{path: ':sampleName', handler: 'handleRoute'},
		{path: '/:locale', handler: 'handleRouteLocaleOnly'}
	],
	events: {
		onRouteChange: ''
	},
	handleRoute: function (sampleName, locale) {
		this.doRouteChange({sampleName: sampleName, locale: locale || 'local'});
	},
	handleRouteLocaleOnly: function (locale) {
		this.handleRoute(null, locale);
	}
});


}],'src/TrampolineEffect':[function (module,exports,global,require,request){
var
    kind = require("enyo/kind"),
    Control = require("enyo/Control"),
    sceneSupport = require('enyo/sceneSupport'),
    ease = require("enyo/easing");

var smallerBox = [
    { translate: "0,300,0", rotate: "0,0,180", ease: ease.quadIn, duration: 1000 },
    { translate: "0,425,0", scale: "2,0.5,1", duration: 500 },
    { translate: "0,300,0", scale: "1,1,1", duration: 500 },
    { translate: "0,0,0", rotate: "0,0,405", ease: ease.quadOut, duration: 1000 }
];

var biggerBox = [
    { translate: "0,200,0", rotate: "0,0,180", ease: ease.quadIn, duration: 1000 },
    { translate: "0,250,0", scale: "2,0.5,1", duration: 500 },
    { translate: "0,200,0", scale: "1,1,1", duration: 500 },
    { translate: "0,0,0", rotate: "0,0,360", ease: ease.quadOut, duration: 1000 }
];
module.exports = kind({
    name: "outer",
    kind: Control,
    classes: "trampoline-sample",
    components: [
        { 
            name: "smaller",
            classes: "smaller",
            scene: smallerBox,
            mixins: [sceneSupport],
            sceneOptions: { repeat: true }
        },
        { 
            name: "bigger",
            classes: "bigger",
            scene: biggerBox,
            mixins: [sceneSupport],
            sceneOptions: { repeat: true }
        }
    ]
});

}],'src/SolarEclipse':[function (module,exports,global,require,request){
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

}],'src/PathAnimation':[function (module,exports,global,require,request){
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

}],'../strawman/Link':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	LinkSupport = require('../LinkSupport');

module.exports = kind({
	name: 'Link',
	kind: Control,
	tag: 'span',
	classes: 'link',
	spotlight: true,
	mixins: [LinkSupport],
	badgeClassesChanged: function (was, is) {
		if (was) this.addRemoveClasses(was, false);
		if (is) this.addRemoveClasses(is, true);
	},
	addRemoveClasses: function (classes, state) {
		if (classes) {
			classes = classes.split(/\s+/);
			for (var i = 0; i < classes.length; i++) {
				this.addRemoveClass(classes[i], state);
			}
		}
	}
});

},{'../LinkSupport':'../strawman/LinkSupport'}],'src/WobbleAnimation':[function (module,exports,global,require,request){
var
    kind = require("enyo/kind"),
    Control = require("enyo/Control"),
    animate = require('enyo/scene'),
    image = require('enyo/image');
var wobble = [
    { translate: "-2,2,0", rotate: "-2,-4,0", duration: 0 },
    { translate: "-2,-2,0", rotate: "2,-4,0", duration: 500 },
    { translate: "2,-2,0", rotate: "2,4,0", duration: 500 },
    { translate: "2,2,0", rotate: "-2,4,0", duration: 500 },
    { translate: "0,0,0", rotate: "0,0,0", duration: 500 }
];

module.exports = kind({
    name: "Wobble",
    kind: Control,
    imagePath: "assets/image.png",
    classes: "enyo-fit wobble-sample",
    components: [{
        classes: "container",
        components: [{
            name: "imageHolder",
            classes: "image-container",
            components: [
                { kind: image, name: "img" }
            ]
        }]
    }],
    create: kind.inherit(function(sup) {
        return function() {
            sup.apply(this, arguments);
            this.$.img.set("src", this.imagePath);
            animate([this.$.imageHolder], wobble, { repeat: true });
        };
    })
});

}],'src/EqualizerAnimation':[function (module,exports,global,require,request){
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

}],'src/SequenceAnimation':[function (module,exports,global,require,request){
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
    style: "background-color: black",
    components: [{
        name: "Description",
        classes: "description",
        content: "Sequence Animiation"
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

}],'src/EaseAnimation':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	easing = require('enyo/easing'),
	FittableColumns = require('layout/FittableColumns'),
	SceneSupport = require('enyo/SceneSupport');

var RedBalloon = kind({
	classes: "balloon",
	style: "background: url('./assets/balloon.png');",
	mixins : [SceneSupport]
});

var BlueBalloon = kind({
	classes: "balloon",
	style: "background: url('./assets/balloon-blue.png');",
	mixins : [SceneSupport]
});

module.exports = kind({
	name: "EasingSample",
	kind: FittableColumns,
	classes: "ease-sample",
	components: [
		{
			kind: RedBalloon,
			content: "linear",
			scene: { translate: "0,-480, 0", duration: 3000 }
		}, {
			kind: BlueBalloon,
			content: "easeInBounce",
			scene: { translate: "0,-480, 0", duration: 3000, ease: easing.bounceIn }
		}, {
			kind: RedBalloon,
			content: "easeOutBounce",
			scene: { translate: "0,-480, 0", duration: 3000, ease: easing.bounceOut }
		}, {
			kind: BlueBalloon,
			content: "easeInOutBounce",
			scene: { translate: "0,-480, 0", duration: 3000, ease: easing.bounceInOut }
		}, {
			kind: RedBalloon,
			content: "easeInElastic",
			scene: { translate: "0,-480, 0", duration: 3000, ease: easing.elasticIn }
		}, {
			kind: BlueBalloon,
			content: "easeOutElastic",
			scene: { translate: "0,-480, 0", duration: 3000, ease: easing.elasticOut }
		}, {
			kind: RedBalloon,
			content: "easeInOutElastic",
			scene: { translate: "0,-480, 0", duration: 3000, ease: easing.elasticInOut }
		}, {
			kind: BlueBalloon,
			content: "easeInExpo",
			scene: { translate: "0,-480, 0", duration: 3000, ease: easing.expoIn }
		}, {
			kind: RedBalloon,
			content: "easeOutExpo",
			scene: { translate: "0,-480, 0", duration: 3000, ease: easing.expoOut }
		}, {
			kind: BlueBalloon,
			content: "easeInOutExpo",
			scene: { translate: "0,-480, 0", duration: 3000, ease: easing.expoInOut }
		}, {
			kind: RedBalloon,
			content: "custom",
			/**
			* Points on bezier-curve as at x% of time y% of distance cover
			* Here, the bezier-curve should be as defined
			* On 30% of time, 50% of distance should cover
			* On 80% of time, 10% of distance in opposite direction should cover
			*/
			scene: { translate: "0,-480, 0", duration: 3000, ease: { 30: 50, 80: -10 } }
		}
	]
});
}],'src/SingleComponentAnimation':[function (module,exports,global,require,request){
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

}],'src/HeartAnimation':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	IMG = require('enyo/Image'),
	Button = require('enyo/Button'),
	Input = require('enyo/Input'),
	CheckBox = require('enyo/Checkbox'),
	animate = require('enyo/scene'),
	Slider = require('onyx/Slider');

var flyPath = {
	path: [
		[0, 0, 0],
		[400, -100, 0],
		[-400, -200, 0],
		[0, -300, 0]
	],
	duration: 2000
};

module.exports = kind({
	name: "heartsample",
	classes: "enyo-fit heart-sample",
	flyScene: {},
	components: [
		{
			name: 'heartFlyIcon',
			kind: IMG,
			classes: 'heart-icon heart-tick-icon heart-fly-icon',
			src: 'assets/heart-fly.png',
			ontap: "fly"
		},
		{ name: "playButton", kind: Button, content: "Start", ontap: "playAnimation" },
		{ name: "pauseButton", kind: Button, content: "Pause", ontap: "pauseAnimation" },
		{ name: "resumeButton", kind: Button, content: "Resume", ontap: "resumeAnimation" },
		{ name: "reverseButton", kind: Button, content: "Reverse", ontap: "reverseAnimation" },
		{ name: "stopButton", kind: Button, content: "Stop", ontap: "stopAnimation" },
		{ name: "fastButton", kind: Button, content: "Fast", ontap: "fastAnimation" },
		{ name: "slowButton", kind: Button, content: "Slow", ontap: "slowAnimation" },
		{ name: "repeatButton", kind: Button, content: "Repeat", ontap: "repeatAnimation" },
		{ name: "showPath", kind: CheckBox, content: "Show Animation Path", onchange: "pathChanged" },
		{
			components: [
				{ name: "seekInput", kind: Input, placeholder: "Seek" },
				{ name: "seekButton", kind: Button, content: "Jump to", ontap: "seekAnimation" }
			]
		},
		{ name: "slider", kind: Slider, onChanging: "sliderChanging" }
	],
	binding: [
		{ from: "$.slider.value", to: "flyScene.timeline", transform: function(v) { return parseInt(v, 10);}}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.$.slider.set('max', 2000);
			this.flyScene = animate(this.$.heartFlyIcon, flyPath, {
				isSequence: false,
				autoPlay: false,
				completed: this.completedAnimation,
				step: this.showPath
			});
		};
	}),
	showPath: function(actor) {
		var parent = actor.parent;

		if(!parent) return;
		if (this.showPath) {
			var mat = this.poses[0].currentState.matrix,
				s = actor.name == 'heartFlyIcon' ? "left: 45%;" : "left: 60%;";
			parent.createComponent({
				classes: "heart-dot",
				style: "transform: matrix3d(" + mat + ");" + s
			}).render();
		}
		parent.$.slider.set('value', this.timeline);
	},
	completedAnimation: function() {
		console.log("completed");
	},
	playAnimation: function() {
		this.flyScene.play();
	},
	resumeAnimation: function() {
		this.flyScene.resume();
	},
	pauseAnimation: function() {
		this.flyScene.pause();
	},
	stopAnimation: function() {
		this.flyScene.stop();
		this.flyScene.repeat = false;
	},
	reverseAnimation: function() {
		this.flyScene.reverse();
	},
	seekAnimation: function() {
		this.flyScene.timeline = parseInt(this.$.seekInput.value, 10);
	},
	fastAnimation: function() {
		this.flyScene.speed = 2;
	},
	slowAnimation: function() {
		this.flyScene.speed = 0.2;
	},
	repeatAnimation: function() {
		this.flyScene.repeat = true;
	},
	sliderChanging: function(inSender) {
		this.flyScene.timeline = parseInt(inSender.getValue(), 10);
	},
	pathChanged: function() {
		this.flyScene.showPath = this.$.showPath.checked;
	}
});

}],'../strawman/List':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind');

var
	Collection = require('enyo/Collection'),
	Scroller = require('enyo/Scroller'),
	DataRepeater = require('enyo/DataRepeater');

var
	Link = require('../Link');

module.exports = kind({
	kind: Scroller,
	classes: 'strawman-list enyo-fit',
	samples: null,
	libraryName: '',
	listType: 'list',
	components: [
		{name: 'repeater', classes: 'list-frame', kind: DataRepeater, components: [
			{kind: Link, classes: 'item', bindings: [
				{from: 'model.name', to: 'href', transform: function (v) {
						var href = "#" + v;
						if (!this.owner.libraryName) { href = v + '/index.html'; }
						return href;
					}
				},
				{from: 'model.name', to: 'content', transform: function (v) {
						var name = v.replace(/Sample$/i, '');
						if (!this.owner.libraryName) {
							name = this.owner.samples[v] || name;
						}
						return name;
					}
				},
				{from: 'model.badgeClasses', to: 'badgeClasses'}
			]}
		]}
	],
	bindings: [
		{from: 'samples', to: '$.repeater.collection', transform: function (v) {
				if (!v) { return v; }
				return (v instanceof Collection) ? v : new Collection(Object.keys(v).map(function (key) {
					// Make an object that contains all of the strings and booleans etc that we can use as a model for our sample collection.
					var sampleModel = {name: key};
					for (var prop in v[key]) {
						// Don't bother copying functions
						if (typeof v[key][prop] != 'function') {
							sampleModel[prop] = v[key][prop];
						}
					}
					return sampleModel;
				}));
			}
		}
	],
	create: function () {
		this.inherited(arguments);
		this.listTypeChanged();
	},
	listTypeChanged: function (old) {
		this.$.repeater.removeClass(old);
		this.$.repeater.addClass(this.get('listType'));
	}
});

},{'../Link':'../strawman/Link'}],'../strawman/SampleList':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	platform = require('enyo/platform');

var
	Link = require('../Link'),
	List = require('../List'),
	Title = require('../Title'),
	AppRouter = require('../AppRouter');

module.exports = kind({
	title: 'Samples',
	classes: 'strawman',
	published: {
		sample: null,
		locale: 'local'
	},
	handlers: {
		onRouteChange: 'handleRoute'
	},
	listComponents: [
		{name: 'title', kind: Title},
		{name: 'back', kind: Link, classes: 'back-button', content: 'Back', href: '../index.html'},
		{name: 'list', kind: List}
	],
	create: function () {
		this.inherited(arguments);
		this.createComponent({name: 'router', kind: AppRouter});
		if (this.libraryName && this.version) {
			// only display version information for individual libraries that are versioned
 			console.log('%c%s: %s', 'color:blue', this.libraryName, this.version);
 		}
 	},
 	handleRoute: function (sender, ev) {
		this.set('locale', ev.locale);
		this.set('sample', ev.sampleName);
	},
	sampleChanged: function (was, is) {
		if (was) {
			if(this.$[was]) { this.$[was].destroy(); }
		} else {
			if(this.$.title) { this.$.title.destroy(); }
			if(this.$.back) { this.$.back.destroy(); }
			if(this.$.list) { this.$.list.destroy(); }
		}
		if (is && this.samples[is]) {
			if(platform.webos && global.screen.width<=400 && this.libraryName!=='Garnet') {
				this.addClass('wearable-sample');
			}
			global.sample = this.createComponent({name:is, kind: this.samples[is], classes:'strawman-sample'});
		} else {
			// We have no sample, just render out the list.
			this.removeClass('wearable-sample');
			this.createComponents(this.listComponents);
			this.binding({from: 'title',       to: '$.title.content'});
			this.binding({from: 'samples',     to: '$.list.samples'});
			this.binding({from: 'listType',    to: '$.list.listType'});
			this.binding({from: 'libraryName', to: '$.list.libraryName'});

			// Don't show back if we're at home.
			this.$.back.set('showing', !!this.libraryName);
		}
		this.render();
	}
});

},{'../Link':'../strawman/Link','../List':'../strawman/List','../Title':'../strawman/Title','../AppRouter':'../strawman/AppRouter'}],'../strawman/ScrollingSampleList':[function (module,exports,global,require,request){
var
	Scroller = require('enyo/Scroller');

var
	SampleList = require('./SampleList');

module.exports = SampleList.kind({
	components: [
		{name: 'client', kind: Scroller, classes: 'enyo-fit'},
		{content: '<', classes: 'strawman-sample-back', ontap:'goBack'}
	],
	goBack: function() {
 		global.history.go(-1);
 		return false;
  	}
});

},{'./SampleList':'../strawman/SampleList'}],'src/HierarchicalAnimation':[function (module,exports,global,require,request){
var
    kind = require('enyo/kind');

var
    Collection = require('enyo/Collection'),
    animate = require('enyo/scene'),
    DataGridList = require('enyo/DataGridList');

var counter = 0;

var data = [
    { classes: "repeater-item class1 item", firstName: "Alejandra", lastName: "Walsh" },
    { classes: "repeater-item class2 item", firstName: "Marquez", lastName: "James" },
    { classes: "repeater-item class3 item", firstName: "Barr", lastName: "Lott" },
    { classes: "repeater-item class4 item", firstName: "Everett", lastName: "Maddox" },
    { classes: "repeater-item class5 item", firstName: "Crane", lastName: "Bryant" },
    { classes: "repeater-item class1 item", firstName: "Raymond", lastName: "Faulkner" },
    { classes: "repeater-item class2 item", firstName: "Petersen", lastName: "Murray" },
    { classes: "repeater-item class3 item", firstName: "Kristina", lastName: "Porter" },
    { classes: "repeater-item class4 item", firstName: "Barbra", lastName: "Barrett" },
    { classes: "repeater-item class5 item", firstName: "Tracey", lastName: "Melton" },
    { classes: "repeater-item class1 item", firstName: "Effie", lastName: "Pierce" },
    { classes: "repeater-item class2 item", firstName: "Webb", lastName: "Sloan" },
    { classes: "repeater-item class3 item", firstName: "Diana", lastName: "Castaneda" },
    { classes: "repeater-item class4 item", firstName: "Gaines", lastName: "Hampton" },
    { classes: "repeater-item class5 item", firstName: "Ebony", lastName: "Stanley" },
    { classes: "repeater-item class1 item", firstName: "Anne", lastName: "Moses" },
    { classes: "repeater-item class2 item", firstName: "Mercer", lastName: "Skinner" },
    { classes: "repeater-item class3 item", firstName: "Williams", lastName: "Booker" },
    { classes: "repeater-item class4 item", firstName: "Pearson", lastName: "Blevins" },
    { classes: "repeater-item class5 item", firstName: "Pearl", lastName: "Mcknight" },
    { classes: "repeater-item class1 item", firstName: "Mcconnell", lastName: "Jenkins" },
    { classes: "repeater-item class2 item", firstName: "Ava", lastName: "Deleon" },
    { classes: "repeater-item class3 item", firstName: "Emily", lastName: "Goodwin" },
    { classes: "repeater-item class4 item", firstName: "Richmond", lastName: "Hess" },
    { classes: "repeater-item class5 item", firstName: "Pitts", lastName: "Osborn" },
    { classes: "repeater-item class1 item", firstName: "Lela", lastName: "Page" },
    { classes: "repeater-item class2 item", firstName: "Carmen", lastName: "Maxwell" },
    { classes: "repeater-item class3 item", firstName: "Dana", lastName: "Thompson" },
    { classes: "repeater-item class4 item", firstName: "Dominique", lastName: "Jensen" },
    { classes: "repeater-item class5 item", firstName: "Freda", lastName: "Short" },
    { classes: "repeater-item class1 item", firstName: "Cynthia", lastName: "Bass" },
    { classes: "repeater-item class2 item", firstName: "Laurie", lastName: "Kim" },
    { classes: "repeater-item class3 item", firstName: "Suarez", lastName: "Jarvis" },
    { classes: "repeater-item class4 item", firstName: "Esperanza", lastName: "Camacho" },
    { classes: "repeater-item class5 item", firstName: "Rachelle", lastName: "Lynch" },
    { classes: "repeater-item class1 item", firstName: "Sonja", lastName: "Lowery" },
    { classes: "repeater-item class2 item", firstName: "Nelda", lastName: "Benton" },
    { classes: "repeater-item class3 item", firstName: "Bernadine", lastName: "Pratt" },
    { classes: "repeater-item class4 item", firstName: "Welch", lastName: "Russo" },
    { classes: "repeater-item class5 item", firstName: "Eileen", lastName: "Mays" },
    { classes: "repeater-item class1 item", firstName: "Nell", lastName: "Conner" },
    { classes: "repeater-item class2 item", firstName: "Carolina", lastName: "Hodges" },
    { classes: "repeater-item class3 item", firstName: "Polly", lastName: "Mueller" },
    { classes: "repeater-item class4 item", firstName: "Jimenez", lastName: "Goodman" },
    { classes: "repeater-item class5 item", firstName: "Fowler", lastName: "Haley" },
    { classes: "repeater-item class1 item", firstName: "Rios", lastName: "Watson" },
    { classes: "repeater-item class2 item", firstName: "Kidd", lastName: "Mcmahon" },
    { classes: "repeater-item class3 item", firstName: "Audrey", lastName: "Buchanan" },
    { classes: "repeater-item class4 item", firstName: "Mcdonald", lastName: "Miles" },
    { classes: "repeater-item class5 item", firstName: "Marcia", lastName: "Collins" },
    { classes: "repeater-item class1 item", firstName: "Mason", lastName: "Owens" },
    { classes: "repeater-item class2 item", firstName: "Hopper", lastName: "Hanson" },
    { classes: "repeater-item class3 item", firstName: "Good", lastName: "Jacobs" },
    { classes: "repeater-item class4 item", firstName: "Bryan", lastName: "Francis" },
    { classes: "repeater-item class5 item", firstName: "Chris", lastName: "Payne" },
    { classes: "repeater-item class1 item", firstName: "Russo", lastName: "Burgess" },
    { classes: "repeater-item class2 item", firstName: "Carla", lastName: "Burke" },
    { classes: "repeater-item class3 item", firstName: "Herman", lastName: "Stephenson" },
    { classes: "repeater-item class4 item", firstName: "Garrison", lastName: "Santana" },
    { classes: "repeater-item class5 item", firstName: "Freida", lastName: "Stevenson" },
    { classes: "repeater-item class1 item", firstName: "Macias", lastName: "Bright" },
    { classes: "repeater-item class2 item", firstName: "Wiley", lastName: "Simon" },
    { classes: "repeater-item class3 item", firstName: "Cook", lastName: "Farmer" },
    { classes: "repeater-item class4 item", firstName: "Baldwin", lastName: "Burch" },
    { classes: "repeater-item class5 item", firstName: "Sabrina", lastName: "Schwartz" },
    { classes: "repeater-item class1 item", firstName: "Hudson", lastName: "Medina" },
    { classes: "repeater-item class2 item", firstName: "Jodi", lastName: "Wells" },
    { classes: "repeater-item class3 item", firstName: "Curry", lastName: "Oneil" },
    { classes: "repeater-item class4 item", firstName: "Mejia", lastName: "Mcneil" },
    { classes: "repeater-item class5 item", firstName: "Carrie", lastName: "Rivas" },
    { classes: "repeater-item class1 item", firstName: "Lowery", lastName: "Murphy" },
    { classes: "repeater-item class2 item", firstName: "Pace", lastName: "Rivera" },
    { classes: "repeater-item class3 item", firstName: "Gonzales", lastName: "Ramos" },
    { classes: "repeater-item class4 item", firstName: "Irwin", lastName: "Rivers" },
    { classes: "repeater-item class5 item", firstName: "Angelique", lastName: "Hardy" },
    { classes: "repeater-item class1 item", firstName: "Branch", lastName: "Little" },
    { classes: "repeater-item class2 item", firstName: "Yang", lastName: "Case" },
    { classes: "repeater-item class3 item", firstName: "Douglas", lastName: "Marsh" },
    { classes: "repeater-item class4 item", firstName: "Velma", lastName: "Joyner" },
    { classes: "repeater-item class5 item", firstName: "Susanna", lastName: "Park" },
    { classes: "repeater-item class1 item", firstName: "Billie", lastName: "Kirk" },
    { classes: "repeater-item class2 item", firstName: "Melendez", lastName: "Fischer" },
    { classes: "repeater-item class3 item", firstName: "Summer", lastName: "Reeves" },
    { classes: "repeater-item class4 item", firstName: "Contreras", lastName: "Bradley" },
    { classes: "repeater-item class5 item", firstName: "Taylor", lastName: "Miller" },
    { classes: "repeater-item class1 item", firstName: "Hopkins", lastName: "Aguilar" },
    { classes: "repeater-item class2 item", firstName: "Cleo", lastName: "Sullivan" },
    { classes: "repeater-item class3 item", firstName: "Vazquez", lastName: "Flowers" },
    { classes: "repeater-item class4 item", firstName: "Gibson", lastName: "Gilliam" },
    { classes: "repeater-item class5 item", firstName: "Zimmerman", lastName: "Riggs" },
    { classes: "repeater-item class1 item", firstName: "Mcintyre", lastName: "Mcgee" },
    { classes: "repeater-item class2 item", firstName: "Hall", lastName: "Caldwell" },
    { classes: "repeater-item class3 item", firstName: "Felicia", lastName: "Fitzpatrick" },
    { classes: "repeater-item class4 item", firstName: "Delgado", lastName: "Cole" },
    { classes: "repeater-item class5 item", firstName: "Burns", lastName: "Summers" },
    { classes: "repeater-item class1 item", firstName: "Durham", lastName: "Dickerson" },
    { classes: "repeater-item class2 item", firstName: "Lavonne", lastName: "Robles" },
    { classes: "repeater-item class3 item", firstName: "Roberts", lastName: "Adams" },
    { classes: "repeater-item class4 item", firstName: "Ayala", lastName: "Lawson" },
    { classes: "repeater-item class5 item", firstName: "Lori", lastName: "Nolan" }
];
var sceneOne = {
    rotate: "0, 359, 0",
    duration: 2500
};
var listItem = kind({
    components: [{
        classes: "name-wrapper",
        components: [
            { name: "firstName", classes: "name", tag: "span" },
            { name: "lastName", classes: "name last", tag: "span" },
            { name: "lastNameLetter", classes: "name last-letter", tag: "span" }
        ]
    }],
   
    create: kind.inherit(function(sup) {
        return function() {
            sup.apply(this, arguments);
            animate([this], sceneOne, { autoPlay: true, isSequence: false });
        };
    })

});
module.exports = kind({
    name: "enyo.sample.DataGridListSample",
    animRef: null,
    classes: "data-grid-list-sample data-repeater-sample enyo-fit",
    components: [{
        name: "repeater",
        kind: DataGridList,
        components: [{
            kind: listItem,
            bindings: [
                { from: ".model.firstName", to: ".$.firstName.content" },
                { from: ".model.lastName", to: ".$.lastName.content" }, {
                    from: ".model.lastName",
                    to: ".$.lastNameLetter.content",
                    transform: function(v) {
                        return v && v.charAt(0);
                    }
                },
                { from: ".model.classes", to: ".classes" }
            ]
        }],
        minWidth: 320,
        minHeight: 100,
        spacing: 10
    }],
    bindings: [
        { from: ".collection", to: ".$.repeater.collection" }
    ],

    handlers: {
        onmousewheel: "scrolled"
    },
    scrolled: function() {
        var pageOne = this.children[0].$.page1.children;
        var pageTwo = this.children[0].$.page2.children;
        animate(pageOne, sceneOne, { autoPlay: true, isSequence: false });
        animate(pageTwo, sceneOne, { autoPlay: true, isSequence: false });
    },
    populateList: function() {
        this.collection = new Collection(data);
    },
    create: kind.inherit(function(sup) {
        return function() {
            this.populateList();
            sup.apply(this, arguments);
        };
    })
});

module.exports.data = data;

}],'index':[function (module,exports,global,require,request){
var
	kind = require('enyo/kind'),
	ready = require('enyo/ready');

var
	ScrollingSampleList = require('../strawman/ScrollingSampleList');

var
	samples = {
		EaseAnimation: require('./src/EaseAnimation'),
		ControlAnimation: require('./src/HeartAnimation'),
		LinkedAnimation: require('./src/TrampolineEffect'),
		ColorAnimation: require('./src/SolarEclipse'),
		PerspectiveAnimation: require('./src/PerspectiveCube'),
		PathAnimation: require('./src/PathAnimation'),
		WobbleAnimation: require('./src/WobbleAnimation'),
		SequenceAnimation: require('./src/SequenceAnimation'),
		SingleComponent: require('./src/SingleComponentAnimation'),
		HierarchicalAnimation: require('./src/HierarchicalAnimation'),
		//yet to be added		
		EqualizerAnimation: require('./src/EqualizerAnimation')
	};

var Sample = kind({
	kind: ScrollingSampleList,
	title: 'Animation Samples',
	version: '1.0.0',
	libraryName: 'enyo',
	samples: samples
});

ready(function() {
	new Sample().renderInto(document.body);
});


},{'../strawman/ScrollingSampleList':'../strawman/ScrollingSampleList','./src/EaseAnimation':'src/EaseAnimation','./src/HeartAnimation':'src/HeartAnimation','./src/TrampolineEffect':'src/TrampolineEffect','./src/SolarEclipse':'src/SolarEclipse','./src/PerspectiveCube':'src/PerspectiveCube','./src/PathAnimation':'src/PathAnimation','./src/WobbleAnimation':'src/WobbleAnimation','./src/SequenceAnimation':'src/SequenceAnimation','./src/SingleComponentAnimation':'src/SingleComponentAnimation','./src/HierarchicalAnimation':'src/HierarchicalAnimation','./src/EqualizerAnimation':'src/EqualizerAnimation'}]
	};

});
//# sourceMappingURL=animation-samples.js.map