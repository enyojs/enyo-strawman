var
	kind = require('enyo/kind'),
	Group = require('enyo/Group');

var
	FittableRows = require('layout/FittableRows');

var
	Button = require('sunstone/Button');

module.exports = kind({
	name: 'sun.sample.ButtonSample',
	kind: FittableRows,
	classes: 'sun enyo-unselectable enyo-fit',
	components: [
		{classes: 'sun-button-sample-wrapper', components: [
			{content: 'Focus Buttons:', classes: 'sun-sample-font'},
			{content: 'Button (text button)', classes: 'sun-sample-font'},
			{name: 'button', kind: Button, classes: 'sun-button-sample', content: 'B', ontap: 'buttonTapped'},
			{name: 'disableButton', kind: Button, disabled: true, content: 'Disabled Button', ontap: 'buttonTapped'},
			{name: 'longButton', kind: Button, style:'width: 150px', content: 'Loooooooong Button', ontap: 'buttonTapped'},
			{tag: 'br'},
			{content: 'Grouped Buttons:', classes: 'sun-sample-font'},
			{content: 'Button (group button)', classes: 'sun-sample-font'},
			{kind: Group, classes: 'sun-button-sample-group', components: [
				{name: 'appleButton', kind: Button, content: 'Apple', ontap: 'buttonTapped'},
				{name: 'bananaButton', kind: Button, content: 'Banana', ontap: 'buttonTapped'},
				{name: 'saskatoonberryButton', kind: Button, content: 'Saskatoonberry', ontap: 'buttonTapped'}
			]}
		]},
		{content: 'Result', classes: 'sun-sample-font'},
		{name: 'result', allowHtml: true, content: 'No button pressed yet.', classes: 'sun-sample-font'}
	],
	buttonTapped: function(inSender, inEvent) {
		this.$.result.setContent('&quot;' + inSender.name + '&quot; pressed.');
	}
});