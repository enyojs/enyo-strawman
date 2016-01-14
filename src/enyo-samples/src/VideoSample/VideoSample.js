var
	kind = require('enyo/kind');

var
	Anchor = require('enyo/Anchor'),
	Button = require('enyo/Button'),
	Video = require('enyo/Video');

module.exports = kind({
	name: 'enyo.sample.VideoSample',
	classes: 'video-sample',
	components: [
		{content: 'Video', classes: 'section'},
		{classes: 'container-video', components: [
			{
				kind: Video,
				poster: 'http://media.w3.org/2010/05/bunny/poster.png',
				preload: 'auto',
				src: 'http://vjs.zencdn.net/v/oceans.mp4',
				onratechange: 'rateChanged',
				ontimeupdate: 'timeChanged',
				ondurationchange: 'durationChanged',
				onFastforward: 'playbackChanged',
				onRewind: 'playbackChanged',
				onPlay: 'playbackChanged',
				ontap: 'togglePlayback'
			},
			{kind: Anchor, name: 'playOverlay', ontap: 'playVideo'}
		]},
		{kind: Button, content: 'Play', ontap: 'playVideo'},
		{kind: Button, content: 'Pause', ontap: 'pauseVideo'},
		{kind: Button, content: '<< RW', ontap: 'buttonRewindTapped'},
		{kind: Button, content: 'FF >>', ontap: 'buttonFastForwardTapped'},
		{kind: Button, content: '< Jump', ontap: 'buttonJumpBackwardTapped'},
		{kind: Button, content: 'Jump >', ontap: 'buttonJumpForwardTapped'},
		{kind: Button, content: 'Loop', ontap: 'buttonToggleLoopTapped'},
		{kind: Button, content: 'Use src', ontap: 'buttonUseSrcTapped'},
		{kind: Button, content: 'Use sourceComponents', ontap: 'buttonUseSourceComponentsTapped'},
		{name: 'results', classes: 'results', components: [
			{classes: 'result-section', components: [
				{classes: 'result-label', content: 'Position:'},
				{name: 'videoPosition'}
			]},
			{classes: 'result-section', components: [
				{classes: 'result-label', content: 'Duration:'},
				{name: 'videoDuration'}
			]},
			{classes: 'result-section', components: [
				{classes: 'result-label', content: 'Action:'},
				{name: 'videoAction'}
			]}
		]}
	],
	bindings: [
		{from: '.isPlaying', to: '.$.playOverlay.showing', transform: function(value) {
			return !value;
		}}
	],
	playbackChanged: function (sender, ev) {
		if (ev.playbackRate > 1) {
			this.$.videoAction.setContent('Fast-Forward');
		} else if (ev.playbackRate < -1) {
			this.$.videoAction.setContent('Rewind');
		} else if (ev.playbackRate == 1) {
			this.$.videoAction.setContent('Play');
		}
		return true;
	},
	togglePlayback: function (sender, ev) {
		if (this.get('isPlaying')) {
			this.pauseVideo(arguments);
		} else {
			this.playVideo(arguments);
		}
		return true;
	},
	playVideo: function (sender, ev) {
		this.set('isPlaying', true);
		this.$.video.play();
		this.$.videoAction.setContent('Play');
		return true;
	},
	pauseVideo: function (sender, ev) {
		this.set('isPlaying', false);
		this.$.video.pause();
		this.$.videoAction.setContent('Pause');
		return true;
	},
	buttonRewindTapped: function(sender, ev) {
		this.set("isPlaying", true);
		this.$.video.rewind();
		return true;
	},
	buttonFastForwardTapped: function(sender, ev) {
		this.set('isPlaying', true);
		this.$.video.fastForward();
		return true;
	},
	buttonJumpBackwardTapped: function (sender, ev) {
		this.$.video.jumpBackward();
		this.$.videoAction.setContent('Jump Backward ' + this.$.video.getJumpSec() + 's');
		return true;
	},
	buttonJumpForwardTapped: function (sender, ev) {
		this.$.video.jumpForward();
		this.$.videoAction.setContent('Jump Forward ' + this.$.video.getJumpSec() + 's');
		return true;
	},
	buttonToggleLoopTapped: function (sender, ev) {
		this.$.video.setLoop(!this.$.video.getLoop());
		this.$.videoAction.setContent('Looping ' + (this.$.video.getLoop() ? 'Enabled' : 'Disabled'));
		return true;
	},
	buttonUseSrcTapped: function (sender, ev) {
		this.pauseVideo();
		this.$.video.set('src', 'http://media.w3.org/2010/05/bunny/movie.mp4');
	},
	buttonUseSourceComponentsTapped: function (sender, ev) {
		this.pauseVideo();
		this.$.video.set('sourceComponents', [
		 	{src: 'http://media.w3.org/2010/05/bunny/movie.mp4', type: 'video/mp4'},
			{src: 'http://media.w3.org/2010/05/bunny/movie.ogv', type: 'video/ogg'},
			{src: 'http://media.w3.org/2010/05/bunny/movie.webm', type: 'video/webm'}
		]);
	},
	rateChanged: function (sender, ev) {
		this.$.videoAction.setContent('Playback ' + ev.playbackRate + 'x');
		return true;
	},
	timeChanged: function (sender, ev) {
		this.$.videoPosition.setContent(Math.floor(ev.currentTime) + 's');
		return true;
	},
	durationChanged: function (sender, ev) {
		this.$.videoDuration.setContent((ev.target && ev.target.duration ? Math.floor(ev.target.duration) : 0) + 's');
		return true;
	}
});
