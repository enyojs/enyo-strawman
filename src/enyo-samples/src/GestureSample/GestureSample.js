var
	drag = require('enyo/gesture/drag'),
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	Animator = require('enyo/Animator'),
	Checkbox = require('enyo/Checkbox'),
	Group = require('enyo/Group'),
	Select = require('enyo/Select');

var
	EventItem = kind({
		name:'enyo.sample.EventItem',
		published: {
			event:'',
			truncate: true,
			persist: false
		},
		style:'padding:4px;',
		events: {
			onDone:''
		},
		components: [
			{name: 'eventProps', allowHtml:true},
			{kind: Animator, duration:1000, startValue:0, endValue:255, onStep:'stepAnimation', onEnd:'animationEnded'}
		],
		create: function () {
			this.inherited(arguments);
			this.eventChanged();
			this.truncateChanged();
		},
		truncateChanged: function () {
			this.$.eventProps.addRemoveClass('gesture-sample-truncate', this.truncate);
		},
		eventChanged: function (old) {
			if (this.event) {
				if (this.timeout) {
					clearTimeout(this.timeout);
					this.timeout = null;
				}
				this.$.animator.stop();
				this.$.eventProps.set('content', this.getPropsString());
				this.$.animator.play();
			}
		},
		stepAnimation: function (sender, ev) {
			var v = Math.floor(sender.value);
			this.applyStyle('background-color', 'rgb(' + v + ',255,' + v + ');');
			return true;
		},
		animationEnded: function () {
			if (!this.persist) {
				this.timeout = setTimeout(this.bindSafely(function() {
					this.doDone({type:this.event.type});
				}), 2000);
			}
			return true;
		},
		destroy: function () {
			if (this.timeout) {
				clearTimeout(this.timeout);
				this.timeout = null;
			}
			this.inherited(arguments);
		},
		getPropsString: function () {
			var props = [];
			for (var i in this.event) {
				if ((this.event[i] !== undefined) &&
					(this.event[i] !== null) &&
					!(this.event[i] instanceof Object) &&
					(i != 'type')) {
					props.push(i + ': ' + this.event[i]);
				}
			}
			if (this.event.srcEvent && this.event.srcEvent.type) {
				props.push('srcEvent.type: ' + this.event.srcEvent.type);
			}
			return '<b>' + this.event.type + '</b>: { ' + props.join(', ') + ' }';
		}
	});

var previousHoldPulseConfig;

function overrideHoldPulseConfig () {
	previousHoldPulseConfig = drag.holdPulseDefaultConfig;

	drag.configureHoldPulse({
		frequency: 100,
		events: [
		    {name: 'hold', time: 200},
		    {name: 'longpress', time: 500},
		    {name: 'longerpress', time: 1000}
		],
		endHold: 'onMove',
		moveTolerance: 16,
		resume: false
	});
}

function restoreHoldPulseConfig () {
	drag.configureHoldPulse(previousHoldPulseConfig);
}

