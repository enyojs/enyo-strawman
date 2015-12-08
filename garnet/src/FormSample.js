require('garnet');

var
	kind               = require('enyo/kind'),
	utils              = require('enyo/utils'),
	Collection         = require('enyo/Collection.js'),

	Title              = require('garnet/Title'),
	IconButton         = require('garnet/IconButton'),
	FormButton         = require('garnet/FormButton'),
	FormInput          = require('garnet/FormInput'),
	FormInputDecorator = require('garnet/FormInputDecorator'),
	FormLabel          = require('garnet/FormLabel'),
	FormPickerButton   = require('garnet/FormPickerButton'),
	FormToolDecorator  = require('garnet/FormToolDecorator'),
	Scroller           = require('garnet/Scroller'),
	Panel              = require('garnet/Panel'),
	TimePickerPanel    = require('garnet/TimePickerPanel'),
	DatePickerPanel    = require('garnet/DatePickerPanel'),
	PickerPanel        = require('garnet/PickerPanel'),
	MultiPickerPanel   = require('garnet/MultiPickerPanel'),
	WheelSliderPanel   = require('./WheelSliderPanelSample').WheelSliderPanel,
	PanelManager       = require('garnet/PanelManager');

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
	* From DatePicker.value to FormPickerButton.content
	*/
	DatePickerPanel: function(val) {
		return (val.getYear() + 1900) + '/' + (val.getMonth() + 1) + '/' + val.getDate();
	},
	/*
	* From PickerPanel.value to FormPickerButton.content
	*/
	PickerPanel: function(val, data) {
		var
			item = val,
			name = 'No item';

		if (typeof val === 'number') {
			return data[val].item;
		}
		if (!!item) {
			name = item.attributes.item;
		}

		return name;
	},
	/*
	* From MultiPickerPanel.value to FormPickerButton.content
	*/
	MultiPickerPanel: function(val, data) {
		var
			items = val,
			names = '',
			i;

		if (val instanceof Array && val.length && typeof val[0] === 'number') {
			var multipleSelection = [];

			for (i = 0; i < val.length; i++) {
				multipleSelection[i] = data[val[i]].item;
			}
			return multipleSelection.join(', ');
		}
		if (!!items && items.length > 0) {
			for (i = 0; i < items.length; i++) {
				names += ', ' + items[i].attributes.item;
			}
			names = names.slice(2);
		} else {
			names = 'No items';
		}

		return names;
	},
	/*
	* From WheelSliderPanel.value to FormPickerButton.content
	*/
	WheelSliderPanel: function(val) {
		return '' + val;
	}
});

var
	today = new Date(),
	defaults = {
		timePickerButton: {hour: today.getHours(), meridiem: '', minute: today.getMinutes()},
		timePickerButtonWithValue: {hour: 12, meridiem: "PM", minute: 30},
		datePickerButton: new Date(),
		datePickerButtonWithValue: new Date('2014/1/1'),
		pickerPanelButtonWithValue: 0,
		multiPickerPanelButtonWithValue: [0, 1],
		wheelSliderPanelWithValue: 25
	};

