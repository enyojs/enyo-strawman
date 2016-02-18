var
	kind = require('enyo/kind'),
	Group = require('enyo/Group'),
	GroupItem = require('enyo/GroupItem');

var
	FittableRows = require('layout/FittableRows');

var
	playFeedback = require('sunstone/feedback'),
	Scroller = require('sunstone/Scroller'),
	ContextualButton = require('sunstone/ContextualButton'),
	ContextualPopup = require('sunstone/ContextualPopup');


var SelectiveItem = kind({
	
	kind: GroupItem,

	//* @public
	published: {
		//* When true, button is shown as disabled and does not generate tap
		//* events
		disabled: false
	},
	//* @protected
	handlers: {
		ondown: 'eventDown',
		onup: 'eventUp',
		onleave:'eventUp',
		// prevent muli pressed
		ongesturechange: 'eventUp',
		ongestureend: 'eventUp',
		// prevent double onchange bubble in IE
		onclick: ''
	},
	tag: 'div',
	classes: 'sun-selectiveItem',
	components: [
		{name:'itemContent', classes:'sun-selectiveItem-contentWrapper'}
	],
	bindings: [
		{from: 'content', to: '$.itemContent.content'}
	],
	eventDown: function(inSender,inEvent) {
		this.addClass('pressed');
		return true;
	},
	eventUp: function(inSender,inEvent) {
		this.removeClass('pressed');
		return true;
	},
	tap: function(inSender,inEvent) {
		inEvent.preventDefault();
		if (!this.disabled) {
			playFeedback();
			if (!this.getActive()) {
				this.setActive(true);
			}
		} else {
			this.bubble('onActivate');
		}
		return !this.disabled;
	}
});

module.exports = kind({
	name: 'sun.sample.ContextualPopupSample',
	classes: 'sun enyo-unselectable enyo-fit sun-contextual-popup-sample',
	components: [
		{name:'componentContainer', kind: FittableRows, classes: 'enyo-fill', components: [
			//Top row of ContextualPopup
			{components: [
				{name: 'test0', style: 'width: 300px', kind: ContextualButton, content: 'Test', components: [
					{name:'contextualPopup0', kind: ContextualPopup, classes: 'contextual-popup', floating: true, components: [
						{kind: Scroller, horizontal: 'hidden', classes: 'contextual-popup-scroller', components: [
							{name: 'myTest', kind: Group, onActivate: 'groupChanged', components: [
								{kind: SelectiveItem, classes: 'first-item', content: 'cm'},
								{kind: SelectiveItem, content: 'inches', active: true},
								{kind: SelectiveItem, content: 'yard'},
								{kind: SelectiveItem, classes: 'last-item', content: 'miles'}
							]}
						]}
					]}
				]}
			]}
		]}
	],
	rendered: kind.inherit(function (sup) {
		return function() {
			sup.apply(this, arguments);
			//must put render function to display active selectiveItem first loading.
			this.$.contextualPopup0.render();
			this.$.test0.setContent(this.$.myTest.getActive().getContent());
		};
	}),
	groupChanged: function(inSender, inEvent) {
		if (inEvent.originator.getActive()) {
			var selected = inEvent.originator.getContent();
			this.$.test0.setContent(selected);
			this.closePopup();
		}
	},
	closePopup: function() {
		this.$.contextualPopup0.hide();
		// must put return true; to stop event bubbling
		return true;
	}
});