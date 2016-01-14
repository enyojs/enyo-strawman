var
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	FittableRows = require('layout/FittableRows');

var
	Header = require('sunstone/Header'),
	List = require('sunstone/List'),
	Checkbox = require('sunstone/Checkbox'),
	playFeedback = require('sunstone/feedback');

module.exports = kind({
	name: 'sun.sample.ListBasicSample',
	kind: FittableRows,
	classes: 'enyo-fit enyo-unselectable',
	components: [
		{name: 'header', kind: Header, title:'Header'},
		{
			name: 'list',
			kind: List,
			classes: 'sun-list-sample',
			fit: true,
			reorderable: true,
			centerReorderContainer: false,
			count: 20,
			onSetupItem: 'setupItem',
			onReorder: 'listReorder',
			onSetupReorderComponents: 'setupReorderComponents',
			components: [
				{ondown: 'pressed', onup: 'unpressed', onrelease: 'unpressed', ondragout: 'unpressed', ontap: 'itemTapped', name: 'item', classes: 'list-item', components: [
					{name: 'name'},
					{name: 'checkbox', kind: Checkbox, onchange: 'checkboxChanged', ondown: 'checkboxDown'}
				]}
			],
			reorderComponents: [
				{name: 'reorderContent', classes: 'enyo-fit reorderDragger list-sample-item enyo-border-box', components: [
					{name: 'reorderName', style: 'display: inline-block;'},
					{name: 'reorderCheckbox', kind: Checkbox, style: 'clear: both; float: right'}
				]}
			]
		}
	],
	names: [],
	isPressed: false, // For preventing remained pressed state when user taps item with two-finger
	create: kind.inherit(function(sup) {
		return function() {
			var i;
			sup.apply(this, arguments);
			// make some mock data if we have none for this row
			for(i = 0; i < this.$.list.count; i++) {
				this.names.push({name: 'List Item ' + i, checked: false});
			}
		};
	}),
	checkboxDown: function (inSender, inEvent) {
		this._changing = inEvent.index;
    },
    checkboxChanged: function (inSender, inEvent) {
        this.names[this._changing].checked = this.$.checkbox.checked;
		this.$.list.lockRow();
	},
	listReorder: function (inSender, inEvent) {
		var movedItem = utils.clone(this.names[inEvent.reorderFrom]);
		var lastSelected = this.$.list.getSelection().lastSelected;

		this.names.splice(inEvent.reorderFrom, 1);
		this.names.splice((inEvent.reorderTo), 0, movedItem);

		if (this.$.list.isSelected(inEvent.reorderFrom)) { //reorder selected Item
			this.$.list.deselect(inEvent.reorderFrom);
			this.$.list.select(inEvent.reorderTo);
		} else if (this.$.list.isSelected(inEvent.reorderTo)) { //reorder to selected Item
			this.$.list.deselect(inEvent.reorderTo);
			if (inEvent.reorderFrom > inEvent.reorderTo) {
				this.$.list.select(inEvent.reorderTo + 1);
			} else {
				this.$.list.select(inEvent.reorderTo - 1);
			}
		} else { // when selected item is between reorderFrom and reorderTo
			if (inEvent.reorderFrom < lastSelected && inEvent.reorderTo > lastSelected) {
				this.$.list.select(lastSelected - 1);
			} else if (inEvent.reorderFrom > lastSelected && inEvent.reorderTo < lastSelected) {
				this.$.list.select(lastSelected + 1);
			}
		}
		this.$.list.refresh();
	},
	setupReorderComponents: function (inSender, inEvent) {
		var i = inEvent.index;

		if (!this.names[i]) {
			return;
		}
		var n = this.names[i];
		this.$.reorderName.setContent(n.name);
		this.$.reorderCheckbox.setChecked(n.checked);
	},
	setupItem: function (inSender, inEvent) {
		// this is the row we're setting up
		var i = inEvent.index;
		var n = this.names[i];
		// apply selection style if inSender (the list) indicates that this row is selected.
		this.$.item.addRemoveClass('list-sample-selected', inSender.isSelected(i));
		this.$.item.removeClass('pressed'); // For Preventing pressed state when page is generated.
		this.$.name.setContent(n.name);
		this.$.checkbox.setChecked(n.checked);
		return true;
	},
	pressed: function (inSender, e) {
		if (!this.isPressed) {
			this.isPressed = true;
			this.$.list.lockRow();
			this.$.list.prepareRow(e.index);
			inSender.addClass('pressed');
			if (e.originator instanceof Checkbox) {
				this.waterfallDown('ondown', e, inSender);
			}
		}
	},
	unpressed: function (inSender, e) {
		inSender.removeClass('pressed');
		if (!(e.originator instanceof Checkbox)) {
			this.$.list.lockRow();
		}
		this.isPressed = false;
	},
	itemTapped: function (inSender, e) {
		if (!(e.originator instanceof Checkbox)) {
			playFeedback();
		}
	}
});
