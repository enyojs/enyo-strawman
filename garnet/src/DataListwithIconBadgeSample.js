require('garnet');

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),
	Collection = require('enyo/Collection.js'),
	EmptyBinding = require('enyo/EmptyBinding.js'),
	Item = require('garnet/Item'),
	Icon = require('garnet/Icon'),
	DataList = require('garnet/DataList'),
	Panel = require('garnet/Panel'),
	Title = require('garnet/Title');

var IconBadgeItem = kind({
	name: 'g.sample.IconBadgeItem',
	kind: Item,
	classes: 'g-datalist-icon-badge-item',
	published: {
		title: '',
		newIcon: false,
		infoIcon: false
	},
	components: [
		{name: 'icon', kind: Icon, src: '@../assets/ic_dialog_alert.svg', classes: 'icon-badge-item-icon'},
		{name: 'newIconBadge', kind: Icon, src: '@../assets/badge_unread.svg', classes: 'icon-badge-item-new-icon'},
		{name: 'infoIconBadge', kind: Icon, src: '@../assets/badge_extra_info.svg', classes: 'icon-badge-item-info-icon'},
		{name: 'title', classes: 'icon-badge-item-title'},
		{tag: 'hr', style: 'border: 0; color: #202328; height: ' + ri.scale(1) + 'px; background-color: #202328; bottom: 0;'}
	],
	bindings: [
		{from: '.model.albumTitle', to: '.$.title.content'},
		{from: '.model.albumTitle', to: '.$.title.showing', kind: EmptyBinding},
		{from: '.model.iconUrl', to: '.$.icon.src'},
		{from: '.model.newIcon', to: '.newIcon'},
		{from: '.model.infoIcon', to: '.infoIcon'}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.newIconChanged();
			this.infoIconChanged();
		};
	}),
	newIconChanged: function() {
		if (this.newIcon) {
			this.$.newIconBadge.show();
		} else {
			this.$.newIconBadge.hide();
		}
	},
	infoIconChanged: function() {
		if (this.infoIcon) {
			this.$.infoIconBadge.show();
		} else {
			this.$.infoIconBadge.hide();
		}
	}
});

var IconBadgeDataListPanel = kind({
	name: 'g.sample.IconBadgeDataListPanel',
	kind: Panel,
	knob: true,
	components: [
		{
			name: 'list',
			kind: DataList,
			controlsPerPage: 4,
			selection: false,
			multipleSelection: false,
			style: 'background-color: #000000;',
			headerComponents: [{kind: Title, content: 'Title'}],
			components: [
				{kind: IconBadgeItem}
			]
		}
	],
	bindings: [
		{from: '.collection', to: '.$.list.collection'}
	]
});

module.exports = kind({
	name: 'g.sample.DataListwithIconBadgeSample',
	classes: 'enyo-unselectable garnet g-sample',
	components: [
		{content: '< Data List with Icon Badge Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Data List with Icon Badge', classes: 'g-sample-subheader'},
		{name: 'iconBadgeListPanel', kind: IconBadgeDataListPanel, style: 'position: relative;'}
	],
	bindings: [
		{from: '.collection', to: '.$.iconBadgeListPanel.collection'}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.collection = new Collection(this.data);
		};
	}),
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	},
	data: [
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Looooooooooong Title', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Marquez', albumGenre: 'Pop', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barr', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Everett', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Crane', albumGenre: 'Ballad', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Raymond', albumGenre: 'Rock', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Petersen', albumGenre: 'Pop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Kristina', albumGenre: 'Ballad', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Loooooooooong Title', albumGenre: 'Rock', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Tracey', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Alejandra', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Marquez', albumGenre: 'Pop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barr', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Looooooooooong Title', albumGenre: 'Rock', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Crane', albumGenre: 'Ballad', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Alejandra', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Marquez', albumGenre: 'Pop', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barr', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Everett', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Loooooooooong Title', albumGenre: 'Ballad', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Raymond', albumGenre: 'Rock', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Petersen', albumGenre: 'Pop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Kristina', albumGenre: 'Ballad', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barbra', albumGenre: 'Rock', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Tracey', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Alejandra', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Marquez', albumGenre: 'Pop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barr', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Everett', albumGenre: 'Rock', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Crane', albumGenre: 'Ballad', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Alejandra', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Marquez', albumGenre: 'Pop', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barr', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Everett', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Crane', albumGenre: 'Ballad', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Raymond', albumGenre: 'Rock', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Petersen', albumGenre: 'Pop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Kristina', albumGenre: 'Ballad', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barbra', albumGenre: 'Rock', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Tracey', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Alejandra', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Marquez', albumGenre: 'Pop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barr', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Everett', albumGenre: 'Rock', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Crane', albumGenre: 'Ballad', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Alejandra', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Marquez', albumGenre: 'Pop', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barr', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Everett', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Crane', albumGenre: 'Ballad', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Raymond', albumGenre: 'Rock', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Petersen', albumGenre: 'Pop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Kristina', albumGenre: 'Ballad', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barbra', albumGenre: 'Rock', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Tracey', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Alejandra', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Marquez', albumGenre: 'Pop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barr', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Everett', albumGenre: 'Rock', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Crane', albumGenre: 'Ballad', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Alejandra', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Marquez', albumGenre: 'Pop', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barr', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Everett', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Crane', albumGenre: 'Ballad', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Raymond', albumGenre: 'Rock', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Petersen', albumGenre: 'Pop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Kristina', albumGenre: 'Ballad', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barbra', albumGenre: 'Rock', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Tracey', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Alejandra', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Marquez', albumGenre: 'Pop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Barr', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Everett', albumGenre: 'Rock', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_dialog_alert.svg', albumTitle: 'Crane', albumGenre: 'Ballad', newIcon: false, infoIcon: true}
	]
});
