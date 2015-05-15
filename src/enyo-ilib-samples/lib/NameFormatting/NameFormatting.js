var
	kind = require('enyo/kind'),
	Button = require('enyo/Button'),
	Checkbox = require('enyo/Checkbox'),
	Group = require('enyo/Group'),
    Input = require('enyo/Input'),
	Scroller = require('enyo/Scroller');

var
	Name = require('enyo-ilib/Name'),
    NameFmt = require('enyo-ilib/NameFmt');

var
	ChooseLocale = require('../ChooseLocale'),
    rb = require('../ResBundle');

module.exports = kind({
    name: "ilib.sample.NameFormatting",
    classes: "onyx ilib-onyx-sample enyo-fit",
    components: [
        {kind: Scroller, fit: true, components: [
            {components: [
                /* Header with selecting locale */
                {kind: ChooseLocale, name: "localeSelector"},
                {style: "width: 20px"},
                {kind: Button, content: rb.getString("Apply"), ontap: "nameFormat", style: "vertical-align: bottom;", classes: "onyx-affirmative"},
                {fit: true}
            ]},
            {tag: "br"},
            
            {content: rb.getString("Length"), classes: "ilib-onyx-sample-divider"},
            {kind: Group, defaultKind: Button, name: "length", onActivate: "buttonActivated", components: [
                {content: "Short", active: true, name:"short"},
                {content: "Medium"},
                {content: "Long"}
            ]},
            
            {content: rb.getString("(or) Parts"), classes: "ilib-onyx-sample-divider"},
            {classes: "namepart", components: [
                {kind: Checkbox, name: "prefixCbox", content: "Prefix ", onchange:"checkboxChanged"},
                {kind: Checkbox, name: "givenCbox",  content: "Given ",  onchange:"checkboxChanged"},
                {kind: Checkbox, name: "middleCbox", content: "Middle ", onchange:"checkboxChanged"},
                {kind: Checkbox, name: "familyCbox", content: "Family ",  onchange:"checkboxChanged"},
                {kind: Checkbox, name: "suffixCbox", content: "Suffix ",  onchange:"checkboxChanged"}
            ]},

            {components: [
                {content: rb.getString("Prefix"), classes: "ilib-onyx-sample-divider"},
                {kind: Input, name: "prefixInput", placeholder: rb.getString("Prefix")},
                {content: rb.getString("Given Name"), classes: "ilib-onyx-sample-divider"},
                {kind: Input, name: "givenInput", placeholder: rb.getString("Given Name")},
                {content: rb.getString("Middle Name"), classes: "ilib-onyx-sample-divider"},
                {kind: Input, name: "middleInput", placeholder: rb.getString("Middle Name")},
                {content: rb.getString("Family Name"), classes: "ilib-onyx-sample-divider"},
				{kind: Input, name: "familyInput", placeholder: rb.getString("Family Name")},
                {content: rb.getString("Suffix"), classes: "ilib-onyx-sample-divider"},
				{kind: Input, name: "suffixInput", placeholder: rb.getString("Suffix")}
            ]}
        ]},
        {tag: "br"},
        {kind: Group, classes:"onyx-sample-result-box", components: [
            {content: rb.getString("Format result:")},
            {name: "rtlResult", fit: true, content: "-", style: "padding: 10px"}
        ]}
    ],
 
    buttonActivated: function(inSender, inEvent) {

        if (this.$.length.getActive().content === 'Short') {
            this.$.prefixCbox.setChecked(false);
            this.$.givenCbox.setChecked(true);
            this.$.middleCbox.setChecked(false);
            this.$.familyCbox.setChecked(true);
            this.$.suffixCbox.setChecked(false);
        } else if (this.$.length.getActive().content === 'Medium') {
            this.$.prefixCbox.setChecked(false);
            this.$.givenCbox.setChecked(true);
            this.$.middleCbox.setChecked(true);
            this.$.familyCbox.setChecked(true);
            this.$.suffixCbox.setChecked(false);
        } else if (this.$.length.getActive().content === 'Long') {
            this.$.prefixCbox.setChecked(true);
            this.$.givenCbox.setChecked(true);
            this.$.middleCbox.setChecked(true);
            this.$.familyCbox.setChecked(true);
            this.$.suffixCbox.setChecked(true);
        }
    },

    checkboxChanged: function(inSender, inEvent) {
        if (!this.$.prefixCbox.getChecked() && !this.$.givenCbox.getChecked() && !this.$.middleCbox.getChecked() &&
            !this.$.familyCbox.getChecked() && !this.$.suffixCbox.getChecked()) {
            this.$.short.setActive(true);
        } else {
            this.$.length.setActive(false);
        }
    },

    nameFormat: function(inSender, inEvent) {

        // Processing parameters

        var nameLength = this.$.length.getActive().content;
        var parts = [];
    
        if (this.$.prefixCbox.getChecked()) {
            parts.push("p");
        }
        if (this.$.givenCbox.getChecked()) {
            parts.push("g");
        }
        if (this.$.middleCbox.getChecked()) {
            parts.push("m");
        }
        if (this.$.familyCbox.getChecked()) {
            parts.push("f");
        }
        if (this.$.suffixCbox.getChecked()) {
            parts.push("s");
        }

        var options = {
            locale : this.$.localeSelector.getValue()
        };
            
        if (nameLength) {
            options.style = nameLength;
        }

        if (parts.length > 0) {
            options.components = parts.join('');
        }
                
        var n = {
            prefix: this.$.prefixInput.getValue(),
            givenName: this.$.givenInput.getValue(),
            middleName: this.$.middleInput.getValue(),
            familyName: this.$.familyInput.getValue(),
            suffix: this.$.suffixInput.getValue(),
            locale: this.$.localeSelector.getValue()
        };
        // Formatting
        var name = new Name(n);
        var fmt = new NameFmt(options);
        var postFmtData = "The name is: " + fmt.format(name); 
        // Output results
        this.$.rtlResult.setContent(postFmtData);
    }
});
