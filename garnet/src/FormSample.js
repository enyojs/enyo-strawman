require('garnet');

var
	kind               = require('enyo/kind'),
	ri                 = require('enyo/resolution'),
	Collection         = require('enyo/Collection.js'),
	Title              = require('garnet/Title'),
	IconButton         = require('garnet/IconButton'),
	FormButton         = require('garnet/FormButton'),
	FormInput          = require('garnet/FormInput'),
	FormInputDecorator = require('garnet/FormInputDecorator'),
	FormLabel          = require('garnet/FormLabel'),
	FormPickerButton   = require('garnet/FormPickerButton'),
	FormToolDecorator  = require('garnet/FormToolDecorator'),
	Panel              = require('garnet/Panel'),
	Scroller           = require('garnet/Scroller'),
	TimePickerPanel    = require('garnet/TimePickerPanel'),
	DatePickerPanel    = require('garnet/DatePickerPanel'),
	PickerPanel        = require('garnet/PickerPanel'),
	MultiPickerPanel   = require('garnet/MultiPickerPanel'),
	PanelManager       = require('garnet/PanelManager'),

	panelStyle = 'width: ' + ri.scale(320) + 'px; height: ' + ri.scale(320) + 'px; position: relative; display: inline-block;';

var Formatter = kind.singleton({
	name: 'g.sample.Formatter',
	/*
	* From TimePickerPanel.value to FormPickerButton.content
	*/
	TimePickerPanel: function(val) {
		var timestr;

		if (val.hour < 10 && val.hour > 0) {
			timestr = '0' + val.hour;
		} else if (val.hour === 0) {
			timestr = '12';
		} else {
			timestr = val.hour;
		}
		timestr += ':';
		if (val.minute < 10 && val.minute >= 0) {
			timestr += '0';
		}
		timestr += val.minute;
		timestr += ' ';
		timestr += val.meridiem;

		return timestr;
	},

	/*
	* From TimePickerPanel.value to FormPickerButton.content 24hour
	*/
	TimePickerPanel24: function(val) {
		var timestr;

		if (val.hour < 10 && val.hour > 0) {
			timestr = '0' + val.hour;
		} else {
			timestr = val.hour;
		}
		timestr += ':';
		if (val.minute < 10 && val.minute >= 0) {
			timestr += '0';
		}
		timestr += val.minute;

		return timestr;
	},

	/*
	* From datePicker.value to FormPickerButton.content
	*/
	DatePickerPanel: function(val) {
		return (val.getYear() + 1900) + '/' + (val.getMonth() + 1) + '/' + val.getDate();
	},
	/*
	* From pickerPanel.value to FormPickerButton.content
	*/
	CollectionPickerPanel: function(val, data) {
		var
			item = val,
			name = 'No item';

		if (typeof val === 'number') {
			return data[val].item;
		}
		if (item !== null && item !== undefined) {
			name = item.attributes.item;
		}

		return name;
	},
	/*
	* From multiPickerPanel.value to FormPickerButton.content
	*/
	CollectionMultiPickerPanel: function(val, data) {
		var
			items = val,
			names = '',
			i;

		if (val instanceof Array) {
			var multipleSelection = [];

			for (var i = 0; i <val.length; i++) {
				multipleSelection[i] = data[val[i]].item;
			}
			return multipleSelection.join(', ');
		}
		if (items !== null && items !== undefined && items.length > 0) {
			for (i = 0; i < items.length; i++) {
				names += ', ' + items[i].attributes.item;
			}
			names = names.slice(2);
		} else {
			names = 'No items';
		}

		return names;
	}
});

var SampleTimePickerPanel = kind({
	name: 'g.sample.CurrentTimePickerPanel',
	kind: TimePickerPanel,
	valueChanged: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			if (this.fromPanel) {
				this.fromPanel.triggerHandler('onUpdate', {
					name: this.name,
					hour: this.getHourValue(),
					minute: this.getMinuteValue(),
					meridiem: this.getMeridiemValue()
				});
			}			
		};
	})
});

var CollectionPickerPanel = kind({
	name: 'g.sample.CollectionPickerPanel',
	kind: PickerPanel,
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.collection = new Collection(this.app.data);
		};
	})
});

var CollectionMultiPickerPanel = kind({
	name: 'g.sample.CollectionMultiPickerPanel',
	kind: MultiPickerPanel,
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.collection = new Collection(this.app.data);
		};
	})
});

