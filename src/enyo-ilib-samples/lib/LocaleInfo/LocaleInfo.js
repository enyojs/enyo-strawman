var
	kind = require('enyo/kind'),
	Group = require('enyo/Group'),
	Scroller = require('enyo/Scroller'),
    TextArea = require('enyo/TextArea');

var
    ilib = require('enyo-ilib'),
    LocaleInfo = require('enyo-ilib/LocaleInfo');

var
	ChooseLocale = require('../ChooseLocale'),
    rb = require('../ResBundle');

module.exports = kind({
    name: "ilib.sample.LocaleInfo",
    classes: "onyx ilib-onyx-sample enyo-fit",
    
    components: [
        {kind: Scroller, fit: true, components: [
            /* Header with selecting locale */
            {kind: ChooseLocale, onSelectedLocale: "setLocale"},
            {tag: "br"},
            
            {kind: Group, classes:"onyx-sample-result-box", components: [
                {content: rb.getString("Current Locale")},
                {name: "currentLocateData", kind: TextArea, style: 'box-sizing: border-box; width: 100%; height: 600px;'}
            ]}            
        ]}
    ],

    create: function() {
        this.inherited(arguments);
        /* Fill in info on current locale */
        this.printItemLocale(ilib.getLocale());
    },
    
    setLocale: function(inSender, inEvent) {
        /* Fill in info on selected locale */
        this.printItemLocale(inEvent.content);
    },

    printItemLocale: function(locale) {
        if (this.$['currentLocateData']) {
            this.$.currentLocateData.destroyComponents();
            this.$.currentLocateData.createComponent({content: "getLocale : "+ locale, style: "font-size: 16px"});
            var localeInfo = new LocaleInfo(locale);
            var str = JSON.stringify(localeInfo, null, '\t').replace(/"([^"]+)"/g, '$1').replace(/,$/mg, '');
            this.$.currentLocateData.set('value', str);
        }
    }
});
