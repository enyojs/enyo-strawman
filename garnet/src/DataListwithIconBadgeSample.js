require('garnet');

var
	kind = require('enyo/kind'),
	Collection = require('enyo/Collection.js'),
	Item = require('garnet/Item'),
	Icon = require('garnet/Icon'),
	DataList = require('garnet/DataList'),
	Panel = require('garnet/Panel'),
	Title = require('garnet/Title'),
	MarqueeSupport = require('garnet/MarqueeSupport');

var IconBadgeItem = kind({
	name: 'g.sample.IconBadgeItem',
	kind: Item,
	border: true,
	classes: 'g-datalist-iconbadge-item',
	published: {
		title: '',
		newIcon: false,
		infoIcon: false
	},
	components: [
		{name: 'icon', kind: Icon, src: '@../assets/ic_list_message_60x60.svg', classes: 'icon-badge-item-icon', components: [
			{name: 'newIconBadge', kind: Icon, src: '@../assets/badge_unread.svg', classes: 'icon-badge-item-new-icon'},
			{name: 'infoIconBadge', kind: Icon, src: '@../assets/badge_extra_info.svg', classes: 'icon-badge-item-info-icon'}
		]},
		{name: 'title', classes: 'icon-badge-item-title', mixins: [MarqueeSupport]}
	],
	bindings: [
		{from: '.model.albumTitle', to: '.$.title.content'},
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
	components: [
		{
			name: 'list',
			kind: DataList,
			controlsPerPage: 4,
			selection: false,
			multipleSelection: false,
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
		{name: 'iconBadgeListPanel', kind: IconBadgeDataListPanel, classes: 'g-sample-panel'}
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
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Looooooooooong Title', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Marquez', albumGenre: 'Pop', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Barr', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Everett', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Crane', albumGenre: 'Ballad', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Raymond', albumGenre: 'Rock', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Petersen', albumGenre: 'Pop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Kristina', albumGenre: 'Ballad', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Loooooooooong Title', albumGenre: 'Rock', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Tracey', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Alejandra', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Marquez', albumGenre: 'Pop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Barr', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Looooooooooong Title', albumGenre: 'Rock', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Crane', albumGenre: 'Ballad', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Alejandra', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Marquez', albumGenre: 'Pop', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Barr', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Everett', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Loooooooooong Title', albumGenre: 'Ballad', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Raymond', albumGenre: 'Rock', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Petersen', albumGenre: 'Pop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Kristina', albumGenre: 'Ballad', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Barbra', albumGenre: 'Rock', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Tracey', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Alejandra', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Marquez', albumGenre: 'Pop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Barr', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Everett', albumGenre: 'Rock', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Crane', albumGenre: 'Ballad', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Alejandra', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Marquez', albumGenre: 'Pop', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Barr', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Everett', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Crane', albumGenre: 'Ballad', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Raymond', albumGenre: 'Rock', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Petersen', albumGenre: 'Pop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Kristina', albumGenre: 'Ballad', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Barbra', albumGenre: 'Rock', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Tracey', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Alejandra', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Marquez', albumGenre: 'Pop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Barr', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Everett', albumGenre: 'Rock', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Crane', albumGenre: 'Ballad', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Alejandra', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Marquez', albumGenre: 'Pop', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Barr', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Everett', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Crane', albumGenre: 'Ballad', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Raymond', albumGenre: 'Rock', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Petersen', albumGenre: 'Pop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Kristina', albumGenre: 'Ballad', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Barbra', albumGenre: 'Rock', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Tracey', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Alejandra', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Marquez', albumGenre: 'Pop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Barr', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Everett', albumGenre: 'Rock', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Crane', albumGenre: 'Ballad', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Alejandra', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Marquez', albumGenre: 'Pop', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Barr', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Everett', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Crane', albumGenre: 'Ballad', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Raymond', albumGenre: 'Rock', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Petersen', albumGenre: 'Pop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Kristina', albumGenre: 'Ballad', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Barbra', albumGenre: 'Rock', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Tracey', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Alejandra', albumGenre: 'Rock', newIcon: true, infoIcon: false},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Marquez', albumGenre: 'Pop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Barr', albumGenre: 'Hiphop', newIcon: true, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Everett', albumGenre: 'Rock', newIcon: false, infoIcon: true},
		{iconUrl: '@../assets/ic_list_message_60x60.svg', albumTitle: 'Crane', albumGenre: 'Ballad', newIcon: false, infoIcon: true}
	]
});
