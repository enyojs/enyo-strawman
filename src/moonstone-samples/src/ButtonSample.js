var
	kind = require('enyo/kind'),
	Group = require('enyo/Group');

var
	FittableRows = require('layout/FittableRows');

var
	Scroller = require('moonstone/Scroller'),
	Divider = require('moonstone/Divider'),
	TooltipDecorator = require('moonstone/TooltipDecorator'),
	Tooltip = require('moonstone/Tooltip'),
	Button = require('moonstone/Button'),
	CaptionDecorator = require('moonstone/CaptionDecorator'),
	ToggleItem = require('moonstone/ToggleItem'),
	BodyText = require('moonstone/BodyText'),
	Group = require('enyo/Group'),
	FittableRows = require('layout/FittableRows');

module.exports = kind({
	name: 'moon.sample.ButtonSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit moon-button-sample',
	components: [
		{kind: Scroller, fit: true, components: [
			{classes: 'moon-button-sample-wrapper', components: [

				{kind: Divider, content: 'Buttons:'},
				{kind: TooltipDecorator, components: [
					{name: 'aButton', kind: Button, minWidth: false, content: 'A', ontap: 'buttonTapped'},
					{kind: Tooltip, content: 'minWidth: false'}
				]},
				{kind: TooltipDecorator, components: [
					{name: 'bButton', kind: Button, content: 'B', ontap: 'buttonTapped'},
					{kind: Tooltip, content: 'minWidth: true'}
				]},
				{name: 'button', kind: Button, content: 'Button', uppercase : false, ontap: 'buttonTapped'},
				{name: 'disabledButton', kind: Button, disabled: true, content: 'Disabled Button', ontap: 'buttonTapped'},
				{name: 'longButton', kind: Button, content: 'Looooooooooooooooong Button', ontap: 'buttonTapped'},
				{name: 'spacesButton', kind: Button, content: 'Button   with   extra   spaces', ontap: 'buttonTapped'},
				{classes: 'moon-2v'},

				{kind: Divider, content: 'Small Buttons:'},
				{name: 'smallAButton', kind: Button, small: true, minWidth: false, content: 'A', ontap: 'buttonTapped'},
				{name: 'smallBButton', kind: Button, small: true, content: 'B', ontap: 'buttonTapped'},
				{name: 'smallButton', kind: Button, small: true, content: 'Button', ontap: 'buttonTapped'},
				{name: 'smallDisabledButton', kind: Button, small: true, disabled: true, content: 'Disabled Button', ontap: 'buttonTapped'},
				{name: 'smallLongButton', kind: Button, small: true, content: 'Loooooooooooooooooooooooong Button', ontap: 'buttonTapped'},
				{name: 'smallSpacesButton', kind: Button, small:true, content: 'Button   with   extra   spaces', ontap: 'buttonTapped'},
				{kind: ToggleItem, classes: 'tap-area-toggle-container', content: 'Show Tap Area', onActivate: 'showSmallButtonTapArea'},
				{classes: 'moon-2v'},

				{kind: Divider, content: 'Captioned Buttons:'},
				{kind: CaptionDecorator, side: 'top', content: 'Pow', components: [
					{name: 'captionedAButton', kind: Button, content: 'A', ontap: 'buttonTapped'}
				]},
				{kind: CaptionDecorator, side: 'right', content: 'Boom', components: [
					{name: 'captionedBButton', kind: Button, content: 'B', ontap: 'buttonTapped'}
				]},
				{kind: CaptionDecorator, side: 'bottom', content: 'Crash', components: [
					{name: 'captionedCButton', kind: Button, content: 'C', ontap: 'buttonTapped'}
				]},
				{kind: CaptionDecorator, side: 'left', content: 'Bang', components: [
					{name: 'captionedDButton', kind: Button, content: 'D', ontap: 'buttonTapped'}
				]},
				{classes: 'moon-2v'},

				{kind: Divider, content: 'Captioned Buttons with showOnFocus option:'},
				{kind: CaptionDecorator, side: 'top', showOnFocus: true, content: 'Pow', components: [
					{name: 'showOnFocusCaptionTopButton', kind: Button, content: 'Top', ontap: 'buttonTapped'}
				]},
				{kind: CaptionDecorator, side: 'bottom', showOnFocus: true, content: 'Crash', components: [
					{name: 'showOnFocusCaptionBottomButton', kind: Button, content: 'Bottom', ontap: 'buttonTapped'}
				]},
				{style: 'display:inline-block;', classes: 'moon-2h'},
				{kind: CaptionDecorator, side: 'left', showOnFocus: true, content: 'Bang', components: [
					{name: 'showOnFocusCaptionLeftButton', kind: Button, content: 'Left', ontap: 'buttonTapped'}
				]},
				{kind: CaptionDecorator, side: 'right', showOnFocus: true, content: 'Boom', components: [
					{name: 'showOnFocusCaptionRightButton', kind: Button, content: 'Right', ontap: 'buttonTapped'}
				]},
				{classes: 'moon-2v'},

				{kind: Divider, content: 'Grouped Buttons:'},
				{kind: Group, classes: 'moon-button-sample-group', components: [
					{name: 'appleButton', kind: Button, content: 'Apple', ontap: 'buttonTapped'},
					{name: 'bananaButton', kind: Button, content: 'Banana', ontap: 'buttonTapped'},
					{name: 'saskatoonberryButton', kind: Button, content: 'Saskatoonberry', ontap: 'buttonTapped'}
				]},
				{classes: 'moon-2v'},

				{kind: Divider, content: 'Hidden Buttons:'},
				{name: 'hiddenButton', kind: Button, content: 'Hidden Button', renderOnShow: true, ontap: 'buttonTapped'},
				{name: 'showButton', kind: Button, content: 'Show Hidden Button', ontap: 'showButtonTapped'},

				{classes: 'moon-2v'},
				{kind: Divider, content: 'Translucent Background Buttons:'},
				{classes: 'image-background', components: [
					{name: 'opaqueButton', kind: Button, minWidth: false, content: 'Normal Opaque', ontap: 'buttonTapped'},
					{name: 'translucentButton', kind: Button, minWidth: false, backgroundOpacity: 'translucent', content: 'Translucent', ontap: 'buttonTapped'},
					{name: 'disabledTranslucentButton', kind: Button, minWidth: false, backgroundOpacity: 'translucent', disabled: true, content: 'Disabled Translucent', ontap: 'buttonTapped'},
					{name: 'transparentButton', kind: Button, minWidth: false, backgroundOpacity: 'transparent', content: 'Transparent',  ontap: 'buttonTapped'},
					{name: 'disabledTransparentButton', kind: Button, minWidth: false, backgroundOpacity: 'transparent', disabled: true, content: 'Disabled Transparent',  ontap: 'buttonTapped'},
					{classes: 'moon-1v'},
					{kind: Divider, content: 'Grouped Buttons:'},
					{kind: Group, classes: 'moon-button-sample-group', components: [
						{name: 'appleButton2', kind: Button, content: 'Apple', backgroundOpacity: 'translucent', ontap: 'buttonTapped'},
						{name: 'bananaButton2', kind: Button, content: 'Banana', backgroundOpacity: 'translucent', ontap: 'buttonTapped'},
						{name: 'saskatoonberryButton2', kind: Button, content: 'Saskatoonberry', backgroundOpacity: 'translucent', ontap: 'buttonTapped'}
					]}
				]}
			]}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'result', allowHtml: true, content: 'No button pressed yet.'}
	],
	buttonTapped: function (sender, ev) {
		this.$.result.setContent('&quot;' + sender.name + '&quot; pressed.');
	},
	showButtonTapped: function () {
		this.$.hiddenButton.show();
	},
	showSmallButtonTapArea: function (sender, ev) {
		if (ev.checked) {
			this.addClass('visible-tap-area');
		} else {
			this.removeClass('visible-tap-area');
		}
	}
});