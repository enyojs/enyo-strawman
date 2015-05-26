require('moonstone');
var
	kind = require('enyo/kind'),
	Img = require('enyo/Image'),
	Drawers = require('moonstone/Drawers'),
	EnyoAudio = require('enyo/Audio'),
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

/**
* @class moon.AudioListItem
* @extends enyo.Control
* @ui
* @protected
*/
var AudioListItem = kind(
	/** @lends moon.AudioListItem.prototype */ {

	/**
	* @private
	*/
	name: 'moon.AudioListItem',

	/**
	* @private
	*/
	events: {

		/**
		* {@link moon.AudioListItem#event:onRemove}
		*/
		onRemove: ''
	},

	/**
	* @private
	*/
	components: [
		{name: 'albumArt', kind: Img, classes: 'moon-audio-queue-album-art', src: 'assets/default-music-sm.png'},
		{components: [
			{name: 'trackName'},
			{name: 'artistName'}
		]}
	],

	/**
	* @private
	*/
	setTrack: function (inAudio) {
		this.$.trackName.setContent(inAudio.trackName);
		this.$.artistName.setContent(inAudio.artistName + ' - ' + inAudio.albumName);
		this.$.albumArt.setSrc(inAudio.src);
	},

	/**
	* @private
	*/
	setSelected: function (inSelected) {
		this.addRemoveClass('moon-audio-queue-list-selected', inSelected);
	},

	/**
	* @fires moon.AudioListItem#onRemove
	* @private
	*/
	removeTap: function (inSender, inEvent) {
		this.doRemove(inEvent);
		return true;
	}
});

/**
* @ui
* @class moon.AudioPlaybackQueue
* @extends layout.FittableRows
* @protected
*/
var AudioPlaybackQueue = kind(
	/** @lends moon.AudioPlaybackQueue.prototype */ {

	/**
	* @private
	*/
	name: 'moon.AudioPlaybackQueue',

	/**
	* @private
	*/
	kind: FittableRows,

	/**
	* @private
	*/
	classes: 'enyo-fit moon-audio-playback-queue',

	/**
	* @private
	*/
	handlers: {
		onAddAudio: 'addAudio'
	},

	/**
	* @private
	*/
	components: [
		{kind: Header, name: 'queueHeader', title: 'Music Queue', titleBelow: '2 Tracks'},
		// {
		// 	kind: DataList,
		// 	name: 'list',
		// 	classes: 'enyo-unselectable',
		// 	fit: true,
		// 	multiSelect: false,
		// 	components: [
		// 		{name: 'item', kind: AudioListItem, classes: 'moon-audio-queue-list enyo-border-box', onRemove: 'removeTap'}
		// 	]
		// }
	],

	/**
	* @private
	*/
	tracks: [],

	/**
	* @private
	*/
	create: function () {
		this.inherited(arguments);
		this.parent.applyStyle('height', '100%');
	},

	/**
	* @private
	*/
	addAudio: function (inSender, inEvent) {
		var i = this.$.list.getCount() + 1;
		this.tracks = inEvent.tracks;
		this.$.list.setCount( i );
		this.$.list.reset();
		this.$.queueHeader.setTitleBelow(i + ' Tracks');
	},

	/**
	* @private
	*/
	setupItem: function (inSender, inEvent) {
		var i = inEvent.index;
		var t = this.tracks[i];
		var item = {artistName: t.artistName, trackName: t.trackName, src: '', albumName: t.albumName, duration: t.duration};
		this.$.item.setTrack(item);
		this.$.item.setSelected(inSender.isSelected(i));
		return true;
	}
});