var
	panels = {
		timePickerButton:                {name: 'timePicker', kind: SampleTimePickerPanel, meridiemValue: '24'},
		timePickerButtonWithValue:       {name: 'timePickerWithValue', kind: SampleTimePickerPanel},
		datePickerButton:                {name: 'datePicker', kind: DatePickerPanel},
		datePickerButtonWithValue:       {name: 'datePickerWithValue', kind: DatePickerPanel},
		pickerPanelButton:               {name: 'pickerPanel', kind: CollectionPickerPanel, title:true, titleContent: 'PickerTitle', ontap: 'hidePickerPanelPopup'},
		pickerPanelButtonWithValue:      {name: 'pickerPanelWithValue', kind: CollectionPickerPanel, title:true, titleContent: 'PickerTitle',ontap: 'hidePickerPanelPopupWithValue'},
		multiPickerPanelButton:          {name: 'multiPickerPanel', kind: CollectionMultiPickerPanel, title:true, titleContent: 'MultiPickerTitle', style: 'position: relative; display: inline-block; margin-right: 20px;', selection: true, multipleSelection: true},
		multiPickerPanelButtonWithValue: {name: 'multiPickerPanelWithValue', kind: CollectionMultiPickerPanel, title:true, titleContent: 'MultiPickerTitle', style: 'position: relative; display: inline-block; margin-right: 20px;', selection: true, multipleSelection: true}
	},

	today = new Date(),

	defaults = {
		timePickerButton: {hour: today.getHours(), meridiem: '', minute: today.getMinutes()},
		timePickerButtonWithValue: {hour: 12, meridiem: "PM", minute: 30},
		datePickerButton: new Date(),
		datePickerButtonWithValue: new Date('2014/1/1'),
		pickerPanelButtonWithValue: 0,
		multiPickerPanelButtonWithValue: [0, 1]
	};

