require('garnet');

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),
	Collection = require('enyo/Collection.js'),
	EnyoImage = require('enyo/Image'),
	DataList = require('garnet/DataList'),
	Panel = require('garnet/Panel');

var DataListCardsPanel = kind({
	name: 'g.sample.DataListCardsPanel',
	kind: Panel,
	knob: true,
	classes: 'g-layout-absolute-wrapper',
	components: [
		{
			name: 'list',
			kind: DataList,
			controlsPerPage: 2,
			cards: true,
			components: [
				{ontap: 'showPopup', components: [
					{name: 'listItem', classes: 'g-sample-datalist-cards-item', components: [
						{name: 'iconUrl', kind: EnyoImage, classes: 'g-common-width-height-fit'}
					]}
				], bindings: [
					{from: '.model.iconUrl', to: '.$.iconUrl.src'}
				]}
			]
		}
	],
	bindings: [
		{from: '.collection', to: '.$.list.collection'}
	]
});

var DataListSmallCardsPanel = kind({
	name: 'g.sample.DataListSmallCardsPanel',
	kind: Panel,
	knob: true,
	classes: 'g-layout-absolute-wrapper',
	components: [
		{
			name: 'list',
			kind: DataList,
			controlsPerPage: 2,
			cards: true,
			itemHeight: ri.scale(216),
			classes: 'g-sample-datalist-cards-list',
			headerComponents: [
				{classes: 'g-sample-datalist-cards-list-header'}
			],
			footerComponents: [
				{classes: 'g-sample-datalist-cards-list-footer'}
			],
			components: [
				{ontap: 'showPopup', components: [
					{name: 'listItem', classes: 'g-sample-datalist-smallcards-item', components: [
						{name: 'iconUrl', kind: EnyoImage},
						{classes: 'g-sample-datalist-smallcards-title', content: 'title'}
					]}
				], bindings: [
					{from: '.model.iconUrl', to: '.$.iconUrl.src'}
				]}
			]
		}
	],
	bindings: [
		{from: '.collection', to: '.$.list.collection'}
	]
});

module.exports = kind({
	name: 'g.sample.DataListwithCardsSample',
	classes: 'enyo-unselectable garnet g-sample',
	components: [
		{content: '< Data List with Cards Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Data List with Cards', classes: 'g-sample-subheader'},
		{classes: 'g-sample-panels', components: [
			{name: 'listPanel', kind: DataListCardsPanel, classes: 'g-sample-panel-margin'},
			{name: 'listPanel2', kind: DataListSmallCardsPanel, classes: 'g-sample-circle-panel-margin'}
		]}
	],
	bindings: [
		{from: '.collection', to: '.$.listPanel.collection'},
		{from: '.collection', to: '.$.listPanel2.collection'}
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
		{iconUrl: '@../assets/photo.png', albumTitle: 'Alejandra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Marquez', albumGenre: 'Pop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Barr', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Everett', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Crane', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Raymond', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Petersen', albumGenre: 'Pop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Kristina', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Barbra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Tracey', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Alejandra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Marquez', albumGenre: 'Pop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Barr', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Everett', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Crane', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Raymond', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Petersen', albumGenre: 'Pop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Kristina', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Barbra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Tracey', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Alejandra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Marquez', albumGenre: 'Pop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Barr', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Everett', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Crane', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Raymond', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Petersen', albumGenre: 'Pop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Kristina', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Barbra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Tracey', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Alejandra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Marquez', albumGenre: 'Pop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Barr', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Everett', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Crane', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Raymond', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Petersen', albumGenre: 'Pop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Kristina', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Barbra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Tracey', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Alejandra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Marquez', albumGenre: 'Pop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Barr', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Everett', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Crane', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Raymond', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Petersen', albumGenre: 'Pop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Kristina', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Barbra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Tracey', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Alejandra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Marquez', albumGenre: 'Pop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Barr', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Everett', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Crane', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Raymond', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Petersen', albumGenre: 'Pop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Kristina', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Barbra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Tracey', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Alejandra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Marquez', albumGenre: 'Pop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Barr', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Everett', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Crane', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Raymond', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Petersen', albumGenre: 'Pop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Kristina', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Barbra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Tracey', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Alejandra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Marquez', albumGenre: 'Pop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Barr', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Everett', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Crane', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Raymond', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Petersen', albumGenre: 'Pop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Kristina', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Barbra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Tracey', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Alejandra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Marquez', albumGenre: 'Pop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Barr', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Everett', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Crane', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Raymond', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Petersen', albumGenre: 'Pop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Kristina', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Barbra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Tracey', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Alejandra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Marquez', albumGenre: 'Pop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Barr', albumGenre: 'Hiphop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Everett', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Crane', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Raymond', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Petersen', albumGenre: 'Pop'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Kristina', albumGenre: 'Ballad'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Barbra', albumGenre: 'Rock'},
		{iconUrl: '@../assets/photo.png', albumTitle: 'Tracey', albumGenre: 'Hiphop'}
	]
});
