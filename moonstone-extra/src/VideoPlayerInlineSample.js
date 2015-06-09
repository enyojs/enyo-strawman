var
	kind = require('enyo/kind');

var
	ChannelInfo = require('moonstone-extra/ChannelInfo'),
	Clock = require('moonstone/Clock'),
	IconButton = require('moonstone/IconButton'),
	VideoFullscreenToggleButton = require('moonstone-extra/VideoFullscreenToggleButton'),
	VideoInfoBackground = require('moonstone-extra/VideoInfoBackground'),
	VideoInfoHeader = require('moonstone-extra/VideoInfoHeader'),
	VideoPlayer = require('moonstone-extra/VideoPlayer');

module.exports = kind({
	name: 'moon.sample.VideoPlayerInlineSample',
	classes: 'moon enyo-fit enyo-unselectable moon-video-player-sample',
	fit: true,
	components: [
		{
			name: 'player',
			kind: VideoPlayer,
			src: 'http://media.w3.org/2010/05/bunny/movie.mp4',
			poster: 'assets/video-poster.png',
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
						description: 'The series, set in the Youkshire country estate of Downton Abbey, depicts the lives of the aristocratic Crawley famiry and'
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
