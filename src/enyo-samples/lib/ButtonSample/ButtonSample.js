var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	Group = require('enyo/Group'),
	EnyoImage = require('enyo/Image');


/*
	Implementation notes:
	-	We are utilizing sender (as opposed to ev.originator) in our button tap handler
		as we need to normalize for the case of the image button that has a child component, and
		we are concerned with the top-level button itself.
*/
module.exports = kind({
	name: 'enyo.sample.ButtonSample',
	classes: 'button-sample',
	components: [
		{content: 'Buttons', classes: 'section'},
		{kind: Button, content: 'Action Button', ontap: 'buttonToggleTapped'},
		{kind: Button, name: 'toggleButton', disabled: true, content: 'Disabled Button', ontap: 'buttonTapped'},
		{content: 'Grouped Buttons', classes: 'section'},
		{kind: Group, onActivate: 'groupButtonsActivated', components: [
			{kind: Button, content: 'Grouped Button 1'},
			{kind: Button, content: 'Grouped Button 2'},
			{kind: Button, content: 'Grouped Button 3'}
		]},
		{content: 'Image Button', classes: 'section'},
		{kind: Button, content: 'Image Button', classes: 'image-button', ontap: 'buttonTapped', components: [
			{kind: EnyoImage, src: 'http://enyojs.com/img/enyo-logo.png', alt: 'Enyo Logo'}
		]},
		{name: 'results', classes: 'results'}
	],
	buttonTapped: function (sender, ev) {
		this.updateResult({content: 'The \'' + sender.getContent() + '\' button is tapped.'});
	},
	buttonToggleTapped: function (sender, ev) {
		this.buttonTapped(sender, ev);
		this.$.toggleButton.setDisabled(!this.$.toggleButton.getDisabled()).setContent(this.$.toggleButton.getDisabled() ? 'Disabled Button' : 'Enabled Button');
	},
	groupButtonsActivated: function (sender, ev) {
		if (ev.originator.getParent().getActive()) {
			this.updateResult({content: 'The \'' + ev.originator.getParent().getActive().getContent() + '\' button is selected.'});
		}
	},
	updateResult: function (comp) {
		this.$.results.destroyClientControls();
		this.$.results.createComponent(comp);
		this.$.results.render();
	}
});
