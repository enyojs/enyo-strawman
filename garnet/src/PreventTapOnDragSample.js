require('garnet');

var kind = require('enyo/kind');

module.exports = kind({
	name: 'g.sample.PreventTapOnDragSample',
	classes: 'enyo-unselectable garnet g-sample g-sample-prevent-tap-on-drag',
	components: [
		{content: '< Prevent Tap On Drag Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Drag inside the buttons', classes: 'g-sample-subheader'},
		{classes:'g-sample-prevent-tap-on-drag-box', content:'Drag inside', ontap:'tap', name:'red'},
		{classes:'g-sample-prevent-tap-on-drag-box', content:'Drag inside', ontap:'tap', name: 'blue', ondragfinish: 'dragfinish'},
		{name: 'result', allowHtml: true, content: '', classes: 'g-sample-prevent-tap-on-drag-result'}
	],
	dragfinish: function(inSender, inEvent) {
		inEvent.preventTap();
	},
	tap: function(inSender, inEvent) {
		this.$.result.setContent(this.$.result.getContent() + '<br>tapped !!');
	},
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});
