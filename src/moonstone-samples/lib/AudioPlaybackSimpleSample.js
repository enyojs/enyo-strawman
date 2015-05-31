require('moonstone');

var
	kind = require('enyo/kind'),
	Drawers = require('moonstone/Drawers'),
	AudioPlayback = require('moonstone/AudioPlayback'),
	Playlist = require('moonstone/PlaylistSupport'),
	Model = require('enyo/Model'),
	Collection = require('enyo/Collection'),
	Button = require('moonstone/Button'),
	IconButton = require('moonstone/IconButton');

module.exports = kind({
	name: 'moon.sample.AudioPlaybackSimpleSample',
	classes: 'enyo-unselectable moon sample-audio-playback',
	data: [
		{src: 'http://enyojs.com/_media/thunder.mp3', trackName: 'Thunder', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', albumArt: 'assets/storm-100.png', duration: '0:22'},
		{src: 'http://enyojs.com/_media/engine.mp3', trackName: 'Engine', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', albumArt: 'assets/engine-100.png', duration: '0:04'}
	],
	components: [
		{kind: Drawers, drawers:[
			{
				kind: AudioPlayback,
				name: 'audioPlayback',
				mixins: [ Playlist.Support ],
				showJumpControls: false,
				autoPlayOnShuffle: true,
				components: [
					{content: 'Playlist'}
				],
				moreComponents: [
					{name: 'btnShuffle', kind: IconButton, icon: 'stop', small: false, ontap: 'toggleShuffle'},
					{name: 'btnRepeat', kind: Button, ontap: 'toggleRepeat'},
					{name: 'btnOpen', kind: IconButton, icon: 'list', small: false, ontap: 'toggleOpen'}
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
			{tag: 'br'},
			{kind: Button, content: 'set audio #1', ontap: 'setAudio1'},
			{kind: Button, content: 'set audio #2', ontap: 'setAudio2'},
			{kind: Button, content: 'set audio list', ontap: 'setAudioList'},
			{kind: Button, content: 'unload audio', ontap: 'unload'}
		]}
	],
	bindings: [
		{from: '$.audioPlayback.repeat', to: '$.btnRepeat.content'}
	],
	create: function () {
		this.inherited(arguments);
		this.model1 = new Model(this.data[0]);
		this.model2 = new Model(this.data[1]);
		this.collection = new Collection();
		this.collection.add(this.model1);
		this.collection.add(this.model2);
	},
	setAudio1: function() {
		this.$.audioPlayback.set('model', this.model1);
	},
	setAudio2: function() {
		this.$.audioPlayback.set('model', this.model2);
	},
	setAudioList: function() {
		this.$.audioPlayback.set('collection', this.collection);
	},
	unload: function() {
		this.$.audioPlayback.set('model', null);
	},
	toggleShuffle: function() {
		this.$.audioPlayback.toggleShuffle();
		this.$.btnShuffle.set('icon', this.$.audioPlayback.shuffle ? 'circle' : 'stop');
	},
	toggleRepeat: function() {
		this.$.audioPlayback.toggleRepeat();
	},
	toggleOpen: function() {
		this.$.audioPlayback.set('clientOpen', !this.$.audioPlayback.get('clientOpen'));
	}
});