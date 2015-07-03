require('moonstone');

var
	kind = require('enyo/kind'),
	Model = require('enyo/Model');

var
	Drawers = require('moonstone/Drawers'),
	Button = require('moonstone/Button'),
	IconButton = require('moonstone/IconButton'),
	Scroller = require('moonstone/Scroller');

var
	AudioPlayback = require('moonstone-extra/AudioPlayback');

module.exports = kind({
	name: 'moon.sample.AudioPlaybackSample',
	classes: 'enyo-unselectable moon sample-audio-playback enyo-fit',
	data: [
		{src: 'http://enyojs.com/_media/thunder.mp3', trackName: 'Thunder', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', albumArt: 'assets/storm-100.png', duration: '0:22'},
		{src: 'http://enyojs.com/_media/engine.mp3', trackName: 'Engine', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', albumArt: 'assets/engine-100.png', duration: '0:04'}
	],
	components: [
		{kind: Drawers, drawers:[
			{
				kind: AudioPlayback,
				name: 'audioPlayback',
				components: [
					{content: 'Playlist'}
				],
				moreComponents: [
					{kind: IconButton, icon: 'circle', small: false, ontap: 'setAudio1'},
					{kind: IconButton, icon: 'stop', small: false, ontap: 'setAudio2'},
					{kind: IconButton, icon: 'trash', small: false, ontap: 'unload'}
				],
				playbackRateHash: {
					fastForward: ['2', '4'],
					rewind: ['-2', '-4'],
					slowForward: ['1/4', '1/2', '1'],
					slowRewind: ['-1/2', '-1']
				}
			}
		],
		components: [
			// Fixme: If we are not using wrapper like scroller inside of drawer,
			// drawer will not close itself when click blank area under the drawer.
			{kind: Scroller, classes: 'enyo-fit', components: [
				{tag: 'br'},{tag: 'br'},
				{kind: Button, content: 'set audio #1', ontap: 'setAudio1'},
				{kind: Button, content: 'set audio #2', ontap: 'setAudio2'},
				{kind: Button, content: 'unload audio', ontap: 'unload'}
			]}
		]}
	],
	create: function () {
		this.inherited(arguments);
		this.model1 = new Model(this.data[0]);
		this.model2 = new Model(this.data[1]);
	},
	setAudio1: function () {
		this.$.audioPlayback.set('model', this.model1);
	},
	setAudio2: function () {
		this.$.audioPlayback.set('model', this.model2);
	},
	unload: function () {
		this.$.audioPlayback.set('model', null);
	}
});
