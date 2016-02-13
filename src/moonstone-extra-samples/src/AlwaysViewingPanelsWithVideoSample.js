var
	kind = require('enyo/kind');

var
	Button = require('moonstone/Button'),
	ChannelInfo = require('moonstone-extra/ChannelInfo'),
	Clock = require('moonstone/Clock'),
	ContextualPopup = require('moonstone/ContextualPopup'),
	ContextualPopupDecorator = require('moonstone/ContextualPopupDecorator'),
	IconButton = require('moonstone/IconButton'),
	Item = require('moonstone/Item'),
	Panels = require('moonstone-extra/Panels'),
	ToggleItem = require('moonstone/ToggleItem'),
	Tooltip = require('moonstone/Tooltip'),
	TooltipDecorator = require('moonstone/TooltipDecorator'),
	VideoInfoBackground = require('moonstone-extra/VideoInfoBackground'),
	VideoInfoHeader = require('moonstone-extra/VideoInfoHeader'),
	VideoPlayer = require('moonstone-extra/VideoPlayer');

var sources = [
	{src: 'http://media.w3.org/2010/05/bunny/movie.ogv', type: 'video/ogg'},
	{src: 'http://media.w3.org/2010/05/bunny/movie_hd.ogv', type: 'video/ogg'},
	{src: 'http://media.w3.org/2010/05/bunny/movie.mp4', type: 'video/mp4'}
];

module.exports = kind({
    name: 'moon.sample.AlwaysViewingPanelsWithVideoSample',
    classes: 'moon enyo-fit enyo-unselectable',
    components: [
        {name: 'player', kind: VideoPlayer, sources: sources, poster: '@../assets/video-poster.png', autoplay: true, infoComponents: [
			{kind: VideoInfoBackground, orient: 'left', background: true, fit: true, components: [
				{
					kind: ChannelInfo,
					channelNo: '13',
					channelName: 'AMC',
					components: [
						{content: '3D'},
						{content: 'Live'},
						{content: 'REC 08:22', classes: 'redicon'}
					]
				},
				{
					kind: VideoInfoHeader,
					title: 'Downton Abbey - Extra Title',
					subTitle: 'Mon June 21, 7:00 - 8:00pm',
					subSubTitle: 'R - TV 14, V, L, SC',
					description: 'The series, set in the Youkshire country estate of Downton Abbey, depicts the lives of the aristocratic Crawley famiry and'
				}
			]},
			{kind: VideoInfoBackground, orient: 'right', background: true, components: [
				{kind: Clock}
			]}
		], components: [
			{kind: IconButton, icon: 'list', small: false, backgroundOpacity: 'translucent'},
			{kind: TooltipDecorator, components: [
				{kind: ContextualPopupDecorator, components: [
					{kind: Button, content: 'Popup'},
					{
						kind: ContextualPopup,
						classes: 'moon-3h moon-6v',
						components: [
							{kind: Item, content: 'Item 1'},
							{kind: Item, content: 'Item 2'},
							{kind: Item, content: 'Item 3'}
						]
					}
				]},
				{kind: Tooltip, floating:true, content: 'I\'m a tooltip for a button.'}
			]},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'},
			{kind: IconButton, small: false, backgroundOpacity: 'translucent'}
		]},
        {name: 'panels', kind: Panels, pattern: 'alwaysviewing', classes: 'enyo-fit', showing: false, components: [
            {title: 'First Panel', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: ToggleItem, content: 'Show/Hide Side Handle', checked: true,  onchange: 'handleShowingChanged'}
			]},
			{title: 'Second Panel', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
            {title: 'Third Panel', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
            {title: 'Fourth', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
            {title: 'Fifth', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
            {title: 'Sixth', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]},
            {title: 'Seventh', titleBelow: 'Sub-title', subTitleBelow: 'Sub-sub title', components: [
				{kind: Item, content: 'Item One', ontap: 'next'},
				{kind: Item, content: 'Item Two', ontap: 'next'},
				{kind: Item, content: 'Item Three', ontap: 'next'},
				{kind: Item, content: 'Item Four', ontap: 'next'},
				{kind: Item, content: 'Item Five', ontap: 'next'}
			]}
		]}
	],
	next: function (sender, ev) {
		this.$.panels.next();
		return true;
	},
	handleShowingChanged: function (sender, ev) {
		this.$.panels.setHandleShowing(sender.getChecked());
	}
});
