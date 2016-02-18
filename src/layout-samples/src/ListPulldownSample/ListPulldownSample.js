var
	kind = require('enyo/kind'),
	json = require('enyo/json');

var
	PulldownList = require('layout/PulldownList'),
	FittableRows = require('layout/FittableRows'),
	Ajax = require('enyo/Ajax'),
	Button = require('enyo/Button'),
	Img = require('enyo/Image'),
	Input = require('enyo/Input'),
	JsonpRequest = require('enyo/Jsonp');


module.exports = kind({
	name: 'enyo.sample.ListPulldownSample',
	classes: 'enyo-unselectable enyo-fit onyx',
	kind: FittableRows,
	components: [
		{classes: 'layout-sample-toolbar', components: [
			{label: 'label', components: [
				{name: 'searchInput', kind: Input, value: 'nature', placeholder: 'Enter seach term'},
				{kind: Img, src: '@../../assets/search-input-search.png', style: 'width: 20px;'}
			]},
			{kind: Button, content: 'search', ontap: 'search'}
		]},
		{name: 'list', kind: PulldownList, classes: 'list-sample-pulldown-list', fit: true, onSetupItem: 'setupItem', onPullRelease: 'pullRelease', onPullComplete: 'pullComplete', components: [
			{style: 'padding: 10px; height:70px', classes: 'list-sample-pulldown-item enyo-border-box', components: [
				{name: 'icon', kind: Img, style: 'float: left; width: 48px; height: 48px; padding: 0 10px 10px 0;'},
				{name: 'name', tag: 'span', style: 'font-weight: bold;'}
			]}
		]}
	],
	rendered: kind.inherit(function (sup) {
		return function() {
			sup.apply(this, arguments);
			this.search();
		};
	}),
	pullRelease: function () {
		this.pulled = true;
		// add 1 second delay so we can see the loading message
		setTimeout(this.bindSafely(function() {
			this.search();
		}), 1000);
	},
	pullComplete: function () {
		this.pulled = false;
		this.$.list.reset();
	},
	search: function () {
		// Capture searchText and strip any whitespace
		var searchText = this.$.searchInput.getValue().replace(/^\s+|\s+$/g, '');
		if (searchText === '') {
			// For whitespace searches, set new content value in order to display placeholder
			this.$.searchInput.setValue(searchText);
			return;
		}
		this.searchFlickr(searchText);
	},
	searchFlickr: function (searchText) {
		var params = {
			method: 'flickr.photos.search',
			format: 'json',
			api_key: '2a21b46e58d207e4888e1ece0cb149a5',
			per_page: 50,
			page: 0,
			text: searchText,
			sort: 'date-posted-desc',
			extras: 'url_m'
		}, url = 'https://api.flickr.com/services/rest/';
		if (window.location.protocol === 'ms-appx:') {
			params.nojsoncallback = 1;
			// Use ajax for platforms with no jsonp support (Windows 8)
			new Ajax({url: url, handleAs: 'text'})
				.response(this, 'processAjaxSearchResults')
				.go(params);
		} else {
			new JsonpRequest({url: url, callbackName: 'jsoncallback'})
				.response(this, 'processSearchResults')
				.go(params);
		}
	},
	processAjaxSearchResults: function (req, res) {
		res = json.parse(res);
		this.processSearchResults(req, res);
	},
	processSearchResults: function (req, res) {
		this.results = res.photos.photo;
		this.$.list.setCount(this.results.length);
		if (this.pulled) {
			this.$.list.completePull();
		} else {
			this.$.list.reset();
		}
	},
	setupItem: function (sender, ev) {
		var i = ev.index;
		var item = this.results[i];
		if (!item.url_m) {
			return true;
		}
		this.$.icon.setSrc(item.url_m);
		this.$.name.setContent(item.title);
		return true;
	}
});