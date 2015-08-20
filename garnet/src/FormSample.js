var
	enyo = require('enyo'),
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	dom = require('enyo/dom.js'),
	ri = require('enyo/resolution'),
	Collection = require('enyo/Collection.js'),

	g = require('garnet'),
	g_ri = require('garnet/resolution'),
	Arc = require('garnet/Arc'),
	Panel = require('garnet/Panel'),
	DatePickerPanel = require('garnet/DatePickerPanel'),
	FormButton = require('garnet/FormButton'),
	FormInput = require('garnet/FormInput'),
	FormInputDecorator = require('garnet/FormInputDecorator'),
	FormLabel = require('garnet/FormLabel'),
	FormPickerButton = require('garnet/FormPickerButton'),
	FormToolDecorator = require('garnet/FormToolDecorator'),
	IconButton = require('garnet/IconButton'),
	MultiPickerPanel = require('garnet/MultiPickerPanel'),
	Panel = require('garnet/Panel'),
	PickerPanel = require('garnet/PickerPanel'),
	Popup = require('garnet/Popup'),
	Scroller = require('garnet/Scroller'),
	TimePickerPanel = require('garnet/TimePickerPanel');

var FormPanel = kind({
	name: "g.sample.FormPanel",
	kind: Panel,
	events: {
		onResult: ""
	},
	handlers: {
		onCancel: "tapCancel",
		onOK: "tapOK",
		ontap: "tapOK"
	},
	title: true,
	titleContent: "Title: long text will fade out",
	style: "position: relative; background-color: #000000;overflow: hidden;",
	classes: "g-common-width-height-fit g-layout-absolute-wrapper",
	components: [
		{classes: "g-common-width-height-fit", style: "overflow: hidden;", components: [
			{kind: Scroller, scrollIndicatorEnabled: true, style: "width: " + ri.scale(320) + "px; height: " + ri.scale(320) + "px; border-radius: 50%; background-color: #000000;", components: [
				{style: "width: 100%; height: " + ri.scale(57) + "px;"},
				//
				{kind: FormLabel, content: "Form Picker Buttons : <br>> Time Picker - current", allowHtml: "true"},
				{name: "timePickerButton", kind: FormPickerButton, content: "None", ontap: "showTimePickerPopup"},
				{kind: FormLabel, content: "> Time Picker : initValue"},
				{name: "timePickerButtonWithcustomValue", kind: FormPickerButton, content: "None", ontap: "showTimePickerPopupWithcustomValue"},
				//
				{kind: FormLabel, content: "> Date Picker : current"},
				{name: "datePickerButton", kind: FormPickerButton, content: "None", ontap: "showDatePickerPopup"},
				{kind: FormLabel, content: "> Date Picker : initValue"},
				{name: "datePickerButtonWithcustomValue", kind: FormPickerButton, content: "None", ontap: "showDatePickerPopupWithcustomValue"},
				//
				{kind: FormLabel, content: "> PickerPanel : none"},
				{name: "pickerPanelButton", kind: FormPickerButton, content: "None", ontap: "showPickerPanelPopup"},
				{kind: FormLabel, content: "> PickerPanel : initValue"},
				{name: "pickerPanelButtonWithcustomValue", kind: FormPickerButton, content: "None", ontap: "showPickerPanelPopupWithcustomValue"},
				//
				{kind: FormLabel, content: "> MultiPickerPanel : none"},
				{name: "multiPickerPanelButton", kind: FormPickerButton, content: "None", ontap: "showMultiPickerPanelPopup"},
				{kind: FormLabel, content: "> MultiPickerPanel : initValue"},
				{name: "multiPickerPanelButtonWithcustomValue", kind: FormPickerButton, content: "None", ontap: "showMultiPickerPanelPopupWithcustomValue"},
				//
				{kind: FormLabel, content: "Form Buttons"},
				{kind: FormButton, content: "+Add new"},
				{kind: FormToolDecorator, components: [
					{kind: FormButton, content: "Special", style: "width: " + ri.scale(118) + "px; margin-right: " + ri.scale(4) + "px; font-size: " + ri.scale(20) + "px;"},
					{kind: FormButton, content: "+Add new", style: "width: " + ri.scale(120) + "px; font-size: " + ri.scale(20) + "px;"}
				]},
				//
				{kind: FormLabel, content: "Form Inputs"},
				{kind: FormInputDecorator, components: [
					{kind: FormInput, disabled: true, value: "disabled"}
				]},
				{kind: FormInputDecorator, components: [
					{kind: FormInput, value: "Guide Text"}
				]},
				{kind: FormToolDecorator, components: [
					{kind: FormInputDecorator, style: "width: " + ri.scale(185) + "px; margin-right: " + ri.scale(6) + "px;", components: [
						{kind: FormInput, value: "Guide Text"}
					]},
					{kind: IconButton, src: "@../assets/btn_ic_deleted.svg", classes: "g-common-button-size-small"}
				]},
				{style: "width: 100%; height: " + ri.scale(70) + "px;"}
			]}
		]},
		{
			name: "timePickerPopup",
			kind: Popup,
			style: "background-color: transparent;",
			effect: "depth-transition",
			components: [
				{
					name: "timePicker",
					kind: TimePickerPanel
				}
			]
		},
		{
			name: "timePickerPopupWithcustomValue",
			kind: Popup,
			style: "background-color: transparent;",
			effect: "depth-transition",
			components: [
				{
					name: "timePickerWithcustomValue",
					kind: TimePickerPanel,
					hourValue: 12,
					minuteValue: 30,
					meridiemValue: "PM"
				}
			]
		},
		{
			name: "datePickerPopup",
			kind: Popup,
			style: "background-color: transparent;",
			effect: "depth-transition",
			components: [
				{
					name: "datePicker",
					kind: DatePickerPanel
				}
			]
		},
		{
			name: "datePickerPopupWithcustomValue",
			kind: Popup,
			style: "background-color: transparent;",
			effect: "depth-transition",
			components: [
				{
					name: "datePickerWithcustomValue",
					kind: DatePickerPanel,
					value: new Date("2014/1/1")
				}
			]
		},
		{
			name: "pickerPanelPopup",
			kind: Popup,
			effect: "depth-transition",
			components: [
				{style: "background-color: #000000; position: relative;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
					{name: "pickerPanel", kind: PickerPanel, title:true, titleContent: "PickerTitle", ontap: "hidePickerPanelPopup"}
				]}
			]
		},
		{
			name: "pickerPanelPopupWithcustomValue",
			kind: Popup,
			effect: "depth-transition",
			components: [
				{style: "background-color: #000000; position: relative;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
					{name: "pickerPanelWithcustomValue", kind: PickerPanel, title:true, titleContent: "PickerTitle",ontap: "hidePickerPanelPopupWithcustomValue"}
				]}
			]
		},
		{
			name: "multiPickerPanelPopup",
			kind: Popup,
			effect: "depth-transition",
			components: [
				{style: "background-color: #000000; position: relative;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
					{name: "multiPickerPanel", kind: MultiPickerPanel, title:true, titleContent: "MultiPickerTitle", style: "position: relative; display: inline-block; margin-right: 20px;", selection: true, multipleSelection: true}
				]}
			]
		},
		{
			name: "multiPickerPanelPopupWithcustomValue",
			kind: Popup,
			effect: "depth-transition",
			components: [
				{style: "background-color: #000000; position: relative;", classes: "g-common-width-height-fit g-layout-absolute-wrapper", components: [
					{name: "multiPickerPanelWithcustomValue", kind: MultiPickerPanel, title:true, titleContent: "MultiPickerTitle", style: "position: relative; display: inline-block; margin-right: 20px;", selection: true, multipleSelection: true}
				]}
			]
		}
	],
	bindings: [
		{from: ".collection", to: ".$.pickerPanel.collection"},
		{from: ".collection", to: ".$.pickerPanelWithcustomValue.collection"},
		{from: ".collection", to: ".$.multiPickerPanel.collection"},
		{from: ".collection", to: ".$.multiPickerPanelWithcustomValue.collection"},
		//
		{from: ".$.timePicker.value", to: ".$.timePickerButton.content", transform: function(val) {
			var timestr;
			if (val.hour<10 && val.hour>0) {
				timestr = "0" + val.hour;
			} else if (val.hour===0) {
				timestr = "12";
			} else {
				timestr = val.hour;
			}
			timestr += ":";
			if (val.minute<10 && val.minute>=0) {
				timestr += "0";
			}
			timestr += val.minute;
			timestr += " ";
			timestr += val.meridiem;
			return timestr;
		}},
		{from: ".$.timePickerWithcustomValue.value", to: ".$.timePickerButtonWithcustomValue.content", transform: function(val) {
			var timestr;
			if (val.hour<10 && val.hour>0) {
				timestr = "0" + val.hour;
			} else if (val.hour===0) {
				timestr = "12";
			} else {
				timestr = val.hour;
			}
			timestr += ":";
			if (val.minute<10 && val.minute>=0) {
				timestr += "0";
			}
			timestr += val.minute;
			timestr += " ";
			timestr += val.meridiem;
			return timestr;
		}},
		{from: ".$.datePicker.value", to: ".$.datePickerButton.content", transform: function(val) {
			return (val.getYear() + 1900) + "/" + (val.getMonth() + 1) + "/" + val.getDate();
		}},
		{from: ".$.datePickerWithcustomValue.value", to: ".$.datePickerButtonWithcustomValue.content", transform: function(val) {
			return (val.getYear() + 1900) + "/" + (val.getMonth() + 1) + "/" + val.getDate();
		}},
		{from: ".$.pickerPanel.value", to: ".$.pickerPanelButton.content", transform: function(val) {
			var items = val,
				names = "None";
			if (items !== null && items !== undefined) {
				names = items.attributes.item;
			}

			return names;
		}},
		{from: ".$.pickerPanelWithcustomValue.value", to: ".$.pickerPanelButtonWithcustomValue.content", transform: function(val) {
			var items = val,
				names = "None";
			if (items !== null && items !== undefined) {
				names = items.attributes.item;
			}

			return names;
		}},
		{from: ".$.multiPickerPanel.value", to: ".$.multiPickerPanelButton.content", transform: function(val) {
			var items = val,
				names = "";
			if (items !== null && items !== undefined && items.length > 0) {
				for (var i=0; i<items.length; i++) {
					names += ", " + items[i].attributes.item;
				}
				names = names.slice(2);
			} else {
				names = "None";
			}

			return names;
		}},
		{from: ".$.multiPickerPanelWithcustomValue.value", to: ".$.multiPickerPanelButtonWithcustomValue.content", transform: function(val) {
			var items = val,
				names = "";
			if (items !== null && items !== undefined && items.length > 0) {
				for (var i=0; i<items.length; i++) {
					names += ", " + items[i].attributes.item;
				}
				names = names.slice(2);
			} else {
				names = "None";
			}

			return names;
		}}
	],
	create: kind.inherit(function(sup) {
		return function() {
			sup.apply(this, arguments);
			this.collection = new Collection(this.data);
		};
	}),
	rendered: kind.inherit(function(sup) {
		return function() {
			this.$.pickerPanelWithcustomValue.setIndex(0);
			this.$.multiPickerPanelWithcustomValue.select(0);
			this.$.multiPickerPanelWithcustomValue.select(1);
			this.$.multiPickerPanelWithcustomValue._onOK();
			sup.apply(this, arguments);
		};
	}),
	showTimePickerPopup: function() {
		this.$.timePickerPopup.show();
	},
	showTimePickerPopupWithcustomValue: function() {
		this.$.timePickerPopupWithcustomValue.show();
	},
	showDatePickerPopup: function() {
		this.$.datePickerPopup.show();
	},
	showDatePickerPopupWithcustomValue: function() {
		this.$.datePickerPopupWithcustomValue.show();
	},
	showPickerPanelPopup: function() {
		this.$.pickerPanelPopup.show();
	},
	showPickerPanelPopupWithcustomValue: function() {
		this.$.pickerPanelPopupWithcustomValue.show();
	},
	showMultiPickerPanelPopup: function() {
		this.$.multiPickerPanelPopup.show();
	},
	showMultiPickerPanelPopupWithcustomValue: function() {
		this.$.multiPickerPanelPopupWithcustomValue.show();
	},
	hidePickerPanelPopup: function() {
		this.$.pickerPanelPopup.hide();
	},
	hidePickerPanelPopupWithcustomValue: function() {
		this.$.pickerPanelPopupWithcustomValue.hide();
	},
	getSelectedFromMultiPickerPanle: function(selected) {
		var items = selected,
			names = "";
		if (items !== null && items !== undefined && items.length > 0) {
			for (var i=0; i<items.length; i++) {
				names += ", " + items[i].attributes.item;
			}
			names = names.slice(2);
		} else {
			names = "None";
		}
		return names;
	},
	tapOK: function(inSender, inEvent) {
		var items;
		if (inEvent.originator.name === "multiPickerPanel") {
			items = this.getSelectedFromMultiPickerPanle(this.$.multiPickerPanel.value);
			this.doResult({msg: items});
			this.hideMultiPickerPanelPopup();
		} else if (inEvent.originator.name === "multiPickerPanelWithcustomValue") {
			items = this.getSelectedFromMultiPickerPanle(this.$.multiPickerPanelWithcustomValue.value);
			this.doResult({msg: items});
			this.hideMultiPickerPanelPopupWithcustomValue();
		} else if (inEvent.originator.name === "datePicker") {
			this.doResult({msg: "Date is " + this.$.datePicker.getValue()});
			this.$.datePickerPopup.hide();
		} else if (inEvent.originator.name === "timePicker") {
			this.doResult({msg: "Time is " + this.$.timePicker.getHourValue() + " : " + this.$.timePicker.getMinuteValue() + " " + this.$.timePicker.getMeridiemValue()});
			this.$.timePickerPopup.hide();
		} else if (inEvent.originator.name === "datePickerWithcustomValue") {
			this.doResult({msg: "Date is " + this.$.datePickerWithcustomValue.getValue()});
			this.$.datePickerPopupWithcustomValue.hide();
		} else if (inEvent.originator.name === "timePickerWithcustomValue") {
			this.doResult({msg: "Time is " + this.$.timePickerWithcustomValue.getHourValue() + " : " + this.$.timePickerWithcustomValue.getMinuteValue() + " " + this.$.timePickerWithcustomValue.getMeridiemValue()});
			this.$.timePickerPopupWithcustomValue.hide();
		}
	},
	tapCancel: function(inSender, inEvent) {
		if (inEvent.originator.name === "multiPickerPanel") {
			this.hideMultiPickerPanelPopup();
		} else if (inEvent.originator.name === "multiPickerPanelWithcustomValue") {
			this.hideMultiPickerPanelPopupWithcustomValue();
		} else if (inEvent.originator.name === "datePicker") {
			this.doResult({msg: "Cancel!"});
			this.$.datePickerPopup.hide();
		} else if (inEvent.originator.name === "timePicker") {
			this.doResult({msg: "Cancel!"});
			this.$.timePickerPopup.hide();
		} else if (inEvent.originator.name === "datePickerWithcustomValue") {
			this.doResult({msg: "Cancel!"});
			this.$.datePickerPopupWithcustomValue.hide();
		} else if (inEvent.originator.name === "timePickerWithcustomValue") {
			this.doResult({msg: "Cancel!"});
			this.$.timePickerPopupWithcustomValue.hide();
		}
	},
	hideMultiPickerPanelPopup: function() {
		this.$.multiPickerPanelPopup.hide();
	},
	hideMultiPickerPanelPopupWithcustomValue: function() {
		this.$.multiPickerPanelPopupWithcustomValue.hide();
	},
	data: [
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"},
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"},
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"},
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"},
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"},
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"},
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"},
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"},
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"},
		{item: "Alejandra"},
		{item: "Marquez"},
		{item: "Barr"},
		{item: "Everett"},
		{item: "Crane"},
		{item: "Raymond"},
		{item: "Petersen"},
		{item: "Kristina"},
		{item: "Barbra"},
		{item: "Tracey"}
	]
});

module.exports = kind({
	name: "g.sample.FormSample",
	classes: "enyo-unselectable garnet g-sample",
	components: [
		{content: "< Form Sample", classes: "g-sample-header", ontap: "goBack"},

		{content: "Form Picker Buttons / Form Buttons / Form Inputs", classes: "g-sample-subheader"},
		{kind: FormPanel, style: "position: relative;", onResult: "result"},

		{src: "@../assets/btn_command_next.svg", classes: "g-sample-result", components: [
			{content: "Result", classes: "g-sample-subheader"},
			{name: "result", allowHtml: true, content: "No button pressed yet.", classes: "g-sample-description"}
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
