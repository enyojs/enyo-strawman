var
	kind = require('enyo/kind');

var
	Button = require('enyo/Button'),
	Group = require('enyo/Group'),
	Input = require('enyo/Input'),
	Scroller = require('enyo/Scroller'),
	Select = require('enyo/Select');

var
    Num = require('enyo-ilib/INumber'),
    NumFmt = require('enyo-ilib/NumFmt');

var
	ChooseLocale = require('../ChooseLocale'),
	ChooseCurrency = require('../ChooseCurrency'),
    rb = require('../ResBundle');

module.exports = kind({
    name: "ilib.sample.NumberFormatting",
    classes: "onyx ilib-onyx-sample enyo-fit",
    components: [
        {kind: Scroller, fit: true, components: [
            {components: [
                /* Header with selecting locale */
                {kind: ChooseLocale, name: "localeSelector", onSelectedLocale: "setLocale"},
                {style: "width: 20px"},
                {kind:  Button, content: rb.getString("Apply"), ontap: "calcFormat", style: "vertical-align: bottom;", classes: "onyx-affirmative"},
                {fit: true}
            ]},
            {tag: "br"},
            
            {content: rb.getString("Type"), classes: "ilib-onyx-sample-divider"},
            {kind: Group, defaultKind: Button, name: "type", onActivate: "buttonActivated", components: [
                {content: "number", active: true},
                {content: "percentage"},
                {content: "currency"}
            ]},


            {components: [
                {components: [
                    {content: rb.getString("Max Frac Digits"), classes: "ilib-onyx-sample-divider"},
					{kind: Input, name: "maxFractionDigits", placeholder: rb.getString("Enter number")}
                ]},
                {style: "width: 20px"},
                {components: [
                    {content: rb.getString("Min Frac Digits"), classes: "ilib-onyx-sample-divider"},
					{kind: Input, name: "minFractionDigits", placeholder: rb.getString("Enter number")}
                ]},
                {fit: true}
            ]},
            
            
            {content: rb.getString("Rounding Mode"), classes: "ilib-onyx-sample-divider"},
            {kind: Group, defaultKind: Button, name: "roundingMode", components: [
                {content: "up"},
                {content: "down"},
                {content: "ceiling"},
                {content: "floor"},
                {content: "half up", active: true},
                {content: "half down"},
                {content: "half even"},
                {content: "half odd"} 
            ]},
            
            {name: "numberParams", components: [
                {content: rb.getString("Style"), classes: "ilib-onyx-sample-divider"},
 
				{name: "styleOfNumber", kind: Select, components: [
					{content: "standard", active: true},
					{content: "scientific"}
				]}
     
            ]},
            
            {name: "currencyParams", components: [
                {content: rb.getString("Style"), classes: "ilib-onyx-sample-divider"},
 
				{name: "styleOfCurrency", kind: Select, components: [
					{content: "common", active: true},
					{content: "iso"}
				]},
                
                {kind: ChooseCurrency, name: "currency"}
            ]},
                        
            {tag: "br"}
        ]},

        {kind: Group, classes:"onyx-sample-result-box", components: [
            {content: rb.getString("Number")},
			{kind: Input, name: "number", placeholder: rb.getString("Enter number")}
        ]},
        {tag: "br"},
        {kind: Group, classes:"onyx-sample-result-box", components: [
            {content: rb.getString("Format result:")},
            {name: "rtlResult", fit: true, content: "-", style: "padding: 10px"}
        ]}
    ],
    
    setLocale: function(inSender, inEvent) {
        if (this.$['currency'])
            this.$.currency.selectCurrency(this.$.localeSelector.getValue());
    },
    
    buttonActivated: function(inSender, inEvent) {
        this.updateParameters();
    },

    updateParameters: function() {
        this.$.numberParams.setShowing(this.$.type.getActive().content === 'number');
        this.$.currencyParams.setShowing(this.$.type.getActive().content === 'currency');
    },

    calcFormat: function(inSender, inEvent) {
        // Processing parameters
        var options = {
            locale: this.$.localeSelector.getValue(),
            type: this.$.type.getActive().content,
            roundingMode: this.$.roundingMode.getActive().content
        };
        if ((parseInt(this.$.maxFractionDigits.getValue(), 10) || 0) !== 0)
            options.maxFractionDigits = parseInt(this.$.maxFractionDigits.getValue(), 10);
        if ((parseInt(this.$.minFractionDigits.getValue(), 10) || 0) !== 0)
            options.minFractionDigits = parseInt(this.$.minFractionDigits.getValue(), 10);
        if (options.type === 'number')
            options.style = this.$.styleOfNumber.getSelected().content;
        if (options.type === 'currency') {
            options.style = this.$.styleOfCurrency.getSelected().content;
            options.currency = this.$.currency.getValue();
        }
        // Formatting
        var num = new Num(this.$.number.getValue());
        var fmt = new NumFmt(options);
        var postFmtData = fmt.format(num); 
        // Output results
        this.$.rtlResult.setContent(postFmtData);
    }
});
