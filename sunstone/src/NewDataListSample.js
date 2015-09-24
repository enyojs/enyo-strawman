var 
	kind = require('enyo/kind');

var 
	Collection = require('enyo/Collection'),
	Control = require('enyo/Control'),
	Img = require('enyo/Image');

var
	NewDataList = require('sunstone/NewDataList'),
	DataListSample = require('./DataListSample'),
	playFeedback = require('sunstone/feedback');

var ListItem = kind({
	kind: Control,
	classes: 'sun-list-item',
	handlers: {
		ondown: 'down',
		onup: 'up',
		onleave: 'up',
		ontap: 'tap',
		ongesturechange: 'up',
		ongestureend: 'up'
	},
	components: [
		{name: 'iconImage', kind: Img, sizing: 'cover', classes: 'icon-image'},
		{name: 'firstName', kind: Control, classes: 'name'}
	],
	bindings: [
		{from: '.model.imageSrc', to: '.$.iconImage.src'},
		{from: '.model.firstName', to: '.$.firstName.content'}
	],
	down: function (inSender, inEvent) {
		this.addClass('down');
	},
	up: function (inSender, inEvent) {
		this.removeClass('down');
	},
	tap: function (inSender, inEvent) {
		playFeedback();
	}
});

module.exports = kind({
	name: 'enyo.sample.NewDataListSample',
	kind: Control,
	classes: 'new-data-list-sample enyo-fit enyo-unselectable',
	components: [
		{name: 'repeater', kind: NewDataList, components: [{kind: ListItem}]}
	],
	bindings: [
		{from: '.collection', to: '.$.repeater.collection'}
	],
	populateList: function () {
		this.collection = new Collection(DataListSample.data);
	},
	create: kind.inherit(function (sup) {
		return function () {
			this.populateList();
			sup.apply(this, arguments);
		};
	})
});