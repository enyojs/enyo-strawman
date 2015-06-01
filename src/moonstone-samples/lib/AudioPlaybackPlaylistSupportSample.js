require('moonstone');

var
	kind = require('enyo/kind'),
	Collection = require('enyo/Collection');

var
	Drawers = require('moonstone/Drawers'),
	AudioPlayback = require('moonstone/AudioPlayback'),
	Playlist = require('moonstone/PlaylistSupport'),
	Panel = require('moonstone/Panel'),
	Button = require('moonstone/Button'),
	IconButton = require('moonstone/IconButton'),
	ImageItem = require('moonstone/ImageItem'),
	DataList = require('moonstone/DataList'),
	Scroller = require('moonstone/Scroller');

var audioQueue = kind({
	name: 'sample.AudioQueue',
	kind: Panel,
	headerType: 'medium',
	title: 'Current Playing List',
	titleBelow: '2 Tracks',
	classes: 'sample-audio-playback-queue enyo-fit',
	components: [
		{
			fit: true,
			classes: 'sample-audio-playback-queue-body',
			components: [
				{
					kind: Scroller,
					horizontal: 'hidden',
					spotlightPagingControls: true,
					classes: 'sample-audio-playback-queue-detail',
					components: [
						{
							classes: 'sample-audio-playback-queue-detail-content',
							components: [
								{ content: 'Lylics' },
								{ tag: 'br' },
								{ content: 'The Time Has Come One Way What The World Will Never Take Til I See You Take All Of Me The Stand You ll Come Break Free Look To You Where The Love Lasts Forever Forever There Is Nothing Like Tell The World All Day Take It All My Future Decided All I Need Is You Mighty To Save Nothing But The Blood' } 
							]
						}
					]
				},
				{
					classes: 'sample-audio-playback-queue-list',
					components: [
						{
							name: 'datalist',
							kind: DataList,
							scrollerOptions: { kind: Scroller, horizontal: 'hidden', spotlightPagingControls: true},
							components: [
								{kind: ImageItem, ontap: 'play', bindings: [
									{from: 'model.albumArt', to: 'source'},
									{from: 'model.trackName', to: 'label'},
									{from: 'model.artistName', to: 'text'},
									{from: 'model.playing', to: 'playing'}
								], observers: [
									{method: 'playingHandler', path: ['playing']}
								],
								playingHandler: function (sender, event) {
									this.addRemoveClass('playing', this.get('playing'));
								}}
							]
						}
					]
				}
			]
		}
	],
	bindings: [
		{from: 'collection', to: '$.datalist.collection'}
	],
	play: function (sender, event) {
		this.bubble('onPlayAudio', {model: sender.model, openPlayback: true});
	}
});

module.exports = kind({
	name: 'moon.sample.AudioPlaybackPlaylistSupportSample',
	classes: 'enyo-unselectable moon sample-audio-playback enyo-fit',
	data: [
		{src: 'http://enyojs.com/_media/thunder.mp3', trackName: 'Thunder', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', albumArt: 'assets/storm-100.png', duration: '0:22'},
		{src: 'http://enyojs.com/_media/engine.mp3', trackName: 'Engine', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', albumArt: 'assets/engine-100.png', duration: '0:04'},
		{src: 'http://enyojs.com/_media/thunder.mp3', trackName: 'Thunder', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', albumArt: 'assets/storm-100.png', duration: '0:22'},
		{src: 'http://enyojs.com/_media/engine.mp3', trackName: 'Engine', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', albumArt: 'assets/engine-100.png', duration: '0:04'},
		{src: 'http://enyojs.com/_media/thunder.mp3', trackName: 'Thunder', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', albumArt: 'assets/storm-100.png', duration: '0:22'},
		{src: 'http://enyojs.com/_media/engine.mp3', trackName: 'Engine', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', albumArt: 'assets/engine-100.png', duration: '0:04'},
		{src: 'http://enyojs.com/_media/thunder.mp3', trackName: 'Thunder', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', albumArt: 'assets/storm-100.png', duration: '0:22'},
		{src: 'http://enyojs.com/_media/engine.mp3', trackName: 'Engine', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', albumArt: 'assets/engine-100.png', duration: '0:04'}
	],
	handlers: {
		onPlayAudio: 'playAudio'
	},
	components: [
		{kind: Drawers, drawers:[
			{
				kind: AudioPlayback,
				name: 'audioPlayback',
				mixins: [ Playlist.Support ],
				autoPlayOnShuffle: true,
				components: [
					{name: 'queue', kind: audioQueue}
				],
				moreComponents: [
					{name: 'btnShuffle', kind: Button, ontap: 'toggleShuffle'},
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
			// Fixme: If we are not using wrapper like scroller inside of drawer,
			// drawer will not close itself when click blank area under the drawer.
			{kind: Scroller, components: [
				{tag: 'br'},{tag: 'br'},
				{kind: Button, content: 'set audio #1', ontap: 'setAudio1'},
				{kind: Button, content: 'set audio #2', ontap: 'setAudio2'},
				{kind: Button, content: 'set audio list', ontap: 'setAudioList'},
				{kind: Button, content: 'unload audio', ontap: 'unload'}
			]}
		]}
	],
	bindings: [
		{from: '$.audioPlayback.collection', to: '$.queue.collection'},
		{from: '$.audioPlayback.repeat', to: '$.btnRepeat.content'},
		{from: '$.audioPlayback.shuffle', to: '$.btnShuffle.content', transform: 'shuffleTransform'}
	],
	create: function () {
		this.inherited(arguments);
		this.collection = new Collection(this.data);
		this.model1 = this.collection.at(0);
		this.model2 = this.collection.at(1);
	},
	playAudio: function (sender, event) {
		this.$.audioPlayback.set('model', event.model);
	},
	setAudio1: function () {
		this.$.audioPlayback.set('model', this.model1);
	},
	setAudio2: function () {
		this.$.audioPlayback.set('model', this.model2);
	},
	setAudioList: function () {
		this.$.audioPlayback.set('collection', this.collection);
	},
	unload: function () {
		this.$.audioPlayback.set('model', null);
	},
	toggleShuffle: function () {
		this.$.audioPlayback.toggleShuffle();
	},
	toggleRepeat: function () {
		this.$.audioPlayback.toggleRepeat();
	},
	toggleOpen: function () {
		this.$.audioPlayback.set('open', !this.$.audioPlayback.get('open'));
	},
	shuffleTransform: function (shuffle) {
		return shuffle ? 'shuffle' : 'normal';
	}
});