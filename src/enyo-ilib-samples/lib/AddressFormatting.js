var
    kind = require('enyo/kind'),
    ilib = require('enyo-ilib'),
    rb = require('./ResBundle');

var
    Button = require('enyo/Button'),
    Input = require('enyo/Input'),
    Scroller = require('enyo/Scroller'),
    ChooseLocale = require('./ChooseLocale');
    

module.exports = kind({
    name: 'ilib.sample.AddressFormatting',
    kind: Scroller,
    
    components: [
        {style: 'margin: 10px;', components: [
            {kind: ChooseLocale, name: 'localeSelector'},
            {tag: 'span', style: 'display: inline-block; width: 20px'},
            {kind: Button, content: rb.getString('Apply'), ontap: 'calcFormat', style: 'vertical-align: bottom;', classes: 'onyx-affirmative'}
        ]},
        {classes: 'sample-result-box', components: [
            {classes: 'sample-result-box-header', content: rb.getString('Street Address')},
            {tag: 'label', components: [
                {kind: Input, style: 'width:100%', name: 'stAddress',placeholder: rb.getString('Enter Street')}
            ]}
        ]},
        {classes: 'sample-result-box', components: [
            {classes: 'sample-result-box-header', content: rb.getString('City/Locality')},
            {tag: 'label', components: [
                {kind: Input, style: 'width:100%', name: 'city', placeholder: rb.getString('Enter city')}
            ]}
        ]},
        {classes: 'sample-result-box', components: [
            {classes: 'sample-result-box-header', content: rb.getString('postal code/Zip')},
            {tag: 'label', components: [
                {kind: Input, style: 'width:100%', name: 'postalCode', placeholder: rb.getString('Enter postalcode')}
            ]}
        ]},
        {classes: 'sample-result-box', components: [
            {classes: 'sample-result-box-header', content: rb.getString('State/Province')},
            {tag: 'label', components: [
                {kind: Input, style: 'width:100%', name: 'state', placeholder: rb.getString('Enter state')}
            ]}
        ]},
        {classes: 'sample-result-box', components: [
            {classes: 'sample-result-box-header', content: rb.getString('Country')},
            {tag: 'label', components: [
                {kind: Input, style: 'width:100%', name: 'country', placeholder: rb.getString('Enter Country')}
            ]}
        ]},
        {classes: 'sample-result-box', components: [
            {classes: 'sample-result-box-header', content: rb.getString('Format result: ')},
            {name: 'rtlResult', allowHtml:true, content: '-', style: 'padding: 10px'}
        ]}
    ],
        
    calcFormat: function (inSender, inEvent) {
        // Processing parameters
        var options = {
            locale: this.$.localeSelector.getValue()
        };
       
        var address =  new ilib.Address({
            streetAddress:this.$.stAddress.getValue(),
            locality: this.$.city.getValue(),
            postalCode: this.$.postalCode.getValue(),
            region: this.$.state.getValue(),
            country:this.$.country.getValue()
        });

        var formatter = new ilib.AddressFmt(options);
        var postFmtData = formatter.format(address);
        this.$.rtlResult.setContent(postFmtData);
    }
});
