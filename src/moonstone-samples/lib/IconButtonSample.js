var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows'),
	BodyText = require('moonstone/BodyText'),
	Divider = require('moonstone/Divider'),
	IconButton = require('moonstone/IconButton'),
	Scroller = require('moonstone/Scroller'),
	Group = require('enyo/Group');

module.exports = kind({
	name: 'moon.sample.IconButtonSample',
	kind: FittableRows,
	classes: 'moon enyo-unselectable enyo-fit moon-icon-button-sample',
	components: [
		{kind: Scroller, fit: true, components: [
			{fit:true, components: [
				{kind: Divider, content: 'Font-based Icon Buttons: '},
				{kind: IconButton, icon: 'drawer', small: false, ontap: 'buttonTapped'},
				{kind: IconButton, icon: 'search', small: false, ontap: 'buttonTapped'},
				{kind: IconButton, icon: 'drawer', ontap: 'buttonTapped'},
				{kind: IconButton, icon: 'search', ontap: 'buttonTapped'},
				{classes: 'moon-1v'},
				{kind: Divider, content: 'Image Asset Icon (Raster Image) Buttons: '},
				{kind: IconButton, src: '@../assets/icon-list.png', small: false, ontap: 'buttonTapped'},
				{kind: IconButton, src: '@../assets/icon-album.png', small: false, ontap: 'buttonTapped'},
				{kind: IconButton, src: '@../assets/icon-list.png', ontap: 'buttonTapped'},
				{kind: IconButton, src: '@../assets/icon-album.png', ontap: 'buttonTapped'},
				{classes: 'moon-1v'},
				{kind: Divider, content: 'Image Asset Icons (Vector Image) Buttons:'},
				{kind: IconButton, src: '@../assets/magnify.svg', small: false, ontap: 'buttonTapped'},
				{kind: IconButton, src: '@../assets/trash.svg', small: false, ontap: 'buttonTapped'},
				{kind: IconButton, src: '@../assets/magnify.svg', ontap: 'buttonTapped'},
				{kind: IconButton, src: '@../assets/trash.svg', ontap: 'buttonTapped'},
				{classes: 'moon-1v'},
				{kind: Divider, content: 'Disabled Icon Buttons: '},
				{kind: IconButton, icon: 'drawer', small: false, ontap: 'buttonTapped', disabled: true},
				{kind: IconButton, icon: 'search', ontap: 'buttonTapped', disabled: true},
				{kind: IconButton, src: '@../assets/icon-list.png', small: false, ontap: 'buttonTapped', disabled: true},
				{kind: IconButton, src: '@../assets/icon-album.png', ontap: 'buttonTapped', disabled: true},
				{classes: 'moon-1v'},
				{kind: Divider, content: 'Grouped Icon Buttons: '},
				{kind: Group, components: [
					{kind: IconButton, icon: 'drawer', active: true, ontap: 'buttonTapped'},
					{kind: IconButton, icon: 'search', ontap: 'buttonTapped'},
					{kind: IconButton, src: '@../assets/icon-list.png', ontap: 'buttonTapped'},
					{kind: IconButton, src: '@../assets/icon-album.png', ontap: 'buttonTapped'}
				]},
				{classes: 'moon-1v'},
				{kind: Divider, content: 'Translucent Background Buttons:'},
				{classes: 'image-background', components: [
					{kind: IconButton, icon: 'backward', backgroundOpacity: 'translucent', ontap: 'buttonTapped'},
					{kind: IconButton, icon: 'play', small: false, backgroundOpacity: 'translucent', ontap: 'buttonTapped'},
					{kind: IconButton, icon: 'forward', backgroundOpacity: 'translucent', ontap: 'buttonTapped'},
					{kind: IconButton, icon: 'exitfullscreen', small: false, backgroundOpacity: 'transparent', ontap: 'buttonTapped'},
					{kind: IconButton, icon: 'fullscreen', small: false, backgroundOpacity: 'transparent', ontap: 'buttonTapped'},
					{kind: IconButton, src: '@../assets/icon-list.png', small: false, backgroundOpacity: 'translucent', ontap: 'buttonTapped'},
					{kind: IconButton, src: '@../assets/icon-album.png', backgroundOpacity: 'transparent', ontap: 'buttonTapped'}
				]}
			]}
		]},
		{kind: Divider, content: 'Result'},
		{kind: BodyText, name: 'console', content: 'No changes yet'}
	],
	buttonTapped: function (sender, event) {
		this.$.console.setContent(sender.name + ' tapped.');
	}
});
