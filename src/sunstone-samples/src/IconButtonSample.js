var
	kind = require('enyo/kind');

var
	IconButton = require('sunstone/IconButton');

module.exports = kind({
	name: 'sun.sample.IconButtonSample',
	classes: 'sun enyo-unselectable enyo-fit',
	components: [
		{content: 'IconButton normal (48X48)', classes: 'sun-sample-font'},
		{style: 'height:64px;', components:[
			{kind: IconButton, src: '@../assets/btn_setting.svg'},
			{kind: IconButton, src: '@../assets/btn_setting.svg', disabled: true}
		]}
	]
});