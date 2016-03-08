var
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	FittableLayout = require('layout/FittableLayout'),
	FittableRows = require('layout/FittableRows'),
	Slideable = require('layout/Slideable'),
	FittableColumnsLayout = FittableLayout.Columns,
	FittableRowsLayout = FittableLayout.Rows,
	Control = require('enyo/Control');

var SlideableInfo = kind({
	kind: Control,
	published: {
		info: null
	},
	components: [
		{kind: FittableRows, classes: 'slideableinfo-sample', components: [
			{name: 'name'},
			{name: 'axis'},
			{name: 'unit'},
			{name: 'min'},
			{name: 'max'},
			{name: 'value'}
		]}
	],
	handlers: {
		onUpdateInfo: 'updateInfo'
	},
	create: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			this.infoChanged();
		};
	}),
	infoChanged: function () {
		for (var p in this.info) {
			if (this.$[p]) {
				this.$[p].setContent(utils.cap(p) + ': ' + this.info[p]);
			}
		}
	},
	updateInfo: function (sender, ev) {
		this.setInfo(ev);
		return true;
	}
});

module.exports = kind({
	name: 'enyo.sample.SlideableSample',
	classes: 'enyo-unselectable enyo-fit',
	style: 'overflow: hidden; background-color: #000;',
	components: [
		{name: 'top', kind: Slideable, axis: 'v', unit: '%', min: -90, max: 0, classes: 'enyo-fit slideable-sample top', onChange: 'updateInfo'},
		{name: 'right', kind: Slideable, axis: 'h', unit: '%', min: 0, max: 90, classes: 'enyo-fit slideable-sample right', onChange: 'updateInfo'},
		{name: 'bottom', kind: Slideable, axis: 'v', unit: '%', min: 0, max: 90, classes: 'enyo-fit slideable-sample bottom', onChange: 'updateInfo'},
		{name: 'left', kind: Slideable, axis: 'h', unit: '%', min: -90, max: 0, classes: 'enyo-fit slideable-sample left', onChange: 'updateInfo'}
	],
	handlers: {
		ondragstart: 'suppressPanelDrag'
	},
	create: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			var slideables = [];

			for (var c in this.$) {
				if (this.$[c].kind === 'Slideable') {
					slideables.push(this.$[c]);
				}
			}
			this.populate(slideables);
		};
	}),
	populate: function (slideables) {
		var slideable;
		for (var i = 0; i < slideables.length; i++) {
			slideable = slideables[i];
			slideable.createComponents([
				{style: slideable.axis === 'h' ? 'height: 38%;' : ''}, // cheating here for the horizontal Slideables to make everything nice and (almost) centered vertically
				{
					kind: SlideableInfo,
					layoutKind: (slideable.axis === 'v') ? FittableColumnsLayout : FittableRowsLayout,
					classes: 'enyo-center', // cheating here for the vertical Slideables to make everything nice and centered horizontally (no effect on horizontal Slideables)
					info: {
						name: slideable.name,
						axis: slideable.axis,
						unit: slideable.unit,
						min: slideable.min,
						max: slideable.max,
						value: slideable.value
					}
				}
			]);
		}
	},
	updateInfo: function (sender) {
		sender.waterfallDown('onUpdateInfo', {
			name: sender.name,
			axis: sender.axis,
			unit: sender.unit,
			min: sender.min,
			max: sender.max,
			value: Math.round(sender.value)
		});
		return true;
	},
	// keeps the view panel from moving in Sampler app while dragging the Slideable
	suppressPanelDrag: function () {
		return true;
	}
});