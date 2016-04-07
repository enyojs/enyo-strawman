var
	kind = require('enyo/kind'),
	image = require('enyo/Image');

var duration = 10000,
	laps = 10,
	interval = duration / laps;

var t, s, l = 1, handle;

module.exports = kind({
	name: "equalizer",
	classes: "enyo-fit equalizer",
	components: [
		{name: "container1", classes: "container container-background"},
		{name: "container2", classes: "container"}
	],

	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			for (var i = 0; i < 10; i++) {
				this.$.container1.createComponent({classes: "bar"});
				this.$.container2.createComponent({classes: "bar", scene: {scale:"1,100,1", duration: duration, ease:{1:0} }});
			}
		};
	}),

	rendered: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.startAnimation();
		};
	}),

	startAnimation: function() {
		var children = this.$.container2.children;
		var len = children.length,i;
		l = 1;
		
		for (i = 0; i < len; i++) {
			t = (((l * interval) * 100) / duration);
			s = this.getRandom();
			children[i].scene.getAnimation(0).animate.ease[t] = s;
			children[i].scene.play();
			children[i].scene.completed = function () {
				children[i].scene.getAnimation(0).animate.ease[t] = s;
				children[i].scene.stop();
				children[i].scene.play();
			}
		}
		// for (var i = 0; i < len; i++) {
		// 	// children[i].setDuration(duration);
		// 	// children[i].addAnimation({scale:"1,100,1"});
		// 	// children[i]["ease"] = {};
		// 	// children[i].ease[l] = 0;
		// 	//children[i].start(true, interval);
		// 	//children[i].start(true);
		// 	children[i].scene.getAnimation(0).animate.ease.play();
		// }


		l += 1;

		//setTimeout(this.handleTimeout.bind(this), (interval / 2));
		handle = setInterval(this.handleInterval.bind(this), interval);
	},

	// handleTimeout: function() {
	// 	var children = this.$.container2.children;
	// 	var len = children.length;
	// 	// Set initial value here
	// 	for (i = 0; i < len; i++) {
	// 		t = (((l * interval) * 100) / duration);
	// 		s = this.getRandom();
	// 		children[i].ease[t] = s;
	// 	}

	// 	l += 1;

	// 	handle = setInterval(this.handleInterval.bind(this), interval);
	// },

	handleInterval: function() {
		var children = this.$.container2.children;
		var len = children.length, i;
		if (l === len) {
			clearInterval(handle);
			this.$.container2.destroyClientControls();
			for (i = 0; i < 10; i++) {
				this.$.container2.createComponent({classes: "bar", scene: {scale:"1,100,1", duration: duration, ease:{1:0} }});
			}

			this.render();
		}

		for (i = 0; i < len; i++) {
			// Time between 1 to 100 (fixed interval)
			t = (((l * interval) * 100) / duration);
			// Scale between 40 to 100 (random interval)
			s = this.getRandom();
			children[i].scene.getAnimation(0).animate.ease[t] = s;
			children[i].scene.stop();
			children[i].scene.play();
		}
		// for (var i = 0; i < len; i++) {
		// 	// children[i].setDuration(duration);
		// 	// children[i].addAnimation({scale:"1,100,1"});
		// 	// children[i]["ease"] = {};
		// 	// children[i].ease[l] = 0;
		// 	//children[i].start(true, interval);
		// 	//children[i].start(true);
			
		// }

		l += 1;
	},

	getRandom: function() {
		return Math.floor(30 + (Math.random() * 40));
	},

	destroy: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
		};
	})
});
