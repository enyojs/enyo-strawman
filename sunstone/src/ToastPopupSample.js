var
	kind = require('enyo/kind');

var
	ToastPopup = require('sunstone/ToastPopup'),
	Button = require('sunstone/Button');

module.exports = kind({
	name: 'sun.sample.ToastPopupSample',
	classes: 'sun enyo-unselectable enyo-fit',
	components: [
		{content: 'Toast Popup'},
		{tag: 'br'},
		{kind: Button, content: 'Show Toast Popup', ontap: 'showPopup'},
		{name: 'toastpopup', kind: ToastPopup, showDuration: 2000, content: 'Hello toastpopup!'}
	],
	showPopup: function (inSender) {
		if (inSender.name === 'button') {
			this.$.toastpopup.show();
		}
	}
});