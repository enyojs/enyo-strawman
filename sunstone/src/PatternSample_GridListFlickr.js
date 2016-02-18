var
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	Jsonp = require('enyo/Jsonp');

var
	FittableRows = require('layout/FittableRows'),
	FittableColumns = require('layout/FittableColumns');

var
	Button = require('sunstone/Button'),
	GridList = require('sunstone/GridList'),
	GridListImageItem = require('sunstone/GridListImageItem'),
	Header = require('sunstone/Header'),
	ToastPopup = require('sunstone/ToastPopup'),
	playFeedback = require('sunstone/feedback');

module.exports = kind({
	name: 'sun.sample.GridListFlickrSample',
	kind: FittableRows,
	classes: 'gridflickr-sample enyo-unselectable enyo-fit',
	components: [
		{kind: Header, title: 'Header', classes: 'toggle-header', components: [
			{classes: 'rearrange', ontap: 'icTapped'},
			{classes: 'viewappby', ontap: 'icTapped'}
		]},
		{kind: FittableColumns, classes: 'apps-title', components: [
			{classes: 'left-arrow'},
			{fit: true, content: 'Apps', classes: 'title-content'},
			{classes: 'right-arrow'}
		]},
		{fit: true, classes: 'watch-wrapper', components: [
			{
				name: 'list',
				kind: GridList,
				reorderable: true,
				onReorder: 'listReorder',
				onSetupReorderComponents: 'setupReorderComponents',
				onSetupItem: 'setupItem',
				scrollTopSpacing: 100,
				scrollBottomSpacing: 180,
				pageWidth: 208, // To show only two item on each row
				components: [
					{name: 'tile', kind: GridListImageItem, ontap: 'appTapped'}
				],
				reorderComponents: [
					{name: 'reorderContent', classes: 'enyo-fit reorderDragger', components: [
						{name: 'reorderTile', kind: GridListImageItem}
					]}
				]
			}
		]},
		{classes: 'grid-table', style: 'width: 100%', components: [
			{classes: 'grid-table-cell', components: [
				{name: 'cancel', kind: Button, content: 'Cancel', style: 'width: 100%; height: 100%;', ontap: 'buttonTapped'}
			]},
			{classes: 'grid-table-cell', style: 'width: 1px', components: [
				{classes: 'button-divider'}
			]},
			{classes: 'grid-table-cell', components: [
				{name: 'ok', kind: Button, content: 'Save', style: 'width: 100%; height: 100%;', ontap: 'buttonTapped'}
			]}
		]},
		{name: 'toastpopup', kind: ToastPopup, showDuration: 2000, content: 'Hello toastpopup!'}
	],
	rendered: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.search();
			this.$.list.setItemWidth(76);
			this.$.list.setItemHeight(83);
			this.$.list.setItemSpacing(14);
		};
	}),
	listReorder: function (inSender, inEvent) {
		var movedItem = utils.clone(this.results[inEvent.reorderFrom]);
		this.results.splice(inEvent.reorderFrom, 1);
		this.results.splice((inEvent.reorderTo), 0 , movedItem);
	},
	setupReorderComponents: function (inSender, inEvent) {
		var i = inEvent.index,
			item = this.results[i];

		if (!this.results[i]) {
			return true;
		}
		if (!item.url_m) {
			return true;
		}
		this.$.reorderTile.setSource(item.url_m);
		this.$.reorderTile.setCaption(item.title);
		this.$.reorderTile.setSelected(this.$.list.isSelected(i));
	},
	search: function() {
		var params = {
			method: 'flickr.interestingness.getList',
			format: 'json',
			api_key: '2a21b46e58d207e4888e1ece0cb149a5',
			per_page: 20,
			page: 0,
			sort: 'date-posted-desc',
			extras: 'url_m'
		};
		new Jsonp({url: 'https://api.flickr.com/services/rest/', callbackName: 'jsoncallback'}).response(this, 'processFlickrResults').go(params);
	},
	processFlickrResults: function (inRequest, inResponse) {
		this.results = inResponse.photos.photo;
		this.$.list.show(this.results.length);
	},
	setupItem: function (inSender, inEvent) {
		return this.setupFlickrItem(inSender, inEvent);
	},
	setupFlickrItem: function (inSender, inEvent) {
		var i = inEvent.index,
			item = this.results[i];

		if (!item.url_m) {
			return true;
		}
		this.$.tile.setSource(item.url_m);
		this.$.tile.setCaption(item.title);
		this.$.tile.setSelected(this.$.list.isSelected(i));
		return true;
	},
	toggleChanged: function (inSender, inEvent) {
		if (inEvent.active) {
			this.$.toastpopup.hide();
			this.$.toastpopup.setContent('Toggle On!!');
			this.$.toastpopup.show();
		}
	},
	buttonTapped: function (inSender, inEvent) {
		this.$.toastpopup.hide();
		this.$.toastpopup.setContent(inEvent.originator.getContent() + ' pressed.');
		this.$.toastpopup.show();
	},
	appTapped: function (inSender, inEvent) {
		playFeedback();
		this.$.toastpopup.hide();
		this.$.toastpopup.setContent(this.results[inEvent.index].title + ' pressed.');
		this.$.toastpopup.show();
	},
	icTapped: function (inSender, inEvent) {
		playFeedback();
		this.$.toastpopup.hide();
		this.$.toastpopup.setContent(inEvent.originator.getClasses() + ' pressed.');
		this.$.toastpopup.show();
	}
});