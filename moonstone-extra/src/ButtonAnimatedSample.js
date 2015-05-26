var
	kind = require('enyo/kind'),
	Control = require('enyo/Control'),
	Group = require('enyo/Group');

var
	FittableRows = require('layout/FittableRows');

var
	Scroller = require('moonstone/Scroller'),
	Divider = require('moonstone/Divider'),
	TooltipDecorator = require('moonstone/TooltipDecorator'),
	Tooltip = require('moonstone/Tooltip'),
	Button = require('moonstone/Button'),
	Icon = require('moonstone/Icon'),
	CaptionDecorator = require('moonstone/CaptionDecorator'),
	ToggleItem = require('moonstone/ToggleItem'),
	BodyText = require('moonstone/BodyText');

var
	ButtonAnimated = require('moonstone-extra/ButtonAnimated');
	
module.exports = kind({
	name: 'moon.sample.ButtonAnimatedSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit moon-button-sample',
	components: [
		{kind: Scroller, fit: true, components: [
			{kind: Control, classes: 'moon-button-sample-wrapper', components: [
				{kind: Divider, content: 'Animated Buttons:'},
				{name: 'animButton', kind: ButtonAnimated, minWidth: false, content: 'Animated!', ontap: 'buttonTapped'},
				{name: 'animButton2', kind: ButtonAnimated, minWidth: false, width: 516, content: 'Animated!', ontap: 'buttonTapped', components: [
					{kind: Icon, icon: 'play'},
					{name: 'animation', content: 'animation'}
				]}
			]}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'result', allowHtml: true, content: 'No button pressed yet.'}
	],
	buttonTapped: function(inSender, inEvent) {
		this.$.result.setContent('&quot;' + inSender.name + '&quot; pressed.');
	},
	showButtonTapped: function () {
		this.$.hiddenButton.show();
	},
	showSmallButtonTapArea: function(inSender, inEvent) {
		if (inEvent.checked) {
			this.$.smallAButton.addClass('visible-tap-area');
			this.$.smallBButton.addClass('visible-tap-area');
			this.$.smallButton.addClass('visible-tap-area');
			this.$.smallDisabledButton.addClass('visible-tap-area');
			this.$.smallLongButton.addClass('visible-tap-area');
			this.$.smallSpacesButton.addClass('visible-tap-area');
		} else {
			this.$.smallAButton.removeClass('visible-tap-area');
			this.$.smallBButton.removeClass('visible-tap-area');
			this.$.smallButton.removeClass('visible-tap-area');
			this.$.smallDisabledButton.removeClass('visible-tap-area');
			this.$.smallLongButton.removeClass('visible-tap-area');
			this.$.smallSpacesButton.removeClass('visible-tap-area');
		}
	}
});