var FormPanel = kind({
	name: 'g.sample.FormPanel',
	kind: Panel,
	events: {
		onResult: ''
	},
	handlers: {
		onCancel: 'tapCancel',
		onOK: 'tapOK',
		ontap: 'tapOK',
		onUpdate: 'updateContent'
	},
	style: 'position: relative; background-color: #000000;overflow: hidden;',
	classes: 'g-common-width-height-fit g-layout-absolute-wrapper',
	components: [
		{classes: 'g-common-width-height-fit', style: 'overflow: hidden;', components: [
			{kind: Scroller, scrollIndicatorEnabled: true, style: 'width: ' + ri.scale(320) + 'px; height: ' + ri.scale(320) + 'px; border-radius: 50%; background-color: #000000;', components: [
				{kind: Title, content: 'Title: long text will fade out'},
				//
				{kind: FormLabel, content: 'Form Picker Buttons : <br>> Time Picker - current', allowHtml: 'true'},
				{name: 'timePickerButton', kind: FormPickerButton, ontap: 'showPanel'},
				{kind: FormLabel, content: '> Time Picker : initValue'},
				{name: 'timePickerButtonWithValue', kind: FormPickerButton, ontap: 'showPanel'},
				//
				{kind: FormLabel, content: '> Date Picker : current'},
				{name: 'datePickerButton', kind: FormPickerButton, ontap: 'showPanel'},
				{kind: FormLabel, content: '> Date Picker : initValue'},
				{name: 'datePickerButtonWithValue', kind: FormPickerButton, ontap: 'showPanel'},
				//
				{kind: FormLabel, content: '> PickerPanel : none'},
				{name: 'pickerPanelButton', kind: FormPickerButton, ontap: 'showPanel'},
				{kind: FormLabel, content: '> PickerPanel : initValue'},
				{name: 'pickerPanelButtonWithValue', kind: FormPickerButton, ontap: 'showPanel'},
				//
				{kind: FormLabel, content: '> MultiPickerPanel : none'},
				{name: 'multiPickerPanelButton', kind: FormPickerButton, ontap: 'showPanel'},
				{kind: FormLabel, content: '> MultiPickerPanel : initValue'},
				{name: 'multiPickerPanelButtonWithValue', kind: FormPickerButton, ontap: 'showPanel'},
				//
				{kind: FormLabel, content: 'Form Buttons'},
				{kind: FormButton, content: '+Add new'},
				{kind: FormToolDecorator, components: [
					{kind: FormButton, content: 'Special', style: 'width: ' + ri.scale(118) + 'px; margin-right: ' + ri.scale(4) + 'px; font-size: ' + ri.scale(20) + 'px;'},
					{kind: FormButton, content: '+Add new', style: 'width: ' + ri.scale(120) + 'px; font-size: ' + ri.scale(20) + 'px;'}
				]},
				//
				{kind: FormLabel, content: 'Form Inputs'},
				{kind: FormInputDecorator, components: [
					{kind: FormInput, disabled: true, value: 'disabled'}
				]},
				{kind: FormInputDecorator, components: [
					{kind: FormInput, value: 'Guide Text'}
				]},
				{kind: FormToolDecorator, components: [
					{kind: FormInputDecorator, style: 'width: ' + ri.scale(185) + 'px; margin-right: ' + ri.scale(6) + 'px;', components: [
						{kind: FormInput, value: 'Guide Text'}
					]},
					{kind: IconButton, src: '@../assets/btn_ic_deleted.svg', classes: 'g-common-button-size-small'}
				]},
				{style: 'width: 100%; height: ' + ri.scale(70) + 'px;'}
			]}
		]}
	],
	initComponents: kind.inherit(function(sup) {
		return function() {

			sup.apply(this, arguments);
			this.$.timePickerButton.setContent(Formatter.TimePickerPanel24(defaults.timePickerButton));
			this.$.timePickerButtonWithValue.setContent(Formatter.TimePickerPanel(defaults.timePickerButtonWithValue));
			this.$.datePickerButton.setContent(Formatter.DatePickerPanel(defaults.datePickerButton));
			this.$.datePickerButtonWithValue.setContent(Formatter.DatePickerPanel(defaults.datePickerButtonWithValue));
			this.$.pickerPanelButton.setContent(Formatter.CollectionPickerPanel());
			this.$.pickerPanelButtonWithValue.setContent(Formatter.CollectionPickerPanel(defaults.pickerPanelButtonWithValue, this.app.data));
			this.$.multiPickerPanelButton.setContent(Formatter.CollectionMultiPickerPanel());
			this.$.multiPickerPanelButtonWithValue.setContent(Formatter.CollectionMultiPickerPanel(defaults.multiPickerPanelButtonWithValue, this.app.data));
		};
	}),
	showPanel: function(inSender, inEvent) {
		var
			name = inSender.name,
			options = {owner: this, fromPanel: this};

		// initialize default values
		if (name === 'timePickerButtonWithValue') {
			options = {
				hourValue: defaults.timePickerButtonWithValue.hour,
				minuteValue: defaults.timePickerButtonWithValue.minute,
				meridiemValue: defaults.timePickerButtonWithValue.meridiem,
				owner: this,
				fromPanel: this
			};
		} else if (name === 'datePickerButtonWithValue') {
			options = {
				value: defaults.datePickerButtonWithValue,
				owner: this,
				fromPanel: this
			};
		}

		// push a panel
		this.bubbleUp('onPushPanel', {panel: panels[name], options: options});

		// initialize default values
		if (name === 'pickerPanelButtonWithValue') {
			this.$.pickerPanelWithValue.setIndex(defaults.pickerPanelButtonWithValue);
		} else if (name === 'multiPickerPanelButtonWithValue') {
			var values = defaults.multiPickerPanelButtonWithValue;
			for (var i = 0; i < values.length; i++) {
				this.$.multiPickerPanelWithValue.select(values[i]);
			}
		}
	},
	updateContent: function(inSender, inEvent) {
		var
			name = inEvent.name,
			content;

		if (name === 'timePicker') {
			content = Formatter.TimePickerPanel24({hour: inEvent.hour, meridiem: inEvent.meridiem, minute: inEvent.minute});
			this.$.timePickerButton.setContent(content);
		} else if (name === 'timePickerWithValue') {
			content = Formatter.TimePickerPanel({hour: inEvent.hour, meridiem: inEvent.meridiem, minute: inEvent.minute});
			this.$.timePickerButtonWithValue.setContent(content);
		} else if (name === 'datePicker') {
			content = Formatter.DatePickerPanel(new Date());
			this.$.datePickerButton.setContent(content);
		} else if (name === 'datePickerWithValue') {
			content = Formatter.DatePickerPanel(new Date('2014/1/1'));
			this.$.datePickerButtonWithValue.setContent(content);
		} else if (name === 'pickerPanel') {
			content = Formatter.CollectionPickerPanel();
			this.$.pickerPanelButton.setContent(content);
		} else if (name === 'pickerPanelWithValue') {
			content = Formatter.CollectionPickerPanel(this.app.data[0].item);
			this.$.pickerPanelButtonWithValue.setContent(content);
		} else if (name === 'multiPickerPanel') {
			content = Formatter.CollectionPickerPanel();
			this.$.multiPickerPanelButton.setContent(content);
		} else if (name === 'multiPickerPanelWithValue') {
			content = Formatter.CollectionPickerPanel([this.app.data[0].item, this.app.data[1].item]);
			this.$.multiPickerPanelButtonWithValue.setContent(content);
		}

		this.doResult({msg: content});
	}
});

