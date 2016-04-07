var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows');

var
	Button = require('sunstone/Button'),
	CheckboxItem = require('sunstone/CheckboxItem'),
	Scroller = require('sunstone/Scroller'),
	ToastPopup = require('sunstone/ToastPopup');

module.exports = kind({
	name: 'sun.sample.DeleteDataSample',
	kind: FittableRows,
	classes: 'deletedata-sample enyo-unselectable enyo-fit',
	components: [
		{classes: 'checkbox-sample-header', components: [
			{name: 'AllCheck', kind: CheckboxItem, classes: 'checkbox-sample-header-allCheck', content: 'Delete All', onchange: 'itemChanged'},
			{name: 'selectedCount', classes: 'checkbox-sample-checked-count'}
		]},
		{name: 'checkboxList' , kind: Scroller, fit: true, classes: 'settingList', components: [
			{classes: 'general-index', content: 'DAILY SUMMARY'},
			{name: 'AllLog', kind: CheckboxItem, classes: 'checkbox-sample', content: 'All log', onchange: 'itemChanged'},
			{classes: 'general-index', content: 'EXERCISE'},
			{name: 'TrackList', kind: CheckboxItem, classes: 'checkbox-sample', content: 'Track list', onchange: 'itemChanged'},
			{classes: 'general-index', content: 'COUNTER'},
			{name: 'Sit-up', kind: CheckboxItem, classes: 'checkbox-sample', content: 'Sit-up', onchange: 'itemChanged'},
			{classes: 'divider'},
			{name: 'Squat', kind: CheckboxItem, classes: 'checkbox-sample', content: 'Squat', onchange: 'itemChanged'},
			{classes: 'divider'},
			{name: 'Dumbbell', kind: CheckboxItem, classes: 'checkbox-sample', checked: true, content: 'Dumbbell', onchange: 'itemChanged'},
			{classes: 'divider'},
			{name: 'JumpRope', kind: CheckboxItem, classes: 'checkbox-sample', checked: true, content: 'Jump rope', onchange: 'itemChanged'},
			{classes: 'divider'}
		]},
		{classes: 'checkbox-table', style: 'width: 100%', components: [
			{classes: 'checkbox-table-cell', components: [
				{name: 'cancel', kind: Button, content: 'cancel', style: 'width: 100%; height: 100%;', ontap: 'buttonTapped'}
			]},
			{classes: 'checkbox-table-cell', style: 'width: 1px', components: [
				{classes: 'button-divider'}
			]},
			{classes: 'checkbox-table-cell', components: [
				{name: 'ok', kind: Button, content: 'ok', style: 'width: 100%; height: 100%;', ontap: 'buttonTapped'}
			]}
		]},
		{name: 'toastpopup', kind: ToastPopup, showDuration: 2000, content: 'Hello toastpopup!'}
	],
	rendered: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.setCheckCount();
		};
	}),
	itemChanged: function (inSender, inEvent) {
		if (inEvent.originator.parent && inEvent.originator.parent.name == 'AllCheck') {
			var isCheck = inEvent.originator.checked,
				checkboxlist = this.$.checkboxList.getClientControls(),
				i = 0;
			for (; i < checkboxlist.length; i++) {
				if (checkboxlist[i] instanceof CheckboxItem) {
					checkboxlist[i].setChecked(isCheck);
				}
			}
		}
		this.setCheckCount();
		this.$.toastpopup.hide();
		if (inEvent.originator.checked === true) {
			this.$.toastpopup.setContent(inSender.name + ' checked.');
		} else {
			this.$.toastpopup.setContent(inSender.name + ' unchecked.');
		}
		this.$.toastpopup.show();

	},
	buttonTapped: function (inSender, inEvent) {
		this.$.toastpopup.hide();
		if (inSender.name === 'cancel') {
			this.$.toastpopup.setContent('cancel');
		} else if (inSender.name === 'ok') {
			this.$.toastpopup.setContent('delete data..');
		}
		this.$.toastpopup.show();
	},
	setCheckCount: function() {
		var controlList = this.$.checkboxList.getClientControls(),
			result = 0,
			i = 0;
		for (; i < controlList.length; i++) {
			if (controlList[i] instanceof CheckboxItem) {
				if ( controlList[i].getChecked() ) {
					result++;
				}
			}
		}
		if (result > 0) {
			this.$.selectedCount.setContent(result + ' selected');
		} else {
			this.$.selectedCount.setContent('');
		}
	}
});