var
	kind = require('enyo/kind'),
	Group = require('enyo/Group'),
	GroupItem = require('enyo/GroupItem');

var
	FittableRows = require('layout/FittableRows');

var
	ContextualButton = require('sunstone/ContextualButton'),
	ContextualPopup = require('sunstone/ContextualPopup'),
	Header = require('sunstone/Header'),
	ToastPopup = require('sunstone/ToastPopup'),
	Input = require('sunstone/Input'),
	InputDecorator = require('sunstone/InputDecorator'),
	Scroller = require('sunstone/Scroller'),
	playFeedback = require('sunstone/feedback');

var SelectiveItem = kind({
	
	kind: GroupItem,

	published: {
		// When true, button is shown as disabled and does not generate tap
		// events
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
	eventDown: function (inSender, inEvent) {
		this.addClass('pressed');
		return true;
	},
	eventUp: function (inSender, inEvent) {
		this.removeClass('pressed');
		return true;
	},
	tap: function (inSender, inEvent) {
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
	name: 'sun.sample.ProfileSample',
	kind: FittableRows,
	classes: 'enyo-unselectable enyo-fit',
	components: [
		{kind: Header, title: 'Profile & goal', showBackButton: true, onBackButtonTapped: 'buttonTapped'},
		{kind: Scroller, fit: true, style: 'height: 100%;', horizontal: 'hidden', components: [
			{classes: 'general-index', content: 'PROFILE'},
			{classes: 'profile-label', content: 'Gender'},
			{name: 'gender', style: 'margin: 0 16px;', kind: ContextualButton, content: 'Test', components: [
				{name: 'genderPopup', kind: 'sun.ContextualPopup', classes: 'contextual-popup', floating: true, components: [
					{kind: Scroller, horizontal: 'hidden', classes: 'contextual-popup-scroller', components: [
						{name: 'genderGroup', kind: Group, onActivate: 'groupChanged', components: [
							{kind: SelectiveItem, classes: 'select-item sun-first-item', content: 'Male', active: true},
							{kind: SelectiveItem, classes: 'select-item sun-last-item', content: 'Female'}
						]}
					]}
				]}
			]},
			{classes: 'profile-label', content: 'AGE'},
			{classes: 'profile-table', components: [
				{classes: 'profile-table-cell', style: 'width: 65%;', components: [
					{kind: InputDecorator, style: 'margin-left: 16px; width: 90%;', components: [
						{kind: Input, type: 'number', style: 'width: 100%', placeholder: 'Enter Age', oninput: 'handleInput', onchange: 'handleChange'}
					]}
				]},
				{classes: 'profile-table-cell', style: 'width: 30%;', components: [
					{style: 'margin-right: 16px', content: 'years'}
				]}
			]},
			{classes: 'profile-label', content: 'HEIGHT'},
			{classes: 'profile-table', components: [
				{classes: 'profile-table-cell', style: 'width: 65%;', components: [
					{kind: InputDecorator, style: 'margin-left: 16px; width: 90%;', components: [
						{kind: 'sun.Input', type: 'number', style: 'width: 100%', placeholder: 'Enter Height', oninput: 'handleInput', onchange: 'handleChange'}
					]}
				]},
				{classes: 'profile-table-cell', style: 'width: 30%;', components: [
					{name: 'height', style: 'margin-right: 16px', kind: ContextualButton, content: 'Test', components: [
						{name: 'heightPopup', kind: ContextualPopup, classes: 'contextual-popup', floating: true, components: [
							{kind: Scroller, horizontal: 'hidden', classes: 'contextual-popup-scroller', components: [
								{name: 'heightGroup', kind: Group, onActivate: 'groupChanged', components: [
									{kind: SelectiveItem, classes: 'select-item sun-first-item', content: 'cm', active: true},
									{kind: SelectiveItem, classes: 'select-item sun-last-item', content: 'feet'}
								]}
							]}
						]}
					]}
				]}
			]},
			{classes: 'profile-label', content: 'WEIGHT'},
			{classes: 'profile-table', components: [
				{classes: 'profile-table-cell', style: 'width:65%;', components: [
					{kind: InputDecorator, style: 'margin-left: 16px; width: 90%;', components: [
						{kind: Input, type: 'number', style: 'width: 100%', placeholder: 'Enter Weight', oninput: 'handleInput', onchange: 'handleChange'}
					]}
				]},
				{classes: 'profile-table-cell', style: 'width: 30%;', components: [
					{name: 'weight', style: 'margin-right: 16px', kind: ContextualButton, content: 'Test', components: [
						{name: 'weightPopup', kind: ContextualPopup, classes: 'contextual-popup', floating: true, components: [
							{kind: Scroller, horizontal: 'hidden', classes: 'contextual-popup-scroller', components: [
								{name: 'weightGroup', kind: Group, onActivate: 'groupChanged', components: [
									{kind: SelectiveItem, classes: 'select-item sun-first-item', content: 'kg', active: true},
									{kind: SelectiveItem, classes: 'select-item sun-last-item', content: 'pound'}
								]}
							]}
						]}
					]}
				]}
			]},
			{style: 'padding: 12px 16px', components: [
				{style: 'background-color: #f0f1f1; padding: 12px 16px;', components: [
					{content: '- BM: 20(Normal weight)'},
					{content: '- Target weight: 72kg'},
					{content: '- Recommended daily goal: 350kcal/6500steps/5.51km'}
				]}
			]},
			{classes: 'general-index', content: 'DAILY ACTIVITY GOAL'},
			{style: 'padding: 12px 16px; font-size: 14px; color: grey;', content: 'Your goal can be measured in calories, number of steps, or units of distace. The selected unit is used as a standard unit for your goal.'},
			{classes: 'profile-label', content: 'EDIT GOAL'},
			{classes: 'profile-table', components: [
				{classes: 'profile-table-cell', style: 'width: 65%;', components: [
					{kind: InputDecorator, style: 'margin-left: 16px; width: 90%;', components: [
						{kind: Input, type: 'number', style: 'width: 100%', placeholder: '350', oninput: 'handleInput', onchange: 'handleChange'}
					]}
				]},
				{classes: 'profile-table-cell', style: 'width: 30%;', components: [
					{name: 'goal', style: 'margin-right: 16px', kind: ContextualButton, content: 'Test', components: [
						{name: 'goalPopup', kind: ContextualPopup, classes: 'contextual-popup', floating: true, components: [
							{kind: Scroller, horizontal: 'hidden', classes: 'contextual-popup-scroller', components: [
								{name: 'goalGroup', kind: Group, onActivate: 'groupChanged', components: [
									{kind: SelectiveItem, classes: 'select-item sun-first-item sun-last-item', content: 'kcal', active: true}
								]}
							]}
						]}
					]}
				]}
			]},
			{style: 'padding: 12px 16px; font-size: 14px;', components: [
				{content: 'Stemp : 6500 steps'},
				{content: 'Distance : 5.51 km'}
			]}
		]},
		{name: 'toastpopup', kind: ToastPopup, showDuration: 2000, content: 'key pressed!'}
	],
	rendered: kind.inherit(function (sup) {
		return function() {
			sup.apply(this, arguments);
			//must put render function to display active selectiveItem first loading.
			this.$.genderPopup.render();
			this.$.gender.setContent(this.$.genderGroup.getActive().getContent());

			this.$.heightPopup.render();
			this.$.height.setContent(this.$.heightGroup.getActive().getContent());

			this.$.weightPopup.render();
			this.$.weight.setContent(this.$.weightGroup.getActive().getContent());

			this.$.goalPopup.render();
			this.$.goal.setContent(this.$.goalGroup.getActive().getContent());
		};
	}),
	groupChanged: function (inSender, inEvent) {
		if (inEvent.originator.getActive()) {
			var selected = inEvent.originator.getContent();
			if (inSender.name === 'genderGroup') {
				this.$.gender.setContent(selected);
			} else if (inSender.name === 'heightGroup') {
				this.$.height.setContent(selected);
			} else if (inSender.name === 'weightGroup') {
				this.$.weight.setContent(selected);
			} else if (inSender.name === 'goalGroup') {
				this.$.goal.setContent(selected);
			}
			this.closePopup();
		}
	},
	closePopup: function () {
		this.$.genderPopup.hide();
		this.$.heightPopup.hide();
		this.$.weightPopup.hide();
		this.$.goalPopup.hide();
		// must put return true; to stop event bubbling
		return true;
	},
	buttonTapped: function (inSender, inEvent) {
		this.$.toastpopup.hide();
		this.$.toastpopup.show();
	},
	handleChange: function (inSender, inEvent) {
		var toast = this.$.toastpopup;
		setTimeout(function () {
			toast.hide();
			toast.setContent(inSender.getValue());
			toast.show();
		}, 500);
	}
});