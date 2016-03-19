var
	kind = require('enyo/kind');

var
	Button = require('moonstone/Button'),
	ContextualPopup = require('moonstone/ContextualPopup'),
	ContextualPopupDecorator = require('moonstone/ContextualPopupDecorator'),
	Dialog = require('moonstone/Dialog'),
	IconButton = require('moonstone/IconButton'),
	Item = require('moonstone/Item'),
	ToggleButton = require('moonstone/ToggleButton'),
	Tooltip = require('moonstone/Tooltip'),
	TooltipDecorator = require('moonstone/TooltipDecorator'),
	VideoPlayer = require('moonstone-extra/VideoPlayer');

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
			title: 'Downton Abbey',
			infoComponents: [
				{content: 'DTV'},
				{content: 'Cinema'},
				{content: '3D'}
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
