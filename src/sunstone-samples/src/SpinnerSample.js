var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows');

var
	Spinner = require('sunstone/Spinner'),
	Button = require('sunstone/Button');

module.exports = kind({
	name: 'sun.sample.SpinnerSample',
	classes: 'enyo-unselectable',
	components: [
		{content: 'Normal spinner (48x48)', classes: 'spinner-sample-label'},
		{kind: FittableRows, classes: 'spinner-sample', components: [
			{name: 'spinner', kind: Spinner},
			{name: 'content', fit: true, classes: 'spinner-content', content: 'Deleting...'}
		]},
		{name: 'stopButton', kind: Button, classes: 'sample-button', content: 'Stop', ontap: 'buttonTapped'},
		{name: 'startButton', kind: Button, classes: 'sample-button', content: 'Start', ontap: 'buttonTapped'},
		{name: 'toggleButton', kind: Button, classes: 'sample-button', content: 'Toggle', ontap: 'buttonTapped'},
		{content: 'Small spinner (24x24)', classes: 'spinner-sample-label'},
		{name: 'search-content', classes: 'spinner-sample-search-content', content: 'SEARCHING'},
		{name: 'smallSpinner', kind: Spinner, size: 'small', classes: 'spinner-sample-small-spinner'}
	],
	buttonTapped: function (inSender, inEvent) {
		var buttonName = inSender.name,
			spinner = this.$.spinner,
			content = this.$.content;
		switch(buttonName){
		case 'stopButton' :
			spinner.stop();
			content.setContent('Complete.');
			break;
		case 'startButton' :
			spinner.start();
			content.setContent('Deleting...');
			break;
		case 'toggleButton' :
			spinner.toggle();
			if (spinner.getShowing()) {
				content.setContent('Deleting...');
			} else {
				content.setContent('Complete.');
			}
			break;
		}
	}
});