var FormPanel = kind({
	name: 'g.sample.FormPanel',
	kind: Panel,
	events: {
		onResult: ''
	},
	classes: 'g-sample-panel g-common-width-height-fit g-layout-absolute-wrapper',
	components: [
		{classes: 'g-common-width-height-fit', components: [
			{kind: Scroller, circle: true, scrollIndicatorEnabled: true, classes: 'g-sample-panel g-common-width-height-fit', components: [
				{kind: Title, content: 'Title: long text will fade out'},
				//
				{kind: FormLabel, classes: 'g-sample-form-top-label', content: '> FormPickerButtons\<br\>> Time Picker - current', allowHtml: 'true'},
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
				{kind: FormLabel, content: '> WheelSliderPanel : initValue'},
				{name: 'wheelSliderPanelButtonWithValue', kind: FormPickerButton, ontap: 'showPanel'},
				//
				{kind: FormLabel, content: 'Form Buttons'},
				{kind: FormButton, content: '+Add new'},
				{kind: FormToolDecorator, components: [
					{kind: FormButton, content: 'Special', classes: 'g-sample-form-button1'},
					{kind: FormButton, content: '+Add new', classes: 'g-sample-form-button2'}
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
					{kind: FormInputDecorator, classes: 'g-sample-form-input', components: [
						{kind: FormInput, value: 'Guide Text'}
					]},
					{kind: IconButton, src: '@../assets/btn_ic_deleted.svg', classes: 'g-common-button-size-small'}
				]},
				{classes: 'g-sample-form-footer'}
			]}
		]}
	],
	popUpAndPickerPanelComponents: {
		timePickerButton: {
			name: 'timePicker',
			kind: TimePickerPanel,
			meridiemValue: '24'
		},
		timePickerButtonWithValue: {
			name: 'timePickerWithValue',
			kind: TimePickerPanel
		},
		datePickerButton: {
			name: 'datePicker',
			kind: DatePickerPanel
		},
		datePickerButtonWithValue: {
			name: 'datePickerWithValue',
			kind: DatePickerPanel
		},
		pickerPanelButton: {
			name: 'pickerPanel',
			kind: PickerPanel,
			title: true,
			titleContent: 'PickerTitle'
		},
		pickerPanelButtonWithValue: {
			name: 'pickerPanelWithValue',
			kind: PickerPanel,
			title: true,
			titleContent: 'PickerTitle',
			selectedIndex: 0
		},
		multiPickerPanelButton: {
			name: 'multiPickerPanel',
			kind: MultiPickerPanel,
			onCancel: 'popPanel',
			onOK: 'popPanel',
			title: true,
			titleContent: 'MultiPickerPanel'
		},
		multiPickerPanelButtonWithValue: {
			name: 'multiPickerPanelWithValue',
			kind: MultiPickerPanel,
			onCancel: 'popPanel',
			onOK: 'popPanel',
			title: true,
			titleContent: 'MultiPickerPanel',
			selectedIndex: [0, 1]
		},
		wheelSliderPanelButtonWithValue: {
			name: 'wheelSliderPanelWithValue',
			kind: WheelSliderPanel,
			title:true,
			titleContent: 'WheelSliderTitle'
		}
	},
	initComponents: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.$.timePickerButton.setContent(Formatter.TimePickerPanel24(defaults.timePickerButton));
			this.$.timePickerButtonWithValue.setContent(Formatter.TimePickerPanel(defaults.timePickerButtonWithValue));
			this.$.datePickerButton.setContent(Formatter.DatePickerPanel(defaults.datePickerButton));
			this.$.datePickerButtonWithValue.setContent(Formatter.DatePickerPanel(defaults.datePickerButtonWithValue));
			this.$.pickerPanelButton.setContent(Formatter.PickerPanel());
			this.$.pickerPanelButtonWithValue.setContent(Formatter.PickerPanel(defaults.pickerPanelButtonWithValue, data));
			this.$.multiPickerPanelButton.setContent(Formatter.MultiPickerPanel());
			this.$.multiPickerPanelButtonWithValue.setContent(Formatter.MultiPickerPanel(defaults.multiPickerPanelButtonWithValue, data));
			this.$.wheelSliderPanelButtonWithValue.setContent(Formatter.WheelSliderPanel(defaults.wheelSliderPanelWithValue));
		};
	}),
	showPanel: function(inSender, inEvent) {
		var
			name = inSender.name,
			panel = this.popUpAndPickerPanelComponents[name],
			options;

		// initialize default values
		if (name === 'timePickerButtonWithValue' && !this.$.timePickerWithValue) {
			options = {
				hourValue: defaults.timePickerButtonWithValue.hour,
				minuteValue: defaults.timePickerButtonWithValue.minute,
				meridiemValue: defaults.timePickerButtonWithValue.meridiem,
				onValueChange: 'updateContent'
			};
		} else if (name === 'datePickerButtonWithValue' && !this.$.datePickerWithValue) {
			options = {
				value: defaults.datePickerButtonWithValue,
				onValueChange: 'updateContent'
			};
		} else if ((name === 'pickerPanelButton' && !this.$.pickerPanel) ||
			(name === 'pickerPanelButtonWithValue' && !this.$.pickerPanelWithValue) ||
			(name === 'multiPickerPanelButton' && !this.$.multiPickerPanel) ||
			(name === 'multiPickerPanelButtonWithValue' && !this.$.multiPickerPanelWithValue)) {
			this.collection = new Collection(data);
			options = {
				onValueChange: 'updateContent',
				collection: this.collection
			};
		} else if (name === 'wheelSliderPanelButtonWithValue' && !this.$.wheelSliderPanelWithValue) {
			options = {
				value: defaults.wheelSliderPanelWithValue,
				onValueChange: 'updateContent'
			};
		} else {
			options = {onValueChange: 'updateContent'};
		}
		utils.mixin(panel, options);

		if (panel) {
			this.bubbleUp('onPushPanel', {panel: panel, owner: this});
		}
	},
	popPanel: function(inSender, inEvent) {
		this.bubbleUp('onPopPanel');
		this.updateContent(inSender, inEvent.originalEvent);
	},
	updateContent: function(inSender, inEvent) {
		var
			name = inSender.name,
			content;

		switch (name) {
			case 'timePicker':
				content = Formatter.TimePickerPanel24({hour: inEvent.value.hour, meridiem: inEvent.value.meridiem, minute: inEvent.value.minute});
				this.$.timePickerButton.setContent(content);
				break;
			case 'timePickerWithValue':
				content = Formatter.TimePickerPanel({hour: inEvent.value.hour, meridiem: inEvent.value.meridiem, minute: inEvent.value.minute});
				this.$.timePickerButtonWithValue.setContent(content);
				break;
			case 'datePicker':
				content = Formatter.DatePickerPanel(inEvent.value);
				this.$.datePickerButton.setContent(content);
				break;
			case 'datePickerWithValue':
				content = Formatter.DatePickerPanel(inEvent.value);
				this.$.datePickerButtonWithValue.setContent(content);
				break;
			case 'pickerPanel':
				content = Formatter.PickerPanel(inEvent.value);
				this.$.pickerPanelButton.setContent(content);
				break;
			case 'pickerPanelWithValue':
				content = Formatter.PickerPanel(inEvent.value);
				this.$.pickerPanelButtonWithValue.setContent(content);
				break;
			case 'multiPickerPanel':
				content = Formatter.MultiPickerPanel(inEvent.value);
				this.$.multiPickerPanelButton.setContent(content);
				break;
			case 'multiPickerPanelWithValue':
				content = Formatter.MultiPickerPanel(inEvent.value);
				this.$.multiPickerPanelButtonWithValue.setContent(content);
				break;
			case 'wheelSliderPanelWithValue':
				content = Formatter.WheelSliderPanel(inEvent.value);
				this.$.wheelSliderPanelButtonWithValue.setContent(content);
				break;
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
		{name: 'formPanel', kind: FormPanel}
	],
	pushPanel: function (inSender, inEvent) {
		this.pushFloatingPanel(inEvent.panel, {owner: inEvent.owner});
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
	classes: 'enyo-unselectable enyo-fit garnet g-sample g-sample-form',
	components: [
		{content: '< Form Sample', classes: 'g-sample-header', ontap: 'goBack'},

		{content: 'Form Picker Buttons / Form Buttons / Form Inputs', classes: 'g-sample-subheader'},
		{kind: PanelManager, classes: 'g-sample-panel-manager'},
		{src: '@../assets/btn_command_next.svg', classes: 'g-sample-result', components: [
			{content: 'Result', classes: 'g-sample-subheader'},
			{name: 'result', allowHtml: true, content: 'No button pressed yet.', classes: 'g-sample-description'}
		]}
	],
	result: function(inSender, inEvent) {
		this.$.result.setContent(inEvent.msg);
	},
	goBack: function(inSender, inEvent) {
		global.history.go(-1);
		return false;
	}
});

var data = [
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
];
