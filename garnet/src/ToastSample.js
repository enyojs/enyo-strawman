require('garnet');

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),
	Button = require('garnet/Button'),
	Toast = require('garnet/Toast'),
	Panel = require('garnet/Panel');

var ToastPanel = kind({
	name: 'g.sample.ToastPanel',
	kind: Panel,
	classes: 'g-layout-absolute-wrapper', // for button
	components: [
		{kind: Button, style: 'position: absolute; width: ' + ri.scale(310) + 'px; margin: auto;', classes: 'g-layout-absolute-center g-layout-absolute-middle', ontap: 'showPopup', content: 'Click here'},
		{
			name: 'toast',
			kind: Toast,
			allowHtml: true,
			content: 'Toast<br><br>Saved'
		}
	],
	showPopup: function(inSender, inEvent) {
		this.$.toast.setDuration(5000);
		this.$.toast.show();
	}
});

module.exports = kind({
	name: 'g.sample.ToastSample',
	classes: 'enyo-unselectable garnet g-sample',
	components: [
		{content: '< Toast Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Toast', classes: 'g-sample-subheader'},
		{kind: ToastPanel, style: 'position: relative;'}
	],
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});