var PanelManager = kind({
	kind: PanelManager,
	handlers: {
		onPushPanel: 'pushPanel',
		onPopPanel: 'popPanel'
	},
	components: [
		{name: 'formPanel', kind: FormPanel},
	],
	pushPanel: function (inSender, inEvent) {
		this.pushFloatingPanel(inEvent.panel, inEvent.options);
	},
	popPanel: function (inSender, inEvent) {
		this.popFloatingPanel();
	}
});

module.exports = kind({
	name: 'g.sample.FormSample',
	handlers: {
		onResult: 'result'
	},
	classes: 'enyo-unselectable garnet g-sample',
	components: [
		{content: '< Form Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Form Picker Buttons / Form Buttons / Form Inputs', classes: 'g-sample-subheader'},
		{style: panelStyle, kind: PanelManager},

		{src: '@../assets/btn_command_next.svg', classes: 'g-sample-result', components: [
			{content: 'Result', classes: 'g-sample-subheader'},
			{name: 'result', allowHtml: true, content: 'No button pressed yet.', classes: 'g-sample-description'}
		]}
	],
	// If you already use enyo/Application, you don't have to define 'adjustComponentProps' function.
	// 'app' property is used to get share data easily.
	adjustComponentProps: kind.inherit(function (sup) {
		return function (props) {
			props.app = this;
			sup.apply(this, arguments);
		};
	}),
	result: function(inSender, inEvent) {
		this.$.result.setContent(inEvent.msg);
	},
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	},
	data: [
		{item: 'Alejandra'}, {item: 'Marquez'},  {item: 'Barr'},     {item: 'Everett'}, {item: 'Crane'},
		{item: 'Raymond'},   {item: 'Petersen'}, {item: 'Kristina'}, {item: 'Barbra'},  {item: 'Tracey10'},
		{item: 'Alejandra'}, {item: 'Marquez'},  {item: 'Barr'},     {item: 'Everett'}, {item: 'Crane'},
		{item: 'Raymond'},   {item: 'Petersen'}, {item: 'Kristina'}, {item: 'Barbra'},  {item: 'Tracey20'},
		{item: 'Alejandra'}, {item: 'Marquez'},  {item: 'Barr'},     {item: 'Everett'}, {item: 'Crane'},
		{item: 'Raymond'},   {item: 'Petersen'}, {item: 'Kristina'}, {item: 'Barbra'},  {item: 'Tracey30'},
		{item: 'Alejandra'}, {item: 'Marquez'},  {item: 'Barr'},     {item: 'Everett'}, {item: 'Crane'},
		{item: 'Raymond'},   {item: 'Petersen'}, {item: 'Kristina'}, {item: 'Barbra'},  {item: 'Tracey40'},
		{item: 'Alejandra'}, {item: 'Marquez'},  {item: 'Barr'},     {item: 'Everett'}, {item: 'Crane'},
		{item: 'Raymond'},   {item: 'Petersen'}, {item: 'Kristina'}, {item: 'Barbra'},  {item: 'Tracey50'},
		{item: 'Alejandra'}, {item: 'Marquez'},  {item: 'Barr'},     {item: 'Everett'}, {item: 'Crane'},
		{item: 'Raymond'},   {item: 'Petersen'}, {item: 'Kristina'}, {item: 'Barbra'},  {item: 'Tracey60'},
		{item: 'Alejandra'}, {item: 'Marquez'},  {item: 'Barr'},     {item: 'Everett'}, {item: 'Crane'},
		{item: 'Raymond'},   {item: 'Petersen'}, {item: 'Kristina'}, {item: 'Barbra'},  {item: 'Tracey70'},
		{item: 'Alejandra'}, {item: 'Marquez'},  {item: 'Barr'},     {item: 'Everett'}, {item: 'Crane'},
		{item: 'Raymond'},   {item: 'Petersen'}, {item: 'Kristina'}, {item: 'Barbra'},  {item: 'Tracey80'},
		{item: 'Alejandra'}, {item: 'Marquez'},  {item: 'Barr'},     {item: 'Everett'}, {item: 'Crane'},
		{item: 'Raymond'},   {item: 'Petersen'}, {item: 'Kristina'}, {item: 'Barbra'},  {item: 'Tracey90'},
		{item: 'Alejandra'}, {item: 'Marquez'},  {item: 'Barr'},     {item: 'Everett'}, {item: 'Crane'},
		{item: 'Raymond'},   {item: 'Petersen'}, {item: 'Kristina'}, {item: 'Barbra'},  {item: 'Tracey100'}
	]
});