module.exports = kind({
	name: 'enyo.sample.GestureSample',
	classes: 'gesture-sample enyo-fit enyo-unselectable',
	components: [
		{
			classes:'gesture-sample-pad',
			name: 'gestureSamplePad',
			fit:true,
			doubleTapEnabled: false,
			ondown: 'handleEvent',
			onup: 'handleEvent',
			ontap: 'handleEvent',
			onmove: 'handleEvent',
			onenter: 'handleEvent',
			onleave: 'handleEvent',
			ondragstart: 'handleEvent',
			ondrag: 'handleEvent',
			ondragover: 'handleEvent',
			onhold: 'handleEvent',
			onrelease: 'handleEvent',
			onholdpulse: 'handleEvent',
			onflick: 'handleEvent',
			ongesturestart: 'handleEvent',
			ongesturechange: 'handleEvent',
			ongestureend: 'handleEvent',
			ondoubletap: 'handleEvent',
			onlongpress: 'handleEvent',
			onlongerpress: 'handleEvent',
			components: [
				{content: 'Perform gestures here', style: 'pointer-events: none;'},
				{classes: 'gesture-sample-note', content:'(tap below for options)', style: 'pointer-events: none;'}
			]
		},
		{kind: Group, ontap:'toggleSettings', components: [
			{content: 'Events'},
			{name: 'eventList', style:'font-size:12px;', onDone:'removeEvent', components: [
				{name:'waiting', content: 'Waiting for events...', style:'padding:4px;font-style:italic;color:gray;'}
			]}
		]},
		{ontap:'toggleSettings', name:'settings', showing:false, components: [
			{content: 'Options'},
			{kind: Group, classes:'gesture-sample-padded', components: [
				{classes:'gesture-sample-setting', components: [
					{content:'Truncate detail on small screen: '},
					{name:'truncateDetail', onchange:'truncateChanged', ontap:'preventDefault', kind: Checkbox, checked:true}
				]},
				{classes:'gesture-sample-setting', components: [
					{content:'Enable Double Tap: '},
					{name:'enableDoubleTap', onchange:'doubleTapChanged', ontap:'preventDefault', kind: Checkbox, checked:false}
				]},
				{classes:'gesture-sample-setting', style:'min-height:40px;', components: [
					{content:'Monitor event: '},
					{content:'Select event', style:'width:140px; margin-bottom:5px;'},
					{name:'eventPicker', kind: Select, classes:'gesture-sample-left'}
				]}
			]}
		]}
	],
	create: function () {
		this.inherited(arguments);
		overrideHoldPulseConfig();
		this.eventList = {};
		this.eventCount = 0;
		utils.forEach(
			['All events','down','up','tap','move','enter','leave','dragstart','drag','dragover','hold','release',
				'holdpulse','flick','gesturestart','gesturechange','gestureend','doubletap', 'longpress', 'longerpress'],
			this.bindSafely(function(event) {
				this.$.eventPicker.createComponent({content:event, style:'text-align:left'});
			}));
	},
	destroy: function () {
		restoreHoldPulseConfig();
		this.inherited(arguments);
	},
	handleEvent: function(sender, ev) {
		var event = utils.clone(ev);
		if (this.monitorEvent && (event.type != this.monitorEvent)) {
			return true;
		}
		var eventItem = this.eventList[event.type];
		if (eventItem) {
			eventItem.set('event', event, true);
		} else {
			this.eventCount++;
			eventItem = this.$.eventList.createComponent({
				kind: EventItem,
				event:event,
				truncate: this.$.truncateDetail.get('value'),
				persist: this.monitorEvent
			});
			this.eventList[event.type] = eventItem;
		}
		eventItem.render();
		this.$.waiting.hide();
		this.reflow();
		return true;
	},
	truncateChanged: function () {
		for (var i in this.eventList) {
			this.eventList[i].set('truncate', this.$.truncateDetail.get('value'));
		}
		this.reflow();
		return false;
	},
	doubleTapChanged: function () {
		this.$.gestureSamplePad.doubleTapEnabled = this.$.enableDoubleTap.checked;
	},
	removeEvent: function (sender, ev) {
		this.eventCount--;
		this.eventList[ev.type].destroy();
		delete this.eventList[ev.type];
		if (this.eventCount === 0) {
			this.$.waiting.show();
		}
		this.reflow();
		return true;
	},
	removeAllEvents: function () {
		for (var i in this.eventList) {
			this.eventList[i].destroy();
			delete this.eventList[i];
		}
		this.eventCount = 0;
		this.$.waiting.show();
		this.reflow();
	},
	toggleSettings: function () {
		this.$.settings.set('showing', !this.$.settings.get('showing'));
		this.reflow();
	},
	preventDefault: function () {
		return true;
	},
	monitorEventSelected: function (sender, ev) {
		this.removeAllEvents();
		if (ev.originator.content == 'All events') {
			this.monitorEvent = null;
		} else {
			this.monitorEvent = ev.originator.content;
		}
	}
});