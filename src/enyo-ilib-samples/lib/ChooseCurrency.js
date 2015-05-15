var
	kind = require('enyo/kind'),
    Select = require('enyo/Select');

var
    Currency = require('enyo-ilib/Currency'),
    ResBundle = require('enyo-ilib/ResBundle'),
    LocaleInfo = require('enyo-ilib/LocaleInfo');

var
    rb = require('./ResBundle');

module.exports = kind({
    name: "ilib.sample.ChooseCurrency",

    published: {
        "value": ""
    },

    components: [
        {content: rb.getString("Currency"), classes: "ilib-onyx-sample-divider"},
		{name: "currencies", kind: Select, onselect: "setCurrency"}
    ],

    create: function() {
        this.inherited(arguments);
        this.initCurrencies();
        this.value = this.$.currencies.selected.content;
    },
    
    initCurrencies: function() {
        var currencies = Currency.getAvailableCurrencies();
        var indexCC = -1;
        for (var i = 0; i < currencies.length; ++i) {
            this.$.currencies.createComponent({content: currencies[i]});
        }
        // pre-selects the current locale's currency
        this.selectCurrency();
    },
    
    selectCurrency: function(locale) {
        var li = new LocaleInfo(locale);
        var currency = li['info'].currency;
        var components = this.$.currencies.getClientControls();
        var selected;
        if (components[0])
            selected = components[0];
        for (var i = 0; i < components.length; ++i)
            if (components[i].content === currency) {
                selected = components[i];
                break;
            }
        this.$.currencies.setSelected(selected);
    },

    setCurrency: function(inSender, inEvent) {
        this.setValue(inEvent.selected.content);
        this.bubble("onSelectedCurrency", {content: inEvent.selected.content});
    }
});
