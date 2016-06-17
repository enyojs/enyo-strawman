var
    kind = require('enyo/kind'),
    sceneSupport = require('enyo/sceneSupport'),
    animate = require('enyo/scene'),
    easing = require('enyo/easing'),
    image = require('enyo/Image');

var duration = 150,
    laps = 10,
    counter = 0,
    interval = duration / laps;

var t, s, l = 1,
    handle, kindRef;

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
                this.$.container2.createComponent({ classes: "bar", /*mixins: [sceneSupport], scene: { scale: "1,100,1", duration: duration, ease: { 1: 0 } } */ });
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
        var currentActor, currentActorProps, that, compRandom;
        var len = children.length,
            i;
        l = 1;
        for (var i = 0; i < len; i++) {
            this.animateElem(children[i]);
        }
        /* that = this;
         for (i = 0; i < len; i++) {
             t = (((l * interval) * 100) / duration);
             s = this.getRandom();
             currentActor = children[i];
             currentActor.scene.poses[0].animate = {
                 scale: "1," + s + ",1",
                 duration: s
             };
             // currentActorProps = children[i].scene.poses[0].animate;
             // currentActorProps.scale = "1," + s + ",1";
             // currentActorProps.duration = s;
             currentActor.scene.play();
             currentActor.scene.completed = function() {
                 console.dir(this);
                 compRandom = that.getRandom();
                 this.poses[0].animate = {
                     scale: "1," + compRandom + ",1",
                     duration: compRandom
                 }
                 console.log(this.poses[0].animate.scale);
                 this.play();
                 // children[i].scene.getAnimation(0).animate.ease[t] = s;
                 // children[i].scene.stop();

             }
         }

         l += 1;*/

        //setTimeout(this.handleTimeout.bind(this), (interval / 2));
        // handle = setInterval(this.handleInterval.bind(this), interval);
    },
    animateElem: function(elem) {
        var randomVal, currentElem, propsObj, randCol;
        currentElem = elem;
        randomVal = this.getRandom();
        randCol = this.randomColor();
        propsObj = {
            scale: "1," + randomVal + ",1",
            "background-color": randCol,
            duration: duration,
            ease: easing.easeOutQuad
        }
        animate([elem], propsObj, { autoPlay: true, completed: this.completedAnim });
    },

    completedAnim: function() {
        ++counter;
        if (counter === 10) {
            kindRef.startAnimation();
            counter = 0;
        }

    },
    /*  handleInterval: function() {
          var children = this.$.container2.children;
          var len = children.length,
              i;
          if (l === len) {
              clearInterval(handle);
              this.$.container2.destroyClientControls();
              for (i = 0; i < 10; i++) {
                  this.$.container2.createComponent({ classes: "bar", scene: { scale: "1,100,1", duration: duration, ease: { 1: 0 } } });
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
          l += 1;
      },*/

    getRandom: function() {
        return Math.floor(30 + (Math.random() * 40));
    },
    randomColor: function() {
        return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    },
    destroy: kind.inherit(function(sup) {
        return function() {
            sup.apply(this, arguments);
        };
    })
});
