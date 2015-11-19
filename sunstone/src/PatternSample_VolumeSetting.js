var
	kind = require('enyo/kind'),
	Image = require('enyo/Image');

var
	FittableColumns = require('layout/FittableColumns');

var
	Button = require('sunstone/Button'),
	Header = require('sunstone/Header'),
	ToastPopup = require('sunstone/ToastPopup'),
	IconButton = require('sunstone/IconButton'),
	Popup = require('sunstone/Popup'),
	Icon = require('sunstone/Icon'),
	Slider = require('sunstone/Slider'),
	Spinner = require('sunstone/Spinner'),
	ProgressBar = require('sunstone/ProgressBar');

module.exports = kind({
	name: 'sun.sample.VolumeSettingSample',
	classes: 'volumnsetting-sample enyo-unselectable',
	interval: null,
	spinner: 0,
	components: [
		{kind: Header, title: 'Setting', showBackButton: true, onBackButtonTapped: 'buttonTapped'},
		{classes: 'general-index', content: 'VOLUME'},
		{classes: 'volume-table', ontap: 'showPopup', popup: 'volumePopup', components: [
			{classes:'volume-table-cell', components: [
				{kind: IconButton, classes: 'iconButtonSample_custom', src: '@../assets/btn_actionitem_icon_volume.svg'}
			]},
			{classes:'volume-table-cell', components: [
				{content: 'set volume'}
			]}
		]},
		{classes: 'general-index', content: 'DETETE ITEM'},
		{classes: 'volume-table', ontap: 'showPopup', popup: 'delete1Popup', components: [
			{classes: 'volume-table-cell', components: [
				{kind: IconButton, classes: 'iconButtonSample_custom', src: '@../assets/btn_actionitem_icon_delete.svg'}
			]},
			{classes:'volume-table-cell', components: [
				{content: 'delete item 1'}
			]}
		]},
		{classes: 'divider'},
		{classes: 'volume-table', ontap: 'showPopup', popup: 'delete2Popup', components: [
			{classes: 'volume-table-cell', components: [
				{kind: IconButton, classes: 'iconButtonSample_custom', src: '@../assets/btn_actionitem_icon_delete.svg'}
			]},
			{classes: 'volume-table-cell', components: [
				{content: 'delete item 2'}
			]}
		]},
		{name: 'volumePopup', kind: Popup, classes: 'sun-sample-popup enyo-unselectable', centered: true, components: [
			{classes: 'dialog_title', content: 'Volumes'},
			{content: 'Rington', classes: 'text-style'},
			{kind: FittableColumns, style: 'padding: 0 24px; height: 40px', components: [
				{style: 'width: 40px; height: 40px;', components: [
					{kind: Icon, classes: 'iconButtonSample_custom', src: '@../assets/btn_actionitem_icon_volume.svg'}
				]},
				{fit: true, style: 'padding: 0 16px 0 4px;', components: [
					{name: 'Rington', kind: Slider, value: 80, onChanging: 'sliderChanging', onChange: 'sliderChanged'}
				]}
			]},
			{content: 'Notification', classes: 'text-style'},
			{kind: FittableColumns, style: 'padding: 0 24px; height: 40px', components: [
				{style: 'width: 40px; height: 40px;', components: [
					{kind: Icon, classes: 'iconButtonSample_custom', src: '@../assets/btn_actionitem_icon_calendar.svg'}
				]},
				{fit: true, style: 'padding: 0 16px 0 4px;', components: [
					{name: 'Notification', kind: Slider, value: 20, onChanging: 'sliderChanging', onChange: 'sliderChanged'}
				]}
			]},
			{content: 'Touch feedback & System', classes: 'text-style'},
			{kind: FittableColumns, style: 'padding: 0 24px; height: 40px', components: [
				{style: 'width: 40px; height: 40px;', components: [
					{kind: Icon, classes: 'iconButtonSample_custom', src: '@../assets/btn_actionitem_icon_edit.svg'}
				]},
				{fit: true, style: 'padding: 0 16px 0 4px;', components: [
					{name: 'Touch', kind: Slider, value: 50, onChanging: 'sliderChanging', onChange: 'sliderChanged'}
				]}
			]},
			{content: 'Music, Video, Games & other Media', classes: 'text-style'},
			{kind: FittableColumns, style: 'padding: 0 24px; height: 40px', components: [
				{style: 'width: 40px; height: 40px;', components: [
					{kind: Icon, classes: 'iconButtonSample_custom', src: '@../assets/btn_actionitem_icon_more.svg'}
				]},
				{fit: true, style: 'padding: 0 16px 0 4px;', components: [
					{name: 'Music', kind: Slider, value: 70, onChanging: 'sliderChanging', onChange: 'sliderChanged'}
				]}
			]},
			{classes: 'command_buttons_wrapper', components: [
				{classes: 'command_buttons', components: [
					{kind: Button, content: 'CANCEL', classes: 'bottom-okcancle-button', ontap: 'hidePopups'},
					{kind: Button, content: 'OK', classes: 'bottom-okcancle-button', ontap: 'hidePopups'}
				]}
			]}
		]},
		{name: 'delete1Popup', kind: Popup, classes: 'sun-sample-popup', centered: true, components: [
			{name: 'percentage-label', content: 'Deleting... ', style: 'font-size: 20px; display: inline-block; padding: 12px 24px 0 24px;'},
			{name: 'percentage', content: '(0%)', style: 'font-size: 14px; display: inline-block;'},
			{name: 'deleteProgress', kind: ProgressBar, progress: 0, style: 'margin: 20px 36px 16px 36px'},
			{classes: 'command_buttons_wrapper', components: [
				{classes: 'command_buttons', components: [
					{kind: Button, content: 'CANCEL', classes: 'bottom-okcancle-button', ontap: 'hidePopups'}
				]}
			]}
		]},
		{name: 'delete2Popup', kind: Popup, classes: 'sun-sample-popup', centered: true, components: [
			{classes: 'volume-table', components: [
				{classes: 'volume-table-cell', style: 'padding-bottom: 12px; padding-top: 12px; padding-left: 14px; padding-right: 8px', components: [
					{name: 'spinner', kind: Spinner}
				]},
				{classes:'volume-table-cell', components: [
					{name: 'spin1', content: 'Deleting... ', style: 'font-size: 20px; display: inline-block; line-height: 80px'},
					{name: 'spin2', content: '(0%)', style: 'font-size: 14px; display: inline-block; line-height: 80px; padding-left: 5px;'}
				]}
			]},
			{classes: 'command_buttons_wrapper', components: [
				{classes: 'command_buttons', components: [
					{kind: Button, content: 'CANCEL', classes: 'bottom-okcancle-button', ontap: 'hidePopups'}
				]}
			]}
		]},
		{name: 'toastpopup', kind: ToastPopup, showDuration: 2000, content: 'key pressed!'}
	],
	buttonTapped: function (inSender, inEvent) {
		this.$.toastpopup.show();
	},
	setProgressInterval: function () {
		var p = this.$.deleteProgress;
		if (p.getProgress() >= 100) {
			if (this.interval) {
				clearInterval(this.interval);
				this.interval = null;
				this.$.delete1Popup.hide();
			}
		} else {
			var num = p.getProgress() + 5;
			this.$.percentage.setContent('(' + num + '%)');
			p.setProgress(p.getProgress() + 5);
		}
	},
	setSpinnerInterval: function () {
		var s = this.$.spin2;
		if (this.spinner >= 100) {
			if (this.interval) {
				clearInterval(this.interval);
				this.interval = null;
				this.$.delete2Popup.hide();
			}
		} else {
			this.spinner = this.spinner + 5;
			s.setContent('(' + this.spinner + '%)');
		}
	},
	showPopup: function (inSender) {
		this.hidePopups();
		var p = this.$[inSender.popup];
		if (p) {
			p.show();
		}
		if (inSender.popup === 'delete1Popup') {
			this.interval = setInterval(this.bindSafely(function() {
				this.setProgressInterval();
			}), 100);
		} else if (inSender.popup === 'delete2Popup') {
			this.interval = setInterval(this.bindSafely(function() {
				this.setSpinnerInterval();
			}), 100);
		}
	},
	hidePopups: function() {
		if (this.interval) {
			clearInterval(this.interval);
			this.interval = null;
		}
		this.$.deleteProgress.setProgress(0);
		this.spinner = 0;
		this.$.volumePopup.hide();
		this.$.delete1Popup.hide();
		this.$.delete2Popup.hide();
	},
	sliderChanged: function (inSender, inEvent) {
		var toast = this.$.toastpopup;
		toast.hide();
		toast.setContent(inSender.name + ' changed to ' + Math.round(inSender.getValue()));
		toast.show();
	}
});