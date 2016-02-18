var
	kind = require('enyo/kind');

var
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows'),
	List = require('layout/List'),
	Button = require('enyo/Button'),
	Component = require('enyo/Component'),
	Img = require('enyo/Image'),
	Input = require('enyo/Input'),
	JsonpRequest = require('enyo/Jsonp');

// A simple component to do a Flickr search.
var ListHorizontalFlickrSearch = kind({
	kind: Component,
	published: {
		searchText: ''
	},
	events: {
		onResults: ''
	},
	url: 'https://api.flickr.com/services/rest/',
	pageSize: 200,
	api_key: '2a21b46e58d207e4888e1ece0cb149a5',
	search: function (searchText, page) {
		this.searchText = searchText || this.searchText;
		var i = (page || 0) * this.pageSize;
		var params = {
			method: 'flickr.photos.search',
			format: 'json',
			api_key: this.api_key,
			per_page: this.pageSize,
			page: i,
			text: this.searchText
		};
		return new JsonpRequest({url: this.url, callbackName: 'jsoncallback'})
			.response(this, 'processResponse')
			.go(params);
	},
	processResponse: function (sender, res) {
		var photos = res.photos ? res.photos.photo || [] : [];
		for (var i=0, p; (p=photos[i]); i++) {
			var urlprefix = 'http://farm' + p.farm + '.static.flickr.com/' + p.server + '/' + p.id + '_' + p.secret;
			p.thumbnail = urlprefix + '_s.jpg';
			p.original = urlprefix + '.jpg';
		}
		this.doResults(photos);
		return photos;
	}
});

module.exports = kind({
	name: 'enyo.sample.ListHorizontalFlickrSample',
	classes: 'enyo-unselectable enyo-fit list-sample-flickr',
	components: [
		{kind: FittableRows, components: [
			{classes: 'layout-sample-toolbar', components: [
				{kind: FittableColumns, tag: 'label', style: 'width: 90%;', components: [
					{name: 'searchInput', fit: true, kind: Input, value: 'Japan', onchange: 'search'},
					{kind: Img, src: '@../../assets/search-input-search.png', style: 'width: 20px; height: 20px;'}
				]},
				{name: 'searchSpinner', kind: Img, src: '@../../assets/spinner.gif', showing: false}
			]},
			{kind: List, orient: 'h', fit: true, onSetupItem: 'setupItem', components: [
				{name: 'item', style: 'padding: 10px;', classes: 'list-sample-flickr-item enyo-border-box', ontap: 'itemTap', components: [
					{name: 'thumbnail', kind: Img, classes: 'list-sample-flickr-thumbnail'}
				]},
				{name: 'more', style: 'padding: 10px;position:absolute', classes: 'list-sample-flickr-more enyo-border-box', components: [
					{kind: Button, content: 'more',  ontap: 'more'},
					{name: 'moreSpinner', kind: Img, src: '@../../assets/spinner.gif', classes: 'list-sample-flickr-more-spinner'}
				]}
			]}
		]},
		{kind: ListHorizontalFlickrSearch, name: 'flickrSearch', onResults: 'searchResults'}
	],
	rendered: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.search();
		};
	}),
	search: function () {
		this.searchText = this.$.searchInput.getValue();
		this.page = 0;
		this.results = [];
		this.$.searchSpinner.show();
		this.$.flickrSearch.search(this.searchText);
	},
	searchResults: function (sender, results) {
		this.$.searchSpinner.hide();
		this.$.moreSpinner.hide();
		this.results = this.results.concat(results);
		this.$.list.setCount(this.results.length);
		if (this.page === 0) {
			this.$.list.reset();
		} else {
			this.$.list.refresh();
		}
		return true;
	},
	setupItem: function (sender, ev) {
		var i = ev.index;
		var item = this.results[i];
		this.$.item.addRemoveClass('onyx-selected', sender.isSelected(ev.index));
		this.$.thumbnail.setSrc(item.thumbnail);
		this.$.more.canGenerate = !this.results[i+1];
		return true;
	},
	more: function () {
        this.page++;
		this.$.moreSpinner.show();
        this.$.flickrSearch.search(this.searchText, this.page);
	},
	showList: function () {
		this.setIndex(0);
	}
});

module.exports.badgeClasses = 'new';
