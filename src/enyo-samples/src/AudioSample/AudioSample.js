var
	kind = require('enyo/kind'),
	job = require('enyo/job'),
	utils = require('enyo/utils');

var
	EnyoAudio = require('enyo/Audio'),
	Button = require('enyo/Button'),
	Popup = require('enyo/Popup'),
	Select = require('enyo/Select');


module.exports = kind({
	name: 'enyo.sample.AudioSample',
	classes: 'audio-sample',
	components: [
		{
			kind: EnyoAudio,
			onratechange: 'rateChanged',
			ontimeupdate: 'timeChanged',
			onFastforward: 'playbackChanged',
			onRewind: 'playbackChanged',
			onPlay: 'playbackChanged',
			onPause: 'playbackChanged',
			onLoadedMetaData: 'metaDataLoaded'
		},
		{content: 'Audio', classes: 'section'},
		{kind: Select, name: 'selectAudio', onchange: 'selectChanged', components: [
			{content: 'Andre Agassi - Farewell To Tennis', active: true},
			{content: 'Fight Club Rules'},
			{content: 'Hail to the Chief'},
			{content: 'Winston Churchill: Blood, Toil, Tears, and Sweat'}
		]},
		{content: 'Playback', classes: 'section'},
		{kind: Button, content: 'Play', ontap: 'togglePlay'},
		{kind: Button, content: '<< Rewind', ontap: 'buttonRewindTapped'},
		{kind: Button, content: 'Fast Forward >>', ontap: 'buttonFastForwardTapped'},
		{kind: Button, content: '< Jump Backward', ontap: 'buttonJumpBackwardTapped'},
		{kind: Button, content: 'Jump Forward >', ontap: 'buttonJumpForwardTapped'},
		{kind: Button, content: 'Loop', ontap: 'buttonLoopTapped'},
		{name: 'results', classes: 'results'},
		{kind: Popup, name: 'popupStatus', floating: true, centered: true, classes: 'popup'}
	],
	sounds: [
		'http://www.noiseaddicts.com/samples_1w72b820/3828.mp3',
		'http://www.noiseaddicts.com/samples_1w72b820/2514.mp3',
		'http://www.noiseaddicts.com/samples_1w72b820/4353.mp3',
		'http://www.noiseaddicts.com/samples_1w72b820/134.mp3'
	],
	rendered: function () {
		this.inherited(arguments);
		this.loadAudio(this.$.selectAudio.getSelected());
	},
	metaDataLoaded: function (sender, ev) {
		this.timeChanged(sender, utils.mixin(ev, {duration: this.$.audio.getDuration(), currentTime: this.$.audio.getCurrentTime()}));
	},
	playbackChanged: function (sender, ev) {
		if (ev.type === 'onPause') {
			this.displayPopup('Pause');
		} else if (ev.originator.playbackRate > 1) {
			this.displayPopup('Fast-Forward');
		} else if (ev.originator.playbackRate < -1) {
			this.displayPopup('Rewind');
		} else if (ev.originator.playbackRate == 1) {
			this.displayPopup('Play');
		}
	},
	loadAudio: function (index) {
		this.$.audio.setSrc(this.sounds[index]);
		this.$.button.setContent('Play');
	},
	playAudio: function () {
		this.$.audio.play();
		this.$.button.setContent('Pause');
	},
	pauseAudio: function () {
		this.$.audio.pause();
		this.$.button.setContent('Play');
	},
	togglePlay: function (sender, res) {
		if (this.$.audio.getPaused()) {
			this.playAudio();
		} else {
			this.pauseAudio();
		}
	},
	buttonRewindTapped: function (sender, ev) {
		this.$.audio.rewind();
	},
	buttonFastForwardTapped: function (sender, ev) {
		this.$.audio.fastForward();
	},
	buttonJumpBackwardTapped: function (sender, ev) {
		this.$.audio.jumpBackward();
		this.displayPopup('Jump Backward ' + this.$.audio.getJumpSec() + 's');
	},
	buttonJumpForwardTapped: function (sender, ev) {
		this.$.audio.jumpForward();
		this.displayPopup('Jump Forward ' + this.$.audio.getJumpSec() + 's');
	},
	buttonLoopTapped: function (sender, ev) {
		this.$.audio.setLoop(!this.$.audio.getLoop());
		this.displayPopup('Looping ' + (this.$.audio.getLoop() ? 'Enabled' : 'Disabled'));
	},
	rateChanged: function (sender, ev) {
		this.displayPopup('Playback ' + ev.playbackRate + 'x');
	},
	timeChanged: function (sender, ev) {
		this.$.results.setContent('Duration: ' + Math.floor(ev.duration) + 's, Current Position: ' + Math.floor(ev.currentTime) + 's');
	},
	selectChanged: function (sender, ev) {
		this.loadAudio(sender.selected);
	},
	displayPopup: function (content) {
		var popup = this.$.popupStatus;
		popup.setContent(content);
		popup.setShowing(true);
		job('autoHidePopup', function() {
			popup.hide();
		}, 1000);
	}
});