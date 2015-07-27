var
	kind = require('enyo/kind'),
    Button = require('enyo/Button'),
    Group = require('enyo/Group'),
    Scroller = require('enyo/Scroller');

var
	DatePicker = require('onyx/DatePicker'),
    TimePicker = require('onyx/TimePicker');

var
    Calendar = require('enyo-ilib/Calendar'),
    DateFmt = require('enyo-ilib/DateFmt');

var
    ChooseTimeZone = require('../ChooseTimeZone'),
	ChooseLocale = require('../ChooseLocale'),
    rb = require('../ResBundle');

module.exports = kind({
    name: "ilib.sample.DateFormatting",
    classes: "onyx ilib-onyx-sample enyo-fit",
    components: [
        {kind: Scroller, fit: true, components: [
            {components: [
                /* Header with selecting locale */
                {kind: ChooseLocale, name: "localeSelector"},
                {style: "width: 20px"},
                {kind: Button, content: rb.getString("Apply"), ontap: "calcFormat", style: "vertical-align: bottom;", classes: "onyx-affirmative"},
                {fit: true}
            ]},
            
            {kind: ChooseTimeZone, name: "timeZonesSelector"},
            
			{components: [
                {components: [
                    {content: rb.getString("Date"), classes: "ilib-onyx-sample-divider"},
                    {kind: DatePicker, name: "datePicker"}
                ]},
                {style: "width: 20px"},
                {components: [
                    {content: rb.getString("Time"), classes: "ilib-onyx-sample-divider"},
                    {kind: TimePicker, name: "timePicker"}
                ]},
                {fit: true}
            ]},
            
            {content: rb.getString("Length"), classes: "ilib-onyx-sample-divider"},
            {kind: Group, defaultKind: Button, name: "length", components: [
                {content: "short"},
                {content: "medium"},
                {content: "long", active: true},
                {content: "full"},
            ]},
           {content: rb.getString("Type"), classes: "ilib-onyx-sample-divider"},
           {kind: Group, defaultKind: Button, name: "type", components: [
                {content: "date"},
                {content: "time"},
                {content: "datetime", active: true}
            ]},
            {content: rb.getString("Date"), classes: "ilib-onyx-sample-divider"},
            {kind: Group, defaultKind: Button, name: "date", components: [
                {content: "dmwy"},
                {content: "dmy", active: true},
                {content: "dmw"},
                {content: "dm"},
                {content: "my"},
                {content: "dw"},
                {content: "d"},
                {content: "m"},
                {content: "n"},
                {content: "y"}
            ]},
            {content: rb.getString("Time"), classes: "ilib-onyx-sample-divider"},
            {kind: Group, defaultKind: Button, name: "time", components: [
                {content: "ahmsz"},
                {content: "ahms"},
                {content: "hmsz"},
                {content: "hms"},
                {content: "ahmz"},
                {content: "ahm"},
                {content: "hmz", active: true},
                {content: "ah"},
                {content: "hm"},
                {content: "ms"},
                {content: "h"},
                {content: "m"},
                {content: "s"}
            ]},
            {content: rb.getString("Clock"), classes: "ilib-onyx-sample-divider"},
            {kind: Group, defaultKind: Button, name: "clock", components: [
                {content: "12"},
                {content: "24"},
                {content: "locale", active: true}
            ]},
            {content: rb.getString("Native Digits"), classes: "ilib-onyx-sample-divider"},
            {kind: Group, defaultKind: Button, name: "useNative", components: [
                {content: "false", active: true},
                {content: "true"}
            ]},
            {tag: "br"}
        ]},
        
        {kind: Group, classes:"onyx-sample-result-box", components: [
            {kind: "onyx.GroupboxHeader", content: rb.getString("Format result:")},
            {name: "rtlResult", fit: true, content: "-", style: "padding: 10px"}
        ]}
    ],
    
    calcFormat: function(inSender, inEvent) {
        var options = {};
        options['locale'] = this.$.localeSelector.getValue();
        options['length'] = this.$.length.getActive().content;
        options['length'] = this.$.length.getActive().content;
        options['type'] = this.$.type.getActive().content;
        options['date'] = this.$.date.getActive().content;
        options['time'] = this.$.time.getActive().content;
        if (this.$.clock.getActive().content !== 'locale')
            options['clock'] = this.$.clock.getActive().content;
        options['useNative'] = this.$.useNative.getActive().content === 'true';
        if (this.$.timeZonesSelector.getValue() !== 'default')
            options['timezone'] = this.$.timeZonesSelector.getValue();
        // processing    
        var cal = Calendar.newInstance({
            locale: options['locale']
        });
        var dateCalendar = this.$.datePicker.getValue();
        var time = this.$.timePicker.getValue();
        var date = cal.newDateInstance({
            year: dateCalendar.getFullYear(),
            month: dateCalendar.getMonth() + 1,
            day: dateCalendar.getDate(),
            hour: time.getHours(),
            minute: time.getMinutes(),
            second: time.getSeconds(),
            millisecond: 0,
            timezone: options['timezone']
        });
        var fmt = new DateFmt(options);
        var postFmtData = fmt.format(date);
        // Output results
        this.$.rtlResult.setContent(postFmtData + ', '+ rb.getString('julian day: ') + date.getJulianDay() +', '+ rb.getString('unix time: ') + date.getTime());
    }
});
