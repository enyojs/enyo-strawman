var
	kind = require('enyo/kind');

var
	Button = require('moonstone/Button'),
	CheckboxItem = require('moonstone/CheckboxItem'),
	Divider = require('moonstone/Divider'),
	Input = require('moonstone/Input'),
	InputDecorator = require('moonstone/InputDecorator'),
	ProgressButton = require('moonstone/ProgressButton');

module.exports = kind({
	name: 'moon.sample.ProgressButtonSample',
	classes: 'moon enyo-unselectable enyo-fit moon-progress-button-sample',
	contentChange: false,
	components: [
		{kind: Divider, content: 'Progress Button with Auto Download'},
		{name: 'autoDownload', kind: ProgressButton, content: 'Auto Download', postContent: 'Auto Launch', progress: 0, ontap: 'startDownloading'},
		{tag: 'br'},
		{tag: 'br'},
		{kind: Divider, content: 'Simple Progress Button'},
		{name: 'progressButton', kind: ProgressButton, progress: 0, content: 'Download', postContent: 'Launch', barClasses: 'blue', ontap: 'changeValue'},
		{tag: 'br'},
		{tag: 'br'},
		{kind: InputDecorator, style: 'margin-right:10px;', components: [
			{kind: Input, value: 10}
		]},
		{kind: Button, content: 'Set', small: true, classes: 'spaced-button', ontap: 'changeValue'},
		{kind: Button, content: '-', small: true, classes: 'spaced-button', ontap: 'decValue'},
		{kind: Button, content: '+', small: true, classes: 'spaced-button', ontap: 'incValue'},
		{tag: 'br'},
		{tag: 'br'},
		{style: 'width:240px;', components: [
			{name: 'animateSetting', kind: CheckboxItem, checked: true, content: 'Animated'}
		]}
	],
	bindings: [
		{from: '$.animateSetting.checked', to: '$.autoDownload.animated'},
		{from: '$.animateSetting.checked', to: '$.progressButton.animated'}
	],
	destroy: kind.inherit(function (sup) {
		return function () {
			this.resetTimer();
			sup.apply(this, arguments);
		};
	}),
	changeValue: function (sender, ev) {
		if (this.$.animateSetting.getChecked()) {
			this.$.progressButton.animateProgressTo(this.$.input.getValue());
		} else {
			this.$.progressButton.setProgress(this.$.input.getValue());
		}
	},
	incValue: function () {
		this.$.input.setValue(Math.min(parseInt(this.$.input.getValue() || 0, 10) + 10, 100));
		this.changeValue();
	},
	decValue: function () {
		this.$.input.setValue(Math.max(parseInt(this.$.input.getValue() || 0, 10) - 10, 0));
		this.changeValue();
	},
	resetTimer: function () {
		if (this._timerId) {
			clearInterval(this._timerId);
			this._timerId = null;
		}
	},
	startDownloading: function () {
		var _this = this;
		if (_this.contentChange === false) {
			_this.downloadProgress = 0;
			_this.contentChange = true;
			this._timerId = setInterval(function () {
				++_this.downloadProgress;
				_this.$.autoDownload.animateProgressTo(_this.downloadProgress);
				if (_this.downloadProgress >= 100) {
					_this.resetTimer();
				}
			}, 100);
		}
	}
});

module.exports.badgeClasses = 'new';
