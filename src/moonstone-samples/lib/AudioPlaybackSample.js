require('moonstone');
var
	kind = require('enyo/kind'),
	Img = require('enyo/Image'),
	Drawers = require('moonstone/Drawers'),
	AudioPlayback = require('moonstone/AudioPlayback'),
	Header = require('moonstone/Header'),
	DataList = require('moonstone/DataList'),
	Item = require('moonstone/Item'),
	Panel = require('moonstone/Panel'),
	Panels = require('moonstone/Panels'),
	IconButton = require('moonstone/IconButton'),
	Collection = require('enyo/Collection'),
	DataList = require('moonstone/DataList');

var
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows');


var queueItem = kind({
	kind: Item,
	classes: 'sample-audio-item', 
	events: {
		onRemoveQueue: ''
	},
	components: [
		{name: 'albumArt', kind: Img, classes: 'sample-audio-queue-album-art', src: 'assets/default-music-sm.png'},
		{classes: 'sample-audio-queue-label', components: [
			{classes: 'sample-audio-queue-trackname', name: 'trackName'},
			{classes: 'sample-audio-queue-artistname', name: 'artistName'}
		]}
	],
	bindings: [
		{from: 'model.albumArt', to: '$.albumArt.src'},
		{from: 'model.trackName', to: '$.trackName.content'},
		{from: 'model.artistName', to: '$.artistName.content'}
	],
	ontap: function (sender, event) {
		this.doRemoveQueue({model: model});
		return true;
	}
});

/**
* @ui
* @class moon.AudioQueue
* @extends layout.FittableRows
* @protected
*/
var audioQueue = kind(
	/** @lends moon.AudioQueue.prototype */ {

	/**
	* @private
	*/
	name: 'moon.AudioQueue',

	/**
	* @private
	*/
	kind: FittableRows,

	/**
	* @private
	*/
	classes: 'enyo-fit sample-audio-playback-queue',

	handlers: {
		onAddAudio: 'addAudio',
		onEmptyAudio: 'emptyAudio'
	},

	/**
	* @private
	*/
	components: [
		{kind: Header, name: 'queueHeader', type: 'medium', title: 'Current Playing List', titleBelow: '2 Tracks'},
		{kind: FittableColumns, fit: true, components: [
			{
				name: 'datalist',
				kind: DataList,
				fit: true,
				classes: 'sample-audio-playback-queue-list',
				components: [
					{ kind: queueItem, ontap: 'playIndex' }
				]
			},
			{
				classes: 'sample-audio-playback-queue-detail',
				components: [
					{ content: 'Lylics' },
					{ tag: 'br' },
					{ content: 'The Time Has Come One Way What The World Will Never Take Til I See You Take All Of Me The Stand You ll Come Break Free Look To You Where The Love Lasts Forever Forever There Is Nothing Like Tell The World All Day Take It All My Future Decided All I Need Is You Mighty To Save Nothing But The Blood' } 
				]
			}
		]}
	],
	bindings: [
		{from: 'collection', to: '$.datalist.collection'}
	],
	/**
	* @private
	*/
	create: function () {
		this.inherited(arguments);
		this.parent.applyStyle('height', '100%');
		this.collection = new Collection();
	},
	playIndex: function (sender, event) {
		this.bubble('onPlayIndex', {index: sender.index, model: sender.model, openPlayback: true});
	},
	addAudio: function (semder, event) {
		this.collection.add(event.track);
	},
	emptyAudio: function (sender, event) {
		this.collection.empty();
	}
});

var browserItem = kind({
	kind: Item,
	classes: 'sample-audio-item', 
	components: [
		{classes: 'sample-audio-item-image', style: 'background-image: url(assets/default-music.png);', components: [
			{name: 'albumArt', kind: Img, classes: 'sample-audio-item-album-art', src: 'assets/default-music-sm.png'},
		]},
		{style: 'display: table-cell; width: 20px;'},
		{classes: 'sample-audio-item-label', components: [{classes: 'sample-audio-item-label-content', name: 'trackName'}]},
		{classes: 'sample-audio-item-label', components: [{classes: 'sample-audio-item-label-content', name: 'artistName'}]},
		{classes: 'sample-audio-item-label', components: [{classes: 'sample-audio-item-label-content', name: 'albumName'}]},
		{classes: 'sample-audio-item-label-right', name: 'duration'}
	],
	bindings: [
		{from: 'model.trackName', to: '$.trackName.content'},
		{from: 'model.artistName', to: '$.artistName.content'},
		{from: 'model.albumName', to: '$.albumName.content'},
		{from: 'model.albumArt', to: '$.albumArt.src'},
		{from: 'model.duration', to: '$.duration.content'}
	]
});

var basePanel = kind({
	kind: Panel,
	components: [
		{
			name: 'datalist',
			kind: DataList,
			components: [
				{ kind: browserItem, ontap: 'playIndex' }
			]
		}
	],
	bindings: [
		{from: 'collection', to: '$.datalist.collection'}
	],
	create: function () {
		this.inherited(arguments);
		this.collection = this.collection || new Collection(this.audioFiles);
	},
	playIndex: function (sender, event) {
		/** This is demonstrate how to add all the audio file from the folder into play queue when play an audio */
		this.bubble('onRequestEmptyQueue');
		this.bubble('onRequestSetupQueue', {collection: this.collection});
		this.bubble('onPlayIndex', {index: sender.index, model: sender.model, openPlayback: true});
	}
});

