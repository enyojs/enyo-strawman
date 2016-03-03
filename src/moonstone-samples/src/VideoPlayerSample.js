var
	kind = require('enyo/kind');

var
	Button = require('moonstone/Button'),
	ChannelInfo = require('moonstone/ChannelInfo'),
	Clock = require('moonstone/Clock'),
	ContextualPopup = require('moonstone/ContextualPopup'),
	ContextualPopupDecorator = require('moonstone/ContextualPopupDecorator'),
	Dialog = require('moonstone/Dialog'),
	IconButton = require('moonstone/IconButton'),
	Item = require('moonstone/Item'),
	ToggleButton = require('moonstone/ToggleButton'),
	Tooltip = require('moonstone/Tooltip'),
	TooltipDecorator = require('moonstone/TooltipDecorator'),
	VideoInfoBackground = require('moonstone/VideoInfoBackground'),
	VideoInfoHeader = require('moonstone/VideoInfoHeader'),
	VideoPlayer = require('moonstone/VideoPlayer');

var sources = [
	{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', type: 'video/mp4'},
	{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv', type: 'video/ogg'},
	{src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm', type: 'video/webm'}
];

module.exports = kind({
	name: 'moon.sample.VideoPlayerSample',
	classes: 'moon enyo-fit enyo-unselectable moon-video-player-sample',
	fit: true,
	components: [
		{
			name: 'player',
			kind: VideoPlayer,
			sources: sources,
			poster: '@../assets/video-poster.png',
			autoplay: true,
			onPlaybackControlsTapped: 'controlsTapped',
			infoComponents: [
				{kind: VideoInfoBackground, orient: 'left', background: true, fit: true, components: [
					{
						kind: ChannelInfo,
						channelNo: '789-123',
						channelName: 'AMC',
						channelDesc: 'KRON-HD',
						channelMoreDesc: '4:30 - 5:30PM',
						components: [
							{content: 'DTV'},
							{content: 'Cinema'},
							{content: '3D'}
						]
					},
					{
						kind: VideoInfoHeader,
						title: 'Downton Abbey',
						uppercase: false,
						// Todo, we can remove below comment out after policy of samples is decided.
						// In latest tag like 2.6.0-pre.5, we don't have samples.
						// src: '$lib/moonstone/samples/assets/default-music.png',
						description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
					}
				]},
				{kind: VideoInfoBackground, orient: 'right', background: true, components: [
					{kind: Clock}
				]}
			],
	   		components: [
				{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
				{kind: ToggleButton, name: 'controlsToggleButton', content: 'Controls', backgroundOpacity: 'translucent'},
				{kind: Button, content: 'Unload', backgroundOpacity: 'translucent', ontap: 'unload'},
				{kind: Button, content: 'Reload', backgroundOpacity: 'translucent', ontap: 'load'},
				{kind: ToggleButton, content: 'FF/Rewind', name: 'ffrewToggleButton', backgroundOpacity: 'translucent'},
				{kind: ContextualPopupDecorator, components: [
					{kind: TooltipDecorator, components: [
						{kind: Button, content: 'Popup', backgroundOpacity: 'translucent'},
						{kind: Tooltip, floating: true, content: 'I\'m a tooltip for a button.'}
					]},
					{
						kind: ContextualPopup,
						classes: 'moon-3h moon-6v',
						backgroundOpacity: 'translucent',
						components: [
							{kind: Item, content: 'Item 1'},
							{kind: Item, content: 'Item 2'},
							{kind: Item, content: 'Item 3'}
						]
					}
				]},
				{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
				{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
				{kind: IconButton, small: false, backgroundOpacity: 'translucent'}
			]
		},
		{kind: Dialog, name: 'tapDialog', title: 'The controls were tapped.', message: 'Press OK to dismiss', components: [
			{kind: Button, content: 'OK', ontap: 'dismissTapDialog'}
		]}
	],
	bindings: [
		{from: '$.player.disablePlaybackControls', to: '$.controlsToggleButton.value', oneWay:false},
		{from: '$.player.showFFRewindControls', to: '$.ffrewToggleButton.value', oneWay:false}
	],
	controlsTapped: function () {
		this.$.tapDialog.show();
	},
	dismissTapDialog: function () {
		this.$.tapDialog.hide();
	},
	unload: function () {
		this.$.player.unload();
	},
	load: function () {
		this.$.player.unload();
		// We can set source by sources array
		this.sources = sources;
		this.$.player.setSources(this.sources);
	}
});

module.exports.badgeClasses = 'new';
