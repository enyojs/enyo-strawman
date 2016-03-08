var
	kind = require('enyo/kind');

var
	ChannelInfo = require('moonstone/ChannelInfo'),
	Clock = require('moonstone/Clock'),
	IconButton = require('moonstone/IconButton'),
	VideoFullscreenToggleButton = require('moonstone/VideoFullscreenToggleButton'),
	VideoInfoBackground = require('moonstone/VideoInfoBackground'),
	VideoInfoHeader = require('moonstone/VideoInfoHeader'),
	VideoPlayer = require('moonstone/VideoPlayer');

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
				{kind: VideoInfoBackground, orient: 'left', fit: true, components: [
					{
						kind: ChannelInfo,
						channelNo: '13',
						channelName: 'AMC',
						components: [
							{content: 'DTV'},
							{content: 'Cinema'},
							{content: '3D'}
						]
					},
					{
						kind: VideoInfoHeader,
						title: 'Downton Abbey',
						subTitle: 'Mon June 21, 7:00 - 8:00pm',
						subSubTitle: 'R - TV 14, V, L, SC',
						description: 'The series, set in the Yorukshire country estate of Downton Abbey, depicts the lives of the aristocratic Crawley famiry and'
					}
				]},
				{kind: VideoInfoBackground, orient: 'right', components: [
					{kind: Clock}
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
