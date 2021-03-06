var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	Scroller = require('enyo/Scroller');

module.exports = kind({
	name: 'enyo.sample.FullscreenSample',
	classes: 'fullscreen-sample enyo-fit enyo-unselectable',
	components: [
		{name: 'sampleContent', classes: 'fullscreen-sample-container', components: [
			{content: 'Fullscreen Sample'},
			{kind: Scroller, classes: 'fullscreen-sample-scroller', components: [
				{content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'}
			]},
			{kind: Button, content: 'Toggle Fullscreen', ontap: 'toggleFullscreen'}
		]}
	],
	//* Set/unset _this.$.sampleContent_ as fullscreen control
	toggleFullscreen: function (sender, ev) {
		var targetControl = this.$.sampleContent;

		// If _targetControl_ is currently fullscreen, cancel fullscreen
		if (targetControl.isFullscreen()) {
			targetControl.cancelFullscreen();

		// If _targetControl_ is not currently fullscreen, request fullscreen
		} else {
			targetControl.requestFullscreen();
		}
	}
});