var mainPanel = kind({
	kind: Panel,
	title: "App Name",
    titleAbove: "Music",
    titleBelow: "2 Tracks",
	audioFiles: [
		{src: "http://enyojs.com/_media/thunder.mp3", trackName: "Thunder", artistName: "Sound Effects Artist", albumName: "Sound Effects", duration: "0:22"},
		{src: "http://enyojs.com/_media/engine.mp3", trackName: "Engine", artistName: "Sound Effects Artist", albumName: "Sound Effects", duration: "0:04"},
		{src: "http://www.stephaniequinn.com/Music/Allegro%20from%20Duet%20in%20C%20Major.mp3", trackName: "Allegro", artistName: "Sound Effects Artist", albumName: "Sound Effects", duration: "0:04"},
		{src: "http://www.stephaniequinn.com/Music/Canon.mp3", trackName: "Canon", artistName: "Sound Effects Artist", albumName: "Sound Effects", duration: "0:04"},
		{src: "http://www.stephaniequinn.com/Music/Handel%20-%20Entrance%20of%20the%20Queen%20of%20Sheba.mp3", trackName: "Handel", artistName: "Sound Effects Artist", albumName: "Sound Effects", duration: "0:04"},
		{src: "http://www.stephaniequinn.com/Music/Jazz%20Rag%20Ensemble%20-%2010.mp3", trackName: "Engine", artistName: "Jazz", albumName: "Sound Effects", duration: "0:04"}
	],    
    components: [
	    {
	    	name: 'repeater',
	    	kind: DataList,
	    	components: [
				{
					kind: Item,
					classes: "sample-audio-item", 
					components: [
						{classes: "sample-audio-item-image", style: "background-image: url(assets/default-music.png);", components: [
							{name: 'albumArt', classes: "sample-audio-play-icon"}
						]},
						{style: "display: table-cell; width: 20px;"},
						{classes: "sample-audio-item-label", components: [{classes: "sample-audio-item-label-content", name: 'trackName'}]},
						{classes: "sample-audio-item-label", components: [{classes: "sample-audio-item-label-content", name: 'artistName'}]},
						{classes: "sample-audio-item-label", components: [{classes: "sample-audio-item-label-content", name: 'albumName'}]},
						{classes: "sample-audio-item-label-right", name: 'duration'}
					],
					bindings: [
						{from: '.model.src', to: '.$.albumArt.src'},
						{from: '.model.trackName', to: '.$.trackName.content'},
						{from: '.model.artistName', to: '.$.artistName.content'},
						{from: '.model.albumName', to: '.$.albumName.content'},
						{from: '.model.duration', to: '.$.duration.content'}
					],
					ontap: "playIndex"
				}
			],
			onScrollStop: 'scrollStopped'
		}
	],
	create: function() {
		this.inherited(arguments);
		this.$.repeater.collection = new Collection(this.audioFiles);
	},
	playIndex: function(inSender, inEvent) {
		this.bubble("onRequestSetupQueue", {collection: this.$.repeater.collection});
		this.bubble("onPlayIndex", {index: inSender.index, model: inSender.model});
	}
});

var pageContent = kind({
    name: "moon.sample.audioPlayback.pageContent",
    kind: Panels,
    classes: 'enyo-fit',
    components: [
    	{kind: mainPanel}
    ]
});


var myAudioPlayback = kind({
	kind: AudioPlayback,
	name: "audioPlayback",
	published: {
		autoShowAudioDetail: false
	},
	// Monitor drawer client open status
	observers: [
		{method: 'openChanged', path: ['queueOpen']}
	],
	// We hook default behavior of openQueueButton
	toggleQueueDrawer: function () {
		if (this.get('queueOpen')) {
			// update audio detail whenever change audio
			this.set('autoShowAudioDetail', true);
		} else {
			this.inherited(arguments);
		}
	},
	// We can change more button behavior based on queue open status
	openChanged: function(old, value) {
		this.$.openQueueButton.set('src', value ? 'assets/icon-list.png' : 'assets/icon-album.png');
	}
});

module.exports = kind({
	name: "moon.sample.AudioPlaybackSample",
	classes: "enyo-unselectable moon sample-audio-playback",
	handlers: {
		onPlayIndex: "playIndex",
		onRequestSetupQueue: "setupQueue"
	},
	components: [
		{kind: Drawers, drawers:[
			{
				kind: myAudioPlayback,
				name: "audioPlayback",
				components: [
					{content: 'play queue'} // 개발자가 PlaybackQueue 구현
				]
			}
		],
		components: [
			{kind: pageContent}
		]}
	],
	create: function() {
		this.inherited(arguments);
		// this.setupAudioTracks();
	},
	rendered: function() {
		this.inherited(arguments);
	},
	setupQueue: function(sender, event) {
		this.$.audioPlayback.setupAudioTracks(sender, {tracks: event.collection.raw()});
	},
	playIndex: function(sender, event) {
		this.$.audioPlayback.playAtIndex(event.index);
	}
});



