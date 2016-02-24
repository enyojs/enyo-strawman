var
	kind = require('enyo/kind');

var
	IconButton = require('moonstone/IconButton'),
	VideoFullscreenToggleButton = require('moonstone-extra/VideoFullscreenToggleButton'),
	VideoTitle = require('moonstone-extra/VideoTitle'),
	VideoPlayer = require('moonstone-extra/VideoPlayer');

var sources = [
	{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', type: 'video/mp4'},
	{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv', type: 'video/ogg'},
	{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm', type: 'video/webm'}
];

module.exports = kind({
	name: 'moon.sample.VideoPlayerInlineSample',
	classes: 'moon enyo-fit enyo-unselectable moon-video-player-sample',
	fit: true,
	components: [
		{
			name: 'player',
			kind: VideoPlayer,
			sources: sources,
			poster: '@../assets/video-poster.png',
			inline: true,
			classes: 'moon-8h',
			autoplay: true,
			infoComponents: [
				{kind: VideoTitle, title: 'Downton Abbey', components: [
					{content: 'DTV'},
					{content: 'Cinema'},
					{content: '3D'}
				]}
			],
			components: [
				{kind: VideoFullscreenToggleButton, backgroundOpacity: 'translucent'},
				{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
				{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
				{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
				{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
				{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
				{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
				{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
				{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
				{kind: IconButton, small: false, backgroundOpacity: 'translucent'}
			]
		}
	]
});

module.exports.badgeClasses = 'new';
