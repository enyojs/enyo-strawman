require('garnet');

var
	kind = require('enyo/kind'),
	ri = require('enyo/resolution'),
	Collection = require('enyo/Collection.js'),
	EmptyBinding = require('enyo/EmptyBinding.js'),
	EnyoImage = require('enyo/Image'),
	DataGridList = require('garnet/DataGridList'),
	Panel = require('garnet/Panel'),
	Title = require('garnet/Title'),
	SelectionOverlaySupport = require('garnet/SelectionOverlaySupport');

var DataGridListImageItem = kind({
	name: 'g.sample.DataGridListImageItem',
	classes: 'g-sample-gridlist-imageitem',
	components: [{
		name: 'image',
		kind: EnyoImage
	}, {
		name: 'caption',
		classes: 'caption'
	}],
	published: {
		source: '',
		caption: '',
		selected: false
	},
	bindings: [{
		from: '.source',
		to: '.$.image.src'
	}, {
		from: '.caption',
		to: '.$.caption.content'
	}, {
		from: '.caption',
		to: '.$.caption.showing',
		kind: EmptyBinding
	}],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.selectedChanged();
		};
	}),
	selectedChanged: function() {
		this.addRemoveClass('selected', this.selected);
	},
	disabledChanged: function() {
		this.addRemoveClass('disabled', this.disabled);
	}
});

var DataGridListItem = kind({
	name: 'g.sample.DataGridListItem',
	kind: DataGridListImageItem,
	mixins: [SelectionOverlaySupport],
	selectionScrimIcon: {
		'w320': 'garnet/images/320/frame_check.png',
		'w360': 'garnet/images/360/frame_check.png'
	},
	selectionOverlayVerticalOffset: 0,
	selectionOverlayHorizontalOffset: 0,
	bindings: [{
		from: '.model.text',
		to: '.caption'
	}, {
		from: '.model.url',
		to: '.source'
	}]
});

var DataGridListCircleImageItem = kind({
	name: 'g.sample.DataGridListCircleImageItem',
	kind: DataGridListImageItem,
	classes: 'g-sample-gridlist-circle-imageitem'
});

var DataGridListCircleItem = kind({
	name: 'g.sample.DataGridListCircleItem',
	kind: DataGridListCircleImageItem,
	mixins: [SelectionOverlaySupport],
	selectionScrimIcon: {
		'w320': 'garnet/images/320/frame_check.png',
		'w360': 'garnet/images/360/frame_check.png'
	},
	selectionOverlayVerticalOffset: 0.5,
	selectionOverlayHorizontalOffset: 0,
	bindings: [{
		from: '.model.text',
		to: '.caption'
	}, {
		from: '.model.url',
		to: '.source'
	}]
});

var DataGridListPanel = kind({
	name: 'g.sample.DataGridListPanel',
	kind: Panel,
	knob: true,
	selection: false,
	classes: 'g-layout-absolute-wrapper',
	components: [{
		name: 'list',
		kind: DataGridList,
		controlsPerPage: 8,
		spacing: 0,
		classes: 'g-sample-gridlist-panel',
		headerComponents: [{kind: Title, content: 'Title: long text will fade out'}],
		components: [{
			kind: DataGridListItem
		}]
	}],
	bindings: [{
		from: '.collection',
		to: '.$.list.collection'
	}],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.$.list.set('selection', this.selection);
			this.$.list.set('selectionType', this.selectionType);
		};
	})
});

var DataGridListCirclePanel = kind({
	name: 'g.sample.DataGridListCirclePanel',
	kind: DataGridListPanel,
	components: [{
		name: 'list',
		kind: DataGridList,
		controlsPerPage: 8,
		spacing: 0,
		minHeight: 106,
		classes: 'g-sample-gridlist-panel',
		headerComponents: [{kind: Title, content: 'Title'}],
		components: [{
			kind: DataGridListCircleItem
		}]
	}]
});

var DataGridListSample = module.exports = kind({
	name: 'g.sample.DataGridListSample',
	classes: 'enyo-unselectable garnet g-sample',
	components: [
		{
			content: '< Data Grid List Sample',
			classes: 'g-sample-header',
			ontap: 'goBack'
		}, {
			content: 'Data Grid List', classes: 'g-sample-subheader'
		}, {
			name: 'gridListCircle',
			kind: DataGridListCirclePanel,
			classes: 'g-sample-panel-margin',
			selection: true,
			selectionType: 'multi'
		}, {
			name: 'gridListMulti',
			kind: DataGridListPanel,
			classes: 'g-sample-panel-margin',
			selection: true,
			selectionType: 'multi'
		}, {
			name: 'gridListSingleCircle',
			kind: DataGridListCirclePanel,
			classes: 'g-sample-panel-margin',
			selection: true
		}, {
			name: 'gridListSingle',
			kind: DataGridListPanel,
			classes: 'g-sample-panel-margin',
			selection: true
		}
	],
	bindings: [
		{from: '.collection', to: '.$.gridListMulti.collection'},
		{from: '.collection', to: '.$.gridListCircle.collection'},
		{from: '.collection', to: '.$.gridListSingleCircle.collection'},
		{from: '.collection', to: '.$.gridListSingle.collection'}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.set('collection', new Collection(this.generateRecords()));
		};
	}),
	generateRecords: function() {
		var
			records = [],
			idx = this.index || 0;
		for (; records.length < 500; ++idx) {
			var title = (idx % 8 === 0) ? ' with long title' : '';
			records.push({
				text: 'Item ' + idx + title,
				url: {
					'w320': '@../assets/320/photo.png',
					'w360': '@../assets/360/photo.png'
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

DataGridListSample.DataGridListPanel = DataGridListPanel;
