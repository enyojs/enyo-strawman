var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	Group = require('enyo/Group'),
	Input = require('enyo/Input'),
	Scroller = require('enyo/Scroller');

var
    Name = require('enyo-ilib/Name');

var
	ChooseLocale = require('../ChooseLocale'),
    rb = require('../ResBundle');

module.exports = kind({
    name: "ilib.sample.NameParsing",
    classes: "onyx ilib-onyx-sample enyo-fit",
    components: [
        {kind: Scroller, fit: false, components: [
            {components: [
                /* Header with selecting locale */
                {kind: ChooseLocale, name: "localeSelector"},
                {style: "width: 20px"},
                {kind: Button, content: rb.getString("Apply"), ontap: "calcFormat", style: "vertical-align: bottom;", classes: "onyx-affirmative"}
            ]}
        ]},
        {tag: "br"},
        {kind: Group, classes:"onyx-sample-result-box", components: [
            {content: rb.getString("Name")},
			{kind: Input, style:"width:100%", name: "name", placeholder: rb.getString("Enter Name")}
        ]},
        {tag: "br"},
        {kind: Group, classes:"onyx-sample-result-box", components: [
            {content: rb.getString("Parsed result:")},
            {name: "rtlResult", fit: true, content: "-", allowHtml:true, style: "padding: 10px"}
        ]}
    ],
   
    calcFormat: function(inSender, inEvent) {
        // Processing parameters
        var options = {
            locale: this.$.localeSelector.getValue()
        };
      
        // Parsing
        var nameStr = this.$.name.getValue();       
        var name = new Name(nameStr, options);
        var output = "";
        if (name.prefix) {
            output += "Prefix: " + name.prefix + "<br>";
        }
        if (name.givenName) {
            output += "Given name: " + name.givenName + "<br>";
        }
        if (name.middleName) {
            output += "Middle name: " + name.middleName + "<br>";
        }
        if (name.familyName) {
            output += "Family name: " + name.familyName + "<br>";
        }
        if (name.suffix) {
            output += "Suffix: " + name.suffix + "<br>";
        } 
        output += '<br/>';
        this.$.rtlResult.setContent(output);
    }
});
