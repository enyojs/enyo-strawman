var
	kind = require('enyo/kind'),
	dom = require('enyo/dom'),
	cap = require('enyo/utils').cap;

var
	BackgroundTaskManager = require('enyo/BackgroundTaskManager'),
	Button = require('enyo/Button'),
	Control = require('enyo/Control'),
	Popup = require('enyo/Popup'),
	Priorities = require('enyo/PriorityQueue').Priorities,
	TaskManagerSupport = require('enyo/TaskManagerSupport');

var
	screenHeight = dom.getWindowHeight();

var Tower = kind({
	kind: Control,
	classes: 'tower',
	mixins: [TaskManagerSupport],
	height: 0,
	towerIndex: 0,
	towerIncrement: 50,
	addBlock: function (important) {
		if (this.height + this.towerIncrement > screenHeight) { // no more room in the current tower
			if (this.nextTower) { // let's try adding blocks to the next tower
				return BackgroundTaskManager.getCustomer(this.nextTower).addBlock(important);
			} else { // no more towers = no more space for blocks!
				return false;
			}
		} else { // we still have room in the current tower
			this.createComponent({
				kind: Control,
				classes: 'block' + (important ? ' important' : ''),
				style: 'height:' + this.towerIncrement + 'px; bottom:' + this.height + 'px',
				content: important ? 'Support Beam' : ''
			});
			this.height += this.towerIncrement;
			this.render();

			return true;
		}
	},
	clear: function () {
		this.destroyClientControls();
		this.height = 0;
	}
});

var TowerA = kind({
	kind: Tower,
	classes: 'left',
	managerName: 'towerA',
	nextTower: 'towerB'
});

var TowerB = kind({
	kind: Tower,
	classes: 'middle',
	managerName: 'towerB',
	nextTower: 'towerC'
});

var TowerC = kind({
	kind: Tower,
	classes: 'right',
	managerName: 'towerC'
});

module.exports = kind({
	classes: 'background-task-manager-sample',
	queuedBlocks: 0,
	queuedBeams: 0,
	queuedBlockLimit: 5,
	wastedBlocks: 0,
	wastedBeams: 0,
	components: [
		{kind: Popup, name: 'popupModal', classes: 'tower-popup', modal: true, autoDismiss: false, centered: true, floating: true, scrim: true, components: [
			{content: 'Add blocks to build the towers. Each block to be added will be placed into a queue, '
				+ 'so that the tower building process is not interrupted. Don\'t forget to add support beams '
				+ 'once in a while. If you forget and have queued up a number of blocks to be added, adding '
				+ 'a support beam will take priority over adding blocks.'},
			{kind: Button, content: 'Got it!', ontap: 'closeModalTapped'}
		]},
		{kind: Popup, name: 'popupWarning', classes: 'tower-popup', centered: true, components: [
			{content: 'Your tower is becoming structurally compromised! Add a support beam now.'},
			{kind: Button, content: 'Add Support', ontap: 'addBeamPopupTapped'}
		]},
		{name: 'towerA', kind: TowerA},
		{name: 'towerB', kind: TowerB},
		{name: 'towerC', kind: TowerC},
		{name: 'info', kind: Control, classes: 'info', components: [
			{name: 'actions', kind: Control, components: [
				{name: 'buttonAddTask', kind: Button, content: 'Add Block', ontap: 'addBlockTapped'},
				{name: 'buttonAddImportantTask', kind: Button, content: 'Add Support', ontap: 'addBeamTapped'},
				{name: 'buttonClear', kind: Button, content: 'Clear', ontap: 'clearTapped'}
			]},
			{kind: Control, components: [
				{name: 'queuedBlocks', kind: Control},
				{name: 'queuedBeams', kind: Control}
			]},
			{kind: Control, components: [
				{name: 'wastedBlocks', kind: Control},
				{name: 'wastedBeams', kind: Control}
			]}
		]}
	],
	bindings: [
		{from: 'queuedBlocks', to: '$.queuedBlocks.content', unit: 'queued block', transform: 'transformWithUnits'},
		{from: 'queuedBeams', to: '$.queuedBeams.content', unit: 'queued beam', transform: 'transformWithUnits'},
		{from: 'wastedBlocks', to: '$.wastedBlocks.content', unit: 'wasted block', transform: 'transformWithUnits'},
		{from: 'wastedBeams', to: '$.wastedBeams.content', unit: 'wasted beam', transform: 'transformWithUnits'}
	],
	rendered: kind.inherit(function (sup) {
		return function () {
			this.$.popupModal.set('showing', true);
		};
	}),
	handleResize: function () {
		screenHeight = dom.getWindowHeight();
	},
	addBlockTapped: function () {
		this.addElement('block');

		if (this.queuedBlocks >= this.queuedBlockLimit) {
			this.$.popupWarning.set('showing', true);
		}

		return true;
	},
	addBeamTapped: function () {
		this.addElement('beam', true);
		return true;
	},
	addBeamPopupTapped: function () {
		this.addBeamTapped();
		this.$.popupWarning.set('showing', false);
	},
	addElement: function (type, important) {
		var cappedType = cap(type) + 's',
			decrementQueued = this.bindSafely(this['decrementQueued' + cappedType]),
			incrementWasted = this.bindSafely(this['incrementWasted' + cappedType]);

		this.set('queued' + cappedType, this['queued' + cappedType] + 1);

		this.$.towerA.addTask(function () {
			if (!this.addBlock(important)) {
				incrementWasted();
			}
			decrementQueued();
		}, important ? Priorities.SOON : null);
	},
	closeModalTapped: function(inSender, inEvent) {
		this.$.popupModal.set('showing', false);
		return true;
	},
	transformWithUnits: function (value, direction, binding) {
		return value + ' ' + binding.unit + (value == 1 ? '' : 's');
	},
	decrementQueuedBlocks: function () {
		this.set('queuedBlocks', this.queuedBlocks - 1);
	},
	decrementQueuedBeams: function () {
		this.set('queuedBeams', this.queuedBeams - 1);
	},
	incrementWastedBlocks: function () {
		this.set('wastedBlocks', this.wastedBlocks + 1);
	},
	incrementWastedBeams: function () {
		this.set('wastedBeams', this.wastedBeams + 1);
	},
	clearTapped: function () {
		this.$.towerA.clear();
		this.$.towerB.clear();
		this.$.towerC.clear();
	}
});
