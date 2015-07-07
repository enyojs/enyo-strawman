var
    kind = require('enyo/kind'),
    Button = require('enyo/Button'),
    Input = require('enyo/Input'),
    Scroller = require('enyo/Scroller');

var
    ResBundle = require('enyo-ilib/ResBundle'),
    Address = require('enyo-ilib/Address');

var
    ChooseLocale = require('./ChooseLocale'),
    rb = require('./ResBundle');

module.exports = kind({
    name: 'ilib.sample.AddressParsing',
    kind: Scroller,     
    components: [
        {style: 'margin: 10px;', components: [
            {kind: ChooseLocale, name: 'localeSelector'},
            {tag: 'span', style: 'display: inline-block; width: 20px'},
            {kind: Button, content: rb.getString('Apply'), ontap: 'calcFormat', style: 'vertical-align: bottom;', classes: 'onyx-affirmative'}
        ]},
        {classes: 'sample-result-box', components: [
            {classes: 'sample-result-box-header', content: rb.getString('Address')},
            {tag: 'label', components: [
                {kind: Input, style: 'width:100%', name: 'address', placeholder: rb.getString('Enter Address')}
            ]}
        ]},
        {classes: 'sample-result-box', components: [
            {classes: 'sample-result-box-header', content: rb.getString('Format result: ')},
            {name: 'rtlResult', allowHtml: true, content: '-', style: 'padding: 10px'}
        ]}
    ],
        
    calcFormat: function (inSender, inEvent) {
        // Formatting
        var parsedAddress = new Address(this.$.address.getValue());

        var output = '';

        if (parsedAddress) {
            if (parsedAddress.streetAddress) {
                output += 'streetAddress: ' + parsedAddress.streetAddress + '<br>';
            }
            if (parsedAddress.locality) {
                output += 'locality: ' + parsedAddress.locality + '<br>';
            }
            if (parsedAddress.region) {
                output += 'region: ' + parsedAddress.region + '<br>';
            }
            if (parsedAddress.postalCode) {
                output += 'Postal code: ' + parsedAddress.postalCode + '<br>';
            }
            if (parsedAddress.country) {
                output += 'country: ' + parsedAddress.country + '<br>';
            }
            if (parsedAddress.countryCode) {
                output += 'countryCode: ' + parsedAddress.countryCode + '<br>';
            }
        }

        this.$.rtlResult.setContent(output);
    }
});