var mainPanel = kind({
	kind: basePanel,
	title: 'App Name',
	titleAbove: 'Music',
	titleBelow: '2 Tracks',
	/** Each panel fetch different audio list from service */
	audioFiles: [
		{src: 'http://enyojs.com/_media/thunder.mp3', trackName: 'Thunder', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', albumArt: 'http://www.smashingmagazine.com/images/music-cd-covers/43.jpg', duration: '0:22'},
		{src: 'http://enyojs.com/_media/engine.mp3', trackName: 'Engine', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', albumArt: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7QW3lmkKJFoW7xQ8JmqbdfZP7fvwd1ZYs82RbS22xy2asFFvm', duration: '0:04'}
	]
});

var secondPanel = kind({
	kind: basePanel,
	title: 'App Name',
	titleAbove: 'Music',
	titleBelow: '4 Tracks',
	/** Each panel fetch different audio list from service */
	audioFiles: [
		{src: 'http://www.stephaniequinn.com/Music/Allegro%20from%20Duet%20in%20C%20Major.mp3', trackName: 'Allegro', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', duration: '0:04'},
		{src: 'http://www.stephaniequinn.com/Music/Canon.mp3', trackName: 'Canon', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', duration: '0:04'},
		{src: 'http://www.stephaniequinn.com/Music/Handel%20-%20Entrance%20of%20the%20Queen%20of%20Sheba.mp3', trackName: 'Handel', artistName: 'Sound Effects Artist', albumName: 'Sound Effects', duration: '0:04'},
		{src: 'http://www.stephaniequinn.com/Music/Jazz%20Rag%20Ensemble%20-%2010.mp3', trackName: 'Engine', artistName: 'Jazz', albumName: 'Sound Effects', duration: '0:04'}
	]
});

var musicBrowser = kind({
	name: 'moon.sample.audioPlayback.pageContent',
	kind: Panels,
	classes: 'enyo-fit',
	components: [
		{kind: mainPanel},
		{kind: secondPanel}
	]
});


/** This is for demonstrate how to hook default drawer open button behavior on app side. */
var myAudioPlayback = kind({
	kind: AudioPlayback,
	name: 'audioPlayback',
	published: {
		autoShowAudioDetail: false
	},
	moreComponents: [
		{name: 'repeatButton', publish: true, kind: IconButton, small: false, classes: 'moon-audio-icon-button right', src: 'assets/icon-album.png', ontap: 'toggleRepeat'},
		{name: 'shuffleButton', publish: true, kind: IconButton, small: false, classes: 'moon-audio-icon-button right', src: 'assets/icon-album.png', ontap: 'toggleShuffle'},
		{name: 'openQueueButton', publish: true, kind: IconButton, small: false, classes: 'moon-audio-icon-button right', src: 'assets/icon-album.png', ontap: 'toggleFullDrawer'}
	],
	/** Monitor drawer client open status */
	observers: [
		{method: 'openChanged', path: ['queueOpen']}
	],
	/** We hook default behavior of openQueueButton */
	toggleFullDrawer: function () {
		if (this.get('queueOpen')) {
			/** This is demonstrate how to block default behavior of toggle button */
			this.set('autoShowAudioDetail', true);
		} else {
			this.inherited(arguments);
		}
	},
	/** We can change more button behavior based on queue open status */
	openChanged: function (old, value) {
		this.$.openQueueButton.set('src', value ? 'assets/icon-list.png' : 'assets/icon-album.png');
	}
});

module.exports = kind({
	name: 'moon.sample.AudioPlaybackSample',
	classes: 'enyo-unselectable moon sample-audio-playback',
	handlers: {
		onPlayIndex: 'playIndex',
		onRequestSetupQueue: 'setupQueue',
		onRequestEmptyQueue: 'emptyQueue'
	},
	components: [
		{kind: Drawers, drawers:[
			{
				kind: myAudioPlayback,
				name: 'audioPlayback',
				components: [
					{name: 'audioQueue', kind: audioQueue}
				]
			}
		],
		components: [
			{kind: musicBrowser}
		]}
	],
	setupQueue: function (sender, event) {
		var collection = event.collection,
			length = collection.length,
			c, i;
		for (i=0; i<length; i++) {
			c = collection.at(i);
			this.$.audioPlayback.addAudioTrack(c.get('src'), c.get('trackName'), c.get('artistName'), c.get('albumName'), c.get('albumArt'), c.get('duration'));
		}
	},
	emptyQueue: function (sender, event) {
		this.$.audioPlayback.emptyAudioTracks();
	},
	playIndex: function (sender, event) {
		/** This is for demonstrate how to open drawer with play audio */
		this.$.audioPlayback.playAtIndex(event.index);

		if (event.openPlayback && !this.$.drawers.drawerOpen()) {
			this.$.drawers.openDrawer(this.$.drawers.handleAtIndex(0));
		}
	}
});