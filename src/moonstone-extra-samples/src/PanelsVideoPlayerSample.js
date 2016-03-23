var
	kind = require('enyo/kind'),
	Group = require('enyo/Group');

var
	FittableLayout = require('layout/FittableLayout'),
	FittableColumnsLayout = FittableLayout.Columns;

var
	Button = require('moonstone/Button'),
	Divider = require('moonstone/Divider'),
	IconButton = require('moonstone/IconButton'),
	Panel = require('moonstone/Panel'),
	Panels = require('moonstone/Panels'),
	SelectableItem = require('moonstone/SelectableItem'),
	ToggleButton = require('moonstone/ToggleButton'),
	VideoFullscreenToggleButton = require('moonstone/VideoFullscreenToggleButton'),
	VideoPlayer = require('moonstone-extra/VideoPlayer');

module.exports = kind({
	name: 'moon.sample.PanelsVideoPlayerSample',
	classes: 'moon enyo-fit enyo-unselectable',
	components: [
		{name: 'panels', kind: Panels, pattern: 'activity', classes: 'enyo-fit', components: [
			{kind: Panel, title: 'Video Player', layoutKind: FittableColumnsLayout, components: [
				{
					classes: 'moon-4h',
					components: [
						{kind: Divider, content: 'Select video content'},
						{name: 'vidContents', kind: Group, style: 'margin-top: 20px;', components: [
							{kind: SelectableItem, content: 'Counter', onActivate: 'webMovieCounter'},
							{kind: SelectableItem, selected: true, content: 'Bunny', onActivate: 'webMovieBunny'},
							{kind: SelectableItem, content: 'Sintel', onActivate: 'webMovieSintel'},
							{kind: SelectableItem, content: 'Error URL', onActivate: 'error'}
						]},
						{classes: 'moon-vspacing-m', components: [
							{kind: Button, content: 'Unload', ontap: 'unload'},
							{kind: Button, content: 'Reload', ontap: 'load'},
							{kind: ToggleButton, name: 'autoplayToggle', content: 'AutoPlay'}
						]}
					]
				},
				{
					fit: true,
					components: [
						{kind: Divider, content: 'Inline video player'},
						{
							name: 'player',
							kind: VideoPlayer,
							inline:true,
							classes: 'moon-8h',
							poster: '@../assets/video-poster.png',
							title: 'Downton Abbey',
							infoComponents: [
								{content: 'DTV'},
								{content: 'Cinema'},
								{content: '3D'}
							],
							components: [
								{kind: VideoFullscreenToggleButton, backgroundOpacity: 'translucent'},
								{kind: IconButton, backgroundOpacity: 'translucent'},
								{kind: IconButton, backgroundOpacity: 'translucent'},
								{kind: IconButton, backgroundOpacity: 'translucent'},
								{kind: IconButton, backgroundOpacity: 'translucent'},
								{kind: IconButton, backgroundOpacity: 'translucent'},
								{kind: IconButton, backgroundOpacity: 'translucent'},
								{kind: IconButton, backgroundOpacity: 'translucent'},
								{kind: IconButton, backgroundOpacity: 'translucent'},
								{kind: IconButton, backgroundOpacity: 'translucent'}
							]
						}
					]
				}
			]}
		]}
	],
	bindings: [
		{from: '$.autoplayToggle.value', to: '$.player.autoplay'}
	],
	unload: function () {
		this.$.player.unload();
	},
	load: function () {
		this.$.player.unload();
		this.$.player.setSources(this.sources);
	},
	webMovieCounter: function (sender, ev) {
		if (!ev.originator.active) {
			return;
		}
		// Set source by sources array
		this.sources = [
			{src: 'http://media.w3.org/2010/05/video/movie_300.mp4', type: 'video/mp4'},
			{src: 'http://media.w3.org/2010/05/video/movie_300.ogv', type: 'video/ogg'},
			{src: 'http://media.w3.org/2010/05/video/movie_300.webm', type: 'video/webm'}
		];
		this.$.player.setSources(this.sources);
		this.$.videoInfoHeader.setTitle('Ticking Counter Video');
	},
	webMovieBunny: function (sender, ev) {
		if (!ev.originator.active) {
			return;
		}
		// Set source by sources array
		this.sources = [
			{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', type: 'video/mp4'},
			{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv', type: 'video/ogg'},
			{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm', type: 'video/webm'}
		];
		this.$.player.setSources(this.sources);
		this.$.videoInfoHeader.setTitle('Bunny Video');
	},
	webMovieSintel: function (sender, ev) {
		if (!ev.originator.active) {
			return;
		}
		// Set source by sources array
		this.sources = [
			{src: 'http://media.w3.org/2010/05/sintel/trailer.mp4', type: 'video/mp4'},
			{src: 'http://media.w3.org/2010/05/sintel/trailer.ogv', type: 'video/ogg'},
			{src: 'http://media.w3.org/2010/05/sintel/trailer.webm', type: 'video/webm'}
		];
		this.$.player.setSources(this.sources);
		this.$.videoInfoHeader.setTitle('The Sintel Video');
	},
	error: function (sender, ev) {
		if (!ev.originator.active) {
			return;
		}
		this.src = 'http://foo.bar';
		this.$.player.setSrc(this.src);
		this.$.videoInfoHeader.setTitle('Error video');
	}
});

module.exports.badgeClasses = 'new';
