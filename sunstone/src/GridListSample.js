var
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	FittableRows = require('layout/FittableRows');

var
	GridList = require('sunstone/GridList'),
	GridListImageItem = require('sunstone/GridListImageItem'),
	playFeedback = require('sunstone/feedback'),
	Header = require('sunstone/Header');

module.exports = kind({
	name: "enyo.sample.GridListSample",
	kind: FittableRows,
	classes: "enyo-unselectable enyo-fit",
	components: [
		{kind: Header, title:"Header"},
		{fit:true, classes:"watch-wrapper", components:[
			{
				name: "list",
				kind: GridList,
				reorderable: true,
				onReorder: "listReorder",
				onSetupReorderComponents: "setupReorderComponents",
				onSetupItem: "setupItem",
				count: 20,
				components: [
					{ondown: "pressed", onup:"unpressed", ondragout: "unpressed", ontap: "itemTapped", name: "tile", kind: GridListImageItem, source: "@../assets/default-music.png"}
				],
				reorderComponents: [
					{name: "reorderContent", classes: "enyo-fit reorderDragger", components: [
						{name: "reorderTile", kind: GridListImageItem}
					]}
				]
			}
		]}
	],
	names: [],
	isPressed: false, // For preventing remained pressed state when user taps item with two-finger
	create: kind.inherit(function (sup) {
		return function () {
			sup.apply(this, arguments);
			// make some mock data if we have none for this row
			var i = 0;
			for (; i < this.$.list.count; i++) {
				this.names.push({name:"Item " + i});
			}
		};
	}),
	rendered: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.$.list.setItemWidth(76);
			this.$.list.setItemHeight(110);
			this.$.list.setItemSpacing(14);
		};
	}),
	listReorder: function(inSender, inEvent) {
		var movedItem = utils.clone(this.names[inEvent.reorderFrom]);
		var lastSelected = this.$.list.getSelection().lastSelected;

		this.names.splice(inEvent.reorderFrom,1);
		this.names.splice((inEvent.reorderTo),0,movedItem);

		if(this.$.list.isSelected(inEvent.reorderFrom)) { //reorder selected Item
			this.$.list.deselect(inEvent.reorderFrom);
			this.$.list.select(inEvent.reorderTo);
		}else if(this.$.list.isSelected(inEvent.reorderTo)) { //reorder to selected Item
			this.$.list.deselect(inEvent.reorderTo);
			if(inEvent.reorderFrom > inEvent.reorderTo) {
				this.$.list.select(inEvent.reorderTo+1);
			}else {
				this.$.list.select(inEvent.reorderTo-1);
			}
		}else { // when selected item is between reorderFrom and reorderTo
			if(inEvent.reorderFrom < lastSelected && inEvent.reorderTo > lastSelected) {
				this.$.list.select(lastSelected-1);
			}else if(inEvent.reorderFrom > lastSelected && inEvent.reorderTo < lastSelected) {
				this.$.list.select(lastSelected+1);
			}
		}
		this.$.list.refresh();
	},
	setupReorderComponents: function(inSender, inEvent) {
		var i = inEvent.index;
		if (!this.names[i]) {
			return;
		}
		var item = this.names[i];
		this.$.reorderTile.setSource("@../assets/default-music.png");
		this.$.reorderTile.setCaption(item.name);
		this.$.reorderTile.setSelected(this.$.list.isSelected(i));
	},
	setupItem: function(inSender, inEvent) {
		var i = inEvent.index,
			item = this.names[i];
		this.$.tile.setCaption(item.name);
		this.$.tile.setSelected(this.$.list.isSelected(i));
		return true;
	},
	pressed: function(inSender, inEvent) {
		if (!this.isPressed) {
			this.$.list.lockRow();
			this.$.list.prepareRow(inEvent.index);
			inSender.addClass('pressed');
			this.isPressed = true;
		}
	},
	unpressed: function(inSender, inEvent) {
		inSender.removeClass('pressed');
		this.$.list.lockRow();
		this.isPressed = false;
	},
	itemTapped: function() {
		playFeedback();
	}
});
