var
	enyo = require('enyo'),
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	dom = require('enyo/dom.js'),
	ri = require('enyo/resolution'),
	Collection = require('enyo/Collection.js'),
	EmptyBinding = require('enyo/EmptyBinding.js'),
	Image = require('enyo/Image'),

	g = require('garnet'),
	g_ri = require('garnet/resolution'),
	DataGridList = require('garnet/DataGridList'),
	Panel = require('garnet/Panel'),
	SelectionOverlaySupport = require('garnet/SelectionOverlaySupport');

var DataGridListSampleImageItem = kind({
	name: "g.DataGridListSampleImageItem",
	classes: "g-sample-gridlist-imageitem",
	components: [{
		name: "image",
		kind: Image
	}, {
		name: "caption",
		classes: "caption"
	}],
	published: {
		source: "",
		caption: "",
		selected: false
	},
	bindings: [{
		from: ".source",
		to: ".$.image.src"
	}, {
		from: ".caption",
		to: ".$.caption.content"
	}, {
		from: ".caption",
		to: ".$.caption.showing",
		kind: EmptyBinding
	}],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.selectedChanged();
		};
	}),
	selectedChanged: function() {
		this.addRemoveClass("selected", this.selected);
	},
	disabledChanged: function() {
		this.addRemoveClass("disabled", this.disabled);
	}
});

kind({
	name: "g.sample.DataGridListSampleItem",
	kind: DataGridListSampleImageItem,
	mixins: [SelectionOverlaySupport],
	selectionScrimIcon: {
		"w320": "garnet/images/320/frame_check.png",
		"w360": "garnet/images/360/frame_check.png"
	},
	selectionOverlayVerticalOffset: 0,
	selectionOverlayHorizontalOffset: 0,
	bindings: [{
		from: ".model.text",
		to: ".caption"
	}, {
		from: ".model.url",
		to: ".source"
	}]
});

var DataGridListSampleCircleImageItem = kind({
	name: "DataGridListSampleCircleImageItem",
	kind: DataGridListSampleImageItem,
	classes: "g-sample-gridlist-circle-imageitem"
});

kind({
	name: "g.sample.DataGridListSampleCircleItem",
	kind: DataGridListSampleCircleImageItem,
	mixins: [SelectionOverlaySupport],
	selectionScrimIcon: {
		"w320": "garnet/images/320/frame_check.png",
		"w360": "garnet/images/360/frame_check.png"
	},
	selectionOverlayVerticalOffset: 0.5,
	selectionOverlayHorizontalOffset: 0,
	bindings: [{
		from: ".model.text",
		to: ".caption"
	}, {
		from: ".model.url",
		to: ".source"
	}]
});

var DataGridListPanel = kind({
	name: "g.sample.DataGridListPanel",
	kind: Panel,
	title: true,
	titleContent: "Title",
	knob: true,
	selection: false,
	multipleSelection: false,
	classes: "g-layout-absolute-wrapper",
	style: "background-color: #000000;",
	components: [{
		name: "list",
		kind: DataGridList,
		controlsPerPage: 8,
		spacing: 0,
		style: "width: " + ri.scale(232) + "px; height: " + ri.scale(320) + "px; margin: auto; background-color: #000000;",
		components: [{
			kind: "g.sample.DataGridListSampleItem"
		}]
	}],
	bindings: [{
		from: ".collection",
		to: ".$.list.collection"
	}],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.$.list.set("selection", this.selection);
			this.$.list.set("multipleSelection", this.multipleSelection);
		};
	})
});

kind({
	name: "g.sample.DataGridListCirclePanel",
	kind: DataGridListPanel,
	components: [{
		name: "list",
		kind: DataGridList,
		controlsPerPage: 8,
		spacing: 0,
		minHeight: 106,
		style: "width: " + ri.scale(230) + "px; height: " + ri.scale(320) + "px; margin: auto; background-color: #000000;",
		components: [{
			kind: "g.sample.DataGridListSampleCircleItem"
		}]
	}]
});

module.exports = kind({
	name: "g.sample.DataGridListSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{
			content: "< Data Grid List Sample",
			classes: "g-sample-header",
			ontap: "goBack"
		}, {
			content: "Data Grid List", classes: "g-sample-subheader"
		}, {
			name: "gridListCircle",
			kind: "g.sample.DataGridListCirclePanel",
			style: "position: relative; display: inline-block; margin-right: " + ri.scale(20) + "px;",
			selection: true,
			multipleSelection: true
		}, {
			name: "gridListMulti",
			kind: DataGridListPanel,
			style: "position: relative; display: inline-block; margin-right: " + ri.scale(20) + "px;",
			selection: true,
			multipleSelection: true
		}, {
			name: "gridListSingleCircle",
			kind: "g.sample.DataGridListCirclePanel",
			style: "position: relative; display: inline-block; margin-right: " + ri.scale(20) + "px;",
			selection: true
		}, {
			name: "gridListSingle",
			kind: DataGridListPanel,
			style: "position: relative; display: inline-block; margin-right: " + ri.scale(20) + "px;",
			selection: true
		}
	],
	bindings: [
		{from: ".collection", to: ".$.gridListMulti.collection"},
		{from: ".collection", to: ".$.gridListCircle.collection"},
		{from: ".collection", to: ".$.gridListSingleCircle.collection"},
		{from: ".collection", to: ".$.gridListSingle.collection"}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.set("collection", new Collection(this.generateRecords()));
		};
	}),
	generateRecords: function() {
		var records = [],
			idx = this.index || 0;
		for (; records.length < 500; ++idx) {
			var title = (idx % 8 === 0) ? " with long title" : "";
			records.push({
				text: "Item " + idx + title,
				url: {
					"w320": "@../assets/320/photo.png",
					"w360": "@../assets/360/photo.png"
				}
			});
		}
		// update our internal index so it will always generate unique values
		this.index = idx;
		return records;
	},
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});
