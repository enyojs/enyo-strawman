var
	kind = require('enyo/kind');

var
	IconButton = require('moonstone/IconButton'),
	VideoFullscreenToggleButton = require('moonstone-extra/VideoFullscreenToggleButton'),
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
			title: 'Downton Abbey',
			infoComponents: [
				{content: 'DTV'},
				{content: 'REC 08:22', classes: 'redicon'},
				{content: '&#42279;', accessibilityLabel: 'THX Certified Audio', classes: 'font-lg-icons'},
				{content: '&#42295;', accessibilityLabel: '16 by 9 Aspect Ratio', classes: 'font-lg-icons'}
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
